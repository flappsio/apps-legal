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
    id: "crosshair-valo",
    name: "Crosshair: Valorant & FPS Aim",
    shortName: "Crosshair",
    category: "Araçlar & Mobil FPS Yardımcısı",
    description:
      "Android mobil FPS ve aksiyon oyunları için özelleştirilebilir ekran üstü nişangah (crosshair) katmanı, hazır espor profilleri ve piksel editörü.",
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
      "Google Play güvencesiyle %100 güvenli ve ban korumalı katman.",
    ],
  },
];
