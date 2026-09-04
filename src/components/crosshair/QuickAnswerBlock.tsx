import React from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface QuickAnswerBlockProps {
  question: string;
  summary: string;
  keyPoints?: string[];
  sourceCategory?: string;
}

export const QuickAnswerBlock: React.FC<QuickAnswerBlockProps> = ({
  question,
  summary,
  keyPoints = [],
  sourceCategory = "Crosshair Valo Knowledge Base",
}) => {
  const { isTr } = useLanguage();

  return (
    <div className="my-6 p-5 sm:p-6 rounded-2xl bg-primary/5 border border-primary/25 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{isTr ? "Hızlı Yanıt & Özet (AEO / AI Summary)" : "Quick Answer & Summary"}</span>
      </div>

      <h3 className="text-sm sm:text-base font-extrabold text-foreground mb-2">
        {question}
      </h3>

      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
        {summary}
      </p>

      {keyPoints.length > 0 && (
        <ul className="mt-3 space-y-1.5 pt-2 border-t border-primary/15 text-xs text-muted-foreground">
          {keyPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 pt-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>{sourceCategory}</span>
        <span className="text-primary/80 font-mono font-semibold">flappsio Verified Knowledge</span>
      </div>
    </div>
  );
};
