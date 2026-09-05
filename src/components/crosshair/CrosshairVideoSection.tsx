import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Play, Pause, Smartphone, Shield, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const CrosshairVideoSection: React.FC = () => {
  const { isTr } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [demoStep, setDemoStep] = useState(0);

  // Cycling demonstration: white -> green -> cyan -> dot -> classic -> large
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % 4);
    }, 2400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {isTr ? "Pasif Katman Demonstrasyonu" : "Passive Overlay Demonstration"}
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {isTr ? "Seçtiğiniz Görsel Merkezde Kalır" : "Your Selected Visual Stays Centered"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {isTr
              ? "Aşağıdaki tarafsız önizleme, katman etkinken nişangah görünümünün nasıl değiştiğini gösterir."
              : "The neutral preview below shows how the crosshair appearance changes while the layer is active."}
          </p>
        </div>

        {/* Handheld Android Gaming Phone Viewport */}
        <div className="relative rounded-[36px] sm:rounded-[48px] p-3 sm:p-5 bg-gradient-to-b from-[#252835] via-[#12141d] to-[#07080d] border border-white/20 shadow-2xl overflow-hidden">
          {/* Top Bar Indicator */}
          <div className="px-4 py-2 border-b border-white/10 bg-black/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="text-muted-foreground ml-2 font-mono text-[11px]">
                Android SYSTEM_ALERT_WINDOW Engine
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary font-mono text-[10px] font-bold">
                VISUAL PREVIEW
              </span>
            </div>
          </div>

          {/* Screen Content */}
          <div className="relative aspect-video sm:h-[420px] w-full rounded-[24px] sm:rounded-[36px] bg-[#07090f] overflow-hidden flex items-center justify-center select-none">
            {/* Simulated 3D Mobile Arena Scene */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0e111b] via-[#161a29] to-[#0a0c13]">
              {/* Perspective grid floor */}
              <div
                className={`absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] ${
                  isPlaying ? "animate-pulse" : ""
                }`}
              />

              {/* Target Silhouette */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-56 rounded-t-full border border-primary/30 bg-primary/5 flex flex-col items-center justify-start pt-3">
                <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 mb-2" />
                <div className="w-20 h-32 rounded-xl border border-primary/20 bg-primary/5" />
              </div>
            </div>

            {/* Dynamic Morphing Crosshair Display */}
            <div className="relative z-20 pointer-events-none drop-shadow-[0_0_2px_#000000] transition-all duration-500">
              {demoStep === 0 && (
                <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
              )}
              {demoStep === 1 && (
                <div className="w-3 h-3 rounded-full bg-[#69F0AE] shadow-[0_0_10px_#69F0AE]" />
              )}
              {demoStep === 2 && (
                <div className="relative flex items-center justify-center">
                  <div className="absolute -top-3 w-[2px] h-2.5 bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
                  <div className="absolute top-1.5 w-[2px] h-2.5 bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
                  <div className="absolute -left-3 h-[2px] w-2.5 bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
                  <div className="absolute left-1.5 h-[2px] w-2.5 bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
                </div>
              )}
              {demoStep === 3 && (
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#FFD600] shadow-[0_0_8px_#FFD600]" />
                  <div className="absolute top-2 w-[2px] h-3 bg-[#FFD600]" />
                  <div className="absolute -left-3 h-[2px] w-2.5 bg-[#FFD600]" />
                  <div className="absolute left-1.5 h-[2px] w-2.5 bg-[#FFD600]" />
                </div>
              )}
            </div>

            {/* In-Video Overlay Caption */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-white/90">
              {isTr ? "Nişangahınız her zaman merkezde kalır" : "Your crosshair stays with you."}
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between gap-3 bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label={isPlaying ? "Pause Demo" : "Play Demo"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <span className="text-white/80 text-[11px] font-medium hidden sm:inline">
                  {isTr ? "Otomatik Geçiş Vitrini" : "Autoplay Reticle Demo"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-white/70">
                <span>STAGE:</span>
                <span className="text-primary font-bold">
                  {demoStep === 0 && "WHITE DOT"}
                  {demoStep === 1 && "LIME GREEN DOT"}
                  {demoStep === 2 && "CYAN CROSS"}
                  {demoStep === 3 && "YELLOW T-SHAPE"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Value Badges Under Video */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="p-4 rounded-2xl bg-card/40 border border-border/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-foreground">
                {isTr ? "Yüzen Hızlı Kontrol Düğmesi" : "Floating Quick Toggle"}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {isTr
                  ? "İsteğe bağlı mini kontrol görünürlüğü ve konumu yönetmek için dokunulabilirdir."
                  : "The optional mini control is touchable so you can manage visibility and position."}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-card/40 border border-border/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-foreground">
                {isTr ? "Diğer Uygulamalara Erişim Yok" : "No Other-App Access"}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {isTr
                  ? "Diğer uygulamaların koduna, belleğine, dosyalarına, verilerine veya ağ trafiğine erişmez."
                  : "Does not access another app's code, memory, files, data, or network traffic."}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-card/40 border border-border/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-foreground">
                {isTr ? "Cihaza Göre Değişen Kaynak Kullanımı" : "Device-Dependent Resource Use"}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {isTr
                  ? "Kaynak kullanımı cihaz modeline, Android sürümüne ve seçilen ayarlara göre değişebilir."
                  : "Resource use may vary by device model, Android version, and selected settings."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
