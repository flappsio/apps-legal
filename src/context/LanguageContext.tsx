import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "@/i18n";
import type { TFunction } from "i18next";

export type Language = "tr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isTr: boolean;
  t: TFunction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang");
      if (urlLang === "en" || urlLang === "tr") {
        return urlLang;
      }
      const savedLang = localStorage.getItem("flappsio_lang") as Language | null;
      if (savedLang === "en" || savedLang === "tr") {
        return savedLang;
      }
      const browserLang = navigator.language?.toLowerCase();
      if (browserLang && !browserLang.startsWith("tr")) {
        return "en";
      }
    }
    return (i18n.language as Language) || "tr";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang");
      if (urlLang === "en" || urlLang === "tr") {
        setLanguageState(urlLang);
        i18n.changeLanguage(urlLang);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("flappsio_lang", language);
      document.documentElement.lang = language;
      if (i18n.language !== language) {
        i18n.changeLanguage(language);
      }
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
  };

  const toggleLanguage = () => {
    const next = language === "tr" ? "en" : "tr";
    setLanguage(next);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isTr: language === "tr",
        t: i18n.t.bind(i18n),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
