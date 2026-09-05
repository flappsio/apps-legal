import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { CrosshairDisclaimer } from "@/components/crosshair/CrosshairDisclaimer";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, Zap } from "lucide-react";

export const CrosshairAboutPage: React.FC = () => {
  const { t } = useLanguage();

  const title = t("aboutPage.metaTitle");
  const description = t("aboutPage.metaDesc");

  const values = [
    {
      icon: <Lock className="w-5 h-5 text-primary" />,
      title: t("aboutPage.val1Title"),
      desc: t("aboutPage.val1Desc"),
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#00E5FF]" />,
      title: t("aboutPage.val2Title"),
      desc: t("aboutPage.val2Desc"),
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: t("aboutPage.val3Title"),
      desc: t("aboutPage.val3Desc"),
    },
  ];

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title={title}
        description={description}
        canonicalPath="/crosshair/about"
        keywords={[
          "flappsio hakkında",
          "crossio geliştiricisi",
          "flappsio mission",
          "about crossio",
        ]}
        breadcrumbs={[
          { name: t("common.home"), url: "/" },
          { name: "Crossio", url: "/crosshair" },
          { name: t("common.about"), url: "/crosshair/about" },
        ]}
      />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {t("aboutPage.badge")}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t("aboutPage.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("aboutPage.subtitle")}
          </p>
        </div>

        {/* Story Section */}
        <div className="p-8 rounded-3xl bg-card/60 border border-border/80 backdrop-blur-sm space-y-4 text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            {t("aboutPage.storyTitle")}
          </h2>
          <p>{t("aboutPage.storyP1")}</p>
          <p>{t("aboutPage.storyP2")}</p>
        </div>

        {/* Core Values 3-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          {values.map((v, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-card/40 border border-border/70 space-y-3"
            >
              <div className="p-3 rounded-2xl bg-secondary/80 border border-border/60 w-fit">
                {v.icon}
              </div>
              <h3 className="text-sm font-bold text-foreground">{v.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="pt-4">
          <CrosshairDisclaimer />
        </div>
      </div>
    </div>
  );
};
