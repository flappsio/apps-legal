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

export const App: React.FC = () => {
  const location = useLocation();

  // Check known routes to conditionally hide standard Header/Footer on 404 page
  const knownRoutes = [
    "/",
    "/crosshair/privacy-policy",
    "/crosshair/privacy-policy.html",
    "/crosshair/terms-of-use",
    "/crosshair/terms-of-use.html",
    "/license",
    "/mit-license",
    "/license.html",
    "/privacy-policy",
    "/privacy-policy.html",
    "/terms-of-use",
    "/terms-of-use.html",
  ];

  const isNotFound = !knownRoutes.includes(location.pathname);

  if (isNotFound) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/crosshair/privacy-policy"
            element={<PrivacyPolicyPage />}
          />
          <Route
            path="/crosshair/privacy-policy.html"
            element={<LegacyRedirect to="/crosshair/privacy-policy" />}
          />
          <Route
            path="/crosshair/terms-of-use"
            element={<TermsOfUsePage />}
          />
          <Route
            path="/crosshair/terms-of-use.html"
            element={<LegacyRedirect to="/crosshair/terms-of-use" />}
          />

          {/* License routes */}
          <Route path="/license" element={<LicensePage />} />
          <Route path="/mit-license" element={<LegacyRedirect to="/license" />} />
          <Route path="/license.html" element={<LegacyRedirect to="/license" />} />

          {/* Top-level redirect aliases */}
          <Route
            path="/privacy-policy"
            element={<LegacyRedirect to="/crosshair/privacy-policy" />}
          />
          <Route
            path="/privacy-policy.html"
            element={<LegacyRedirect to="/crosshair/privacy-policy" />}
          />
          <Route
            path="/terms-of-use"
            element={<LegacyRedirect to="/crosshair/terms-of-use" />}
          />
          <Route
            path="/terms-of-use.html"
            element={<LegacyRedirect to="/crosshair/terms-of-use" />}
          />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
