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
      title: isTr ? "Ayarlanabilir Görünürlük" : "Adjustable Visibility",
      desc: isTr
        ? "Farklı arka planlarda renk, dış çizgi ve opaklık ayarlarını önizleyin."
        : "Preview color, outline, and opacity settings across different backgrounds.",
    },
    {
      icon: <Target className="w-5 h-5 text-cyan-400" />,
      title: isTr ? "Sabit Merkez Konumu" : "Fixed Center Position",
      desc: isTr
        ? "Seçtiğiniz görsel katmanı Android ekranının merkezinde konumlandırın."
        : "Position the visual layer you choose at the center of your Android display.",
    },
    {
      icon: <Palette className="w-5 h-5 text-purple-400" />,
      title: isTr ? "Kişiselleştirilmiş Tasarım" : "Custom Appearance",
      desc: isTr
        ? "Nokta, artı veya çember geometrilerini görsel tercihlerinize göre düzenleyin."
        : "Adjust dot, cross, or circle geometry to your visual preferences.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      title: isTr ? "Zemine Göre Renk Seçimi" : "Background Contrast Colors",
      desc: isTr
        ? "Açık, koyu ve renkli zeminlerde farklı renk seçeneklerini karşılaştırın."
        : "Compare color options across light, dark, and colorful backgrounds.",
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
              ? "Crossio, kullanıcı tarafından seçilen nişangahı Android ekranının merkezinde pasif bir görsel katman olarak gösterir. Tasarımın renk, boyut, kalınlık, boşluk ve opaklık ayarları özelleştirilebilir."
              : "Crossio displays a user-selected crosshair as a passive visual layer at the center of an Android screen. Its color, size, thickness, gap, and opacity can be customized."}
          </p>

          <div className="pt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/40">
            <span>Crossio Knowledge Base</span>
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
