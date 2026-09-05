import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState } from "@/context/CrosshairStateContext";
import { Button } from "@/components/ui/button";
import { Download, ShieldCheck, Sparkles } from "lucide-react";

export const CrosshairFinalCTA: React.FC = () => {
  const { isTr } = useLanguage();
  const { activeColorOption } = useCrosshairState();

  return (
    <section className="py-20 sm:py-32 border-t border-border/40 relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div
          className="relative p-8 sm:p-16 rounded-[40px] border shadow-2xl overflow-hidden text-center space-y-7 bg-gradient-to-b from-[#10131d] via-[#090b11] to-[#050609]"
          style={{
            borderColor: `${activeColorOption.hex}40`,
            boxShadow: `0 25px 80px -10px ${activeColorOption.hex}25`,
          }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-30"
            style={{ backgroundColor: activeColorOption.hex }}
          />

          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${activeColorOption.hex}15`,
              borderColor: `${activeColorOption.hex}40`,
              color: activeColorOption.hex,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isTr ? "Google Play'de Ücretsiz" : "Free on Google Play"}</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-black text-foreground tracking-tight leading-[1.08]">
            {isTr ? "Görünümünüz." : "Your visual."} <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${activeColorOption.hex} 0%, #00E5FF 100%)`,
              }}
            >
              {isTr ? "Nişangahınız." : "Your crosshair."}
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {isTr
              ? "Seçin, özelleştirin ve Android katmanını siz hazır olduğunuzda başlatın."
              : "Choose, customize, and start the Android layer when you are ready."}
          </p>

          <div className="pt-2 flex flex-col items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="shimmer-button h-14 px-10 text-black font-extrabold rounded-2xl shadow-2xl gap-3 text-base transition-all duration-300 hover:scale-[1.03]"
              style={{
                backgroundColor: activeColorOption.hex,
                boxShadow: `0 12px 35px ${activeColorOption.hex}50`,
              }}
            >
              <a
                href="https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-5 h-5" />
                <span>{isTr ? "Google Play'den İndir" : "Get it on Google Play"}</span>
              </a>
            </Button>

            <span className="text-xs font-mono text-muted-foreground pt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>{isTr ? "Android 7.0 veya üzeri • Google Play'de mevcut" : "Android 7.0 or later • Available on Google Play"}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
