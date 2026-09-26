import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, Circle, Copy, Crosshair, Download, Eye, EyeOff, FolderOpen, LockKeyhole, Minus, Plus, Save, Settings2, Smartphone, Square, Trash2, UnlockKeyhole, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/crossio/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SEOHead } from "@/components/seo/SEOHead";
import { EditorCanvas } from "@/components/crossio/editor/EditorCanvas";
import { ColorField, NumberField } from "@/components/crossio/editor/EditorFields";
import { useEditorProject } from "@/components/crossio/editor/useEditorProject";
import { clamp, createElements, createProject, CrosshairLayer, CrosshairProject, downloadBlob, ElementType, exportProjectPng, groupLayers, layerBounds, layerSvg, MAX_FILE_BYTES, MAX_LAYERS, moveLayerTo, parseProject, projectFilename, reorderLayer, symmetryCopies, uid, ungroupLayers, updateLayer } from "@/lib/crosshairEditor";
import "@/components/crossio/editor/editor.css";

function EditorDialog({ title, close, children }: { title: string; close: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  return <dialog ref={ref} className="editor-dialog" aria-label={title} onCancel={e => { e.preventDefault(); close(); }}>
    <div className="editor-dialog-heading"><h2>{title}</h2><button type="button" onClick={close} aria-label={title}><X size={18} /></button></div>{children}
  </dialog>;
}

export default function CrosshairEditorPage() {
  const { isTr } = useLanguage();
  const tx = (tr: string, en: string) => isTr ? tr : en;
  const { project, setProject, saved, ready, status, replace, saveNamed, deleteSaved, undo, redo, canUndo, canRedo } = useEditorProject();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedId = selectedIds[0] ?? null;
  const setSelectedId = (id: string | null) => setSelectedIds(id ? [id] : []);
  const [tab, setTab] = useState("elements");
  const [zoom, setZoom] = useState<number | "fit">("fit");
  const [snap, setSnap] = useState(true);
  const [scene, setScene] = useState("dark");
  const [size, setSize] = useState<256 | 512 | 1024>(512);
  const [message, setMessage] = useState("");
  const [exporting, setExporting] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [confirmation, setConfirmation] = useState<{ title: string; action: () => void } | null>(null);
  const [incoming, setIncoming] = useState<CrosshairProject | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const seenIncoming = useRef(false);
  const selected = project.layers.find(layer => layer.id === selectedId);
  const failedSave = () => setMessage(tx("Yerel kayıt yapılamadı. Çalışmanız burada korunuyor; değiştirmeden önce proje dosyasını indirin.", "Local save failed. Your work remains here; download the project before replacing it."));
  const update = (patch: Partial<CrosshairLayer>) => { if (selectedId) setProject(p => updateLayer(p, selectedId, patch)); };
  const replaceWith = (next: CrosshairProject) => {
    if (!replace(next)) { failedSave(); return false; }
    setSelectedIds([]);
    setMessage(tx("Önceki çalışma kayıtlı tasarımlara eklendi.", "Previous work was preserved in saved designs."));
    return true;
  };

  const duplicateSelected = (id?: string) => {
    const ids = id ? [id] : selectedIds;
    if (ids.length === 0) return;
    let next = project;
    const newIds: string[] = [];
    for (const tid of ids) {
      const l = next.layers.find(layer => layer.id === tid);
      if (l && !l.locked && next.layers.length < MAX_LAYERS) {
        const copyId = uid();
        const copyLayer = { ...l, id: copyId, name: `${l.name} +`, x: clamp(l.x + 4, -128, 128), y: clamp(l.y + 4, -128, 128) };
        const idx = next.layers.findIndex(layer => layer.id === tid);
        const layers = [...next.layers];
        layers.splice(idx + 1, 0, copyLayer);
        next = { ...next, layers };
        newIds.push(copyId);
      }
    }
    setProject(next);
    if (newIds.length > 0) setSelectedIds(newIds);
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    setProject(p => ({ ...p, layers: p.layers.filter(l => !selectedIds.includes(l.id)) }));
    setSelectedIds([]);
  };

  const toggleLockSelected = () => {
    if (selectedIds.length === 0) return;
    const anyUnlocked = project.layers.some(l => selectedIds.includes(l.id) && !l.locked);
    setProject(p => ({
      ...p,
      layers: p.layers.map(l => selectedIds.includes(l.id) ? { ...l, locked: anyUnlocked } : l)
    }));
  };

  const handleGroup = () => {
    if (selectedIds.length < 2) return;
    setProject(p => groupLayers(p, selectedIds));
  };

  const handleUngroup = () => {
    if (selectedIds.length === 0) return;
    setProject(p => ungroupLayers(p, selectedIds));
  };

  const handleMoveLayers = (moves: { id: string; x: number; y: number }[], isFinal?: boolean) => {
    setProject(p => ({
      ...p,
      layers: p.layers.map(layer => {
        const m = moves.find(item => item.id === layer.id);
        return m && !layer.locked ? { ...layer, x: m.x, y: m.y } : layer;
      })
    }), { historyCommit: isFinal });
  };

  useEffect(() => {
    const el = stageContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        setZoom(z => {
          const current = z === "fit" ? 1 : z;
          const delta = e.deltaY < 0 ? 0.25 : -0.25;
          const next = Math.round((current + delta) * 100) / 100;
          return Math.max(0.5, Math.min(4, next));
        });
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;

      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIds.length > 0) {
        e.preventDefault();
        deleteSelected();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) { e.preventDefault(); canRedo && redo(); }
        else { e.preventDefault(); canUndo && undo(); }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        canRedo && redo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'c' || e.key.toLowerCase() === 'd') && selectedIds.length > 0) {
        e.preventDefault();
        duplicateSelected();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        if (e.shiftKey) handleUngroup();
        else handleGroup();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setSelectedIds(project.layers.map(l => l.id));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIds, project.layers, undo, redo, canUndo, canRedo]);

  useEffect(() => {
    if (!ready || seenIncoming.current || !location.state?.editorProject) return;
    seenIncoming.current = true;
    try { setIncoming(parseProject(location.state.editorProject)); }
    catch { setMessage(isTr ? "Demo tasarımı açılamadı." : "Could not open demo design."); }
    navigate(location.pathname + location.search, { replace: true, state: null });
  }, [ready, location, navigate, isTr]);

  const elements: { type: ElementType; tr: string; en: string; icon: React.ReactNode }[] = [
    { type: "line", tr: "Çizgi", en: "Line", icon: <Minus /> },
    { type: "dot", tr: "Nokta", en: "Dot", icon: <Circle fill="currentColor" size={12} /> },
    { type: "ring", tr: "Halka", en: "Ring", icon: <Circle /> },
    { type: "rectangle", tr: "Dikdörtgen", en: "Rectangle", icon: <Square /> },
    { type: "cross", tr: "Cross", en: "Cross", icon: <Crosshair /> },
    { type: "t", tr: "T şekli", en: "T shape", icon: <svg viewBox="0 0 24 24"><path d="M3 8h7m4 0h7M12 10v11" fill="none" stroke="currentColor" strokeWidth="2" /></svg> },
    { type: "diamond", tr: "Elmas", en: "Diamond", icon: <Square style={{ transform: "rotate(45deg)" }} /> },
    { type: "triangle", tr: "Üçgen", en: "Triangle", icon: <svg viewBox="0 0 24 24"><polygon points="12,2 22,22 2,22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg> },
    { type: "star", tr: "Yıldız", en: "Star", icon: <svg viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg> },
    { type: "brackets", tr: "Köşeler", en: "Brackets", icon: <svg viewBox="0 0 24 24"><path d="M6 3H3v3M18 3h3v3M6 21H3v-3M18 21h3v-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  ];
  const add = (layers: CrosshairLayer[]) => {
    if (project.layers.length + layers.length > MAX_LAYERS) { setMessage(tx("En fazla 100 katman ekleyebilirsiniz.", "You can add up to 100 layers.")); return; }
    setProject(p => ({ ...p, layers: [...p.layers, ...layers] }));
    setSelectedId(layers[0]?.id ?? null);
    setTab("settings");
  };
  const button = (label: string, icon: React.ReactNode, action: () => void, disabled = false) => <button type="button" title={label} aria-label={label} onClick={action} disabled={disabled}>{icon}</button>;
  const numeric = (key: string, label: string, value: number, min: number, max: number, step = 1, unit = "px") => <NumberField key={key} label={label} value={value} min={min} max={max} step={step} unit={unit} onChange={v => update({ [key]: v } as Partial<CrosshairLayer>)} />;

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Crossio Crosshair Editor",
    "alternateName": ["Crosshair Generator", "Crosshair Maker"],
    "description": tx(
      "Android cihazlar için özel şeffaf PNG nişangah (crosshair) tasarlama ve oluşturma aracı. Katmanlı yapı ile kendi nişangahınızı çizin.",
      "Custom transparent PNG crosshair designer and generator for Android devices. Draw your own crosshair with a layered editor."
    ),
    "applicationCategory": "DesignApplication",
    "operatingSystem": "WebBrowser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return <div className="crosshair-editor">
    <SEOHead 
      title={tx("Crossio — Crosshair Editörü", "Crossio — Crosshair Editor")} 
      description={tx("Katmanlarla crosshair tasarlayın ve şeffaf PNG indirin.", "Design a layered crosshair and download a transparent PNG.")} 
      canonicalPath="/crossio/editor"
      jsonLd={webAppJsonLd}
      keywords={[
        "crosshair generator",
        "crosshair maker",
        "custom crosshair maker",
        "transparent crosshair png maker",
        "android crosshair creator"
      ]}
    />
    <header className="editor-header">
      <Link to="/crossio" className="editor-brand">
        <ArrowLeft size={16} />
        <img src="/assets/images/playstore/icons/crosshair_playstore_512.png" alt="Crossio" width={28} height={28} style={{ borderRadius: '6px' }} />
        <strong>Crossio</strong>
        <span>{tx("Editör", "Editor")}</span>
      </Link>
      <div className="editor-header-actions" style={{ gap: '12px' }}>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
    <div className="editor-toolbar">
      <div className="editor-project-name"><input aria-label={tx("Tasarım adı", "Design name")} maxLength={80} value={project.name} onChange={e => setProject(p => ({ ...p, name: e.target.value }))} onBlur={() => { if (!project.name.trim()) setProject(p => ({ ...p, name: "Crosshair" })); }} /><span role="status">{status === "saved" ? <Check size={12} /> : null}{status === "saved" ? tx("Bu tarayıcıda kaydedildi", "Saved in this browser") : status === "pending" ? tx("Kaydediliyor…", "Saving…") : status === "error" ? tx("Yerel kayıt kullanılamıyor", "Local storage unavailable") : tx("Yükleniyor…", "Loading…")}</span></div>
      <div className="editor-toolbar-actions">
        <button disabled={!ready || !canUndo} onClick={undo} title={tx("Geri Al", "Undo")}><ArrowLeft size={16} /></button>
        <button disabled={!ready || !canRedo} onClick={redo} title={tx("Yinele", "Redo")}><ArrowRight size={16} /></button>
        <span style={{ borderLeft: '1px solid var(--editor-line)', height: '24px', margin: '0 4px' }} />
        
        <button disabled={!ready} onClick={() => setConfirmation({ title: tx("Tüm katmanlar silinecek. Emin misiniz?", "All layers will be cleared. Are you sure?"), action: () => replaceWith(createProject(project.name, [])) })}><Trash2 size={16} />{tx("Sıfırla", "Reset")}</button>
        <button disabled={!ready} onClick={() => setConfirmation({ title: tx("Yeni tasarım oluşturulsun mu? Mevcut çalışma saklanacak.", "Create a new design? Current work will be preserved."), action: () => replaceWith(createProject(tx("Yeni tasarım", "New design"), [])) })}><Plus size={16} />{tx("Yeni", "New")}</button>
        <button disabled={!ready} onClick={() => setShowSaved(true)}><FolderOpen size={16} />{tx("Tasarımlar", "Designs")}</button>
        <button disabled={!ready || !project.name.trim()} onClick={() => { if (saveNamed()) setMessage(tx("Tasarım kaydedildi.", "Design saved.")); else failedSave(); }}><Save size={16} />{tx("Kaydet", "Save")}</button>
        <button disabled={!ready} onClick={() => fileRef.current?.click()}><FolderOpen size={16} />{tx("Proje aç", "Open project")}</button>
        <button disabled={!ready || !project.name.trim()} onClick={() => downloadBlob(new Blob([JSON.stringify(project, null, 2)], { type: "application/json" }), `${projectFilename(project)}.crossio.json`)}>{tx("Proje indir", "Save file")}</button>
        <select aria-label={tx("PNG boyutu", "PNG size")} value={size} onChange={e => setSize(Number(e.target.value) as 256 | 512 | 1024)}>{[256, 512, 1024].map(n => <option key={n} value={n}>{n} px</option>)}</select>
        <button className="editor-primary" disabled={!ready || exporting || !project.layers.some(layer => layer.visible)} onClick={async () => { setExporting(true); try { await exportProjectPng(project, size); setMessage(tx("Şeffaf PNG indirildi.", "Transparent PNG downloaded.")); } catch { setMessage(tx("PNG oluşturulamadı. Tekrar deneyin.", "PNG export failed. Please try again.")); } finally { setExporting(false); } }}><Download size={16} />{exporting ? tx("Hazırlanıyor…", "Exporting…") : tx("PNG indir", "Export PNG")}</button>
        <button className="editor-primary" style={{ background: '#3b82f6', boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)' }} onClick={() => {
          const data = encodeURIComponent(JSON.stringify(project));
          window.location.href = `intent://import?data=${data}#Intent;scheme=crossio;package=com.hasan.apps.crosshair;end;`;
          setTimeout(() => {
            if (document.hidden) return;
            setMessage(tx("Uygulamaya yönlendiriliyorsunuz...", "Redirecting to app..."));
            window.open("https://play.google.com/store/apps/details?id=com.hasan.apps.crosshair", "_blank");
          }, 1500);
        }}>
          <Smartphone size={16} />
          {tx("Telefonda Kullan", "Use in App")}
        </button>
      </div>
    </div>
    <input ref={fileRef} type="file" accept=".json,.crossio.json,application/json" hidden onChange={async e => {
      const file = e.target.files?.[0]; e.target.value = "";
      if (!file) return;
      if (!file.name.toLowerCase().endsWith(".json") || file.size > MAX_FILE_BYTES) { setMessage(tx("En fazla 1 MB boyutunda bir JSON proje dosyası seçin.", "Choose a JSON project file up to 1 MB.")); return; }
      try { const next = parseProject(JSON.parse(await file.text())); setConfirmation({ title: tx("Proje açılsın mı? Mevcut çalışma saklanacak.", "Open this project? Current work will be preserved."), action: () => replaceWith({ ...next, id: uid() }) }); }
      catch { setMessage(tx("Geçersiz veya desteklenmeyen proje dosyası. Çalışmanız değiştirilmedi.", "Invalid or unsupported project file. Your work was not changed.")); }
    }} />
    {(message || status === "error") && <div className="editor-notice" role="status"><span>{message || tx("Yerel depolamaya erişilemiyor. Çalışmanızı proje dosyası olarak indirin; kayıtları korumak için tasarım değiştirme kapalı.", "Local storage is unavailable. Download your project file; design replacement is disabled to protect existing work.")}</span>{message && button(tx("Bildirimi kapat", "Dismiss notification"), <X size={16} />, () => setMessage(""))}</div>}
    <div className="editor-workspace" data-tab={tab} aria-busy={!ready}>
      <aside className="editor-left">
        <section className="editor-elements"><div className="editor-section-heading"><h2>{tx("Eleman ekle", "Add element")}</h2><Plus size={16} /></div><div className="editor-element-grid">{elements.map(element => <button disabled={!ready} key={element.type} onClick={() => add(createElements(element.type, tx(element.tr, element.en)))}>{element.icon}<span>{tx(element.tr, element.en)}</span></button>)}</div><p className="editor-hint">{tx("Şekilleri birleştir, kendi nişangâhını oluştur.", "Combine shapes. Make your own reticle.")}</p></section>
        <section className="editor-layers"><div className="editor-section-heading"><h2>{tx("Katmanlar", "Layers")}</h2><span>{project.layers.length} / 100</span></div>
          {!project.layers.length && <p className="editor-empty">{tx("İlk elemanını ekleyerek başla.", "Add your first element to get started.")}</p>}
          {[...project.layers].reverse().map(layer => {
            const bounds = layerBounds({ ...layer, outlineWidth: 0 });
            const span = Math.max(bounds.width, bounds.height, 22) * 1.35;
            const isSelected = selectedIds.includes(layer.id);
            return (
              <div key={layer.id} className={`editor-layer ${isSelected ? "is-selected" : ""}`}>
                <button type="button" className="editor-layer-name" onClick={(e) => {
                  const isShift = e.shiftKey || e.metaKey || e.ctrlKey;
                  if (isShift) {
                    setSelectedIds(ids => ids.includes(layer.id) ? ids.filter(i => i !== layer.id) : [...ids, layer.id]);
                  } else {
                    if (layer.groupId) {
                      setSelectedIds(project.layers.filter(l => l.groupId === layer.groupId).map(l => l.id));
                    } else {
                      setSelectedIds([layer.id]);
                    }
                  }
                  setTab("settings");
                }} aria-pressed={isSelected}>
                  <div className="editor-layer-swatch">
                    <svg viewBox={`${-span / 2} ${-span / 2} ${span} ${span}`} width="20" height="20">
                      <g dangerouslySetInnerHTML={{ __html: layerSvg({ ...layer, opacity: 1, outlineWidth: 0, hasNeon: false, hasShadow: false }) }} />
                    </svg>
                  </div>
                  <span>{layer.name}</span>
                  {layer.groupId && <span style={{ fontSize: '10px', opacity: 0.5, marginLeft: '4px', fontVariantCaps: 'all-small-caps' }}>G</span>}
                </button>
                <button type="button" className="editor-layer-action-btn" title={tx("Görünürlüğü değiştir", "Toggle visibility") + `: ${layer.name}`} aria-label={tx("Görünürlüğü değiştir", "Toggle visibility") + `: ${layer.name}`} onClick={() => setProject(p => ({ ...p, layers: p.layers.map(l => l.id === layer.id ? { ...l, visible: !l.visible } : l) }))}>
                  {layer.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button type="button" className="editor-layer-action-btn" title={tx("Kilidi değiştir", "Toggle lock") + `: ${layer.name}`} aria-label={tx("Kilidi değiştir", "Toggle lock") + `: ${layer.name}`} onClick={() => setProject(p => ({ ...p, layers: p.layers.map(l => l.id === layer.id ? { ...l, locked: !l.locked } : l) }))}>
                  {layer.locked ? <LockKeyhole size={15} /> : <UnlockKeyhole size={15} />}
                </button>
              </div>
            );
          })}
          <div className="editor-layer-tools">
            {button(tx("Öne taşı", "Bring forward"), <ArrowUp size={16} />, () => selected && setProject(p => reorderLayer(p, selected.id, 1)), !selected || selected.locked || project.layers.at(-1)?.id === selected.id)}
            {button(tx("Arkaya taşı", "Send backward"), <ArrowDown size={16} />, () => selected && setProject(p => reorderLayer(p, selected.id, -1)), !selected || selected.locked || project.layers[0]?.id === selected.id)}
            {button(tx("Çoğalt", "Duplicate"), <Copy size={16} />, () => duplicateSelected(), selectedIds.length === 0 || project.layers.length >= MAX_LAYERS)}
            {button(tx("Katmanı sil", "Delete layer"), <Trash2 size={16} />, () => setConfirmation({ title: tx(`Seçili katmanlar silinsin mi?`, `Delete selected layers?`), action: deleteSelected }), selectedIds.length === 0)}
          </div>
        </section>
      </aside>
      <section className="editor-stage">
        <div className="editor-stage-toolbar"><span><Crosshair size={15} />{tx("Önizleme", "Preview")}</span><select aria-label={tx("Arka plan", "Background")} value={scene} onChange={e => setScene(e.target.value)}><option value="dark">{tx("Koyu", "Dark")}</option><option value="light">{tx("Açık", "Light")}</option><option value="transparent">{tx("Şeffaflık", "Transparency")}</option><option value="warm">{tx("Sıcak sahne", "Warm scene")}</option><option value="blue">{tx("Mavi sahne", "Blue scene")}</option><option value="radial">{tx("Odak sahnesi", "Focus scene")}</option></select></div>
        
        <div ref={stageContainerRef} style={{ flex: 1, position: 'relative', display: 'flex', overflow: 'hidden' }}>
          <EditorCanvas
            project={project}
            selectedIds={selectedIds}
            onSelect={setSelectedIds}
            onMove={handleMoveLayers}
            onDuplicate={duplicateSelected}
            onDelete={deleteSelected}
            onToggleLock={toggleLockSelected}
            onGroup={handleGroup}
            onUngroup={handleUngroup}
            onReorder={dir => selectedId && setProject(p => reorderLayer(p, selectedId, dir))}
            onMoveTo={target => selectedId && setProject(p => moveLayerTo(p, selectedId, target))}
            onCenterAlign={() => update({ x: 0, y: 0 })}
            zoom={zoom}
            snap={snap}
            scene={scene}
            label={tx("Crosshair tuvali. Taşımak için sürükleyin veya ok tuşlarını kullanın.", "Crosshair canvas. Drag or use arrow keys to move.")}
            isTr={isTr}
          />
          
          <div className="editor-stage-floating-controls">
            <label className="editor-floating-snap" title={tx("1 px yapışma", "1 px snap")}>
              <input type="checkbox" checked={snap} onChange={e => setSnap(e.target.checked)} />
              <span>{tx("Yapışma", "Snap")}</span>
            </label>
            <span className="editor-floating-divider" />
            <button type="button" className="editor-floating-btn" title={tx("Küçült", "Zoom out")} onClick={() => setZoom(z => z === 'fit' ? 1 : Math.max(0.5, Math.round((z - 0.25) * 100) / 100))}>
              <Minus size={14} />
            </button>
            <button type="button" className="editor-floating-zoom" title={tx("Sığdır veya sıfırla", "Fit or reset")} onClick={() => setZoom(z => z === "fit" ? 1 : "fit")}>
              {zoom === "fit" ? tx("Sığdır", "Fit") : `${Math.round(zoom * 100)}%`}
            </button>
            <button type="button" className="editor-floating-btn" title={tx("Büyüt", "Zoom in")} onClick={() => setZoom(z => z === 'fit' ? 1.25 : Math.min(4, Math.round((z + 0.25) * 100) / 100))}>
              <Plus size={14} />
            </button>
            <span className="editor-floating-divider" />
            <span style={{ fontSize: '11px', opacity: 0.7, padding: '0 4px', fontVariantNumeric: 'tabular-nums' }}>256×256</span>
          </div>
        </div>
      </section>
      <aside className="editor-properties">
        <div className="editor-section-heading">
          <h2>{tx("Özellikler", "Properties")}</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            {selected && <button className="crosshair-editor-btn" onClick={() => setSelectedId(null)} title={tx("Seçimi Kaldır", "Deselect")} style={{ minHeight: 'auto', padding: '4px 8px' }}><X size={14} /> {tx("Kaldır", "Clear")}</button>}
            <Settings2 size={16} />
          </div>
        </div>
        {!selected ? <div className="editor-empty"><Crosshair size={32} /><p>{tx("Düzenlemek için tuvalden veya listeden bir katman seç.", "Select a layer on the canvas or in the list to edit it.")}</p></div> : <>
          {selected.locked && <p className="editor-hint">{tx("Bu katman kilitli. Düzenlemek için katman listesinden kilidi aç.", "This layer is locked. Unlock it in the layer list to edit.")}</p>}
          <fieldset disabled={selected.locked}>
            <label className="editor-text-field">{tx("Katman adı", "Layer name")}<input value={selected.name} maxLength={80} onChange={e => update({ name: e.target.value })} onBlur={() => { if (!selected.name.trim()) update({ name: tx("Katman", "Layer") }); }} /></label>
            <h3>{tx("Konum ve dönüş", "Position & rotation")}</h3>
            {numeric("x", "X", selected.x, -128, 128)}{numeric("y", "Y", selected.y, -128, 128)}{numeric("rotation", tx("Dönüş", "Rotation"), selected.rotation, -360, 360, 1, "°")}
            
            {/* Canva-style Positioning & Alignment */}
            <div className="canva-pos-section">
              <div className="canva-pos-heading">{tx("Sayfaya Hizala", "Align to Canvas")}</div>
              {(() => {
                const b = layerBounds({ ...selected, outlineWidth: 0 });
                const hw = Math.round(b.width / 2);
                const hh = Math.round(b.height / 2);
                return (
                  <div className="canva-pos-grid-2">
                    <button type="button" className="canva-pos-btn" title={tx("Sayfanın üstüne hizala", "Align to top")} onClick={() => update({ y: -128 + hh })}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16M7 8v8a2 2 0 0 0 4 0V8M13 8v5a2 2 0 0 0 4 0V8"/></svg>
                      <span>{tx("Üst", "Top")}</span>
                    </button>
                    <button type="button" className="canva-pos-btn" title={tx("Sayfanın soluna hizala", "Align to left")} onClick={() => update({ x: -128 + hw })}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4v16M8 7h8a2 2 0 0 1 0 4H8M8 13h5a2 2 0 0 1 0 4H8"/></svg>
                      <span>{tx("Sol", "Left")}</span>
                    </button>
                    <button type="button" className="canva-pos-btn" title={tx("Dikey ortaya hizala", "Align middle vertically")} onClick={() => update({ y: 0 })}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M9 6v12a2 2 0 0 0 4 0V6a2 2 0 0 0-4 0z"/></svg>
                      <span>{tx("Orta (Dikey)", "Middle")}</span>
                    </button>
                    <button type="button" className="canva-pos-btn" title={tx("Yatay ortaya hizala", "Align center horizontally")} onClick={() => update({ x: 0 })}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M6 9h12a2 2 0 0 1 0 4H6a2 2 0 0 1 0-4z"/></svg>
                      <span>{tx("Orta (Yatay)", "Center")}</span>
                    </button>
                    <button type="button" className="canva-pos-btn" title={tx("Sayfanın altına hizala", "Align to bottom")} onClick={() => update({ y: 128 - hh })}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16M7 16V8a2 2 0 0 1 4 0v8M13 16v-5a2 2 0 0 1 4 0v5"/></svg>
                      <span>{tx("Alt", "Bottom")}</span>
                    </button>
                    <button type="button" className="canva-pos-btn" title={tx("Sayfanın sağına hizala", "Align to right")} onClick={() => update({ x: 128 - hw })}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 4v16M16 7H8a2 2 0 0 0 0 4h8M16 13h-5a2 2 0 0 0 0 4h5"/></svg>
                      <span>{tx("Sağ", "Right")}</span>
                    </button>
                  </div>
                );
              })()}

              <div className="canva-pos-heading" style={{ marginTop: '16px' }}>{tx("Katman Sırası", "Arrange Layers")}</div>
              <div className="canva-pos-grid-2">
                <button type="button" className="canva-pos-btn" title={tx("Bir öne taşı", "Bring forward")} disabled={project.layers.at(-1)?.id === selected.id} onClick={() => setProject(p => reorderLayer(p, selected.id, 1))}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 6 5 5M12 6 7 11M12 6v12M4 20h16"/></svg>
                  <span>{tx("Bir öne", "Forward")}</span>
                </button>
                <button type="button" className="canva-pos-btn" title={tx("Bir arkaya taşı", "Send backward")} disabled={project.layers[0]?.id === selected.id} onClick={() => setProject(p => reorderLayer(p, selected.id, -1))}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 18 5-5M12 18 7 13M12 18V6M4 4h16"/></svg>
                  <span>{tx("Bir arkaya", "Backward")}</span>
                </button>
                <button type="button" className="canva-pos-btn" title={tx("En öne getir", "Bring to front")} disabled={project.layers.at(-1)?.id === selected.id} onClick={() => setProject(p => moveLayerTo(p, selected.id, "front"))}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 5 5M12 3 7 8M12 3v9M4 16h16M4 20h16"/></svg>
                  <span>{tx("En öne", "To front")}</span>
                </button>
                <button type="button" className="canva-pos-btn" title={tx("En arkaya gönder", "Send to back")} disabled={project.layers[0]?.id === selected.id} onClick={() => setProject(p => moveLayerTo(p, selected.id, "back"))}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 21 5-5M12 21 7 16M12 21v-9M4 8h16M4 4h16"/></svg>
                  <span>{tx("En arkaya", "To back")}</span>
                </button>
              </div>
            </div>
            <h3>{tx("Geometri", "Geometry")}</h3>
            {selected.type === "line" && <>{numeric("length", tx("Uzunluk", "Length"), selected.length, 1, 256)}<label className="editor-select-field">{tx("Çizgi ucu", "Line cap")}<select value={selected.cap} onChange={e => update({ cap: e.target.value as "butt" | "round" })}><option value="butt">{tx("Düz", "Butt")}</option><option value="round">{tx("Yuvarlak", "Round")}</option></select></label></>}
            {(selected.type === "cross" || selected.type === "t") && <>
              {numeric("length", tx("Uzunluk", "Length"), selected.length, 1, 128, 1)}
              {numeric("gap", tx("Merkez Boşluğu", "Center Gap"), selected.gap, 0, 64, 1)}
              <label className="editor-select-field">{tx("Çizgi ucu", "Line cap")}<select value={selected.cap} onChange={e => update({ cap: e.target.value as "butt" | "round" })}><option value="butt">{tx("Düz", "Butt")}</option><option value="round">{tx("Yuvarlak", "Round")}</option></select></label>
            </>}
            {selected.type === "diamond" && numeric("size", tx("Boyut", "Size"), selected.size, 2, 128, 1)}
            {(selected.type === "dot" || selected.type === "ring") && numeric("radius", tx("Yarıçap", "Radius"), selected.radius, 0.5, 128, 0.5)}
            {selected.type === "rectangle" && <>{numeric("width", tx("Genişlik", "Width"), selected.width, 1, 256)}{numeric("height", tx("Yükseklik", "Height"), selected.height, 1, 256)}</>}
            {(selected.type === "triangle" || selected.type === "star") && numeric("radius", tx("Yarıçap", "Radius"), selected.radius, 1, 128, 1)}
            {selected.type === "star" && <>{numeric("innerRadius", tx("İç Yarıçap", "Inner Radius"), selected.innerRadius, 1, 128, 1)}{numeric("points", tx("Köşe Sayısı", "Points"), selected.points, 3, 12, 1, "")}</>}
            {selected.type === "brackets" && <>{numeric("width", tx("Genişlik", "Width"), selected.width, 1, 256, 1)}{numeric("height", tx("Yükseklik", "Height"), selected.height, 1, 256, 1)}{numeric("cornerLength", tx("Köşe Uzunluğu", "Corner Length"), selected.cornerLength, 1, 128, 1)}</>}
            {"thickness" in selected && numeric("thickness", tx("Kalınlık", "Thickness"), selected.thickness, 0.5, 64, 0.5)}

            <h3>{tx("Efektler (Android Premium)", "Effects (Android Premium)")}</h3>
            <label className="editor-select-field" style={{ justifyContent: 'flex-start', cursor: 'pointer' }}>
              <input type="checkbox" checked={selected.hasNeon} onChange={e => update({ hasNeon: e.target.checked })} />
              <span style={{flex: 1, marginLeft: 8}}>{tx("Neon Parlaması", "Neon Glow")}</span>
            </label>
            {selected.hasNeon && <div style={{ padding: '8px 12px', background: 'var(--editor-bg)', borderRadius: '8px', border: '1px solid var(--editor-line)' }}>
              <ColorField label={tx("Neon Rengi", "Neon Color")} value={selected.neonColor} onChange={c => update({ neonColor: c })} />
              {numeric("neonBlur", tx("Neon Yayılımı", "Neon Blur"), selected.neonBlur, 0, 64, 1)}
            </div>}
            
            <label className="editor-select-field" style={{ justifyContent: 'flex-start', cursor: 'pointer', marginTop: 12 }}>
              <input type="checkbox" checked={selected.hasShadow} onChange={e => update({ hasShadow: e.target.checked })} />
              <span style={{flex: 1, marginLeft: 8}}>{tx("Gölge (Shadow)", "Shadow")}</span>
            </label>
            {selected.hasShadow && <div style={{ padding: '8px 12px', background: 'var(--editor-bg)', borderRadius: '8px', border: '1px solid var(--editor-line)' }}>
              <ColorField label={tx("Gölge Rengi", "Shadow Color")} value={selected.shadowColor} onChange={c => update({ shadowColor: c })} />
              {numeric("shadowBlur", tx("Gölge Yayılımı", "Shadow Blur"), selected.shadowBlur, 0, 64, 1)}
            </div>}

            <h3>{tx("Görünüm", "Appearance")}</h3>
            <ColorField label={tx("Renk", "Color")} value={selected.color} onChange={color => update({ color })} />
            <NumberField label={tx("Opaklık", "Opacity")} value={Math.round(selected.opacity * 100)} min={0} max={100} unit="%" onChange={v => update({ opacity: v / 100 })} />
            <ColorField label={tx("Kenarlık", "Outline")} value={selected.outlineColor} onChange={outlineColor => update({ outlineColor })} />
            {numeric("outlineWidth", tx("Kenarlık kalınlığı", "Outline width"), selected.outlineWidth, 0, 16, 0.5)}
            {selected.type === "line" && <><h3>{tx("Simetrik kopyalar", "Symmetric copies")}</h3><div className="editor-symmetry"><button onClick={() => add(symmetryCopies(selected, 2))}>{tx("2 yön", "2 directions")}</button><button onClick={() => add(symmetryCopies(selected, 4))}>{tx("4 yön", "4 directions")}</button></div><p className="editor-hint">{tx("Tuval merkezi etrafında bağımsız çizgiler oluşturur.", "Creates independent lines around the canvas center.")}</p></>}
          </fieldset>
        </>}
      </aside>
    </div>
    {incoming && <EditorDialog title={tx("Demodaki tasarımla devam et", "Continue with demo design")} close={() => setIncoming(null)}><p>{tx("Mevcut çalışman kayıtlı tasarımlara eklenecek, ardından demo tasarımı açılacak.", "Your current work will be saved before the demo design is opened.")}</p><div className="editor-dialog-actions"><button onClick={() => setIncoming(null)}>{tx("Mevcut çalışmada kal", "Keep current work")}</button><button className="editor-primary" onClick={() => { if (replaceWith(incoming)) setIncoming(null); }}>{tx("Demoyu aç", "Open demo")}</button></div></EditorDialog>}
    {showSaved && <EditorDialog title={tx("Kayıtlı tasarımlar", "Saved designs")} close={() => setShowSaved(false)}><p className="editor-hint">{tx("Yalnızca bu tarayıcıda saklanır. Kalıcı bir kopya için proje dosyasını indirin.", "Stored only in this browser. Download a project file for a portable copy.")}</p>{!saved.length && <p className="editor-empty">{tx("Henüz kayıtlı tasarım yok.", "No saved designs yet.")}</p>}{[...saved].reverse().map(item => <div className="editor-saved-row" key={item.id}><span>{item.name}<small>{item.layers.length} {tx("katman", "layers")}</small></span><button onClick={() => { if (replaceWith({ ...item, id: uid() })) setShowSaved(false); }}>{tx("Aç", "Open")}</button>{button(tx("Kaydı sil", "Delete saved design"), <Trash2 size={16} />, () => setConfirmation({ title: tx(`“${item.name}” kaydı silinsin mi?`, `Delete saved design “${item.name}”?`), action: () => { if (!deleteSaved(item.id)) failedSave(); } }))}</div>)}</EditorDialog>}
    {confirmation && <EditorDialog title={tx("İşlemi onayla", "Confirm action")} close={() => setConfirmation(null)}><p>{confirmation.title}</p><div className="editor-dialog-actions"><button onClick={() => setConfirmation(null)}>{tx("Vazgeç", "Cancel")}</button><button className="editor-primary" onClick={() => { confirmation.action(); setConfirmation(null); }}>{tx("Onayla", "Confirm")}</button></div></EditorDialog>}
  </div>;
}
