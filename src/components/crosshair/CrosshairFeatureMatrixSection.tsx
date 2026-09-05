import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  Sparkles,
  ShieldCheck,
  Palette,
  Sliders,
  BatteryCharging,
} from "lucide-react";

export const CrosshairFeatureMatrixSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"features" | "comparison">("features");

  const comparisonRows = [
    {
      title: t("featureMatrix.rowImportTitle"),
      crossio: t("featureMatrix.rowImportCrossio"),
      standard: t("featureMatrix.rowImportDefault"),
      crossioSupported: true,
      standardSupported: false,
    },
    {
      title: t("featureMatrix.rowDesignerTitle"),
      crossio: t("featureMatrix.rowDesignerCrossio"),
      standard: t("featureMatrix.rowDesignerDefault"),
      crossioSupported: true,
      standardSupported: false,
    },
    {
      title: t("featureMatrix.rowHudTitle"),
      crossio: t("featureMatrix.rowHudCrossio"),
      standard: t("featureMatrix.rowHudDefault"),
      crossioSupported: true,
      standardSupported: false,
    },
    {
      title: t("featureMatrix.rowSafeTitle"),
      crossio: t("featureMatrix.rowSafeCrossio"),
      standard: t("featureMatrix.rowSafeDefault"),
      crossioSupported: true,
      standardSupported: false,
    },
    {
      title: t("featureMatrix.rowRootTitle"),
      crossio: t("featureMatrix.rowRootCrossio"),
      standard: t("featureMatrix.rowRootDefault"),
      crossioSupported: true,
      standardSupported: false,
    },
    {
      title: t("featureMatrix.rowPrivacyTitle"),
      crossio: t("featureMatrix.rowPrivacyCrossio"),
      standard: t("featureMatrix.rowPrivacyDefault"),
      crossioSupported: true,
      standardSupported: false,
    },
    {
      title: t("featureMatrix.rowBatteryTitle"),
      crossio: t("featureMatrix.rowBatteryCrossio"),
      standard: t("featureMatrix.rowBatteryDefault"),
      crossioSupported: true,
      standardSupported: false,
    },
  ];

  return (
    <section id="feature-matrix" className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Badge variant="brand" className="text-xs px-3.5 py-1.5 font-semibold gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("featureMatrix.badge")}</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {t("featureMatrix.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("featureMatrix.subtitle")}
          </p>

          {/* Toggle Switch */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-secondary/60 border border-border/60 mt-4">
            <button
              type="button"
              onClick={() => setActiveTab("features")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "features"
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("featureMatrix.tabFeatures")}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("comparison")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "comparison"
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("featureMatrix.tabComparison")}
            </button>
          </div>
        </div>

        {/* TAB 1: ALL CAPABILITIES GRID */}
        {activeTab === "features" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {/* 1. Design & Creation */}
            <div className="p-6 sm:p-8 rounded-3xl bg-card/60 border border-border/70 backdrop-blur-sm space-y-4 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {t("featureMatrix.catDesigner")}
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">Galeriden Resim İçe Aktarma:</strong> JPG, JPEG ve şeffaf PNG formatlarını doğrudan ekrana nişangah olarak aktarın.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">Detaylı Arayüz Tasarımcısı:</strong> Boyut, kalınlık, merkez boşluğu, opaklık ve merkez noktayı bağımsız kaydırıcılarla ayarlayın.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">7 Temel Geometri:</strong> Artı (+), Nokta (•), Çember (○), Halka+Nokta (⊕), T-Tipi (T), Elmas (◇), Kutu (□).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">Siyah Dış Çizgi (Outline):</strong> Açık ve karanlık zeminlerde nişangahın kaybolmasını önleyen yüksek kontrast modu.
                  </span>
                </li>
              </ul>
            </div>

            {/* 2. HUD & Mobile Ergonomics */}
            <div className="p-6 sm:p-8 rounded-3xl bg-card/60 border border-border/70 backdrop-blur-sm space-y-4 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {t("featureMatrix.catHud")}
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">Yüzen Hızlı Kontrol Tuşu:</strong> Oyundan çıkmadan tek dokunuşla nişangahı açma, kapatma ve kilitleme.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">Milimetrik Merkez Kilidi:</strong> Cihaz ekranının tam merkezine otomatik piksel hizalama ve elle hassas kaydırma.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">Tek Başparmak Ergonomisi:</strong> Mobil ekranlara özel büyük dokunmatik kontrol alanları.
                  </span>
                </li>
              </ul>
            </div>

            {/* 3. Security & Anti-Cheat Compliance */}
            <div className="p-6 sm:p-8 rounded-3xl bg-card/60 border border-border/70 backdrop-blur-sm space-y-4 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {t("featureMatrix.catSecurity")}
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">Sıfır Ban Riski (Anti-Cheat Safe):</strong> Oyun belleğine kanca atmaz, kod enjekte etmez veya dosya değiştirmez.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">Root İstemez:</strong> Standart Android <code className="text-primary font-mono text-[11px] bg-secondary px-1 py-0.5 rounded">SYSTEM_ALERT_WINDOW</code> izin katmanını kullanır.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">Ağ Trafiğine Dokunmaz:</strong> Oyunların internet bağlantısına, paketlerine veya sunucu trafiğine asla erişmez.
                  </span>
                </li>
              </ul>
            </div>

            {/* 4. Privacy & Performance */}
            <div className="p-6 sm:p-8 rounded-3xl bg-card/60 border border-border/70 backdrop-blur-sm space-y-4 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {t("featureMatrix.catPrivacy")}
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">%100 Çevrimdışı Çalışma:</strong> İnternet bağlantısı gerektirmez; tüm ayarlar cihazınızda Hive ile yerel saklanır.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">Hafif Render & Pil Dostu:</strong> Pasif Android yüzeyi üzerinde çizim yapar, GPU veya bataryayı yormaz.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">Kalıcı Bildirim Kontrolü:</strong> Android ön plan servisi ile bildirim çubuğundan tek tıkla durdurulabilir.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: COMPARISON TABLE */}
        {activeTab === "comparison" && (
          <div className="rounded-3xl border border-border/70 overflow-hidden bg-card/60 backdrop-blur-sm shadow-xl animate-in fade-in duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-secondary/40">
                    <th className="p-4 sm:p-5 font-bold text-foreground w-1/3">
                      {t("featureMatrix.colFeature")}
                    </th>
                    <th className="p-4 sm:p-5 font-bold text-primary w-1/3 bg-primary/5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span>{t("featureMatrix.colCrossio")}</span>
                      </div>
                    </th>
                    <th className="p-4 sm:p-5 font-bold text-muted-foreground w-1/3">
                      {t("featureMatrix.colDefault")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 sm:p-5 font-medium text-foreground">
                        {row.title}
                      </td>
                      <td className="p-4 sm:p-5 bg-primary/5">
                        <div className="flex items-start gap-2 text-foreground font-semibold">
                          <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{row.crossio}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <X className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                          <span>{row.standard}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
