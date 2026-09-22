import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState } from "@/context/CrosshairStateContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SocialCards from "@/components/ui/card-fan-carousel";
import {
  Download,
  ShieldCheck,
  Smartphone,
  Share2,
  Check,
  ZoomIn,
  X,
  ExternalLink,
  Image as ImageIcon,
  MessageCircle,
  Star,
} from "lucide-react";

export const CrosshairPlayStoreShowcase: React.FC = () => {
  const { t, isTr } = useLanguage();
  const { activeColorOption } = useCrosshairState();
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const screenshotNames = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const screenshotDescriptions: Record<string, string> = isTr ? {
    "3": "Nişangah koleksiyonunu keşfet, tarzına uygun tasarımı seç.",
    "4": "Galerinden PNG veya JPG görseli içe aktar, kendi nişangahını ekle.",
    "5": "Oluşturduğun nişangahı PNG olarak kaydet veya paylaş.",
    "6": "Nişangahının boyutunu, konumunu, açısını ve opaklığını özelleştir.",
    "7": "Açık ve koyu tema arasında sana uygun görünümü seç.",
    "8": "Ana ekrandan nişangahını seç, rengini ayarla ve kullanmaya başla.",
  } : {
    "3": "Explore the crosshair collection and choose a design that suits your style.",
    "4": "Import a PNG or JPG from your gallery to add your own crosshair.",
    "5": "Save your crosshair as a PNG or share it with others.",
    "6": "Customize your crosshair’s size, position, rotation, and opacity.",
    "7": "Choose the look that suits you with light and dark themes.",
    "8": "Choose your crosshair, adjust its color, and get started from the home screen.",
  };
  const screenshots = screenshotNames
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name, index) => ({
      src: `/assets/images/playstore/${isTr ? "tr" : "en"}/${name}.png`,
      title: `${t("store.appName")} ${index + 1}`,
      description: screenshotDescriptions[name],
      subtitle: t("store.subtitle"),
      orientation: Number(name) <= 2 ? "landscape" : "portrait",
    }));
  const landscapeScreenshots = screenshots.filter((s) => s.orientation === "landscape");
  const portraitScreenshots = screenshots.filter((s) => s.orientation === "portrait");
  const selectedScreenshot = screenshots.find((s) => s.src === selectedImage);

  const handleShare = () => {
    const url = "https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="py-16 sm:py-24 border-t border-border/40 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ backgroundColor: activeColorOption.hex }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {t("store.badge")}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {t("store.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("store.subtitle")}
          </p>
        </div>

        {/* Google Play Store Card */}
        <div className="p-6 sm:p-8 rounded-[32px] bg-card/85 border border-border/80 shadow-2xl backdrop-blur-xl mb-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-border/60">
            {/* Left: App Icon & Details */}
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-secondary/80 border-2 border-border/80 shadow-lg p-2 shrink-0 overflow-hidden group">
                <img
                  src="/assets/images/playstore/icons/crosshair_playstore_512.png"
                  alt="Crosshair App Icon"
                  className="w-full h-full object-contain rounded-2xl transition-transform group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to logo.png
                    (e.target as HTMLImageElement).src = "/assets/images/logo.png";
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight leading-tight">
                    {t("store.appName")}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-primary font-bold">
                  <span>flappsio</span>
                  <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-muted-foreground font-normal">•</span>
                  <span className="text-muted-foreground font-normal">
                    {t("store.appCategory")}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-1">
                  {t("store.appDesc")}
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <Button
                asChild
                className="flex-1 lg:flex-none text-black font-extrabold rounded-2xl h-12 px-6 gap-2 shadow-lg hover:scale-105 transition-all text-xs sm:text-sm"
                style={{ backgroundColor: activeColorOption.hex }}
              >
                <a
                  href="https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t("store.installPlayStore")}</span>
                </a>
              </Button>

              <Button
                variant="outline"
                onClick={handleShare}
                className="rounded-2xl h-12 px-4 border-border/80 bg-secondary/40 hover:bg-secondary text-xs font-semibold gap-1.5"
                title={t("store.copyLinkTitle")}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-primary" />
                    <span>{t("store.copied")}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-muted-foreground" />
                    <span>{t("store.share")}</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Current Google Play listing metrics */}
          <div className="grid grid-cols-3 divide-x divide-border/60 border-b border-border/60 py-5 text-center">
            <div className="space-y-1 px-2">
              <div className="flex items-center justify-center gap-1 text-xl sm:text-2xl font-extrabold text-foreground">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-primary" />
                <span>{isTr ? "4,5" : "4.5"}</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground">{t("store.rating")}</p>
            </div>

            <div className="space-y-1 px-2">
              <div className="flex items-center justify-center gap-1 text-xl sm:text-2xl font-extrabold text-foreground">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span>318</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground">{t("store.totalReviews")}</p>
            </div>

            <div className="space-y-1 px-2">
              <div className="flex items-center justify-center gap-1 text-xl sm:text-2xl font-extrabold text-foreground">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span>{isTr ? "50 B+" : "50K+"}</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground">{t("store.totalDownloads")}</p>
            </div>
          </div>

          {/* Stable capability facts — avoids stale store metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1 text-base sm:text-lg font-extrabold text-foreground">
                <Smartphone className="w-4 h-4 text-primary" />
                <span>Android</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{t("store.visualLayer")}</p>
            </div>

            <div className="space-y-1 border-l border-border/60">
              <div className="flex items-center justify-center gap-1 text-base sm:text-lg font-extrabold text-foreground">
                <Check className="w-4 h-4 text-primary" />
                <span>{t("store.explicitStart")}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{t("store.userControlled")}</p>
            </div>

            <div className="space-y-1 border-l border-border/60">
              <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-extrabold text-foreground">
                <ImageIcon className="w-4 h-4 text-primary" />
                <span>JPG / PNG</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{t("store.localImport")}</p>
            </div>

            <div className="space-y-1 border-l border-border/60">
              <div className="flex items-center justify-center gap-1 text-base sm:text-lg font-extrabold text-foreground">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t("store.passive")}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{t("store.noInputAutomation")}</p>
            </div>
          </div>
        </div>

        {/* Screenshot Carousel Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground">
              {t("store.screenshotsTitle")}
            </span>
            <span className="text-xs text-muted-foreground">
              ({screenshots.length} {t("store.imagesCount")})
            </span>
          </div>

        </div>

        <div id="playstore-screens-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {landscapeScreenshots.map((s) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setSelectedImage(s.src)}
                aria-label={isTr ? `${s.title} — büyüt` : `${s.title} — enlarge`}
                className="relative block w-full overflow-hidden rounded-2xl border border-border/80 bg-card cursor-zoom-in transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <img
                  src={s.src}
                  alt={s.title}
                  loading="lazy"
                  className="block aspect-video w-full object-contain"
                />
                <span aria-hidden="true" className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white">
                  <ZoomIn className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
          <SocialCards
            cards={portraitScreenshots.map((s) => ({ imgUrl: s.src, alt: s.title, description: s.description }))}
            onSelect={(card) => setSelectedImage(card.imgUrl)}
            label={t("store.screenshotsTitle")}
            previousLabel={isTr ? "Önceki görsel" : "Previous screenshot"}
            nextLabel={isTr ? "Sonraki görsel" : "Next screenshot"}
          />
        </div>
        {/* Feature Graphic Banner Card */}
        <div className="mt-8 p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-card via-card/80 to-secondary/40 border border-border/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <Badge variant="brand" className="text-[10px] font-mono">
              {t("store.bannerBadge")}
            </Badge>
            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
              {t("store.bannerTitle")}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t("store.bannerDesc")}
            </p>
          </div>

          <Button
            asChild
            className="text-black font-extrabold rounded-2xl h-12 px-6 gap-2 shrink-0 shadow-lg hover:scale-105 transition-all text-xs"
            style={{ backgroundColor: activeColorOption.hex }}
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t("store.openStorePage")}</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Lightbox Modal for Full Screenshot View */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className={`relative w-full bg-card rounded-3xl overflow-hidden border border-border/80 shadow-2xl ${selectedScreenshot?.orientation === "landscape" ? "max-w-5xl" : "max-w-sm sm:max-w-md"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              aria-label={isTr ? "Önizlemeyi kapat" : "Close preview"}
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage}
              alt={selectedScreenshot?.title || t("store.screenshotsTitle")}
              className="w-full h-auto object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
};
