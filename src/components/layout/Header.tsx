import { Header as SiteHeader, type HeaderLink } from "@/components/ui/header-3";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Crosshair, Sliders, BookOpen, HelpCircle, Sparkles, ShieldCheck, FileText, Info, LifeBuoy } from "lucide-react";

export function Header() {
  const { theme, isMinimal } = useTheme();
  const { t, isTr } = useLanguage();
  if (isMinimal) return null;
  const productLinks: HeaderLink[] = [
    { title: isTr ? "Crossio’yu keşfet" : "Discover Crossio", description: isTr ? "Android için kişisel nişangahın." : "Your personal crosshair for Android.", href: "/crossio", icon: Crosshair },
    { title: isTr ? "Nişangah editörü" : "Crosshair editor", description: isTr ? "Tasarla, özelleştir ve PNG olarak kaydet." : "Design, customize, and export as PNG.", href: "/crossio/editor", icon: Sliders },
    { title: t("common.gallery"), description: isTr ? "Nişangah tasarımlarını keşfet." : "Browse the crosshair collection.", href: "/crossio#gallery-section", icon: Sparkles },
    { title: t("common.howItWorks"), description: isTr ? "İlk nişangahını adım adım ayarla." : "Set up your first crosshair, step by step.", href: "/crossio/how-to-use", icon: BookOpen },
  ];
  const resourceLinks: HeaderLink[] = [
    { title: t("common.guides"), description: isTr ? "İpuçları ve kullanım rehberleri." : "Tips and practical walkthroughs.", href: "/crossio/guides", icon: BookOpen },
    { title: t("common.faq"), description: isTr ? "Merak ettiklerine hızlı yanıtlar." : "Quick answers to common questions.", href: "/crossio/faq", icon: HelpCircle },
    { title: isTr ? "Destek" : "Support", description: isTr ? "Yardıma mı ihtiyacın var? Bize ulaş." : "Need a hand? Get in touch.", href: "/crossio/support", icon: LifeBuoy },
  ];
  const legalLinks: HeaderLink[] = [
    { title: isTr ? "Crossio hakkında" : "About Crossio", href: "/crossio/about", icon: Info },
    { title: t("common.privacy"), href: "/crossio/privacy-policy", icon: ShieldCheck },
    { title: t("common.terms"), href: "/crossio/terms-of-use", icon: FileText },
    { title: t("common.licenses"), href: "/license", icon: BookOpen },
  ];
  return <SiteHeader logoSrc={theme === "light" ? "/assets/images/flappsio_black.png" : "/assets/images/flappsio_white.png"} homeLabel={t("common.brandHome")} productLinks={productLinks} resourceLinks={resourceLinks} legalLinks={legalLinks} isTr={isTr} />;
}
