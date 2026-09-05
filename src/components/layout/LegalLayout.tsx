import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Share2,
  Printer,
  Search,
  ArrowUp,
  Check,
  Calendar,
  Building,
  Mail,
  AlertTriangle,
  Info,
  Shield,
  ExternalLink,
} from "lucide-react";
import { LegalDocument } from "@/data/crosshairLegalData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";

interface LegalLayoutProps {
  document: LegalDocument;
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({ document }) => {
  const { t } = useLanguage();
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [readingProgress, setReadingProgress] = useState<number>(0);

  // ScrollSpy & reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        window.document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      setShowBackToTop(window.scrollY > 400);

      // Section detection
      const sections = document.sections.map((s) =>
        window.document.getElementById(s.id)
      );

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSectionId(document.sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [document.sections]);

  const scrollToSection = (id: string) => {
    const element = window.document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSectionId(id);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${document.title} - ${document.subtitle}`,
          url: window.location.href,
        });
      } catch {
        // User dismissed share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredSections = document.sections.filter((section) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const matchesTitle = section.title.toLowerCase().includes(query);
    const matchesContent = section.content?.toLowerCase().includes(query);
    const matchesSubsections = section.subsections?.some(
      (sub) =>
        sub.title.toLowerCase().includes(query) ||
        sub.content.toLowerCase().includes(query)
    );
    const matchesBullets = section.bullets?.some((b) =>
      b.toLowerCase().includes(query)
    );
    return matchesTitle || matchesContent || matchesSubsections || matchesBullets;
  });

  return (
    <div className="relative min-h-screen pb-20">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 transition-all duration-150 origin-left"
        style={{ width: `${readingProgress}%` }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* Back breadcrumb & actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors bg-card/60 px-3 py-1.5 rounded-lg border border-border/60 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            {t("legalLayout.allApps")}
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="text-xs h-8 gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-primary" />
                  {t("common.copied")}
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  {t("common.share")}
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="text-xs h-8 gap-1.5 hidden sm:inline-flex"
            >
              <Printer className="w-3.5 h-3.5" />
              {t("legalLayout.print")}
            </Button>
          </div>
        </div>

        {/* Document Hero Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-sm shadow-sm mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="brand">{document.subtitle}</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {t("legalLayout.lastUpdated", { date: document.lastUpdated })}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            {document.title}
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
            {document.summary}
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-4 border-t border-border/50">
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-primary" />
              <span>{t("legalLayout.publisher")} <strong>{document.publisher}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <a
                href={`mailto:${document.contactEmail}`}
                className="hover:text-primary transition-colors underline"
              >
                {document.contactEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar TOC + Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar (TOC & Search) */}
          <aside className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="p-4 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-sm shadow-sm space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("legalLayout.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 text-xs"
                />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1">
                  {t("legalLayout.tableOfContents")}
                </h4>
                <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                  {document.sections.map((section) => {
                    const isActive = activeSectionId === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-start gap-2 ${
                          isActive
                            ? "bg-primary/15 text-primary font-bold border-l-2 border-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        {section.number && (
                          <span className="font-mono opacity-60">
                            {section.number}.
                          </span>
                        )}
                        <span className="line-clamp-1">
                          {section.shortTitle || section.title}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Support box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-card/50 to-card border border-primary/20 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-foreground">
                <Shield className="w-4 h-4 text-primary" />
                {t("legalLayout.needHelp")}
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                {t("legalLayout.needHelpDesc")}
              </p>
              <a
                href={`mailto:${document.contactEmail}`}
                className="inline-flex items-center gap-1 text-primary font-bold hover:underline text-xs pt-1"
              >
                {document.contactEmail} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* Document Content Sections */}
          <main className="lg:col-span-8 space-y-8">
            {filteredSections.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-card border border-border/70">
                <p className="text-muted-foreground text-sm">
                  {t("legalLayout.noSectionsFound", { query: searchQuery })}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-xs"
                >
                  {t("legalLayout.clearSearch")}
                </Button>
              </div>
            ) : (
              filteredSections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/80 backdrop-blur-sm shadow-sm space-y-4 hover:border-primary/30 transition-colors"
                >
                  {/* Section Title */}
                  <div className="flex items-start gap-3">
                    {section.number && (
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary font-mono text-xs font-bold shrink-0 mt-0.5">
                        {section.number}
                      </span>
                    )}
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">
                      {section.title}
                    </h2>
                  </div>

                  <Separator />

                  {/* Section Content */}
                  {section.content && (
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {section.content}
                    </p>
                  )}

                  {/* Callout Box */}
                  {section.callout && (
                    <div
                      className={`p-4 rounded-xl border text-xs sm:text-sm flex gap-3 ${
                        section.callout.type === "warning"
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                          : section.callout.type === "success"
                          ? "bg-primary/10 border-primary/30 text-primary"
                          : "bg-primary/10 border-primary/25 text-foreground"
                      }`}
                    >
                      {section.callout.type === "warning" ? (
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-1">
                        {section.callout.title && (
                          <h5 className="font-bold text-foreground">
                            {section.callout.title}
                          </h5>
                        )}
                        <p className="leading-relaxed text-muted-foreground text-xs">
                          {section.callout.text}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bullets */}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 text-sm text-foreground/90 pl-2">
                      {section.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Subsections */}
                  {section.subsections && section.subsections.length > 0 && (
                    <div className="space-y-4 pt-2">
                      {section.subsections.map((sub, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-background/50 border border-border/50 space-y-1.5"
                        >
                          <h3 className="text-sm font-bold text-foreground">
                            {sub.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {sub.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Data Table if present */}
                  {section.tableData && (
                    <div className="overflow-x-auto rounded-xl border border-border/60 mt-4">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-muted/60 text-foreground font-semibold">
                          <tr>
                            {section.tableData.headers.map((h, i) => (
                              <th key={i} className="p-3 border-b border-border/60">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                          {section.tableData.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-muted/20">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3 text-muted-foreground">
                                  {cell.startsWith("http") ? (
                                    <a
                                      href={cell}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                                    >
                                      {t("legalLayout.link")} <ExternalLink className="w-3 h-3" />
                                    </a>
                                  ) : (
                                    cell
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))
            )}
          </main>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg border-border/80 bg-card/80 backdrop-blur-md hover:border-primary/50 text-primary"
          aria-label={t("common.backToTop")}
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
