import * as React from "react";
import { cn } from "@/lib/utils";
import "./slider.css";

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue"> {
  value: number;
  formatValue?: (value: number) => string;
  /** Show discrete steps; set false for a visually continuous track. */
  marks?: boolean;
}

/** Material 3 styling with native range keyboard, touch and form semantics. */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, min = 0, max = 100, step = 1, marks = true, className, style, disabled, formatValue = String, ...props }, ref) => {
    const progress = Number(max) > Number(min)
      ? Math.min(100, Math.max(0, ((value - Number(min)) / (Number(max) - Number(min))) * 100))
      : 0;
    const text = formatValue(value);
    const intervals = (Number(max) - Number(min)) / Number(step);
    // Avoid unreadable or unbounded tick lists for very fine/continuous ranges.
    const ticks = marks && Number.isFinite(intervals) && intervals > 0 && intervals <= 50
      ? Array.from({ length: Math.ceil(intervals) }, (_, i) => (i / intervals) * 100)
      : [];

    return (
      <span className={cn("md3-slider", className)} data-disabled={disabled || undefined}
        data-at-min={progress === 0 || undefined} data-at-max={progress === 100 || undefined}
        style={{ ...style, "--slider-progress": `${progress}%` } as React.CSSProperties}>
        <span className="md3-slider__visual" aria-hidden="true">
          <span className="md3-slider__active" />
          <span className="md3-slider__inactive" />
          <span className="md3-slider__ticks md3-slider__ticks--active">
            {ticks.map((tick) => <span key={tick} style={{ left: `${tick}%` }} />)}
          </span>
          <span className="md3-slider__ticks md3-slider__ticks--inactive">
            {ticks.map((tick) => <span key={tick} style={{ left: `${tick}%` }} />)}
          </span>
          <span className="md3-slider__handle" />
          <span className="md3-slider__value">{text}</span>
        </span>
        <input {...props} ref={ref} type="range" min={min} max={max} step={step} value={value}
          disabled={disabled} aria-valuetext={props["aria-valuetext"] ?? text}
          className="md3-slider__input" />
      </span>
    );
  },
);
Slider.displayName = "Slider";
