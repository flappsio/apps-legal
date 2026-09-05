export interface LegalSection {
  id: string;
  number?: string;
  title: string;
  shortTitle?: string;
  content?: string;
  callout?: {
    type: "info" | "warning" | "success" | "neutral";
    title?: string;
    text: string;
  };
  subsections?: {
    title: string;
    content: string;
    bullets?: string[];
  }[];
  bullets?: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export interface LegalDocument {
  id: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  publisher: string;
  contactEmail: string;
  summary: string;
  metaDescription: string;
  sections: LegalSection[];
}

export const CROSSHAIR_PRIVACY_POLICY_TR: LegalDocument = {
  id: "crosshair-privacy-policy",
  title: "Gizlilik Bildirimi",
  subtitle: "Crossio: Custom Crosshair Mobil Uygulaması",
  lastUpdated: "5 Eylül 2026",
  publisher: "flappsio",
  contactEmail: "info@flappsio.com",
  summary:
    "Bu Gizlilik Bildirimi; Crossio: Custom Crosshair uygulamasını kullandığınızda hangi bilgilerin işlendiğini, kullanım amaçlarını, servis sağlayıcıları ve haklarınızı açıklar.",
  metaDescription:
    "Crossio: Custom Crosshair mobil uygulaması için gizlilik bildirimi, veri işleme amaçları, hizmet sağlayıcılar ve kullanıcı hakları.",
  sections: [
    {
      id: "isledigimiz-bilgiler",
      number: "1",
      title: "İşlediğimiz Bilgiler",
      shortTitle: "İşlenen Bilgiler",
      subsections: [
        {
          title: "Cihaz ve Uygulama Bilgileri",
          content:
            "Uygulama sürümü, cihaz modeli, işletim sistemi sürümü, dil ayarı, izin durumları, performans metrikleri ve kilitlenme (crash) tanılama verileri işlenebilir. Bu veriler uygulamanın istikrarını ve uyumluluğunu sağlamak amacıyla kullanılır.",
        },
        {
          title: "Tanımlayıcılar ve İletişim Bilgileri",
          content:
            "Firebase tarafından üretilen uygulama örneği veya anonim kullanıcı kimliği, RevenueCat App User ID, Firebase Cloud Messaging bildirim token'ı ve destek ya da hesap işlemlerinde isteğe bağlı olarak ilettiğiniz e-posta adresi işlenebilir. Kayıtlı bir e-posta adresi varsa bu bilgi abonelik müşteri kaydını eşleştirmek için RevenueCat'e müşteri özelliği olarak aktarılabilir. Bu tanımlayıcılar adınızı doğrudan içermese de cihazınızı veya uygulama kullanımınızı ayırt edebilir.",
        },
        {
          title: "Kullanım ve Etkileşim Bilgileri",
          content:
            "Kullanılan özellikler, görüntülenen ekranlar, nişangah seçme/kaydetme/sabitleme gibi genel olay türleri, izin ve servis tanılama sonuçları, cihaz üreticisi, Android sürümü, uygulama dili, kullanıcı türü, premium özellik etkileşimleri, reklam etkileşimleri ve abonelik akışları Firebase Analytics ile analiz edilebilir. Nişangah adı, tam nişangah tanımı ve yerel dosya yolu analitik hizmetlerine gönderilmez.",
        },
        {
          title: "Kullanım Segmentleri ve Kampanya Verileri",
          content:
            "Aktif gün, katmanı sabitleme sayısı, reklam veya ödeme ekranı etkileşimi, son etkinlik zamanı ve daha önce abone olunup olunmadığı gibi uygulama içi sayaçlar cihazda tutulabilir. Firebase Firestore'dan alınan kurallara göre yeni, aktif veya sadık kullanıcı gibi kategorik segmentler oluşturulabilir ve uygun abonelik teklifini belirlemek için RevenueCat'e müşteri özellikleri olarak gönderilebilir.",
        },
        {
          title: "Abonelik ve Satın Alma Bilgileri",
          content:
            "Premium üyelik durumu, satın alma/yenileme sonuçları ve işlem referansları işlenir. Kredi kartı veya finansal ödeme verileriniz kesinlikle tarafımızca saklanmaz; tüm işlemler Google Play güvencesindedir.",
        },
        {
          title: "Reklam Bilgileri",
          content:
            "Ücretsiz sürümde Google AdMob tarafından reklam sunumu, sıklık yönetimi ve sahtecilik önleme amacıyla reklam tanımlayıcısı (ADID), IP adresi ve yaklaşık bölge bilgisi işlenebilir. Kesin GPS konum izni talep edilmez.",
        },
        {
          title: "Galeriden Seçilen Görseller ve Yerel İçerik",
          content:
            "Özel crosshair oluştururken seçtiğiniz görseller tamamen cihazınızın yerel depolama alanında işlenir ve sunucularımıza yüklenmez.",
        },
        {
          title: "Destek Talepleri",
          content:
            "Destek talebi ilettiğinizde paylaştığınız mesaj, isteğe bağlı e-posta adresi ve teknik tanılama bilgileri yalnızca sorununuzu çözmek amacıyla kullanılır.",
        },
      ],
    },
    {
      id: "kullanim-amaclari",
      number: "2",
      title: "Bilgileri Kullanma Amaçlarımız",
      shortTitle: "Kullanım Amaçları",
      bullets: [
        "Uygulamanın ve crosshair katman özelliklerinin sorunsuz çalışmasını sağlamak.",
        "Premium abonelik haklarını doğrulamak ve satın almaları geri yüklemek.",
        "Hataları tespit etmek, güvenliği sağlamak ve kilitlenmeleri çözmek.",
        "Kullanıcı deneyimini geliştirmek ve özellik kullanım istatistiklerini anlamak.",
        "Uygun uygulama içi abonelik seçeneklerini göstermek.",
        "Reklamları sunmak, ölçmek ve ödüllü özellikleri çalıştırmak.",
        "Bildirim göndermek ve destek taleplerinize çözüm üretmek.",
        "Yasal yükümlülükleri yerine getirmek ve haklarımızı korumak.",
      ],
    },
    {
      id: "isleme-dayanaklari",
      number: "3",
      title: "İşleme Dayanakları",
      shortTitle: "İşleme Dayanakları",
      content:
        "Bilgiler; talep ettiğiniz hizmetlerin sağlanması, abonelik sözleşmesinin ifası, uygulamanın güvenliği ve optimizasyonuna ilişkin meşru menfaatlerimiz, yasal yükümlülükler ve mevzuatın gerektirdiği durumlarda açık rızanız doğrultusunda işlenir.",
    },
    {
      id: "hizmet-saglayicilar",
      number: "4",
      title: "Hizmet Sağlayıcılar ve Veri Paylaşımı",
      shortTitle: "Hizmet Sağlayıcılar",
      content:
        "Uygulama fonksiyonlarının yürütülmesi için güvenilir global altyapı sağlayıcıları ile çalışmaktayız:",
      tableData: {
        headers: ["Hizmet Sağlayıcı", "Kullanım Amacı", "Gizlilik Politikası"],
        rows: [
          [
            "Google Firebase",
            "Firebase Analytics kullanım ölçümü, Crashlytics kilitlenme raporları, Cloud Messaging bildirimleri, anonim kimlik doğrulama ve Firestore üzerinden uygulama/kampanya yapılandırması",
            "https://firebase.google.com/support/privacy",
          ],
          [
            "Google Play & AdMob",
            "Uygulama dağıtımı, lisanslama, mağaza faturalandırması, reklam gösterimi ve sahtecilik önleme",
            "https://policies.google.com/privacy",
          ],
          [
            "RevenueCat",
            "Abonelik yönetimi, satın alma doğrulama, Firebase uygulama örneği kimliği ve kategorik kullanım özelliklerine göre teklif hedefleme",
            "https://www.revenuecat.com/privacy/",
          ],
        ],
      },
      callout: {
        type: "success",
        title: "Kişisel Veri Satışı Yoktur",
        text: "Kişisel verileriniz hiçbir üçüncü tarafa doğrudan satılmaz, kiralanmaz veya izinsiz ticari amaçla devredilmez.",
      },
    },
    {
      id: "uygulama-izinleri",
      number: "5",
      title: "Uygulama İzinleri",
      shortTitle: "Uygulama İzinleri",
      subsections: [
        {
          title: "Diğer Uygulamaların Üzerinde Gösterim (Overlay)",
          content:
            "Seçtiğiniz nişangahın diğer uygulamaların üzerinde pasif bir görsel katman olarak gösterilebilmesi için gereken Android sistem iznidir. Katman dokunma veya tuş girdisi alamaz. Crossio diğer uygulamaların koduna, belleğine, dosyalarına, verilerine ya da ağ trafiğine bu izin üzerinden erişmez.",
        },
        {
          title: "Bildirim İzni",
          content:
            "Çalışan ön plan katman servisini görebilmeniz, kalıcı bildirimden durdurabilmeniz ve izin verirseniz uygulama bildirimleri alabilmeniz için kullanılır.",
        },
        {
          title: "Galeri / Medya Erişimi",
          content:
            "Cihazınızdaki bir görseli özel crosshair olarak içe aktarmak istediğinizde talep edilir.",
        },
        {
          title: "Pil Optimizasyonu Muafiyeti",
          content:
            "Android işletim sisteminin crosshair katman servisini arka planda sonlandırmasını önlemek için isteğe bağlıdır.",
        },
      ],
    },
    {
      id: "saklama-ve-silme",
      number: "6",
      title: "Veri Saklama ve Silme Hakları",
      shortTitle: "Saklama & Silme",
      content:
        "Cihazınızda tutulan crosshair ayarları ve yerel veriler siz silene veya uygulamayı kaldırana dek kalır. Sunucu tarafındaki teknik tanılama kayıtları yalnızca gerekli süre boyunca tutulur.",
      callout: {
        type: "info",
        title: "Veri Silme Talebi",
        text: "Verilerinizin ve hesabınızla ilişkili kayıtların silinmesini talep etmek için info@flappsio.com adresi üzerinden bizimle iletişime geçebilirsiniz.",
      },
    },
    {
      id: "guvenlik",
      number: "7",
      title: "Veri Güvenliği",
      shortTitle: "Veri Güvenliği",
      content:
        "Verilerinizi kayıp, yetkisiz erişim veya suiistimale karşı korumak için endüstri standardı şifreleme protokolleri ve güvenlik önlemleri uygulanmaktadır.",
    },
    {
      id: "iletisim",
      number: "8",
      title: "İletişim ve Geri Bildirim",
      shortTitle: "İletişim",
      content:
        "Gizlilik politikamıza ilişkin tüm soru, öneri ve hak talepleriniz için lütfen resmi e-posta adresimiz üzerinden bize ulaşın:",
    },
  ],
};

export const CROSSHAIR_PRIVACY_POLICY_EN: LegalDocument = {
  id: "crosshair-privacy-policy",
  title: "Privacy Notice",
  subtitle: "Crossio: Custom Crosshair Mobile App",
  lastUpdated: "September 5, 2026",
  publisher: "flappsio",
  contactEmail: "info@flappsio.com",
  summary:
    "This Privacy Notice explains what information is processed when you use the Crossio: Custom Crosshair application, the purposes of use, service providers, and your privacy rights.",
  metaDescription:
    "Privacy notice for Crossio: Custom Crosshair mobile app, covering data processing purposes, third-party service providers, and user privacy rights.",
  sections: [
    {
      id: "isledigimiz-bilgiler",
      number: "1",
      title: "Information We Process",
      shortTitle: "Processed Data",
      subsections: [
        {
          title: "Device and Application Information",
          content:
            "Application version, device model, operating system version, language setting, permission statuses, performance metrics, and crash diagnostic data may be processed. This information is used to ensure stability and compatibility across devices.",
        },
        {
          title: "Identifiers and Contact Information",
          content:
            "Firebase app instance or anonymous user ID, RevenueCat App User ID, Firebase Cloud Messaging notification token, and any optional email address you provide in support or account inquiries may be processed. If a registered email address exists, it may be sent as a customer attribute to RevenueCat to associate subscription records. While these identifiers do not directly contain your name, they distinguish your device or application instance.",
        },
        {
          title: "Usage and Interaction Data",
          content:
            "Features used, screens viewed, general event types (such as selecting, saving, or pinning crosshairs), permission and service diagnostic results, device manufacturer, Android version, app language, user cohort, premium interactions, ad interactions, and subscription flows may be analyzed with Firebase Analytics. Reticle names, full reticle definitions, and local file paths are never sent to analytics services.",
        },
        {
          title: "Usage Cohorts and Campaign Data",
          content:
            "In-app counters such as active days, layer activation counts, paywall or ad interactions, last activity timestamp, and prior subscription status may be kept on-device. Based on rules from Firebase Firestore, categorical cohorts (new, active, loyal) may be formed and sent to RevenueCat as customer attributes to present appropriate subscription offerings.",
        },
        {
          title: "Subscription and Purchase Information",
          content:
            "Premium status, purchase/renewal results, and transaction tokens are processed. We never collect or store your credit card or financial payment details; all transactions are secured through Google Play.",
        },
        {
          title: "Advertising Information",
          content:
            "In the free version, advertising identifiers (ADID), IP address, and coarse region may be processed via Google AdMob for ad serving, frequency capping, and fraud prevention. Precise GPS location permission is never requested.",
        },
        {
          title: "Imported Gallery Images & Local Content",
          content:
            "Images you select from your device gallery to create custom crosshairs are processed strictly within your device's local storage and are never uploaded to our servers.",
        },
        {
          title: "Support Inquiries",
          content:
            "When you submit a support request, the message, optional email address, and technical diagnostic details you provide are used exclusively to resolve your issue.",
        },
      ],
    },
    {
      id: "kullanim-amaclari",
      number: "2",
      title: "Purposes of Data Processing",
      shortTitle: "Purposes",
      bullets: [
        "Ensuring smooth operation of the application and crosshair overlay features.",
        "Validating premium subscription entitlements and restoring purchases.",
        "Diagnosing errors, ensuring application security, and resolving crashes.",
        "Enhancing user experience and analyzing aggregated feature usage statistics.",
        "Displaying relevant in-app subscription options.",
        "Delivering, measuring ads, and powering reward features.",
        "Sending operational notifications and responding to support inquiries.",
        "Fulfilling legal obligations and enforcing our rights.",
      ],
    },
    {
      id: "isleme-dayanaklari",
      number: "3",
      title: "Legal Bases for Processing",
      shortTitle: "Legal Bases",
      content:
        "Data is processed on legal grounds including the provision of requested services, performance of subscription agreements, legitimate interests in application security and optimization, compliance with legal obligations, and user consent where required by law.",
    },
    {
      id: "hizmet-saglayicilar",
      number: "4",
      title: "Service Providers and Data Sharing",
      shortTitle: "Service Providers",
      content:
        "We partner with trusted global infrastructure providers to deliver app functionality:",
      tableData: {
        headers: ["Service Provider", "Purpose of Use", "Privacy Policy"],
        rows: [
          [
            "Google Firebase",
            "Analytics measurement, Crashlytics diagnostics, Cloud Messaging, anonymous auth, and remote configuration",
            "https://firebase.google.com/support/privacy",
          ],
          [
            "Google Play & AdMob",
            "App distribution, licensing, in-app billing, and advertising delivery",
            "https://policies.google.com/privacy",
          ],
          [
            "RevenueCat",
            "Subscription management, purchase validation, and entitlement targeting",
            "https://www.revenuecat.com/privacy/",
          ],
        ],
      },
      callout: {
        type: "success",
        title: "No Sale of Personal Data",
        text: "Your personal data is never sold, rented, or transferred to third parties for unauthorized commercial purposes.",
      },
    },
    {
      id: "uygulama-izinleri",
      number: "5",
      title: "Application Permissions",
      shortTitle: "Permissions",
      subsections: [
        {
          title: "Display Over Other Apps (Overlay)",
          content:
            "Required Android system permission to render your selected reticle as a passive visual layer. The layer cannot receive touch or key input. Crossio never accesses other applications' code, memory, files, data, or network traffic through this permission.",
        },
        {
          title: "Notification Permission",
          content:
            "Used to show the foreground service notification allowing you to stop the layer at any time, and to deliver optional app updates if permitted.",
        },
        {
          title: "Gallery / Media Access",
          content:
            "Requested only when you choose to import an image from your device as a custom crosshair.",
        },
        {
          title: "Battery Optimization Exemption",
          content:
            "Optional setting to prevent the Android operating system from prematurely terminating the background overlay service on aggressive power-saving devices.",
        },
      ],
    },
    {
      id: "saklama-ve-silme",
      number: "6",
      title: "Data Retention & Deletion Rights",
      shortTitle: "Retention & Deletion",
      content:
        "Crosshair preferences and local data stored on your device remain until you delete them or uninstall the app. Server-side technical diagnostic logs are retained only for as long as strictly necessary.",
      callout: {
        type: "info",
        title: "Data Deletion Requests",
        text: "To request deletion of your data or records associated with your installation, please contact us at info@flappsio.com.",
      },
    },
    {
      id: "guvenlik",
      number: "7",
      title: "Data Security",
      shortTitle: "Security",
      content:
        "Industry-standard encryption protocols and security safeguards are implemented to protect your information against unauthorized access, loss, or misuse.",
    },
    {
      id: "iletisim",
      number: "8",
      title: "Contact & Inquiries",
      shortTitle: "Contact",
      content:
        "For any questions, suggestions, or privacy rights requests regarding our Privacy Notice, please reach out to our official email address:",
    },
  ],
};

export const CROSSHAIR_PRIVACY_POLICY: LegalDocument = CROSSHAIR_PRIVACY_POLICY_TR;

export const CROSSHAIR_TERMS_OF_USE_TR: LegalDocument = {
  id: "crosshair-terms-of-use",
  title: "Kullanım Koşulları",
  subtitle: "Crossio: Custom Crosshair Mobil Uygulaması",
  lastUpdated: "5 Eylül 2026",
  publisher: "flappsio",
  contactEmail: "info@flappsio.com",
  summary:
    "Crossio: Custom Crosshair uygulamasını kullanarak bu Kullanım Koşulları'nı kabul etmiş sayılırsınız. Lisans kapsamı, üçüncü taraflardan bağımsızlık, abonelik kuralları ve sorumluluk sınırları aşağıda belirtilmiştir.",
  metaDescription:
    "Crossio: Custom Crosshair mobil uygulaması için kullanım lisansı, bağımsızlık beyanı, abonelik ve iade kuralları.",
  sections: [
    {
      id: "hizmet-ve-lisans",
      number: "1",
      title: "Hizmetin Kapsamı ve Lisans",
      shortTitle: "Kapsam & Lisans",
      subsections: [
        {
          title: "Sunulan Hizmet",
          content:
            "Uygulama; kullanıcılara mobil cihazlarda nişangah (crosshair) tasarlama, özelleştirme, hazır nişangah kütüphanelerinden yararlanma ve desteklenen Android cihazlarda ekran üstü katman (overlay) olarak görüntüleme imkanı sağlar.",
        },
        {
          title: "Kullanım Lisansı",
          content:
            "flappsio, size uygulamayı yalnızca kişisel ve ticari olmayan amaçlarla kullanmanız için geri alınabilir, devredilemez, münhasır olmayan sınırlı bir lisans tanır.",
        },
        {
          title: "Kısıtlamalar",
          content:
            "Kaynak kodları kopyalamak, tersine mühendislik uygulamak, güvenlik/lisanslama mekanizmalarını atlatmak, yetkisiz bot/otomasyon kullanmak veya üçüncü taraf haklarını ihlal etmek kesinlikle yasaktır.",
        },
      ],
    },
    {
      id: "bagimsizlik-beyani",
      number: "2",
      title: "Fikri Mülkiyet ve Bağımsızlık Beyanı",
      shortTitle: "Bağımsızlık Beyanı",
      callout: {
        type: "warning",
        title: "Bağımsız Uygulama",
        text: "Crossio bağımsız bir Android yardımcı aracıdır. Herhangi bir üçüncü taraf oyun geliştiricisi, yayıncısı veya platformuyla bağlı, onlar tarafından desteklenen, sponsor olunan ya da onaylanan bir ürün değildir.",
      },
      content:
        "Uygulama kaynak kodları, arayüz tasarımları ve flappsio tarafından oluşturulan içeriklerin tüm hakları flappsio'ya aittir. Android ve Google Play, Google LLC'nin ticari markalarıdır.",
    },
    {
      id: "abonelik-ve-odemeler",
      number: "3",
      title: "Premium Abonelikler, Denemeler ve İadeler",
      shortTitle: "Abonelik & Ödemeler",
      subsections: [
        {
          title: "Ödeme Kanalları",
          content:
            "Uygulama içi satın alma ve premium abonelikler münhasıran Google Play Store faturalandırma sistemi üzerinden gerçekleşir. flappsio doğrudan kredi kartı bilgisi toplamaz.",
        },
        {
          title: "Otomatik Yenileme",
          content:
            "Abonelikler geçerli dönemin bitiminden en az 24 saat önce iptal edilmediği sürece seçilen periyot (haftalık, aylık, yıllık) üzerinden otomatik olarak yenilenir.",
        },
        {
          title: "Ücretsiz Deneme Süreçleri",
          content:
            "Sunulan ücretsiz deneme hakları süre bitiminde iptal edilmediğinde standart abonelik tarifesine dönüşebilir.",
        },
        {
          title: "İptal ve İade Politikası",
          content:
            "Aboneliğinizi Google Play Store > Profil > Ödemeler ve Abonelikler menüsünden dilediğiniz an iptal edebilirsiniz. İade talepleri Google Play standart iade politikaları kapsamında Google Play tarafından sonuçlandırılır.",
        },
      ],
    },
    {
      id: "overlay-ve-oyun-uyumlulugu",
      number: "4",
      title: "Pasif Ekran Üstü Katman (Overlay)",
      shortTitle: "Pasif Overlay",
      content:
        "Crossio'nun sunduğu ana nişangah, kullanıcı tarafından başlatılan pasif bir Android görsel katmanıdır ve dokunma veya tuş girdisi alamaz. Kullanıcı etkinleştirirse görünürlük ve konum ayarları için ayrı, dokunulabilir bir mini kontrol katmanı gösterilebilir; otomatik başlatma seçeneği de uygulama açıldığında seçilmiş katmanı yeniden başlatabilir. Uygulama diğer uygulamaların koduna, belleğine, dosyalarına, verilerine veya ağ trafiğine erişmez; otomatik nişan alma, otomatik dokunma, makro ya da oyun otomasyonu sağlamaz.",
      callout: {
        type: "info",
        title: "Üçüncü Taraf Kuralları",
        text: "Bazı oyunlar ve rekabetçi platformlar görsel katmanları kısıtlayabilir. Kullandığınız hizmetin kurallarını kontrol etmek sizin sorumluluğunuzdadır. Crossio hiçbir üçüncü taraf oyunun veya platformun bu kullanıma izin verdiğini garanti etmez.",
      },
    },
    {
      id: "reklamlar",
      number: "5",
      title: "Reklamlar ve Dış Bağlantılar",
      shortTitle: "Reklamlar",
      content:
        "Uygulamanın ücretsiz sürümlerinde Google AdMob aracılığıyla reklamlar yayınlanabilir. Reklamlar üzerinden yönlendirilen üçüncü taraf sitelerin içerik veya gizlilik politikalarından flappsio sorumlu değildir.",
    },
    {
      id: "garanti-ve-sorumluluk",
      number: "6",
      title: "Garanti Reddi ve Sorumluluk Sınırı",
      shortTitle: "Garanti & Sorumluluk",
      content:
        "Uygulama 'OLDUĞU GİBİ' (AS IS) ve 'MEVCUT OLDUĞU ŞEKİLDE' sunulmaktadır. flappsio uygulamanın kesintisiz veya her donanım kombinasyonunda hatasız çalışacağını garanti etmez. Mevzuatın izin verdiği azami ölçüde dolaylı veya arızi zararlardan sorumlu tutulamaz.",
    },
    {
      id: "kosul-degisiklikleri",
      number: "7",
      title: "Koşullarda Değişiklik ve Fesih",
      shortTitle: "Değişiklik & Fesih",
      content:
        "flappsio kullanım koşullarını güncelleme hakkını saklı tutar. Güncellenen metin bu sayfada yayımlandığı anda geçerlilik kazanır. Uygulamayı cihazınızdan kaldırarak kullanım sözleşmesini dilediğiniz an sonlandırabilirsiniz.",
    },
  ],
};

export const CROSSHAIR_TERMS_OF_USE_EN: LegalDocument = {
  id: "crosshair-terms-of-use",
  title: "Terms of Use",
  subtitle: "Crossio: Custom Crosshair Mobile App",
  lastUpdated: "September 5, 2026",
  publisher: "flappsio",
  contactEmail: "info@flappsio.com",
  summary:
    "By using the Crossio: Custom Crosshair application, you agree to these Terms of Use. The scope of license, third-party independence, subscription terms, and limitations of liability are outlined below.",
  metaDescription:
    "Terms of Use for Crossio: Custom Crosshair mobile app covering license, independence disclosure, subscription, and refund policies.",
  sections: [
    {
      id: "hizmet-ve-lisans",
      number: "1",
      title: "Scope of Service & License",
      shortTitle: "Scope & License",
      subsections: [
        {
          title: "Service Provided",
          content:
            "The application provides users with the ability to design, customize, and choose crosshair visual reticles on mobile devices and display them as an overlay on supported Android devices.",
        },
        {
          title: "License to Use",
          content:
            "flappsio grants you a revocable, non-exclusive, non-transferable, limited license to use the application solely for personal, non-commercial purposes.",
        },
        {
          title: "Restrictions",
          content:
            "Copying source code, reverse engineering, bypassing security or licensing mechanisms, deploying unauthorized bots/automation, or infringing upon third-party intellectual property is strictly prohibited.",
        },
      ],
    },
    {
      id: "bagimsizlik-beyani",
      number: "2",
      title: "Intellectual Property & Independence Disclosure",
      shortTitle: "Independence",
      callout: {
        type: "warning",
        title: "Independent Utility",
        text: "Crossio is an independent Android utility tool. It is not affiliated with, endorsed by, sponsored by, or approved by any third-party game developer, publisher, or platform.",
      },
      content:
        "All rights to the application source code, interface designs, and content created by flappsio belong to flappsio. Android and Google Play are trademarks of Google LLC.",
    },
    {
      id: "abonelik-ve-odemeler",
      number: "3",
      title: "Premium Subscriptions, Trials & Refunds",
      shortTitle: "Billing & Subscriptions",
      subsections: [
        {
          title: "Payment Channels",
          content:
            "In-app purchases and premium subscriptions are processed exclusively through Google Play Store billing. flappsio never collects or stores credit card details directly.",
        },
        {
          title: "Automatic Renewal",
          content:
            "Subscriptions automatically renew for the chosen billing period (weekly, monthly, annual) unless cancelled at least 24 hours before the end of the current billing cycle.",
        },
        {
          title: "Free Trial Periods",
          content:
            "Any offered free trial access will convert to a standard paid subscription unless cancelled before the trial period concludes.",
        },
        {
          title: "Cancellation & Refund Policy",
          content:
            "You can cancel your subscription at any time via Google Play Store > Profile > Payments & Subscriptions. Refund requests are subject to Google Play standard refund policies and evaluated by Google Play.",
        },
      ],
    },
    {
      id: "overlay-ve-oyun-uyumlulugu",
      number: "4",
      title: "Passive Visual Overlay & Platform Compatibility",
      shortTitle: "Passive Overlay",
      content:
        "The crosshair reticle provided by Crossio is a passive Android visual layer initiated explicitly by the user and cannot receive touch or key input. If enabled by the user, a separate touchable mini control layer may be shown to adjust visibility and positioning; an optional autostart setting may also restart the selected reticle when the app opens. Crossio does not access any other application's code, memory, files, data, or network traffic, and does not provide auto-aim, auto-tap, macros, or gameplay automation.",
      callout: {
        type: "info",
        title: "Third-Party Rules",
        text: "Certain games and competitive platforms may restrict visual overlay tools. It is your sole responsibility to review and adhere to the terms and rules of the games or platforms you use. Crossio does not warrant or guarantee that any third-party game allows overlay usage.",
      },
    },
    {
      id: "reklamlar",
      number: "5",
      title: "Advertisements & External Links",
      shortTitle: "Advertisements",
      content:
        "The free version of the application may display advertisements served via Google AdMob. flappsio is not responsible for the content, privacy practices, or policies of third-party websites or services reached through advertisements.",
    },
    {
      id: "garanti-ve-sorumluluk",
      number: "6",
      title: "Disclaimer of Warranties & Limitation of Liability",
      shortTitle: "Warranty & Liability",
      content:
        "The application is provided on an 'AS IS' and 'AS AVAILABLE' basis without warranty of any kind. flappsio does not guarantee uninterrupted or error-free operation across all hardware configurations. To the maximum extent permitted by applicable law, flappsio shall not be liable for indirect, incidental, or consequential damages.",
    },
    {
      id: "kosul-degisiklikleri",
      number: "7",
      title: "Modifications to Terms & Termination",
      shortTitle: "Changes & Termination",
      content:
        "flappsio reserves the right to revise these Terms of Use at any time. Updated terms become effective immediately upon being posted to this page. You may terminate this agreement at any time by uninstalling the application from your device.",
    },
  ],
};

export const CROSSHAIR_TERMS_OF_USE: LegalDocument = CROSSHAIR_TERMS_OF_USE_TR;
