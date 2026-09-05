import React from "react";
import { CROSSHAIR_PRIVACY_POLICY } from "@/data/crosshairLegalData";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { SEOHead } from "@/components/seo/SEOHead";

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title={`${CROSSHAIR_PRIVACY_POLICY.title} - ${CROSSHAIR_PRIVACY_POLICY.subtitle} | flappsio`}
        description={CROSSHAIR_PRIVACY_POLICY.metaDescription}
        canonicalPath="/crosshair/privacy-policy"
        breadcrumbs={[
          { name: "Ana Sayfa", url: "/" },
          { name: "Crossio", url: "/crosshair" },
          { name: "Gizlilik Politikası", url: "/crosshair/privacy-policy" },
        ]}
      />
      <LegalLayout document={CROSSHAIR_PRIVACY_POLICY} />
    </>
  );
};
