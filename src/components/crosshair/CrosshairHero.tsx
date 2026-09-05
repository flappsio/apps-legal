import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState } from "@/context/CrosshairStateContext";
import { Button } from "@/components/ui/button";
import {
  Download,
  Play,
  Layers,
  Sparkles,
  Zap,
  Sliders,
  ShieldCheck,
} from "lucide-react";

export const CrosshairHero: React.FC = () => {
  const { t } = useLanguage();
  const {
    shape,
    color,
    size,
    thickness,
    gap,
    opacity,
    outline,
    centerDot,
    activeColorOption,
  } = useCrosshairState();

  const scrollToDemo = () => {
    const demoEl = document.getElementById("interactive-demo");
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-border/40">
      {/* Dynamic Background Glow using selected reticle accent color */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[450px] rounded-full blur-[130px] opacity-25 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${activeColorOption.hex} 0%, rgba(0, 229, 255, 0.4) 50%, transparent 80%)`,
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Text Cluster */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Eyebrow badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-sm transition-all duration-300"
            style={{
              backgroundColor: `${activeColorOption.hex}15`,
              borderColor: `${activeColorOption.hex}40`,
              color: activeColorOption.hex,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("hero.eyebrow")}</span>
          </div>

          {/* Semantic H1 (SEO) + Main prominent typography (72-96px desktop, 42-52px mobile) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]">
            {t("hero.titleLine1")} <br />
            <span
              className="bg-clip-text text-transparent transition-all duration-500"
              style={{
                backgroundImage: `linear-gradient(135deg, ${activeColorOption.hex} 0%, #00E5FF 50%, #8B5CF6 100%)`,
              }}
            >
              {t("hero.titleLine2")}
            </span>
          </h1>

          {/* GEO / AEO Natural definition sentence */}
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full pt-2">
            <Button
              asChild
              size="lg"
              className="shimmer-button w-full sm:w-auto h-13 px-8 text-black font-extrabold rounded-2xl shadow-xl gap-2.5 text-sm transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: activeColorOption.hex,
                boxShadow: `0 10px 30px ${activeColorOption.hex}40`,
              }}
            >
              <a
                href="https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4" />
                <span>{t("common.getOnGooglePlay")}</span>
              </a>
            </Button>

            <Button
              onClick={scrollToDemo}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-13 px-6 rounded-2xl border-border/80 hover:bg-secondary text-sm font-semibold gap-2 transition-all"
            >
              <Play className="w-3.5 h-3.5 text-primary" />
              <span>{t("hero.tryDemo")}</span>
            </Button>
          </div>

          {/* Subtle Trust Line */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground pt-1">
            <div className="flex items-center gap-1.5 text-foreground font-semibold">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span>{t("hero.badge1")}</span>
            </div>

            <span className="hidden sm:inline text-border">•</span>

            <div className="flex items-center gap-1.5 text-primary font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t("hero.badge2")}</span>
            </div>
          </div>
        </div>

        {/* 3D Landscape Android Smartphone Hero Mockup Composition */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto relative select-none">
          {/* Floating UI Parameter Chips around device in 3D space */}
          <div className="hidden lg:flex absolute -left-6 top-1/4 z-30 flex-col gap-3 animate-float-slow">
            <div className="p-3 rounded-2xl bg-card/90 border border-border/80 backdrop-blur-xl shadow-2xl flex items-center gap-2.5 text-xs">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: activeColorOption.hex }}
              />
              <span className="font-mono text-muted-foreground text-[11px]">COLOR:</span>
              <span className="font-bold text-foreground">{activeColorOption.name}</span>
            </div>

            <div className="p-3 rounded-2xl bg-card/90 border border-border/80 backdrop-blur-xl shadow-2xl flex items-center gap-2.5 text-xs">
              <Sliders className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono text-muted-foreground text-[11px]">SIZE:</span>
              <span className="font-bold text-foreground">{size}px</span>
            </div>
          </div>

          <div className="hidden lg:flex absolute -right-6 top-1/3 z-30 flex-col gap-3 animate-float-delayed">
            <div className="p-3 rounded-2xl bg-card/90 border border-border/80 backdrop-blur-xl shadow-2xl flex items-center gap-2.5 text-xs">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono text-muted-foreground text-[11px]">STATUS:</span>
              <span className="font-bold text-primary">OVERLAY ACTIVE</span>
            </div>

            <div className="p-3 rounded-2xl bg-card/90 border border-border/80 backdrop-blur-xl shadow-2xl flex items-center gap-2.5 text-xs">
              <span className="font-mono text-muted-foreground text-[11px]">OPACITY:</span>
              <span className="font-bold text-foreground">{Math.round(opacity * 100)}%</span>
            </div>
          </div>

          {/* Landscape Phone Device Frame */}
          <div
            className="relative mx-auto rounded-[36px] sm:rounded-[44px] p-3 sm:p-4 bg-gradient-to-b from-[#222530] via-[#12141c] to-[#0a0b10] border-2 border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.8)] transition-all duration-500"
            style={{
              boxShadow: `0 25px 80px -10px ${activeColorOption.hex}25, 0 0 40px rgba(0,0,0,0.9)`,
            }}
          >
            {/* Phone Screen Bezel */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#07090e] border border-white/10 flex items-center justify-center">
              {/* Neutral preview canvas */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0c0e17] via-[#151928] to-[#08090f]">
                {/* 3D Perspective Grid for Arena Floor */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_60%,#000_70%,transparent_100%)]" />

                {/* Tactical Arena Geometry */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border border-white/10 rounded-2xl bg-white/[0.02] flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/15 bg-white/[0.03] mb-2" />
                  <div className="w-28 h-24 border border-white/10 rounded-xl" />
                </div>

                <div className="absolute top-4 left-6 flex items-center gap-2 text-[10px] font-mono text-white/50 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>LIVE CROSSHAIR PREVIEW</span>
                </div>
              </div>

              {/* Centered Active Crosshair Overlay */}
              <div className="relative z-20 pointer-events-none drop-shadow-[0_0_2px_#000000]">
                <div
                  style={{
                    filter: outline
                      ? "drop-shadow(0 0 1px #000000) drop-shadow(0 0 1px #000000)"
                      : "none",
                    opacity: opacity,
                  }}
                  className="relative flex items-center justify-center"
                >
                  {(centerDot || shape === "dot") && (
                    <div
                      style={{
                        width: `${shape === "dot" ? size * 2 : thickness * 1.5}px`,
                        height: `${shape === "dot" ? size * 2 : thickness * 1.5}px`,
                        backgroundColor: color,
                        borderRadius: "50%",
                        boxShadow: `0 0 8px ${color}90`,
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
                          boxShadow: `0 0 6px ${color}80`,
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: `${gap}px`,
                          width: `${thickness}px`,
                          height: `${size * 2}px`,
                          backgroundColor: color,
                          boxShadow: `0 0 6px ${color}80`,
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          right: `${gap}px`,
                          height: `${thickness}px`,
                          width: `${size * 2}px`,
                          backgroundColor: color,
                          boxShadow: `0 0 6px ${color}80`,
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          left: `${gap}px`,
                          height: `${thickness}px`,
                          width: `${size * 2}px`,
                          backgroundColor: color,
                          boxShadow: `0 0 6px ${color}80`,
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
                          boxShadow: `0 0 6px ${color}80`,
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          right: `${gap}px`,
                          height: `${thickness}px`,
                          width: `${size * 2}px`,
                          backgroundColor: color,
                          boxShadow: `0 0 6px ${color}80`,
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          left: `${gap}px`,
                          height: `${thickness}px`,
                          width: `${size * 2}px`,
                          backgroundColor: color,
                          boxShadow: `0 0 6px ${color}80`,
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
                        boxShadow: `0 0 8px ${color}80`,
                      }}
                    />
                  )}

                  {shape === "box" && (
                    <div
                      style={{
                        width: `${size * 3.2}px`,
                        height: `${size * 3.2}px`,
                        border: `${thickness}px solid ${color}`,
                        boxShadow: `0 0 8px ${color}80`,
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
                        boxShadow: `0 0 8px ${color}80`,
                      }}
                    />
                  )}

                  {shape === "precision" && (
                    <div className="relative flex items-center justify-center">
                      <div
                        style={{
                          width: `${size * 3}px`,
                          height: `${size * 3}px`,
                          borderRadius: "50%",
                          border: `1px solid ${color}80`,
                        }}
                      />
                      <div
                        style={{
                          width: `${thickness * 2}px`,
                          height: `${thickness * 2}px`,
                          backgroundColor: color,
                          borderRadius: "50%",
                          boxShadow: `0 0 8px ${color}`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Quick Bubble Simulation in Game */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-2xl bg-black/60 border border-white/20 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1.5 shadow-xl">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: activeColorOption.hex }}
                />
                <span className="hidden sm:inline">OVERLAY HUD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
