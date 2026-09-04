import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/crosshair/LanguageToggle";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState } from "@/context/CrosshairStateContext";
import {
  Crosshair,
  BookOpen,
  HelpCircle,
  Menu,
  X,
  Sparkles,
  Download,
  Sliders,
  LayoutGrid,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  FileText,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header: React.FC = () => {
  const { theme, isMinimal } = useTheme();
  const { t, isTr } = useLanguage();
  const { activeColorOption } = useCrosshairState();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appsDropdownOpen, setAppsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setAppsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isMinimal) return null;

  const logoSrc =
    theme === "light"
      ? "/assets/images/flappsio_black.png"
      : "/assets/images/flappsio_white.png";

  const isCrosshairApp = location.pathname.startsWith("/crosshair");

  const handleGalleryClick = (e: React.MouseEvent) => {
    if (location.pathname === "/crosshair") {
      e.preventDefault();
      const galleryEl =
        document.getElementById("gallery-section") ||
        document.getElementById("interactive-demo");
      if (galleryEl) {
        galleryEl.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/crosshair#gallery-section");
    }
  };

  interface NavLinkItem {
    to: string;
    label: string;
    icon: React.ReactNode;
    active: boolean;
    onClick?: (e: React.MouseEvent) => void;
  }

  // Crosshair Specific Nav Links
  const crosshairNavLinks: NavLinkItem[] = [
    {
      to: "/crosshair",
      label: t("common.features"),
      icon: <Sparkles className="w-3.5 h-3.5" />,
      active: location.pathname === "/crosshair" && !location.hash,
    },
    {
      to: "/crosshair#gallery-section",
      label: t("common.gallery"),
      icon: <Crosshair className="w-3.5 h-3.5 text-primary" />,
      active:
        location.hash === "#gallery-section" ||
        location.hash === "#interactive-demo",
      onClick: handleGalleryClick,
    },
    {
      to: "/crosshair/how-to-use",
      label: t("common.howItWorks"),
      icon: <BookOpen className="w-3.5 h-3.5" />,
      active: location.pathname === "/crosshair/how-to-use",
    },
    {
      to: "/crosshair/faq",
      label: t("common.faq"),
      icon: <HelpCircle className="w-3.5 h-3.5" />,
      active: location.pathname === "/crosshair/faq",
    },
    {
      to: "/crosshair/guides",
      label: t("common.guides"),
      icon: <Sliders className="w-3.5 h-3.5" />,
      active: location.pathname.startsWith("/crosshair/guides"),
    },
  ];

  // Portal / General Hub Nav Links
  const portalNavLinks: NavLinkItem[] = [
    {
      to: "/",
      label: isTr ? "Tüm Uygulamalar" : "All Apps",
      icon: <LayoutGrid className="w-3.5 h-3.5" />,
      active: location.pathname === "/",
    },
    {
      to: "/crosshair/privacy-policy",
      label: t("common.privacy"),
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      active: location.pathname.includes("/privacy-policy"),
    },
    {
      to: "/crosshair/terms-of-use",
      label: t("common.terms"),
      icon: <FileText className="w-3.5 h-3.5" />,
      active: location.pathname.includes("/terms-of-use"),
    },
    {
      to: "/license",
      label: t("common.licenses"),
      icon: <BookOpen className="w-3.5 h-3.5" />,
      active: location.pathname === "/license",
    },
  ];

  const activeNavLinks = isCrosshairApp ? crosshairNavLinks : portalNavLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl transition-colors duration-200">
      <div className="container max-w-6xl mx-auto flex h-16 sm:h-18 items-center justify-between px-4 sm:px-6">
        {/* Left Side: Brand Logo & App Context Selector */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="h-10 sm:h-12 max-h-12 overflow-hidden flex items-center justify-center transition-opacity hover:opacity-85 group shrink-0"
            aria-label={isTr ? "flappsio Ana Sayfa" : "flappsio Homepage"}
          >
            <img
              src={logoSrc}
              alt="flappsio logo"
              className="h-28 sm:h-32 w-auto max-w-[120px] sm:max-w-[140px] object-contain transition-transform duration-200 group-hover:scale-[1.03]"
            />
          </Link>

          {/* Apps Switcher Dropdown (App-Aware Indicator) */}
          <div className="relative hidden sm:block" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setAppsDropdownOpen(!appsDropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                isCrosshairApp
                  ? "bg-secondary/60 border-primary/40 text-foreground"
                  : "bg-muted/40 border-border/70 text-muted-foreground hover:text-foreground"
              }`}
              aria-expanded={appsDropdownOpen}
              aria-haspopup="true"
            >
              {isCrosshairApp ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-bold">Crosshair</span>
                </>
              ) : (
                <>
                  <LayoutGrid className="w-3.5 h-3.5 text-primary" />
                  <span>{t("common.apps")}</span>
                </>
              )}
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  appsDropdownOpen ? "rotate-180 text-primary" : "text-muted-foreground"
                }`}
              />
            </button>

            {/* Dropdown Menu Panel */}
            {appsDropdownOpen && (
              <div
                onMouseLeave={() => setAppsDropdownOpen(false)}
                className="absolute left-0 top-full mt-2 w-72 p-2 rounded-2xl bg-card/95 border border-border/80 shadow-2xl backdrop-blur-2xl z-50 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold">
                  {isTr ? "Mobil Uygulamalar" : "Mobile Applications"}
                </div>

                {/* Crosshair App Item */}
                <Link
                  to="/crosshair"
                  onClick={() => setAppsDropdownOpen(false)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors group ${
                    isCrosshairApp ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary/80"
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-secondary border border-border/80 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
                    <img
                      src="/assets/images/playstore/icons/crosshair_playstore_512.png"
                      alt="Crosshair Icon"
                      className="w-7 h-7 object-contain rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        Crosshair
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-primary/20 text-primary">
                        Active
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">
                      Valorant & FPS Aim Overlay
                    </p>
                  </div>
                </Link>

                <div className="my-1 border-t border-border/40" />

                {/* All Apps Portal Item */}
                <Link
                  to="/"
                  onClick={() => setAppsDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-primary" />
                  <span>{t("common.allApps")}</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Contextual Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-muted/30 p-1 rounded-2xl border border-border/40 text-xs">
          {activeNavLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={link.onClick}
              className={`whitespace-nowrap flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                link.active
                  ? "bg-background text-primary shadow-sm font-bold border border-border/40"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/40"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Actions: App CTA / Portal CTA, Language Toggle, Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-2.5">
          {/* CTA: If on Crosshair, show Google Play download. If on Portal, show Crosshair Showcase link */}
          {isCrosshairApp ? (
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex h-9 px-4 text-black font-extrabold rounded-xl text-xs gap-1.5 shadow-md transition-all hover:scale-105"
              style={{
                backgroundColor: activeColorOption.hex,
              }}
            >
              <a
                href="https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t("common.getOnGooglePlay")}</span>
              </a>
            </Button>
          ) : (
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex h-9 px-4 text-xs font-bold rounded-xl gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            >
              <Link to="/crosshair">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Crosshair App</span>
              </Link>
            </Button>
          )}

          {/* Language Switcher */}
          <LanguageToggle />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-card border border-border/80 text-muted-foreground hover:text-foreground"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border/60 bg-card/95 backdrop-blur-2xl px-4 py-4 space-y-3 animate-fade-in">
          <div className="flex flex-col gap-1 text-xs">
            {/* Apps Hub Link */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            >
              <LayoutGrid className="w-4 h-4 text-primary" />
              <span>{t("common.allApps")}</span>
            </Link>

            <div className="my-1 border-t border-border/40" />

            {/* Contextual Mobile Links */}
            {activeNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => {
                  if (link.onClick) link.onClick(e);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                  link.active
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            {isCrosshairApp && (
              <div className="pt-2">
                <Button
                  asChild
                  className="w-full text-black font-extrabold rounded-xl text-xs h-10 gap-2 shadow-md"
                  style={{ backgroundColor: activeColorOption.hex }}
                >
                  <a
                    href="https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t("common.getOnGooglePlay")}</span>
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
