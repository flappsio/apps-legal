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
    ? "Crossio Nasıl Kullanılır? – Android Katman ve İzin Rehberi"
    : "How to Use Crossio on Android – Overlay & Permission Guide";

  const description = isTr
    ? "Android cihazlarda Crossio kurulumu ve kullanımı: açıklamayı okuma, katman iznini verme, nişangahı özelleştirme, başlatma ve durdurma adımları."
    : "Step-by-step Crossio setup on Android: read the disclosure, grant overlay permission, customize, start, and stop the layer.";

  const steps = [
    {
      number: "01",
      title: isTr ? "Uygulamayı İndirin ve Başlatın" : "Download & Open the App",
      desc: isTr
        ? "Google Play Store üzerinden Crossio uygulamasını indirin ve açın."
        : "Download Crossio from Google Play Store and launch the app.",
      icon: <Download className="w-5 h-5 text-primary" />,
      image: `/assets/images/playstore/${langPath}/4.png`,
      badge: "GOOGLE PLAY",
      actionText: isTr ? "Google Play'den İndir" : "Download from Play Store",
      actionUrl: "https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair",
    },
    {
      number: "02",
      title: isTr ? "Ekran Üstü Katman (Overlay) İznini Verin" : "Enable 'Display Over Other Apps' Permission",
      desc: isTr
        ? "Katmanı ilk kez başlatırken gösterilen açıklamayı okuyun. Devam etmeyi seçerseniz Android ayarlarında Crossio için 'Diğer uygulamaların üzerinde göster' (SYSTEM_ALERT_WINDOW) iznini açın."
        : "When you first start the layer, read the disclosure. If you choose to continue, open Android Settings and enable 'Display over other apps' for Crossio.",
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      image: `/assets/images/playstore/${langPath}/4.png`,
      badge: "SYSTEM_ALERT_WINDOW",
      tip: isTr
        ? "Bu izin pasif görsel katmanı göstermek içindir. Ana nişangah dokunma veya tuş girdisi alamaz; Crossio diğer uygulamaların koduna, belleğine, dosyalarına, verilerine veya ağ trafiğine erişmez ve otomasyon sağlamaz."
        : "This permission displays the passive visual layer. The main crosshair cannot receive touch or key input; Crossio does not access another app's code, memory, files, data, or network traffic and provides no automation.",
    },
    {
      number: "03",
      title: isTr ? "Nişangahınızı Seçin veya Özelleştirin" : "Select or Customize Your Crosshair",
      desc: isTr
        ? "Hazır tasarımlar (Nokta, Klasik Artı, T-Cross vb.) arasından seçim yapın veya editörle çizgi kalınlığı, boyut, merkez boşluğu ve rengi ayarlayın."
        : "Choose a built-in design (Dot, Classic Cross, T-Cross, etc.) or use the editor to adjust line thickness, size, center gap, and color.",
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
      image: `/assets/images/playstore/${langPath}/4.png`,
      badge: "PNG IMPORT",
    },
    {
      number: "05",
      title: isTr ? "Katmanı Başlatın ve Yönetin" : "Start and Manage the Layer",
      desc: isTr
        ? "Katmanı uygulamadaki güç düğmesiyle açıkça başlatın. İsteğe bağlı yüzen kontrolle görünürlüğü ve konumu yönetebilir, servisi kalıcı bildirimdeki Durdur eylemiyle kapatabilirsiniz."
        : "Start the layer explicitly with the in-app power button. Use the optional floating control to manage visibility and position, and stop the service from the persistent notification.",
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
                  "Root gerektirmez; Android 7.0 veya üzerini hedefler ve davranış üreticiye göre değişebilir.",
                  "Overlay izni yalnızca ekrana çizim yapmak içindir, kişisel veriye erişmez.",
                  "İsteğe bağlı dokunulabilir mini kontrol görünürlük ve konumu yönetir.",
                ]
              : [
                  "No root required; targets Android 7.0 or later, with behavior varying by manufacturer.",
                  "Overlay permission is strictly for visual drawing, zero personal data accessed.",
                  "The optional touchable mini control manages visibility and position.",
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
              ? "Bazı telefon üreticileri pil tasarrufu için arka plandaki katman servisini durdurabilir. Katman beklenmedik biçimde kapanıyorsa yalnızca ihtiyaç hâlinde Cihaz Ayarları > Uygulamalar > Crossio > Pil bölümünden üreticinizin sunduğu uygun seçeneği kullanın. Pil optimizasyonu muafiyeti ve üreticiye özgü otomatik başlatma ayarı isteğe bağlıdır."
              : "Some manufacturers may stop the background layer service to save battery. If the layer closes unexpectedly, use the appropriate option under Device Settings > Apps > Crossio > Battery only when needed. Battery-optimization exemption and manufacturer-specific autostart settings are optional."}
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
            {isTr ? "Nişangahınızı Özelleştirmeye Başlayın" : "Ready to Customize Your Crosshair?"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            {isTr
              ? "Hazır tasarımları keşfedin, kendi görselinizi ekleyin ve görünümü tercihlerinize göre düzenleyin."
              : "Explore built-in designs, add your own image, and adjust the appearance to your preferences."}
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
