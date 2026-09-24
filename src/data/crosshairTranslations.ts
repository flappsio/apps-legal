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
    id: "does-crossio-require-root", category: "overlay",
    question: { tr: "Crossio root gerektirir mi?", en: "Does Crossio require root?" },
    directAnswer: { tr: "Hayır. Crossio root erişimi gerektirmez.", en: "No. Crossio does not require root access." },
    detailedAnswer: { tr: "Android'in standart 'Diğer uygulamaların üzerinde gösterim' (SYSTEM_ALERT_WINDOW) izni kullanılarak çalışır.", en: "It operates strictly using Android's native 'Display over other apps' (SYSTEM_ALERT_WINDOW) permission." },
  },
  {
    id: "how-to-add-crosshair", category: "general",
    question: { tr: "Android'de nişangah nasıl eklerim?", en: "How do I add a crosshair on Android?" },
    directAnswer: { tr: "Crossio uygulamasını indirip bir nişangah seçerek veya kendi görselinizi ekleyerek Android ekranınıza nişangah ekleyebilirsiniz.", en: "You can add a crosshair on Android by downloading the Crossio app, selecting a reticle or importing your own image." },
    detailedAnswer: { tr: "Uygulama içindeki güç düğmesine dokunduğunuzda nişangah, diğer uygulamaların ve oyunların üzerinde pasif bir katman olarak belirecektir.", en: "Once you tap the power button in the app, the crosshair will appear as a passive layer over other apps and games." },
  },
  {
    id: "can-i-use-png", category: "import",
    question: { tr: "Kendi PNG görselimi nişangah yapabilir miyim?", en: "Can I use my own PNG as a crosshair?" },
    directAnswer: { tr: "Evet. Galerinizden şeffaf arka planlı bir PNG seçip ekrana sabitleyebilirsiniz.", en: "Yes. You can select a transparent PNG from your gallery and pin it to your screen." },
    detailedAnswer: { tr: "Uygulama içerisindeki 'İçe Aktar' (Import) bölümünü kullanarak istediğiniz JPG veya PNG dosyasını nişangah olarak ayarlayabilirsiniz.", en: "By using the 'Import' section in the app, you can set any JPG or PNG file as your crosshair." },
  },
  {
    id: "crosshair-disappears", category: "performance",
    question: { tr: "Oyunu açınca nişangahım neden kayboluyor?", en: "Why does my crosshair disappear when I open a game?" },
    directAnswer: { tr: "Android sistemleri (özellikle Xiaomi, Samsung) RAM ve pil tasarrufu sağlamak için arka planda çalışan katman servislerini bazen zorla durdurur.", en: "Android systems (especially Xiaomi, Samsung) sometimes forcefully stop background overlay services to save RAM and battery." },
    detailedAnswer: { tr: "Bunu çözmek için cihazınızın Pil ve Uygulama ayarlarından Crossio için 'Pil optimizasyonu yok' (No restrictions) seçeneğini işaretlemelisiniz.", en: "To solve this, you must select 'No restrictions' or 'Don't optimize' for Crossio from your device's Battery and App settings." },
  },
  {
    id: "why-overlay-permission", category: "overlay",
    question: { tr: "Crossio neden katman izni ister?", en: "Why does Crossio need overlay permission?" },
    directAnswer: { tr: "Android, oyunların veya diğer uygulamaların üzerine bir görsel (nişangah) çizebilmek için SYSTEM_ALERT_WINDOW iznini zorunlu kılar.", en: "Android requires the SYSTEM_ALERT_WINDOW permission in order to draw a visual graphic (crosshair) over games or other apps." },
    detailedAnswer: { tr: "Bu izin sadece ekrana çizim yapmak için kullanılır; uygulama başka izinler (kişiler, kamera vb.) istemez ve verilerinize erişmez.", en: "This permission is solely used to draw on the screen; the app does not ask for other permissions (contacts, camera, etc.) and does not access your data." },
  },
  {
    id: "does-crossio-modify-games", category: "compatibility",
    question: { tr: "Crossio oyun dosyalarını değiştirir mi?", en: "Does Crossio modify game files?" },
    directAnswer: { tr: "Hayır. Crossio bağımsız bir görsel katman olarak çalışır ve hiçbir oyun dosyasına veya belleğine müdahale etmez.", en: "No. Crossio works as an independent visual layer and does not tamper with any game files or memory." },
    detailedAnswer: { tr: "Ancak bazı oyunların hizmet şartları görsel katmanları kısıtlayabilir. Kullanıcılar oynadıkları oyunların kurallarına uymaktan sorumludur.", en: "However, some games' terms of service may restrict visual overlays. Users are responsible for complying with the rules of the games they play." },
  },
  {
    id: "prevent-closing-overlay", category: "performance",
    question: { tr: "Android'in katmanı kapatmasını nasıl engellerim?", en: "How do I prevent Android from closing the overlay?" },
    directAnswer: { tr: "Uygulamayı Android'in Son Uygulamalar (Recent Apps) menüsünde kilitleyerek (asma kilit simgesi) ve pil optimizasyonunu devre dışı bırakarak engellenmesini önleyebilirsiniz.", en: "You can prevent it from closing by locking the app in Android's Recent Apps menu (padlock icon) and disabling battery optimization." },
    detailedAnswer: { tr: "Ayrıca 'Otomatik Başlatma' (Auto-start) iznini vererek de sistemin arka planda servisi açık tutmasına yardımcı olabilirsiniz.", en: "Additionally, granting 'Auto-start' permission helps the system keep the service running in the background." },
  },
  {
    id: "change-color-size", category: "general",
    question: { tr: "Nişangah rengini ve boyutunu değiştirebilir miyim?", en: "Can I change the crosshair color and size?" },
    directAnswer: { tr: "Evet. Editör üzerinden nişangahın boyutunu, rengini, kalınlığını, opaklığını ve merkez boşluğunu serbestçe değiştirebilirsiniz.", en: "Yes. You can freely change the size, color, thickness, opacity, and center gap of the crosshair via the editor." },
    detailedAnswer: { tr: "Tüm değişiklikler anında kaydedilir ve katman açıkken eşzamanlı olarak ekranınızda güncellenir.", en: "All changes are saved instantly and update synchronously on your screen while the overlay is active." },
  },
];

export const GUIDES_DATA: GuideArticle[] = [
  {
    slug: "best-crosshair-color", readTime: "4 min read", publishedDate: "2026-09-24", category: "Visual Design",
    title: { tr: "Mobil FPS Oyunlarında En İyi Crosshair Rengi Hangisi?", en: "What is the Best Crosshair Color for Mobile FPS Games?" },
    description: { tr: "Mobil ekranlarda kaybolmayan yüksek kontrastlı crosshair renkleri. Gözünüzü yormayan ve nişan almayı kolaylaştıran renk ayarları.", en: "High-contrast crosshair colors that don't get lost on mobile screens. Color settings that ease aiming without straining your eyes." },
    summary: { tr: "Doğru crosshair rengini seçmek, arka plan ne kadar karışık olursa olsun hedefinizi görmenizi sağlar. Parlak ve zıt renkler en iyi performansı verir.", en: "Choosing the right crosshair color ensures you can see your target no matter how cluttered the background is. Bright and contrasting colors perform best." },
    sections: [
      { 
        title: { tr: "Yüksek Kontrast Neden Önemli?", en: "Why is High Contrast Important?" }, 
        content: { tr: "Oyun haritaları genellikle kahverengi, gri (binalar) ve mavi (gökyüzü) tonlarındadır. Eğer beyaz veya siyah bir crosshair kullanırsanız, karanlık veya çok aydınlık noktalarda görünmez hale gelebilir.", en: "Game maps are generally in shades of brown, gray (buildings), and blue (sky). If you use a white or black crosshair, it can become invisible in dark or very bright spots." }, 
        bullets: { tr: ["Neon Yeşil (Cyan) ve Pembe (Magenta) doğada en az bulunan renkler olduğu için FPS oyunlarında en çok tercih edilen renklerdir."], en: ["Neon Green (Cyan) and Pink (Magenta) are the most preferred colors in FPS games because they are rarely found in nature."] } 
      },
      {
        title: { tr: "Siyah Dış Çizgi (Outline) Kullanımı", en: "Using a Black Outline" },
        content: { tr: "Renginiz ne kadar parlak olursa olsun, Crossio'daki 'Outline' (Dış Çizgi) özelliğini aktif etmek, crosshair'in her türlü zeminde okunabilir kalmasını sağlar.", en: "No matter how bright your color is, activating the 'Outline' feature in Crossio ensures the crosshair remains readable on any background." },
        tip: { tr: "Parlak yeşil bir crosshair ve ince bir siyah dış çizgi, mobil e-spor oyuncularının en çok kullandığı kombinasyondur.", en: "A bright green crosshair with a thin black outline is the most commonly used combination by mobile esports players." }
      }
    ],
  },
  {
    slug: "crosshair-size-guide", readTime: "5 min read", publishedDate: "2026-09-24", category: "Optimization",
    title: { tr: "Mobil Ekranlar İçin Crosshair Boyut Rehberi", en: "Crosshair Size Guide for Mobile Screens" },
    description: { tr: "Telefon ve tablet ekranları için en ideal crosshair boyutlarını ve kalınlık ayarlarını keşfedin.", en: "Discover the most ideal crosshair sizes and thickness settings for phone and tablet screens." },
    summary: { tr: "Büyük ekranlı bir bilgisayarda harika görünen bir crosshair, telefonda hedefi tamamen kapatabilir. Boyut ayarlarını cihazınıza göre optimize etmelisiniz.", en: "A crosshair that looks great on a large PC monitor can completely obscure the target on a phone. You must optimize size settings according to your device." },
    sections: [
      { 
        title: { tr: "Hedefi Kapatmayan Tasarımlar", en: "Designs That Don't Obscure the Target" }, 
        content: { tr: "Mobil ekranlar küçük olduğundan, crosshair kalınlığını (Thickness) minimumda tutmalısınız. 1 veya 2 piksel kalınlık genellikle en iyi görüşü sağlar.", en: "Since mobile screens are small, you should keep the crosshair thickness to a minimum. A thickness of 1 or 2 pixels generally provides the best view." } 
      },
      {
        title: { tr: "Merkez Boşluğu (Center Gap)", en: "Center Gap" },
        content: { tr: "Özellikle artı (+) şeklindeki tasarımlarda 'Center Gap' değerini bir miktar artırmak, düşmanın kafasını tam ortaya almanızı kolaylaştırır.", en: "Especially in cross (+) designs, slightly increasing the 'Center Gap' value makes it easier to center the enemy's head." }
      }
    ],
  },
  {
    slug: "android-overlay-permission", readTime: "4 min read", publishedDate: "2026-09-24", category: "Android Help",
    title: { tr: "Android 'Diğer Uygulamaların Üzerinde Göster' İzni Nedir?", en: "What is Android's 'Display Over Other Apps' Permission?" },
    description: { tr: "SYSTEM_ALERT_WINDOW izninin neden gerekli olduğunu ve cihazınızda güvenli bir şekilde nasıl etkinleştirileceğini öğrenin.", en: "Learn why the SYSTEM_ALERT_WINDOW permission is necessary and how to safely enable it on your device." },
    summary: { tr: "Crossio gibi görsel katman uygulamaları, ekrana bir grafik çizebilmek için Android sisteminin bu özel iznine ihtiyaç duyar.", en: "Visual overlay apps like Crossio require this special permission from the Android system in order to draw a graphic on the screen." },
    sections: [
      { 
        title: { tr: "İzin Ne İşe Yarar?", en: "What Does the Permission Do?" }, 
        content: { tr: "Bu izin, uygulamanın (oyun oynarken veya video izlerken) ekranın en üst katmanında görünmesini sağlar. Crossio bu izni sadece ortada küçük bir crosshair çizmek için kullanır.", en: "This permission allows the app to appear on the top layer of the screen (while playing games or watching videos). Crossio uses this permission solely to draw a small crosshair in the center." } 
      },
      {
        title: { tr: "Gizlilik ve Güvenlik", en: "Privacy and Security" },
        content: { tr: "Bu izin, uygulamanın diğer uygulamaların içindeki mesajları veya şifreleri okuması anlamına gelmez. Crossio klavye girdilerine veya ekran kayıtlarına erişmez.", en: "This permission does not mean the app can read messages or passwords inside other apps. Crossio does not access keyboard inputs or screen recordings." }
      }
    ],
  },
  {
    slug: "crosshair-keeps-disappearing", readTime: "6 min read", publishedDate: "2026-09-24", category: "Troubleshooting",
    title: { tr: "Oyuna Girince Crosshair Neden Kapanıyor? (Çözüm)", en: "Why Does the Crosshair Keep Disappearing in Game? (Fix)" },
    description: { tr: "Xiaomi, Samsung ve diğer Android cihazlarda arka planda kapanan overlay sorununu çözmek için pil optimizasyonu ayarları.", en: "Battery optimization settings to fix the overlay closing in the background on Xiaomi, Samsung, and other Android devices." },
    summary: { tr: "Eğer Crossio'yu açıp bir oyuna girdiğinizde nişangah aniden kayboluyorsa, telefonunuzun 'Pil Tasarrufu' sistemi uygulamayı zorla kapatıyor demektir.", en: "If you open Crossio and enter a game only to have the crosshair suddenly disappear, your phone's 'Battery Saver' system is forcefully closing the app." },
    sections: [
      { 
        title: { tr: "Xiaomi (MIUI / HyperOS) Çözümü", en: "Xiaomi (MIUI / HyperOS) Fix" }, 
        content: { tr: "Ayarlar > Uygulamalar > Uygulamaları Yönet > Crossio yolunu izleyin. 'Otomatik Başlatma' (Auto-start) seçeneğini açın. Ardından 'Pil Tasarrufu' (Battery Saver) menüsüne girip 'Kısıtlama Yok' (No restrictions) seçeneğini işaretleyin.", en: "Go to Settings > Apps > Manage Apps > Crossio. Turn on 'Auto-start'. Then, go to the 'Battery Saver' menu and select 'No restrictions'." } 
      },
      {
        title: { tr: "Samsung (One UI) Çözümü", en: "Samsung (One UI) Fix" },
        content: { tr: "Ayarlar > Uygulamalar > Crossio yolunu izleyin. 'Pil' (Battery) menüsüne girip 'Kısıtlanmamış' (Unrestricted) seçeneğini işaretleyin.", en: "Go to Settings > Apps > Crossio. Enter the 'Battery' menu and select 'Unrestricted'." }
      }
    ],
  }
];
