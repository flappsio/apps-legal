import React, { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState, COLOR_OPTIONS, CrosshairShape } from "@/context/CrosshairStateContext";
import { Check, Copy, RefreshCw, Sparkles, Move } from "lucide-react";
import { Button } from "@/components/ui/button";

const SHAPES: { id: CrosshairShape; symbol: string; label: string }[] = [
  { id: "cross", symbol: "+", label: "Classic Cross" },
  { id: "dot", symbol: "•", label: "Pro Dot" },
  { id: "circle", symbol: "○", label: "Combat Circle" },
  { id: "precision", symbol: "⊕", label: "Precision" },
  { id: "t-cross", symbol: "T", label: "Sniper T" },
  { id: "diamond", symbol: "◇", label: "Diamond" },
  { id: "box", symbol: "□", label: "CQB Box" },
];

const SCENES = [
  {
    id: "arena-dark",
    name: { tr: "Karanlık Poligon", en: "Dark Training Arena" },
    gradient: "linear-gradient(135deg, #090a0f 0%, #151824 50%, #0c0e14 100%)",
  },
  {
    id: "desert-sand",
    name: { tr: "Çöl / Kum Haritası", en: "Desert Sand Map" },
    gradient: "linear-gradient(135deg, #6e4f30 0%, #9e744d 50%, #3e2b17 100%)",
  },
  {
    id: "city-blue",
    name: { tr: "Açık Şehir / Gökyüzü", en: "Urban & Daylight" },
    gradient: "linear-gradient(135deg, #1b3454 0%, #2f526b 50%, #121c27 100%)",
  },
  {
    id: "night-combat",
    name: { tr: "Gece Operasyonu", en: "Night Combat" },
    gradient: "radial-gradient(circle at center, #1f293d 0%, #0d121c 60%, #05070a 100%)",
  },
];

export const CrosshairPreviewer: React.FC = () => {
  const { isTr } = useLanguage();
  const {
    shape,
    setShape,
    color,
    setColor,
    size,
    setSize,
    thickness,
    gap,
    opacity,
    setOpacity,
    outline,
    setOutline,
    centerDot,
    setCenterDot,
    activeColorOption,
    resetDefaults,
  } = useCrosshairState();

  const [activeScene, setActiveScene] = useState(0);
  const [copied, setCopied] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragOffset((prev) => ({
      x: Math.max(-120, Math.min(120, prev.x + e.movementX)),
      y: Math.max(-80, Math.min(80, prev.y + e.movementY)),
    }));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    // Smoothly snap back to exact center
    setTimeout(() => {
      setDragOffset({ x: 0, y: 0 });
    }, 150);
  };

  const handleCopyCode = () => {
    const code = `0;P;s;${shape};c;${color.replace("#", "")};sz;${size};th;${thickness};gp;${gap};op;${opacity};out;${outline ? 1 : 0};dot;${centerDot ? 1 : 0}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="interactive-demo" className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${activeColorOption.hex}15`,
              borderColor: `${activeColorOption.hex}40`,
              color: activeColorOption.hex,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isTr ? "İnteraktif Deneme Alanı" : "Interactive Playground"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {isTr ? "Nişangahınızı Canlı Deneyin" : "Try the Crosshair Experience"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {isTr
              ? "Nişangah seçin, renk ve boyutunu ayarlayın, oyun zeminlerinde anında test edin."
              : "Pick a crosshair, customize it, and see it instantly react over realistic gameplay."}
          </p>
        </div>

        {/* Playground Container Card */}
        <div className="rounded-3xl bg-card/80 border border-border/80 shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-border/60 flex flex-wrap items-center justify-between gap-3 bg-card/50">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground">
                {isTr ? "Landscape Mobile Gameplay Viewport" : "Landscape Mobile Gameplay Viewport"}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold">
                100% VECTOR HUD
              </span>
            </div>

            {/* Scene Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-muted-foreground text-[11px] hidden sm:inline mr-1">
                {isTr ? "Zemin:" : "Scene:"}
              </span>
              {SCENES.map((sc, idx) => (
                <button
                  key={sc.id}
                  onClick={() => setActiveScene(idx)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                    activeScene === idx
                      ? "bg-white text-black font-bold shadow-sm"
                      : "text-muted-foreground hover:text-foreground bg-secondary/50"
                  }`}
                >
                  {isTr ? sc.name.tr : sc.name.en}
                </button>
              ))}
            </div>
          </div>

          {/* Gameplay Canvas Viewport */}
          <div
            ref={dragRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative aspect-[16/9] sm:h-[400px] w-full overflow-hidden flex items-center justify-center select-none cursor-crosshair transition-colors duration-500"
            style={{ background: SCENES[activeScene].gradient }}
          >
            {/* Grid & HUD Target Geometry */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
            <div className="absolute w-44 h-44 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute w-80 h-80 rounded-full border border-white/5 pointer-events-none" />

            {/* Center Lock Target Guidelines */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5 pointer-events-none" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />

            {/* Drag & Snap Tooltip */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-[11px] text-white/70 pointer-events-none">
              <Move className="w-3.5 h-3.5 text-primary" />
              <span>
                {isTr
                  ? "Nişangahı sürükleyin (Bırakınca merkeze kilitlenir)"
                  : "Drag reticle to test movement (Snaps back to center)"}
              </span>
            </div>

            {/* Rendered Crosshair Overlay Element */}
            <div
              style={{
                transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
                transition: isDragging ? "none" : "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                filter: outline
                  ? "drop-shadow(0 0 1px #000000) drop-shadow(0 0 1px #000000)"
                  : "none",
                opacity: opacity,
              }}
              className="relative z-20 pointer-events-none flex items-center justify-center"
            >
              {(centerDot || shape === "dot") && (
                <div
                  style={{
                    width: `${shape === "dot" ? size * 2 : thickness * 1.5}px`,
                    height: `${shape === "dot" ? size * 2 : thickness * 1.5}px`,
                    backgroundColor: color,
                    borderRadius: "50%",
                    boxShadow: `0 0 8px ${color}80`,
                  }}
                  className="z-20"
                />
              )}

              {shape === "cross" && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      bottom: `${gap}px`,
                      width: `${thickness}px`,
                      height: `${size * 2}px`,
                      backgroundColor: color,
                      boxShadow: `0 0 6px ${color}60`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: `${gap}px`,
                      width: `${thickness}px`,
                      height: `${size * 2}px`,
                      backgroundColor: color,
                      boxShadow: `0 0 6px ${color}60`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      right: `${gap}px`,
                      height: `${thickness}px`,
                      width: `${size * 2}px`,
                      backgroundColor: color,
                      boxShadow: `0 0 6px ${color}60`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: `${gap}px`,
                      height: `${thickness}px`,
                      width: `${size * 2}px`,
                      backgroundColor: color,
                      boxShadow: `0 0 6px ${color}60`,
                    }}
                  />
                </>
              )}

              {shape === "t-cross" && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: `${gap}px`,
                      width: `${thickness}px`,
                      height: `${size * 2.2}px`,
                      backgroundColor: color,
                      boxShadow: `0 0 6px ${color}60`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      right: `${gap}px`,
                      height: `${thickness}px`,
                      width: `${size * 2}px`,
                      backgroundColor: color,
                      boxShadow: `0 0 6px ${color}60`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: `${gap}px`,
                      height: `${thickness}px`,
                      width: `${size * 2}px`,
                      backgroundColor: color,
                      boxShadow: `0 0 6px ${color}60`,
                    }}
                  />
                </>
              )}

              {shape === "circle" && (
                <div
                  style={{
                    width: `${size * 3.5}px`,
                    height: `${size * 3.5}px`,
                    borderRadius: "50%",
                    border: `${thickness}px solid ${color}`,
                    boxShadow: `0 0 8px ${color}60`,
                  }}
                />
              )}

              {shape === "precision" && (
                <div className="relative flex items-center justify-center">
                  <div
                    style={{
                      width: `${size * 3.2}px`,
                      height: `${size * 3.2}px`,
                      borderRadius: "50%",
                      border: `1px solid ${color}`,
                      boxShadow: `0 0 6px ${color}60`,
                    }}
                  />
                  <div
                    style={{
                      width: `${thickness * 2}px`,
                      height: `${thickness * 2}px`,
                      backgroundColor: color,
                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}

              {shape === "box" && (
                <div
                  style={{
                    width: `${size * 3.2}px`,
                    height: `${size * 3.2}px`,
                    border: `${thickness}px solid ${color}`,
                    boxShadow: `0 0 8px ${color}60`,
                  }}
                />
              )}

              {shape === "diamond" && (
                <div
                  style={{
                    width: `${size * 3}px`,
                    height: `${size * 3}px`,
                    transform: "rotate(45deg)",
                    border: `${thickness}px solid ${color}`,
                    boxShadow: `0 0 8px ${color}60`,
                  }}
                />
              )}
            </div>
          </div>

          {/* Interactive Controls Bar Below Viewport */}
          <div className="p-6 bg-card/60 border-t border-border/60 space-y-6">
            {/* 1. Horizontal Shape Selector */}
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-bold text-foreground">
                <span>{isTr ? "Nişangah Modelleri" : "Crosshair Shape Selector"}</span>
                <span className="text-muted-foreground text-[11px] font-normal">
                  {isTr ? "7 Temel Geometri" : "7 Core Geometries"}
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {SHAPES.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id)}
                    className={`py-2.5 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all duration-200 ${
                      shape === item.id
                        ? "bg-primary text-black font-extrabold border-primary shadow-md scale-105"
                        : "bg-secondary/40 text-muted-foreground border-border/60 hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span className="text-base leading-none font-mono">{item.symbol}</span>
                    <span className="text-[10px] font-medium tracking-tight truncate max-w-full">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Color Palette with dynamic accent trigger */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border/40">
              <div>
                <span className="text-xs font-bold text-foreground block mb-2">
                  {isTr ? "Dinamik Tema Rengi" : "Dynamic Reticle Color"}
                </span>
                <div className="flex items-center gap-2.5">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-8 h-8 rounded-full transition-transform border-2 ${
                        color.toLowerCase() === c.hex.toLowerCase()
                          ? "scale-110 border-white ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "border-transparent opacity-85 hover:opacity-100 hover:scale-105"
                      }`}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Sliders: Size & Opacity */}
              <div className="flex items-center gap-4 flex-1 max-w-md">
                <div className="space-y-1 flex-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <label htmlFor="preview-size-slider" className="cursor-pointer">
                      {isTr ? "Boyut" : "Size"}
                    </label>
                    <span className="font-mono font-bold text-foreground">{size}px</span>
                  </div>
                  <input
                    id="preview-size-slider"
                    aria-label={isTr ? "Nişangah Boyutu (Piksel)" : "Crosshair Size (Pixels)"}
                    type="range"
                    min="2"
                    max="14"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <label htmlFor="preview-opacity-slider" className="cursor-pointer">
                      {isTr ? "Opaklık" : "Opacity"}
                    </label>
                    <span className="font-mono font-bold text-foreground">{Math.round(opacity * 100)}%</span>
                  </div>
                  <input
                    id="preview-opacity-slider"
                    aria-label={isTr ? "Nişangah Opaklığı (Yüzde)" : "Crosshair Opacity (Percentage)"}
                    type="range"
                    min="0.2"
                    max="1"
                    step="0.05"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/40">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOutline(!outline)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    outline
                      ? "bg-primary/10 border-primary/40 text-primary"
                      : "bg-secondary/40 border-border/60 text-muted-foreground"
                  }`}
                >
                  {isTr ? "Siyah Dış Çizgi: Açık" : "Black Outline: ON"}
                </button>

                <button
                  type="button"
                  onClick={() => setCenterDot(!centerDot)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    centerDot
                      ? "bg-primary/10 border-primary/40 text-primary"
                      : "bg-secondary/40 border-border/60 text-muted-foreground"
                  }`}
                >
                  {isTr ? "Merkez Nokta: Açık" : "Center Dot: ON"}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={handleCopyCode}
                  size="sm"
                  className="h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs gap-1.5 shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (isTr ? "Kod Kopyalandı!" : "Code Copied!") : isTr ? "Nişangah Kodunu Kopyala" : "Copy Reticle Code"}</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetDefaults}
                  className="h-9 px-3 text-xs rounded-xl"
                  title={isTr ? "Sıfırla" : "Reset"}
                >
                  <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
