import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState } from "@/context/CrosshairStateContext";
import { Download } from "lucide-react";

export const MobileStickyCTA: React.FC = () => {
  const { isTr } = useLanguage();
  const { activeColorOption } = useCrosshairState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past 400px
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
      <a
        href="https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair"
        target="_blank"
        rel="noopener noreferrer"
        className="shimmer-button flex items-center justify-between px-5 py-3.5 rounded-2xl text-black font-extrabold text-xs shadow-2xl backdrop-blur-xl border border-white/20 transition-transform active:scale-95"
        style={{
          backgroundColor: activeColorOption.hex,
          boxShadow: `0 10px 30px ${activeColorOption.hex}60`,
        }}
      >
        <div className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span>Crossio: Custom Crosshair</span>
        </div>
        <span className="bg-black/20 text-black px-2.5 py-1 rounded-lg text-[11px] font-bold">
          {isTr ? "İndir" : "Get App"}
        </span>
      </a>
    </div>
  );
};
