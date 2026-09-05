import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState } from "@/context/CrosshairStateContext";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, ArrowRight, Layers, ShieldCheck, UploadCloud } from "lucide-react";

export const CrosshairImportSection: React.FC = () => {
  const { t } = useLanguage();
  const { activeColorOption } = useCrosshairState();

  return (
    <section className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
              {t("import.badge")}
            </Badge>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-[1.12]">
              {t("import.title1")} <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${activeColorOption.hex} 0%, #00E5FF 100%)`,
                }}
              >
                {t("import.title2")}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t("import.subtitle")}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-card/60 border border-border/70">
                <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    {t("import.feature1Title")}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {t("import.feature1Desc")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-card/60 border border-border/70">
                <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    {t("import.feature2Title")}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {t("import.feature2Desc")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-card/60 border border-border/70">
                <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    {t("import.feature3Title")}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {t("import.feature3Desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual 3D Showcase: Gallery -> Float -> In-Game Overlay */}
          <div className="lg:col-span-6 relative select-none">
            <div className="relative p-6 sm:p-8 rounded-[36px] bg-gradient-to-b from-card via-card/90 to-background border border-border/80 shadow-2xl overflow-hidden">
              {/* Background ambient lighting */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-20"
                style={{ backgroundColor: activeColorOption.hex }}
              />

              <div className="space-y-6 relative z-10">
                {/* 1. Android Gallery Step Mockup */}
                <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/20 text-primary">
                      <UploadCloud className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">STEP 01</span>
                      <h3 className="text-xs font-bold text-foreground">
                        {t("import.step1Title")}
                      </h3>
                    </div>
                  </div>
                  <Badge variant="brand" className="text-[10px] font-mono">
                    my_custom_reticle.png
                  </Badge>
                </div>

                {/* 2. Floating Transition Connector */}
                <div className="flex justify-center">
                  <div className="p-2 rounded-full bg-primary/20 text-primary border border-primary/40 animate-bounce">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>

                {/* 3. Neutral preview with imported reticle */}
                <div className="relative aspect-[16/9] rounded-2xl bg-[#090b12] border border-white/15 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="w-24 h-24 rounded-full border border-white/10 absolute" />

                  {/* Imported Custom Crosshair Visual */}
                  <div className="relative z-20 flex items-center justify-center p-3 rounded-2xl bg-primary/10 border border-primary/30 shadow-[0_0_20px_rgba(105,240,174,0.3)]">
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="w-8 h-8 rounded-full border border-primary/80 absolute" />
                      <div className="w-12 h-12 rounded-full border border-primary/30 border-dashed absolute animate-spin-slow" />
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-3 text-[10px] font-mono text-white/50">
                    {t("import.previewReady")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
