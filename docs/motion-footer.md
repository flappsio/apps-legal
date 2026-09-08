# Crossio cinematic footer

The existing Vite project already supports React, TypeScript, Tailwind CSS 3 and shadcn. No new scaffold or Tailwind migration is required.

- UI components: `src/components/ui` (`@/components/ui`)
- Shared styles and HSL theme tokens: `src/index.css`
- Footer styles: `src/components/ui/motion-footer.css`
- Class merging utility: `src/lib/utils.ts`
- shadcn configuration: `components.json`

`src/components/ui` is this project's equivalent of `/components/ui`: the `@/` alias resolves to `src/`. Keeping reusable components here lets shadcn and application imports share one consistent path; a second root-level components folder is unnecessary.

Install and run:

```sh
npm install
npm run dev
npm run build
```

GSAP is installed in package.json and package-lock.json. The supplied footer was adapted for Crossio, the existing HSL tokens, English/Turkish context and real Android/legal/support destinations. There is no iOS download because this app's configured store is Google Play.

The live integration is `/crosshair`; other pages retain the standard footer. `src/components/ui/demo.tsx` exports a standalone demo for use inside the existing LanguageProvider. The footer uses GSAP cleanup, reduced-motion support, keyboard focus outlines and a normal-flow mobile/short-viewport layout. The mobile sticky download CTA hides when the footer enters the viewport.
