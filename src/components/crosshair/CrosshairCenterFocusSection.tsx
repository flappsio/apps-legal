import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState } from "@/context/CrosshairStateContext";

export const CrosshairCenterFocusSection: React.FC = () => {
  const { isTr } = useLanguage();
  const { shape, color, size, thickness, opacity, outline, activeColorOption } = useCrosshairState();

  return (
    <section className="relative py-24 sm:py-36 overflow-hidden border-t border-border/40 select-none">
      {/* Dynamic Ambient Background Arena with soft parallax feel */}
      <div className="absolute inset-0 bg-[#06070a]">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle 800px at 50% 50%, ${activeColorOption.hex}18, transparent 70%), linear-gradient(135deg, #0d101b 0%, #06070a 100%)`,
          }}
        />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Target Concentric HUD Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full border border-white/5 pointer-events-none" />

      {/* Centered Large Reticle */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Prominent Crosshair Visual */}
        <div
          style={{
            filter: outline
              ? "drop-shadow(0 0 2px #000000) drop-shadow(0 0 4px #000000)"
              : "none",
            opacity: opacity,
          }}
          className="mb-8 scale-150 sm:scale-175 flex items-center justify-center transition-transform duration-300"
        >
          {shape === "dot" && (
            <div
              style={{
                width: `${size * 2}px`,
                height: `${size * 2}px`,
                backgroundColor: color,
                borderRadius: "50%",
                boxShadow: `0 0 16px ${color}`,
              }}
            />
          )}

          {shape !== "dot" && (
            <div className="relative flex items-center justify-center">
              <div
                style={{
                  position: "absolute",
                  bottom: "6px",
                  width: `${thickness}px`,
                  height: `${size * 2}px`,
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "6px",
                  width: `${thickness}px`,
                  height: `${size * 2}px`,
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: "6px",
                  height: `${thickness}px`,
                  width: `${size * 2}px`,
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "6px",
                  height: `${thickness}px`,
                  width: `${size * 2}px`,
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}`,
                }}
              />
            </div>
          )}
        </div>

        {/* Text */}
        <h2 className="text-3xl sm:text-6xl font-black text-foreground tracking-tight max-w-2xl leading-tight">
          {isTr ? "Merkeze Odaklanın." : "Stay focused on the center."}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-4 max-w-lg">
          {isTr
            ? "Oyun ne kadar hareketli ve hızlı olursa olsun, nişangahınız tam gözünüzün önünde."
            : "No matter how chaotic the match gets, your aiming focal point stays crystal clear."}
        </p>
      </div>
    </section>
  );
};
