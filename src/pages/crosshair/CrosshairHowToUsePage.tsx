import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { QuickAnswerBlock } from "@/components/crosshair/QuickAnswerBlock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  ShieldCheck,
  Sliders,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

export const CrosshairHowToUsePage: React.FC = () => {
  const { t, language } = useLanguage();
  const langPath = language === "en" ? "en" : "tr";

  const title = t("howToUsePage.metaTitle");
  const description = t("howToUsePage.metaDesc");

  const steps = [
    {
      number: "01",
      title: t("howToUsePage.step1Title"),
      desc: t("howToUsePage.step1Desc"),
      icon: <Download className="w-5 h-5 text-primary" />,
      image: `/assets/images/playstore/${langPath}/4.png`,
      badge: "GOOGLE PLAY",
      actionText: t("common.installOnGooglePlay"),
      actionUrl: "https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair",
    },
    {
      number: "02",
      title: t("howToUsePage.step2Title"),
      desc: t("howToUsePage.step2Desc"),
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      image: `/assets/images/playstore/${langPath}/4.png`,
      badge: "SYSTEM_ALERT_WINDOW",
      tip: t("howToUsePage.step2Tip"),
    },
    {
      number: "03",
      title: t("howToUsePage.step3Title"),
      desc: t("howToUsePage.step3Desc"),
      icon: <Sliders className="w-5 h-5 text-primary" />,
      image: `/assets/images/playstore/${langPath}/2.png`,
      badge: "PIXEL EDITOR",
    },
    {
      number: "04",
      title: t("howToUsePage.step4Title"),
      desc: t("howToUsePage.step4Desc"),
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      image: `/assets/images/playstore/${langPath}/4.png`,
      badge: "JPG & PNG IMPORT",
    },
    {
      number: "05",
      title: t("howToUsePage.step5Title"),
      desc: t("howToUsePage.step5Desc"),
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      image: `/assets/images/playstore/${langPath}/4.png`,
      badge: "FLOATING HUD",
    },
  ];

  // HowTo JSON-LD schema
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": t("howToUse.title"),
    "description": description,
    "totalTime": "PT2M",
    "step": steps.map((s, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": s.title,
      "text": s.desc,
      "url": `https://flappsio.com/crosshair/how-to-use#step-${s.number}`,
    })),
  };

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title={title}
        description={description}
        canonicalPath="/crosshair/how-to-use"
        keywords={[
          "crosshair nasıl kullanılır",
          "crosshair overlay izni",
          "android nişangah açma",
          "crosshair kurulum rehberi",
          "how to use crosshair android",
          "enable crosshair overlay android",
        ]}
        breadcrumbs={[
          { name: t("common.home"), url: "/" },
          { name: "Crosshair", url: "/crosshair" },
          { name: t("common.howItWorks"), url: "/crosshair/how-to-use" },
        ]}
        jsonLd={howToJsonLd}
      />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {t("howToUse.badge")}
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {t("howToUse.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("howToUse.subtitle")}
          </p>
        </div>

        {/* Quick Answer Box for AEO & AI Search */}
        <QuickAnswerBlock
          question={t("howToUse.quickAnswerQ")}
          summary={t("howToUse.quickAnswerSummary")}
          keyPoints={[
            t("howToUsePage.point1"),
            t("howToUsePage.point2"),
            t("howToUsePage.point3"),
          ]}
        />

        {/* Step-by-Step Cards with Authentic Play Store Screenshots */}
        <div className="space-y-8 my-12">
          {steps.map((s) => (
            <div
              key={s.number}
              id={`step-${s.number}`}
              className="p-6 sm:p-8 rounded-[32px] bg-card/70 border border-border/80 backdrop-blur-sm relative overflow-hidden hover:border-primary/40 transition-colors shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Content Column (7 cols) */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-primary/40">
                      {s.number}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-secondary text-primary border border-border/60">
                      {s.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">
                      {s.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  {s.tip && (
                    <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/20 text-xs text-foreground/90 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{s.tip}</span>
                    </div>
                  )}

                  {s.actionUrl && (
                    <div className="pt-2">
                      <Button
                        asChild
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs gap-1.5 shadow-sm"
                      >
                        <a href={s.actionUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-3.5 h-3.5" />
                          <span>{s.actionText}</span>
                        </a>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Screenshot Column (5 cols) */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-[240px] aspect-[9/16] rounded-2xl overflow-hidden bg-black/40 border-2 border-border/80 shadow-xl group">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* OEM Troubleshooting Notice */}
        <div className="p-6 sm:p-8 rounded-3xl bg-secondary/40 border border-border/80 backdrop-blur-sm space-y-4 my-8">
          <div className="flex items-center gap-2.5 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="text-sm sm:text-base font-bold text-foreground">
              {t("howToUsePage.oemTitle")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t("howToUsePage.oemDesc")}
          </p>
          <div className="pt-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-xs rounded-xl border-border/80 gap-1.5"
            >
              <Link to="/crosshair/guides/sorun-giderme-overlay-izinleri">
                <span>{t("howToUsePage.oemBtn")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="text-center py-12 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {t("howToUsePage.readyTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            {t("howToUsePage.readyDesc")}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl text-xs sm:text-sm h-12 px-6 gap-2 shadow-lg"
            >
              <a
                href="https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4" />
                <span>{t("common.installOnGooglePlay")}</span>
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-2xl text-xs sm:text-sm h-12 px-6 border-border/80"
            >
              <Link to="/crosshair/faq">
                <span>{t("howToUsePage.visitFaq")}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
