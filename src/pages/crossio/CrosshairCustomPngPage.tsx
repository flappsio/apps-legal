import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { QuickAnswerBlock } from "@/components/crossio/QuickAnswerBlock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImagePlus, Download, CheckCircle2 } from "lucide-react";

export const CrosshairCustomPngPage: React.FC = () => {
  const { t } = useLanguage();

  const title = t("pngPage.metaTitle");
  const description = t("pngPage.metaDesc");

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title={title}
        description={description}
        canonicalPath="/crossio/custom-png-crosshair"
        keywords={[
          "custom crosshair png",
          "crosshair png android",
          "transparent crosshair png",
          "import crosshair image"
        ]}
        breadcrumbs={[
          { name: t("common.home"), url: "/" },
          { name: "Crossio", url: "/crossio" },
          { name: "Custom PNG", url: "/crossio/custom-png-crosshair" },
        ]}
      />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {t("pngPage.badge")}
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {t("pngPage.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("pngPage.subtitle")}
          </p>
        </div>

        {/* How to Import? AEO Block */}
        <QuickAnswerBlock
          question={t("pngPage.howToTitle")}
          summary={t("pngPage.howToDesc")}
          keyPoints={[]}
        />

        {/* Recommended PNG Format */}
        <section className="bg-card/40 border border-border/70 rounded-3xl p-6 sm:p-10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {t("pngPage.recommendTitle")}
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {t("pngPage.recommendDesc")}
          </p>
        </section>

        {/* Why Use Transparent PNG? */}
        <section className="bg-card/40 border border-border/70 rounded-3xl p-6 sm:p-10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400">
              <ImagePlus className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {t("pngPage.whyPngTitle")}
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {t("pngPage.whyPngDesc")}
          </p>
        </section>
        
        {/* CTA */}
        <div className="text-center pt-8">
           <Button size="lg" className="rounded-full shadow-lg shadow-primary/25" onClick={() => window.open('https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair', '_blank')}>
              <Download className="w-5 h-5 mr-2" />
              {t("common.getOnGooglePlay")}
           </Button>
        </div>
      </div>
    </div>
  );
};

export default CrosshairCustomPngPage;
