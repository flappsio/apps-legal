import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/pages/HomePage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TermsOfUsePage } from "@/pages/TermsOfUsePage";
import { LicensePage } from "@/pages/LicensePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LegacyRedirect, CrosshairLegacyRedirect } from "@/pages/LegacyRedirect";
import { CrosshairLandingPage } from "@/pages/crossio/CrosshairLandingPage";
import { CrosshairHowToUsePage } from "@/pages/crossio/CrosshairHowToUsePage";
import { CrosshairFAQPage } from "@/pages/crossio/CrosshairFAQPage";
import { CrosshairGuidesPage } from "@/pages/crossio/CrosshairGuidesPage";
import { CrosshairGuideDetailPage } from "@/pages/crossio/CrosshairGuideDetailPage";
import { CrosshairAboutPage } from "@/pages/crossio/CrosshairAboutPage";
import { CrosshairSupportPage } from "@/pages/crossio/CrosshairSupportPage";
import ModelPreviewPage from "@/pages/ModelPreviewPage";

const CrosshairEditorPage = lazy(() => import("@/pages/crossio/CrosshairEditorPage"));

export const App: React.FC = () => {
  const location = useLocation();
  const isEditor = location.pathname.replace(/\/$/, "") === "/crossio/editor";
  const knownPrefixes = [
    "/",
    "/crossio",
    "/crosshair",
    "/how-to-use",
    "/faq",
    "/guides",
    "/about",
    "/support",
    "/license",
    "/mit-license",
    "/privacy-policy",
    "/terms-of-use",
    "/terms-of-service",
    "/model-preview",
  ];
  const isKnownRoute = knownPrefixes.some(
    (prefix) =>
      location.pathname === prefix ||
      location.pathname.startsWith(`${prefix}/`) ||
      location.pathname.startsWith(`${prefix}.html`)
  );

  if (!isKnownRoute) return <NotFoundPage />;

  return (
    <div className="flex flex-col min-h-screen">
      {!isEditor && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crossio" element={<CrosshairLandingPage />} />
          <Route path="/crossio/editor" element={<Suspense fallback={<div className="min-h-screen bg-background" aria-busy="true" />}><CrosshairEditorPage /></Suspense>} />
          <Route path="/crossio/how-to-use" element={<CrosshairHowToUsePage />} />
          <Route path="/crossio/faq" element={<CrosshairFAQPage />} />
          <Route path="/crossio/guides" element={<CrosshairGuidesPage />} />
          <Route path="/crossio/guides/:slug" element={<CrosshairGuideDetailPage />} />
          <Route path="/crossio/about" element={<CrosshairAboutPage />} />
          <Route path="/crossio/support" element={<CrosshairSupportPage />} />
          <Route path="/crossio/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/crossio/privacy-policy.html" element={<LegacyRedirect to="/crossio/privacy-policy" />} />
          <Route path="/crossio/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/crossio/terms-of-use.html" element={<LegacyRedirect to="/crossio/terms-of-use" />} />
          <Route path="/crossio/terms-of-service" element={<LegacyRedirect to="/crossio/terms-of-use" />} />
          <Route path="/crossio/terms-of-service.html" element={<LegacyRedirect to="/crossio/terms-of-use" />} />
          <Route path="/license" element={<LicensePage />} />
          <Route path="/mit-license" element={<LegacyRedirect to="/license" />} />
          <Route path="/license.html" element={<LegacyRedirect to="/license" />} />
          <Route path="/how-to-use" element={<LegacyRedirect to="/crossio/how-to-use" />} />
          <Route path="/faq" element={<LegacyRedirect to="/crossio/faq" />} />
          <Route path="/guides" element={<LegacyRedirect to="/crossio/guides" />} />
          <Route path="/about" element={<LegacyRedirect to="/crossio/about" />} />
          <Route path="/support" element={<LegacyRedirect to="/crossio/support" />} />
          <Route path="/privacy-policy" element={<LegacyRedirect to="/crossio/privacy-policy" />} />
          <Route path="/privacy-policy.html" element={<LegacyRedirect to="/crossio/privacy-policy" />} />
          <Route path="/terms-of-use" element={<LegacyRedirect to="/crossio/terms-of-use" />} />
          <Route path="/terms-of-use.html" element={<LegacyRedirect to="/crossio/terms-of-use" />} />
          <Route path="/terms-of-service" element={<LegacyRedirect to="/crossio/terms-of-use" />} />
          <Route path="/crosshair/*" element={<CrosshairLegacyRedirect />} />
          <Route path="/model-preview" element={<ModelPreviewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isEditor && (location.pathname.replace(/\/$/, "") === "/crossio" ? <CinematicFooter /> : <Footer />)}
    </div>
  );
};

export default App;
