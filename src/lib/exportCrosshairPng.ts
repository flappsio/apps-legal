import type { CrosshairShape } from "@/context/CrosshairStateContext";

export interface CrosshairExportOptions {
  shape: CrosshairShape;
  size: number;
  thickness: number;
  gap: number;
  color: string;
  outline: boolean;
  centerDot: boolean;
  opacity?: number;
  filename?: string;
  exportSize?: number;
}

/**
 * Generates a transparent high-resolution PNG image of the reticle and triggers an automatic browser download.
 */
export function exportCrosshairToPng(options: CrosshairExportOptions): boolean {
  if (typeof document === "undefined") return false;

  const {
    shape,
    size,
    thickness,
    gap,
    color,
    outline,
    centerDot,
    opacity = 1,
    filename,
    exportSize = 512,
  } = options;

  const canvas = document.createElement("canvas");
  canvas.width = exportSize;
  canvas.height = exportSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;

  const center = exportSize / 2;
  const scale = exportSize / 64; // standard 8 scale at 512px
  const arm = size * scale;
  const gapSize = gap * scale;
  const lineWidth = Math.max(2, thickness * scale);

  const drawPath = (stroke: string, width: number) => {
    ctx.strokeStyle = stroke;
    ctx.fillStyle = stroke;
    ctx.lineWidth = width;
    ctx.lineCap = "butt";
    ctx.lineJoin = "round";

    if (shape === "dot") {
      ctx.beginPath();
      ctx.arc(center, center, Math.max(4, size * scale), 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    if (shape === "circle" || shape === "precision") {
      ctx.beginPath();
      const ringRadius = shape === "precision" ? Math.max(12, (gapSize + arm) * 0.75) : (size * scale * 1.75);
      ctx.arc(center, center, ringRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (shape === "box" || shape === "diamond") {
      const half = size * scale * 1.6;
      ctx.save();
      ctx.translate(center, center);
      if (shape === "diamond") ctx.rotate(Math.PI / 4);
      ctx.strokeRect(-half, -half, half * 2, half * 2);
      ctx.restore();
    } else if (shape !== "circle") {
      ctx.beginPath();
      ctx.moveTo(center - gapSize - arm, center);
      ctx.lineTo(center - gapSize, center);
      ctx.moveTo(center + gapSize, center);
      ctx.lineTo(center + gapSize + arm, center);
      if (shape === "t-cross") {
        ctx.moveTo(center, center + gapSize);
        ctx.lineTo(center, center + gapSize + arm * 1.1);
      } else {
        ctx.moveTo(center, center - gapSize - arm);
        ctx.lineTo(center, center - gapSize);
        ctx.moveTo(center, center + gapSize);
        ctx.lineTo(center, center + gapSize + arm);
      }
      ctx.stroke();
    }

    if (centerDot || shape === "precision") {
      ctx.beginPath();
      ctx.arc(center, center, Math.max(2, lineWidth * 0.65), 0, Math.PI * 2);
      ctx.fill();
    }
  };

  ctx.globalAlpha = opacity;
  if (outline) drawPath("#000000", lineWidth + 6);
  drawPath(color, lineWidth);

  const cleanColor = color.startsWith("#") ? color.slice(1).toLowerCase() : color.toLowerCase();
  const link = document.createElement("a");
  link.download = filename || `crossio-${shape}-${cleanColor}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  return true;
}
