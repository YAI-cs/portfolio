"use client";

import { useEffect } from "react";

// Barrel distortion coefficient — higher = more pronounced fisheye
const K = 0.08;
// Maximum displacement in CSS pixels (scale param for feDisplacementMap)
const DISP_SCALE = 240;
// Reference half-width for tuning (1440px viewport)
const REF_HALF_W = 720;
const REF_HALF_H = 450;
const MAP_SIZE = 512;

function buildDisplacementMap(): string {
  const canvas = document.createElement("canvas");
  canvas.width = MAP_SIZE;
  canvas.height = MAP_SIZE;
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(MAP_SIZE, MAP_SIZE);
  const d = imageData.data;

  for (let py = 0; py < MAP_SIZE; py++) {
    for (let px = 0; px < MAP_SIZE; px++) {
      const xn = (px / (MAP_SIZE - 1)) * 2 - 1;
      const yn = (py / (MAP_SIZE - 1)) * 2 - 1;
      const r2 = xn * xn + yn * yn;
      const factor = (K * r2) / (1 + K * r2);
      const dxPx = -xn * factor * REF_HALF_W;
      const dyPx = -yn * factor * REF_HALF_H;
      const idx = (py * MAP_SIZE + px) * 4;
      d[idx]     = Math.max(0, Math.min(255, Math.round((0.5 + dxPx / DISP_SCALE) * 255)));
      d[idx + 1] = Math.max(0, Math.min(255, Math.round((0.5 + dyPx / DISP_SCALE) * 255)));
      d[idx + 2] = 128;
      d[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}

export default function FisheyeFilter() {
  useEffect(() => {
    const dataUrl = buildDisplacementMap();

    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
    svg.setAttribute("aria-hidden", "true");

    const defs = document.createElementNS(NS, "defs");
    const filter = document.createElementNS(NS, "filter");
    filter.setAttribute("id", "fisheye-barrel");
    filter.setAttribute("x", "0%");
    filter.setAttribute("y", "0%");
    filter.setAttribute("width", "100%");
    filter.setAttribute("height", "100%");
    filter.setAttribute("color-interpolation-filters", "sRGB");

    const feImg = document.createElementNS(NS, "feImage");
    feImg.setAttribute("result", "dispMap");
    feImg.setAttribute("href", dataUrl);
    feImg.setAttribute("preserveAspectRatio", "none");
    feImg.setAttribute("x", "0%");
    feImg.setAttribute("y", "0%");
    feImg.setAttribute("width", "100%");
    feImg.setAttribute("height", "100%");

    const feDisp = document.createElementNS(NS, "feDisplacementMap");
    feDisp.setAttribute("in", "SourceGraphic");
    feDisp.setAttribute("in2", "dispMap");
    feDisp.setAttribute("scale", String(DISP_SCALE));
    feDisp.setAttribute("xChannelSelector", "R");
    feDisp.setAttribute("yChannelSelector", "G");

    filter.appendChild(feImg);
    filter.appendChild(feDisp);
    defs.appendChild(filter);
    svg.appendChild(defs);
    document.body.appendChild(svg);

    return () => {
      if (document.body.contains(svg)) document.body.removeChild(svg);
    };
  }, []);

  return null;
}
