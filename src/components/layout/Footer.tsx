import { useTheme } from "@/context/ThemeContext";
import { Mail, ShieldCheck } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const { theme, isMinimal } = useTheme();
  const currentYear = new Date().getFullYear();

  const logoSrc =
    theme === "light"
      ? "/assets/images/fIappsio_black.png"
      : "/assets/images/fIappsio_white.png";

  if (isMinimal) {
    return (
      <footer className="py-6 border-t border-border/40 text-center text-xs text-muted-foreground">
        <p>© {currentYear} flappsio. Tüm hakları saklıdır.</p>
      </footer>
    );
  }

  return (
    <footer className="border-t border-border/60 bg-card/40 backdrop-blur-sm mt-20 transition-colors">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={logoSrc}
                alt="flappsio"
                className="w-auto max-w-[150px] object-contain h-40"
              />
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Mobil uygulamalarımızın yasal politikalarını, gizlilik ilkelerini ve kullanıcı koşullarını şeffaf bir biçimde sunan resmi bilgi merkezidir.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>KVKK & GDPR Standartlarına Uyumlu</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-foreground">Yasal Belgeler</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/crosshair/privacy-policy"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  Crosshair Valo Gizlilik
                </Link>
              </li>
              <li>
                <Link
                  to="/crosshair/terms-of-use"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  Crosshair Valo Koşullar
                </Link>
              </li>
              <li>
                <Link
                  to="/license"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  MIT Lisansı
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  Tüm Uygulamalar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Help */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-foreground">İletişim & Destek</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Hukuki sorularınız, veri silme talepleri veya bildirimleriniz için:
            </p>
            <a
              href="mailto:info@flappsio.com"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <Mail className="w-4 h-4" />
              info@flappsio.com
            </a>
          </div>
        </div>

        {/* Disclaimer & Bottom bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {currentYear} <strong>flappsio</strong>. Tüm hakları saklıdır.
          </p>
          <p className="text-center sm:text-right text-[11px] max-w-md">
            VALORANT ve Riot Games, Riot Games, Inc.'nin tescilli ticari markalarıdır. Crosshair Valo bağımsız bir yardımcı araçtır.
          </p>
        </div>
      </div>
    </footer>
  );
};
