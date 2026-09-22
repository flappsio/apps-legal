import { useEffect, useId, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { clamp, isColor } from "@/lib/crosshairEditor";

export function NumberField({ label, value, min, max, step = 1, unit = "", onChange }: {
  label: string; value: number; min: number; max: number; step?: number; unit?: string; onChange: (value: number) => void;
}) {
  const id = useId();
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  const commit = () => {
    if (!draft.trim() || !Number.isFinite(Number(draft))) { setDraft(String(value)); return; }
    const next = Math.round(clamp(Number(draft), min, max) * 100) / 100;
    onChange(next);
    setDraft(String(next));
  };
  return <div className="editor-field">
    <div className="editor-field-heading"><label htmlFor={id}>{label}</label><div className="editor-number"><input id={id} type="number" min={min} max={max} step={step} value={draft} onChange={e => setDraft(e.target.value)} onBlur={commit} onKeyDown={e => { if (e.key === "Enter") { commit(); e.currentTarget.blur(); } }} /><span>{unit}</span></div></div>
    <Slider aria-label={label} value={value} min={min} max={max} step={step} marks={false} formatValue={n => `${n}${unit}`} onChange={e => onChange(Number(e.target.value))} />
  </div>;
}

export function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (color: string) => void }) {
  const id = useId();
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  const commit = () => { if (isColor(draft)) onChange(draft); else setDraft(value); };
  return <div className="editor-color"><label htmlFor={id}>{label}</label><input type="color" aria-label={label} value={value} onChange={e => onChange(e.target.value)} /><input id={id} value={draft} maxLength={7} spellCheck={false} onChange={e => setDraft(e.target.value)} onBlur={commit} onKeyDown={e => { if (e.key === "Enter") commit(); }} /></div>;
}
