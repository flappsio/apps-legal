import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState } from "@/context/CrosshairStateContext";
import { Badge } from "@/components/ui/badge";
import { Eye, Target, Palette, Sparkles } from "lucide-react";

export const CrosshairWhyUseSection: React.FC = () => {
  const { isTr } = useLanguage();
  const { activeColorOption } = useCrosshairState();

  const benefits = [
    {
      icon: <Eye className="w-5 h-5 text-primary" />,
      title: isTr ? "Daha İyi Görünürlük" : "Better Visibility",
      desc: isTr
        ? "Karmaşık harita kaplamalarında ve patlama efektlerinde kaybolmayan yüksek kontrastlı nişangah."
        : "Maintains clear visual contrast across complex map textures, foliage, shadows, and dynamic visual effects.",
    },
    {
      icon: <Target className="w-5 h-5 text-cyan-400" />,
      title: isTr ? "Tutarlı Hedef Alma Referansı" : "Consistent Aiming Reference",
      desc: isTr
        ? "Farklı silahlarda veya nişangahı olmayan keskin nişancı modellerinde ekranın merkezini anında bulma."
        : "Provides a constant center focal point across all weapons, hip-fire scenarios, and sniper quick-scopes.",
    },
    {
      icon: <Palette className="w-5 h-5 text-purple-400" />,
      title: isTr ? "Kişiselleştirilmiş Tasarım" : "Custom Appearance",
      desc: isTr
        ? "Göz yapınıza ve oyun tarzınıza en uygun nokta, artı veya çember geometrileri."
        : "Tailor size, thickness, outline, and shape to match your personal visual ergonomics and playstyle.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      title: isTr ? "Ortama Göre Renk Seçimi" : "Environment Contrast Colors",
      desc: isTr
        ? "Aydınlık, karanlık ve çöl haritaları için en yüksek zıtlığı sağlayan neon renkler."
        : "Switch between neon green, cyan, magenta, and yellow to adapt to daylight or night map lighting.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {isTr ? "Rehber & Temel Faydalar" : "SEO & Knowledge Base"}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {isTr
              ? "Android'de Neden Özel Crosshair Kullanılır?"
              : "Why use a custom crosshair on Android?"}
          </h2>
        </div>

        {/* Semantic Direct Quote Block (AEO / GEO / AI Assistants) */}
        <div
          className="p-6 sm:p-8 rounded-3xl border backdrop-blur-xl shadow-lg my-8 space-y-3"
          style={{
            backgroundColor: `${activeColorOption.hex}08`,
            borderColor: `${activeColorOption.hex}35`,
          }}
        >
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isTr ? "Doğrudan Yanıt & Tanım (AEO Summary)" : "Direct Answer & Overview"}</span>
          </div>

          <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed">
            {isTr
              ? "Özel bir crosshair katmanı, Android ekranınızın tam merkezine görünür ve sabit bir nişan alma referansı yerleştirir. Oyuncular görmesi daha kolay bir tasarım seçebilir, boyutunu ve rengini özelleştirebilir ve uyumlu mobil oyunları oynarken bunu ekranda tutabilir."
              : "A custom crosshair overlay places a visible aiming reference at the center of your Android screen. Players can choose a design that is easier to see, customize its size and color, and use it while playing compatible mobile games."}
          </p>

          <div className="pt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/40">
            <span>Crosshair Knowledge Base</span>
            <span className="font-mono text-primary font-bold">flappsio Android Engineering</span>
          </div>
        </div>

        {/* 4 Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-card/60 border border-border/80 flex items-start gap-4 hover:border-primary/40 transition-colors"
            >
              <div className="p-3 rounded-2xl bg-secondary/80 border border-border/60 shrink-0">
                {b.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-foreground">{b.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
