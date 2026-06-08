"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const TV_Y = Math.PI + 1;
const SCALE = 2.8;
const CAM_Z = 6.5;
const HALF_FOV = (20 * Math.PI) / 180;

// ── Screen overlay alignment ────────────────────────────────────────────────
// All values are fractions of the model's pre-scale local-space extents.
// Reference: rawSize X≈178 (depth), Y≈163 (height), Z≈129 (width)
//            rawCenter X≈−53, Y≈−55, Z≈−61
//
//  SCREEN_W  — overlay width  (fraction of rawSize.z). Derived from bezel opening: 99.5 / 128.987
//  SCREEN_H  — overlay height (fraction of rawSize.y). Derived from bezel opening: 81.5 / 162.725
//  SCREEN_X  — forward offset fraction of rawSize.x added to rawCenter.x.
//              0.500 = exactly at front face (X≈36.35); raise to push overlay in front.
//  SCREEN_Y  — vertical offset fraction of rawSize.y added to rawCenter.y.
//              Positive = up, negative = down.
//  SCREEN_Z  — lateral offset fraction of rawSize.z subtracted from rawCenter.z.
//              Positive = shift toward TV's −Z side (screen center Z≈−63.75).
const SCREEN_W = 0.77;
const SCREEN_H = 0.6;
const SCREEN_X = 0.503;
const SCREEN_Y = 0.101;
const SCREEN_Z = 0.1;

const SMPTE_TOP: [number, number, number][] = [
  [192, 192, 192],
  [192, 192, 0],
  [0, 192, 192],
  [0, 192, 0],
  [192, 0, 192],
  [192, 0, 0],
  [0, 0, 192],
];

const SMPTE_BOT: [number, number, number][] = [
  [0, 0, 192],
  [16, 16, 16],
  [192, 0, 192],
  [16, 16, 16],
  [0, 192, 192],
  [16, 16, 16],
  [192, 192, 192],
];

function drawColorBars(ctx: CanvasRenderingContext2D, t: number) {
  const { width: w, height: h } = ctx.canvas;
  const topH = Math.floor(h * 0.72);
  const botH = h - topH;
  const barW = w / 7;

  for (let i = 0; i < 7; i++) {
    const [r, g, b] = SMPTE_TOP[i];
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(Math.floor(i * barW), 0, Math.ceil(barW) + 1, topH);
  }
  for (let i = 0; i < 7; i++) {
    const [r, g, b] = SMPTE_BOT[i];
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(Math.floor(i * barW), topH, Math.ceil(barW) + 1, botH);
  }

  // Scanlines — cheap O(h) rects, no pixel buffer needed
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  for (let y = 0; y < h; y += 2) {
    ctx.fillRect(0, y, w, 1);
  }

  // Rolling luminance sweep bar
  const barPhase = (t * 0.38) % 1;
  if (barPhase < 0.14) {
    const barY = Math.floor((barPhase / 0.14) * h);
    const grad = ctx.createLinearGradient(0, barY - 5, 0, barY + 5);
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(0.5, "rgba(255,255,255,0.06)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, barY - 5, w, 10);
  }

  // NO SIGNAL label with subtle flicker
  const flicker = 0.94 + Math.sin(t * 9.3) * 0.04 + Math.sin(t * 4.7) * 0.02;
  const noSignalY = Math.round(h * 0.44);
  const fontSize = Math.max(10, Math.floor(h * 0.11));
  ctx.font = `${fontSize}px "VT323", monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const tw = ctx.measureText("NO SIGNAL").width;
  const padX = 12,
    padY = 8;

  ctx.fillStyle = `rgba(8,8,8,${0.82 * flicker})`;
  ctx.fillRect(
    w / 2 - tw / 2 - padX,
    noSignalY - fontSize * 0.55 - padY,
    tw + padX * 2,
    fontSize * 1.1 + padY * 2,
  );

  ctx.fillStyle = `rgba(240,240,230,${flicker})`;
  ctx.fillText("NO SIGNAL", w / 2, noSignalY);
}

export default function TVScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    document.fonts.load('16px "VT323"').catch(() => {});

    let renderer: THREE.WebGLRenderer | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let modelCenter = new THREE.Vector3();
    let tvWorldSize = new THREE.Vector3();
    let fullSceneBox: THREE.Box3 | null = null;
    let intervalId = 0;
    let destroyed = false;
    const startTime = performance.now();

    const fitZFromSize = (
      containerW: number,
      containerH: number,
      size: THREE.Vector3,
      margin = 1.55,
    ) => {
      const aspect = containerW / containerH;
      const zH = size.y / 2 / Math.tan(HALF_FOV);
      const zW = size.x / 2 / (Math.tan(HALF_FOV) * aspect);
      return Math.max(zH, zW) * margin;
    };

    const fitZ = (containerW: number, containerH: number, margin = 1.55) => {
      if (tvWorldSize.lengthSq() === 0) return CAM_Z;
      return fitZFromSize(containerW, containerH, tvWorldSize, margin);
    };

    const getCam = (w: number, h: number) => {
      if (w >= 768) return { z: CAM_Z, lookX: -1.9 };
      if (fullSceneBox) {
        const sceneSize = fullSceneBox.getSize(new THREE.Vector3());
        const sceneCenter = fullSceneBox.getCenter(new THREE.Vector3());
        const z = fitZFromSize(w, h, sceneSize, 1.65);
        return { z, lookX: sceneCenter.x - modelCenter.x };
      }
      return { z: fitZ(w, h), lookX: 0 };
    };

    const scene = new THREE.Scene();

    scene.add(new THREE.AmbientLight(0x1a1a1a, 3.5));

    const key = new THREE.DirectionalLight(0xd4ccc0, 1.6);
    key.position.set(5, 3, 10);
    key.castShadow = true;
    key.shadow.mapSize.setScalar(2048);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 35;
    key.shadow.camera.left = -12;
    key.shadow.camera.right = 6;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -6;
    key.shadow.bias = -0.003;
    scene.add(key);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const makeLoader = () => {
      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      return loader;
    };

    let model: THREE.Group | null = null;

    // CRT canvas texture
    const textCanvas = document.createElement("canvas");
    textCanvas.width = 256;
    textCanvas.height = 192;
    const ctx2d = textCanvas.getContext("2d", { willReadFrequently: true })!;
    const screenTex = new THREE.CanvasTexture(textCanvas);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTex,
      transparent: true,
      depthWrite: false,
    });
    let screenMesh: THREE.Mesh | null = null;

    const renderFrame = () => {
      if (renderer && camera) renderer.render(scene, camera);
    };

    makeLoader().load("/retro-tv.glb", (gltf) => {
      if (destroyed) return;
      model = gltf.scene;

      const rawBox = new THREE.Box3().setFromObject(model);
      const rawSize = rawBox.getSize(new THREE.Vector3());
      const rawCenter = rawBox.getCenter(new THREE.Vector3());
      const maxDim = Math.max(rawSize.x, rawSize.y, rawSize.z);
      const modelScale = SCALE / maxDim;

      model.scale.setScalar(modelScale);
      model.rotation.y = TV_Y;

      const box2 = new THREE.Box3().setFromObject(model);
      modelCenter = box2.getCenter(new THREE.Vector3());
      tvWorldSize = box2.getSize(new THREE.Vector3());

      // ── CRT screen overlay ─────────────────────────────────────────────
      const screenGeo = new THREE.PlaneGeometry(
        rawSize.z * SCREEN_W,
        rawSize.y * SCREEN_H,
      );
      screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.rotation.y = Math.PI / 2;
      screenMesh.position.set(
        rawCenter.x + rawSize.x * SCREEN_X,
        rawCenter.y + rawSize.y * SCREEN_Y,
        rawCenter.z - rawSize.z * SCREEN_Z,
      );
      screenMesh.renderOrder = 2;
      model.add(screenMesh);

      // ── Table surface ──────────────────────────────────────────────────
      const tableThick = 0.14;
      const tableW = tvWorldSize.x * 30;
      const tableD = tvWorldSize.z * 3.0;
      const tableY = box2.min.y - tableThick / 2 - 0.08;

      const tableGeo = new THREE.BoxGeometry(tableW, tableThick, tableD);
      const tableMat = new THREE.MeshStandardMaterial({
        color: 0x0c0304,
        roughness: 0.92,
        metalness: 0.0,
      });
      const tableMesh = new THREE.Mesh(tableGeo, tableMat);
      tableMesh.position.set(
        modelCenter.x,
        tableY,
        modelCenter.z - tableD * 0.1,
      );
      tableMesh.receiveShadow = true;
      scene.add(tableMesh);

      const edgeGeo = new THREE.BoxGeometry(tableW, tableThick * 0.15, 0.015);
      const edgeMat = new THREE.MeshStandardMaterial({
        color: 0x1a0507,
        roughness: 0.55,
      });
      const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
      edgeMesh.position.set(
        modelCenter.x,
        tableY + tableThick / 2 + 0.01,
        tableMesh.position.z + tableD / 2,
      );
      scene.add(edgeMesh);

      // ── Back wall ──────────────────────────────────────────────────────
      const wallGeo = new THREE.PlaneGeometry(
        tvWorldSize.x * 40,
        tvWorldSize.y * 8,
      );
      const wallMat = new THREE.MeshStandardMaterial({
        color: 0x060203,
        roughness: 1.0,
      });
      const wallMesh = new THREE.Mesh(wallGeo, wallMat);
      wallMesh.position.set(
        modelCenter.x,
        modelCenter.y + tvWorldSize.y * 0.4,
        modelCenter.z - tvWorldSize.z * 2.2,
      );
      wallMesh.receiveShadow = true;
      scene.add(wallMesh);

      model.traverse((child) => {
        if (!(child as THREE.Mesh).isMesh) return;
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      });

      // ── VHS tape stack ─────────────────────────────────────────────────
      makeLoader().load("/vhs.glb", (vhsGltf) => {
        if (destroyed) return;
        const vhsModel = vhsGltf.scene;

        const vhsBox = new THREE.Box3().setFromObject(vhsModel);
        const vhsSize = vhsBox.getSize(new THREE.Vector3());
        const maxVhsDim = Math.max(vhsSize.x, vhsSize.y, vhsSize.z);
        const vhsScale = (tvWorldSize.x * 1.1) / maxVhsDim;
        vhsModel.scale.set(vhsScale, vhsScale * 1.4, vhsScale);

        const scaledBox = new THREE.Box3().setFromObject(vhsModel);
        const scaledSize = scaledBox.getSize(new THREE.Vector3());

        const tableTop = tableY + tableThick / 2;
        const vhsY = tableTop - scaledBox.min.y - 0.04;
        const vhsX = box2.min.x - scaledSize.x * 0.8;

        vhsModel.position.set(vhsX, vhsY, modelCenter.z);

        vhsModel.traverse((child) => {
          if (!(child as THREE.Mesh).isMesh) return;
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        });

        scene.add(vhsModel);

        const vhsSceneBox = new THREE.Box3().setFromObject(vhsModel);
        fullSceneBox = box2.clone().union(vhsSceneBox);

        if (camera && mount.clientWidth < 768) {
          const { z, lookX } = getCam(mount.clientWidth, mount.clientHeight);
          camera.position.set(modelCenter.x, modelCenter.y, modelCenter.z + z);
          camera.lookAt(modelCenter.x + lookX, modelCenter.y, modelCenter.z);
        }

        renderFrame();
      });

      if (camera) {
        const { z, lookX } = getCam(mount.clientWidth, mount.clientHeight);
        camera.position.set(modelCenter.x, modelCenter.y, modelCenter.z + z);
        camera.lookAt(modelCenter.x + lookX, modelCenter.y, modelCenter.z);
      }

      scene.add(model);

      // Canvas texture at 10fps — screen barely moves, no need for more
      intervalId = window.setInterval(() => {
        const t = (performance.now() - startTime) / 1000;
        drawColorBars(ctx2d, t);
        screenTex.needsUpdate = true;
        renderFrame();
      }, 100);
    });

    const init = (w: number, h: number) => {
      if (renderer) {
        renderer.setSize(w, h);
        if (camera) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          if (model) {
            const { z, lookX } = getCam(w, h);
            camera.position.set(
              modelCenter.x,
              modelCenter.y,
              modelCenter.z + z,
            );
            camera.lookAt(modelCenter.x + lookX, modelCenter.y, modelCenter.z);
          }
        }
        renderFrame();
        return;
      }

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.style.display = "block";
      mount.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
      camera.position.set(0, 0, CAM_Z);
      camera.lookAt(0, 0, 0);

      // Model may have loaded before init() was called (cache hit race)
      if (model) {
        const { z, lookX } = getCam(w, h);
        camera.position.set(modelCenter.x, modelCenter.y, modelCenter.z + z);
        camera.lookAt(modelCenter.x + lookX, modelCenter.y, modelCenter.z);
        renderFrame();
      }
    };

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) init(width, height);
      }
    });
    ro.observe(mount);

    return () => {
      destroyed = true;
      clearInterval(intervalId);
      ro.disconnect();
      renderer?.dispose();
      dracoLoader.dispose();
      screenTex.dispose();
      screenMat.dispose();
      if (renderer && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
