import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState } from "@/context/CrosshairStateContext";
import {
  ShieldCheck,
  Sliders,
  Zap,
  Lock,
  Layers,
  Crosshair,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const CrosshairFeatures: React.FC = () => {
  const { isTr } = useLanguage();
  const { activeColorOption } = useCrosshairState();

  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      title: isTr ? "Yerel Sistem Katmanı (SYSTEM_ALERT_WINDOW)" : "Native System Overlay",
      desc: isTr
        ? "Oyun kodlarına veya RAM belleğine hiçbir müdahalede bulunmaz. Android'in resmi 'Diğer uygulamaların üzerinde gösterim' izniyle tamamen izole ve güvenli çalışır."
        : "Never injects or modifies game files or memory. Operates completely independently via Android's official SYSTEM_ALERT_WINDOW overlay permission.",
      tag: isTr ? "%100 Güvenli" : "100% Safe",
    },
    {
      icon: <Crosshair className="w-5 h-5 text-[#00E5FF]" />,
      title: isTr ? "Geniş Nişangah Kütüphanesi" : "Esports Presets Library",
      desc: isTr
        ? "Turnuva oyuncularının tercih ettiği nokta (dot), ince artı, T-cross, çember ve elmas nişangah modellerini tek tıkla yükleyin."
        : "Instantly load tournament-grade dot, micro-cross, T-style, circle, and diamond presets crafted for competitive FPS games.",
      tag: isTr ? "Pro" : "Pro",
    },
    {
      icon: <Sliders className="w-5 h-5 text-primary" />,
      title: isTr ? "Piksel Hassasiyetinde Özelleştirme" : "Pixel-Perfect Reticle Editor",
      desc: isTr
        ? "Boyut, çizgi kalınlığı, merkez boşluğu (gap), şeffaflık, siyah dış çizgi (outline) ve merkez nokta ayarlarını milimetrik olarak yönetin."
        : "Fine-tune length, thickness, center gap, opacity, outer stroke outline, and center dot with precise sliders.",
      tag: isTr ? "Editör" : "Editor",
    },
    {
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      title: isTr ? "Yüzen Hızlı Kontrol Düğmesi" : "Floating Quick Toggle HUD",
      desc: isTr
        ? "Oyun oynarken ekranın kenarında duran hafif baloncuk sayesinde oyundan çıkmadan crosshair'i anında açıp kapatın veya yeniden konumlandırın."
        : "Toggle crosshair visibility and fine-tune position on-the-fly directly inside your game with a lightweight floating widget.",
      tag: isTr ? "Hızlı HUD" : "Quick HUD",
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: isTr ? "Sıfır Gecikme & Düşük Pil Tüketimi" : "Zero Latency & Low Battery",
      desc: isTr
        ? "Donanım hızlandırmalı hafif vektörel çizim motoru ile sıfır FPS kaybı. %0.5'ten az CPU yükü ile cihazınız ısınmaz."
        : "Hardware-accelerated vector rendering ensures zero FPS drops. Less than 0.5% CPU footprint means your device stays cool.",
      tag: isTr ? "Hafif" : "Lightweight",
    },
    {
      icon: <Lock className="w-5 h-5 text-primary" />,
      title: isTr ? "Yerel Saklama & Gizlilik" : "Local Storage & Full Privacy",
      desc: isTr
        ? "Oluşturduğunuz tüm özel crosshair tasarımları ve ayarlarınız cihazınızda yerel saklanır; sunuculara yüklenmez."
        : "Your customized crosshairs and profile codes remain securely stored on your device and are never sent to external servers.",
      tag: isTr ? "Gizlilik" : "Privacy",
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {isTr ? "Mobil İçin Geliştirildi" : "Built for Mobile Gaming"}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {isTr ? "Mobil İçin Tasarlandı." : "Made for mobile."} <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${activeColorOption.hex} 0%, #00E5FF 100%)`,
              }}
            >
              {isTr ? "Nişanınız İçin Üretildi." : "Built for your aim."}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {isTr
              ? "Mobil oyuncular için özel olarak tasarlanmış, performanstan ödün vermeyen nişangah çözümü."
              : "Engineered specifically for mobile FPS players who demand precision without sacrificing frame rates."}
          </p>
        </div>

        {/* Features 6-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative p-6 sm:p-7 rounded-3xl bg-card/60 border border-border/80 backdrop-blur-sm hover:border-primary/40 hover:bg-card/90 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top gradient indicator on hover */}
              <div
                className="absolute top-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${activeColorOption.hex}, #00E5FF, transparent)`,
                }}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-secondary/80 border border-border/60 group-hover:scale-105 transition-transform">
                    {f.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border/40">
                    {f.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border/30 flex items-center gap-1.5 text-xs text-primary font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isTr ? "Aktif & Doğrulanmış" : "Ready & Verified"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
