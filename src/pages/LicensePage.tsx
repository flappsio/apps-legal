import React, { useEffect } from "react";
import { MIT_LICENSE_DATA } from "@/data/licenseData";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const LicensePage: React.FC = () => {
  useEffect(() => {
    window.document.title = `${MIT_LICENSE_DATA.title} | flappsio`;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return <LegalLayout document={MIT_LICENSE_DATA} />;
};
