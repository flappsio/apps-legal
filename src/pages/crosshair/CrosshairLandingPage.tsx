import React, { Suspense, lazy } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { CrosshairHero } from "@/components/crosshair/CrosshairHero";
import { CrosshairDisclaimer } from "@/components/crosshair/CrosshairDisclaimer";
import { FAQS_DATA, GUIDES_DATA } from "@/data/crosshairTranslations";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HelpCircle, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Lazy load below-the-fold scenes for instant FCP / LCP (<0.4s)
const CrosshairPreviewer = lazy(() =>
  import("@/components/crosshair/CrosshairPreviewer").then((m) => ({
    default: m.CrosshairPreviewer,
  }))
);
const CrosshairPlayStoreShowcase = lazy(() =>
  import("@/components/crosshair/CrosshairPlayStoreShowcase").then((m) => ({
    default: m.CrosshairPlayStoreShowcase,
  }))
);
const CrosshairVideoSection = lazy(() =>
  import("@/components/crosshair/CrosshairVideoSection").then((m) => ({
    default: m.CrosshairVideoSection,
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
const CrosshairArchitectureCore = lazy(() =>
  import("@/components/crosshair/CrosshairArchitectureCore").then((m) => ({
    default: m.CrosshairArchitectureCore,
  }))
);
const CrosshairSetupSteps = lazy(() =>
  import("@/components/crosshair/CrosshairSetupSteps").then((m) => ({
    default: m.CrosshairSetupSteps,
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
    <div className="crossio-landing min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
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

      {/* SCENE 1: Critical Hero Section (Immediate render for ultra-fast LCP / FCP) */}
      <CrosshairHero />

      {/* Below-the-fold sections loaded asynchronously with progressive ScrollReveal */}
      <Suspense fallback={<SectionSkeleton />}>
        {/* SCENE 2: Interactive Crosshair Simulator Lab */}
        <ScrollReveal direction="up" delay={80}>
          <CrosshairPreviewer />
        </ScrollReveal>

        {/* SCENE 3: Verified Gameplay Proof & Google Play Showcase */}
        <ScrollReveal direction="up" delay={80}>
          <CrosshairPlayStoreShowcase />
        </ScrollReveal>

        {/* SCENE 4: Mobile Gameplay Video Demo */}
        <ScrollReveal direction="up" delay={80}>
          <CrosshairVideoSection />
        </ScrollReveal>

        {/* SCENE 5: Pro Gallery & Custom Reticle Import */}
        <ScrollReveal direction="up" delay={80}>
          <CrosshairGallerySection />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={80}>
          <CrosshairImportSection />
        </ScrollReveal>

        {/* SCENE 6: Consolidated System Architecture & Safety Core */}
        <ScrollReveal direction="up" delay={80}>
          <CrosshairArchitectureCore />
        </ScrollReveal>

        {/* SCENE 7: 3-Step Setup Flow (From Download to Aim) */}
        <ScrollReveal direction="up" delay={80}>
          <CrosshairSetupSteps />
        </ScrollReveal>

        {/* SCENE 8: Essential Knowledge: FAQ Spotlight */}
        <section className="py-16 sm:py-24 border-t border-border/40">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <ScrollReveal direction="up" delay={50}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                <div>
                  <div className="text-[11px] font-mono tracking-widest text-primary uppercase font-bold mb-1">
                    {t("landingPage.faqBadge")}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {t("landingPage.faqTitle")}
                  </h2>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-xl border-border/80 hover:bg-secondary gap-1.5 font-mono"
                >
                  <Link to="/crosshair/faq">
                    <span>{t("landingPage.viewAllFaqs", { count: FAQS_DATA.length })}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FAQS_DATA.slice(0, 4).map((faq, idx) => (
                <ScrollReveal key={faq.id} direction="up" delay={idx * 80}>
                  <div className="p-5 rounded-2xl bg-card/40 border border-border/70 backdrop-blur-sm space-y-2 hover:border-primary/40 transition-colors h-full">
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
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* SCENE 9: Practical Gaming Guides Spotlight */}
        <section className="py-16 sm:py-24 border-t border-border/40">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <ScrollReveal direction="up" delay={50}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                <div>
                  <div className="text-[11px] font-mono tracking-widest text-primary uppercase font-bold mb-1">
                    {t("landingPage.guidesBadge")}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {t("landingPage.guidesTitle")}
                  </h2>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-xl border-border/80 hover:bg-secondary gap-1.5 font-mono"
                >
                  <Link to="/crosshair/guides">
                    <span>{t("landingPage.readAllGuides")}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GUIDES_DATA.map((guide, idx) => (
                <ScrollReveal key={guide.slug} direction="up" delay={idx * 100} className="h-full">
                  <Link
                    to={`/crosshair/guides/${guide.slug}`}
                    className="group p-5 rounded-2xl bg-card/40 border border-border/70 hover:border-primary/40 hover:bg-card/60 transition-all flex flex-col justify-between h-full"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                        <span className="px-2 py-0.5 rounded bg-secondary text-primary font-bold">
                          {guide.category}
                        </span>
                        <span>{guide.readTime}</span>
                      </div>

                      <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {isTr ? guide.title.tr : guide.title.en}
                      </h3>

                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {isTr ? guide.description.tr : guide.description.en}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border/40 flex items-center text-xs text-primary font-semibold group-hover:translate-x-0.5 transition-transform">
                      <span>{t("guidesPage.readGuide")}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* SCENE 10: Cinematic Final CTA */}
        <ScrollReveal direction="up" delay={80}>
          <CrosshairFinalCTA />
        </ScrollReveal>

        {/* Disclaimer */}
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          <CrosshairDisclaimer />
        </div>

        {/* Mobile Thumb-Reach Sticky CTA */}
        <MobileStickyCTA />
      </Suspense>
    </div>
  );
};

export default CrosshairLandingPage;
