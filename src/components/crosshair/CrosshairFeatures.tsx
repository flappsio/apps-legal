import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState } from "@/context/CrosshairStateContext";
import {
  ShieldCheck,
  Sliders,
  Zap,
  Lock,
  Layers,
  Crosshair,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const CrosshairFeatures: React.FC = () => {
  const { t } = useLanguage();
  const { activeColorOption } = useCrosshairState();

  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      title: t("features.item1Title"),
      desc: t("features.item1Desc"),
      tag: t("features.item1Tag"),
    },
    {
      icon: <Crosshair className="w-5 h-5 text-[#00E5FF]" />,
      title: t("features.item2Title"),
      desc: t("features.item2Desc"),
      tag: t("features.item2Tag"),
    },
    {
      icon: <Sliders className="w-5 h-5 text-primary" />,
      title: t("features.item3Title"),
      desc: t("features.item3Desc"),
      tag: t("features.item3Tag"),
    },
    {
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      title: t("features.item4Title"),
      desc: t("features.item4Desc"),
      tag: t("features.item4Tag"),
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: t("features.item5Title"),
      desc: t("features.item5Desc"),
      tag: t("features.item5Tag"),
    },
    {
      icon: <Lock className="w-5 h-5 text-primary" />,
      title: t("features.item6Title"),
      desc: t("features.item6Desc"),
      tag: t("features.item6Tag"),
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {t("features.badge")}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {t("features.title1")} <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${activeColorOption.hex} 0%, #00E5FF 100%)`,
              }}
            >
              {t("features.title2")}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Features 6-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative p-6 sm:p-7 rounded-3xl bg-card/60 border border-border/80 backdrop-blur-sm hover:border-primary/40 hover:bg-card/90 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top gradient indicator on hover */}
              <div
                className="absolute top-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${activeColorOption.hex}, #00E5FF, transparent)`,
                }}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-secondary/80 border border-border/60 group-hover:scale-105 transition-transform">
                    {f.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border/40">
                    {f.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border/30 flex items-center gap-1.5 text-xs text-primary font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t("features.availableInApp")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
