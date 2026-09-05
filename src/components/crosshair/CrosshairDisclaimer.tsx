import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldAlert } from "lucide-react";

export const CrosshairDisclaimer: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { isTr } = useLanguage();

  return (
    <div
      className={`p-5 rounded-2xl bg-secondary/40 border border-border/70 backdrop-blur-sm text-xs text-muted-foreground ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-foreground text-xs flex items-center gap-1.5">
            <span>
              {isTr
                ? "Fikri Mülkiyet ve Bağımsızlık Beyanı (Disclaimer)"
                : "Intellectual Property & Independence Disclaimer"}
            </span>
          </h4>
          <p className="leading-relaxed text-[11px] sm:text-xs">
            {isTr ? (
              <>
                <strong>Crossio</strong>, bağımsız bir Android yardımcı aracıdır ve hiçbir üçüncü taraf oyun geliştiricisi, yayıncısı veya platformu tarafından desteklenmez ya da onaylanmaz. Bazı oyunlar ve rekabetçi platformlar görsel katmanları kısıtlayabilir; kullandığınız hizmetin kurallarını kontrol etmek sizin sorumluluğunuzdadır.
              </>
            ) : (
              <>
                <strong>Crossio</strong> is an independent Android utility and is not endorsed or approved by any third-party game developer, publisher, or platform. Some games and competitive platforms may restrict visual overlays; you are responsible for checking the rules of each service you use.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
