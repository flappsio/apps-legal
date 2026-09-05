import React from "react";
import { CROSSHAIR_TERMS_OF_USE } from "@/data/crosshairLegalData";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { SEOHead } from "@/components/seo/SEOHead";

export const TermsOfUsePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title={`${CROSSHAIR_TERMS_OF_USE.title} - ${CROSSHAIR_TERMS_OF_USE.subtitle} | flappsio`}
        description={CROSSHAIR_TERMS_OF_USE.metaDescription}
        canonicalPath="/crosshair/terms-of-use"
        breadcrumbs={[
          { name: "Ana Sayfa", url: "/" },
          { name: "Crossio", url: "/crosshair" },
          { name: "Kullanım Koşulları", url: "/crosshair/terms-of-use" },
        ]}
      />
      <LegalLayout document={CROSSHAIR_TERMS_OF_USE} />
    </>
  );
};
