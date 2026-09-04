import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { CrosshairDisclaimer } from "@/components/crosshair/CrosshairDisclaimer";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, Zap } from "lucide-react";

export const CrosshairAboutPage: React.FC = () => {
  const { isTr } = useLanguage();

  const title = isTr
    ? "Hakkımızda & Proje Misyonu | Crosshair Valo & flappsio"
    : "About Us & Mission | Crosshair Valo & flappsio";

  const description = isTr
    ? "flappsio ve Crosshair Valo hakkında. Mobil oyuncular için şeffaf, güvenli, gizlilik odaklı ve yüksek performanslı yardımcı araçlar geliştirme vizyonumuz."
    : "About flappsio and Crosshair Valo. Our mission to engineer transparent, safe, privacy-focused, and ultra-performant tools for mobile gamers.";

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
      title: isTr ? "Etik ve Güvenli Mühendislik" : "Safe & Ethical Engineering",
      desc: isTr
        ? "Oyun hileleri, modlar veya bellek enjektörleri geliştirmeyiz. Yalnızca sistem seviyesinde yasal ve güvenli araçlar üretiriz."
        : "We never build cheats, hacks, or injectors. We strictly engineer compliant OS-level accessibility overlays.",
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: isTr ? "Maksimum Performans, Sıfır Şişkinlik" : "Peak Performance, Zero Bloat",
      desc: isTr
        ? "Uygulamalarımız donanımı yormayacak, FPS düşürmeyecek ve pili sömürmeyecek şekilde hafif tasarlanır."
        : "Engineered to have near-zero CPU/RAM overhead without draining battery or causing frame drops.",
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
          "crosshair valo geliştiricisi",
          "flappsio mission",
          "about crosshair valo",
        ]}
        breadcrumbs={[
          { name: isTr ? "Ana Sayfa" : "Home", url: "/" },
          { name: "Crosshair Valo", url: "/crosshair" },
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
            {isTr ? "Oyuncular İçin, Şeffaflıkla" : "Built for Gamers, with Transparency"}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {isTr
              ? "Mobil espor ve FPS oyun deneyimini daha erişilebilir, hassas ve keyifli kılmak için buradayız."
              : "Dedicated to making mobile esports and FPS gaming more accessible, precise, and enjoyable."}
          </p>
        </div>

        {/* Story Section */}
        <div className="p-8 rounded-3xl bg-card/60 border border-border/80 backdrop-blur-sm space-y-4 text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            {isTr ? "flappsio ve Crosshair Valo Hikayesi" : "The Story Behind Crosshair Valo"}
          </h2>
          <p>
            {isTr
              ? "Crosshair Valo, küçük mobil ekranlarda nişangahın arka planla karışması ve hedef almanın zorlaşması problemine temiz bir çözüm üretmek amacıyla doğdu. Piyasada bulunan birçok uygulamanın aşırı reklam dolu, cihazı yoran veya şüpheli izinler isteyen yapısına karşı; şeffaf, hafif ve %100 ban korumalı bir alternatif inşa ettik."
              : "Crosshair Valo was born to solve a fundamental mobile FPS frustration: tiny reticles getting lost against map backgrounds and imprecise hip-fire alignment. Unlike cluttered alternatives laden with invasive ads and shady permissions, we built a transparent, ultra-lightweight, and 100% ban-safe overlay solution."}
          </p>
          <p>
            {isTr
              ? "Bugün 50.000'den fazla aktif oyuncu turnuvalarda, dereceli maçlarda ve günlük oyunlarında Crosshair Valo'ya güveniyor. Kullanıcı geri bildirimlerini dinleyerek uygulamamızı sürekli optimize ediyoruz."
              : "Today, over 50,000 active gamers rely on Crosshair Valo for ranked play and casual matches. We actively iterate based on community feedback to ensure peak reliability."}
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
