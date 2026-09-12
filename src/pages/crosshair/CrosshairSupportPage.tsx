import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { CrosshairDisclaimer } from "@/components/crosshair/CrosshairDisclaimer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Send,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

export const CrosshairSupportPage: React.FC = () => {
  const { t, isTr } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    device: "",
    category: "support",
    message: "",
  });

  const title = t("supportPage.metaTitle");
  const description = t("supportPage.metaDesc");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const topicLabels: Record<string, string> = {
      support: t("supportPage.topicSupport"),
      feature: t("supportPage.topicFeature"),
      privacy: t("supportPage.topicPrivacy"),
      other: t("supportPage.topicOther"),
    };

    const selectedTopic = topicLabels[formData.category] || formData.category;
    const subject = `[Crossio Support - ${selectedTopic}] ${formData.name}`;

    const bodyLines = [
      `${isTr ? "Ad Soyad" : "Name"}: ${formData.name}`,
      `${isTr ? "E-Posta" : "Email"}: ${formData.email}`,
      formData.device ? `${isTr ? "Cihaz / Model" : "Device / Model"}: ${formData.device}` : "",
      `${isTr ? "Konu" : "Category"}: ${selectedTopic}`,
      "",
      `${isTr ? "Mesaj" : "Message"}:`,
      formData.message,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `mailto:info@flappsio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;
    setMailtoUrl(url);

    // Open mail client directly
    window.location.href = url;
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      device: "",
      category: "support",
      message: "",
    });
    setMailtoUrl("");
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title={title}
        description={description}
        canonicalPath="/crosshair/support"
        keywords={[
          "crossio destek",
          "flappsio iletişim",
          "crossio yardım",
          "crosshair support contact",
        ]}
        breadcrumbs={[
          { name: t("common.home"), url: "/" },
          { name: "Crossio", url: "/crosshair" },
          { name: t("common.support"), url: "/crosshair/support" },
        ]}
      />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {t("supportPage.badge")}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t("supportPage.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("supportPage.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
          {/* Left Column: Direct Contact & Info */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-card/60 border border-border/80 space-y-4">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  {t("supportPage.officialEmail")}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("supportPage.writeDirect")}
                </p>
              </div>
              <a
                href="mailto:info@flappsio.com"
                className="text-xs sm:text-sm font-bold text-primary hover:underline block"
              >
                info@flappsio.com
              </a>
              <div className="pt-2 border-t border-border/40 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>{t("supportPage.avgResponse")}</span>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="p-6 rounded-3xl bg-secondary/30 border border-border/60 space-y-3">
              <h4 className="text-xs font-bold text-foreground">
                {t("supportPage.quickAnswers")}
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link to="/crosshair/faq" className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-primary" />
                    <span>{t("supportPage.faqLink")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/crosshair/how-to-use" className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    <span>{t("supportPage.setupLink")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/crosshair/guides/sorun-giderme-overlay-izinleri" className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span>{t("supportPage.batteryLink")}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Support / Feedback Form */}
          <div className="md:col-span-2">
            <div className="p-6 sm:p-8 rounded-3xl bg-card/80 border border-border/80 shadow-xl backdrop-blur-md">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {t("supportPage.successTitle")}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    {t("supportPage.successDesc")}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    {mailtoUrl && (
                      <Button
                        asChild
                        size="sm"
                        className="text-xs rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-10 px-5 gap-1.5"
                      >
                        <a href={mailtoUrl}>
                          <Mail className="w-3.5 h-3.5" />
                          <span>{t("supportPage.openMailClient")}</span>
                        </a>
                      </Button>
                    )}
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-xl h-10 px-5"
                    >
                      {t("supportPage.sendAnother")}
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-foreground mb-4">
                    {t("supportPage.formTitle")}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground">
                        {t("supportPage.name")}
                      </label>
                      <Input
                        required
                        type="text"
                        placeholder={t("supportPage.namePlaceholder")}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-10 text-xs bg-background/80 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground">
                        {t("supportPage.email")}
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder="ornek@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-10 text-xs bg-background/80 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground">
                        {t("supportPage.device")}
                      </label>
                      <Input
                        type="text"
                        placeholder={t("supportPage.devicePlaceholder")}
                        value={formData.device}
                        onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                        className="h-10 text-xs bg-background/80 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground">
                        {t("supportPage.topic")}
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full h-10 px-3 text-xs bg-background/80 border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="support">{t("supportPage.topicSupport")}</option>
                        <option value="feature">{t("supportPage.topicFeature")}</option>
                        <option value="privacy">{t("supportPage.topicPrivacy")}</option>
                        <option value="other">{t("supportPage.topicOther")}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
                      {t("supportPage.message")}
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={t("supportPage.messagePlaceholder")}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 text-xs bg-background/80 border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs gap-2 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t("supportPage.submit")}</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-6">
          <CrosshairDisclaimer />
        </div>
      </div>
    </div>
  );
};
