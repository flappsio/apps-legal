import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  ShieldCheck,
  Cpu,
  Layers,
  Check,
  X,
  Lock,
} from "lucide-react";

export const CrosshairArchitectureCore: React.FC = () => {
  const { isTr } = useLanguage();

  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-primary" />,
      tag: "FLAG_NOT_TOUCHABLE",
      title: isTr ? "Tıklamaları Arkaya Aktarma" : "Touch Pass-Through Layer",
      desc: isTr
        ? "Ekran katmanı tüm dokunma, sürükleme ve ateşleme girdilerini doğrudan arkadaki oyuna iletir; hiçbir dokunmayı bloke etmez."
        : "The overlay forwards 100% of touch and gesture inputs directly to the underlying game without capturing or blocking touches.",
      spec: "API: WindowManager.LayoutParams",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      tag: "ZERO HOOKS",
      title: isTr ? "Oyun Belleğine Sıfır Müdahale" : "Zero Game File Injection",
      desc: isTr
        ? "Oyun dosyalarını veya belleğini okumaz, modifiye etmez. Anti-cheat sistemlerini asla tetiklemez; tamamen bağımsız bir Android penceresidir."
        : "Does not inspect, hook, or modify game memory or APK binaries. 100% ban-safe and compatible with all mobile FPS titles.",
      spec: "STATUS: 100% BAN-SAFE",
    },
    {
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      tag: "<5MB RAM",
      title: isTr ? "Donanım Hızlandırmalı Canvas" : "Hardware-Accelerated Canvas",
      desc: isTr
        ? "GPU destekli yerel çizim motoru sayesinde 0 FPS düşüşü ve neredeyse sıfır batarya tüketimi ile 120Hz ekranlarda dahi akıcıdır."
        : "Native GPU-composited canvas rendering ensures zero latency, zero frame drops, and negligible battery usage on 120Hz displays.",
      spec: "FPS DROP: 0.00% / 120HZ COMPLIANT",
    },
    {
      icon: <Lock className="w-5 h-5 text-purple-400" />,
      tag: "LOCAL-FIRST",
      title: isTr ? "%100 Yerel Veri & Özel İçe Aktarma" : "100% Local-First Storage",
      desc: isTr
        ? "Kendi PNG/SVG nişangahlarınızı içe aktarabilir, renk ve boyut profillerinizi cihazınızda tamamen güvenle saklayabilirsiniz."
        : "Import custom PNG/SVG crosshairs and store reticle profiles locally on your device with zero cloud tracking or telemetry.",
      spec: "STORAGE: SQLite / Hive (ON-DEVICE)",
    },
  ];

  const comparisonRows = [
    {
      feature: isTr ? "Android Standart Overlay API'si" : "Standard Android WindowManager",
      crossio: true,
      genericTools: false,
    },
    {
      feature: isTr ? "Oyun Belleğine Müdahale (Inject/Hook)" : "Game Memory Hooks / Injection",
      crossio: false, // false means clean/safe
      genericTools: true,
    },
    {
      feature: isTr ? "Root veya ADB Gereksinimi" : "Root / ADB Requirement",
      crossio: false,
      genericTools: true,
    },
    {
      feature: isTr ? "FPS ve Pil Performans Kaybı" : "FPS Drop & Battery Drain",
      crossio: false,
      genericTools: true,
    },
    {
      feature: isTr ? "Özel PNG/SVG Görsel İçe Aktarma" : "Custom PNG/SVG Reticle Import",
      crossio: true,
      genericTools: false,
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-border/40 relative overflow-hidden bg-background">
      {/* Background architectural grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="text-[11px] font-mono tracking-widest text-primary uppercase font-bold">
              ENGINEERING // SİSTEM MİMARİSİ
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              {isTr ? (
                <>
                  Sıfır Gecikme. Sıfır Müdahale. <br className="hidden sm:inline" />
                  <span className="text-primary">Saf Donanım Katmanı.</span>
                </>
              ) : (
                <>
                  Zero Latency. Zero Interference. <br className="hidden sm:inline" />
                  <span className="text-primary">Pure Hardware Layer.</span>
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {isTr
                ? "Crossio, üçüncü taraf oyun dosyalarını değiştirmez. Android'in resmi pencere yöneticisini kullanarak oyunun üzerinde bağımsız, hafif ve dokunmaları geçiren bir nişangah vizörü sunar."
                : "Crossio never touches or hooks game binaries. It runs strictly as a passive system window layer via native Android APIs, giving you an ultra-responsive visual aim guide without compromising account safety."}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Architectural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {pillars.map((pillar, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={idx * 100}
              className="h-full"
            >
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-card/35 border border-border/70 backdrop-blur-sm flex flex-col justify-between space-y-4 hover:border-primary/40 hover:bg-card/50 transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-background border border-border/80 shadow-sm">
                      {pillar.icon}
                    </div>
                    <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-secondary text-primary font-bold">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/40 text-[10px] sm:text-[11px] font-mono text-muted-foreground flex items-center justify-between">
                  <span>{pillar.spec}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Technical Safety Comparison Table */}
        <ScrollReveal direction="up" delay={200}>
          <div className="rounded-2xl bg-card/25 border border-border/70 backdrop-blur-sm p-6 sm:p-8 overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-6 border-b border-border/40">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  {isTr ? "Güvenlik & Mimari Karşılaştırması" : "Architecture & Safety Comparison"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isTr
                    ? "Crossio'nun pasif görsel katman yaklaşımı ile riskli modlama araçları arasındaki fark."
                    : "How Crossio's passive display layer compares to risky game modding utilities."}
                </p>
              </div>
              <span className="text-[11px] font-mono text-primary font-bold">
                AUDITED & VERIFIED
              </span>
            </div>

            <div className="divide-y divide-border/30 text-xs font-mono">
              <div className="grid grid-cols-12 py-3.5 text-muted-foreground font-bold text-[11px] uppercase">
                <div className="col-span-7 sm:col-span-8">
                  {isTr ? "MİMARİ ÖZELLİK" : "CRITICAL PARAMETER"}
                </div>
                <div className="col-span-3 sm:col-span-2 text-center text-primary">
                  CROSSIO
                </div>
                <div className="col-span-2 text-center text-muted-foreground">
                  {isTr ? "DİĞER MODLAR" : "GENERIC MODS"}
                </div>
              </div>

              {comparisonRows.map((row, i) => (
                <div key={i} className="grid grid-cols-12 py-3.5 items-center">
                  <div className="col-span-7 sm:col-span-8 font-sans font-medium text-foreground text-xs sm:text-sm">
                    {row.feature}
                  </div>
                  <div className="col-span-3 sm:col-span-2 flex justify-center">
                    {row.crossio ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-primary font-bold px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                        <Check className="w-3.5 h-3.5" />
                        {isTr ? "Evet" : "Yes"}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        <Check className="w-3.5 h-3.5" />
                        {isTr ? "Sıfır Risk" : "Zero Risk"}
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    {row.genericTools ? (
                      <span className="inline-flex items-center text-destructive font-bold text-[11px]">
                        <X className="w-4 h-4 mr-0.5" />
                        {isTr ? "Riskli" : "Risky"}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-[11px]">-</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
