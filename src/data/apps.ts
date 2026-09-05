export interface LegalApp {
  id: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  iconUrl: string;
  badge: {
    text: string;
    variant: "brand" | "success" | "warning" | "default";
  };
  lastUpdated: string;
  version: string;
  links: {
    privacyPolicy: string;
    termsOfUse: string;
    showcase?: string;
    storeUrl?: string;
  };
  highlights: string[];
}

export const APPS_DATA: LegalApp[] = [
  {
    id: "crossio-custom-crosshair",
    name: "Crossio: Custom Crosshair",
    shortName: "Crossio",
    category: "Araçlar & Kişiselleştirme",
    description:
      "Android için özelleştirilebilir, kullanıcı tarafından başlatılan pasif nişangah katmanı; hazır tasarımlar, yerel görsel içe aktarma ve görünüm editörü.",
    iconUrl: "/assets/images/playstore/icons/crosshair_playstore_512.png",
    badge: {
      text: "Aktif • Google Play",
      variant: "brand",
    },
    lastUpdated: "Eylül 2026",
    version: "v1.3.0+",
    links: {
      showcase: "/crosshair",
      privacyPolicy: "/crosshair/privacy-policy",
      termsOfUse: "/crosshair/terms-of-use",
      storeUrl: "https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair",
    },
    highlights: [
      "Kişisel verileriniz satılmaz veya yetkisiz paylaşılmaz.",
      "Özel crosshair görselleriniz cihazınızda yerel işlenir.",
      "Katman dokunma veya tuş girdisi almaz ve uygulama otomasyon özelliği sunmaz.",
    ],
  },
];
