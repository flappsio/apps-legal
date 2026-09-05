import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState } from "@/context/CrosshairStateContext";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Cpu, BatteryCharging } from "lucide-react";

export const CrosshairMobileFirstSection: React.FC = () => {
  const { isTr } = useLanguage();
  const { activeColorOption } = useCrosshairState();

  const specs = [
    {
      icon: <Cpu className="w-5 h-5 text-primary" />,
      title: isTr ? "Hafif Görsel Çizim" : "Lightweight Rendering",
      desc: isTr
        ? "Kaynak kullanımı cihazınıza, Android sürümüne ve seçtiğiniz ayarlara göre değişebilir."
        : "Resource use may vary by device, Android version, and selected settings.",
    },
    {
      icon: <BatteryCharging className="w-5 h-5 text-cyan-400" />,
      title: isTr ? "Kontrollü Arka Plan Çalışması" : "Controlled Background Operation",
      desc: isTr
        ? "Katman etkinken ön plan servisi kalıcı bir bildirim gösterir ve bildirimdeki Durdur eylemiyle kapatılabilir."
        : "The visual layer is rendered while active and can be stopped from its persistent notification.",
    },
    {
      icon: <Smartphone className="w-5 h-5 text-purple-400" />,
      title: isTr ? "Dokunmatik & Yüzen HUD" : "Touch Ergonomics",
      desc: isTr
        ? "Mobil parmak kontrollerine uygun yüzen hızlı erişim menüsü."
        : "Designed around mobile ergonomics and one-thumb quick toggle HUD widgets.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-5">
            <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
              {isTr ? "Android'e Özel Mimari" : "Android Native Exclusivity"}
            </Badge>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-[1.12]">
              {isTr ? "Android İçin Üretildi." : "Built for Android."} <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${activeColorOption.hex} 0%, #00E5FF 100%)`,
                }}
              >
                {isTr ? "Sonradan Uyarlanmadı." : "Not adapted to it."}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {isTr
                ? "Crossio, Android işletim sisteminin pencere yöneticisi ve farklı mobil ekran boyutları için geliştirilmiştir."
                : "Crossio is designed around Android's window manager and a range of mobile screen sizes."}
            </p>

            <div className="space-y-4 pt-4">
              {specs.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-card/60 border border-border/70"
                >
                  <div className="p-2.5 rounded-xl bg-secondary/80 border border-border/60 shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-foreground">{s.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual: Android Device Family Cluster */}
          <div className="lg:col-span-6 relative flex items-center justify-center select-none">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-[36px] bg-gradient-to-br from-card via-card/80 to-background border border-border/80 p-6 flex flex-col justify-between shadow-2xl overflow-hidden">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full blur-[90px] pointer-events-none opacity-20"
                style={{ backgroundColor: activeColorOption.hex }}
              />

              <div className="flex items-center justify-between text-xs border-b border-border/60 pb-3">
                <span className="font-mono text-muted-foreground">ANDROID COMPATIBILITY</span>
                <Badge variant="brand" className="text-[10px] font-mono">
                  Android 7.0+
                </Badge>
              </div>

              {/* Cluster Graphic */}
              <div className="relative py-6 flex items-center justify-center gap-4">
                {/* Device 1 (Compact) */}
                <div className="w-20 h-36 rounded-2xl bg-[#12141e] border border-white/10 p-1.5 flex flex-col justify-between opacity-70">
                  <div className="w-4 h-1 rounded-full bg-white/20 mx-auto" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mx-auto shadow-[0_0_6px_currentColor]" />
                  <div className="w-3 h-0.5 rounded-full bg-white/20 mx-auto" />
                </div>

                {/* Device 2 (Flagship Gaming Phone - Highlighted) */}
                <div
                  className="w-36 h-56 rounded-3xl bg-[#0c0e16] border-2 border-white/20 p-2.5 flex flex-col justify-between shadow-2xl z-10 scale-105"
                  style={{ borderColor: activeColorOption.hex }}
                >
                  <div className="w-8 h-1.5 rounded-full bg-white/30 mx-auto" />
                  <div className="relative flex items-center justify-center py-6">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                    <div className="w-12 h-12 rounded-full border border-primary/40 border-dashed absolute animate-spin-slow" />
                  </div>
                  <div className="w-6 h-1 rounded-full bg-white/30 mx-auto" />
                </div>

                {/* Device 3 (Tablet / Large) */}
                <div className="w-24 h-40 rounded-2xl bg-[#12141e] border border-white/10 p-1.5 flex flex-col justify-between opacity-70">
                  <div className="w-4 h-1 rounded-full bg-white/20 mx-auto" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mx-auto shadow-[0_0_6px_currentColor]" />
                  <div className="w-3 h-0.5 rounded-full bg-white/20 mx-auto" />
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 text-center text-[11px] text-muted-foreground">
                {isTr
                  ? "Desteklenen Android sürümlerinde kullanılabilir; davranış üretici ayarlarına göre değişebilir"
                  : "Available on supported Android versions; behavior may vary by manufacturer settings"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
