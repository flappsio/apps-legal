import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowUp, Check, Circle, Copy, Crosshair, Download, Eye, EyeOff, FolderOpen, Layers, LockKeyhole, Minus, Plus, Save, Settings2, Square, SunMoon, Trash2, UnlockKeyhole, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { LanguageToggle } from "@/components/crosshair/LanguageToggle";
import { SEOHead } from "@/components/seo/SEOHead";
import { EditorCanvas } from "@/components/crosshair/editor/EditorCanvas";
import { ColorField, NumberField } from "@/components/crosshair/editor/EditorFields";
import { useEditorProject } from "@/components/crosshair/editor/useEditorProject";
import { createElements, createProject, CrosshairLayer, CrosshairProject, downloadBlob, duplicateLayer, ElementType, exportProjectPng, MAX_FILE_BYTES, MAX_LAYERS, parseProject, projectFilename, reorderLayer, symmetryCopies, uid, updateLayer } from "@/lib/crosshairEditor";
import "@/components/crosshair/editor/editor.css";

function EditorDialog({ title, close, children }: { title: string; close: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  return <dialog ref={ref} className="editor-dialog" aria-label={title} onCancel={e => { e.preventDefault(); close(); }}>
    <div className="editor-dialog-heading"><h2>{title}</h2><button type="button" onClick={close} aria-label={title}><X size={18} /></button></div>{children}
  </dialog>;
}

export default function CrosshairEditorPage() {
  const { isTr } = useLanguage();
  const { toggleTheme } = useTheme();
  const tx = (tr: string, en: string) => isTr ? tr : en;
  const { project, setProject, saved, ready, status, replace, saveNamed, deleteSaved } = useEditorProject();
  const [selectedId, setSelectedId] = useState<string | null>(null);
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
  const location = useLocation();
  const navigate = useNavigate();
  const seenIncoming = useRef(false);
  const selected = project.layers.find(layer => layer.id === selectedId);
  const failedSave = () => setMessage(tx("Yerel kayıt yapılamadı. Çalışmanız burada korunuyor; değiştirmeden önce proje dosyasını indirin.", "Local save failed. Your work remains here; download the project before replacing it."));
  const update = (patch: Partial<CrosshairLayer>) => { if (selectedId) setProject(p => updateLayer(p, selectedId, patch)); };
  const replaceWith = (next: CrosshairProject) => {
    if (!replace(next)) { failedSave(); return false; }
    setSelectedId(null);
    setMessage(tx("Önceki çalışma kayıtlı tasarımlara eklendi.", "Previous work was preserved in saved designs."));
    return true;
  };

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
  ];
  const add = (layers: CrosshairLayer[]) => {
    if (project.layers.length + layers.length > MAX_LAYERS) { setMessage(tx("En fazla 100 katman ekleyebilirsiniz.", "You can add up to 100 layers.")); return; }
    setProject(p => ({ ...p, layers: [...p.layers, ...layers] }));
    setSelectedId(layers[0]?.id ?? null);
    setTab("settings");
  };
  const button = (label: string, icon: React.ReactNode, action: () => void, disabled = false) => <button type="button" title={label} aria-label={label} onClick={action} disabled={disabled}>{icon}</button>;
  const numeric = (key: string, label: string, value: number, min: number, max: number, step = 1, unit = "px") => <NumberField key={key} label={label} value={value} min={min} max={max} step={step} unit={unit} onChange={v => update({ [key]: v } as Partial<CrosshairLayer>)} />;

  return <div className="crosshair-editor">
    <SEOHead title={tx("Crossio — Crosshair Editörü", "Crossio — Crosshair Editor")} description={tx("Katmanlarla crosshair tasarlayın ve şeffaf PNG indirin.", "Design a layered crosshair and download a transparent PNG.")} canonicalPath="/crosshair/editor" />
    <header className="editor-header">
      <Link to="/crosshair" className="editor-brand"><ArrowLeft size={16} /><Crosshair size={23} /><strong>Crossio</strong><span>{tx("Editör", "Editor")}</span></Link>
      <div className="editor-header-actions"><LanguageToggle />{button(tx("Temayı değiştir", "Toggle theme"), <SunMoon size={18} />, toggleTheme)}</div>
    </header>
    <div className="editor-toolbar">
      <div className="editor-project-name"><input aria-label={tx("Tasarım adı", "Design name")} maxLength={80} value={project.name} onChange={e => setProject(p => ({ ...p, name: e.target.value }))} onBlur={() => { if (!project.name.trim()) setProject(p => ({ ...p, name: "Crosshair" })); }} /><span role="status">{status === "saved" ? <Check size={12} /> : null}{status === "saved" ? tx("Bu tarayıcıda kaydedildi", "Saved in this browser") : status === "pending" ? tx("Kaydediliyor…", "Saving…") : status === "error" ? tx("Yerel kayıt kullanılamıyor", "Local storage unavailable") : tx("Yükleniyor…", "Loading…")}</span></div>
      <div className="editor-toolbar-actions">
        <button disabled={!ready} onClick={() => setConfirmation({ title: tx("Yeni tasarım oluşturulsun mu? Mevcut çalışma saklanacak.", "Create a new design? Current work will be preserved."), action: () => replaceWith(createProject(tx("Yeni tasarım", "New design"), [])) })}><Plus size={16} />{tx("Yeni", "New")}</button>
        <button disabled={!ready} onClick={() => setShowSaved(true)}><FolderOpen size={16} />{tx("Tasarımlar", "Designs")}</button>
        <button disabled={!ready || !project.name.trim()} onClick={() => { if (saveNamed()) setMessage(tx("Tasarım kaydedildi.", "Design saved.")); else failedSave(); }}><Save size={16} />{tx("Kaydet", "Save")}</button>
        <button disabled={!ready} onClick={() => fileRef.current?.click()}><FolderOpen size={16} />{tx("Proje aç", "Open project")}</button>
        <button disabled={!ready || !project.name.trim()} onClick={() => downloadBlob(new Blob([JSON.stringify(project, null, 2)], { type: "application/json" }), `${projectFilename(project)}.crossio.json`)}>{tx("Proje indir", "Save file")}</button>
        <select aria-label={tx("PNG boyutu", "PNG size")} value={size} onChange={e => setSize(Number(e.target.value) as 256 | 512 | 1024)}>{[256, 512, 1024].map(n => <option key={n} value={n}>{n} px</option>)}</select>
        <button className="editor-primary" disabled={!ready || exporting || !project.layers.some(layer => layer.visible)} onClick={async () => { setExporting(true); try { await exportProjectPng(project, size); setMessage(tx("Şeffaf PNG indirildi.", "Transparent PNG downloaded.")); } catch { setMessage(tx("PNG oluşturulamadı. Tekrar deneyin.", "PNG export failed. Please try again.")); } finally { setExporting(false); } }}><Download size={16} />{exporting ? tx("Hazırlanıyor…", "Exporting…") : tx("PNG indir", "Export PNG")}</button>
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
          {[...project.layers].reverse().map(layer => <div key={layer.id} className={`editor-layer ${selectedId === layer.id ? "is-selected" : ""}`}>
            <button className="editor-layer-name" onClick={() => { setSelectedId(layer.id); setTab("settings"); }} aria-pressed={selectedId === layer.id}><span className="editor-layer-swatch" style={{ background: layer.color }} /><span>{layer.name}</span></button>
            {button(tx("Görünürlüğü değiştir", "Toggle visibility") + `: ${layer.name}`, layer.visible ? <Eye size={15} /> : <EyeOff size={15} />, () => setProject(p => ({ ...p, layers: p.layers.map(l => l.id === layer.id ? { ...l, visible: !l.visible } : l) })))}
            {button(tx("Kilidi değiştir", "Toggle lock") + `: ${layer.name}`, layer.locked ? <LockKeyhole size={15} /> : <UnlockKeyhole size={15} />, () => setProject(p => ({ ...p, layers: p.layers.map(l => l.id === layer.id ? { ...l, locked: !l.locked } : l) })))}
          </div>)}
          <div className="editor-layer-tools">
            {button(tx("Öne taşı", "Bring forward"), <ArrowUp size={16} />, () => selected && setProject(p => reorderLayer(p, selected.id, 1)), !selected || selected.locked || project.layers.at(-1)?.id === selected.id)}
            {button(tx("Arkaya taşı", "Send backward"), <ArrowDown size={16} />, () => selected && setProject(p => reorderLayer(p, selected.id, -1)), !selected || selected.locked || project.layers[0]?.id === selected.id)}
            {button(tx("Çoğalt", "Duplicate"), <Copy size={16} />, () => selected && setProject(p => duplicateLayer(p, selected.id)), !selected || selected.locked || project.layers.length >= MAX_LAYERS)}
            {button(tx("Katmanı sil", "Delete layer"), <Trash2 size={16} />, () => selected && setConfirmation({ title: tx(`“${selected.name}” silinsin mi?`, `Delete “${selected.name}”?`), action: () => { setProject(p => ({ ...p, layers: p.layers.filter(l => l.id !== selected.id) })); setSelectedId(null); } }), !selected || selected.locked)}
          </div>
        </section>
      </aside>
      <section className="editor-stage">
        <div className="editor-stage-toolbar"><span><Crosshair size={15} />{tx("Önizleme", "Preview")}</span><select aria-label={tx("Arka plan", "Background")} value={scene} onChange={e => setScene(e.target.value)}><option value="dark">{tx("Koyu", "Dark")}</option><option value="light">{tx("Açık", "Light")}</option><option value="transparent">{tx("Şeffaflık", "Transparency")}</option><option value="warm">{tx("Sıcak sahne", "Warm scene")}</option><option value="blue">{tx("Mavi sahne", "Blue scene")}</option><option value="radial">{tx("Odak sahnesi", "Focus scene")}</option></select></div>
        <EditorCanvas project={project} selectedId={selectedId} onSelect={setSelectedId} onMove={(id, x, y) => setProject(p => updateLayer(p, id, { x, y }))} zoom={zoom} snap={snap} scene={scene} label={tx("Crosshair tuvali. Taşımak için sürükleyin veya ok tuşlarını kullanın.", "Crosshair canvas. Drag or use arrow keys to move.")} />
        <div className="editor-stage-footer"><label><input type="checkbox" checked={snap} onChange={e => setSnap(e.target.checked)} />{tx("1 px yapışma", "1 px snap")}</label><select aria-label={tx("Yakınlaştırma", "Zoom")} value={zoom} onChange={e => setZoom(e.target.value === "fit" ? "fit" : Number(e.target.value))}><option value="fit">{tx("Alana sığdır", "Fit to view")}</option>{[0.5, 1, 2, 3, 4].map(z => <option key={z} value={z}>{z * 100}%{z === 1 ? tx(" · Gerçek boyut", " · Actual size") : ""}</option>)}</select><span>256 × 256</span></div>
      </section>
      <nav className="editor-mobile-tabs" aria-label={tx("Editör panelleri", "Editor panels")}>{[{ id: "elements", label: tx("Elemanlar", "Elements"), icon: <Plus size={16} /> }, { id: "layers", label: tx("Katmanlar", "Layers"), icon: <Layers size={16} /> }, { id: "settings", label: tx("Ayarlar", "Settings"), icon: <Settings2 size={16} /> }].map(item => <button key={item.id} aria-pressed={tab === item.id} onClick={() => setTab(item.id)}>{item.icon}{item.label}</button>)}</nav>
      <aside className="editor-properties"><div className="editor-section-heading"><h2>{tx("Özellikler", "Properties")}</h2><Settings2 size={16} /></div>
        {!selected ? <div className="editor-empty"><Crosshair size={32} /><p>{tx("Düzenlemek için tuvalden veya listeden bir katman seç.", "Select a layer on the canvas or in the list to edit it.")}</p></div> : <>
          {selected.locked && <p className="editor-hint">{tx("Bu katman kilitli. Düzenlemek için katman listesinden kilidi aç.", "This layer is locked. Unlock it in the layer list to edit.")}</p>}
          <fieldset disabled={selected.locked}>
            <label className="editor-text-field">{tx("Katman adı", "Layer name")}<input value={selected.name} maxLength={80} onChange={e => update({ name: e.target.value })} onBlur={() => { if (!selected.name.trim()) update({ name: tx("Katman", "Layer") }); }} /></label>
            <h3>{tx("Konum ve dönüş", "Position & rotation")}</h3>
            {numeric("x", "X", selected.x, -128, 128)}{numeric("y", "Y", selected.y, -128, 128)}{numeric("rotation", tx("Dönüş", "Rotation"), selected.rotation, -360, 360, 1, "°")}
            <button className="editor-wide-button" onClick={() => update({ x: 0, y: 0 })}><Crosshair size={15} />{tx("Merkeze hizala", "Center on canvas")}</button>
            <h3>{tx("Geometri", "Geometry")}</h3>
            {selected.type === "line" && <>{numeric("length", tx("Uzunluk", "Length"), selected.length, 1, 256)}<label className="editor-select-field">{tx("Çizgi ucu", "Line cap")}<select value={selected.cap} onChange={e => update({ cap: e.target.value as "butt" | "round" })}><option value="butt">{tx("Düz", "Butt")}</option><option value="round">{tx("Yuvarlak", "Round")}</option></select></label></>}
            {(selected.type === "dot" || selected.type === "ring") && numeric("radius", tx("Yarıçap", "Radius"), selected.radius, 0.5, 128, 0.5)}
            {selected.type === "rectangle" && <>{numeric("width", tx("Genişlik", "Width"), selected.width, 1, 256)}{numeric("height", tx("Yükseklik", "Height"), selected.height, 1, 256)}</>}
            {"thickness" in selected && numeric("thickness", tx("Kalınlık", "Thickness"), selected.thickness, 0.5, 64, 0.5)}
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
