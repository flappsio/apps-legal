import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState, CrosshairShape } from "@/context/CrosshairStateContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Check, ArrowRight, Sparkles } from "lucide-react";
import { exportCrosshairToPng } from "@/lib/exportCrosshairPng";

interface GalleryItem {
  id: string;
  name: string;
  category: "cross" | "dot" | "circle" | "t-cross" | "special";
  shape: CrosshairShape;
  color: string;
  size: number;
  thickness: number;
  gap: number;
  outline: boolean;
  centerDot: boolean;
  descriptionKey: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "classic-green",
    name: "Classic Cross",
    category: "cross",
    shape: "cross",
    color: "#69F0AE",
    size: 6,
    thickness: 2,
    gap: 3,
    outline: true,
    centerDot: false,
    descriptionKey: "gallery.descClassic",
  },
  {
    id: "cs-style-cyan",
    name: "CS Style Green",
    category: "cross",
    shape: "cross",
    color: "#00E5FF",
    size: 7,
    thickness: 2,
    gap: 5,
    outline: true,
    centerDot: false,
    descriptionKey: "gallery.descCsStyle",
  },
  {
    id: "precision-neon",
    name: "Precision Target",
    category: "cross",
    shape: "precision",
    color: "#00FF66",
    size: 6,
    thickness: 2,
    gap: 2,
    outline: true,
    centerDot: true,
    descriptionKey: "gallery.descPrecision",
  },
  {
    id: "pro-dot-cyan",
    name: "Micro Dot",
    category: "dot",
    shape: "dot",
    color: "#00E5FF",
    size: 3,
    thickness: 3,
    gap: 0,
    outline: true,
    centerDot: true,
    descriptionKey: "gallery.descDot",
  },
  {
    id: "amber-dot",
    name: "Apex Amber Dot",
    category: "dot",
    shape: "dot",
    color: "#FFB300",
    size: 4,
    thickness: 4,
    gap: 0,
    outline: true,
    centerDot: true,
    descriptionKey: "gallery.descDot",
  },
  {
    id: "sniper-t-yellow",
    name: "Open T-Style",
    category: "t-cross",
    shape: "t-cross",
    color: "#FF9100",
    size: 7,
    thickness: 2,
    gap: 2,
    outline: true,
    centerDot: true,
    descriptionKey: "gallery.descT",
  },
  {
    id: "heavy-t-red",
    name: "Heavy Tactical T",
    category: "t-cross",
    shape: "t-cross",
    color: "#FF4655",
    size: 8,
    thickness: 3,
    gap: 3,
    outline: true,
    centerDot: false,
    descriptionKey: "gallery.descHeavyT",
  },
  {
    id: "combat-circle-magenta",
    name: "Soft Circle",
    category: "circle",
    shape: "circle",
    color: "#8B5CF6",
    size: 8,
    thickness: 2,
    gap: 4,
    outline: true,
    centerDot: false,
    descriptionKey: "gallery.descCircle",
  },
  {
    id: "holo-ring-cyan",
    name: "Holographic Ring",
    category: "circle",
    shape: "circle",
    color: "#00E5FF",
    size: 9,
    thickness: 2,
    gap: 5,
    outline: true,
    centerDot: true,
    descriptionKey: "gallery.descHoloRing",
  },
  {
    id: "diamond-spec-red",
    name: "Diamond Spec",
    category: "special",
    shape: "diamond",
    color: "#FF4655",
    size: 6,
    thickness: 2,
    gap: 3,
    outline: true,
    centerDot: true,
    descriptionKey: "gallery.descDiamond",
  },
  {
    id: "tactical-diamond",
    name: "Tactical Diamond",
    category: "special",
    shape: "diamond",
    color: "#69F0AE",
    size: 7,
    thickness: 2,
    gap: 2,
    outline: true,
    centerDot: false,
    descriptionKey: "gallery.descTacticalDiamond",
  },
  {
    id: "cqb-box-white",
    name: "CQB Box",
    category: "special",
    shape: "box",
    color: "#FFFFFF",
    size: 6,
    thickness: 2,
    gap: 3,
    outline: true,
    centerDot: true,
    descriptionKey: "gallery.descBox",
  },
  {
    id: "wide-box-yellow",
    name: "Wide Tactical Box",
    category: "special",
    shape: "box",
    color: "#FFD600",
    size: 7,
    thickness: 2,
    gap: 4,
    outline: true,
    centerDot: false,
    descriptionKey: "gallery.descWideBox",
  },
];

export const CrosshairGallerySection: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const {
    shape: activeShape,
    color: activeColor,
    setShape,
    setColor,
    setSize,
    setThickness,
    setGap,
    setOutline,
    setCenterDot,
  } = useCrosshairState();

  const handleSelect = (item: GalleryItem) => {
    setShape(item.shape);
    setColor(item.color);
    setSize(item.size);
    setThickness(item.thickness);
    setGap(item.gap);
    setOutline(item.outline);
    setCenterDot(item.centerDot);

    // Scroll smoothly to the interactive reticle editor (#interactive-demo)
    const editorEl = document.getElementById("interactive-demo");
    if (editorEl) {
      const navOffset = 80;
      const elementPosition = editorEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };

  const handleDownload = (e: React.MouseEvent, item: GalleryItem) => {
    e.stopPropagation();
    const success = exportCrosshairToPng({
      shape: item.shape,
      size: item.size,
      thickness: item.thickness,
      gap: item.gap,
      color: item.color,
      outline: item.outline,
      centerDot: item.centerDot,
      filename: `crossio-${item.id}.png`,
    });

    if (success) {
      setDownloadingId(item.id);
      window.setTimeout(() => {
        setDownloadingId((curr) => (curr === item.id ? null : curr));
      }, 2000);
    }
  };

  const categories = [
    { id: "all", label: t("gallery.filterAll") },
    { id: "cross", label: t("gallery.filterCross") },
    { id: "dot", label: t("gallery.filterDot") },
    { id: "circle", label: t("gallery.filterCircle") },
    { id: "t-cross", label: t("gallery.filterT") },
    { id: "special", label: t("gallery.filterSpecial") },
  ];

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery-section" className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
              {t("gallery.badge")}
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
              {t("gallery.title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("gallery.subtitle")}
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="h-12 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-2 shadow-md shrink-0"
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t("gallery.viewAllBtn")}</span>
            </a>
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/60 border border-border/40">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isSelected = activeShape === item.shape && activeColor === item.color;
            const isDownloaded = downloadingId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`group cursor-pointer p-5 sm:p-6 rounded-3xl border backdrop-blur-sm transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "bg-card border-primary shadow-xl shadow-primary/10 scale-[1.01]"
                    : "bg-card/50 border-border/70 hover:border-primary/40 hover:bg-card/80"
                }`}
              >
                <div>
                  {/* Card Header Tag & Color */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-wider font-mono font-bold px-2.5 py-1 rounded-full bg-secondary text-primary border border-border/40">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {item.color}
                    </span>
                  </div>

                  {/* Visual Crosshair Canvas Box */}
                  <div className="relative aspect-video rounded-2xl bg-[#090b10] border border-white/10 flex items-center justify-center overflow-hidden mb-4 group-hover:border-primary/30 transition-colors">
                    {/* Grid texture */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
                    <div className="w-16 h-16 rounded-full border border-white/5 absolute" />

                    {/* Reticle shape preview */}
                    <div
                      style={{
                        filter: "drop-shadow(0 0 1px #000000)",
                      }}
                      className="relative z-10 flex items-center justify-center pointer-events-none"
                    >
                      {item.shape === "dot" && (
                        <div
                          style={{ backgroundColor: item.color }}
                          className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                        />
                      )}

                      {item.shape === "cross" && (
                        <div className="relative flex items-center justify-center">
                          <div
                            style={{ backgroundColor: item.color }}
                            className="absolute -top-3 w-[2px] h-2.5"
                          />
                          <div
                            style={{ backgroundColor: item.color }}
                            className="absolute top-1.5 w-[2px] h-2.5"
                          />
                          <div
                            style={{ backgroundColor: item.color }}
                            className="absolute -left-3 h-[2px] w-2.5"
                          />
                          <div
                            style={{ backgroundColor: item.color }}
                            className="absolute left-1.5 h-[2px] w-2.5"
                          />
                          {item.centerDot && (
                            <div
                              style={{ backgroundColor: item.color }}
                              className="w-1 h-1 rounded-full absolute"
                            />
                          )}
                        </div>
                      )}

                      {item.shape === "precision" && (
                        <div className="relative flex items-center justify-center">
                          <div
                            style={{ borderColor: item.color }}
                            className="w-7 h-7 rounded-full border border-white/40 absolute"
                          />
                          <div
                            style={{ backgroundColor: item.color }}
                            className="w-1.5 h-1.5 rounded-full absolute shadow-[0_0_6px_currentColor]"
                          />
                          <div
                            style={{ backgroundColor: item.color }}
                            className="absolute -top-3 w-[2px] h-2"
                          />
                          <div
                            style={{ backgroundColor: item.color }}
                            className="absolute top-1.5 w-[2px] h-2"
                          />
                          <div
                            style={{ backgroundColor: item.color }}
                            className="absolute -left-3 h-[2px] w-2"
                          />
                          <div
                            style={{ backgroundColor: item.color }}
                            className="absolute left-1.5 h-[2px] w-2"
                          />
                        </div>
                      )}

                      {item.shape === "t-cross" && (
                        <div className="relative flex items-center justify-center">
                          {item.centerDot && (
                            <div
                              style={{ backgroundColor: item.color }}
                              className="w-1.5 h-1.5 rounded-full absolute"
                            />
                          )}
                          <div
                            style={{ backgroundColor: item.color }}
                            className="absolute top-1.5 w-[2px] h-3"
                          />
                          <div
                            style={{ backgroundColor: item.color }}
                            className="absolute -left-3 h-[2px] w-2.5"
                          />
                          <div
                            style={{ backgroundColor: item.color }}
                            className="absolute left-1.5 h-[2px] w-2.5"
                          />
                        </div>
                      )}

                      {item.shape === "circle" && (
                        <div className="relative flex items-center justify-center">
                          <div
                            style={{ borderColor: item.color }}
                            className="w-7 h-7 rounded-full border-2"
                          />
                          {item.centerDot && (
                            <div
                              style={{ backgroundColor: item.color }}
                              className="w-1.5 h-1.5 rounded-full absolute shadow-[0_0_6px_currentColor]"
                            />
                          )}
                        </div>
                      )}

                      {item.shape === "diamond" && (
                        <div className="relative flex items-center justify-center">
                          <div
                            style={{ borderColor: item.color }}
                            className="w-6 h-6 border-2 rotate-45"
                          />
                          {item.centerDot && (
                            <div
                              style={{ backgroundColor: item.color }}
                              className="w-1.5 h-1.5 rounded-full absolute"
                            />
                          )}
                        </div>
                      )}

                      {item.shape === "box" && (
                        <div className="relative flex items-center justify-center">
                          <div
                            style={{ borderColor: item.color }}
                            className="w-6 h-6 border-2"
                          />
                          {item.centerDot && (
                            <div
                              style={{ backgroundColor: item.color }}
                              className="w-1.5 h-1.5 rounded-full absolute"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {t(item.descriptionKey)}
                  </p>
                </div>

                {/* Card Action Buttons (Direct PNG Download + Live Preview Select) */}
                <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={isDownloaded ? "default" : "outline"}
                    onClick={(e) => handleDownload(e, item)}
                    className={`h-8 px-3 rounded-xl text-xs font-semibold gap-1.5 transition-all ${
                      isDownloaded
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white border-transparent"
                        : "border-border/60 hover:border-primary hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>{t("gallery.downloaded")}</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>{t("gallery.downloadPng")}</span>
                      </>
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(item);
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary select-none hover:underline cursor-pointer group-hover:translate-x-0.5 transition-all"
                  >
                    <span>{isSelected ? t("gallery.activeSelection") : t("gallery.testLive")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

