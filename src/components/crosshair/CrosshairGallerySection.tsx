import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState, CrosshairShape } from "@/context/CrosshairStateContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";

interface GalleryItem {
  id: string;
  name: string;
  category: string;
  shape: CrosshairShape;
  color: string;
  size: number;
  thickness: number;
  gap: number;
  outline: boolean;
  centerDot: boolean;
  description: { tr: string; en: string };
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "classic-green",
    name: "Classic Cross",
    category: "Balanced",
    shape: "cross",
    color: "#69F0AE",
    size: 6,
    thickness: 2,
    gap: 3,
    outline: true,
    centerDot: false,
    description: {
      tr: "Dengeli görüş ve hızlı hedef kilitleme için 4 kollu klasik espor modeli.",
      en: "The standard 4-armed tournament reticle for peripheral target tracking.",
    },
  },
  {
    id: "pro-dot-cyan",
    name: "Micro Dot",
    category: "Precision",
    shape: "dot",
    color: "#00E5FF",
    size: 3,
    thickness: 3,
    gap: 0,
    outline: true,
    centerDot: true,
    description: {
      tr: "Uzak mesafe kafa vuruşları için hedefi kapatmayan kompakt nokta.",
      en: "Unobstructed view for pinpoint long-range headshots and tap-firing.",
    },
  },
  {
    id: "sniper-t-yellow",
    name: "Sniper T-Style",
    category: "Sniper",
    shape: "t-cross",
    color: "#FF9100",
    size: 7,
    thickness: 2,
    gap: 2,
    outline: true,
    centerDot: true,
    description: {
      tr: "Dürbün kapalıyken (no-scope) ve quick-scope için dikey referans.",
      en: "Top-open vertical line for sniper hip-fire and quick-scope alignment.",
    },
  },
  {
    id: "combat-circle-magenta",
    name: "Combat Circle",
    category: "CQB & Shotgun",
    shape: "circle",
    color: "#8B5CF6",
    size: 8,
    thickness: 2,
    gap: 4,
    outline: true,
    centerDot: false,
    description: {
      tr: "Yakın mesafe çatışmalarda ve pompalı silahlarda gövdeyi çevreleme.",
      en: "Fast torso acquisition during fast-paced close-quarters engagements.",
    },
  },
  {
    id: "diamond-spec-red",
    name: "Diamond Spec",
    category: "Tactical",
    shape: "diamond",
    color: "#FF4655",
    size: 6,
    thickness: 2,
    gap: 3,
    outline: true,
    centerDot: true,
    description: {
      tr: "Açılı köşelerle hızlı göz takibi sağlayan modern elmas nişangah.",
      en: "Angled geometry providing high visual separation against busy textures.",
    },
  },
  {
    id: "cqb-box-white",
    name: "CQB Box",
    category: "SMG & Auto",
    shape: "box",
    color: "#FFFFFF",
    size: 6,
    thickness: 2,
    gap: 3,
    outline: true,
    centerDot: true,
    description: {
      tr: "Otomatik silahlar ve sprey kontrolü için çerçeveli hedefleme.",
      en: "Framed reticle design optimized for automatic spray tracking.",
    },
  },
];

export const CrosshairGallerySection: React.FC = () => {
  const { isTr } = useLanguage();
  const {
    shape: activeShape,
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
  };

  return (
    <section id="gallery-section" className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
              {isTr ? "Nişangah Koleksiyonu" : "Reticle Library"}
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
              {isTr ? "Kendi Nişangahınızı Keşfedin." : "Find your crosshair."}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {isTr
                ? "Bir profile dokunarak tüm sayfada anında aktif edin veya uygulamada 50'den fazla hazır modeli keşfedin."
                : "Tap any reticle to preview it live across the site or explore the full 50+ preset library in the app."}
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
              <Download className="w-4 h-4" />
              <span>{isTr ? "Uygulamadaki Tüm Nişangahları Gör" : "Explore Crosshairs in the App"}</span>
            </a>
          </Button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item) => {
            const isSelected = activeShape === item.shape;
            return (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`group cursor-pointer p-6 rounded-3xl border backdrop-blur-sm transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "bg-card border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                    : "bg-card/50 border-border/70 hover:border-primary/40 hover:bg-card/80"
                }`}
              >
                <div>
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
                        </div>
                      )}

                      {item.shape === "t-cross" && (
                        <div className="relative flex items-center justify-center">
                          <div
                            style={{ backgroundColor: item.color }}
                            className="w-1.5 h-1.5 rounded-full mb-1"
                          />
                          <div
                            style={{ backgroundColor: item.color }}
                            className="absolute top-2 w-[2px] h-3"
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
                        <div
                          style={{ borderColor: item.color }}
                          className="w-7 h-7 rounded-full border-2"
                        />
                      )}

                      {item.shape === "diamond" && (
                        <div
                          style={{ borderColor: item.color }}
                          className="w-6 h-6 border-2 rotate-45"
                        />
                      )}

                      {item.shape === "box" && (
                        <div
                          style={{ borderColor: item.color }}
                          className="w-6 h-6 border-2"
                        />
                      )}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {isTr ? item.description.tr : item.description.en}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border/30 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>{isSelected ? (isTr ? "Aktif Nişangah" : "Active Selection") : isTr ? "Canlı Dene" : "Test Live"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
