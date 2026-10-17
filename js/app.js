/**
 * ICaTAS 2026 Paper Generator & Customizer
 * Handles real-time preview, color palettes & randomizer,
 * DOCX generation via JSZip, print to PDF, and exports.
 */

// Preset Curated Academic Palettes
const PRESET_PALETTES = [
  {
    id: "original",
    name: "الأصلي (أخضر وأحمر وأصفر)",
    nameEn: "Original Assignment",
    confHeader: "#6aa84f",
    nameId: "#ff0000",
    highlight1: "#b88907",
    highlight2: "#741b47",
    keywords: "#0000ff",
    obsText: "#5a5a5a"
  },
  {
    id: "royal_navy",
    name: "الأزرق الملكي الأكاديمي",
    nameEn: "Royal Academic Navy",
    confHeader: "#1e3a8a",
    nameId: "#b91c1c",
    highlight1: "#b45309",
    highlight2: "#581c87",
    keywords: "#0284c7",
    obsText: "#475569"
  },
  {
    id: "emerald_nature",
    name: "الزمرد والأخضر الغابي",
    nameEn: "Emerald Forest",
    confHeader: "#166534",
    nameId: "#991b1b",
    highlight1: "#ca8a04",
    highlight2: "#831843",
    keywords: "#0f766e",
    obsText: "#3f3f46"
  },
  {
    id: "oxford_crimson",
    name: "العنابي والقرمزي الكلاسيكي",
    nameEn: "Oxford Crimson",
    confHeader: "#9f1239",
    nameId: "#0369a1",
    highlight1: "#c2410c",
    highlight2: "#1e1b4b",
    keywords: "#4338ca",
    obsText: "#4b5563"
  },
  {
    id: "cyber_violet",
    name: "البنفسجي الإمبريالي التقني",
    nameEn: "Imperial Purple",
    confHeader: "#6b21a8",
    nameId: "#be185d",
    highlight1: "#a16207",
    highlight2: "#065f46",
    keywords: "#2563eb",
    obsText: "#52525b"
  },
  {
    id: "bronze_copper",
    name: "النحاسي والعنبر الهندسي",
    nameEn: "Bronze & Copper",
    confHeader: "#c2410c",
    nameId: "#1d4ed8",
    highlight1: "#ca8a04",
    highlight2: "#4c1d95",
    keywords: "#0e7490",
    obsText: "#44403c"
  },
  {
    id: "deep_teal",
    name: "الفيروزي المحيطي الهادئ",
    nameEn: "Deep Ocean Teal",
    confHeader: "#0f766e",
    nameId: "#be123c",
    highlight1: "#d97706",
    highlight2: "#5b21b6",
    keywords: "#0284c7",
    obsText: "#334155"
  },
  {
    id: "slate_charcoal",
    name: "التيتانيوم الرمادي الحديث",
    nameEn: "Titanium Slate",
    confHeader: "#334155",
    nameId: "#dc2626",
    highlight1: "#b45309",
    highlight2: "#701a75",
    keywords: "#1d4ed8",
    obsText: "#525252"
  },
  {
    id: "midnight_indigo",
    name: "النيلي الداكن مع الياقوت",
    nameEn: "Midnight Indigo",
    confHeader: "#312e81",
    nameId: "#9f1239",
    highlight1: "#d97706",
    highlight2: "#065f46",
    keywords: "#0891b2",
    obsText: "#475569"
  },
  {
    id: "olive_moss",
    name: "الزيتوني الهادئ الأنيق",
    nameEn: "Elegant Olive",
    confHeader: "#3f6212",
    nameId: "#a21caf",
    highlight1: "#ea580c",
    highlight2: "#1e3a8a",
    keywords: "#0f766e",
    obsText: "#525252"
  }
];

// Current State
let currentState = {
  studentName: "",
  studentId: "",
  palette: { ...PRESET_PALETTES[0] },
  useRealisticDates: false,
  dates: {
    received: "#",
    revised: "#",
    accepted: "#",
    published: "#"
  },
  docSerial: "ICATAS-2026-A101",
  zoomLevel: 1.0
};

// Procedural Harmonious Color Generator
function generateRandomHarmoniousPalette() {
  // Select a base hue
  const baseHue = Math.floor(Math.random() * 360);
  
  // Complementary, Triadic, or Split Complementary shifts
  const shift1 = (baseHue + 30 + Math.floor(Math.random() * 40)) % 360;
  const shift2 = (baseHue + 120 + Math.floor(Math.random() * 40)) % 360;
  const shift3 = (baseHue + 180 + Math.floor(Math.random() * 40)) % 360;
  const shift4 = (baseHue + 240 + Math.floor(Math.random() * 40)) % 360;
  
  // Convert HSL to Hex
  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };
  
  return {
    id: `custom_${Date.now()}`,
    name: `مظهر توافقي #${Math.floor(1000 + Math.random() * 9000)}`,
    nameEn: `Harmonious #${Math.floor(1000 + Math.random() * 9000)}`,
    confHeader: hslToHex(baseHue, 75, 30),
    nameId: hslToHex(shift3, 85, 38),
    highlight1: hslToHex(shift1, 80, 36),
    highlight2: hslToHex(shift2, 75, 28),
    keywords: hslToHex(shift4, 80, 36),
    obsText: hslToHex(baseHue, 20, 35)
  };
}

// Generate Realistic Random Dates
function generateRealisticDates() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"];
  const year = 2026;
  
  const m1 = Math.floor(Math.random() * 4) + 2; // April - July
  const d1 = Math.floor(Math.random() * 25) + 1;
  
  const m2 = m1 + 1;
  const d2 = Math.floor(Math.random() * 25) + 1;
  
  const m3 = m2 + 1;
  const d3 = Math.floor(Math.random() * 25) + 1;
  
  const m4 = m3;
  const d4 = Math.min(28, d3 + Math.floor(Math.random() * 8) + 2);
  
  return {
    received: `${d1} ${months[m1]} ${year}`,
    revised: `${d2} ${months[m2]} ${year}`,
    accepted: `${d3} ${months[m3]} ${year}`,
    published: `${d4} ${months[m4]} ${year}`
  };
}

// Generate Unique Serial Hash
function generateUniqueSerial() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ICATAS-2026-${code}`;
}

// DOM Elements
const inputName = document.getElementById("inputName");
const inputId = document.getElementById("inputId");
const previewName = document.getElementById("previewName");
const previewId = document.getElementById("previewId");
const paperSheet = document.getElementById("paperSheet");
const paletteSelect = document.getElementById("paletteSelect");
const btnRandomize = document.getElementById("btnRandomize");
const btnQuickNew = document.getElementById("btnQuickNew");
const btnExportDocx = document.getElementById("btnExportDocx");
const btnExportPdf = document.getElementById("btnExportPdf");
const btnExportHtml = document.getElementById("btnExportHtml");
const toggleRealisticDates = document.getElementById("toggleRealisticDates");
const historyReceived = document.getElementById("historyReceived");
const historyRevised = document.getElementById("historyRevised");
const historyAccepted = document.getElementById("historyAccepted");
const historyPublished = document.getElementById("historyPublished");
const docSerialElement = document.getElementById("docSerial");
const activePaletteName = document.getElementById("activePaletteName");

// Color Picker Inputs
const pickerConf = document.getElementById("pickerConf");
const pickerNameId = document.getElementById("pickerNameId");
const pickerHl1 = document.getElementById("pickerHl1");
const pickerHl2 = document.getElementById("pickerHl2");
const pickerKeywords = document.getElementById("pickerKeywords");
const pickerObs = document.getElementById("pickerObs");

// Swatch Circles
const swatchConf = document.getElementById("swatchConf");
const swatchNameId = document.getElementById("swatchNameId");
const swatchHl1 = document.getElementById("swatchHl1");
const swatchHl2 = document.getElementById("swatchHl2");
const swatchKeywords = document.getElementById("swatchKeywords");
const swatchObs = document.getElementById("swatchObs");

// Zoom Controls
const btnZoomIn = document.getElementById("btnZoomIn");
const btnZoomOut = document.getElementById("btnZoomOut");
const btnZoomReset = document.getElementById("btnZoomReset");
const zoomLevelText = document.getElementById("zoomLevelText");

// Initialize Application
function initApp() {
  // Populate Presets Select
  PRESET_PALETTES.forEach((p, idx) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `${idx + 1}. ${p.name}`;
    paletteSelect.appendChild(opt);
  });
  
  // Set images from assets if available
  if (window.DOC_ASSETS) {
    if (window.DOC_ASSETS["image1.jpg"]) {
      const img1 = document.getElementById("img1");
      if (img1) img1.src = window.DOC_ASSETS["image1.jpg"];
    }
    if (window.DOC_ASSETS["image2.jpg"]) {
      const img2 = document.getElementById("img2");
      if (img2) img2.src = window.DOC_ASSETS["image2.jpg"];
    }
    if (window.DOC_ASSETS["image3.jpg"]) {
      const img3 = document.getElementById("img3");
      if (img3) img3.src = window.DOC_ASSETS["image3.jpg"];
    }
  }
  
  // Attach Event Listeners
  inputName.addEventListener("input", handleNameChange);
  inputId.addEventListener("input", handleIdChange);
  
  paletteSelect.addEventListener("change", handlePresetChange);
  btnRandomize.addEventListener("click", () => applyNewRandomTheme(true));
  btnQuickNew.addEventListener("click", () => applyNewRandomTheme(true));
  
  // Color Pickers Manual Tuning
  pickerConf.addEventListener("input", e => updateSingleColor("confHeader", e.target.value));
  pickerNameId.addEventListener("input", e => updateSingleColor("nameId", e.target.value));
  pickerHl1.addEventListener("input", e => updateSingleColor("highlight1", e.target.value));
  pickerHl2.addEventListener("input", e => updateSingleColor("highlight2", e.target.value));
  pickerKeywords.addEventListener("input", e => updateSingleColor("keywords", e.target.value));
  pickerObs.addEventListener("input", e => updateSingleColor("obsText", e.target.value));
  
  toggleRealisticDates.addEventListener("change", handleDateToggle);
  
  // Export Handlers
  btnExportDocx.addEventListener("click", exportDocx);
  btnExportPdf.addEventListener("click", () => window.print());
  btnExportHtml.addEventListener("click", exportStandaloneHtml);
  
  // Zoom
  btnZoomIn.addEventListener("click", () => adjustZoom(0.1));
  btnZoomOut.addEventListener("click", () => adjustZoom(-0.1));
  btnZoomReset.addEventListener("click", () => resetZoom());
  
  // Apply initial palette
  applyPalette(currentState.palette);
  
  // Auto-fit zoom on mobile
  autoFitMobileZoom();
  window.addEventListener("resize", () => {
    if (window.innerWidth < 850) {
      autoFitMobileZoom();
    }
  });
}

// Auto-fit paper zoom on mobile devices
function autoFitMobileZoom() {
  if (window.innerWidth < 850) {
    const availableWidth = window.innerWidth - 30;
    // A4 standard width is ~794px
    const fitScale = Math.max(0.38, Math.min(0.85, availableWidth / 794));
    currentState.zoomLevel = parseFloat(fitScale.toFixed(2));
    applyZoom();
  }
}

// Update Name and ID live
function handleNameChange(e) {
  currentState.studentName = e.target.value.trim();
  previewName.textContent = currentState.studentName ? currentState.studentName : "[الاسم غير محدد]";
}

function handleIdChange(e) {
  currentState.studentId = e.target.value.trim();
  previewId.textContent = currentState.studentId ? currentState.studentId : "[ID غير محدد]";
}

// Preset selection
function handlePresetChange(e) {
  const selected = PRESET_PALETTES.find(p => p.id === e.target.value);
  if (selected) {
    applyPalette(selected);
    showToast(`تم تطبيق مظهر: ${selected.name}`, "info");
  }
}

// Apply new random theme
function applyNewRandomTheme(notify = true) {
  const newPalette = generateRandomHarmoniousPalette();
  applyPalette(newPalette);
  
  // If realistic dates is enabled, also generate new dates
  if (currentState.useRealisticDates) {
    currentState.dates = generateRealisticDates();
    updateDatesDisplay();
  }
  
  // Generate new serial
  currentState.docSerial = generateUniqueSerial();
  docSerialElement.textContent = currentState.docSerial;
  
  // Add animation to dice
  const dice = document.querySelector(".dice-spin");
  if (dice) {
    dice.style.transform = "rotate(360deg)";
    setTimeout(() => { dice.style.transform = "none"; }, 400);
  }
  
  if (notify) {
    showToast(`تم توليد ألوان جديدة مميزة للملف! 🎨 (${newPalette.name})`, "success");
  }
}

// Apply palette to UI and CSS variables
function applyPalette(palette) {
  currentState.palette = { ...palette };
  
  // Update CSS Variables on paperSheet
  paperSheet.style.setProperty("--conf-header-color", palette.confHeader);
  paperSheet.style.setProperty("--name-id-color", palette.nameId);
  paperSheet.style.setProperty("--highlight1-color", palette.highlight1);
  paperSheet.style.setProperty("--highlight2-color", palette.highlight2);
  paperSheet.style.setProperty("--keywords-color", palette.keywords);
  paperSheet.style.setProperty("--obs-text-color", palette.obsText);
  
  // Update Color Pickers
  pickerConf.value = palette.confHeader;
  pickerNameId.value = palette.nameId;
  pickerHl1.value = palette.highlight1;
  pickerHl2.value = palette.highlight2;
  pickerKeywords.value = palette.keywords;
  pickerObs.value = palette.obsText;
  
  // Update Swatches
  swatchConf.style.backgroundColor = palette.confHeader;
  swatchNameId.style.backgroundColor = palette.nameId;
  swatchHl1.style.backgroundColor = palette.highlight1;
  swatchHl2.style.backgroundColor = palette.highlight2;
  swatchKeywords.style.backgroundColor = palette.keywords;
  swatchObs.style.backgroundColor = palette.obsText;
  
  // Update text label
  activePaletteName.textContent = palette.name;
}

// Single Color Picker Update
function updateSingleColor(key, hex) {
  currentState.palette[key] = hex;
  applyPalette(currentState.palette);
}

// Handle Dates Toggle
function handleDateToggle(e) {
  currentState.useRealisticDates = e.target.checked;
  if (currentState.useRealisticDates) {
    currentState.dates = generateRealisticDates();
  } else {
    currentState.dates = {
      received: "#",
      revised: "#",
      accepted: "#",
      published: "#"
    };
  }
  updateDatesDisplay();
}

function updateDatesDisplay() {
  historyReceived.textContent = currentState.dates.received;
  historyRevised.textContent = currentState.dates.revised;
  historyAccepted.textContent = currentState.dates.accepted;
  historyPublished.textContent = currentState.dates.published;
}

// Zoom Handlers
function adjustZoom(delta) {
  currentState.zoomLevel = Math.max(0.5, Math.min(1.8, currentState.zoomLevel + delta));
  applyZoom();
}

function resetZoom() {
  currentState.zoomLevel = 1.0;
  applyZoom();
}

function applyZoom() {
  paperSheet.style.transform = `scale(${currentState.zoomLevel})`;
  zoomLevelText.textContent = `${Math.round(currentState.zoomLevel * 100)}%`;
}

// Toast Notifications
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : 'ℹ️'}</span> <span>${message}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Clean Hex (remove leading # and lowercase)
function cleanHex(color) {
  return color.replace("#", "").toLowerCase();
}

// ==========================================================================
// EXPORT TO DOCX (Ultra-Reliable for Vercel, Local, and Mobile)
// ==========================================================================
async function exportDocx() {
  btnExportDocx.disabled = true;
  btnExportDocx.innerHTML = `<span>⏳ جاري تجهيز وتحميل ملف Word...</span>`;
  
  try {
    let zip = null;
    
    // 1. Try embedded Base64 first
    if (window.DOC_ASSETS && window.DOC_ASSETS.docx_base64) {
      try {
        zip = await JSZip.loadAsync(window.DOC_ASSETS.docx_base64, { base64: true });
      } catch (b64Err) {
        console.warn("Base64 JSZip load failed, trying fetch fallback...", b64Err);
      }
    }
    
    // 2. Fetch directly from server as fallback (Guaranteed on Vercel)
    if (!zip) {
      try {
        const resp = await fetch('assignment.docx');
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const buffer = await resp.arrayBuffer();
        zip = await JSZip.loadAsync(buffer);
      } catch (fetchErr) {
        console.error("Direct fetch failed:", fetchErr);
        throw new Error("تعذر تحميل قالب ملف الوورد الأصلي. تأكد من اتصال الإنترنت.");
      }
    }
    
    let xml = await zip.file("word/document.xml").async("text");
    
    const nameVal = (currentState.studentName || "").trim() || "Student";
    const idVal = (currentState.studentId || "").trim() || "ID";
    
    // 1. Replace NAME: and ID:
    const originalFragment = '<w:t xml:space="preserve">NAME:</w:t><w:br w:type="textWrapping"/><w:t xml:space="preserve">ID:</w:t>';
    const replacementFragment = `<w:t xml:space="preserve">NAME: ${escapeXml(nameVal)}</w:t><w:br w:type="textWrapping"/><w:t xml:space="preserve">ID: ${escapeXml(idVal)}</w:t>`;
    
    if (xml.includes(originalFragment)) {
      xml = xml.replace(originalFragment, replacementFragment);
    } else {
      xml = xml.replace(/NAME:<\/w:t><w:br w:type="textWrapping"\/><w:t xml:space="preserve">ID:/g, `NAME: ${escapeXml(nameVal)}</w:t><w:br w:type="textWrapping"/><w:t xml:space="preserve">ID: ${escapeXml(idVal)}`);
    }
    
    // 2. Replace Color Tags in document.xml
    const p = currentState.palette;
    const confHex = cleanHex(p.confHeader);
    const nameIdHex = cleanHex(p.nameId);
    const hl1Hex = cleanHex(p.highlight1);
    const hl2Hex = cleanHex(p.highlight2);
    const keywHex = cleanHex(p.keywords);
    const obsHex = cleanHex(p.obsText);
    
    xml = xml.replace(/<w:color w:val="6aa84f"\/>/g, `<w:color w:val="${confHex}"/>`);
    xml = xml.replace(/<w:color w:val="ff0000"\/>/g, `<w:color w:val="${nameIdHex}"/>`);
    xml = xml.replace(/<w:color w:val="f1c232"\/>/g, `<w:color w:val="${hl1Hex}"/>`);
    xml = xml.replace(/<w:color w:val="741b47"\/>/g, `<w:color w:val="${hl2Hex}"/>`);
    xml = xml.replace(/<w:color w:val="0000ff"\/>/g, `<w:color w:val="${keywHex}"/>`);
    xml = xml.replace(/<w:color w:val="5a5a5a"\/>/g, `<w:color w:val="${obsHex}"/>`);
    
    // 3. Replace dates if enabled
    if (currentState.useRealisticDates) {
      xml = xml.replace(/<w:t xml:space="preserve">Received\s*:\s*#<\/w:t>/g, `<w:t xml:space="preserve">Received   : ${escapeXml(currentState.dates.received)}</w:t>`);
      xml = xml.replace(/<w:t xml:space="preserve">Revised\s*:\s*#<\/w:t>/g, `<w:t xml:space="preserve">Revised    : ${escapeXml(currentState.dates.revised)}</w:t>`);
      xml = xml.replace(/<w:t xml:space="preserve">Accepted\s*:\s*#<\/w:t>/g, `<w:t xml:space="preserve">Accepted   : ${escapeXml(currentState.dates.accepted)}</w:t>`);
      xml = xml.replace(/<w:t xml:space="preserve">Published\s*:\s*#<\/w:t>/g, `<w:t xml:space="preserve">Published : ${escapeXml(currentState.dates.published)}</w:t>`);
    }
    
    zip.file("word/document.xml", xml);
    
    // Generate blob
    const blob = await zip.generateAsync({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    });
    
    // Generate safe filename (compatible with mobile and desktop download managers)
    const safeName = sanitizeFileName(nameVal) || "Paper";
    const safeId = sanitizeFileName(idVal) || "2026";
    const downloadFileName = `ICaTAS_2026_${safeName}_${safeId}.docx`;
    
    // Download using FileSaver or robust anchor
    triggerFileDownload(blob, downloadFileName);
    
    showToast(`تم تنزيل ملف الوورد (${downloadFileName}) بنجاح! 🎉`, "success");
  } catch (err) {
    console.error("DOCX Export Error:", err);
    showToast(`خطأ أثناء إنشاء الملف: ${err.message}`, "error");
  } finally {
    btnExportDocx.disabled = false;
    btnExportDocx.innerHTML = `<span>📥 تحميل ملف Word (DOCX)</span>`;
  }
}

// ==========================================================================
// EXPORT STANDALONE HTML
// ==========================================================================
function exportStandaloneHtml() {
  const paperClone = paperSheet.cloneNode(true);
  paperClone.style.transform = "none";
  paperClone.style.boxShadow = "none";
  paperClone.style.margin = "0 auto";
  
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ICaTAS 2026 Paper - ${escapeXml(currentState.studentName || 'Research')}</title>
  <style>
    @page { size: A4 portrait; margin: 12mm 15mm; }
    body { font-family: "Times New Roman", Times, Georgia, serif; background: #f0f2f5; margin: 0; padding: 20px; display: flex; justify-content: center; }
    .a4-sheet {
      width: 210mm;
      min-height: 297mm;
      background: #fff;
      box-shadow: 0 5px 20px rgba(0,0,0,0.15);
      padding: 16mm 17mm;
      box-sizing: border-box;
      direction: ltr;
      --conf-header-color: ${currentState.palette.confHeader};
      --name-id-color: ${currentState.palette.nameId};
      --highlight1-color: ${currentState.palette.highlight1};
      --highlight2-color: ${currentState.palette.highlight2};
      --keywords-color: ${currentState.palette.keywords};
      --obs-text-color: ${currentState.palette.obsText};
    }
    .paper-conf-header { margin-bottom: 12px; }
    .conf-title { font-size: 11pt; font-weight: bold; font-style: italic; color: var(--conf-header-color); margin-bottom: 2px; }
    .conf-theme { font-size: 9pt; font-style: italic; color: #111; line-height: 1.3; }
    .research-badge { display: inline-block; font-size: 9pt; font-weight: bold; font-style: italic; margin-top: 6px; color: #000; }
    .header-divider { height: 1.5px; background-color: #222; margin: 6px 0 10px 0; }
    .paper-title { font-size: 15pt; font-weight: bold; font-style: italic; line-height: 1.2; color: #000; margin-bottom: 8px; }
    .student-block { font-size: 15pt; font-weight: bold; font-style: italic; color: var(--name-id-color); margin-bottom: 6px; display: flex; flex-direction: column; gap: 2px; }
    .student-block .field-row { display: flex; align-items: baseline; gap: 6px; }
    .student-block .field-value { text-decoration: underline; }
    .affiliation { font-size: 8.5pt; font-weight: bold; font-style: italic; color: #222; margin-bottom: 10px; }
    .abstract-grid { display: grid; grid-template-columns: 2.8fr 1.2fr; gap: 14px; border-top: 1px solid #777; border-bottom: 1px solid #777; padding: 8px 0; margin-bottom: 12px; }
    .abstract-left { font-size: 8.5pt; font-weight: bold; font-style: italic; line-height: 1.35; text-align: justify; }
    .hl-1 { color: var(--highlight1-color); }
    .hl-2 { color: var(--highlight2-color); }
    .abstract-right { border-left: 1px solid #aaa; padding-left: 12px; display: flex; flex-direction: column; gap: 6px; }
    .history-section h4, .keywords-section h4 { font-size: 8.5pt; font-weight: bold; font-style: italic; margin-bottom: 4px; color: #000; }
    .history-list { font-size: 7.5pt; font-weight: bold; font-style: italic; line-height: 1.4; color: #333; }
    .history-row { display: flex; justify-content: space-between; }
    .keywords-list { font-size: 7.8pt; line-height: 1.35; color: var(--keywords-color); display: flex; flex-direction: column; }
    .section-heading { font-size: 10.5pt; font-weight: bold; font-style: italic; margin: 8px 0 6px 0; color: #000; }
    .two-col-layout { display: grid; grid-template-columns: 1.15fr 1fr; gap: 12px; align-items: center; margin-bottom: 10px; }
    .text-col { font-size: 8.5pt; font-weight: bold; font-style: italic; line-height: 1.35; text-align: justify; }
    .text-col p { margin-bottom: 6px; }
    .image-col img, .flowchart-container img { width: 100%; height: auto; object-fit: contain; }
    .sub-heading { font-size: 9.5pt; font-weight: bold; margin-bottom: 4px; }
    .obs-text { font-size: 10pt; font-style: italic; color: var(--obs-text-color); line-height: 1.25; margin-bottom: 6px; }
    .math-equation { font-size: 10.5pt; display: flex; justify-content: space-between; align-items: center; margin: 5px 0; padding: 0 4px; }
    .flowchart-container { width: 100%; margin-top: 6px; display: flex; justify-content: center; }
    .paper-footer-meta { display: flex; justify-content: space-between; border-top: 1px dashed #ccc; margin-top: 10px; padding-top: 4px; font-size: 7pt; color: #777; }
    @media print {
      body { background: #fff; padding: 0; }
      .a4-sheet { box-shadow: none; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  ${paperClone.outerHTML}
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  const fileName = `ICaTAS_2026_${sanitizeFileName(currentState.studentName || 'Student')}.html`;
  triggerFileDownload(blob, fileName);
  showToast(`تم تحميل صفحة الويب المستقلة بنجاح!`, "success");
}

// Helper Utilities
function escapeXml(unsafe) {
  if (!unsafe) return "";
  return unsafe.toString().replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function sanitizeFileName(name) {
  if (!name) return "document";
  // Replace unsafe characters with underscore, trim to safe length
  return name.replace(/[^\w\d_\u0600-\u06FF-]/g, "_").slice(0, 30);
}

// Universal Robust File Download (FileSaver + Blob Anchor + Extended Lifetime)
function triggerFileDownload(blob, filename) {
  // 1. Try FileSaver saveAs first (Best for iOS Safari, Android & Modern Browsers)
  if (typeof window.saveAs === "function") {
    try {
      window.saveAs(blob, filename);
      return;
    } catch (e) {
      console.warn("FileSaver saveAs failed, falling back to native anchor:", e);
    }
  }
  
  // 2. Native HTML5 Blob Download
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  
  try {
    a.click();
  } catch (clickErr) {
    console.warn("Direct click failed, opening in new tab:", clickErr);
    window.open(url, "_blank");
  }
  
  // Keep blob URL active for 60 seconds so mobile OS download managers can safely complete
  setTimeout(() => {
    try {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (cleanupErr) {}
  }, 60000);
}

// Run on load
document.addEventListener("DOMContentLoaded", initApp);
