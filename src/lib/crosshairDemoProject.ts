import type { CrosshairShape } from "@/context/CrosshairStateContext";
import { createElements, createLayer, createProject, CrosshairLayer } from "./crosshairEditor";

export function demoProject(options: { shape: CrosshairShape; color: string; size: number; thickness: number; gap: number; opacity: number; outline: boolean; centerDot: boolean }) {
  const { shape, color, size, thickness, gap, opacity, outline, centerDot } = options;
  let layers: CrosshairLayer[] = [];
  if (shape === "cross" || shape === "t-cross" || shape === "precision") {
    layers = createElements(shape === "t-cross" ? "t" : "cross", "Cross", color).map(layer => {
      const radians = layer.rotation * Math.PI / 180;
      return { ...layer, x: (gap + size) * Math.cos(radians), y: (gap + size) * Math.sin(radians), length: size * 2, thickness } as CrosshairLayer;
    });
  }
  if (shape === "circle" || shape === "precision") layers.push({ ...createLayer("ring", "Ring", color), radius: size * 2.5, thickness } as CrosshairLayer);
  if (shape === "dot" || centerDot || shape === "precision") layers.push({ ...createLayer("dot", "Dot", color), radius: shape === "dot" ? size : thickness } as CrosshairLayer);
  if (shape === "box" || shape === "diamond") layers.push({ ...createLayer("rectangle", shape === "box" ? "Box" : "Diamond", color), width: size * 4, height: size * 4, rotation: shape === "diamond" ? 45 : 0, thickness } as CrosshairLayer);
  return createProject("Crosshair", layers.map(layer => ({ ...layer, opacity, outlineWidth: outline ? 1 : 0 })));
}
