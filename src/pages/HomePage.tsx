import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { APPS_DATA } from "@/data/apps";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Lock,
  Cpu,
  Layers,
  FileText,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Terminal,
  Activity,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Mail,
  Smartphone,
} from "lucide-react";

export const HomePage: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.document.title = t("home.metaTitle");
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [t]);

  const flagshipApp = APPS_DATA[0];

  const legalDirectory = [
    {
      title: t("home.legalDir.privacy.title"),
      desc: t("home.legalDir.privacy.desc"),
      category: t("home.legalDir.privacy.category"),
      status: t("home.legalDir.privacy.status"),
      link: "/crosshair/privacy-policy",
      icon: <Lock className="w-4 h-4 text-primary" />,
    },
    {
      title: t("home.legalDir.terms.title"),
      desc: t("home.legalDir.terms.desc"),
      category: t("home.legalDir.terms.category"),
      status: t("home.legalDir.terms.status"),
      link: "/crosshair/terms-of-use",
      icon: <FileText className="w-4 h-4 text-primary" />,
    },
    {
      title: t("home.legalDir.licenses.title"),
      desc: t("home.legalDir.licenses.desc"),
      category: t("home.legalDir.licenses.category"),
      status: t("home.legalDir.licenses.status"),
      link: "/license",
      icon: <ShieldCheck className="w-4 h-4 text-primary" />,
    },
    {
      title: t("home.legalDir.permissions.title"),
      desc: t("home.legalDir.permissions.desc"),
      category: t("home.legalDir.permissions.category"),
      status: t("home.legalDir.permissions.status"),
      link: "/crosshair/guides/sorun-giderme-overlay-izinleri",
      icon: <Smartphone className="w-4 h-4 text-primary" />,
    },
    {
      title: t("home.legalDir.howToUse.title"),
      desc: t("home.legalDir.howToUse.desc"),
      category: t("home.legalDir.howToUse.category"),
      status: t("home.legalDir.howToUse.status"),
      link: "/crosshair/how-to-use",
      icon: <BookOpen className="w-4 h-4 text-primary" />,
    },
    {
      title: t("home.legalDir.faq.title"),
      desc: t("home.legalDir.faq.desc"),
      category: t("home.legalDir.faq.category"),
      status: t("home.legalDir.faq.status"),
      link: "/crosshair/faq",
      icon: <HelpCircle className="w-4 h-4 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* 1. ARCHITECTURAL HERO & STUDIO MANIFESTO */}
      <section className="relative overflow-hidden pt-12 pb-14 sm:pt-20 sm:pb-20 border-b border-border/40">
        {/* Subtle grid pattern background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl space-y-6">
            {/* Engineering Status Chip */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-secondary/80 border border-border/80 text-[11px] font-mono uppercase tracking-wider text-muted-foreground backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span>{t("home.badge")}</span>
            </div>

            {/* Confident Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08]">
              {t("home.titleLine1")} <br />
              <span className="text-primary underline decoration-primary/30 underline-offset-8">
                {t("home.titleHighlight")}
              </span>{" "}
              {t("home.titleLine2")}
            </h1>

            {/* Precise Subtitle */}
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
              {t("home.subtitle")}
            </p>

            {/* Telemetry Architecture Ribbon (Monospace technical specs) */}
            <div className="pt-2 flex flex-wrap gap-2 sm:gap-3 text-[11px] font-mono text-muted-foreground">
              <span className="px-2.5 py-1 rounded border border-border/70 bg-card/40 flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-primary" />
                {t("home.telemetryApi")}
              </span>
              <span className="px-2.5 py-1 rounded border border-border/70 bg-card/40 flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-primary" />
                {t("home.telemetrySafety")}
              </span>
              <span className="px-2.5 py-1 rounded border border-border/70 bg-card/40 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-primary" />
                {t("home.telemetryStorage")}
              </span>
              <span className="px-2.5 py-1 rounded border border-border/70 bg-card/40 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-primary" />
                {t("home.telemetryOverlay")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLAGSHIP PRODUCT SHOWCASE: CROSSIO (Hardware-Grade Tactile Presentation) */}
      <section className="py-14 sm:py-20 border-b border-border/40">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-[11px] font-mono tracking-widest text-primary uppercase font-bold mb-1">
                {t("home.flagshipBadge")}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                {t("home.flagshipTitle")}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {t("home.flagshipCategory")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-[11px] border-primary/40 text-primary">
                {t("home.googlePlayVerified")}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Side: Product Specifications, Guarantees & Action Suite (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/80 backdrop-blur-sm relative overflow-hidden">
              <div className="space-y-6">
                {/* Header with App Icon */}
                <div className="flex items-start gap-4">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-background border border-border p-2 shadow-md">
                    <img
                      src={flagshipApp.iconUrl}
                      alt={flagshipApp.name}
                      className="h-full w-full object-contain rounded-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                      Crossio: Custom Crosshair
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">
                      {flagshipApp.version}
                    </p>
                  </div>
                </div>

                {/* Core Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t("home.flagshipDesc")}
                </p>

                {/* Technical Guarantees Checklist */}
                <div className="space-y-3 pt-2 border-t border-border/40">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                    {t("home.flagshipSpecsTitle")}
                  </h4>
                  <ul className="space-y-2.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{t("home.spec1")}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{t("home.spec2")}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{t("home.spec3")}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons Suite */}
              <div className="pt-8 mt-6 border-t border-border/40 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-md text-xs gap-2 group"
                  >
                    <Link to="/crosshair">
                      <Sparkles className="w-4 h-4" />
                      <span>{t("home.showcaseBtn")}</span>
                      <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-12 rounded-xl border-border hover:bg-secondary text-xs font-semibold gap-2"
                  >
                    <a
                      href={flagshipApp.links.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{t("home.viewOnPlayStore")}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                    </a>
                  </Button>
                </div>

                {/* Fast Legal Document Shortcuts */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-8 text-[11px] justify-start text-muted-foreground hover:text-foreground hover:bg-secondary/60 gap-1.5"
                  >
                    <Link to="/crosshair/privacy-policy">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      <span>{t("home.privacyBtn")}</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-8 text-[11px] justify-start text-muted-foreground hover:text-foreground hover:bg-secondary/60 gap-1.5"
                  >
                    <Link to="/crosshair/terms-of-use">
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      <span>{t("home.termsBtn")}</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Side: Tactical HUD Interactive Reticle Preview (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-card/30 border border-border/80 backdrop-blur-sm relative overflow-hidden font-mono">
              {/* Corner HUD Reticle Crosses (+) */}
              <span className="absolute top-2.5 left-2.5 text-xs text-muted-foreground/40 font-mono select-none">+</span>
              <span className="absolute top-2.5 right-2.5 text-xs text-muted-foreground/40 font-mono select-none">+</span>
              <span className="absolute bottom-2.5 left-2.5 text-xs text-muted-foreground/40 font-mono select-none">+</span>
              <span className="absolute bottom-2.5 right-2.5 text-xs text-muted-foreground/40 font-mono select-none">+</span>

              {/* HUD Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-border/40 text-[11px]">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
                  <span className="font-bold text-foreground">{t("home.hudTitle")}</span>
                </div>
                <span className="text-muted-foreground text-[10px]">
                  {t("home.hudCoordinates")}
                </span>
              </div>

              {/* Central Tactical Reticle Viewport */}
              <div className="my-8 py-8 flex flex-col items-center justify-center relative">
                {/* Target concentric range rings */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-border/40 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-border/30 border-dashed" />
                  <div className="w-16 h-16 rounded-full border border-primary/20" />

                  {/* Axis crosshair lines (faded background) */}
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-border/40 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 w-[1px] bg-border/40 pointer-events-none" />

                  {/* Active SVG Crosshair Reticle */}
                  <Link
                    to="/crosshair"
                    title={t("home.launchSimulator")}
                    className="relative z-10 transition-transform duration-300 hover:scale-110 cursor-crosshair group"
                  >
                    <svg
                      width="54"
                      height="54"
                      viewBox="0 0 54 54"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="drop-shadow-[0_0_8px_rgba(105,240,174,0.6)]"
                    >
                      {/* Black outline */}
                      <path
                        d="M27 7V21M27 33V47M7 27H21M33 27H47"
                        stroke="#000000"
                        strokeWidth="4.5"
                        strokeLinecap="square"
                      />
                      {/* High-visibility primary crosshair */}
                      <path
                        d="M27 7V21M27 33V47M7 27H21M33 27H47"
                        stroke="#69f0ae"
                        strokeWidth="2.5"
                        strokeLinecap="square"
                      />
                      {/* Center Dot */}
                      <circle cx="27" cy="27" r="2.5" fill="#000000" />
                      <circle cx="27" cy="27" r="1.5" fill="#69f0ae" />
                    </svg>
                  </Link>
                </div>

                {/* HUD Live Readout */}
                <div className="mt-4 flex items-center gap-4 text-[10px] text-muted-foreground font-mono">
                  <span>SIZE: 32PX</span>
                  <span>GAP: 6PX</span>
                  <span>THICK: 2.5PX</span>
                  <span className="text-primary">HEX: #69F0AE</span>
                </div>
              </div>

              {/* HUD Footer Status */}
              <div className="pt-4 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px]">
                <span className="text-primary font-bold flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block" />
                  {t("home.hudStatus")}
                </span>
                <span className="text-muted-foreground">
                  {t("home.hudLayerType")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ENGINEERING PILLARS & COMPLIANCE (Asymmetric Architectural Grid) */}
      <section className="py-14 sm:py-20 border-b border-border/40">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <div className="text-[11px] font-mono tracking-widest text-primary uppercase font-bold mb-1">
              {t("home.pillarsTitle")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {t("home.pillarsSubtitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Zero Telemetry */}
            <div className="p-6 rounded-2xl bg-card/40 border border-border/80 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-secondary text-primary font-bold">
                    {t("home.pillar1Tag")}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {t("home.pillar1Title")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("home.pillar1Desc")}
                </p>
              </div>
              <div className="pt-3 border-t border-border/40 text-[11px] font-mono text-muted-foreground">
                {t("home.pillar1Status")}
              </div>
            </div>

            {/* Pillar 2: Safe Android Overlay */}
            <div className="p-6 rounded-2xl bg-card/40 border border-border/80 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-secondary text-primary font-bold">
                    {t("home.pillar2Tag")}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {t("home.pillar2Title")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("home.pillar2Desc")}
                </p>
              </div>
              <div className="pt-3 border-t border-border/40 text-[11px] font-mono text-muted-foreground">
                {t("home.pillar2Status")}
              </div>
            </div>

            {/* Pillar 3: Open Source & Audit */}
            <div className="p-6 rounded-2xl bg-card/40 border border-border/80 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-secondary text-primary font-bold">
                    {t("home.pillar3Tag")}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {t("home.pillar3Title")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("home.pillar3Desc")}
                </p>
              </div>
              <div className="pt-3 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
                <span>{t("home.pillar3Status")}</span>
                <Link to="/license" className="text-primary hover:underline">
                  {t("home.pillar3Action")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DOCUMENTATION & LEGAL POLICIES DIRECTORY (Direct Structured Access) */}
      <section className="py-14 sm:py-20 border-b border-border/40">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-8">
            <div className="text-[11px] font-mono tracking-widest text-primary uppercase font-bold mb-1">
              {t("home.directoryBadge")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {t("home.directoryTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {t("home.directorySubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {legalDirectory.map((doc, idx) => (
              <Link
                key={idx}
                to={doc.link}
                className="group p-5 rounded-2xl bg-card/30 border border-border/70 hover:border-primary/40 hover:bg-card/60 transition-all flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-background border border-border/80 shrink-0 group-hover:border-primary/50 transition-colors">
                    {doc.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-secondary text-muted-foreground font-semibold">
                        {doc.category}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {doc.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {doc.desc}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 shrink-0 transition-transform mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VERIFIED DEVELOPER CONTACT & REPOSITORY IDENTITY */}
      <section className="py-14 sm:py-16">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-card/20 border border-border/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{t("home.contactTitle")}</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("home.contactDesc")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-xl border-border hover:bg-secondary text-xs h-10 font-mono"
              >
                <a href="mailto:info@flappsio.com">
                  <span>info@flappsio.com</span>
                </a>
              </Button>

              <Button
                asChild
                size="sm"
                className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs h-10"
              >
                <a
                  href="https://play.google.com/store/apps/dev?id=7293872078280152833"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <span>{t("home.googlePlayDevBtn")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
