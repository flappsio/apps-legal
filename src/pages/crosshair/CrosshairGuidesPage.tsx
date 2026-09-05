import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { CrosshairDisclaimer } from "@/components/crosshair/CrosshairDisclaimer";
import { GUIDES_DATA } from "@/data/crosshairTranslations";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export const CrosshairGuidesPage: React.FC = () => {
  const { t, isTr } = useLanguage();

  const title = t("guidesPage.metaTitle");
  const description = t("guidesPage.metaDesc");

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title={title}
        description={description}
        canonicalPath="/crosshair/guides"
        keywords={[
          "crosshair rehberleri",
          "en iyi crosshair seçimi",
          "nişangah renkleri",
          "crossio rehber",
          "reticle design guides",
          "crosshair color contrast",
        ]}
        breadcrumbs={[
          { name: t("common.home"), url: "/" },
          { name: "Crossio", url: "/crosshair" },
          { name: t("common.guides"), url: "/crosshair/guides" },
        ]}
      />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {t("guidesPage.badge")}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t("guidesPage.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("guidesPage.subtitle")}
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {GUIDES_DATA.map((guide) => (
            <Link
              key={guide.slug}
              to={`/crosshair/guides/${guide.slug}`}
              className="group p-6 rounded-3xl bg-card/60 border border-border/80 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-[11px]">
                    {guide.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{guide.readTime}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {isTr ? guide.title.tr : guide.title.en}
                  </h2>

                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                    {isTr ? guide.description.tr : guide.description.en}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-border/40 flex items-center justify-between text-xs text-primary font-semibold">
                <span>{t("guidesPage.readFull")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Disclaimer Card */}
        <div className="pt-12">
          <CrosshairDisclaimer />
        </div>
      </div>
    </div>
  );
};
