import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TESTIMONIALS_DATA } from "@/data/crosshairTranslations";
import { Star, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const CrosshairTestimonials: React.FC = () => {
  const { t, isTr } = useLanguage();

  return (
    <section className="py-16 sm:py-24 border-t border-border/40 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="brand" className="text-xs px-3 py-1 font-semibold">
            {t("testimonials.badge")}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {t("testimonials.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* Testimonials 4-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS_DATA.map((t, i) => (
            <div
              key={i}
              className="p-6 sm:p-7 rounded-3xl bg-card/60 border border-border/80 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center font-bold text-primary text-sm">
                      {t.avatarInitial}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-foreground">{t.name}</h3>
                        <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
                    "{isTr ? t.comment.tr : t.comment.en}"
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t.game}</span>
                <span className="font-semibold text-primary font-mono">{t.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
