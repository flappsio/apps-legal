import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { QuickAnswerBlock } from "@/components/crosshair/QuickAnswerBlock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  ShieldCheck,
  Sliders,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

export const CrosshairHowToUsePage: React.FC = () => {
  const { t, isTr, language } = useLanguage();
  const langPath = language === "en" ? "en" : "tr";

  const title = isTr
    ? "Crosshair Nasıl Kullanılır? – Android Kurulum ve Overlay Rehberi"
    : "How to Use Crosshair on Android – Step-by-Step Setup Guide";

  const description = isTr
    ? "Android cihazlarda Crosshair kurulumu ve kullanımı rehberi. Overlay izni verme, nişangah özelleştirme ve oyun içi yüzen kontrol adımları."
    : "Step-by-step installation and setup guide for Crosshair on Android. Enabling overlay permission, designing custom reticles, and in-game controls.";

  const steps = [
    {
      number: "01",
      title: isTr ? "Uygulamayı İndirin ve Başlatın" : "Download & Open the App",
      desc: isTr
        ? "Google Play Store üzerinden Crosshair uygulamasını ücretsiz indirin ve açın. Sıfır karmaşık ayar gerektirir."
        : "Download Crosshair for free from Google Play Store and launch the app.",
      icon: <Download className="w-5 h-5 text-primary" />,
      image: `/assets/images/playstore/${langPath}/1.png`,
      badge: "GOOGLE PLAY",
      actionText: isTr ? "Google Play'den İndir" : "Download from Play Store",
      actionUrl: "https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair",
    },
    {
      number: "02",
      title: isTr ? "Ekran Üstü Katman (Overlay) İznini Verin" : "Enable 'Display Over Other Apps' Permission",
      desc: isTr
        ? "Uygulama açıldığında Android'in 'Diğer uygulamaların üzerinde göster' (SYSTEM_ALERT_WINDOW) iznini onaylayın. Bu izin, nişangahın oyunların üzerinde çizilmesini sağlar."
        : "Tap the permission prompt upon launch. In Android Settings, find Crosshair and toggle 'Display over other apps' to ON.",
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      image: `/assets/images/playstore/${langPath}/5.png`,
      badge: "SYSTEM_ALERT_WINDOW",
      tip: isTr
        ? "Bu izin yalnızca ekrana şeffaf katman çizmek içindir. Oyun belleğine, dosyalarına veya kişisel verilerinize kesinlikle erişmez (%100 Güvenli)."
        : "This permission is required to draw the visual crosshair HUD above your games. It accesses zero personal data or game files.",
    },
    {
      number: "03",
      title: isTr ? "Nişangahınızı Seçin veya Özelleştirin" : "Select or Customize Your Crosshair",
      desc: isTr
        ? "50'den fazla hazır esporcu profili (Nokta, Klasik Artı, T-Cross vb.) arasından seçim yapın veya Piksel Editörü ile çizgi kalınlığı, boyut, merkez boşluğu ve rengini kendinize göre ayarlayın."
        : "Pick from pro esports presets (Dot, Classic Cross, T-Cross, etc.) or head to the Editor tab to fine-tune line thickness, size, center gap, and neon colors.",
      icon: <Sliders className="w-5 h-5 text-primary" />,
      image: `/assets/images/playstore/${langPath}/2.png`,
      badge: "PIXEL EDITOR",
    },
    {
      number: "04",
      title: isTr ? "Özel PNG İçe Aktarma (İsteğe Bağlı)" : "Import Custom PNG (Optional)",
      desc: isTr
        ? "Hazır modeller yerine kendi tasarımınızı kullanmak isterseniz, Android galerinizden arka planı şeffaf olan herhangi bir PNG nişangah görselini anında içe aktarabilirsiniz."
        : "Want your own design? Import any transparent PNG crosshair image from your Android gallery with full scaling and opacity controls.",
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      image: `/assets/images/playstore/${langPath}/3.png`,
      badge: "PNG IMPORT",
    },
    {
      number: "05",
      title: isTr ? "Oyuna Girin ve Yüzen Butonla Yönetin" : "Launch Your Game & Use Quick Floating Controls",
      desc: isTr
        ? "Favori oyununuzu (CODM, PUBG, Roblox vb.) açın. Ekranın kenarındaki yüzen baloncuk ile nişangahı istediğiniz an tek dokunuşla gizleyebilir veya rengini değiştirebilirsiniz."
        : "Launch your game. Use the floating HUD bubble on the side of your screen to toggle visibility or change color palettes on-the-fly.",
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      image: `/assets/images/playstore/${langPath}/4.png`,
      badge: "FLOATING HUD",
    },
  ];

  // HowTo JSON-LD schema
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": isTr ? "Crosshair Nasıl Kurulur ve Kullanılır?" : "How to Setup and Use Crosshair on Android",
    "description": description,
    "totalTime": "PT2M",
    "step": steps.map((s, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": s.title,
      "text": s.desc,
      "url": `https://flappsio.com/crosshair/how-to-use#step-${s.number}`,
    })),
  };

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title={title}
        description={description}
        canonicalPath="/crosshair/how-to-use"
        keywords={[
          "crosshair nasıl kullanılır",
          "crosshair overlay izni",
          "android nişangah açma",
          "crosshair kurulum rehberi",
          "how to use crosshair android",
          "enable crosshair overlay android",
        ]}
        breadcrumbs={[
          { name: isTr ? "Ana Sayfa" : "Home", url: "/" },
          { name: "Crosshair", url: "/crosshair" },
          { name: isTr ? "Nasıl Kullanılır" : "How to Use", url: "/crosshair/how-to-use" },
        ]}
        jsonLd={howToJsonLd}
      />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {t("howToUse.badge")}
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {t("howToUse.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("howToUse.subtitle")}
          </p>
        </div>

        {/* Quick Answer Box for AEO & AI Search */}
        <QuickAnswerBlock
          question={t("howToUse.quickAnswerQ")}
          summary={t("howToUse.quickAnswerSummary")}
          keyPoints={
            isTr
              ? [
                  "Root gerektirmez, tüm Android 7.0+ cihazlarda çalışır.",
                  "Overlay izni yalnızca ekrana çizim yapmak içindir, kişisel veriye erişmez.",
                  "Yüzen baloncuk ile oyunu kapatmadan açılıp kapatılabilir.",
                ]
              : [
                  "No root required; works on all Android 7.0+ phones.",
                  "Overlay permission is strictly for visual drawing, zero personal data accessed.",
                  "Floating HUD toggle allows instant control inside matches.",
                ]
          }
        />

        {/* Step-by-Step Cards with Authentic Play Store Screenshots */}
        <div className="space-y-8 my-12">
          {steps.map((s) => (
            <div
              key={s.number}
              id={`step-${s.number}`}
              className="p-6 sm:p-8 rounded-[32px] bg-card/70 border border-border/80 backdrop-blur-sm relative overflow-hidden hover:border-primary/40 transition-colors shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Content Column (7 cols) */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-primary/40">
                      {s.number}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-secondary text-primary border border-border/60">
                      {s.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">
                      {s.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  {s.tip && (
                    <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/20 text-xs text-foreground/90 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{s.tip}</span>
                    </div>
                  )}

                  {s.actionUrl && (
                    <div className="pt-2">
                      <Button
                        asChild
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs gap-1.5 shadow-sm"
                      >
                        <a href={s.actionUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-3.5 h-3.5" />
                          <span>{s.actionText}</span>
                        </a>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Screenshot Column (5 cols) */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-[240px] aspect-[9/16] rounded-2xl overflow-hidden bg-black/40 border-2 border-border/80 shadow-xl group">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* OEM Troubleshooting Notice */}
        <div className="p-6 sm:p-8 rounded-3xl bg-secondary/40 border border-border/80 backdrop-blur-sm space-y-4 my-8">
          <div className="flex items-center gap-2.5 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="text-sm sm:text-base font-bold text-foreground">
              {isTr
                ? "Xiaomi (MIUI/HyperOS), Huawei ve Samsung Cihazlar İçin Önemli İpucu"
                : "Important Tip for Xiaomi, Huawei & Samsung Devices"}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {isTr
              ? "Bazı telefon üreticileri (özellikle Xiaomi ve Huawei), pil tasarrufu için arka planda çalışan overlay uygulamalarını zorla kapatabilir. Nişangahınız oyun esnasında kayboluyorsa: Cihaz Ayarları > Uygulamalar > Crosshair > Pil Tasarrufu bölümünden 'Kısıtlama Yok' seçeneğini işaretleyin ve Otomatik Başlatma (Autostart) iznini verin."
              : "Some device manufacturers aggressively kill background overlay services to preserve battery. If your reticle disappears when opening a game: go to Phone Settings > Apps > Crosshair > Battery Optimization and set to 'No Restrictions', and enable Autostart."}
          </p>
          <div className="pt-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-xs rounded-xl border-border/80 gap-1.5"
            >
              <Link to="/crosshair/guides/sorun-giderme-overlay-izinleri">
                <span>{isTr ? "Detaylı Sorun Giderme Rehberini Oku" : "Read Troubleshooting Guide"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="text-center py-12 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {isTr ? "Nişangahınızı Hemen Özelleştirmeye Başlayın" : "Ready to Enhance Your Aim?"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            {isTr
              ? "Google Play'den ücretsiz indirin, profesyonel nişangah modelleriyle oyunlarda avantaj yakalayın."
              : "Download free on Google Play and gain a clean visual aiming reference in all supported titles."}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl text-xs sm:text-sm h-12 px-6 gap-2 shadow-lg"
            >
              <a
                href="https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4" />
                <span>{t("common.installOnGooglePlay")}</span>
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-2xl text-xs sm:text-sm h-12 px-6 border-border/80"
            >
              <Link to="/crosshair/faq">
                <span>{isTr ? "SSS Sayfasına Git" : "Visit FAQ Page"}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
