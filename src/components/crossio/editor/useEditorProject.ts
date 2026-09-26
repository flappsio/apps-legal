import { useCallback, useEffect, useRef, useState } from "react";
import { createProject, CrosshairProject, EditorStorage, parseStorage, STORAGE_KEY, uid } from "@/lib/crosshairEditor";

export function useEditorProject() {
  const [project, setProjectRaw] = useState<CrosshairProject>(() => createProject());
  const [history, setHistory] = useState<CrosshairProject[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [saved, setSaved] = useState<CrosshairProject[]>([]);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<"loading" | "saved" | "pending" | "error">("loading");
  const latest = useRef<EditorStorage>({ version: 1, draft: project, saved });
  const blocked = useRef(false);
  const lastWritten = useRef("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = parseStorage(raw);
        latest.current = data;
        setProjectRaw(data.draft);
        setHistory([data.draft]);
        setHistoryIndex(0);
        setSaved(data.saved);
        lastWritten.current = JSON.stringify(data);
      } else {
        const initial = createProject();
        setProjectRaw(initial);
        setHistory([initial]);
        setHistoryIndex(0);
      }
      setStatus("saved");
    } catch { blocked.current = true; setStatus("error"); }
    setReady(true);
  }, []);

  const write = useCallback((data: EditorStorage) => {
    try {
      const normalize = (item: CrosshairProject): CrosshairProject => ({ ...item, name: item.name.trim() || "Crosshair", layers: item.layers.map(layer => ({ ...layer, name: layer.name.trim() || layer.type })) });
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, draft: normalize(data.draft), saved: data.saved.map(normalize) }));
      lastWritten.current = JSON.stringify(data);
      setStatus("saved");
      return true;
    } catch { setStatus("error"); return false; }
  }, []);

  useEffect(() => {
    if (!ready) return;
    latest.current = { version: 1, draft: project, saved };
    if (blocked.current) return;
    if (JSON.stringify(latest.current) === lastWritten.current) return;
    setStatus("pending");
    const timer = window.setTimeout(() => write(latest.current), 500);
    return () => window.clearTimeout(timer);
  }, [project, saved, ready, write]);

  useEffect(() => {
    const flush = () => {
      if (!blocked.current && lastWritten.current !== JSON.stringify(latest.current)) write(latest.current);
    };
    const visibility = () => { if (document.visibilityState === "hidden") flush(); };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", visibility);
    return () => { flush(); window.removeEventListener("pagehide", flush); document.removeEventListener("visibilitychange", visibility); };
  }, [write]);

  const setProject = useCallback((action: CrosshairProject | ((prev: CrosshairProject) => CrosshairProject), options?: { historyCommit?: boolean }) => {
    setProjectRaw(prev => {
      const next = typeof action === 'function' ? action(prev) : action;
      if (JSON.stringify(next) !== JSON.stringify(prev)) {
        if (options?.historyCommit === false) {
           setHistory(h => {
             const newH = [...h];
             if (historyIndex >= 0) newH[historyIndex] = next;
             return newH;
           });
        } else {
           setHistory(h => {
             const newHistory = h.slice(0, historyIndex + 1);
             newHistory.push(next);
             if (newHistory.length > 50) newHistory.shift();
             return newHistory;
           });
           setHistoryIndex(prevIdx => Math.min(prevIdx + 1, 50));
        }
      }
      return next;
    });
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setProjectRaw(history[nextIndex]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setProjectRaw(history[nextIndex]);
    }
  }, [history, historyIndex]);

  const replace = (next: CrosshairProject) => {
    if (blocked.current) return false;
    // Every replacement preserves an independent snapshot of the previous draft.
    const snapshot = { ...project, id: uid() };
    const nextSaved = [...saved, snapshot];
    const data: EditorStorage = { version: 1, draft: next, saved: nextSaved };
    if (!write(data)) return false;
    latest.current = data;
    setProjectRaw(next);
    setHistory([next]);
    setHistoryIndex(0);
    setSaved(nextSaved);
    return true;
  };
  const saveNamed = () => {
    if (blocked.current) return false;
    const next = [...saved.filter(item => item.id !== project.id), project];
    if (!write({ version: 1, draft: project, saved: next })) return false;
    setSaved(next);
    return true;
  };
  const deleteSaved = (id: string) => {
    const next = saved.filter(item => item.id !== id);
    if (blocked.current || !write({ version: 1, draft: project, saved: next })) return false;
    setSaved(next);
    return true;
  };
  return { 
    project, setProject, saved, ready, status, replace, saveNamed, deleteSaved,
    undo, redo, canUndo: historyIndex > 0, canRedo: historyIndex < history.length - 1
  };
}
