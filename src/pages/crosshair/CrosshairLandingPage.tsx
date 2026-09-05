import React, { Suspense, lazy } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { CrosshairHero } from "@/components/crosshair/CrosshairHero";
import { CrosshairDisclaimer } from "@/components/crosshair/CrosshairDisclaimer";
import { FAQS_DATA, GUIDES_DATA } from "@/data/crosshairTranslations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Lazy load below-the-fold sections for instant FCP / LCP (<0.5s)
const CrosshairPreviewer = lazy(() =>
  import("@/components/crosshair/CrosshairPreviewer").then((m) => ({
    default: m.CrosshairPreviewer,
  }))
);
const CrosshairVideoSection = lazy(() =>
  import("@/components/crosshair/CrosshairVideoSection").then((m) => ({
    default: m.CrosshairVideoSection,
  }))
);
const CrosshairPlayStoreShowcase = lazy(() =>
  import("@/components/crosshair/CrosshairPlayStoreShowcase").then((m) => ({
    default: m.CrosshairPlayStoreShowcase,
  }))
);
const CrosshairFeatures = lazy(() =>
  import("@/components/crosshair/CrosshairFeatures").then((m) => ({
    default: m.CrosshairFeatures,
  }))
);
const CrosshairGallerySection = lazy(() =>
  import("@/components/crosshair/CrosshairGallerySection").then((m) => ({
    default: m.CrosshairGallerySection,
  }))
);
const CrosshairImportSection = lazy(() =>
  import("@/components/crosshair/CrosshairImportSection").then((m) => ({
    default: m.CrosshairImportSection,
  }))
);
const CrosshairCustomizationSection = lazy(() =>
  import("@/components/crosshair/CrosshairCustomizationSection").then((m) => ({
    default: m.CrosshairCustomizationSection,
  }))
);
const CrosshairSetupSteps = lazy(() =>
  import("@/components/crosshair/CrosshairSetupSteps").then((m) => ({
    default: m.CrosshairSetupSteps,
  }))
);
const CrosshairWhyUseSection = lazy(() =>
  import("@/components/crosshair/CrosshairWhyUseSection").then((m) => ({
    default: m.CrosshairWhyUseSection,
  }))
);
const CrosshairCenterFocusSection = lazy(() =>
  import("@/components/crosshair/CrosshairCenterFocusSection").then((m) => ({
    default: m.CrosshairCenterFocusSection,
  }))
);
const CrosshairMobileFirstSection = lazy(() =>
  import("@/components/crosshair/CrosshairMobileFirstSection").then((m) => ({
    default: m.CrosshairMobileFirstSection,
  }))
);
const CrosshairFeatureMatrixSection = lazy(() =>
  import("@/components/crosshair/CrosshairFeatureMatrixSection").then((m) => ({
    default: m.CrosshairFeatureMatrixSection,
  }))
);
const CrosshairFinalCTA = lazy(() =>
  import("@/components/crosshair/CrosshairFinalCTA").then((m) => ({
    default: m.CrosshairFinalCTA,
  }))
);
const MobileStickyCTA = lazy(() =>
  import("@/components/crosshair/MobileStickyCTA").then((m) => ({
    default: m.MobileStickyCTA,
  }))
);

const SectionSkeleton: React.FC = () => (
  <div className="py-16 flex items-center justify-center opacity-30">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

export const CrosshairLandingPage: React.FC = () => {
  const { t, isTr } = useLanguage();

  const title = t("landingPage.metaTitle");
  const description = t("landingPage.metaDesc");

  const keywords = [
    "crosshair app",
    "crosshair app Android",
    "custom crosshair Android",
    "crosshair overlay Android",
    "crosshair designer",
    "mobile crosshair",
    "passive visual overlay",
    "crosshair overlay",
    "click-through overlay",
    "custom crosshair app",
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title={title}
        description={description}
        canonicalPath="/crosshair"
        keywords={keywords}
        breadcrumbs={[
          { name: t("common.home"), url: "/" },
          { name: "Crossio", url: "/crosshair" },
        ]}
      />

      {/* 1. Critical Hero Section (Rendered immediately for ultra-fast LCP / FCP) */}
      <CrosshairHero />

      {/* 2. Below-the-fold sections loaded asynchronously */}
      <Suspense fallback={<SectionSkeleton />}>
        {/* Official Google Play Store Card & Screenshot Carousel */}
        <CrosshairPlayStoreShowcase />

        {/* Interactive "Try the Crosshair" Playground */}
        <CrosshairPreviewer />

        {/* Autoplay Cinematic Mobile Gameplay Video Demo */}
        <CrosshairVideoSection />

        {/* Section: Made for mobile. Built for your aim. */}
        <CrosshairFeatures />

        {/* Section: Find your crosshair (Gallery Explorer) */}
        <CrosshairGallerySection />

        {/* Section: Custom Crosshair Import */}
        <CrosshairImportSection />

        {/* Section: Pixel-perfect control */}
        <CrosshairCustomizationSection />

        {/* Section: From download to gameplay in seconds */}
        <CrosshairSetupSteps />

        {/* Section: Why use a custom crosshair on Android? */}
        <CrosshairWhyUseSection />

        {/* Section: Stay focused on the center */}
        <CrosshairCenterFocusSection />

        {/* Section: Built for Android. Not adapted to it */}
        <CrosshairMobileFirstSection />

        {/* Section: Full Technical Feature Matrix & AI Knowledge Base */}
        <CrosshairFeatureMatrixSection />

        {/* FAQ Spotlight Section */}
        <section className="py-16 sm:py-20 border-t border-border/40">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
              <div>
                <Badge variant="brand" className="text-xs px-3 py-1 font-semibold mb-2">
                  {t("landingPage.faqBadge")}
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {t("landingPage.faqTitle")}
                </h2>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="text-xs rounded-xl border-border/80 hover:bg-secondary gap-1.5"
              >
                <Link to="/crosshair/faq">
                  <span>{t("landingPage.viewAllFaqs", { count: FAQS_DATA.length })}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FAQS_DATA.slice(0, 4).map((faq) => (
                <div
                  key={faq.id}
                  className="p-5 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-sm space-y-2 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <h3 className="text-sm font-bold text-foreground">
                      {isTr ? faq.question.tr : faq.question.en}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6 leading-relaxed">
                    {isTr ? faq.directAnswer.tr : faq.directAnswer.en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guides Spotlight */}
        <section className="py-16 sm:py-20 border-t border-border/40">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
              <div>
                <Badge variant="brand" className="text-xs px-3 py-1 font-semibold mb-2">
                  {t("landingPage.guidesBadge")}
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {t("landingPage.guidesTitle")}
                </h2>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="text-xs rounded-xl border-border/80 hover:bg-secondary gap-1.5"
              >
                <Link to="/crosshair/guides">
                  <span>{t("landingPage.readAllGuides")}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GUIDES_DATA.map((guide) => (
                <Link
                  key={guide.slug}
                  to={`/crosshair/guides/${guide.slug}`}
                  className="group p-5 rounded-2xl bg-card/60 border border-border/70 hover:border-primary/40 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="px-2 py-0.5 rounded-full bg-secondary text-primary font-semibold">
                        {guide.category}
                      </span>
                      <span>{guide.readTime}</span>
                    </div>

                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {isTr ? guide.title.tr : guide.title.en}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {isTr ? guide.description.tr : guide.description.en}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border/40 flex items-center text-xs text-primary font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>{t("guidesPage.readGuide")}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cinematic Final CTA */}
        <CrosshairFinalCTA />

        {/* Trademark Disclaimer */}
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          <CrosshairDisclaimer />
        </div>

        {/* Mobile Thumb-Reach Sticky CTA */}
        <MobileStickyCTA />
      </Suspense>
    </div>
  );
};
