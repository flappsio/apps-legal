import React, { useEffect } from "react";
import { CROSSHAIR_TERMS_OF_USE } from "@/data/crosshairLegalData";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const TermsOfUsePage: React.FC = () => {
  useEffect(() => {
    window.document.title = `${CROSSHAIR_TERMS_OF_USE.title} - ${CROSSHAIR_TERMS_OF_USE.subtitle} | flappsio`;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return <LegalLayout document={CROSSHAIR_TERMS_OF_USE} />;
};
