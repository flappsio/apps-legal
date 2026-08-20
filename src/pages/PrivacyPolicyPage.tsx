import React, { useEffect } from "react";
import { CROSSHAIR_PRIVACY_POLICY } from "@/data/crosshairLegalData";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.document.title = `${CROSSHAIR_PRIVACY_POLICY.title} - ${CROSSHAIR_PRIVACY_POLICY.subtitle} | flappsio`;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return <LegalLayout document={CROSSHAIR_PRIVACY_POLICY} />;
};
