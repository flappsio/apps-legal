import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState } from "@/context/CrosshairStateContext";
import { Badge } from "@/components/ui/badge";
import { Eye, Target, Palette, Sparkles } from "lucide-react";

export const CrosshairWhyUseSection: React.FC = () => {
  const { t } = useLanguage();
  const { activeColorOption } = useCrosshairState();

  const benefits = [
    {
      icon: <Eye className="w-5 h-5 text-primary" />,
      title: t("whyUse.benefit1Title"),
      desc: t("whyUse.benefit1Desc"),
    },
    {
      icon: <Target className="w-5 h-5 text-cyan-400" />,
      title: t("whyUse.benefit2Title"),
      desc: t("whyUse.benefit2Desc"),
    },
    {
      icon: <Palette className="w-5 h-5 text-purple-400" />,
      title: t("whyUse.benefit3Title"),
      desc: t("whyUse.benefit3Desc"),
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      title: t("whyUse.benefit4Title"),
      desc: t("whyUse.benefit4Desc"),
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {t("whyUse.badge")}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {t("whyUse.title")}
          </h2>
        </div>

        {/* Semantic Direct Quote Block (AEO / GEO / AI Assistants) */}
        <div
          className="p-6 sm:p-8 rounded-3xl border backdrop-blur-xl shadow-lg my-8 space-y-3"
          style={{
            backgroundColor: `${activeColorOption.hex}08`,
            borderColor: `${activeColorOption.hex}35`,
          }}
        >
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("whyUse.aeoTitle")}</span>
          </div>

          <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed">
            {t("whyUse.aeoSummary")}
          </p>

          <div className="pt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/40">
            <span>Crossio Knowledge Base</span>
            <span className="font-mono text-primary font-bold">flappsio Android Engineering</span>
          </div>
        </div>

        {/* 4 Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-card/60 border border-border/80 flex items-start gap-4 hover:border-primary/40 transition-colors"
            >
              <div className="p-3 rounded-2xl bg-secondary/80 border border-border/60 shrink-0">
                {b.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-foreground">{b.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
