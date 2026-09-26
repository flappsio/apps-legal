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
  hasShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  hasNeon: boolean;
  neonColor: string;
  neonBlur: number;
  gap: number;
  groupId?: string;
}
export type CrosshairLayer = LayerBase & (
  | { type: "line"; length: number; thickness: number; cap: "butt" | "round" }
  | { type: "dot"; radius: number }
  | { type: "ring"; radius: number; thickness: number }
  | { type: "rectangle"; width: number; height: number; thickness: number }
  | { type: "triangle"; radius: number; thickness: number }
  | { type: "star"; radius: number; points: number; innerRadius: number; thickness: number }
  | { type: "brackets"; width: number; height: number; thickness: number; cornerLength: number }
  | { type: "diamond"; size: number; thickness: number }
  | { type: "cross"; length: number; thickness: number; gap: number; cap: "butt" | "round" }
  | { type: "t"; length: number; thickness: number; gap: number; cap: "butt" | "round" }
);
export type ElementType = CrosshairLayer["type"];
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

export function createLayer(type: CrosshairLayer["type"], name: string, color = "#10b981"): CrosshairLayer {
  const base: LayerBase = { 
    id: uid(), name, visible: true, locked: false, x: 0, y: 0, rotation: 0, 
    color, opacity: 1, outlineColor: "#000000", outlineWidth: 1,
    hasShadow: false, shadowColor: "#000000", shadowBlur: 4,
    hasNeon: false, neonColor: color, neonBlur: 8,
    gap: 10
  };
  switch (type) {
    case "line": return { ...base, type, x: 0, length: 16, thickness: 2, cap: "butt" };
    case "dot": return { ...base, type, radius: 3 };
    case "ring": return { ...base, type, radius: 20, thickness: 2 };
    case "rectangle": return { ...base, type, width: 32, height: 32, thickness: 2 };
    case "triangle": return { ...base, type, radius: 16, thickness: 2 };
    case "star": return { ...base, type, radius: 20, points: 5, innerRadius: 8, thickness: 2 };
    case "brackets": return { ...base, type, width: 40, height: 40, thickness: 2, cornerLength: 10 };
    case "diamond": return { ...base, type, size: 20, thickness: 2 };
    case "cross": return { ...base, type, length: 14, thickness: 2, gap: 6, cap: "butt" };
    case "t": return { ...base, type, length: 14, thickness: 2, gap: 6, cap: "butt" };
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
export function moveLayerTo(project: CrosshairProject, id: string, target: "front" | "back"): CrosshairProject {
  const index = project.layers.findIndex(layer => layer.id === id);
  if (index < 0 || project.layers[index].locked) return project;
  const layers = [...project.layers];
  const [layer] = layers.splice(index, 1);
  if (target === "front") layers.push(layer);
  else layers.unshift(layer);
  return { ...project, layers };
}
export function duplicateLayer(project: CrosshairProject, id: string): CrosshairProject {
  const index = project.layers.findIndex(layer => layer.id === id);
  if (index < 0 || project.layers[index].locked || project.layers.length >= MAX_LAYERS) return project;
  const layers = [...project.layers];
  layers.splice(index + 1, 0, { ...layers[index], id: uid(), name: `${layers[index].name} +` });
  return { ...project, layers };
}

export function groupLayers(project: CrosshairProject, ids: string[]): CrosshairProject {
  if (ids.length < 2) return project;
  const newGroupId = uid();
  const layers = project.layers.map(layer => ids.includes(layer.id) ? { ...layer, groupId: newGroupId } : layer);
  return { ...project, layers };
}

export function ungroupLayers(project: CrosshairProject, ids: string[]): CrosshairProject {
  const targetGroupIds = new Set(
    project.layers.filter(l => ids.includes(l.id) && l.groupId).map(l => l.groupId!)
  );
  if (targetGroupIds.size === 0) return project;
  const layers = project.layers.map(layer => layer.groupId && targetGroupIds.has(layer.groupId) ? { ...layer, groupId: undefined } : layer);
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
    const base: LayerBase = { 
      id, name: str(layer.name), visible: bool(layer.visible), locked: bool(layer.locked), 
      x: num(layer.x, -128, 128), y: num(layer.y, -128, 128), rotation: num(layer.rotation, -360, 360), 
      color: color(layer.color), opacity: num(layer.opacity, 0, 1), 
      outlineColor: color(layer.outlineColor), outlineWidth: num(layer.outlineWidth, 0, 16),
      hasShadow: typeof layer.hasShadow === 'boolean' ? layer.hasShadow : false,
      shadowColor: typeof layer.shadowColor === 'string' && isColor(layer.shadowColor) ? layer.shadowColor : "#000000",
      shadowBlur: typeof layer.shadowBlur === 'number' ? num(layer.shadowBlur, 0, 64) : 4,
      hasNeon: typeof layer.hasNeon === 'boolean' ? layer.hasNeon : false,
      neonColor: typeof layer.neonColor === 'string' && isColor(layer.neonColor) ? layer.neonColor : (typeof layer.color === 'string' && isColor(layer.color) ? layer.color : "#10b981"),
      neonBlur: typeof layer.neonBlur === 'number' ? num(layer.neonBlur, 0, 64) : 8,
      gap: typeof layer.gap === 'number' ? num(layer.gap, 0, 128) : 10,
      groupId: typeof layer.groupId === 'string' ? str(layer.groupId, 100) : undefined,
    };
    switch (layer.type) {
      case "line": {
        if (layer.cap !== "butt" && layer.cap !== "round") throw new Error("Invalid cap");
        return { ...base, type: layer.type, length: num(layer.length, 1, 256), thickness: num(layer.thickness, 0.5, 64), cap: layer.cap };
      }
      case "dot": return { ...base, type: layer.type, radius: num(layer.radius, 0.5, 128) };
      case "ring": return { ...base, type: layer.type, radius: num(layer.radius, 0.5, 128), thickness: num(layer.thickness, 0.5, 64) };
      case "rectangle": return { ...base, type: layer.type, width: num(layer.width, 1, 256), height: num(layer.height, 1, 256), thickness: num(layer.thickness, 0.5, 64) };
      case "triangle": return { ...base, type: layer.type, radius: num(layer.radius, 1, 128), thickness: num(layer.thickness, 0.5, 64) };
      case "star": return { ...base, type: layer.type, radius: num(layer.radius, 1, 128), points: num(layer.points, 3, 12), innerRadius: num(layer.innerRadius, 1, 128), thickness: num(layer.thickness, 0.5, 64) };
      case "brackets": return { ...base, type: layer.type, width: num(layer.width, 1, 256), height: num(layer.height, 1, 256), thickness: num(layer.thickness, 0.5, 64), cornerLength: num(layer.cornerLength, 1, 128) };
      case "diamond": return { ...base, type: layer.type, size: num(layer.size, 1, 128), thickness: num(layer.thickness, 0.5, 64) };
      case "cross": {
        if (layer.cap !== "butt" && layer.cap !== "round") throw new Error("Invalid cap");
        return { ...base, type: layer.type, length: num(layer.length, 1, 256), thickness: num(layer.thickness, 0.5, 64), gap: num(layer.gap, 0, 128), cap: layer.cap };
      }
      case "t": {
        if (layer.cap !== "butt" && layer.cap !== "round") throw new Error("Invalid cap");
        return { ...base, type: layer.type, length: num(layer.length, 1, 256), thickness: num(layer.thickness, 0.5, 64), gap: num(layer.gap, 0, 128), cap: layer.cap };
      }
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
  const padding = layer.outlineWidth + ("thickness" in layer ? layer.thickness / 2 : 0) + 4;
  let width = 0;
  let height = 0;

  switch (layer.type) {
    case "line":
      width = layer.length;
      height = Math.max(layer.thickness, 8);
      break;
    case "rectangle":
    case "brackets":
      width = layer.width;
      height = layer.height;
      break;
    case "dot":
    case "ring":
    case "triangle":
    case "star":
      width = layer.radius * 2;
      height = layer.radius * 2;
      break;
    case "diamond":
      width = layer.size * 2;
      height = layer.size * 2;
      break;
    case "cross":
    case "t": {
      const span = (layer.gap + layer.length) * 2;
      width = span;
      height = span;
      break;
    }
  }

  return { 
    x: -width / 2 - padding, 
    y: -height / 2 - padding, 
    width: Math.max(16, width + padding * 2), 
    height: Math.max(16, height + padding * 2) 
  };
}

export function layerSvg(layer: CrosshairLayer): string {
  const shape = (color: string, extra = 0) => {
    if (layer.type === "dot") return `<circle r="${layer.radius + extra}" fill="${color}"/>`;
    
    const stroke = `fill="none" stroke="${color}" stroke-width="${layer.thickness + extra * 2}" stroke-linejoin="round"`;
    
    if (layer.type === "line") return `<path d="M ${-layer.length / 2} 0 H ${layer.length / 2}" ${stroke} stroke-linecap="${layer.cap}"/>`;
    if (layer.type === "ring") return `<circle r="${layer.radius}" ${stroke}/>`;
    if (layer.type === "rectangle") return `<rect x="${-layer.width / 2}" y="${-layer.height / 2}" width="${layer.width}" height="${layer.height}" ${stroke}/>`;
    
    if (layer.type === "triangle") {
      const h = layer.radius * Math.sqrt(3) / 2;
      return `<polygon points="0,${-layer.radius} ${h},${layer.radius/2} ${-h},${layer.radius/2}" ${stroke}/>`;
    }
    
    if (layer.type === "star") {
      let path = "M";
      for (let i = 0; i < layer.points * 2; i++) {
        const r = i % 2 === 0 ? layer.radius : layer.innerRadius;
        const angle = (i * Math.PI) / layer.points - Math.PI / 2;
        path += ` ${r * Math.cos(angle)},${r * Math.sin(angle)}`;
      }
      path += " Z";
      return `<path d="${path}" ${stroke}/>`;
    }
    
    if (layer.type === "brackets") {
      const w = layer.width / 2;
      const h = layer.height / 2;
      const c = layer.cornerLength;
      return `
        <path d="M ${-w+c} ${-h} H ${-w} V ${-h+c}" ${stroke}/>
        <path d="M ${w-c} ${-h} H ${w} V ${-h+c}" ${stroke}/>
        <path d="M ${-w+c} ${h} H ${-w} V ${h-c}" ${stroke}/>
        <path d="M ${w-c} ${h} H ${w} V ${h-c}" ${stroke}/>
      `;
    }

    if (layer.type === "diamond") {
      const s = layer.size;
      return `<polygon points="0,${-s} ${s},0 0,${s} ${-s},0" ${stroke}/>`;
    }

    if (layer.type === "cross") {
      const g = layer.gap;
      const l = layer.length;
      return `
        <path d="M 0 ${-g} V ${-g - l}" ${stroke} stroke-linecap="${layer.cap}"/>
        <path d="M 0 ${g} V ${g + l}" ${stroke} stroke-linecap="${layer.cap}"/>
        <path d="M ${-g} 0 H ${-g - l}" ${stroke} stroke-linecap="${layer.cap}"/>
        <path d="M ${g} 0 H ${g + l}" ${stroke} stroke-linecap="${layer.cap}"/>
      `;
    }

    if (layer.type === "t") {
      const g = layer.gap;
      const l = layer.length;
      return `
        <path d="M 0 ${g} V ${g + l}" ${stroke} stroke-linecap="${layer.cap}"/>
        <path d="M ${-g} 0 H ${-g - l}" ${stroke} stroke-linecap="${layer.cap}"/>
        <path d="M ${g} 0 H ${g + l}" ${stroke} stroke-linecap="${layer.cap}"/>
      `;
    }
    
    return "";
  };

  const filterId = `glow_${layer.id}`;
  const filter = (layer.hasNeon || layer.hasShadow) ? `
    <filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%">
      ${layer.hasShadow ? `<feDropShadow dx="0" dy="0" stdDeviation="${layer.shadowBlur/2}" flood-color="${layer.shadowColor}" />` : ''}
      ${layer.hasNeon ? `<feDropShadow dx="0" dy="0" stdDeviation="${layer.neonBlur/2}" flood-color="${layer.neonColor}" />` : ''}
    </filter>
  ` : '';

  return `
    ${filter ? `<defs>${filter}</defs>` : ''}
    <g opacity="${layer.opacity}" ${filter ? `filter="url(#${filterId})"` : ''}>
      ${layer.outlineWidth ? shape(layer.outlineColor, layer.outlineWidth) : ""}
      ${shape(layer.color)}
    </g>
  `;
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
