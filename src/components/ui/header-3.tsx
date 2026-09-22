"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Download, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/crossio/LanguageToggle";
import { cn } from "@/lib/utils";

export interface HeaderLink {
  title: string;
  description?: string;
  href: string;
  icon: LucideIcon;
}
interface HeaderProps {
  logoSrc: string;
  homeLabel: string;
  productLinks: HeaderLink[];
  resourceLinks: HeaderLink[];
  legalLinks: HeaderLink[];
  isTr: boolean;
}
const storeUrl = "https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair";

export function Header({ logoSrc, homeLabel, productLinks, resourceLinks, legalLinks, isTr }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const location = useLocation();
  const editorLabel = isTr ? "Editörü aç" : "Open editor";
  const resourcesLabel = isTr ? "Kaynaklar" : "Resources";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDesktopMenu("");
    if (location.pathname !== "/crossio" || location.hash !== "#gallery-section") return;
    const scrollToGallery = () => {
      const section = document.getElementById("gallery-section");
      if (!section) return false;
      section.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
      return true;
    };
    if (scrollToGallery()) return;
    const observer = new MutationObserver(() => { if (scrollToGallery()) observer.disconnect(); });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 5000);
    return () => { observer.disconnect(); window.clearTimeout(timeout); };
  }, [location]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", onResize);
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      media.removeEventListener("change", onResize);
    };
  }, [open]);

  const closeMenus = () => { setOpen(false); setDesktopMenu(""); };
  const isActive = (href: string) => href.includes("#")
    ? location.pathname + location.hash === href
    : location.pathname === href && !location.hash;
  const item = (link: HeaderLink, desktop = false) => {
    const Icon = link.icon;
    const content = (
      <Link to={link.href} onClick={closeMenus} aria-current={isActive(link.href) ? "page" : undefined} className={cn("flex min-h-11 items-center gap-3 rounded-lg p-3 text-left hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", isActive(link.href) && "bg-accent/15 text-foreground")}>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background"><Icon className="h-4 w-4" aria-hidden="true" /></span>
        <span><span className="block text-sm font-medium">{link.title}</span>{link.description && <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{link.description}</span>}</span>
      </Link>
    );
    return desktop ? <NavigationMenuLink asChild active={isActive(link.href)}>{content}</NavigationMenuLink> : content;
  };
  const actions = (mobile = false) => <>
    <Button asChild variant="outline" className={cn("h-11 rounded-lg", mobile && "w-full")}><Link to="/crossio/editor" onClick={closeMenus}>{editorLabel}</Link></Button>
    <Button asChild className={cn("h-11 gap-2 rounded-lg", mobile && "w-full")}><a href={storeUrl} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" aria-hidden="true" />Google Play</a></Button>
  </>;

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b border-transparent bg-background transition-colors duration-200", scrolled && "border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-lg")}>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-5">
          <Link to="/" aria-label={homeLabel} className="flex h-11 w-28 shrink-0 items-center overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><img src={logoSrc} alt="flappsio" className="h-28 w-28 object-contain" /></Link>
          <NavigationMenu value={desktopMenu} onValueChange={setDesktopMenu} className="relative hidden lg:block" aria-label={isTr ? "Ana menü" : "Main navigation"}>
            <NavigationMenuList className="flex items-center gap-1">
              <NavigationMenuItem value="product">
                <NavigationMenuTrigger>Crossio</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-2 gap-1">{productLinks.map(link => <li key={link.href}>{item(link, true)}</li>)}</ul>
                  <div className="mt-1 border-t border-border px-3 py-3"><NavigationMenuLink asChild><Link to="/" onClick={closeMenus} className="flex min-h-8 items-center justify-between rounded text-sm text-muted-foreground hover:text-foreground">{isTr ? "Tüm uygulamaları keşfet" : "Explore all apps"}<ArrowUpRight className="h-4 w-4" /></Link></NavigationMenuLink></div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem value="resources">
                <NavigationMenuTrigger>{resourcesLabel}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-[1.15fr_1fr] gap-2">
                    <ul className="space-y-1">{resourceLinks.map(link => <li key={link.href}>{item(link, true)}</li>)}</ul>
                    <ul className="space-y-1 border-l border-border p-2">{legalLinks.map(link => <li key={link.href}><NavigationMenuLink asChild active={isActive(link.href)}><Link to={link.href} onClick={closeMenus} className="flex min-h-11 items-center gap-2 rounded-lg px-2 py-3 text-sm hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><link.icon className="h-4 w-4 shrink-0 text-muted-foreground" />{link.title}</Link></NavigationMenuLink></li>)}</ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuLink asChild><Link to="/crossio/support" onClick={closeMenus} className="flex h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-accent/15 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{isTr ? "Destek" : "Support"}</Link></NavigationMenuLink></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden lg:block"><LanguageToggle /></div>
          <ThemeToggle className="h-11 w-11" />
          <div className="hidden items-center gap-2 lg:flex">{actions()}</div>
          <Button type="button" size="icon" variant="outline" className="h-11 w-11 rounded-lg lg:hidden" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label={isTr ? "Menüyü aç" : "Open menu"}><MenuToggleIcon open={open} /></Button>
        </div>
      </div>
      {open && createPortal(
        <dialog ref={dialogRef} id="mobile-menu" aria-labelledby="mobile-menu-title" onCancel={() => setOpen(false)} onClose={() => setOpen(false)} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-background p-0 text-foreground backdrop:bg-background">
          <div className="flex h-full flex-col">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4"><h2 id="mobile-menu-title" className="text-lg font-semibold">{isTr ? "Menü" : "Menu"}</h2><Button type="button" autoFocus variant="outline" size="icon" className="h-11 w-11" onClick={() => setOpen(false)} aria-label={isTr ? "Menüyü kapat" : "Close menu"}><MenuToggleIcon open /></Button></div>
            <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label={isTr ? "Mobil menü" : "Mobile navigation"}>
              <h3 className="mb-2 px-3 text-base font-semibold">Crossio</h3>
              <ul className="grid gap-1 sm:grid-cols-2">{productLinks.map(link => <li key={link.href}>{item(link)}</li>)}</ul>
              <h3 className="mb-2 mt-6 px-3 text-base font-semibold">{resourcesLabel}</h3>
              <ul className="grid gap-1 sm:grid-cols-2">{[...resourceLinks, ...legalLinks].map(link => <li key={link.href}>{item(link)}</li>)}</ul>
              <Link to="/" onClick={closeMenus} className="mt-4 flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium hover:bg-accent/15">{isTr ? "Tüm uygulamalar" : "All apps"}<ArrowUpRight className="h-4 w-4" /></Link>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4"><LanguageToggle /><ThemeToggle /></div>
              <div className="mt-4 grid gap-2 pb-4 sm:grid-cols-2">{actions(true)}</div>
            </nav>
          </div>
        </dialog>, document.body
      )}
    </header>
  );
}
