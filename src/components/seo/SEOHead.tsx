import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string; // e.g. "/crosshair" or "/crosshair/faq"
  ogType?: "website" | "article" | "product";
  ogImage?: string;
  keywords?: string[];
  breadcrumbs?: BreadcrumbItem[];
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const BASE_URL = "https://flappsio.com";

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath,
  ogType = "website",
  ogImage = "/assets/images/logo.png",
  keywords = [],
  breadcrumbs = [],
  jsonLd,
}) => {
  const { language } = useLanguage();
  const currentPath = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
  const fullUrl = `${BASE_URL}${currentPath}`;
  const fullImageUrl = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;

  useEffect(() => {
    // 1. Update document title
    document.title = title;

    // Helper to set or update meta tag
    const setMeta = (nameOrProperty: "name" | "property", key: string, content: string) => {
      let element = document.querySelector(`meta[${nameOrProperty}="${key}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(nameOrProperty, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to set or update link tag
    const setLink = (rel: string, href: string, extraAttributes: Record<string, string> = {}) => {
      let selector = `link[rel="${rel}"]`;
      if (extraAttributes.hreflang) {
        selector += `[hreflang="${extraAttributes.hreflang}"]`;
      }
      let element = document.querySelector(selector) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        Object.entries(extraAttributes).forEach(([attr, val]) => {
          element!.setAttribute(attr, val);
        });
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // 2. Standard Meta Tags
    setMeta("name", "description", description);
    if (keywords.length > 0) {
      setMeta("name", "keywords", keywords.join(", "));
    }
    setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta("name", "author", "flappsio");
    setMeta("name", "application-name", "Crosshair");

    // GEO / AEO & AI Engine Hints
    setMeta("name", "rating", "General");
    setMeta("name", "googlebot", "index, follow");
    setMeta("name", "bingbot", "index, follow");

    // 3. Open Graph Tags
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:url", fullUrl);
    setMeta("property", "og:image", fullImageUrl);
    setMeta("property", "og:image:alt", "Crossio: Custom Crosshair Android App");
    setMeta("property", "og:site_name", "Crosshair | flappsio");
    setMeta("property", "og:locale", language === "tr" ? "tr_TR" : "en_US");
    setMeta("property", "og:locale:alternate", language === "tr" ? "en_US" : "tr_TR");

    // 4. Twitter Card Tags
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", fullImageUrl);

    // 5. Canonical & Hreflang Links
    setLink("canonical", fullUrl);
    setLink("alternate", `${BASE_URL}${currentPath}?lang=tr`, { hreflang: "tr" });
    setLink("alternate", `${BASE_URL}${currentPath}?lang=en`, { hreflang: "en" });
    setLink("alternate", fullUrl, { hreflang: "x-default" });

    // 6. JSON-LD Structured Data
    const defaultSchemas: Record<string, any>[] = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "flappsio",
        "url": BASE_URL,
        "logo": `${BASE_URL}/assets/images/logo.png`,
        "sameAs": [
          "https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "info@flappsio.com",
          "contactType": "customer support"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Crossio: Custom Crosshair",
        "operatingSystem": "Android",
        "applicationCategory": "UtilitiesApplication, GameApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": description,
        "downloadUrl": "https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair",
        "screenshot": `${BASE_URL}/assets/images/logo.png`,
        "author": {
          "@type": "Organization",
          "name": "flappsio"
        }
      }
    ];

    if (breadcrumbs.length > 0) {
      defaultSchemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": crumb.url.startsWith("http") ? crumb.url : `${BASE_URL}${crumb.url}`
        }))
      });
    }

    if (jsonLd) {
      if (Array.isArray(jsonLd)) {
        defaultSchemas.push(...jsonLd);
      } else {
        defaultSchemas.push(jsonLd);
      }
    }

    // Inject JSON-LD
    let scriptTag = document.getElementById("json-ld-structured-data") as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "json-ld-structured-data";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(defaultSchemas, null, 2);

    // Scroll to top upon page navigation
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [title, description, canonicalPath, ogType, ogImage, keywords, breadcrumbs, jsonLd, language, fullUrl, fullImageUrl, currentPath]);

  return null;
};
