import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/context/ThemeContext";
import { FileText, ShieldCheck, Smartphone } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Header: React.FC = () => {
  const { theme, isMinimal } = useTheme();
  const location = useLocation();

  if (isMinimal) return null;

  const isCrosshairPolicy = location.pathname.includes("/crosshair/privacy-policy");
  const isCrosshairTerms = location.pathname.includes("/crosshair/terms-of-use");

  const logoSrc =
    theme === "light"
      ? "/assets/images/fIappsio_black.png"
      : "/assets/images/fIappsio_white.png";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-colors duration-200">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 overflow-hidden">
        {/* Brand logo & title */}
        <Link
          to="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90 group"
        >
          <img
            src={logoSrc}
            alt="flappsio"
            className="h-40 w-auto max-w-[140px] sm:max-w-[170px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
          <div className="hidden sm:flex flex-col border-l border-border/60 pl-3">
            <div className="flex items-center gap-1.5">
              <Badge variant="brand" className="text-[10px] px-1.5 py-0 h-4 font-semibold">
                Legal Hub
              </Badge>
            </div>
            <span className="text-[11px] text-muted-foreground leading-tight">
              Yasal & Gizlilik Portalı
            </span>
          </div>
        </Link>

        {/* Navigation links & actions */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-1 bg-muted/40 p-1 rounded-xl border border-border/40 text-xs">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${location.pathname === "/"
                ? "bg-background text-foreground shadow-sm font-semibold text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Uygulamalar
            </Link>

            <Link
              to="/crosshair/privacy-policy"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${isCrosshairPolicy
                ? "bg-background text-foreground shadow-sm font-semibold text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Gizlilik Politikası
            </Link>

            <Link
              to="/crosshair/terms-of-use"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${isCrosshairTerms
                ? "bg-background text-foreground shadow-sm font-semibold text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Kullanım Koşulları
            </Link>

            <Link
              to="/license"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${location.pathname === "/license"
                ? "bg-background text-foreground shadow-sm font-semibold text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Lisans
            </Link>
          </div>

          {/* Theme toggle button */}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
