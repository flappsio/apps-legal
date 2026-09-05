import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState } from "@/context/CrosshairStateContext";
import { Badge } from "@/components/ui/badge";
import { Crosshair, Sliders, Play, Sparkles } from "lucide-react";

export const CrosshairSetupSteps: React.FC = () => {
  const { t, language } = useLanguage();
  const { activeColorOption } = useCrosshairState();

  const langPath = language === "en" ? "en" : "tr";

  const steps = [
    {
      num: "01",
      title: t("setup.step1Title"),
      desc: t("setup.step1Desc"),
      icon: <Crosshair className="w-5 h-5 text-primary" />,
      image: `/assets/images/playstore/${langPath}/5.png`,
      badge: "BUILT-IN DESIGNS",
    },
    {
      num: "02",
      title: t("setup.step2Title"),
      desc: t("setup.step2Desc"),
      icon: <Sliders className="w-5 h-5 text-cyan-400" />,
      image: `/assets/images/playstore/${langPath}/2.png`,
      badge: "PIXEL TUNING",
    },
    {
      num: "03",
      title: t("setup.step3Title"),
      desc: t("setup.step3Desc"),
      icon: <Play className="w-5 h-5 text-amber-400" />,
      image: `/assets/images/playstore/${langPath}/4.png`,
      badge: "FLOATING HUD",
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-border/40 relative overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {t("setup.badge")}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {t("setup.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("setup.subtitle")}
          </p>
        </div>

        {/* 3 Step Cards Grid with Real App Screenshots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group p-6 sm:p-7 rounded-[32px] bg-card/75 border border-border/80 backdrop-blur-md relative overflow-hidden flex flex-col justify-between hover:border-primary/50 hover:shadow-2xl transition-all duration-300"
            >
              {/* Top Row: Number & Icon */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-3xl font-black opacity-35 transition-colors"
                    style={{ color: activeColorOption.hex }}
                  >
                    {step.num}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-secondary text-primary border border-border/60">
                      {step.badge}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-secondary/80 border border-border/60">
                      {step.icon}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Real App Screenshot Phone Mockup */}
              <div className="mt-6 pt-4 border-t border-border/40">
                <div className="relative aspect-[9/14] rounded-2xl overflow-hidden bg-black/40 border border-border/70 shadow-md group-hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
                </div>

                <div className="pt-3 flex items-center gap-1.5 text-[11px] font-mono text-primary font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>STEP {step.num} COMPLETE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
