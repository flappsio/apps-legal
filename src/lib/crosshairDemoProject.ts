import type { CrosshairShape } from "@/context/CrosshairStateContext";
import { createLayer, createProject, CrosshairLayer } from "./crosshairEditor";

export function demoProject(options: { shape: CrosshairShape; color: string; size: number; thickness: number; gap: number; opacity: number; outline: boolean; centerDot: boolean }) {
  const { shape, color, size, thickness, gap, opacity, outline, centerDot } = options;
  let layers: CrosshairLayer[] = [];
  if (shape === "cross" || shape === "t-cross" || shape === "precision") {
    const isT = shape === "t-cross";
    layers.push({
      ...createLayer(isT ? "t" : "cross", isT ? "T-Cross" : "Cross", color),
      length: size * 2,
      thickness,
      gap,
    } as CrosshairLayer);
  }
  if (shape === "circle" || shape === "precision") layers.push({ ...createLayer("ring", "Ring", color), radius: size * 2.5, thickness } as CrosshairLayer);
  if (shape === "dot" || centerDot || shape === "precision") layers.push({ ...createLayer("dot", "Dot", color), radius: shape === "dot" ? size : thickness } as CrosshairLayer);
  if (shape === "box") layers.push({ ...createLayer("rectangle", "Box", color), width: size * 4, height: size * 4, thickness } as CrosshairLayer);
  if (shape === "diamond") layers.push({ ...createLayer("diamond", "Diamond", color), size: size * 2, thickness } as CrosshairLayer);
  return createProject("Crosshair", layers.map(layer => ({ ...layer, opacity, outlineWidth: outline ? 1 : 0 })));
}
