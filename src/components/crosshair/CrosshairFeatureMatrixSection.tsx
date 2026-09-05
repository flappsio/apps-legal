import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Sparkles,
  ShieldCheck,
  Palette,
  Sliders,
  BatteryCharging,
} from "lucide-react";

export const CrosshairFeatureMatrixSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="feature-matrix" className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="brand" className="text-xs px-3.5 py-1.5 font-semibold gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("featureMatrix.badge")}</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {t("featureMatrix.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("featureMatrix.subtitle")}
          </p>
        </div>

        {/* ALL CAPABILITIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Design & Creation */}
          <div className="p-6 sm:p-8 rounded-3xl bg-card/60 border border-border/70 backdrop-blur-sm space-y-4 hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {t("featureMatrix.catDesigner")}
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-semibold">{t("featureMatrix.designerF1Title")}:</strong>{" "}
                  {t("featureMatrix.designerF1Desc")}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-semibold">{t("featureMatrix.designerF2Title")}:</strong>{" "}
                  {t("featureMatrix.designerF2Desc")}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-semibold">{t("featureMatrix.designerF3Title")}:</strong>{" "}
                  {t("featureMatrix.designerF3Desc")}
                </span>
              </li>
            </ul>
          </div>

          {/* 2. HUD & Mobile Ergonomics */}
          <div className="p-6 sm:p-8 rounded-3xl bg-card/60 border border-border/70 backdrop-blur-sm space-y-4 hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {t("featureMatrix.catHud")}
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-semibold">{t("featureMatrix.hudF1Title")}:</strong>{" "}
                  {t("featureMatrix.hudF1Desc")}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-semibold">{t("featureMatrix.hudF2Title")}:</strong>{" "}
                  {t("featureMatrix.hudF2Desc")}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-semibold">{t("featureMatrix.hudF3Title")}:</strong>{" "}
                  {t("featureMatrix.hudF3Desc")}
                </span>
              </li>
            </ul>
          </div>

          {/* 3. Security & Anti-Cheat Compliance */}
          <div className="p-6 sm:p-8 rounded-3xl bg-card/60 border border-border/70 backdrop-blur-sm space-y-4 hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {t("featureMatrix.catSecurity")}
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-semibold">{t("featureMatrix.securityF1Title")}:</strong>{" "}
                  {t("featureMatrix.securityF1Desc")}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-semibold">{t("featureMatrix.securityF2Title")}:</strong>{" "}
                  {t("featureMatrix.securityF2Desc")}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-semibold">{t("featureMatrix.securityF3Title")}:</strong>{" "}
                  {t("featureMatrix.securityF3Desc")}
                </span>
              </li>
            </ul>
          </div>

          {/* 4. Privacy & Performance */}
          <div className="p-6 sm:p-8 rounded-3xl bg-card/60 border border-border/70 backdrop-blur-sm space-y-4 hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {t("featureMatrix.catPrivacy")}
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-semibold">{t("featureMatrix.privacyF1Title")}:</strong>{" "}
                  {t("featureMatrix.privacyF1Desc")}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-semibold">{t("featureMatrix.privacyF2Title")}:</strong>{" "}
                  {t("featureMatrix.privacyF2Desc")}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-semibold">{t("featureMatrix.privacyF3Title")}:</strong>{" "}
                  {t("featureMatrix.privacyF3Desc")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
