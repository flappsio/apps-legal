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
  const { isTr } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    device: "",
    category: "support",
    message: "",
  });

  const title = isTr
    ? "Destek ve İletişim | Crossio & flappsio"
    : "Support & Contact | Crossio & flappsio";

  const description = isTr
    ? "Crossio teknik destek, hata bildirimi, gizlilik soruları ve önerileriniz için resmi iletişim merkezi."
    : "Official support and contact hub for Crossio. Reach out for technical assistance, privacy questions, bug reports, and feature requests.";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          { name: isTr ? "Ana Sayfa" : "Home", url: "/" },
          { name: "Crossio", url: "/crosshair" },
          { name: isTr ? "Destek" : "Support", url: "/crosshair/support" },
        ]}
      />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {isTr ? "Destek & Yardım Merkezi" : "Support & Help Center"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {isTr ? "Size Nasıl Yardımcı Olabiliriz?" : "How Can We Help You?"}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {isTr
              ? "Her türlü teknik soru, hata bildirimi veya özellik öneriniz için ekibimize doğrudan ulaşabilirsiniz."
              : "Reach out directly for technical assistance, bug reports, or feature suggestions."}
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
                  {isTr ? "Resmi E-Posta Desteği" : "Official Email Support"}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {isTr ? "Doğrudan geliştirici ekibimize yazın:" : "Write directly to our team:"}
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
                <span>{isTr ? "Ortalama Yanıt: < 24 Saat" : "Average Response: < 24h"}</span>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="p-6 rounded-3xl bg-secondary/30 border border-border/60 space-y-3">
              <h4 className="text-xs font-bold text-foreground">
                {isTr ? "Hızlı Çözümler" : "Quick Answers"}
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link to="/crosshair/faq" className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-primary" />
                    <span>{isTr ? "Sıkça Sorulan Sorular" : "Frequently Asked Questions"}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/crosshair/how-to-use" className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    <span>{isTr ? "Kurulum ve İzin Rehberi" : "Setup & Permission Guide"}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/crosshair/guides/sorun-giderme-overlay-izinleri" className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span>{isTr ? "Arka Plan Pil Sorun Giderme" : "Battery Optimization Tips"}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Support / Feedback Form */}
          <div className="md:col-span-2">
            <div className="p-6 sm:p-8 rounded-3xl bg-card/80 border border-border/80 shadow-xl backdrop-blur-md">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {isTr ? "Mesajınız Başarıyla Alındı!" : "Message Received Successfully!"}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                    {isTr
                      ? "Destek talebiniz için teşekkür ederiz. Ekibimiz en kısa sürede e-posta adresiniz üzerinden geri dönüş yapacaktır."
                      : "Thank you for reaching out. Our technical support team will reply to your email address promptly."}
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    size="sm"
                    className="text-xs rounded-xl"
                  >
                    {isTr ? "Yeni Mesaj Gönder" : "Send Another Message"}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-foreground mb-4">
                    {isTr ? "Bize Mesaj Gönderin" : "Send Us a Message"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground">
                        {isTr ? "Adınız" : "Your Name"}
                      </label>
                      <Input
                        required
                        type="text"
                        placeholder={isTr ? "Örn. Can" : "e.g. John"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-10 text-xs bg-background/80 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground">
                        {isTr ? "E-Posta Adresiniz" : "Email Address"}
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
                        {isTr ? "Cihaz Modeli (Opsiyonel)" : "Device Model (Optional)"}
                      </label>
                      <Input
                        type="text"
                        placeholder={isTr ? "Örn. Samsung S23, Xiaomi 13" : "e.g. Pixel 8, Galaxy S24"}
                        value={formData.device}
                        onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                        className="h-10 text-xs bg-background/80 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground">
                        {isTr ? "Konu" : "Topic"}
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full h-10 px-3 text-xs bg-background/80 border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="support">{isTr ? "Teknik Destek / Hata Bildirimi" : "Technical Support / Bug"}</option>
                        <option value="feature">{isTr ? "Yeni Özellik / Nişangah Önerisi" : "Feature / Reticle Request"}</option>
                        <option value="privacy">{isTr ? "Gizlilik & Veri Silme Talebi" : "Privacy & Data Request"}</option>
                        <option value="other">{isTr ? "Diğer" : "Other"}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
                      {isTr ? "Mesajınız" : "Your Message"}
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={
                        isTr
                          ? "Sorunuzu veya karşılaştığınız durumu detaylıca yazabilirsiniz..."
                          : "Please describe your question or issue in detail..."
                      }
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
                    <span>{isTr ? "Mesajı Gönder" : "Submit Message"}</span>
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
