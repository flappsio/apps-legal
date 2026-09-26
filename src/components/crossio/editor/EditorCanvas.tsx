import { useEffect, useRef, useState } from "react";
import { Copy, LockKeyhole, MoreHorizontal, Trash2, UnlockKeyhole, Layers, ArrowUp, ArrowDown, ChevronsUp, ChevronsDown, Crosshair } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { CrosshairLayer, CrosshairProject, clamp, layerBounds, layerSvg } from "@/lib/crosshairEditor";

interface Props {
  project: CrosshairProject;
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
  onMove: (moves: { id: string; x: number; y: number }[], isFinal?: boolean) => void;
  onDuplicate: (id?: string) => void;
  onDelete: () => void;
  onToggleLock: () => void;
  onGroup: () => void;
  onUngroup: () => void;
  onReorder: (direction: -1 | 1) => void;
  onMoveTo: (target: "front" | "back") => void;
  onCenterAlign: () => void;
  zoom: number | "fit";
  snap: boolean;
  scene: string;
  label: string;
  isTr?: boolean;
}

export function EditorCanvas({
  project,
  selectedIds,
  onSelect,
  onMove,
  onDuplicate,
  onDelete,
  onToggleLock,
  onGroup,
  onUngroup,
  onReorder,
  onMoveTo,
  onCenterAlign,
  zoom,
  snap,
  scene,
  label,
  isTr = true,
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<{ pointer: number; startX: number; startY: number; layers: { id: string; x: number; y: number }[] } | null>(null);
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
    if (e.button !== 0) return;
    e.stopPropagation();

    const isShift = e.shiftKey || e.metaKey || e.ctrlKey;
    let nextIds: string[];

    if (isShift) {
      if (selectedIds.includes(layer.id)) {
        nextIds = selectedIds.filter(id => id !== layer.id);
      } else {
        nextIds = [...selectedIds, layer.id];
      }
    } else {
      if (selectedIds.includes(layer.id)) {
        nextIds = selectedIds;
      } else {
        if (layer.groupId) {
          nextIds = project.layers.filter(l => l.groupId === layer.groupId).map(l => l.id);
        } else {
          nextIds = [layer.id];
        }
      }
    }

    onSelect(nextIds);
    svg.current?.focus();

    if (layer.locked) return;

    const p = point(e);
    const activeLayers = project.layers
      .filter(l => nextIds.includes(l.id) && !l.locked)
      .map(l => ({ id: l.id, x: l.x, y: l.y }));

    drag.current = {
      pointer: e.pointerId,
      startX: p.x,
      startY: p.y,
      layers: activeLayers,
    };
    svg.current?.setPointerCapture(e.pointerId);
  };

  const stop = () => { drag.current = null; };
  const scale = zoom === "fit" ? fit : zoom;

  // Selected layers calculation for collective bounding box
  const selectedLayers = project.layers.filter(l => selectedIds.includes(l.id) && l.visible);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const layer of selectedLayers) {
    const b = layerBounds(layer);
    minX = Math.min(minX, layer.x + b.x);
    minY = Math.min(minY, layer.y + b.y);
    maxX = Math.max(maxX, layer.x + b.x + b.width);
    maxY = Math.max(maxY, layer.y + b.y + b.height);
  }
  const hasSelection = selectedLayers.length > 0 && Number.isFinite(minX);
  const selW = maxX - minX;
  const selH = maxY - minY;

  // Popover screen coordinates relative to artboard
  const artboardW = 256 * scale;
  const popoverX = hasSelection ? Math.max(80, Math.min(artboardW - 80, (128 + minX + selW / 2) * scale)) : 0;
  const rawPopoverY = hasSelection ? (128 + minY) * scale - 14 : 0;
  const isPopoverBelow = rawPopoverY < 48;
  const popoverY = isPopoverBelow && hasSelection ? (128 + maxY) * scale + 14 : rawPopoverY;

  const allLocked = selectedLayers.length > 0 && selectedLayers.every(l => l.locked);
  const canGroup = selectedLayers.length >= 2;
  const canUngroup = selectedLayers.some(l => l.groupId);

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <div ref={host} className={`editor-canvas editor-scene-${scene}`}>
          <div className="editor-artboard" style={{ width: 256 * scale, height: 256 * scale, position: 'relative' }}>
            <svg ref={svg} xmlns="http://www.w3.org/2000/svg" viewBox="-128 -128 256 256" tabIndex={0} role="group" aria-label={label}
              onPointerDown={() => onSelect([])}
              onPointerMove={e => {
                const current = drag.current;
                if (!current || e.pointerId !== current.pointer) return;
                const p = point(e);
                const dx = p.x - current.startX;
                const dy = p.y - current.startY;
                const round = (n: number) => snap ? Math.round(n) : Math.round(n * 100) / 100;
                const moves = current.layers.map(l => ({
                  id: l.id,
                  x: clamp(round(l.x + dx), -128, 128),
                  y: clamp(round(l.y + dy), -128, 128),
                }));
                onMove(moves, false);
              }}
              onPointerUp={e => {
                const current = drag.current;
                if (current) {
                  const p = point(e as any);
                  const dx = p.x - current.startX;
                  const dy = p.y - current.startY;
                  const round = (n: number) => snap ? Math.round(n) : Math.round(n * 100) / 100;
                  const moves = current.layers.map(l => ({
                    id: l.id,
                    x: clamp(round(l.x + dx), -128, 128),
                    y: clamp(round(l.y + dy), -128, 128),
                  }));
                  onMove(moves, true);
                }
                stop();
              }}
              onPointerCancel={stop}
              onLostPointerCapture={stop}
              onKeyDown={e => {
                if (selectedLayers.length === 0 || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
                e.preventDefault();
                const amount = e.shiftKey ? 10 : 1;
                const dx = e.key === "ArrowLeft" ? -amount : e.key === "ArrowRight" ? amount : 0;
                const dy = e.key === "ArrowUp" ? -amount : e.key === "ArrowDown" ? amount : 0;
                const moves = selectedLayers.filter(l => !l.locked).map(l => ({
                  id: l.id,
                  x: clamp(l.x + dx, -128, 128),
                  y: clamp(l.y + dy, -128, 128),
                }));
                if (moves.length > 0) onMove(moves, true);
              }}>
              <g pointerEvents="none" className="editor-guides">
                <path d="M -128 0 H 128 M 0 -128 V 128" fill="none" stroke="currentColor" strokeWidth={1 / scale} strokeDasharray={`${3 / scale} ${5 / scale}`} />
              </g>

              {/* Render Crosshair Layers */}
              {project.layers.filter(layer => layer.visible).map(layer => (
                <g key={layer.id} transform={`translate(${layer.x} ${layer.y}) rotate(${layer.rotation})`}
                  onPointerDown={e => start(e, layer)}
                  onContextMenu={() => {
                    if (!selectedIds.includes(layer.id)) onSelect([layer.id]);
                  }}
                  style={{ cursor: layer.locked ? "default" : "move" }}>
                  <g pointerEvents="none" dangerouslySetInnerHTML={{ __html: layerSvg(layer) }} />
                  {!layer.locked && <rect {...layerBounds(layer)} fill="transparent" stroke="transparent" strokeWidth={8 / scale} pointerEvents="all" />}
                </g>
              ))}

              {/* Collective Selection Bounding Box with Corner Dots (Canva Style) */}
              {hasSelection && (
                <g pointerEvents="none">
                  <rect
                    x={minX} y={minY} width={selW} height={selH}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth={1.5 / scale}
                    strokeDasharray={`${4 / scale} ${2 / scale}`}
                  />
                  {/* 4 Corner Handles */}
                  {[[minX, minY], [maxX, minY], [minX, maxY], [maxX, maxY]].map(([cx, cy], idx) => (
                    <circle
                      key={idx}
                      cx={cx} cy={cy}
                      r={4.5 / scale}
                      fill="white"
                      stroke="hsl(var(--primary))"
                      strokeWidth={1.5 / scale}
                    />
                  ))}
                </g>
              )}
            </svg>

            {/* Canva-style Selection Popover Bar Directly Above Object */}
            {hasSelection && (
              <div
                className="canva-floating-popover"
                style={{
                  left: `${popoverX}px`,
                  top: `${popoverY}px`,
                  transform: isPopoverBelow ? "translate(-50%, 0)" : "translate(-50%, -100%)",
                }}
                onPointerDown={e => e.stopPropagation()}>
                <button type="button" className="canva-popover-btn" title={allLocked ? (isTr ? "Kilidi Aç" : "Unlock") : (isTr ? "Kilitle" : "Lock")} onClick={onToggleLock}>
                  {allLocked ? <LockKeyhole size={14} /> : <UnlockKeyhole size={14} />}
                </button>
                <button type="button" className="canva-popover-btn" title={isTr ? "Çoğalt (Ctrl+D)" : "Duplicate (Ctrl+D)"} onClick={() => onDuplicate()}>
                  <Copy size={14} />
                </button>
                {canGroup && (
                  <button type="button" className="canva-popover-btn canva-popover-badge-btn" title={isTr ? "Grupla (Ctrl+G)" : "Group (Ctrl+G)"} onClick={onGroup}>
                    <Layers size={14} />
                    <span>{isTr ? "Grupla" : "Group"}</span>
                  </button>
                )}
                {canUngroup && (
                  <button type="button" className="canva-popover-btn canva-popover-badge-btn" title={isTr ? "Grubu Çöz (Ctrl+Shift+G)" : "Ungroup (Ctrl+Shift+G)"} onClick={onUngroup}>
                    <Layers size={14} />
                    <span>{isTr ? "Grubu Çöz" : "Ungroup"}</span>
                  </button>
                )}
                <button type="button" className="canva-popover-btn canva-popover-danger" title={isTr ? "Sil (Delete)" : "Delete"} onClick={onDelete}>
                  <Trash2 size={14} />
                </button>
                <span className="canva-popover-divider" />
                
                {/* Radix Dropdown Menu for "..." button */}
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button type="button" className="canva-popover-btn" title={isTr ? "Daha Fazla" : "More options"} aria-label={isTr ? "Daha Fazla" : "More options"}>
                      <MoreHorizontal size={14} />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="canva-radix-menu"
                      side="bottom"
                      align="center"
                      sideOffset={8}
                      collisionPadding={16}
                      avoidCollisions={true}
                    >
                      <DropdownMenu.Item className="canva-menu-item" onSelect={() => onDuplicate()}>
                        <Copy size={14} />
                        <span>{isTr ? "Çoğalt" : "Duplicate"}</span>
                        <small>Ctrl+D</small>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="canva-menu-item" onSelect={() => onCenterAlign()}>
                        <Crosshair size={14} />
                        <span>{isTr ? "Merkeze Hizala" : "Center on Canvas"}</span>
                      </DropdownMenu.Item>

                      <DropdownMenu.Separator className="canva-menu-separator" />

                      <DropdownMenu.Item className="canva-menu-item" onSelect={() => onMoveTo("front")}>
                        <ChevronsUp size={14} />
                        <span>{isTr ? "En öne getir" : "Bring to Front"}</span>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="canva-menu-item" onSelect={() => onReorder(1)}>
                        <ArrowUp size={14} />
                        <span>{isTr ? "Bir öne getir" : "Bring Forward"}</span>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="canva-menu-item" onSelect={() => onReorder(-1)}>
                        <ArrowDown size={14} />
                        <span>{isTr ? "Bir arkaya gönder" : "Send Backward"}</span>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="canva-menu-item" onSelect={() => onMoveTo("back")}>
                        <ChevronsDown size={14} />
                        <span>{isTr ? "En arkaya gönder" : "Send to Back"}</span>
                      </DropdownMenu.Item>

                      <DropdownMenu.Separator className="canva-menu-separator" />

                      {canGroup && (
                        <DropdownMenu.Item className="canva-menu-item" onSelect={() => onGroup()}>
                          <Layers size={14} />
                          <span>{isTr ? "Grupla" : "Group"}</span>
                          <small>Ctrl+G</small>
                        </DropdownMenu.Item>
                      )}
                      {canUngroup && (
                        <DropdownMenu.Item className="canva-menu-item" onSelect={() => onUngroup()}>
                          <Layers size={14} />
                          <span>{isTr ? "Grubu Çöz" : "Ungroup"}</span>
                          <small>Ctrl+Shift+G</small>
                        </DropdownMenu.Item>
                      )}

                      <DropdownMenu.Item className="canva-menu-item" onSelect={() => onToggleLock()}>
                        {allLocked ? <UnlockKeyhole size={14} /> : <LockKeyhole size={14} />}
                        <span>{allLocked ? (isTr ? "Kilidi Aç" : "Unlock") : (isTr ? "Kilitle" : "Lock")}</span>
                      </DropdownMenu.Item>

                      <DropdownMenu.Separator className="canva-menu-separator" />

                      <DropdownMenu.Item className="canva-menu-item canva-menu-danger" onSelect={() => onDelete()}>
                        <Trash2 size={14} />
                        <span>{isTr ? "Sil" : "Delete"}</span>
                        <small>Del</small>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            )}
          </div>
        </div>
      </ContextMenu.Trigger>

      {/* Radix Context Menu on Right Click */}
      <ContextMenu.Portal>
        <ContextMenu.Content
          className="canva-radix-menu"
          collisionPadding={16}
          avoidCollisions={true}
        >
          {hasSelection ? (
            <>
              <ContextMenu.Item className="canva-menu-item" onSelect={() => onDuplicate()}>
                <Copy size={14} />
                <span>{isTr ? "Çoğalt" : "Duplicate"}</span>
                <small>Ctrl+D</small>
              </ContextMenu.Item>
              <ContextMenu.Item className="canva-menu-item" onSelect={() => onCenterAlign()}>
                <Crosshair size={14} />
                <span>{isTr ? "Merkeze Hizala" : "Center on Canvas"}</span>
              </ContextMenu.Item>

              <ContextMenu.Separator className="canva-menu-separator" />

              <ContextMenu.Item className="canva-menu-item" onSelect={() => onMoveTo("front")}>
                <ChevronsUp size={14} />
                <span>{isTr ? "En öne getir" : "Bring to Front"}</span>
              </ContextMenu.Item>
              <ContextMenu.Item className="canva-menu-item" onSelect={() => onReorder(1)}>
                <ArrowUp size={14} />
                <span>{isTr ? "Bir öne getir" : "Bring Forward"}</span>
              </ContextMenu.Item>
              <ContextMenu.Item className="canva-menu-item" onSelect={() => onReorder(-1)}>
                <ArrowDown size={14} />
                <span>{isTr ? "Bir arkaya gönder" : "Send Backward"}</span>
              </ContextMenu.Item>
              <ContextMenu.Item className="canva-menu-item" onSelect={() => onMoveTo("back")}>
                <ChevronsDown size={14} />
                <span>{isTr ? "En arkaya gönder" : "Send to Back"}</span>
              </ContextMenu.Item>

              <ContextMenu.Separator className="canva-menu-separator" />

              {canGroup && (
                <ContextMenu.Item className="canva-menu-item" onSelect={() => onGroup()}>
                  <Layers size={14} />
                  <span>{isTr ? "Grupla" : "Group"}</span>
                  <small>Ctrl+G</small>
                </ContextMenu.Item>
              )}
              {canUngroup && (
                <ContextMenu.Item className="canva-menu-item" onSelect={() => onUngroup()}>
                  <Layers size={14} />
                  <span>{isTr ? "Grubu Çöz" : "Ungroup"}</span>
                  <small>Ctrl+Shift+G</small>
                </ContextMenu.Item>
              )}

              <ContextMenu.Item className="canva-menu-item" onSelect={() => onToggleLock()}>
                {allLocked ? <UnlockKeyhole size={14} /> : <LockKeyhole size={14} />}
                <span>{allLocked ? (isTr ? "Kilidi Aç" : "Unlock") : (isTr ? "Kilitle" : "Lock")}</span>
              </ContextMenu.Item>

              <ContextMenu.Separator className="canva-menu-separator" />

              <ContextMenu.Item className="canva-menu-item canva-menu-danger" onSelect={() => onDelete()}>
                <Trash2 size={14} />
                <span>{isTr ? "Sil" : "Delete"}</span>
                <small>Del</small>
              </ContextMenu.Item>
            </>
          ) : (
            project.layers.length > 0 ? (
              <ContextMenu.Item className="canva-menu-item" onSelect={() => onSelect(project.layers.map(l => l.id))}>
                <Layers size={14} />
                <span>{isTr ? "Tümünü Seç" : "Select All"}</span>
                <small>Ctrl+A</small>
              </ContextMenu.Item>
            ) : (
              <ContextMenu.Item className="canva-menu-item" disabled style={{ opacity: 0.5, cursor: 'default' }}>
                <span>{isTr ? "Katman yok" : "No layers"}</span>
              </ContextMenu.Item>
            )
          )}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

