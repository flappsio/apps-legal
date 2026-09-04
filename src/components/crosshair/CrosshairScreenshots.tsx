import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Sliders, Layers, Sparkles } from "lucide-react";

export const CrosshairScreenshots: React.FC = () => {
  const { isTr } = useLanguage();

  const screens = [
    {
      title: isTr ? "Hazır Nişangah Galerisi" : "Crosshair Presets Library",
      category: isTr ? "Espor & Popüler" : "Esports & Trending",
      icon: <Sparkles className="w-4 h-4 text-primary" />,
      description: isTr
        ? "Yüzlerce hazır profesyonel nişangah arasında arama yapın ve tek tıkla aktif edin."
        : "Browse hundreds of tournament-ready reticles and activate them instantly.",
      previewType: "presets",
    },
    {
      title: isTr ? "Hassas Nişangah Editörü" : "Precision Custom Editor",
      category: isTr ? "Piksel Ayarı" : "Pixel Tuning",
      icon: <Sliders className="w-4 h-4 text-[#00E5FF]" />,
      description: isTr
        ? "Boyut, kalınlık, aralık, dış çizgi ve opaklığı milimetrik kontrol edin."
        : "Adjust length, stroke width, gap, opacity, and outline with real-time feedback.",
      previewType: "editor",
    },
    {
      title: isTr ? "Ekran Katman & Hızlı Menü" : "Overlay & Quick Controls",
      category: isTr ? "Oyun İçi Kontrol" : "In-Game HUD",
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      description: isTr
        ? "Ekran üzerinde yüzen baloncuk ile oyunu kapatmadan hızlıca yönetin."
        : "Floating HUD bubble allows instant toggle and repositioning during matches.",
      previewType: "overlay",
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {isTr ? "Uygulama Ekranları" : "App Interface"}
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {isTr ? "Kullanıcı Dostu ve Güçlü Arayüz" : "Intuitive & Powerful Interface"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {isTr
              ? "Karmaşadan uzak, sadece nişangahınızı mükemmelleştirmeye odaklanan temiz tasarım."
              : "A clean, distraction-free design focused solely on elevating your in-game precision."}
          </p>
        </div>

        {/* 3-Column Visual Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {screens.map((s, idx) => (
            <div
              key={idx}
              className="group flex flex-col rounded-3xl bg-card/60 border border-border/80 overflow-hidden backdrop-blur-md hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Simulated Phone Screen Mockup Header */}
              <div className="p-4 bg-secondary/40 border-b border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-background border border-border/60">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">{s.title}</h3>
                    <span className="text-[10px] text-muted-foreground">{s.category}</span>
                  </div>
                </div>
              </div>

              {/* Simulated Screen Body */}
              <div className="relative p-6 aspect-[4/5] bg-gradient-to-b from-background/90 to-card flex flex-col justify-between overflow-hidden">
                {/* Visual Elements according to previewType */}
                {s.previewType === "presets" && (
                  <div className="space-y-3 w-full">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground pb-1">
                      <span>{isTr ? "Kategoriler" : "Categories"}</span>
                      <span className="text-primary text-[10px]">{isTr ? "Tümünü Gör" : "See All"}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded-2xl bg-secondary/60 border border-border/60 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-[#69F0AE] shadow-[0_0_6px_#69F0AE]" />
                        <span className="text-[10px] font-bold text-foreground">Pro Dot (Green)</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-secondary/60 border border-border/60 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
                        <div className="w-3 h-3 border border-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
                        <span className="text-[10px] font-bold text-foreground">Classic Cyan</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-secondary/60 border border-border/60 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
                        <div className="w-3 h-3 rounded-full border border-[#FF007F] shadow-[0_0_6px_#FF007F]" />
                        <span className="text-[10px] font-bold text-foreground">Combat Circle</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-secondary/60 border border-border/60 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
                        <div className="w-2.5 h-2.5 bg-[#FFD600] rotate-45 shadow-[0_0_6px_#FFD600]" />
                        <span className="text-[10px] font-bold text-foreground">Diamond Spec</span>
                      </div>
                    </div>

                    <div className="mt-4 p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-center">
                      <span className="text-[11px] font-bold text-primary">
                        +50 {isTr ? "Esporcu Profili Dahil" : "Pro Profiles Included"}
                      </span>
                    </div>
                  </div>
                )}

                {s.previewType === "editor" && (
                  <div className="space-y-3 w-full">
                    <div className="flex justify-center py-2">
                      <div className="w-16 h-16 rounded-2xl bg-black/40 border border-border/60 flex items-center justify-center relative">
                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#69F0AE]" />
                        <div className="absolute top-2 w-0.5 h-2 bg-primary" />
                        <div className="absolute bottom-2 w-0.5 h-2 bg-primary" />
                        <div className="absolute left-2 h-0.5 w-2 bg-primary" />
                        <div className="absolute right-2 h-0.5 w-2 bg-primary" />
                      </div>
                    </div>

                    <div className="space-y-2 text-[10px]">
                      <div className="flex justify-between text-muted-foreground">
                        <span>{isTr ? "Uzunluk" : "Length"}</span>
                        <span className="font-mono text-foreground font-bold">8 px</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-2/3" />
                      </div>

                      <div className="flex justify-between text-muted-foreground pt-1">
                        <span>{isTr ? "Kalınlık" : "Thickness"}</span>
                        <span className="font-mono text-foreground font-bold">2 px</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/3" />
                      </div>

                      <div className="flex justify-between text-muted-foreground pt-1">
                        <span>{isTr ? "Merkez Boşluğu" : "Center Gap"}</span>
                        <span className="font-mono text-foreground font-bold">4 px</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/2" />
                      </div>
                    </div>
                  </div>
                )}

                {s.previewType === "overlay" && (
                  <div className="space-y-4 w-full flex flex-col justify-center items-center py-4">
                    <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60 text-center w-full">
                      <span className="text-[10px] uppercase font-bold text-primary block mb-1">
                        {isTr ? "Katman Durumu" : "Overlay Status"}
                      </span>
                      <span className="text-sm font-extrabold text-foreground">
                        {isTr ? "Ekranda Aktif" : "Active on Screen"}
                      </span>
                    </div>

                    <div className="w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border/60 text-[11px]">
                      <span className="font-medium text-foreground">{isTr ? "Yüzen Menü Butonu" : "Floating Menu"}</span>
                      <span className="px-2 py-0.5 rounded-md bg-primary/20 text-primary font-bold text-[10px]">
                        AÇIK
                      </span>
                    </div>

                    <div className="w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border/60 text-[11px]">
                      <span className="font-medium text-foreground">{isTr ? "Hassas Konum Kilidi" : "Position Lock"}</span>
                      <span className="px-2 py-0.5 rounded-md bg-primary/20 text-primary font-bold text-[10px]">
                        MERKEZ
                      </span>
                    </div>
                  </div>
                )}

                {/* Footer Description */}
                <p className="text-xs text-muted-foreground pt-3 border-t border-border/40">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
