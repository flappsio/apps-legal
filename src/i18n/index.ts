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
        eyebrow: "CROSSIO: CUSTOM CROSSHAIR",
        titleLine1: "Tasarımınız. Görünümünüz.",
        titleLine2: "Kişisel Android Katmanınız.",
        subtitle: "Crossio, seçtiğiniz nişangahı Android ekranında pasif ve özelleştirilebilir bir görsel katman olarak gösterir.",
        tryDemo: "Canlı Önizlemeyi Dene",
        badge1: "Android için tasarlandı",
        badge2: "Pasif • Tıklamaları geçiren katman",
      },
      setup: {
        badge: "Hızlı Başlangıç",
        title: "Tasarımdan ekrana üç adımda.",
        subtitle: "Karmaşık ayarlar ve root gerektirmeden yalnızca 3 basit adımda kullanmaya başlayın.",
        step1Title: "Nişangahınızı Seçin",
        step1Desc: "Hazır tasarımlardan birini seçin veya galerinizden kendi şeffaf PNG görselinizi ekleyin.",
        step2Title: "Piksel Hassasiyetinde Özelleştirin",
        step2Desc: "Renk, boyut, kalınlık, şeffaflık ve merkez boşluğunu tercihlerinize göre ayarlayın.",
        step3Title: "Katmanı açıkça başlatın",
        step3Desc: "Sistem açıklamasını okuyup izin verdikten sonra katmanı uygulamadaki güç düğmesiyle başlatın ve bildirimden durdurun.",
      },
      store: {
        badge: "Resmi Google Play Vitrini",
        title: "Gerçek Uygulama Ekranları.",
        subtitle: "Google Play Store'da yer alan orijinal uygulama arayüzünü ve ekran görüntülerini inceleyin.",
        appName: "Crossio: Custom Crosshair",
        appCategory: "Araçlar & Kişiselleştirme",
        appDesc: "Android için özelleştirilebilir pasif görsel katman.",
        verified: "Doğrulandı",
        reviews: "Yorum",
        downloads: "İndirme",
        contentRating: "Herkes",
        openStore: "Mağaza Sayfasını Aç",
        screenshotsTitle: "Ekran Görüntüleri",
        instantHudTitle: "Seçin, özelleştirin ve başlatın.",
        instantHudDesc: "Crossio yalnızca siz başlattığınızda pasif görsel katmanı gösterir; katmanı kalıcı bildirimden durdurabilirsiniz.",
      },
      howToUse: {
        badge: "Kurulum ve Kullanım Rehberi",
        title: "Crosshair Nasıl Kurulur ve Kullanılır?",
        subtitle: "Nişangahınızı seçin, görünümünü özelleştirin ve Android katman iznini bilinçli şekilde yönetin.",
        quickAnswerQ: "Crosshair kurulumu için hangi adımlar gerekir?",
        quickAnswerSummary: "Crosshair kurulumu; Google Play'den indirme, Android 'Diğer uygulamaların üzerinde göster' (Overlay) iznini verme, nişangah modelini seçme ve ekranda başlatma olmak üzere 4 temel adımdan oluşur. Root veya teknik bilgi gerektirmez.",
        step1Title: "1. Adım: Google Play'den İndirin",
        step1Desc: "Crosshair'ı resmi Google Play Store sayfasından ücretsiz olarak telefonunuza yükleyin.",
        step2Title: "2. Adım: Ekran Üstü Katman (Overlay) İznini Verin",
        step2Desc: "Katmanı ilk kez başlatırken açıklamayı okuyun; devam etmeyi seçerseniz Android'in 'Diğer uygulamaların üzerinde görüntüleme' (SYSTEM_ALERT_WINDOW) ayarından izin verin.",
        step3Title: "3. Adım: Nişangahınızı Seçin veya Özelleştirin",
        step3Desc: "Hazır nişangahlardan birini seçin ya da renk, boyut, kalınlık ve boşluk ayarlarını yapın.",
        step4Title: "4. Adım: Katmanı Başlatın ve Yönetin",
        step4Desc: "Katmanı uygulamadaki güç düğmesiyle açıkça başlatın. Görsel katman dokunma veya tuş girdisi almaz; istediğiniz zaman kalıcı bildirimden durdurabilirsiniz.",
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
        eyebrow: "CROSSIO: CUSTOM CROSSHAIR",
        titleLine1: "Your design. Your display.",
        titleLine2: "A personal Android overlay.",
        subtitle: "Crossio displays the crosshair you choose as a passive, customizable visual layer on your Android screen.",
        tryDemo: "Try Live Preview",
        badge1: "Designed for Android",
        badge2: "Passive • Click-through overlay",
      },
      setup: {
        badge: "Quick Workflow",
        title: "From design to display in three steps.",
        subtitle: "Zero root, zero technical hassle. Three simple steps to elevate your crosshair.",
        step1Title: "Choose your crosshair",
        step1Desc: "Choose a built-in design or add your own transparent PNG image from your gallery.",
        step2Title: "Customize with pixel precision",
        step2Desc: "Adjust color, size, line thickness, opacity, and center gap to match your visual preferences.",
        step3Title: "Start the overlay explicitly",
        step3Desc: "Read the system disclosure, grant permission if you choose, then start the overlay with the in-app power button and stop it from the notification.",
      },
      store: {
        badge: "Official Google Play Showcase",
        title: "Real in-app experience.",
        subtitle: "Explore the authentic Android app interface and official Google Play Store screenshots.",
        appName: "Crossio: Custom Crosshair",
        appCategory: "Tools & Personalization",
        appDesc: "A customizable passive visual overlay for Android.",
        verified: "Verified",
        reviews: "Reviews",
        downloads: "Downloads",
        contentRating: "Rated 3+",
        openStore: "Open Store Page",
        screenshotsTitle: "Screenshots",
        instantHudTitle: "Choose, customize, and start.",
        instantHudDesc: "Crossio shows its passive visual layer only after you start it, and you can stop it from the persistent notification.",
      },
      howToUse: {
        badge: "Setup & User Guide",
        title: "How to Use Crosshair on Android?",
        subtitle: "Choose a crosshair, customize its appearance, and manage Android overlay permission transparently.",
        quickAnswerQ: "What are the essential steps to setup Crosshair?",
        quickAnswerSummary: "Setting up Crosshair consists of 4 simple steps: downloading from Google Play, granting Android 'Display over other apps' (Overlay) permission, choosing/customizing a reticle, and tapping Start. No root or complex setup required.",
        step1Title: "Step 1: Download from Google Play",
        step1Desc: "Download Crosshair for free on your Android device from the official Google Play Store.",
        step2Title: "Step 2: Grant Android Overlay Permission",
        step2Desc: "When you first start the overlay, read the disclosure and, if you choose to continue, grant Android's 'Display over other apps' (SYSTEM_ALERT_WINDOW) permission in system settings.",
        step3Title: "Step 3: Choose or Customize Your Reticle",
        step3Desc: "Select a built-in design or fine-tune color, size, thickness, and gap with real-time feedback.",
        step4Title: "Step 4: Start and Manage the Overlay",
        step4Desc: "Start the layer explicitly with the in-app power button. The visual layer cannot receive touch or key input, and you can stop it from the persistent notification.",
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
