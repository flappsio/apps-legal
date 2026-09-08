"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ArrowUpRight, Crosshair, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { APPS_DATA } from "@/data/apps";
import "./motion-footer.css";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type MagneticButtonProps = { className?: string; children: React.ReactNode } & (
  | ({ as: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ as?: "button" } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

export function MagneticButton(props: MagneticButtonProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
      const move = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        gsap.to(element, { x: (event.clientX - rect.left - rect.width / 2) * .18, y: (event.clientY - rect.top - rect.height / 2) * .18, duration: .4, overwrite: "auto" });
      };
      const leave = () => { gsap.to(element, { x: 0, y: 0, duration: .8, ease: "elastic.out(1, .4)", overwrite: "auto" }); };
      element.addEventListener("mousemove", move);
      element.addEventListener("mouseleave", leave);
      return () => {
        element.removeEventListener("mousemove", move);
        element.removeEventListener("mouseleave", leave);
        gsap.killTweensOf(element);
        gsap.set(element, { clearProps: "transform" });
      };
    });
    return () => mm.revert();
  }, []);
  const className = cn("footer-glass-pill", props.className);
  if (props.as === "a") {
    const { as: _as, ...rest } = props;
    return <span ref={ref} className="inline-flex"><a {...rest} className={className} /></span>;
  }
  const { as: _as, ...rest } = props;
  return <span ref={ref} className="inline-flex"><button type="button" {...rest} className={className} /></span>;
}

export function CinematicFooter() {
  const { isTr } = useLanguage();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".footer-giant-bg-text", { y: 70, opacity: .2 }, { y: 0, opacity: 1, scrollTrigger: { trigger: wrapperRef.current, start: "top bottom", end: "bottom bottom", scrub: 1 } });
        gsap.fromTo(".footer-reveal", { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: .12, ease: "power3.out", scrollTrigger: { trigger: wrapperRef.current, start: "top 65%" } });
      }, wrapperRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);
  const words = isTr ? ["Senin nişangahın", "Senin tarzın", "Piksel hassasiyeti", "Android için tasarlandı"] : ["Your crosshair", "Your style", "Pixel precision", "Built for Android"];
  return (
    <div ref={wrapperRef} className="cinematic-footer-curtain" id="cinematic-footer">
      <footer className="cinematic-footer-wrapper">
        <div className="footer-aurora" aria-hidden="true" />
        <div className="footer-bg-grid" aria-hidden="true" />
        <div className="footer-giant-bg-text" aria-hidden="true">CROSSIO</div>
        <div className="footer-marquee" aria-hidden="true"><div className="footer-marquee-track">{[0, 1].map(copy => <div key={copy}>{words.map(word => <React.Fragment key={word}><span>{word}</span><span className="text-primary">✦</span></React.Fragment>)}</div>)}</div></div>
        <div className="footer-center">
          <div className="footer-reveal footer-eyebrow"><Crosshair size={16} /> {isTr ? "TAM SENİN ODAĞINDA" : "RIGHT AT YOUR CENTER"}</div>
          <h2 className="footer-reveal footer-title">{isTr ? "Odağını bul." : "Find your focus."}<br /><span>{isTr ? "Tarzını yansıt." : "Make it yours."}</span></h2>
          <p className="footer-reveal text-muted-foreground max-w-md text-center text-sm sm:text-base">{isTr ? "Küçük bir detay. Sana ait bir deneyim. Crossio ile kendi nişangahını tasarla." : "A small detail. An experience that is yours. Create your own crosshair with Crossio."}</p>
          <div className="footer-reveal mt-8 flex flex-wrap justify-center gap-3">
            <MagneticButton as="a" href={APPS_DATA[0].links.storeUrl} target="_blank" rel="noopener noreferrer" className="footer-download"><Download size={19} /> Google Play <ArrowUpRight size={17} /></MagneticButton>
            <MagneticButton as="a" href="/crosshair/how-to-use">{isTr ? "Nasıl çalışır?" : "How it works"}<ArrowUpRight size={16} /></MagneticButton>
          </div>
          <nav aria-label={isTr ? "Alt bilgi bağlantıları" : "Footer links"} className="footer-reveal mt-6 flex flex-wrap justify-center gap-2">
            <MagneticButton as="a" href="/crosshair/privacy-policy">{isTr ? "Gizlilik politikası" : "Privacy policy"}</MagneticButton>
            <MagneticButton as="a" href="/crosshair/terms-of-use">{isTr ? "Kullanım koşulları" : "Terms of use"}</MagneticButton>
            <MagneticButton as="a" href="/crosshair/support">{isTr ? "Destek" : "Support"}</MagneticButton>
          </nav>
        </div>
        <div className="footer-bottom">
          <a href="/" className="font-bold tracking-tight text-lg">flapps<span className="text-primary">io</span><span className="ml-3 text-xs font-normal text-muted-foreground">© {new Date().getFullYear()}</span></a>
          <span className="text-xs text-muted-foreground">{isTr ? "Özenle tasarlandı. Sana özel." : "Crafted with care. Made for you."}</span>
          <MagneticButton aria-label={isTr ? "Sayfanın başına dön" : "Back to top"} className="!p-3" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}><ArrowUp size={19} /></MagneticButton>
        </div>
      </footer>
    </div>
  );
}

