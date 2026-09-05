import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState } from "@/context/CrosshairStateContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  ShieldCheck,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Share2,
  Check,
  ZoomIn,
  X,
  ExternalLink,
} from "lucide-react";

export const CrosshairPlayStoreShowcase: React.FC = () => {
  const { t, isTr } = useLanguage();
  const { activeColorOption } = useCrosshairState();
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const trScreenshots = [
    {
      src: "/assets/images/playstore/tr/2.png",
      title: "Hassas Konumlandırma",
      subtitle: "Boyut, konum ve dönüş ayarları",
    },
    {
      src: "/assets/images/playstore/tr/4.png",
      title: "Kişiselleştirilebilir Ana Sayfa",
      subtitle: "Kartları kullanımınıza göre sıralayın",
    },
    {
      src: "/assets/images/playstore/tr/5.png",
      title: "Nişangah Editörü",
      subtitle: "Şekil, renk, boyut ve opaklık ayarları",
    },
  ];

  const enScreenshots = [
    {
      src: "/assets/images/playstore/en/2.png",
      title: "Precision Positioning",
      subtitle: "Size, position, and rotation controls",
    },
    {
      src: "/assets/images/playstore/en/4.png",
      title: "Customizable Home Screen",
      subtitle: "Reorder cards to match your workflow",
    },
    {
      src: "/assets/images/playstore/en/5.png",
      title: "Crosshair Editor",
      subtitle: "Shape, color, size, and opacity controls",
    },
  ];

  const screenshots = isTr ? trScreenshots : enScreenshots;

  const handleShare = () => {
    const url = "https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("playstore-screens-container");
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      const newIdx =
        direction === "left"
          ? Math.max(0, scrollIndex - 1)
          : Math.min(screenshots.length - 1, scrollIndex + 1);
      setScrollIndex(newIdx);
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
                  <span>{isTr ? "Google Play'den Yükle" : "Install on Google Play"}</span>
                </a>
              </Button>

              <Button
                variant="outline"
                onClick={handleShare}
                className="rounded-2xl h-12 px-4 border-border/80 bg-secondary/40 hover:bg-secondary text-xs font-semibold gap-1.5"
                title={isTr ? "Google Play Bağlantısını Kopyala" : "Copy Google Play Link"}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-primary" />
                    <span>{isTr ? "Kopyalandı" : "Copied"}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-muted-foreground" />
                    <span>{isTr ? "Paylaş" : "Share"}</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Stable capability facts — avoids stale store metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1 text-base sm:text-lg font-extrabold text-foreground">
                <Smartphone className="w-4 h-4 text-primary" />
                <span>Android</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{isTr ? "Görsel Katman" : "Visual Layer"}</p>
            </div>

            <div className="space-y-1 border-l border-border/60">
              <div className="flex items-center justify-center gap-1 text-base sm:text-lg font-extrabold text-foreground">
                <Check className="w-4 h-4 text-primary" />
                <span>{isTr ? "Açık Başlatma" : "Explicit Start"}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{isTr ? "Kullanıcı Kontrollü" : "User Controlled"}</p>
            </div>

            <div className="space-y-1 border-l border-border/60">
              <div className="flex items-center justify-center gap-1 text-base sm:text-lg font-extrabold text-foreground">
                <Download className="w-4 h-4 text-primary" />
                <span>PNG</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{isTr ? "İçe Aktarma" : "Local Import"}</p>
            </div>

            <div className="space-y-1 border-l border-border/60">
              <div className="flex items-center justify-center gap-1 text-base sm:text-lg font-extrabold text-foreground">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{isTr ? "Pasif" : "Passive"}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{isTr ? "Girdi Otomasyonu Yok" : "No Input Automation"}</p>
            </div>
          </div>
        </div>

        {/* Screenshot Carousel Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground">
              {isTr ? "Ekran Görüntüleri" : "Screenshots"}
            </span>
            <span className="text-xs text-muted-foreground">
              ({screenshots.length} {isTr ? "Görsel" : "Images"})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="p-2 rounded-xl bg-card border border-border/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Previous Screenshot"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              className="p-2 rounded-xl bg-card border border-border/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Next Screenshot"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Screenshot Scroll Container */}
        <div
          id="playstore-screens-container"
          className="flex items-center gap-5 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {screenshots.map((s, idx) => (
            <div
              key={idx}
              className="snap-center shrink-0 w-[240px] sm:w-[270px] group relative rounded-3xl overflow-hidden bg-card/60 border border-border/80 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(s.src)}
            >
              {/* Image Frame */}
              <div className="relative aspect-[9/16] bg-black/40 overflow-hidden">
                <img
                  src={s.src}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div className="p-3 rounded-full bg-white/20 text-white border border-white/40 shadow-lg scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-mono text-white/90 border border-white/10">
                  #{idx + 1}
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="p-3.5 bg-card/90 border-t border-border/60 space-y-0.5">
                <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                  {s.title}
                </h4>
                <p className="text-[11px] text-muted-foreground truncate">{s.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Graphic Banner Card */}
        <div className="mt-8 p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-card via-card/80 to-secondary/40 border border-border/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <Badge variant="brand" className="text-[10px] font-mono">
              {isTr ? "GOOGLE PLAY'DE MEVCUT" : "AVAILABLE ON GOOGLE PLAY"}
            </Badge>
            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
              {isTr ? "Seçin, özelleştirin ve açıkça başlatın." : "Choose, customize, and start explicitly."}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {isTr
                ? "Katman yalnızca siz başlattığınızda görünür ve kalıcı bildirimden durdurulabilir."
                : "The layer appears only after you start it and can be stopped from the persistent notification."}
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
              <span>{isTr ? "Mağaza Sayfasını Aç" : "Open Store Page"}</span>
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
            className="relative max-w-sm sm:max-w-md w-full bg-card rounded-3xl overflow-hidden border border-border/80 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage}
              alt="Play Store Preview Full"
              className="w-full h-auto object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
};
