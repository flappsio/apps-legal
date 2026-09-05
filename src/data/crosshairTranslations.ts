export interface TestimonialItem {
  name: string;
  role: string;
  game: string;
  rating: number;
  source: string;
  comment: { tr: string; en: string };
  avatarInitial: string;
}

export interface FAQItem {
  id: string;
  category: "general" | "overlay" | "import" | "performance" | "compatibility";
  question: { tr: string; en: string };
  directAnswer: { tr: string; en: string };
  detailedAnswer: { tr: string; en: string };
}

export interface GuideArticle {
  slug: string;
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  readTime: string;
  publishedDate: string;
  category: string;
  summary: { tr: string; en: string };
  sections: {
    title: { tr: string; en: string };
    content: { tr: string; en: string };
    bullets?: { tr: string[]; en: string[] };
    tip?: { tr: string; en: string };
  }[];
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    name: "Emre K.", role: "Android User", game: "Custom Designs", rating: 5,
    source: "Google Play Store", avatarInitial: "E",
    comment: { tr: "Hazır tasarımlar arasında geçiş yapmak ve renkleri ekranıma göre ayarlamak kolay.", en: "Switching between built-in designs and adjusting colors for my screen is straightforward." },
  },
  {
    name: "Barış T.", role: "Android User", game: "Overlay Controls", rating: 5,
    source: "Google Play Store", avatarInitial: "B",
    comment: { tr: "Katman izninin neden istendiğini açıklaması ve bildirimden durdurulabilmesi anlaşılır.", en: "The overlay permission is explained clearly, and I can stop the layer from the notification." },
  },
  {
    name: "Selin D.", role: "Content Creator", game: "Local PNG Import", rating: 5,
    source: "Google Play Store", avatarInitial: "S",
    comment: { tr: "Kendi şeffaf PNG görselimi ekleyip boyutunu ve opaklığını ayarlayabiliyorum.", en: "I can add my own transparent PNG and adjust its size and opacity." },
  },
  {
    name: "Can Y.", role: "Android User", game: "Visual Customization", rating: 5,
    source: "Google Play Store", avatarInitial: "C",
    comment: { tr: "Nişangah seçenekleri sade, görünüm ayarları ayrıntılı ve kullanımı kolay.", en: "The crosshair options are clear, the appearance controls are detailed, and the app is easy to use." },
  },
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: "what-is-crossio", category: "general",
    question: { tr: "Crossio nedir?", en: "What is Crossio?" },
    directAnswer: { tr: "Crossio, seçtiğiniz nişangahı Android ekranında pasif ve özelleştirilebilir bir görsel katman olarak gösteren bir uygulamadır.", en: "Crossio displays the crosshair you choose as a passive, customizable visual layer on your Android screen." },
    detailedAnswer: { tr: "Hazır tasarımları kullanabilir, görünüm ayarlarını değiştirebilir veya kendi şeffaf PNG görselinizi yerel olarak ekleyebilirsiniz.", en: "Use built-in designs, adjust their appearance, or add your own transparent PNG locally." },
  },
  {
    id: "how-overlay-works", category: "overlay",
    question: { tr: "Pasif katman nasıl çalışır?", en: "How does the passive overlay work?" },
    directAnswer: { tr: "Crossio, Android'in standart 'Diğer uygulamaların üzerinde gösterim' izniyle kullanıcı tarafından başlatılan bir görsel katman oluşturur.", en: "Crossio uses Android's standard 'Display over other apps' permission to create a visual layer that the user starts explicitly." },
    detailedAnswer: { tr: "Ana nişangah click-through çalışır; dokunma veya tuş girdisi alamaz. Uygulamada başlatılır ve kalıcı bildirimden durdurulabilir. İsteğe bağlı mini kontrol katmanı, kullanıcı etkileşimi için dokunulabilirdir.", en: "The main crosshair is click-through and cannot receive touch or key input. It starts in the app and can be stopped from the persistent notification. The optional mini control overlay is touchable for user interaction." },
  },
  {
    id: "other-app-data", category: "overlay",
    question: { tr: "Crossio diğer uygulamaların verilerine erişir mi?", en: "Does Crossio access data from other apps?" },
    directAnswer: { tr: "Hayır. Crossio diğer uygulamaların kodunu, belleğini, dosyalarını, verilerini veya ağ trafiğini okumaz ya da değiştirmez.", en: "No. Crossio does not read or modify another app's code, memory, files, data, or network traffic." },
    detailedAnswer: { tr: "Uygulama otomatik nişan alma, otomatik dokunma, makro, girdi enjeksiyonu veya oyun otomasyonu sağlamaz.", en: "The app provides no auto-aim, auto-tap, macros, input injection, or game automation." },
  },
  {
    id: "why-overlay-permission", category: "overlay",
    question: { tr: "Android neden katman izni ister?", en: "Why does Android ask for overlay permission?" },
    directAnswer: { tr: "Android, başka uygulamaların üzerinde görsel içerik gösterilmeden önce SYSTEM_ALERT_WINDOW iznini zorunlu kılar.", en: "Android requires SYSTEM_ALERT_WINDOW permission before visual content can be displayed above other apps." },
    detailedAnswer: { tr: "Crossio sistem ayarını, açıklamayı okuyup Devam Et'i seçtiğinizde açar. Bu izin; rehber, mikrofon veya kamera erişimi vermez.", en: "Crossio opens the system setting after you read the disclosure and choose Continue. This permission does not grant contacts, microphone, or camera access." },
  },
  {
    id: "third-party-rules", category: "compatibility",
    question: { tr: "Üçüncü taraf uygulama ve oyun kuralları geçerli mi?", en: "Do third-party app and game rules still apply?" },
    directAnswer: { tr: "Evet. Bazı oyunlar ve rekabetçi platformlar görsel katmanları kısıtlayabilir.", en: "Yes. Some games and competitive platforms may restrict visual overlays." },
    detailedAnswer: { tr: "Kullandığınız hizmetin güncel kurallarını kontrol etmek sizin sorumluluğunuzdadır. Crossio hiçbir üçüncü taraf hizmetin katmana izin verdiğini veya yaptırım uygulanmayacağını garanti etmez.", en: "You are responsible for checking each service's current rules. Crossio does not guarantee that a third-party service permits overlays or that an account will not be restricted." },
  },
  {
    id: "import-custom-image", category: "import",
    question: { tr: "Kendi PNG görselimi ekleyebilir miyim?", en: "Can I add my own PNG image?" },
    directAnswer: { tr: "Evet. Galerinizden şeffaf arka planlı bir PNG seçip görünümünü ayarlayabilirsiniz.", en: "Yes. Select a transparent PNG from your gallery and adjust its appearance." },
    detailedAnswer: { tr: "Görsel uygulamanın yerel depolama alanında işlenir ve bu özellik kapsamında sunucularımıza yüklenmez. Tam yerel dosya yolu analitik hizmetlerine gönderilmez.", en: "The image is processed in local app storage and is not uploaded to our servers for this feature. Its full local path is not sent to analytics." },
  },
  {
    id: "analytics-data", category: "general",
    question: { tr: "Analitik kapsamında ne paylaşılır?", en: "What is shared for analytics?" },
    directAnswer: { tr: "Genel özellik ve ekran etkileşimleri ile built_in, custom veya saved gibi anonim nişangah türleri ölçülebilir.", en: "General feature and screen interactions, plus anonymous crosshair types such as built_in, custom, or saved, may be measured." },
    detailedAnswer: { tr: "Nişangah adı, tam nişangah tanımı ve yerel dosya yolu Firebase Analytics'e gönderilmez. Uygulama, RevenueCat hedeflemesi için kategorik kullanım segmentleri de işleyebilir.", en: "Crosshair names, full definitions, and local file paths are not sent to Firebase Analytics. The app may also process categorical usage segments for RevenueCat targeting." },
  },
  {
    id: "battery-settings", category: "performance",
    question: { tr: "Pil ayarlarını değiştirmek zorunlu mu?", en: "Must I change battery settings?" },
    directAnswer: { tr: "Hayır. Pil optimizasyonu muafiyeti isteğe bağlıdır ve gerektiğinde Android sistem ayarlarından yönetilir.", en: "No. A battery optimization exemption is optional and is managed from Android system settings when needed." },
    detailedAnswer: { tr: "Bazı üreticiler ön plan servislerini daha agresif sonlandırabilir. Uygulama katman başlatılırken muafiyet durumunu kontrol edebilir; davranış cihaz ve Android sürümüne göre değişir.", en: "Some manufacturers stop foreground services more aggressively. The app may check exemption status when the overlay starts; behavior varies by device and Android version." },
  },
  {
    id: "notification-permission", category: "overlay",
    question: { tr: "Bildirim izni neden kullanılır?", en: "Why is notification permission used?" },
    directAnswer: { tr: "Bildirim, çalışan ön plan katman servisini görünür kılmak ve Durdur eylemini sunmak için kullanılır.", en: "The notification keeps the active foreground overlay service visible and provides a Stop action." },
    detailedAnswer: { tr: "İzin verirseniz Firebase Cloud Messaging üzerinden uygulama bildirimleri de gönderilebilir; bildirimleri cihaz ayarlarından kapatabilirsiniz.", en: "If allowed, app notifications may also be sent through Firebase Cloud Messaging; you can disable them in device settings." },
  },
  {
    id: "android-support", category: "compatibility",
    question: { tr: "Hangi cihazlar desteklenir?", en: "Which devices are supported?" },
    directAnswer: { tr: "Crossio desteklenen Android telefon ve tabletler için sunulur; iOS ve masaüstü sürümü yoktur.", en: "Crossio is available for supported Android phones and tablets; there is no iOS or desktop version." },
    detailedAnswer: { tr: "Katman davranışı Android sürümüne, üretici kısıtlamalarına ve cihaz ayarlarına göre değişebilir; her cihazda aynı sonucu garanti etmiyoruz.", en: "Overlay behavior may vary by Android version, manufacturer restrictions, and device settings; identical behavior on every device is not guaranteed." },
  },
];

export const GUIDES_DATA: GuideArticle[] = [
  {
    slug: "crosshair-tasarimi", readTime: "4 min read", publishedDate: "2026-09-05", category: "Visual Design",
    title: { tr: "Okunaklı Bir Nişangah Nasıl Tasarlanır?", en: "How to Design a Readable Crosshair" },
    description: { tr: "Boyut, kalınlık, boşluk ve opaklık ayarlarını farklı ekranlarda dengeli kullanın.", en: "Balance size, thickness, gap, and opacity across different displays." },
    summary: { tr: "İyi bir görsel tasarım, farklı arka planlarda okunaklı kalırken ekranı gereksiz yere kaplamaz.", en: "A good visual design remains readable across backgrounds without covering more of the screen than needed." },
    sections: [
      { title: { tr: "Basit bir şekille başlayın", en: "Start with a simple shape" }, content: { tr: "Nokta, artı veya çember gibi sade bir tasarım seçin; sonra boyutu küçük adımlarla değiştirin.", en: "Choose a simple dot, cross, or circle, then adjust its size in small steps." }, bullets: { tr: ["Önizlemeyi farklı arka planlarda kontrol edin.", "Gereksiz parıltı ve kalınlıktan kaçının."], en: ["Check the preview on different backgrounds.", "Avoid unnecessary glow and thickness."] } },
      { title: { tr: "Ayarları yerel profil olarak kaydedin", en: "Save settings as a local profile" }, content: { tr: "Beğendiğiniz görünümü kaydedip daha sonra yeniden düzenleyebilirsiniz.", en: "Save an appearance you like and edit it again later." } },
    ],
  },
  {
    slug: "renk-ve-kontrast", readTime: "3 min read", publishedDate: "2026-09-05", category: "Accessibility",
    title: { tr: "Renk ve Kontrastı Ekranınıza Göre Ayarlayın", en: "Adjust Color and Contrast for Your Display" },
    description: { tr: "Nişangah rengini farklı parlaklık ve arka plan koşullarında önizleyin.", en: "Preview crosshair colors under different brightness and background conditions." },
    summary: { tr: "Tek bir renk her ekranda aynı görünmez; önizleme alanı doğru seçimi yapmanıza yardımcı olur.", en: "One color does not look the same on every display; the preview helps you choose deliberately." },
    sections: [
      { title: { tr: "Birden fazla arka plan deneyin", en: "Try multiple backgrounds" }, content: { tr: "Koyu, açık ve renkli önizlemeler arasında geçiş yaparak kenar çizgisi ve opaklık ayarlarını karşılaştırın.", en: "Switch between dark, light, and colorful previews to compare outline and opacity settings." } },
      { title: { tr: "Erişilebilirliği gözetin", en: "Consider accessibility" }, content: { tr: "Renk körlüğü veya düşük görüş koşullarında yalnız renge güvenmeyin; şekil ve dış çizgiyi de ayarlayın.", en: "For color-vision differences or low visibility, do not rely on color alone; adjust shape and outline too." } },
    ],
  },
  {
    slug: "sorun-giderme-overlay-izinleri", readTime: "5 min read", publishedDate: "2026-09-05", category: "Android Help",
    title: { tr: "Android Katman İzni ve Servis Kontrolleri", en: "Android Overlay Permission and Service Controls" },
    description: { tr: "Katman iznini bilinçli yönetin, servisi başlatın ve bildirimden durdurun.", en: "Manage overlay permission deliberately, start the service, and stop it from the notification." },
    summary: { tr: "Crossio ilgili izinleri, katmanı başlatmayı seçtiğinizde kontrol eder ve sistem ayarına yönlendirir.", en: "Crossio checks relevant permissions when you choose to start the layer and directs you to system settings." },
    sections: [
      { title: { tr: "Açıklamayı okuyun", en: "Read the disclosure" }, content: { tr: "İlk sabitlemede gösterilen açıklama katmanın davranışını ve sınırlarını anlatır. Devam Et veya İptal seçeneklerinden birini seçebilirsiniz.", en: "The first-pin disclosure explains the layer's behavior and limits. You can choose Continue or Cancel." } },
      { title: { tr: "Android ayarından izin verin", en: "Grant permission in Android settings" }, content: { tr: "Devam Et'i seçerseniz Android'in Crossio için 'Diğer uygulamaların üzerinde göster' ayarını açın, sonra uygulamaya dönün.", en: "If you choose Continue, enable Android's 'Display over other apps' setting for Crossio, then return to the app." } },
      { title: { tr: "Katmanı durdurun", en: "Stop the layer" }, content: { tr: "Etkin katmanı kalıcı bildirimdeki Durdur eylemiyle kapatabilirsiniz. Pil optimizasyonu muafiyeti isteğe bağlıdır.", en: "Stop the active layer with the Stop action in the persistent notification. A battery optimization exemption is optional." } },
    ],
  },
];
