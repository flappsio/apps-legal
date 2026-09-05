import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { CrosshairDisclaimer } from "@/components/crosshair/CrosshairDisclaimer";
import { QuickAnswerBlock } from "@/components/crosshair/QuickAnswerBlock";
import { GUIDES_DATA } from "@/data/crosshairTranslations";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const CrosshairGuideDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isTr } = useLanguage();

  const guide = GUIDES_DATA.find((g) => g.slug === slug);

  if (!guide) {
    return <Navigate to="/crosshair/guides" replace />;
  }

  const title = `${isTr ? guide.title.tr : guide.title.en} | Crossio`;
  const description = isTr ? guide.description.tr : guide.description.en;

  // TechArticle JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": isTr ? guide.title.tr : guide.title.en,
    "description": description,
    "datePublished": guide.publishedDate,
    "author": {
      "@type": "Organization",
      "name": "flappsio"
    },
    "publisher": {
      "@type": "Organization",
      "name": "flappsio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://flappsio.com/assets/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://flappsio.com/crosshair/guides/${guide.slug}`
    }
  };

  const currentIndex = GUIDES_DATA.findIndex((g) => g.slug === slug);
  const nextGuide = currentIndex < GUIDES_DATA.length - 1 ? GUIDES_DATA[currentIndex + 1] : null;
  const prevGuide = currentIndex > 0 ? GUIDES_DATA[currentIndex - 1] : null;

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title={title}
        description={description}
        canonicalPath={`/crosshair/guides/${guide.slug}`}
        ogType="article"
        keywords={[
          guide.slug.replace(/-/g, " "),
          "crossio rehber",
          "nişangah ayarları",
          "crosshair design guide",
        ]}
        breadcrumbs={[
          { name: isTr ? "Ana Sayfa" : "Home", url: "/" },
          { name: "Crossio", url: "/crosshair" },
          { name: isTr ? "Rehberler" : "Guides", url: "/crosshair/guides" },
          { name: isTr ? guide.title.tr : guide.title.en, url: `/crosshair/guides/${guide.slug}` },
        ]}
        jsonLd={articleJsonLd}
      />

      <article className="container max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          to="/crosshair/guides"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-6 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>{isTr ? "Tüm Rehberlere Dön" : "Back to Guides"}</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 pb-8 border-b border-border/60">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <Badge variant="brand" className="text-[11px] px-2.5 py-0.5 font-semibold">
              {guide.category}
            </Badge>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{guide.readTime}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{guide.publishedDate}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-[1.2]">
            {isTr ? guide.title.tr : guide.title.en}
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isTr ? guide.description.tr : guide.description.en}
          </p>
        </header>

        {/* Quick Answer / AI Summary Box */}
        <QuickAnswerBlock
          question={isTr ? guide.title.tr : guide.title.en}
          summary={isTr ? guide.summary.tr : guide.summary.en}
          sourceCategory="flappsio Crosshair Editorial"
        />

        {/* Article Body Sections */}
        <div className="space-y-8 my-8 text-foreground/90 text-sm leading-relaxed">
          {guide.sections.map((sec, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                {isTr ? sec.title.tr : sec.title.en}
              </h2>

              <p className="text-muted-foreground">
                {isTr ? sec.content.tr : sec.content.en}
              </p>

              {sec.bullets && (
                <ul className="space-y-2 pl-2 pt-1 text-xs sm:text-sm text-muted-foreground">
                  {(isTr ? sec.bullets.tr : sec.bullets.en).map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.tip && (
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-xs sm:text-sm text-foreground/90 flex items-start gap-2.5 mt-3">
                  <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="italic">{isTr ? sec.tip.tr : sec.tip.en}</span>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Navigation Between Guides */}
        <div className="my-12 pt-8 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevGuide ? (
            <Link
              to={`/crosshair/guides/${prevGuide.slug}`}
              className="p-4 rounded-2xl bg-card/60 border border-border/70 hover:border-primary/40 transition-colors flex flex-col group"
            >
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                {isTr ? "Önceki Rehber" : "Previous Guide"}
              </span>
              <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {isTr ? prevGuide.title.tr : prevGuide.title.en}
              </span>
            </Link>
          ) : <div />}

          {nextGuide && (
            <Link
              to={`/crosshair/guides/${nextGuide.slug}`}
              className="p-4 rounded-2xl bg-card/60 border border-border/70 hover:border-primary/40 transition-colors flex flex-col text-right group sm:ml-auto w-full"
            >
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1 flex items-center justify-end gap-1">
                {isTr ? "Sonraki Rehber" : "Next Guide"}
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {isTr ? nextGuide.title.tr : nextGuide.title.en}
              </span>
            </Link>
          )}
        </div>

        {/* Disclaimer */}
        <div className="pt-4">
          <CrosshairDisclaimer />
        </div>
      </article>
    </div>
  );
};
