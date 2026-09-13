import { useEffect, useRef, useState } from "react";
import { CrosshairLayer, CrosshairProject, clamp, layerBounds, layerSvg } from "@/lib/crosshairEditor";

interface Props {
  project: CrosshairProject;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onMove: (id: string, x: number, y: number) => void;
  zoom: number | "fit";
  snap: boolean;
  scene: string;
  label: string;
}

export function EditorCanvas({ project, selectedId, onSelect, onMove, zoom, snap, scene, label }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<{ id: string; pointer: number; x: number; y: number; startX: number; startY: number } | null>(null);
  const [fit, setFit] = useState(1);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setFit(Math.max(0.25, Math.min(entry.contentRect.width - 48, entry.contentRect.height - 48) / 256)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const point = (e: React.PointerEvent) => {
    const matrix = svg.current?.getScreenCTM();
    if (!matrix) return { x: 0, y: 0 };
    return new DOMPoint(e.clientX, e.clientY).matrixTransform(matrix.inverse());
  };
  const start = (e: React.PointerEvent<SVGGElement>, layer: CrosshairLayer) => {
    if (e.button !== 0 || layer.locked) return;
    e.stopPropagation();
    onSelect(layer.id);
    svg.current?.focus();
    const p = point(e);
    drag.current = { id: layer.id, pointer: e.pointerId, x: layer.x, y: layer.y, startX: p.x, startY: p.y };
    svg.current?.setPointerCapture(e.pointerId);
  };
  const stop = () => { drag.current = null; };
  const scale = zoom === "fit" ? fit : zoom;
  return <div ref={host} className={`editor-canvas editor-scene-${scene}`}>
    <div className="editor-artboard" style={{ width: 256 * scale, height: 256 * scale }}>
      <svg ref={svg} xmlns="http://www.w3.org/2000/svg" viewBox="-128 -128 256 256" tabIndex={0} role="group" aria-label={label}
        onPointerDown={() => onSelect(null)}
        onPointerMove={e => {
          const current = drag.current;
          if (!current || e.pointerId !== current.pointer) return;
          const p = point(e);
          const round = (n: number) => snap ? Math.round(n) : Math.round(n * 100) / 100;
          onMove(current.id, clamp(round(current.x + p.x - current.startX), -128, 128), clamp(round(current.y + p.y - current.startY), -128, 128));
        }} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop}
        onKeyDown={e => {
          const layer = project.layers.find(item => item.id === selectedId);
          if (!layer || layer.locked || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
          e.preventDefault();
          const amount = e.shiftKey ? 10 : 1;
          onMove(layer.id, clamp(layer.x + (e.key === "ArrowLeft" ? -amount : e.key === "ArrowRight" ? amount : 0), -128, 128), clamp(layer.y + (e.key === "ArrowUp" ? -amount : e.key === "ArrowDown" ? amount : 0), -128, 128));
        }}>
        <g pointerEvents="none" className="editor-guides"><path d="M -128 0 H 128 M 0 -128 V 128" fill="none" stroke="currentColor" strokeWidth={1 / scale} strokeDasharray={`${3 / scale} ${5 / scale}`} /></g>
        {project.layers.filter(layer => layer.visible).map(layer => <g key={layer.id} transform={`translate(${layer.x} ${layer.y}) rotate(${layer.rotation})`}
          onPointerDown={e => start(e, layer)} style={{ cursor: layer.locked ? "default" : "move" }}>
          <g pointerEvents="none" dangerouslySetInnerHTML={{ __html: layerSvg(layer) }} />
          {!layer.locked && <rect {...layerBounds(layer)} fill="transparent" stroke="transparent" strokeWidth={8 / scale} />}
          {selectedId === layer.id && <rect {...layerBounds(layer)} fill="none" stroke="hsl(var(--primary))" strokeWidth={1 / scale} strokeDasharray={`${4 / scale} ${2 / scale}`} pointerEvents="none" />}
        </g>)}
      </svg>
    </div>
  </div>;
}
