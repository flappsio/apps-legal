import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, ShieldCheck, ExternalLink } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const { theme, isMinimal } = useTheme();
  const { isTr } = useLanguage();
  const currentYear = new Date().getFullYear();

  const logoSrc =
    theme === "light"
      ? "/assets/images/flappsio_black.png"
      : "/assets/images/flappsio_white.png";

  if (isMinimal) {
    return (
      <footer className="py-6 border-t border-border/40 text-center text-xs text-muted-foreground">
        <p>© {currentYear} flappsio. {isTr ? "Tüm hakları saklıdır." : "All rights reserved."}</p>
      </footer>
    );
  }

  return (
    <footer className="border-t border-border/60 bg-card/40 backdrop-blur-sm mt-20 transition-colors">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3.5">
            <Link
              to="/"
              className="h-10 sm:h-12 max-h-12 overflow-hidden inline-flex items-center justify-start transition-opacity hover:opacity-85 group"
              aria-label={isTr ? "flappsio Ana Sayfa" : "flappsio Homepage"}
            >
              <img
                src={logoSrc}
                alt="flappsio logo"
                className="h-28 sm:h-32 w-auto max-w-[125px] sm:max-w-[145px] object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isTr
                ? "flappsio, Android mobil oyuncuları için hafif, güvenli ve profesyonel yardımcı araçlar geliştirir."
                : "flappsio creates lightweight, secure, and professional utility applications for Android mobile gamers."}
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Android Exclusivity • Google Play</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              {isTr ? "Uygulama" : "Product"}
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link to="/crosshair" className="hover:text-primary transition-colors">
                  {isTr ? "Ana Tanıtım & Simülatör" : "Crosshair Overview"}
                </Link>
              </li>
              <li>
                <Link to="/crosshair/how-to-use" className="hover:text-primary transition-colors">
                  {isTr ? "Nasıl Kullanılır?" : "How It Works"}
                </Link>
              </li>
              <li>
                <Link to="/crosshair/faq" className="hover:text-primary transition-colors">
                  {isTr ? "Sıkça Sorulan Sorular" : "FAQ"}
                </Link>
              </li>
              <li>
                <Link to="/crosshair/guides" className="hover:text-primary transition-colors">
                  {isTr ? "Tüm Rehberler" : "Aim Guides"}
                </Link>
              </li>
              <li>
                <Link to="/crosshair/about" className="hover:text-primary transition-colors">
                  {isTr ? "Hakkında" : "About Crosshair"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              {isTr ? "Yasal & Şartlar" : "Legal & Compliance"}
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link to="/crosshair/privacy-policy" className="hover:text-primary transition-colors">
                  {isTr ? "Gizlilik Politikası" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link to="/crosshair/terms-of-use" className="hover:text-primary transition-colors">
                  {isTr ? "Kullanım Koşulları" : "Terms of Service"}
                </Link>
              </li>
              <li>
                <Link to="/license" className="hover:text-primary transition-colors">
                  {isTr ? "Açık Kaynak Lisansları" : "Open Source Licenses"}
                </Link>
              </li>
              <li>
                <Link to="/crosshair/support" className="hover:text-primary transition-colors">
                  {isTr ? "Destek & İletişim" : "Support & Contact"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Google Play & Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              {isTr ? "Mağaza & İletişim" : "Store & Contact"}
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold"
                >
                  <span>Google Play Store</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  {isTr ? "flappsio Uygulama Portalı" : "flappsio Apps Portal"}
                </Link>
              </li>
              <li className="pt-1">
                <a
                  href="mailto:info@flappsio.com"
                  className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  info@flappsio.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {currentYear} <strong>flappsio</strong>. {isTr ? "Tüm hakları saklıdır." : "All rights reserved."}
          </p>
          <p className="text-center sm:text-right text-[11px] max-w-md">
            Android and Google Play are trademarks of Google LLC. Crosshair is an independent Android mobile application.
          </p>
        </div>
      </div>
    </footer>
  );
};
