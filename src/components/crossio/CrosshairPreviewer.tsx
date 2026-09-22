import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCrosshairState, COLOR_OPTIONS, CrosshairShape } from "@/context/CrosshairStateContext";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { demoProject } from "@/lib/crosshairDemoProject";
import { projectSvg } from "@/lib/crosshairEditor";

export const CrosshairPreviewer = () => {
  const { isTr, t } = useLanguage();
  const state = useCrosshairState();
  const navigate = useNavigate();
  const project = demoProject(state);
  const shapes: { id: CrosshairShape; tr: string; en: string }[] = [
    { id: "cross", tr: "Cross", en: "Cross" },
    { id: "dot", tr: "Nokta", en: "Dot" },
    { id: "circle", tr: "Halka", en: "Ring" },
    { id: "precision", tr: "Hassas", en: "Precision" },
    { id: "t-cross", tr: "T şekli", en: "T shape" },
    { id: "diamond", tr: "Elmas", en: "Diamond" },
    { id: "box", tr: "Kare", en: "Box" },
  ];
  return <section id="interactive-demo" className="scroll-mt-20 py-16 sm:py-24 border-t border-border/40">
    <div className="container max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="relative aspect-[4/3] bg-[#101218] rounded-2xl border border-border overflow-hidden flex items-center justify-center">
          <div aria-label={isTr ? "Crosshair önizlemesi" : "Crosshair preview"} role="img" className="w-64 h-64" dangerouslySetInnerHTML={{ __html: projectSvg(project) }} />
          <span className="absolute left-5 bottom-5 text-xs text-white/60">{isTr ? "Canlı önizleme" : "Live preview"}</span>
        </div>
        <div className="space-y-6">
          <div className="space-y-3"><h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{isTr ? "Senin nişangâhın. Senin tasarımın." : "Your crosshair. Your design."}</h2><p className="text-muted-foreground leading-relaxed">{isTr ? "Bir şekille başla. Rengini ve boyutunu ayarla. Katmanlar, hassas kontroller ve şeffaf PNG için tam editöre geç." : "Start with a shape. Adjust its color and size. Open the full editor for layers, precise controls and transparent PNG export."}</p></div>
          <div className="flex flex-wrap gap-2" aria-label={isTr ? "Şekil" : "Shape"}>{shapes.map(shape => <button key={shape.id} type="button" aria-pressed={state.shape === shape.id} onClick={() => state.setShape(shape.id)} className={`px-3 py-2.5 text-xs rounded-lg border focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${state.shape === shape.id ? "border-primary bg-primary/10 text-primary" : "border-border bg-card"}`}>{isTr ? shape.tr : shape.en}</button>)}</div>
          <div className="flex gap-2 flex-wrap">{COLOR_OPTIONS.map(option => <button type="button" key={option.hex} aria-label={`${isTr ? "Renk" : "Color"}: ${option.hex}`} aria-pressed={state.color === option.hex} onClick={() => state.setColor(option.hex)} className={`w-11 h-11 rounded-full border-2 p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${state.color === option.hex ? "border-primary" : "border-transparent"}`}><span className="block w-full h-full rounded-full border border-foreground/20" style={{ backgroundColor: option.hex }} /></button>)}</div>
          <div><div className="flex justify-between text-xs"><label htmlFor="preview-size-slider">{t("previewer.sizeLabel")}</label><span>{state.size}px</span></div><Slider id="preview-size-slider" value={state.size} min={2} max={14} formatValue={value => `${value}px`} onChange={e => state.setSize(Number(e.target.value))} /></div>
          <Button size="lg" onClick={() => navigate("/crossio/editor", { state: { editorProject: project } })}>{isTr ? "Editörde devam et" : "Continue in editor"}<ArrowUpRight size={18} /></Button>
        </div>
      </div>
    </div>
  </section>;
};