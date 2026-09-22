import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";
import { StaticRouter } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CrosshairStateProvider } from "@/context/CrosshairStateContext";
import { FAQS_DATA } from "@/data/crosshairTranslations";
import App from "@/App";

export const render = (url: string): Promise<string> => new Promise((resolve, reject) => {
  let html = "";
  const output = new Writable({ write(chunk, _encoding, callback) { html += chunk.toString(); callback(); } });
  output.on("finish", () => resolve(html));
  output.on("error", reject);
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <LanguageProvider>
        <ThemeProvider>
          <CrosshairStateProvider>
            <App />
          </CrosshairStateProvider>
        </ThemeProvider>
      </LanguageProvider>
    </StaticRouter>,
    { onAllReady() { stream.pipe(output); }, onError: reject },
  );
});

export const getRouteSchema = (url: string): Record<string, unknown> | undefined => {
  if (url === "/crossio/faq") {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      author: { "@id": "https://flappsio.com/#organization" },
      publisher: { "@id": "https://flappsio.com/#organization" },
      mainEntity: FAQS_DATA.map((faq) => ({
        "@type": "Question",
        name: faq.question.tr,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${faq.directAnswer.tr} ${faq.detailedAnswer.tr}`,
        },
      })),
    };
  }

  if (url === "/crossio/how-to-use") {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Crossio Android nişangah katmanı kurulumu",
      description: "Crossio uygulamasını yükleme, ekran üzerinde gösterme ve nişangahı özelleştirme adımları.",
      author: { "@id": "https://flappsio.com/#organization" },
      publisher: { "@id": "https://flappsio.com/#organization" },
      step: [
        "Crossio uygulamasını Google Play'den yükleyin.",
        "Android'in diğer uygulamaların üzerinde gösterme iznini verin.",
        "Bir nişangah seçin ve görünümünü özelleştirin.",
        "İsterseniz yerel bir PNG veya JPG içe aktarın.",
        "Katmanı uygulama içinden başlatın ve görünürlüğünü yönetin.",
      ].map((text, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        text,
      })),
    };
  }

  return undefined;
};
