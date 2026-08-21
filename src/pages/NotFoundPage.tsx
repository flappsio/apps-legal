import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowRight } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    window.document.title = "404 - Sayfa Bulunamadı | flappsio";
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* Top Bar with Border Bottom & Backdrop Blur */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 container max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-center py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">

          {/* Left Column: 404 Illustration Image with Code Bubble */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[500px]">

              {/* Floating Code Bubble */}
              <div className="absolute -top-6 sm:-top-2 left-2 sm:left-4 z-20 max-w-[240px] sm:max-w-[270px] rounded-2xl bg-[#14151B] text-white p-4 sm:p-5 shadow-2xl border border-white/10 font-mono text-xs select-none animate-in fade-in zoom-in-95 duration-500">
                <div className="text-emerald-400 font-bold mb-1.5 text-xs">&lt;/&gt;</div>
                <div className="text-indigo-400 font-semibold mb-1 text-xs">ConnectionError:</div>
                <div className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                  The page you're looking for doesn't exist.
                  <span className="inline-block w-1.5 h-3.5 bg-indigo-400 ml-0.5 align-middle animate-pulse" />
                </div>

                {/* Speech Bubble Tail */}
                <div className="absolute -bottom-2.5 left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#14151B]" />
              </div>

              {/* Spaceship Image */}
              <img
                src="/assets/images/404_image.png"
                alt="404 - Sayfa Bulunamadı"
                className="w-full h-auto object-contain drop-shadow-sm select-none pt-14 sm:pt-16"
              />
            </div>
          </div>

          {/* Right Column: Typography & Action */}
          <div className="lg:col-span-6 flex flex-col items-start text-left order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]">
                Bir şeyler <br />
                <span className="text-[#6366F1] dark:text-[#818CF8]">ters</span>{" "}
                <span className="text-[#6366F1] dark:text-[#818CF8]">gitti</span>
                <span className="text-[#10B981] dark:text-[#34D399]">.</span>
              </h1>
            </div>

            <p className="text-muted-foreground text-base sm:text-lg max-w-md leading-relaxed font-normal">
              Aradığın sayfa uzayda kaybolmuş olabilir. Ama üzülme, birlikte buluruz.
            </p>

            <div className="pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#111218] dark:bg-white text-white dark:text-[#111218] font-bold text-sm sm:text-base hover:opacity-90 active:scale-[0.98] transition-all shadow-xl hover:shadow-2xl group"
              >
                <span>Ana Sayfaya Dön</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
