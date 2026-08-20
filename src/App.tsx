import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/pages/HomePage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TermsOfUsePage } from "@/pages/TermsOfUsePage";
import { LicensePage } from "@/pages/LicensePage";
import { LegacyRedirect } from "@/pages/LegacyRedirect";

export const App: React.FC = () => {
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

          {/* Catch-all fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
