import { build } from "vite";
import { readFile, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const outputDir = resolve(projectRoot, "dist");
const serverOutputDir = resolve(projectRoot, ".prerender-server");
const baseUrl = "https://flappsio.com";

const pages = {
  "/": {
    title: "Crossio: Custom Crosshair – Android Visual Layer | flappsio",
    description: "Crossio displays a customizable crosshair overlay on Android. Choose designs, adjust appearance transparently, and improve your gaming precision.",
    name: "Crossio",
  },
  "/crosshair": {
    title: "Crossio: Custom Crosshair for Android | flappsio",
    description: "Create, customize, and export a Crossio crosshair for Android with transparent visual overlay controls.",
    name: "Crossio custom crosshair",
  },
  "/crosshair/how-to-use": {
    title: "How to Use Crossio on Android | flappsio",
    description: "Set up the Crossio Android overlay, customize a crosshair, and resolve common permissions issues.",
    name: "How to use Crossio",
  },
  "/crosshair/faq": {
    title: "Crossio FAQ: Android Crosshair Overlay | flappsio",
    description: "Answers to common questions about Crossio, Android overlay permissions, privacy, compatibility, and crosshair imports.",
    name: "Crossio FAQ",
  },
  "/crosshair/guides": {
    title: "Crossio Guides: Android Crosshair Tips | flappsio",
    description: "Practical guides for choosing a visible crosshair, configuring Android overlay permissions, and using Crossio.",
    name: "Crossio guides",
  },
  "/crosshair/guides/crosshair-tasarimi": {
    title: "How to Choose a Crosshair | Crossio Guides",
    description: "Choose a crosshair shape, color, size, and contrast that stays visible during Android gameplay.",
    name: "How to choose a crosshair",
  },
  "/crosshair/guides/renk-ve-kontrast": {
    title: "Crosshair Color and Visibility Guide | Crossio",
    description: "Improve crosshair visibility with contrast, color, outline, opacity, and size settings.",
    name: "Crosshair color and visibility guide",
  },
  "/crosshair/guides/sorun-giderme-overlay-izinleri": {
    title: "Android Overlay Permission Troubleshooting | Crossio",
    description: "Resolve Android overlay permission, foreground service, and battery optimization issues for Crossio.",
    name: "Android overlay permission troubleshooting",
  },
  "/crosshair/about": {
    title: "About Crossio | flappsio",
    description: "Learn how Crossio provides a passive, customizable visual crosshair overlay for Android.",
    name: "About Crossio",
  },
  "/crosshair/support": {
    title: "Crossio Support | flappsio",
    description: "Find Crossio support, setup guidance, and links to privacy and terms documentation.",
    name: "Crossio support",
  },
  "/crosshair/privacy-policy": {
    title: "Crossio Privacy Policy | flappsio",
    description: "Read the Crossio privacy policy, including data processing and service-provider information.",
    name: "Crossio privacy policy",
  },
  "/crosshair/terms-of-use": {
    title: "Crossio Terms of Use | flappsio",
    description: "Read the terms that apply to using Crossio and its Android visual overlay features.",
    name: "Crossio terms of use",
  },
  "/license": {
    title: "Crossio Open Source Licenses | flappsio",
    description: "Open source license information for Crossio and related software.",
    name: "Crossio licenses",
  },
};

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const seoTags = (path, page) => {
  const url = `${baseUrl}${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.name,
        description: page.description,
        inLanguage: "tr",
        isPartOf: { "@id": `${baseUrl}/#website` },
        publisher: { "@id": `${baseUrl}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "flappsio", item: baseUrl },
          ...(path === "/" ? [] : [{ "@type": "ListItem", position: 2, name: page.name, item: url }]),
        ],
      },
    ],
  };

  const routeSchema = getRouteSchema(path);
  const schemas = routeSchema ? [schema, routeSchema] : [schema];

  return `\n    <meta name="description" content="${escapeHtml(page.description)}" data-prerendered-seo />\n    <link rel="canonical" href="${url}" data-prerendered-seo />\n    <link rel="alternate" hreflang="tr" href="${url}?lang=tr" data-prerendered-seo />\n    <link rel="alternate" hreflang="en" href="${url}?lang=en" data-prerendered-seo />\n    <link rel="alternate" hreflang="x-default" href="${url}" data-prerendered-seo />\n    <meta property="og:title" content="${escapeHtml(page.title)}" data-prerendered-seo />\n    <meta property="og:description" content="${escapeHtml(page.description)}" data-prerendered-seo />\n    <meta property="og:url" content="${url}" data-prerendered-seo />\n    <script type="application/ld+json" data-prerendered-seo>${JSON.stringify(schemas)}</script>`;
};

await build({
  build: {
    ssr: "src/entry-server.tsx",
    outDir: serverOutputDir,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "entry-server.mjs",
        manualChunks: undefined,
      },
    },
  },
});

const { render, getRouteSchema } = await import(pathToFileURL(join(serverOutputDir, "entry-server.mjs")).href);
const template = await readFile(join(outputDir, "index.html"), "utf8");

for (const [path, page] of Object.entries(pages)) {
  const appHtml = render(path);
  const head = template
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?>/i, "")
    .replace(/<link\s+rel="canonical"[\s\S]*?>/i, "")
    .replace(/<meta\s+property="og:title"[\s\S]*?>/i, "")
    .replace(/<meta\s+property="og:description"[\s\S]*?>/i, "")
    .replace(/<meta\s+property="og:url"[\s\S]*?>/i, "")
    .replace("</head>", `${seoTags(path, page)}\n  </head>`)
    .replace(/<!-- prerendered-app:start -->[\s\S]*?<!-- prerendered-app:end -->/, `<!-- prerendered-app:start -->${appHtml}<!-- prerendered-app:end -->`);

  const target = path === "/" ? join(outputDir, "index.html") : join(outputDir, path.slice(1), "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, head);
}

await rm(serverOutputDir, { recursive: true, force: true });
