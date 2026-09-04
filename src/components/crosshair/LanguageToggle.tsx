import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-1 p-1 rounded-xl bg-card/80 border border-border/80 shadow-sm text-xs backdrop-blur-md ${className}`}
    >
      <Globe className="w-3.5 h-3.5 ml-1.5 text-muted-foreground" />
      <button
        type="button"
        onClick={() => setLanguage("tr")}
        className={`px-2 py-1 rounded-lg font-semibold transition-all duration-200 ${
          language === "tr"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="TR - Türkçe"
      >
        TR
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 rounded-lg font-semibold transition-all duration-200 ${
          language === "en"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="EN - English"
      >
        EN
      </button>
    </div>
  );
};
