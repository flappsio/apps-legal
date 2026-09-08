"use client";

import { CinematicFooter } from "@/components/ui/motion-footer";

// Render inside the application's LanguageProvider (as in src/main.tsx).
export default function Demo() {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">
      <main className="relative z-10 flex min-h-[120vh] flex-col items-center justify-center rounded-b-3xl border-b border-border bg-background px-6">
        <h1 className="mb-8 text-center text-4xl font-light tracking-tight sm:text-6xl">Scroll down to reveal</h1>
        <div className="h-32 w-px bg-gradient-to-b from-primary to-transparent" />
      </main>
      <CinematicFooter />
    </div>
  );
}
