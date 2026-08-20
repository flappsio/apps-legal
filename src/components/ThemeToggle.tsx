import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className={`relative rounded-xl border-border/70 hover:border-primary/40 bg-card/60 backdrop-blur-md transition-transform hover:scale-105 active:scale-95 ${className}`}
            aria-label={theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}
          >
            <Sun className="h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
            <Moon className="absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-emerald-400" />
            <span className="sr-only">Tema Değiştir</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{theme === "dark" ? "Açık Temaya Geç" : "Koyu Temaya Geç"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
