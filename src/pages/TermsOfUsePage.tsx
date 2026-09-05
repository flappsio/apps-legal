import React from "react";
import {
  CROSSHAIR_TERMS_OF_USE_TR,
  CROSSHAIR_TERMS_OF_USE_EN,
} from "@/data/crosshairLegalData";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { useLanguage } from "@/context/LanguageContext";

export const TermsOfUsePage: React.FC = () => {
  const { t, isTr } = useLanguage();
  const document = isTr ? CROSSHAIR_TERMS_OF_USE_TR : CROSSHAIR_TERMS_OF_USE_EN;

  return (
    <>
      <SEOHead
        title={`${document.title} - ${document.subtitle} | flappsio`}
        description={document.metaDescription}
        canonicalPath="/crosshair/terms-of-use"
        breadcrumbs={[
          { name: t("common.home"), url: "/" },
          { name: "Crossio", url: "/crosshair" },
          { name: t("common.terms"), url: "/crosshair/terms-of-use" },
        ]}
      />
      <LegalLayout document={document} />
    </>
  );
};
