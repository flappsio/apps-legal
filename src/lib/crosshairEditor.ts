export const PROJECT_SIZE = 256;
export const MAX_LAYERS = 100;
export const MAX_FILE_BYTES = 1024 * 1024;
export const STORAGE_KEY = "crossio.editor.v1";

interface LayerBase {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  x: number;
  y: number;
  rotation: number;
  color: string;
  opacity: number;
  outlineColor: string;
  outlineWidth: number;
}
export type CrosshairLayer = LayerBase & (
  | { type: "line"; length: number; thickness: number; cap: "butt" | "round" }
  | { type: "dot"; radius: number }
  | { type: "ring"; radius: number; thickness: number }
  | { type: "rectangle"; width: number; height: number; thickness: number }
);
export type ElementType = CrosshairLayer["type"] | "cross" | "t" | "diamond";
export interface CrosshairProject {
  version: 1;
  id: string;
  name: string;
  width: 256;
  height: 256;
  layers: CrosshairLayer[]; // bottom to top; the UI displays this in reverse
}
export interface EditorStorage { version: 1; draft: CrosshairProject; saved: CrosshairProject[] }

export const uid = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
export const isColor = (value: string) => /^#[\da-f]{6}$/i.test(value);

export function createLayer(type: CrosshairLayer["type"], name: string, color = "#69F0AE"): CrosshairLayer {
  const base: LayerBase = { id: uid(), name, visible: true, locked: false, x: 0, y: 0, rotation: 0, color, opacity: 1, outlineColor: "#000000", outlineWidth: 1 };
  switch (type) {
    case "line": return { ...base, type, x: 14, length: 16, thickness: 2, cap: "butt" };
    case "dot": return { ...base, type, radius: 3 };
    case "ring": return { ...base, type, radius: 20, thickness: 2 };
    case "rectangle": return { ...base, type, width: 32, height: 32, thickness: 2 };
  }
}

export function symmetryCopies(layer: CrosshairLayer, count: 2 | 4): CrosshairLayer[] {
  if (layer.locked || layer.type !== "line") return [];
  return Array.from({ length: count - 1 }, (_, index) => {
    const angle = ((index + 1) * 360) / count;
    const radians = angle * Math.PI / 180;
    return { ...layer, id: uid(), name: `${layer.name} ${index + 2}`, x: Math.round((layer.x * Math.cos(radians) - layer.y * Math.sin(radians)) * 100) / 100,
      y: Math.round((layer.x * Math.sin(radians) + layer.y * Math.cos(radians)) * 100) / 100, rotation: (layer.rotation + angle) % 360 };
  });
}

export function createElements(type: ElementType, name: string, color?: string): CrosshairLayer[] {
  if (type === "cross" || type === "t") {
    const line = createLayer("line", name, color);
    const layers = [line, ...symmetryCopies(line, 4)];
    return type === "t" ? layers.filter((_, index) => index !== 3) : layers;
  }
  if (type === "diamond") {
    return [0, 90, 180, 270].map((angle, index) => {
      const radians = angle * Math.PI / 180;
      return { ...createLayer("line", `${name} ${index + 1}`, color), x: 12 * Math.cos(radians) - 12 * Math.sin(radians), y: 12 * Math.sin(radians) + 12 * Math.cos(radians), rotation: angle - 45, length: Math.sqrt(1152) } as CrosshairLayer;
    });
  }
  return [createLayer(type, name, color)];
}

export function createProject(name = "Crosshair", layers = createElements("cross", "Cross")): CrosshairProject {
  return { version: 1, id: uid(), name, width: 256, height: 256, layers };
}

export function updateLayer(project: CrosshairProject, id: string, patch: Partial<CrosshairLayer>): CrosshairProject {
  return { ...project, layers: project.layers.map(layer => layer.id === id && !layer.locked ? { ...layer, ...patch, id: layer.id, type: layer.type } as CrosshairLayer : layer) };
}
export function reorderLayer(project: CrosshairProject, id: string, direction: -1 | 1): CrosshairProject {
  const index = project.layers.findIndex(layer => layer.id === id);
  const next = index + direction;
  if (index < 0 || next < 0 || next >= project.layers.length || project.layers[index].locked) return project;
  const layers = [...project.layers];
  [layers[index], layers[next]] = [layers[next], layers[index]];
  return { ...project, layers };
}
export function duplicateLayer(project: CrosshairProject, id: string): CrosshairProject {
  const index = project.layers.findIndex(layer => layer.id === id);
  if (index < 0 || project.layers[index].locked || project.layers.length >= MAX_LAYERS) return project;
  const layers = [...project.layers];
  layers.splice(index + 1, 0, { ...layers[index], id: uid(), name: `${layers[index].name} +` });
  return { ...project, layers };
}

/** Strict, reconstructing parser: imported objects never become SVG markup directly. */
export function parseProject(input: unknown): CrosshairProject {
  const record = (value: unknown): Record<string, unknown> => {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid project");
    return value as Record<string, unknown>;
  };
  const str = (value: unknown, max = 80): string => {
    if (typeof value !== "string" || !value.trim() || value.length > max) throw new Error("Invalid text");
    return value;
  };
  const num = (value: unknown, min: number, max: number): number => {
    if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) throw new Error("Invalid number");
    return value;
  };
  const bool = (value: unknown): boolean => {
    if (typeof value !== "boolean") throw new Error("Invalid flag");
    return value;
  };
  const color = (value: unknown) => { const result = str(value, 7); if (!isColor(result)) throw new Error("Invalid color"); return result; };
  const project = record(input);
  if (project.version !== 1 || project.width !== 256 || project.height !== 256 || !Array.isArray(project.layers) || project.layers.length > MAX_LAYERS) throw new Error("Invalid project version or size");
  const ids = new Set<string>();
  const layers = project.layers.map((value): CrosshairLayer => {
    const layer = record(value);
    const id = str(layer.id, 100);
    if (ids.has(id)) throw new Error("Duplicate layer");
    ids.add(id);
    const base: LayerBase = { id, name: str(layer.name), visible: bool(layer.visible), locked: bool(layer.locked), x: num(layer.x, -128, 128), y: num(layer.y, -128, 128), rotation: num(layer.rotation, -360, 360), color: color(layer.color), opacity: num(layer.opacity, 0, 1), outlineColor: color(layer.outlineColor), outlineWidth: num(layer.outlineWidth, 0, 16) };
    switch (layer.type) {
      case "line": {
        if (layer.cap !== "butt" && layer.cap !== "round") throw new Error("Invalid cap");
        return { ...base, type: layer.type, length: num(layer.length, 1, 256), thickness: num(layer.thickness, 0.5, 64), cap: layer.cap };
      }
      case "dot": return { ...base, type: layer.type, radius: num(layer.radius, 0.5, 128) };
      case "ring": return { ...base, type: layer.type, radius: num(layer.radius, 0.5, 128), thickness: num(layer.thickness, 0.5, 64) };
      case "rectangle": return { ...base, type: layer.type, width: num(layer.width, 1, 256), height: num(layer.height, 1, 256), thickness: num(layer.thickness, 0.5, 64) };
      default: throw new Error("Invalid layer type");
    }
  });
  return { version: 1, id: str(project.id, 100), name: str(project.name), width: 256, height: 256, layers };
}

export function parseStorage(raw: string): EditorStorage {
  const value = JSON.parse(raw);
  if (value.version !== 1 || !Array.isArray(value.saved)) throw new Error("Invalid storage");
  return { version: 1, draft: parseProject(value.draft), saved: value.saved.map(parseProject) };
}

export function layerBounds(layer: CrosshairLayer) {
  const padding = layer.outlineWidth + ("thickness" in layer ? layer.thickness / 2 : 0);
  const width = layer.type === "line" ? layer.length : layer.type === "rectangle" ? layer.width : layer.radius * 2;
  const height = layer.type === "line" ? 0 : layer.type === "rectangle" ? layer.height : layer.radius * 2;
  return { x: -width / 2 - padding, y: -height / 2 - padding, width: width + padding * 2, height: height + padding * 2 };
}

export function layerSvg(layer: CrosshairLayer): string {
  const shape = (color: string, extra = 0) => {
    if (layer.type === "dot") return `<circle r="${layer.radius + extra}" fill="${color}"/>`;
    const stroke = `fill="none" stroke="${color}" stroke-width="${layer.thickness + extra * 2}" stroke-linejoin="round"`;
    if (layer.type === "line") return `<path d="M ${-layer.length / 2} 0 H ${layer.length / 2}" ${stroke} stroke-linecap="${layer.cap}"/>`;
    if (layer.type === "ring") return `<circle r="${layer.radius}" ${stroke}/>`;
    return `<rect x="${-layer.width / 2}" y="${-layer.height / 2}" width="${layer.width}" height="${layer.height}" ${stroke}/>`;
  };
  return `<g opacity="${layer.opacity}">${layer.outlineWidth ? shape(layer.outlineColor, layer.outlineWidth) : ""}${shape(layer.color)}</g>`;
}

export function projectSvg(project: CrosshairProject): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="-128 -128 256 256">${project.layers.filter(layer => layer.visible).map(layer => `<g transform="translate(${layer.x} ${layer.y}) rotate(${layer.rotation})">${layerSvg(layer)}</g>`).join("")}</svg>`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export const projectFilename = (project: CrosshairProject) => project.name.replace(/[^\p{L}\p{N}_-]+/gu, "-").slice(0, 80) || "crosshair";
export async function exportProjectPng(project: CrosshairProject, size: 256 | 512 | 1024) {
  const url = URL.createObjectURL(new Blob([projectSvg(project)], { type: "image/svg+xml" }));
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = reject; image.src = url; });
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas unavailable");
    context.drawImage(image, 0, 0, size, size);
    const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error("PNG failed")), "image/png"));
    downloadBlob(blob, `${projectFilename(project)}-${size}.png`);
  } finally { URL.revokeObjectURL(url); }
}
