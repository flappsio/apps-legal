import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldAlert } from "lucide-react";

export const CrosshairDisclaimer: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { t } = useLanguage();

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
            <span>{t("disclaimer.title")}</span>
          </h4>
          <p className="leading-relaxed text-[11px] sm:text-xs">
            {t("disclaimer.content")}
          </p>
        </div>
      </div>
    </div>
  );
};
