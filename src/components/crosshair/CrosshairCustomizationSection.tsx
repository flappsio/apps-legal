import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState, COLOR_OPTIONS } from "@/context/CrosshairStateContext";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export const CrosshairCustomizationSection: React.FC = () => {
  const { t } = useLanguage();
  const {
    shape,
    color,
    setColor,
    size,
    setSize,
    thickness,
    setThickness,
    gap,
    setGap,
    opacity,
    setOpacity,
    outline,
    setOutline,
    centerDot,
    setCenterDot,
  } = useCrosshairState();

  return (
    <section className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {t("customization.badge")}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {t("customization.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("customization.subtitle")}
          </p>
        </div>

        {/* Side-by-Side Split Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Android Mobile Gameplay Viewport */}
          <div className="lg:col-span-7 rounded-3xl bg-[#090b11] border border-white/15 p-4 shadow-2xl overflow-hidden relative aspect-[16/10] flex items-center justify-center select-none">
            {/* Background 3D corridor geometry */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0d16] via-[#141827] to-[#07090e]">
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:3rem_3rem]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-56 border border-white/10 rounded-2xl bg-white/[0.02]" />
            </div>

            {/* Target Centering HUD Guides */}
            <div className="absolute w-40 h-40 rounded-full border border-white/10" />
            <div className="absolute w-72 h-72 rounded-full border border-white/5" />

            {/* Active Rendered Crosshair */}
            <div
              style={{
                filter: outline
                  ? "drop-shadow(0 0 1px #000000) drop-shadow(0 0 1px #000000)"
                  : "none",
                opacity: opacity,
              }}
              className="relative z-20 flex items-center justify-center pointer-events-none"
            >
              {(centerDot || shape === "dot") && (
                <div
                  style={{
                    position: "absolute",
                    width: `${shape === "dot" ? Math.max(4, size * 2) : Math.max(3, thickness * 1.5)}px`,
                    height: `${shape === "dot" ? Math.max(4, size * 2) : Math.max(3, thickness * 1.5)}px`,
                    backgroundColor: color,
                    borderRadius: "50%",
                    boxShadow: `0 0 8px ${color}80`,
                  }}
                  className="z-20"
                />
              )}

              {(shape === "cross" || shape === "precision") && (
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

              {shape === "precision" && (
                <div
                  style={{
                    position: "absolute",
                    width: `${Math.max(16, (gap + size) * 2.2)}px`,
                    height: `${Math.max(16, (gap + size) * 2.2)}px`,
                    borderRadius: "50%",
                    border: `${Math.max(1, Math.round(thickness * 0.75))}px solid ${color}`,
                    boxShadow: `0 0 6px ${color}60`,
                  }}
                />
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
                    position: "absolute",
                    width: `${size * 3.5}px`,
                    height: `${size * 3.5}px`,
                    borderRadius: "50%",
                    border: `${thickness}px solid ${color}`,
                    boxShadow: `0 0 8px ${color}60`,
                  }}
                />
              )}

              {shape === "box" && (
                <div
                  style={{
                    position: "absolute",
                    width: `${size * 3.2}px`,
                    height: `${size * 3.2}px`,
                    border: `${thickness}px solid ${color}`,
                  }}
                />
              )}

              {shape === "diamond" && (
                <div
                  style={{
                    position: "absolute",
                    width: `${size * 3}px`,
                    height: `${size * 3}px`,
                    transform: "rotate(45deg)",
                    border: `${thickness}px solid ${color}`,
                  }}
                />
              )}
            </div>

            {/* Bottom Real-Time Metric Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-white/60 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
              <span>ACTIVE: {shape.toUpperCase()}</span>
              <span>SIZE: {size}PX</span>
              <span>GAP: {gap}PX</span>
              <span>OPACITY: {Math.round(opacity * 100)}%</span>
            </div>
          </div>

          {/* Right: Minimal Modern Control Console */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-card/70 border border-border/80 backdrop-blur-xl shadow-xl space-y-5">
            <div>
              <label className="text-xs font-bold text-foreground mb-2 block">
                {t("customization.colorLabel")}
              </label>
              <div className="flex items-center gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 rounded-full transition-transform border-2 ${
                      color.toLowerCase() === c.hex.toLowerCase()
                        ? "scale-110 border-white ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "border-transparent opacity-85 hover:opacity-100 hover:scale-105"
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-3.5 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <label htmlFor="custom-size-slider" className="cursor-pointer">
                    {t("customization.sizeLabel")}
                  </label>
                  <span className="font-mono font-bold text-foreground">{size}px</span>
                </div>
                <input
                  id="custom-size-slider"
                  aria-label={t("customization.sizeLabel")}
                  type="range"
                  min="2"
                  max="16"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <label htmlFor="custom-thickness-slider" className="cursor-pointer">
                    {t("customization.thicknessLabel")}
                  </label>
                  <span className="font-mono font-bold text-foreground">{thickness}px</span>
                </div>
                <input
                  id="custom-thickness-slider"
                  aria-label={t("customization.thicknessLabel")}
                  type="range"
                  min="1"
                  max="6"
                  value={thickness}
                  onChange={(e) => setThickness(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              {shape !== "dot" && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <label htmlFor="custom-gap-slider" className="cursor-pointer">
                      {t("customization.gapLabel")}
                    </label>
                    <span className="font-mono font-bold text-foreground">{gap}px</span>
                  </div>
                  <input
                    id="custom-gap-slider"
                    aria-label={t("customization.gapLabel")}
                    type="range"
                    min="0"
                    max="14"
                    value={gap}
                    onChange={(e) => setGap(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                  />
                </div>
              )}

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <label htmlFor="custom-opacity-slider" className="cursor-pointer">
                    {t("customization.opacityLabel")}
                  </label>
                  <span className="font-mono font-bold text-foreground">{Math.round(opacity * 100)}%</span>
                </div>
                <input
                  id="custom-opacity-slider"
                  aria-label={t("customization.opacityLabel")}
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

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setOutline(!outline)}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                  outline
                    ? "bg-primary/15 border-primary text-primary font-bold"
                    : "bg-secondary/40 border-border/60 text-muted-foreground"
                }`}
              >
                <span>{t("customization.outline")}</span>
                {outline && <Check className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => setCenterDot(!centerDot)}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                  centerDot
                    ? "bg-primary/15 border-primary text-primary font-bold"
                    : "bg-secondary/40 border-border/60 text-muted-foreground"
                }`}
              >
                <span>{t("customization.centerDot")}</span>
                {centerDot && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
