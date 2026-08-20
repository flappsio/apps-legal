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
    storeUrl?: string;
  };
  highlights: string[];
}

export const APPS_DATA: LegalApp[] = [
  {
    id: "crosshair-valo",
    name: "Crosshair Valo",
    shortName: "Crosshair Valo",
    category: "Oyun & Yardımcı Araçlar",
    description:
      "Özelleştirilebilir ekran üstü nişangah (crosshair) katmanı, hazır profesyonel profiller ve nişangah tasarım editörü sunan mobil yardımcı uygulama.",
    iconUrl: "/assets/images/logo.png",
    badge: {
      text: "Aktif • Mobil",
      variant: "brand",
    },
    lastUpdated: "18 Ağustos 2026",
    version: "v1.2.0+",
    links: {
      privacyPolicy: "/crosshair/privacy-policy",
      termsOfUse: "/crosshair/terms-of-use",
      storeUrl: "https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair",
    },
    highlights: [
      "Kişisel verileriniz satılmaz veya yetkisiz paylaşılmaz.",
      "Özel crosshair görselleriniz cihazınızda yerel işlenir.",
      "Google Play güvencesiyle şeffaf abonelik yönetimi.",
    ],
  },
];
