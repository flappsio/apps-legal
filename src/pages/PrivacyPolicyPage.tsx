import React from "react";
import {
  CROSSHAIR_PRIVACY_POLICY_TR,
  CROSSHAIR_PRIVACY_POLICY_EN,
} from "@/data/crosshairLegalData";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { useLanguage } from "@/context/LanguageContext";

export const PrivacyPolicyPage: React.FC = () => {
  const { t, isTr } = useLanguage();
  const document = isTr ? CROSSHAIR_PRIVACY_POLICY_TR : CROSSHAIR_PRIVACY_POLICY_EN;

  return (
    <>
      <SEOHead
        title={`${document.title} - ${document.subtitle} | flappsio`}
        description={document.metaDescription}
        canonicalPath="/crosshair/privacy-policy"
        breadcrumbs={[
          { name: t("common.home"), url: "/" },
          { name: "Crossio", url: "/crosshair" },
          { name: t("common.privacy"), url: "/crosshair/privacy-policy" },
        ]}
      />
      <LegalLayout document={document} />
    </>
  );
};
