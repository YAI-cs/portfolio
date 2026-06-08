"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const TV_Y = Math.PI + 1;
const SCALE = 2.8;
const CAM_Z = 6.5;
const HALF_FOV = (20 * Math.PI) / 180;
const WORD_DURATION = 3;
const CRT_WORDS = [
  "WELCOME",
  "BIENVENIDO",
  "BIENVENUE",
  "BENVENUTO",
  "WILLKOMMEN",
  "BEM-VINDO",
  "ようこそ",
  "환영합니다",
  "ДОБРО ПОЖАЛОВАТЬ",
  "مرحباً",
];

function drawCRTText(
  ctx: CanvasRenderingContext2D,
  word: string,
  t: number,
  alpha: number,
) {
  const { width: w, height: h } = ctx.canvas;
  ctx.clearRect(0, 0, w, h);
  if (alpha <= 0.01) return;

  const flicker = 0.88 + Math.sin(t * 11.3) * 0.07 + Math.sin(t * 7.1) * 0.05;
  const a = Math.min(1, flicker * alpha);

  let fontSize = Math.floor(h * 0.52);
  ctx.font = `${fontSize}px "VT323", "Noto Sans", monospace`;
  while (ctx.measureText(word).width > w * 0.82 && fontSize > 8) {
    fontSize -= 2;
    ctx.font = `${fontSize}px "VT323", "Noto Sans", monospace`;
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const textY = h * 0.42;

  ctx.save();
  ctx.shadowColor = `rgba(255,255,255,${a * 0.22})`;
  ctx.shadowBlur = 14;
  ctx.fillStyle = `rgba(255,255,255,${a * 0.12})`;
  ctx.fillText(word, w / 2, textY);
  ctx.restore();

  ctx.save();
  ctx.shadowColor = `rgba(220,235,255,${a * 0.45})`;
  ctx.shadowBlur = 5;
  ctx.fillStyle = `rgba(255,255,255,${a})`;
  ctx.fillText(word, w / 2, textY);
  ctx.restore();
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
    textCanvas.width = 512;
    textCanvas.height = 384;
    const ctx2d = textCanvas.getContext("2d")!;
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
      const planeW = rawSize.z * 0.72;
      const planeH = rawSize.y * 0.62;
      const planeX = rawCenter.x + rawSize.x * 0.47;
      const planeY = rawCenter.y + rawSize.y * 0.05;
      const screenGeo = new THREE.PlaneGeometry(planeW, planeH);
      screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.rotation.y = Math.PI / 2;
      screenMesh.position.set(planeX, planeY, rawCenter.z - rawSize.z * 0.08);
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
      tableMesh.position.set(modelCenter.x, tableY, modelCenter.z - tableD * 0.1);
      tableMesh.receiveShadow = true;
      scene.add(tableMesh);

      const edgeGeo = new THREE.BoxGeometry(tableW, tableThick * 0.15, 0.015);
      const edgeMat = new THREE.MeshStandardMaterial({ color: 0x1a0507, roughness: 0.55 });
      const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
      edgeMesh.position.set(
        modelCenter.x,
        tableY + tableThick / 2 + 0.01,
        tableMesh.position.z + tableD / 2,
      );
      scene.add(edgeMesh);

      // ── Back wall ──────────────────────────────────────────────────────
      const wallGeo = new THREE.PlaneGeometry(tvWorldSize.x * 40, tvWorldSize.y * 8);
      const wallMat = new THREE.MeshStandardMaterial({ color: 0x060203, roughness: 1.0 });
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

      // Update canvas at 20fps — cheap enough, avoids 60fps texture uploads
      intervalId = window.setInterval(() => {
        const t = (performance.now() - startTime) / 1000;
        const wordIdx = Math.floor(t / WORD_DURATION) % CRT_WORDS.length;
        const phase = (t % WORD_DURATION) / WORD_DURATION;
        const wordAlpha =
          phase < 0.06
            ? phase / 0.06
            : phase > 0.82
              ? 1 - (phase - 0.82) / 0.18
              : 1;
        drawCRTText(ctx2d, CRT_WORDS[wordIdx], t, wordAlpha);
        screenTex.needsUpdate = true;
        renderFrame();
      }, 50);
    });

    const init = (w: number, h: number) => {
      if (renderer) {
        renderer.setSize(w, h);
        if (camera) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          if (model) {
            const { z, lookX } = getCam(w, h);
            camera.position.set(modelCenter.x, modelCenter.y, modelCenter.z + z);
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
    };

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) init(width, height);
      }
    });
    ro.observe(mount);

    return () => {
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
