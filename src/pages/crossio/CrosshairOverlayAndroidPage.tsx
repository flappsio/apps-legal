import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { QuickAnswerBlock } from "@/components/crossio/QuickAnswerBlock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, ShieldCheck, Download } from "lucide-react";

export const CrosshairOverlayAndroidPage: React.FC = () => {
  const { t } = useLanguage();

  const title = t("overlayPage.metaTitle");
  const description = t("overlayPage.metaDesc");

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title={title}
        description={description}
        canonicalPath="/crossio/crosshair-overlay-android"
        keywords={[
          "crosshair overlay android",
          "android crosshair",
          "custom crosshair android",
          "crosshair without root",
          "display over other apps crosshair"
        ]}
        breadcrumbs={[
          { name: t("common.home"), url: "/" },
          { name: "Crossio", url: "/crossio" },
          { name: "Overlay Android", url: "/crossio/crosshair-overlay-android" },
        ]}
      />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {t("overlayPage.badge")}
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {t("overlayPage.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("overlayPage.subtitle")}
          </p>
        </div>

        {/* What Is a Crosshair Overlay? */}
        <section className="bg-card/40 border border-border/70 rounded-3xl p-6 sm:p-10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {t("overlayPage.whatIsTitle")}
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {t("overlayPage.whatIsDesc")}
          </p>
        </section>

        {/* Does It Require Root? AEO Block */}
        <QuickAnswerBlock
          question={t("overlayPage.noRootTitle")}
          summary={t("overlayPage.noRootDesc")}
          keyPoints={[]}
        />

        {/* Does Crossio Modify Games? */}
        <section className="bg-card/40 border border-border/70 rounded-3xl p-6 sm:p-10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {t("overlayPage.noModifyTitle")}
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {t("overlayPage.noModifyDesc")}
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

export default CrosshairOverlayAndroidPage;
