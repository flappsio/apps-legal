export interface TestimonialItem {
  name: string;
  role: string;
  game: string;
  rating: number;
  source: string;
  comment: {
    tr: string;
    en: string;
  };
  avatarInitial: string;
}

export interface FAQItem {
  id: string;
  category: "general" | "overlay" | "import" | "performance" | "compatibility";
  question: {
    tr: string;
    en: string;
  };
  directAnswer: {
    tr: string;
    en: string;
  };
  detailedAnswer: {
    tr: string;
    en: string;
  };
}

export interface GuideArticle {
  slug: string;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  readTime: string;
  publishedDate: string;
  category: string;
  summary: {
    tr: string;
    en: string;
  };
  sections: {
    title: {
      tr: string;
      en: string;
    };
    content: {
      tr: string;
      en: string;
    };
    bullets?: {
      tr: string[];
      en: string[];
    };
    tip?: {
      tr: string;
      en: string;
    };
  }[];
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    name: "Emre 'Vortex' K.",
    role: "Verified Android Gamer",
    game: "Mobile FPS & Battle Royale",
    rating: 5,
    source: "Google Play Store",
    comment: {
      tr: "Özellikle keskin nişancı ve pompalı silahlarda ekranın ortasında sabit nokta crosshair olması hedef almayı inanılmaz hızlandırıyor. Sıfır gecikme ve pili hiç etkilemiyor.",
      en: "Having a static center dot reticle especially for snipers and shotguns makes hip-fire alignment instantly faster. Zero latency and practically no battery impact.",
    },
    avatarInitial: "E",
  },
  {
    name: "Barış T.",
    role: "Competitive Mobile Player",
    game: "CODM / Standoff 2",
    rating: 5,
    source: "Google Play Store",
    comment: {
      tr: "Android overlay izni 10 saniyede açılıyor. Oyun koduna dokunmadan sadece ekranda katman olarak durduğu için tamamen güvenli. Renk zıtlığı ayarları harika.",
      en: "Overlay permission took 10 seconds to setup. It simply floats over the screen without touching any game binaries, so it's 100% clean and safe.",
    },
    avatarInitial: "B",
  },
  {
    name: "Selin D.",
    role: "Content Creator",
    game: "PUBG Mobile / Farlight",
    rating: 5,
    source: "Google Play Store",
    comment: {
      tr: "Kendi hazırladığım şeffaf PNG crosshair görselini galeriden içe aktarabilmek harika bir özellik. Milimetrik boyut ve opaklık kontrolü çok başarılı.",
      en: "Being able to import custom transparent PNG reticle images directly from my Android gallery is amazing. The millimeter sizing and opacity controls are spot on.",
    },
    avatarInitial: "S",
  },
  {
    name: "Can 'Apex' Y.",
    role: "Android FPS Enthusiast",
    game: "Free Fire / Arena Breakout",
    rating: 5,
    source: "Google Play Store",
    comment: {
      tr: "Yüzen hızlı kontrol balonu sayesinde oyundan çıkmadan crosshair'i tek dokunuşla açıp kapatabiliyorum. Ergonomisi çok iyi düşünülmüş.",
      en: "The floating quick-toggle bubble lets me enable/disable or swap crosshairs with one tap without leaving the match. Excellent mobile ergonomics.",
    },
    avatarInitial: "C",
  },
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: "what-is-crosshair-overlay",
    category: "general",
    question: {
      tr: "Crosshair overlay nedir?",
      en: "What is a crosshair overlay?",
    },
    directAnswer: {
      tr: "Crosshair overlay, Android cihazınızın ekranının tam merkezine yerleştirilen ve mobil oyunların üzerinde sabit bir nişan alma referansı sağlayan görsel bir katmandır.",
      en: "A crosshair overlay is a visual HUD layer placed at the exact center of your Android screen to provide a consistent, high-contrast aiming reference over mobile games.",
    },
    detailedAnswer: {
      tr: "Farklı oyunlar ve silah türleri değişken nişangahlara sahip olabilir veya nişangah sunmayabilir. Overlay sayesinde ekranınızda her zaman görünür, özelleştirilebilir ve sabit bir hedef noktası bulunur.",
      en: "Different weapons and game modes may have varying or absent reticles. A custom overlay ensures you always maintain a clear, customizable focal point regardless of the active weapon.",
    },
  },
  {
    id: "how-does-it-work-on-android",
    category: "overlay",
    question: {
      tr: "Crosshair Android'de nasıl çalışır?",
      en: "How does Crosshair work on Android?",
    },
    directAnswer: {
      tr: "Android'in standart 'Diğer uygulamaların üzerinde gösterim' (SYSTEM_ALERT_WINDOW) sistem iznini kullanarak ekran üzerine bağımsız, donanım hızlandırmalı şeffaf bir katman çizer.",
      en: "It utilizes Android's standard 'Display over other apps' (SYSTEM_ALERT_WINDOW) permission to render an independent, hardware-accelerated transparent layer over the screen.",
    },
    detailedAnswer: {
      tr: "Uygulama oyun dosyalarına, belleğe (RAM) veya ağ paketlerine hiçbir şekilde müdahale etmez. İşletim sistemi pencere yöneticisi seviyesinde tamamen izole çalışır.",
      en: "The app never accesses game files, memory (RAM), or network traffic. It runs strictly within Android's sandboxed window manager environment.",
    },
  },
  {
    id: "can-i-use-in-mobile-games",
    category: "compatibility",
    question: {
      tr: "Mobil oyunlarda özel crosshair kullanabilir miyim?",
      en: "Can I use a custom crosshair in mobile games?",
    },
    directAnswer: {
      tr: "Evet. Crosshair, Android işletim sistemi katmanında çalıştığı için ekranda açılan tüm uyumlu mobil oyunların üzerinde sorunsuz şekilde görüntülenir.",
      en: "Yes. Because Crosshair operates at the Android OS layer, it remains clearly visible over compatible mobile games running on your device.",
    },
    detailedAnswer: {
      tr: "Oyuncular nişangahın rengini, boyutunu, şeffaflığını ve stilini diledikleri gibi ayarlayarak harita zeminlerine göre en iyi kontrastı elde edebilir.",
      en: "Gamers can adjust reticle color, size, opacity, and shape to maximize contrast against various map textures and lighting conditions.",
    },
  },
  {
    id: "can-i-import-custom-image",
    category: "import",
    question: {
      tr: "Kendi özel crosshair görselimi içe aktarabilir miyim?",
      en: "Can I import my own crosshair image?",
    },
    directAnswer: {
      tr: "Evet. Cihazınızın galerisinden şeffaf arka planlı (PNG) herhangi bir özel nişangah görselini seçip ekranda overlay olarak kullanabilirsiniz.",
      en: "Yes. You can select any transparent PNG crosshair image from your Android gallery and project it as an active on-screen overlay.",
    },
    detailedAnswer: {
      tr: "İçe aktarılan görsellerin boyutu, opaklığı ve merkez konumu tıpkı yerleşik nişangahlar gibi milimetrik olarak ayarlanabilir ve cihazınızda yerel saklanır.",
      en: "Imported images can be scaled, repositioned, and adjusted for opacity just like built-in presets, remaining stored locally on your device.",
    },
  },
  {
    id: "does-it-work-while-game-open",
    category: "overlay",
    question: {
      tr: "Uygulama oyun açıkken çalışmaya devam eder mi?",
      en: "Does the app work while a game is open?",
    },
    directAnswer: {
      tr: "Evet. Katmanı başlattıktan sonra oyuna geçtiğinizde nişangah ekranın merkezinde kesintisiz olarak kalır.",
      en: "Yes. Once you start the overlay service, your reticle remains centered on the display while you switch to and play your games.",
    },
    detailedAnswer: {
      tr: "Yüzen hızlı kontrol balonu (floating widget) sayesinde oyunu alta almadan tek dokunuşla nişangahı gizleyebilir veya yeniden açabilirsiniz.",
      en: "A floating HUD bubble allows you to toggle the reticle on/off or change presets with a single tap without minimizing your game.",
    },
  },
  {
    id: "why-overlay-permission",
    category: "overlay",
    question: {
      tr: "Android neden 'Overlay' (Üstte Gösterme) izni ister?",
      en: "Why does Android ask for overlay permission?",
    },
    directAnswer: {
      tr: "Android, bir uygulamanın diğer uygulamaların üzerinde görsel içerik çizebilmesi için güvenlik gereği 'SYSTEM_ALERT_WINDOW' iznini zorunlu kılar.",
      en: "Android requires the 'SYSTEM_ALERT_WINDOW' permission for security to allow any utility to render visual elements above other running applications.",
    },
    detailedAnswer: {
      tr: "Bu izin yalnızca ekrana nişangah çizimi yapmak içindir; rehber, mikrofon, kamera veya depolama gibi hassas kişisel verilere erişim sağlamaz.",
      en: "This permission is strictly utilized for visual reticle rendering and grants zero access to private data like contacts, microphone, camera, or personal storage.",
    },
  },
  {
    id: "crosshair-disappears-game-open",
    category: "performance",
    question: {
      tr: "Oyunu açtığımda crosshair neden kayboluyor?",
      en: "Why does my crosshair disappear when I open a game?",
    },
    directAnswer: {
      tr: "Bu durum genellikle Android üreticisinin agresif pil tasarrufu politikasının arka plan servisini kapatmasından kaynaklanır.",
      en: "This is typically caused by aggressive Android OEM battery management closing background services when a heavy game launches.",
    },
    detailedAnswer: {
      tr: "Çözüm için Ayarlar > Pil > Pil Optimizasyonu menüsünden Crosshair uygulamasını 'Kısıtlama Yok' veya 'Optimize Edilmemiş' olarak ayarlayın.",
      en: "To resolve this, navigate to Settings > Battery > Battery Optimization and set Crosshair to 'Unrestricted' or 'Don't Optimize'.",
    },
  },
  {
    id: "how-to-keep-running-background",
    category: "performance",
    question: {
      tr: "Crosshair'in arka planda sürekli çalışmasını nasıl sağlarım?",
      en: "How can I keep Crosshair running in the background?",
    },
    directAnswer: {
      tr: "Uygulamaya 'Bildirim İzni' vererek ön plan servisini aktif tutabilir ve son uygulamalar menüsünde uygulamayı kilitleyebilirsiniz.",
      en: "Enable the foreground notification permission and lock the Crosshair app in your Android Recent Apps overview screen.",
    },
    detailedAnswer: {
      tr: "Xiaomi/MIUI cihazlarda Güvenlik > Otomatik Başlatma iznini açmak ve Samsung cihazlarda 'Asla uyku moduna alınmayan uygulamalar' listesine eklemek kalıcılığı garantiler.",
      en: "On Xiaomi/MIUI devices, enable Autostart in Security settings; on Samsung One UI, add Crosshair to the 'Never sleeping apps' list.",
    },
  },
  {
    id: "does-battery-optimization-affect",
    category: "performance",
    question: {
      tr: "Pil optimizasyonu Crosshair'i etkiler mi?",
      en: "Does battery optimization affect Crosshair?",
    },
    directAnswer: {
      tr: "Evet. Standart pil tasarrufu modları arka plan katman servislerini sonlandırabilir; bu nedenle optimizasyondan muaf tutulması önerilir.",
      en: "Yes. Default battery saver modes may suspend background overlays; whitelisting the app ensures consistent rendering during gameplay.",
    },
    detailedAnswer: {
      tr: "Crosshair'in kendisi donanım hızlandırmalıdır ve CPU tüketimi %0.5'in altındadır, yani cihazın şarjını fark edilir düzeyde tüketmez.",
      en: "Crosshair itself uses ultra-lightweight hardware rendering with less than 0.5% CPU load, causing negligible battery consumption.",
    },
  },
  {
    id: "works-on-every-android-phone",
    category: "compatibility",
    question: {
      tr: "Crosshair her Android telefonda çalışır mı?",
      en: "Does Crosshair work on every Android phone?",
    },
    directAnswer: {
      tr: "Android 7.0 (Nougat) ve üzeri işletim sistemi çalıştıran tüm Android akıllı telefon ve tabletlerle uyumludur.",
      en: "It is compatible with all Android smartphones and tablets running Android 7.0 (Nougat) and higher.",
    },
    detailedAnswer: {
      tr: "Root yetkisi veya özel rom gerektirmez; Samsung, Xiaomi, Oppo, Vivo, OnePlus, Google Pixel, Realme ve diğer tüm markalarda doğrudan çalışır.",
      en: "Zero root or custom ROMs required; works natively across Samsung, Xiaomi, Google Pixel, OnePlus, Oppo, Vivo, Realme, and others.",
    },
  },
  {
    id: "does-crosshair-support-roblox",
    category: "compatibility",
    question: {
      tr: "Crosshair Roblox ile uyumlu mu?",
      en: "Does Crosshair support Roblox?",
    },
    directAnswer: {
      tr: "Evet. Roblox mobil uygulamasında FPS, TPS ve nişan alma gerektiren tüm oyun modlarında ekran üstü nişangah katmanı olarak kullanılabilir.",
      en: "Yes. It can be used as an on-screen reticle overlay across all Roblox mobile action, shooting, and first-person experiences.",
    },
    detailedAnswer: {
      tr: "Roblox oyunlarındaki değişken kamera açılarında merkez hedefleme noktasını sabit tutarak isabet kolaylığı sağlar.",
      en: "It maintains a fixed center aiming reference during fast camera rotations and third-person aim transitions inside Roblox games.",
    },
  },
  {
    id: "works-with-mobile-fps-games",
    category: "compatibility",
    question: {
      tr: "Mobil FPS oyunları ile çalışır mı?",
      en: "Does Crosshair work with mobile FPS games?",
    },
    directAnswer: {
      tr: "Evet. Android ekranında çalışan tüm popüler mobil FPS, TPS ve Battle Royale oyunlarıyla tam uyumludur.",
      en: "Yes. It works seamlessly across all mobile FPS, TPS, and Battle Royale titles running on Android.",
    },
    detailedAnswer: {
      tr: "Oyun motoru türünden bağımsız olarak Android pencere katmanı üzerinde durduğu için tüm nişancı oyunlarında kullanılabilir.",
      en: "Because it renders on the Android system window layer independently of the game engine, it supports any on-screen shooter.",
    },
  },
  {
    id: "can-i-change-color-and-size",
    category: "general",
    question: {
      tr: "Nişangahın rengini ve boyutunu değiştirebilir miyim?",
      en: "Can I change crosshair color and size?",
    },
    directAnswer: {
      tr: "Evet. Boyut, çizgi kalınlığı, merkez boşluğu (gap), opaklık, siyah dış çizgi (outline) ve geniş RGB renk paleti tamamen ayarlanabilir.",
      en: "Yes. Reticle size, stroke thickness, center gap, opacity, outer stroke outline, and a full RGB color spectrum are fully adjustable.",
    },
    detailedAnswer: {
      tr: "Değişiklikler ekrandaki nişangaha anında yansır ve hazır profil olarak kaydedilebilir.",
      en: "All adjustments reflect immediately in real-time and can be saved as custom presets for fast switching.",
    },
  },
  {
    id: "is-crosshair-available-for-iphone",
    category: "compatibility",
    question: {
      tr: "Crosshair iPhone (iOS) için mevcut mu?",
      en: "Is Crosshair available for iPhone?",
    },
    directAnswer: {
      tr: "Crosshair şu anda yalnızca Android cihazlar için geliştirilmiştir; iOS/iPhone sürümü bulunmamaktadır.",
      en: "Crosshair is currently available for Android. There is no iOS / iPhone version.",
    },
    detailedAnswer: {
      tr: "iOS işletim sisteminin güvenlik kısıtlamaları diğer uygulamaların üzerinde serbest katman (overlay) çizimine izin vermediği için uygulama Android'e özeldir.",
      en: "Due to iOS sandbox restrictions disallowing on-screen overlay widgets across third-party apps, Crosshair is engineered exclusively for Android.",
    },
  },
  {
    id: "is-crosshair-available-for-pc",
    category: "compatibility",
    question: {
      tr: "Crosshair PC veya Windows için mevcut mu?",
      en: "Is Crosshair available for PC?",
    },
    directAnswer: {
      tr: "Crosshair mobil uygulaması şu anda Android cihazlar için tasarlanmıştır.",
      en: "The Crosshair mobile app is currently designed for Android devices.",
    },
    detailedAnswer: {
      tr: "Uygulama doğrudan Google Play Store üzerinden Android telefon ve tabletlere yüklenir; masaüstü Windows veya konsol sürümü bulunmamaktadır.",
      en: "The application is downloaded directly via Google Play Store for Android smartphones and tablets; there is no desktop PC version.",
    },
  },
];

export const GUIDES_DATA: GuideArticle[] = [
  {
    slug: "crosshair-secimi",
    title: {
      tr: "FPS Oyunları İçin En İyi Crosshair Nasıl Seçilir?",
      en: "How to Choose the Best Crosshair for FPS Games?",
    },
    description: {
      tr: "Nokta (Dot), Klasik Artı (+), Çember (Circle) ve Profesyonel nişangah türlerinin artı ve eksi yönleri. Oyun tarzınıza en uygun nişangahı keşfedin.",
      en: "Pros and cons of Dot, Classic Cross (+), Circle, and Pro esports reticle styles. Find the ideal crosshair for your playstyle.",
    },
    readTime: "4 min read",
    publishedDate: "2026-08-20",
    category: "Aim Optimization",
    summary: {
      tr: "Doğru nişangah seçimi, hedef alma sürenizi (Time-to-Target) ve kafa vuruşu (Headshot) isabet oranınızı doğrudan etkiler. Küçük boyutlu ve yüksek kontrastlı modeller odaklanmayı artırır.",
      en: "Selecting the right crosshair directly improves your Time-to-Target and Headshot accuracy. Compact, high-contrast reticles maximize visual focus.",
    },
    sections: [
      {
        title: {
          tr: "1. Nokta (Dot) Crosshair: Maksimum Görüş ve Hassasiyet",
          en: "1. Dot Crosshair: Maximum Visibility & Precision",
        },
        content: {
          tr: "Merkez nokta (Dot) nişangahı, özellikle uzak mesafedeki rakiplerin kafasını kapatmadan net görmenizi sağlar. Hassas tek mermi atışları için en popüler tercihtir.",
          en: "Center dot crosshairs allow you to see distant enemy targets clearly without visual obstruction. It is the top choice for precision tap-firing in tactical shooters.",
        },
        bullets: {
          tr: [
            "Görüş alanını hiçbir şekilde engellemez.",
            "Keskin nişancı (Sniper) no-scope atışlarında büyük avantaj sağlar.",
            "Önerilen boyut: 2px - 4px arası.",
          ],
          en: [
            "Never obstructs your field of view.",
            "Gives a huge advantage in hip-fire centering and sniper quick-scopes.",
            "Recommended size: between 2px - 4px.",
          ],
        },
        tip: {
          tr: "İpucu: Nokta crosshair kullanırken etrafına 1px siyah dış çizgi (outline) eklemek, açık renkli haritalarda kaybolmasını engeller.",
          en: "Pro Tip: Adding a 1px black outline around your dot prevents it from blending into brightly lit map environments.",
        },
      },
      {
        title: {
          tr: "2. Klasik Artı (+) Crosshair: Hizalama ve Dikey Kontrol",
          en: "2. Classic Cross (+) Reticle: Alignment & Recoil Control",
        },
        content: {
          tr: "Dört kollu geleneksel nişangah, gözün ekranın merkezini otomatik olarak bulmasını kolaylaştırır. Yatay ve dikey kolları sayesinde sprey kontrolü yaparken takip kolaylaşır.",
          en: "The classic four-armed crosshair helps your peripheral vision naturally lock onto the screen center, aiding vertical recoil tracking.",
        },
        bullets: {
          tr: [
            "Göz hizalamasını hızlandırır.",
            "Kısa çizgiler (Uzunluk: 4-6, Kalınlık: 1-2) önerilir.",
            "Merkez boşluğu (Gap) 2-3 px tutularak hedef gövdesi görünür kılınmalıdır.",
          ],
          en: [
            "Speeds up peripheral eye tracking.",
            "Short inner lines (Length: 4-6, Thickness: 1-2) are recommended.",
            "Keep an inner gap of 2-3 px to maintain view of the target model.",
          ],
        },
      },
    ],
  },
  {
    slug: "renk-ve-gorunurluk",
    title: {
      tr: "Harita ve Zemin Zıtlığına Göre Crosshair Renk Seçimi",
      en: "Crosshair Color & Contrast Guide for Every Map",
    },
    description: {
      tr: "Neden yeşil ve cyan renkleri en çok tercih edilir? Aydınlık ve karanlık oyun haritalarında kaybolmayan renk kombinasyonları.",
      en: "Why are neon green and cyan the most preferred reticle colors? Contrast combinations that never get lost on dark or bright maps.",
    },
    readTime: "3 min read",
    publishedDate: "2026-08-22",
    category: "Contrast Strategy",
    summary: {
      tr: "İnsan gözü yeşil ve siyan dalga boylarına en hassastır. Harita zeminine zıt renk seçimi ve siyah dış çizgi (outline) kullanımı refleks sürenizi milisaniyelerce iyileştirir.",
      en: "Human vision is naturally most sensitive to green and cyan wavelengths. Choosing high-contrast shades with a black outline saves critical reaction milliseconds.",
    },
    sections: [
      {
        title: {
          tr: "Neon Yeşil (#69F0AE) Neden 1 Numara?",
          en: "Why Neon Green (#69F0AE) is #1?",
        },
        content: {
          tr: "Oyun dünyasında çevre kaplamaları genellikle toprak, tuğla, gri beton veya mavi gökyüzü tonlarındadır. Neon yeşil bu arka planların neredeyse tamamında doğal bir zıtlık oluşturur.",
          en: "Most in-game environments consist of earthy browns, grey concrete, or blue sky textures. Neon green forms an immediate high-contrast focal point against all of them.",
        },
      },
      {
        title: {
          tr: "Siyan / Açık Mavi (#00E5FF) Tercihi",
          en: "Cyan / Electric Blue (#00E5FF)",
        },
        content: {
          tr: "Özellikle kum ve çöl temalı haritalarda en yüksek kontrastı siyan rengi sağlar.",
          en: "Particularly on desert or sandy yellow/orange maps, electric cyan offers the sharpest visual separation.",
        },
      },
    ],
  },
  {
    slug: "sorun-giderme-overlay-izinleri",
    title: {
      tr: "Android Overlay İzni ve Arka Plan Sorun Giderme Rehberi",
      en: "Android Overlay Permission & Background Troubleshooting",
    },
    description: {
      tr: "Xiaomi MIUI/HyperOS, Samsung One UI ve Oppo/Realme cihazlarda nişangahın kapanmasını önleme ve izin adımları.",
      en: "Preventing crosshair service kills and managing permissions on Xiaomi MIUI/HyperOS, Samsung One UI, and Oppo/Realme.",
    },
    readTime: "5 min read",
    publishedDate: "2026-08-25",
    category: "Troubleshooting",
    summary: {
      tr: "Bazı Android üreticileri pil tasarrufu için arka plan katman servislerini sonlandırabilir. 3 basit adımla crosshair'inizin oyun boyunca kesintisiz kalmasını sağlayabilirsiniz.",
      en: "Aggressive battery savers on certain Android devices may close overlay services. Follow these simple steps to ensure continuous overlay stability while gaming.",
    },
    sections: [
      {
        title: {
          tr: "1. 'Diğer Uygulamaların Üzerinde Gösterim' İznini Etkinleştirme",
          en: "1. Enabling 'Display Over Other Apps' Permission",
        },
        content: {
          tr: "Ayarlar > Uygulamalar > Crosshair > 'Diğer uygulamaların üzerinde göster' seçeneğini 'İzin verildi' konumuna getirin.",
          en: "Go to Settings > Apps > Crosshair > 'Display over other apps' and toggle it to 'Allowed'.",
        },
      },
      {
        title: {
          tr: "2. Pil Optimizasyonu İstisnası",
          en: "2. Battery Optimization Whitelist",
        },
        content: {
          tr: "Ayarlar > Pil > Pil Optimizasyonu menüsünden Crosshair'i 'Kısıtlama Yok' veya 'Optimize Edilmemiş' olarak ayarlayın.",
          en: "Go to Settings > Battery > Battery Optimization, locate Crosshair and set it to 'Unrestricted' or 'Don't Optimize'.",
        },
      },
    ],
  },
];
