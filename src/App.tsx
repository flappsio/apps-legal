import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/pages/HomePage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TermsOfUsePage } from "@/pages/TermsOfUsePage";
import { LicensePage } from "@/pages/LicensePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LegacyRedirect } from "@/pages/LegacyRedirect";

// Crosshair App Pages
import { CrosshairLandingPage } from "@/pages/crosshair/CrosshairLandingPage";
import { CrosshairHowToUsePage } from "@/pages/crosshair/CrosshairHowToUsePage";
import { CrosshairFAQPage } from "@/pages/crosshair/CrosshairFAQPage";
import { CrosshairGuidesPage } from "@/pages/crosshair/CrosshairGuidesPage";
import { CrosshairGuideDetailPage } from "@/pages/crosshair/CrosshairGuideDetailPage";
import { CrosshairAboutPage } from "@/pages/crosshair/CrosshairAboutPage";
import { CrosshairSupportPage } from "@/pages/crosshair/CrosshairSupportPage";

export const App: React.FC = () => {
  const location = useLocation();

  // Known routes list for header/footer rendering
  const knownPrefixes = [
    "/",
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
  ];

  const isKnownRoute = knownPrefixes.some(
    (prefix) =>
      location.pathname === prefix ||
      location.pathname.startsWith(`${prefix}/`) ||
      location.pathname.startsWith(`${prefix}.html`)
  );

  if (!isKnownRoute) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          {/* Main Legal Portal */}
          <Route path="/" element={<HomePage />} />

          {/* Crosshair Showcase & Landing */}
          <Route path="/crosshair" element={<CrosshairLandingPage />} />
          <Route path="/crosshair/how-to-use" element={<CrosshairHowToUsePage />} />
          <Route path="/crosshair/faq" element={<CrosshairFAQPage />} />
          <Route path="/crosshair/guides" element={<CrosshairGuidesPage />} />
          <Route path="/crosshair/guides/:slug" element={<CrosshairGuideDetailPage />} />
          <Route path="/crosshair/about" element={<CrosshairAboutPage />} />
          <Route path="/crosshair/support" element={<CrosshairSupportPage />} />

          {/* Legal Documents */}
          <Route path="/crosshair/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route
            path="/crosshair/privacy-policy.html"
            element={<LegacyRedirect to="/crosshair/privacy-policy" />}
          />
          <Route path="/crosshair/terms-of-use" element={<TermsOfUsePage />} />
          <Route
            path="/crosshair/terms-of-use.html"
            element={<LegacyRedirect to="/crosshair/terms-of-use" />}
          />
          <Route
            path="/crosshair/terms-of-service"
            element={<LegacyRedirect to="/crosshair/terms-of-use" />}
          />
          <Route
            path="/crosshair/terms-of-service.html"
            element={<LegacyRedirect to="/crosshair/terms-of-use" />}
          />

          {/* License */}
          <Route path="/license" element={<LicensePage />} />
          <Route path="/mit-license" element={<LegacyRedirect to="/license" />} />
          <Route path="/license.html" element={<LegacyRedirect to="/license" />} />

          {/* Top-Level Aliases */}
          <Route path="/how-to-use" element={<LegacyRedirect to="/crosshair/how-to-use" />} />
          <Route path="/faq" element={<LegacyRedirect to="/crosshair/faq" />} />
          <Route path="/guides" element={<LegacyRedirect to="/crosshair/guides" />} />
          <Route path="/about" element={<LegacyRedirect to="/crosshair/about" />} />
          <Route path="/support" element={<LegacyRedirect to="/crosshair/support" />} />
          <Route path="/privacy-policy" element={<LegacyRedirect to="/crosshair/privacy-policy" />} />
          <Route
            path="/privacy-policy.html"
            element={<LegacyRedirect to="/crosshair/privacy-policy" />}
          />
          <Route path="/terms-of-use" element={<LegacyRedirect to="/crosshair/terms-of-use" />} />
          <Route
            path="/terms-of-use.html"
            element={<LegacyRedirect to="/crosshair/terms-of-use" />}
          />
          <Route
            path="/terms-of-service"
            element={<LegacyRedirect to="/crosshair/terms-of-use" />}
          />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
