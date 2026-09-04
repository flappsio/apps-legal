import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const initialLang = (() => {
  try {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    const savedLang = localStorage.getItem("flappsio_lang");
    const browserLang = navigator.language?.toLowerCase();
    if (urlLang === "tr" || urlLang === "en") return urlLang;
    if (savedLang === "tr" || savedLang === "en") return savedLang;
    return browserLang && !browserLang.startsWith("tr") ? "en" : "tr";
  } catch {
    return "tr";
  }
})();

export const resources = {
  tr: {
    translation: {
      common: {
        apps: "Uygulamalar",
        allApps: "Tüm Uygulamalar Portalı",
        features: "Özellikler",
        gallery: "Galeri",
        howItWorks: "Nasıl Çalışır?",
        faq: "SSS",
        guides: "Rehberler",
        about: "Hakkımızda",
        legal: "Yasal Belgeler & Şartlar",
        privacy: "Gizlilik Politikası",
        terms: "Kullanım Koşulları",
        licenses: "Açık Kaynak Lisansları",
        support: "İletişim & Destek",
        getOnGooglePlay: "Google Play'den İndir",
        installOnGooglePlay: "Google Play'den Yükle",
        share: "Paylaş",
        copied: "Kopyalandı",
        verifiedDeveloper: "flappsio Doğrulanmış Geliştirici",
        legalHub: "Yasal & Gizlilik Portalı",
        allRightsReserved: "Tüm hakları saklıdır.",
        disclaimer: "Android and Google Play are trademarks of Google LLC. Crosshair is an independent Android mobile application.",
      },
      hero: {
        eyebrow: "CUSTOM CROSSHAIR FOR ANDROID",
        titleLine1: "Nişanınız. Nişangahınız.",
        titleLine2: "Özel Android Katmanı.",
        subtitle: "Crosshair, mobil oyuncuların desteklenen oyunların üzerinde özelleştirilebilir bir nişangah katmanı yerleştirmesini sağlayan bir Android uygulamasıdır.",
        tryDemo: "Canlı Önizlemeyi Dene",
        badge1: "Android Oyunları İçin Özel Tasarlandı",
        badge2: "SYSTEM_ALERT_WINDOW • %100 Ban Korumalı",
      },
      setup: {
        badge: "Hızlı Başlangıç",
        title: "İndirmeden Oyuna Saniyeler İçinde.",
        subtitle: "Karmaşık ayarlar ve root gerektirmeden yalnızca 3 basit adımda kullanmaya başlayın.",
        step1Title: "Nişangahınızı Seçin",
        step1Desc: "Kütüphaneden 50'den fazla hazır esporcu modelinden birini seçin veya galerinizden kendi şeffaf PNG görselinizi yükleyin.",
        step2Title: "Piksel Hassasiyetinde Özelleştirin",
        step2Desc: "Renk, boyut, kalınlık, şeffaflık ve merkez boşluğunu kendi nişan reflekslerinize göre milimetrik olarak ayarlayın.",
        step3Title: "Oyununuza Başlayın & Yüzen HUD ile Yönetin",
        step3Desc: "Oyununuzu açın; nişangahınız ekran merkezinde sabit kalsın. Yüzen menü butonuyla oyunu alta almadan anında kontrol edin.",
      },
      store: {
        badge: "Resmi Google Play Vitrini",
        title: "Gerçek Uygulama Ekranları.",
        subtitle: "Google Play Store'da yer alan orijinal uygulama arayüzünü ve ekran görüntülerini inceleyin.",
        appName: "Crosshair: Valorant & FPS Aim",
        appCategory: "Araçlar & Mobil FPS Yardımcısı",
        appDesc: "Android için özelleştirilebilir profesyonel nişangah katmanı.",
        verified: "Doğrulandı",
        reviews: "Yorum",
        downloads: "İndirme",
        contentRating: "Herkes",
        openStore: "Mağaza Sayfasını Aç",
        screenshotsTitle: "Ekran Görüntüleri",
        instantHudTitle: "Sıfır Kurulum Zahmeti. Anında Aktif.",
        instantHudDesc: "Google Play'den indirin, 1 tıkla katman iznini verin ve oyununuza başlayın.",
      },
      howToUse: {
        badge: "Kurulum ve Kullanım Rehberi",
        title: "Crosshair Nasıl Kurulur ve Kullanılır?",
        subtitle: "Sadece 2 dakikada kurulumu tamamlayın ve oyun içi isabet oranınızı artırın.",
        quickAnswerQ: "Crosshair kurulumu için hangi adımlar gerekir?",
        quickAnswerSummary: "Crosshair kurulumu; Google Play'den indirme, Android 'Diğer uygulamaların üzerinde göster' (Overlay) iznini verme, nişangah modelini seçme ve ekranda başlatma olmak üzere 4 temel adımdan oluşur. Root veya teknik bilgi gerektirmez.",
        step1Title: "1. Adım: Google Play'den İndirin",
        step1Desc: "Crosshair'ı resmi Google Play Store sayfasından ücretsiz olarak telefonunuza yükleyin.",
        step2Title: "2. Adım: Ekran Üstü Katman (Overlay) İznini Verin",
        step2Desc: "Uygulama ilk açıldığında Android'in 'Diğer uygulamaların üzerinde görüntüleme' (SYSTEM_ALERT_WINDOW) iznini isteyecektir. Bu izni onaylayın.",
        step3Title: "3. Adım: Nişangahınızı Seçin veya Özelleştirin",
        step3Desc: "Uygulama ana ekranından 50'den fazla hazır espor nişangahından birini seçin ya da renk, boyut, kalınlık ve boşluk ayarlarını yapın.",
        step4Title: "4. Adım: Oyunu Başlatın ve Nişan Alın",
        step4Desc: "Nişangahı başlattıktan sonra favori mobil oyununuzu açın. Yüzen menü simgesine dokunarak oyundan çıkmadan ayarları değiştirebilirsiniz.",
      },
    },
  },
  en: {
    translation: {
      common: {
        apps: "Apps",
        allApps: "All Apps & Legal Portal",
        features: "Features",
        gallery: "Gallery",
        howItWorks: "How It Works",
        faq: "FAQ",
        guides: "Guides",
        about: "About Us",
        legal: "Legal & Compliance",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        licenses: "Open Source Licenses",
        support: "Support & Contact",
        getOnGooglePlay: "Get on Google Play",
        installOnGooglePlay: "Install on Google Play",
        share: "Share",
        copied: "Copied",
        verifiedDeveloper: "flappsio Verified Developer",
        legalHub: "Legal & Privacy Portal",
        allRightsReserved: "All rights reserved.",
        disclaimer: "Android and Google Play are trademarks of Google LLC. Crosshair is an independent Android mobile application.",
      },
      hero: {
        eyebrow: "CUSTOM CROSSHAIR FOR ANDROID",
        titleLine1: "Your aim. Your crosshair.",
        titleLine2: "Custom Android Overlay.",
        subtitle: "Crosshair is an Android app that lets mobile gamers place and customize a crosshair overlay on top of supported games.",
        tryDemo: "Try Live Preview",
        badge1: "Designed Exclusively for Android Mobile Gaming",
        badge2: "SYSTEM_ALERT_WINDOW • 100% Ban-Free",
      },
      setup: {
        badge: "Quick Workflow",
        title: "From download to gameplay in seconds.",
        subtitle: "Zero root, zero technical hassle. Three simple steps to elevate your crosshair.",
        step1Title: "Choose your crosshair",
        step1Desc: "Select from over 50+ tournament-ready esports presets or import your own custom transparent PNG image from your gallery.",
        step2Title: "Customize with pixel precision",
        step2Desc: "Adjust color, size, line thickness, opacity, and center gap with millimeter accuracy to match your reflexes.",
        step3Title: "Start your game & control with floating HUD",
        step3Desc: "Launch your mobile FPS game. Your reticle stays centered on screen. Control it instantly without leaving the match via the floating bubble.",
      },
      store: {
        badge: "Official Google Play Showcase",
        title: "Real in-app experience.",
        subtitle: "Explore the authentic Android app interface and official Google Play Store screenshots.",
        appName: "Crosshair: Valorant & FPS Aim",
        appCategory: "Tools & Action Gaming Utility",
        appDesc: "Custom on-screen crosshair reticle overlay for Android.",
        verified: "Verified",
        reviews: "Reviews",
        downloads: "Downloads",
        contentRating: "Rated 3+",
        openStore: "Open Store Page",
        screenshotsTitle: "Screenshots",
        instantHudTitle: "Zero Complex Setup. Instant In-Game HUD.",
        instantHudDesc: "Download directly from Google Play, grant overlay permission in 1 tap, and dominate your matches.",
      },
      howToUse: {
        badge: "Setup & User Guide",
        title: "How to Use Crosshair on Android?",
        subtitle: "Get setup in under 2 minutes and take your aim to the next level.",
        quickAnswerQ: "What are the essential steps to setup Crosshair?",
        quickAnswerSummary: "Setting up Crosshair consists of 4 simple steps: downloading from Google Play, granting Android 'Display over other apps' (Overlay) permission, choosing/customizing a reticle, and tapping Start. No root or complex setup required.",
        step1Title: "Step 1: Download from Google Play",
        step1Desc: "Download Crosshair for free on your Android device from the official Google Play Store.",
        step2Title: "Step 2: Grant Android Overlay Permission",
        step2Desc: "On first launch, approve the standard Android 'Display over other apps' (SYSTEM_ALERT_WINDOW) system permission.",
        step3Title: "Step 3: Choose or Customize Your Reticle",
        step3Desc: "Select from 50+ pro presets or fine-tune color, size, thickness, and gap with real-time feedback.",
        step4Title: "Step 4: Launch Your Game & Aim",
        step4Desc: "Open your favorite mobile shooter. Use the floating HUD bubble to toggle or reposition without leaving the match.",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: "tr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
