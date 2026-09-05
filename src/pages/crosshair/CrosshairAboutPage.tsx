import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { CrosshairDisclaimer } from "@/components/crosshair/CrosshairDisclaimer";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, Zap } from "lucide-react";

export const CrosshairAboutPage: React.FC = () => {
  const { isTr } = useLanguage();

  const title = isTr
    ? "Hakkımızda & Proje Misyonu | Crossio & flappsio"
    : "About Us & Mission | Crossio & flappsio";

  const description = isTr
    ? "flappsio ve Crossio hakkında. Android için şeffaf, kullanıcı kontrollü ve gizlilik odaklı yardımcı araçlar geliştirme vizyonumuz."
    : "About flappsio and Crossio. Our mission is to build transparent, user-controlled, privacy-conscious Android utilities.";

  const values = [
    {
      icon: <Lock className="w-5 h-5 text-primary" />,
      title: isTr ? "Kullanıcı Gizliliği Önceliğimizdir" : "Privacy First",
      desc: isTr
        ? "Özel tasarımlarınız ve kişisel verileriniz asla satılmaz, cihazınızda yerel tutulur."
        : "Your custom designs and data are never monetized or sold; they remain local to your device.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#00E5FF]" />,
      title: isTr ? "Şeffaf ve Etik Mühendislik" : "Transparent & Ethical Engineering",
      desc: isTr
        ? "Otomatik nişan alma, otomatik dokunma, makro veya bellek enjeksiyonu geliştirmeyiz. Crossio, Android'in standart katman iznini kullanan kullanıcı kontrollü bir görsel araçtır."
        : "We do not build auto-aim, auto-tap, macros, or memory injection. Crossio is a user-controlled visual tool that uses Android's standard overlay permission.",
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: isTr ? "Sade ve Ölçülü Tasarım" : "Focused, Measured Design",
      desc: isTr
        ? "Uygulamayı gereksiz işlevlerden arındırıp kaynak kullanımını farklı cihazlarda izlemeye ve iyileştirmeye odaklanırız."
        : "We keep the app focused, monitor resource use across devices, and improve it without making absolute performance claims.",
    },
  ];

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title={title}
        description={description}
        canonicalPath="/crosshair/about"
        keywords={[
          "flappsio hakkında",
          "crossio geliştiricisi",
          "flappsio mission",
          "about crossio",
        ]}
        breadcrumbs={[
          { name: isTr ? "Ana Sayfa" : "Home", url: "/" },
          { name: "Crossio", url: "/crosshair" },
          { name: isTr ? "Hakkımızda" : "About", url: "/crosshair/about" },
        ]}
      />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {isTr ? "Hakkımızda & Vizyonumuz" : "About Us & Vision"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {isTr ? "Kullanıcılar İçin, Şeffaflıkla" : "Built for Users, with Transparency"}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {isTr
              ? "Android'de görsel özelleştirmeyi daha şeffaf, anlaşılır ve kullanıcı kontrollü kılmak için buradayız."
              : "We are here to make visual customization on Android more transparent, understandable, and user-controlled."}
          </p>
        </div>

        {/* Story Section */}
        <div className="p-8 rounded-3xl bg-card/60 border border-border/80 backdrop-blur-sm space-y-4 text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            {isTr ? "flappsio ve Crossio Hikayesi" : "The Story Behind Crossio"}
          </h2>
          <p>
            {isTr
              ? "Crossio, kullanıcıların hazır bir tasarım seçebilmesi, kendi görsellerini yerel olarak ekleyebilmesi ve nişangah görünümünü ayrıntılı biçimde özelleştirebilmesi için geliştirildi. İzinlerin ne yaptığına dair açık açıklamalar ve kullanıcı tarafından başlatılan bir katman deneyimi sunmayı önemsiyoruz."
              : "Crossio was created so users can choose a built-in design, add their own local images, and customize a crosshair's appearance in detail. We prioritize clear permission disclosures and an overlay experience that the user starts explicitly."}
          </p>
          <p>
            {isTr
              ? "Crossio'yu kullanıcı geri bildirimlerini ve Android platform gereksinimlerini dikkate alarak geliştirmeyi sürdürüyoruz."
              : "We continue to develop Crossio with user feedback and Android platform requirements in mind."}
          </p>
        </div>

        {/* Core Values 3-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          {values.map((v, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-card/40 border border-border/70 space-y-3"
            >
              <div className="p-3 rounded-2xl bg-secondary/80 border border-border/60 w-fit">
                {v.icon}
              </div>
              <h3 className="text-sm font-bold text-foreground">{v.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="pt-4">
          <CrosshairDisclaimer />
        </div>
      </div>
    </div>
  );
};
