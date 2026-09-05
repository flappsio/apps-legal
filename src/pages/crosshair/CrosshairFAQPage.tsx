import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { CrosshairDisclaimer } from "@/components/crosshair/CrosshairDisclaimer";
import { FAQS_DATA } from "@/data/crosshairTranslations";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search, HelpCircle, Sparkles } from "lucide-react";

export const CrosshairFAQPage: React.FC = () => {
  const { t, isTr } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(FAQS_DATA[0].id);

  const categories = [
    { id: "all", label: t("faqPage.allCount", { count: FAQS_DATA.length }) },
    { id: "general", label: t("faqPage.catGeneral") },
    { id: "overlay", label: t("faqPage.catOverlay") },
    { id: "import", label: t("faqPage.catImport") },
    { id: "performance", label: t("faqPage.catPerformance") },
    { id: "compatibility", label: t("faqPage.catCompatibility") },
  ];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const questionText = isTr ? faq.question.tr : faq.question.en;
    const answerText = isTr ? faq.directAnswer.tr : faq.directAnswer.en;
    const matchesSearch =
      questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      answerText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const title = t("faqPage.metaTitle");
  const description = t("faqPage.metaDesc");

  // FAQPage JSON-LD schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS_DATA.map((faq) => ({
      "@type": "Question",
      "name": isTr ? faq.question.tr : faq.question.en,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${isTr ? faq.directAnswer.tr : faq.directAnswer.en} ${isTr ? faq.detailedAnswer.tr : faq.detailedAnswer.en}`,
      },
    })),
  };

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title={title}
        description={description}
        canonicalPath="/crosshair/faq"
        keywords={[
          "crosshair faq",
          "crosshair overlay nasıl çalışır",
          "crosshair güvenli mi",
          "crosshair üçüncü taraf kuralları",
          "android overlay izni",
          "crosshair battery optimization",
          "crosshair png import",
          "crosshair iphone pc",
        ]}
        breadcrumbs={[
          { name: t("common.home"), url: "/" },
          { name: "Crosshair", url: "/crosshair" },
          { name: t("common.faq"), url: "/crosshair/faq" },
        ]}
        jsonLd={faqJsonLd}
      />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {t("faqPage.badge")}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t("faqPage.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("faqPage.subtitle")}
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              id="faq-search-input"
              aria-label={t("faqPage.searchAria")}
              type="text"
              placeholder={t("faqPage.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-sm bg-card/80 border-border/80 rounded-2xl backdrop-blur-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-black font-extrabold shadow-sm"
                    : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 my-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 p-8 rounded-3xl bg-card/40 border border-border/60 space-y-2">
              <HelpCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">
                {t("faqPage.noQuestions")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("faqPage.tryDifferent")}
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-card/90 border-primary/40 shadow-lg shadow-primary/5"
                      : "bg-card/50 border-border/70 hover:border-border"
                  }`}
                >
                  <button
                    onClick={() => setExpandedId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-foreground hover:text-primary transition-colors text-sm sm:text-base"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>{isTr ? faq.question.tr : faq.question.en}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground border-t border-border/40 space-y-3 bg-card/30">
                      {/* Direct Answer Box (AEO Snippet) */}
                      <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-foreground font-medium flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{isTr ? faq.directAnswer.tr : faq.directAnswer.en}</span>
                      </div>

                      {/* Detailed Context */}
                      <p className="leading-relaxed pl-1">
                        {isTr ? faq.detailedAnswer.tr : faq.detailedAnswer.en}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Disclaimer */}
        <div className="pt-8">
          <CrosshairDisclaimer />
        </div>
      </div>
    </div>
  );
};
