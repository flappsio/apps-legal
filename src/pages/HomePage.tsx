import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  Search,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Lock,
  Zap,
} from "lucide-react";
import { APPS_DATA } from "@/data/apps";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = APPS_DATA.filter((app) => {
    const query = searchQuery.toLowerCase();
    return (
      app.name.toLowerCase().includes(query) ||
      app.category.toLowerCase().includes(query) ||
      app.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold backdrop-blur-sm animate-pulse-glow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>flappsio Legal & Privacy Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Şeffaf, Güvenilir ve <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-primary bg-clip-text text-transparent">
              Kullanıcı Odaklı
            </span>{" "}
            Politikalar
          </h1>

          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Geliştirdiğimiz tüm mobil uygulamalara ait güncel gizlilik bildirimleri, kullanım koşulları ve veri koruma ilkelerine buradan kolayca ulaşabilirsiniz.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative pt-4">
            <Search className="absolute left-3.5 top-7 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Uygulama adı veya yasal konu ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-sm bg-card/80 border-border/80 rounded-2xl shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* App List Showcase */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Uygulamalar ve Politikalar
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {filteredApps.length} uygulama listeleniyor
            </p>
          </div>
        </div>

        {filteredApps.length === 0 ? (
          <div className="text-center p-12 rounded-2xl bg-card border border-border/70">
            <p className="text-muted-foreground text-sm">
              Aramanızla eşleşen bir uygulama bulunamadı.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="mt-4 text-xs"
            >
              Aramayı Sıfırla
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredApps.map((app) => (
              <Card
                key={app.id}
                className="group relative flex flex-col justify-between overflow-hidden border-border/80 bg-card/70 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Accent top border gradient on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-primary to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-background/80 border border-border/80 p-2 shadow-inner group-hover:scale-105 transition-transform duration-200">
                        <img
                          src={app.iconUrl}
                          alt={app.name}
                          className="h-full w-full object-contain rounded-xl"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold">
                          {app.name}
                        </CardTitle>
                        <span className="text-xs text-muted-foreground">
                          {app.category}
                        </span>
                      </div>
                    </div>

                    <Badge variant={app.badge.variant}>
                      {app.badge.text}
                    </Badge>
                  </div>

                  <CardDescription className="text-xs sm:text-sm line-clamp-3">
                    {app.description}
                  </CardDescription>

                  {/* Highlights list */}
                  <div className="space-y-2 pt-2 border-t border-border/40">
                    {app.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </CardHeader>

                <CardFooter className="pt-2 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2.5 w-full">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full text-xs h-9 justify-between group/btn hover:border-primary/40 hover:bg-primary/10"
                    >
                      <Link to={app.links.privacyPolicy}>
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                          Gizlilik Politikası
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full text-xs h-9 justify-between group/btn hover:border-primary/40 hover:bg-primary/10"
                    >
                      <Link to={app.links.termsOfUse}>
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-primary" />
                          Kullanım Koşulları
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </Button>
                  </div>

                  {app.links.storeUrl && (
                    <a
                      href={app.links.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors w-full text-center"
                    >
                      <span>Google Play Store'da İncele</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Trust Badges Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-card/50 border border-border/70 backdrop-blur-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Gizlilik Önceliğimizdir</h4>
              <p className="text-[11px] text-muted-foreground">Kişisel veriler asla satılmaz veya izinsiz aktarılmaz.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card/50 border border-border/70 backdrop-blur-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Yerel İşleme</h4>
              <p className="text-[11px] text-muted-foreground">Özel tasarımlar ve ayarlar cihazınızda saklanır.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card/50 border border-border/70 backdrop-blur-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Şeffaf Lisanslama</h4>
              <p className="text-[11px] text-muted-foreground">Açık, anlaşılır ve denetlenebilir kullanım şartları.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
