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

export const CROSSHAIR_PRIVACY_POLICY: LegalDocument = {
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
            "Google Mobile Ads / AdMob",
            "Kişiselleştirilmiş/kişiselleştirilmemiş reklam gösterimi ve sahtecilik önleme",
            "https://policies.google.com/privacy",
          ],
          [
            "RevenueCat",
            "Abonelik yönetimi, satın alma doğrulama, Firebase uygulama örneği kimliği ve kategorik kullanım özelliklerine göre teklif hedefleme",
            "https://www.revenuecat.com/privacy/",
          ],
          [
            "Google Play Store",
            "Ödeme, faturalandırma, lisans ve uygulama dağıtım altyapısı",
            "https://policies.google.com/privacy",
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

export const CROSSHAIR_TERMS_OF_USE: LegalDocument = {
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
    {
      id: "uygulanacak-hukuk",
      number: "8",
      title: "Uygulanacak Hukuk ve Yetkili Mahkeme",
      shortTitle: "Uygulanacak Hukuk",
      content:
        "Bu Koşullar Türkiye Cumhuriyeti kanunlarına tabidir. Doğabilecek her türlü uyuşmazlıkta Türkiye Cumhuriyeti mahkemeleri ve icra daireleri yetkilidir.",
    },
  ],
};
