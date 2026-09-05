import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { APPS_DATA } from "@/data/apps";
import {
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileText,
  Lock,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.document.title = "App Legal & Policies | flappsio";
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

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
            <span>{t("home.badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            {t("home.titleLine1")} <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              {t("home.titleHighlight")}
            </span>{" "}
            {t("home.titleLine2")}
          </h1>

          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("home.subtitle")}
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative pt-4">
            <Search className="absolute left-3.5 top-7 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("home.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-sm bg-card/80 border-border/80 rounded-2xl shadow-sm focus-visible:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* App List Showcase */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {t("home.appsTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t("home.appsCount", { count: filteredApps.length })}
            </p>
          </div>
        </div>

        {filteredApps.length === 0 ? (
          <div className="text-center p-12 rounded-2xl bg-card border border-border/70">
            <p className="text-muted-foreground text-sm">
              {t("home.noResults")}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="mt-4 text-xs"
            >
              {t("home.resetSearch")}
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
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-primary/80 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="space-y-4">
                  <Link
                    to={app.links.showcase || app.links.privacyPolicy}
                    className="flex items-start justify-between gap-4 group/header cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-background/80 border border-border/80 p-1.5 shadow-inner group-hover/header:scale-105 group-hover/header:border-primary/50 transition-all duration-200">
                        <img
                          src={app.iconUrl}
                          alt={app.name}
                          className="h-full w-full object-contain rounded-xl"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold group-hover/header:text-primary transition-colors">
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
                  </Link>

                  <Link
                    to={app.links.showcase || app.links.privacyPolicy}
                    className="block"
                  >
                    <CardDescription className="text-xs sm:text-sm line-clamp-3 hover:text-foreground transition-colors cursor-pointer">
                      {app.description}
                    </CardDescription>
                  </Link>

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
                  {app.links.showcase && (
                    <Button
                      asChild
                      size="sm"
                      className="w-full text-xs h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-sm justify-between group/main"
                    >
                      <Link to={app.links.showcase}>
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          {t("home.showcaseBtn")}
                        </span>
                        <ChevronRight className="w-4 h-4 group-hover/main:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  )}

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
                          {t("common.privacy")}
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
                          {t("common.terms")}
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
                      <span>{t("home.viewOnPlayStore")}</span>
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
              <h4 className="text-xs font-bold text-foreground">{t("home.privacyTitle")}</h4>
              <p className="text-[11px] text-muted-foreground">{t("home.privacyDesc")}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card/50 border border-border/70 backdrop-blur-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">{t("home.localTitle")}</h4>
              <p className="text-[11px] text-muted-foreground">{t("home.localDesc")}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card/50 border border-border/70 backdrop-blur-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">{t("home.licenseTitle")}</h4>
              <p className="text-[11px] text-muted-foreground">{t("home.licenseDesc")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
