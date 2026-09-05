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
      title: isTr ? "Pasif Android Görsel Katmanı" : "Passive Android Visual Layer",
      desc: isTr
        ? "Yalnızca siz başlattığınızda görünür. Ana nişangah dokunma veya tuş girdisi almaz; diğer uygulamaların koduna, belleğine, dosyalarına, verilerine ya da ağ trafiğine erişmez."
        : "Appears only after you start it. The main crosshair receives no touch or key input and does not access another app's code, memory, files, data, or network traffic.",
      tag: isTr ? "Tıklamaları Geçirir" : "Click-through",
    },
    {
      icon: <Crosshair className="w-5 h-5 text-[#00E5FF]" />,
      title: isTr ? "Geniş Nişangah Kütüphanesi" : "Crosshair Preset Library",
      desc: isTr
        ? "Nokta, ince artı, T-cross, çember ve elmas gibi farklı görsel tasarımları keşfedin."
        : "Explore dot, micro-cross, T-style, circle, and diamond visual designs.",
      tag: isTr ? "Pro" : "Pro",
    },
    {
      icon: <Sliders className="w-5 h-5 text-primary" />,
      title: isTr ? "Piksel Hassasiyetinde Özelleştirme" : "Pixel-Perfect Reticle Editor",
      desc: isTr
        ? "Boyut, çizgi kalınlığı, merkez boşluğu, şeffaflık, siyah dış çizgi ve merkez nokta ayarlarını hassas kaydırıcılarla yönetin."
        : "Fine-tune length, thickness, center gap, opacity, outer stroke outline, and center dot with precise sliders.",
      tag: isTr ? "Editör" : "Editor",
    },
    {
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      title: isTr ? "Yüzen Hızlı Kontrol Düğmesi" : "Floating Quick Toggle HUD",
      desc: isTr
        ? "İsteğe bağlı dokunulabilir mini kontrolle görsel katmanın görünürlüğünü ve konumunu yönetin."
        : "Use the optional touchable mini control to manage visual-layer visibility and position.",
      tag: isTr ? "Hızlı HUD" : "Quick HUD",
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: isTr ? "Hafif Görsel Oluşturma" : "Lightweight Visual Rendering",
      desc: isTr
        ? "Nişangahlar Android'in görsel katmanında oluşturulur. Gerçek kaynak kullanımı cihaza, Android sürümüne ve seçilen ayarlara göre değişebilir."
        : "Crosshairs are rendered in Android's visual layer. Actual resource use may vary by device, Android version, and selected settings.",
      tag: isTr ? "Hafif" : "Lightweight",
    },
    {
      icon: <Lock className="w-5 h-5 text-primary" />,
      title: isTr ? "Yerel Tasarım Saklama" : "Local Design Storage",
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
            {isTr ? "Android İçin Geliştirildi" : "Built for Android"}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {isTr ? "Mobil İçin Tasarlandı." : "Made for mobile."} <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${activeColorOption.hex} 0%, #00E5FF 100%)`,
              }}
            >
              {isTr ? "Size Göre Özelleştirilir." : "Customized by you."}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {isTr
              ? "Şeffaf izin akışı, yerel tasarımlar ve ayrıntılı görünüm seçenekleri sunan Android aracı."
              : "An Android utility with transparent permissions, local designs, and detailed appearance controls."}
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
                <span>{isTr ? "Uygulamada Mevcut" : "Available in the App"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
