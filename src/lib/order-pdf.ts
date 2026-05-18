import { jsPDF } from "jspdf";

export interface OrderPdfData {
  orderId: string;
  productName?: string | null;
  amountCents?: number | null;
  currency?: string | null;
  briefCompleted?: boolean | null;
  deliveryDays?: [number, number] | null;
  etaRange?: string | null;
  steps?: string[] | null;
  customerEmail?: string | null;
  customerName?: string | null;
}

const INK = "#111111";
const MUTED = "#666666";
const LINE = "#dddddd";

const FALLBACK = {
  productName: "Zamówienie KSIGN",
  currency: "PLN",
  deliveryDays: [7, 14] as [number, number],
  etaRange: "Termin zostanie potwierdzony mailem",
  steps: [
    "Potwierdzimy szczegóły mailem w ciągu 24 h.",
    "Po zebraniu materiałów rozpoczniemy realizację.",
  ],
  missing: "Brak danych",
};

export interface NormalizedOrderPdf {
  orderId: string;
  productName: string;
  amountCents: number;
  currency: string;
  briefCompleted: boolean;
  deliveryDays: [number, number];
  etaRange: string;
  steps: string[];
  customerEmail: string | null;
  customerName: string | null;
  warnings: string[];
}

export function normalizeOrderPdfData(d: OrderPdfData): NormalizedOrderPdf {
  const warnings: string[] = [];

  if (!d.orderId || typeof d.orderId !== "string") {
    throw new Error("Brak ID zamówienia — nie można wygenerować PDF.");
  }

  const productName =
    typeof d.productName === "string" && d.productName.trim()
      ? d.productName.trim().slice(0, 200)
      : (warnings.push("Brak nazwy produktu — użyto wartości domyślnej."), FALLBACK.productName);

  const amountCents =
    typeof d.amountCents === "number" && Number.isFinite(d.amountCents) && d.amountCents >= 0
      ? Math.round(d.amountCents)
      : (warnings.push("Brak kwoty — wyświetlono 0."), 0);

  const currency =
    typeof d.currency === "string" && /^[a-zA-Z]{3}$/.test(d.currency)
      ? d.currency
      : (warnings.push("Brak waluty — użyto PLN."), FALLBACK.currency);

  const briefCompleted = d.briefCompleted === true;

  let deliveryDays: [number, number] = FALLBACK.deliveryDays;
  if (
    Array.isArray(d.deliveryDays) &&
    d.deliveryDays.length === 2 &&
    Number.isFinite(d.deliveryDays[0]) &&
    Number.isFinite(d.deliveryDays[1]) &&
    d.deliveryDays[0] > 0 &&
    d.deliveryDays[1] >= d.deliveryDays[0]
  ) {
    deliveryDays = [Math.round(d.deliveryDays[0]), Math.round(d.deliveryDays[1])];
  } else {
    warnings.push("Brak terminu realizacji — użyto wartości domyślnej 7–14 dni.");
  }

  const etaRange =
    typeof d.etaRange === "string" && d.etaRange.trim()
      ? d.etaRange.trim().slice(0, 200)
      : (warnings.push("Brak ETA — wyświetlono komunikat zastępczy."), FALLBACK.etaRange);

  const cleanSteps = Array.isArray(d.steps)
    ? d.steps
        .filter((s): s is string => typeof s === "string" && s.trim().length > 0)
        .map((s) => s.trim().slice(0, 500))
        .slice(0, 20)
    : [];
  const steps = cleanSteps.length > 0
    ? cleanSteps
    : (warnings.push("Brak listy kroków — użyto domyślnych."), [...FALLBACK.steps]);

  const customerName =
    typeof d.customerName === "string" && d.customerName.trim()
      ? d.customerName.trim().slice(0, 200)
      : null;
  const customerEmail =
    typeof d.customerEmail === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.customerEmail.trim())
      ? d.customerEmail.trim().slice(0, 255)
      : null;
  if (!customerName && !customerEmail) {
    warnings.push("Brak danych kontaktowych klienta — pominięto sekcję.");
  }

  return {
    orderId: d.orderId,
    productName,
    amountCents,
    currency,
    briefCompleted,
    deliveryDays,
    etaRange,
    steps,
    customerEmail,
    customerName,
    warnings,
  };
}

export function generateOrderPdf(input: OrderPdfData): jsPDF {
  const d = normalizeOrderPdfData(input);
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 48;
  let y = margin;

  // Header
  doc.setFont("helvetica", "bold");
  doc.setTextColor(INK);
  doc.setFontSize(22);
  doc.text("KSIGN", margin, y);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(MUTED);
  doc.text("Podsumowanie zamowienia", pageW - margin, y, { align: "right" });
  y += 28;
  doc.setDrawColor(LINE);
  doc.line(margin, y, pageW - margin, y);
  y += 28;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(INK);
  doc.text(d.productName, margin, y);
  y += 22;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(MUTED);
  const amount = `${(d.amountCents / 100).toLocaleString("pl-PL")} ${d.currency.toUpperCase()}`;
  doc.text(`Kwota: ${amount}`, margin, y);
  y += 30;

  // Info grid
  const colW = (pageW - margin * 2 - 16) / 2;
  drawInfoBox(doc, margin, y, colW, "Status briefu", d.briefCompleted ? "Wypelniony" : "Oczekuje");
  drawInfoBox(
    doc,
    margin + colW + 16,
    y,
    colW,
    d.briefCompleted ? "Pierwsza wersja do" : "Realizacja",
    d.briefCompleted ? d.etaRange : `${d.deliveryDays[0]}-${d.deliveryDays[1]} dni rob.`,
  );
  y += 78;

  // Steps
  if (d.steps.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(INK);
    doc.text(d.briefCompleted ? "Co dzieje sie teraz?" : "Co dalej?", margin, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(INK);
    d.steps.forEach((step, i) => {
      const prefix = `${i + 1}. `;
      const lines = doc.splitTextToSize(prefix + step, pageW - margin * 2);
      if (y + lines.length * 14 > 760) {
        doc.addPage();
        y = margin;
      }
      doc.text(lines, margin, y);
      y += lines.length * 14 + 6;
    });
    y += 12;
  }

  // Customer
  if (d.customerEmail || d.customerName) {
    if (y > 700) {
      doc.addPage();
      y = margin;
    }
    doc.setDrawColor(LINE);
    doc.line(margin, y, pageW - margin, y);
    y += 18;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(INK);
    doc.text("Dane kontaktowe", margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(MUTED);
    if (d.customerName) {
      doc.text(d.customerName, margin, y);
      y += 14;
    }
    if (d.customerEmail) {
      doc.text(d.customerEmail, margin, y);
      y += 14;
    }
    y += 8;
  }

  // Footer — applied to every page so customer + meta są zawsze widoczne
  const pageH = doc.internal.pageSize.getHeight();
  const totalPages = doc.getNumberOfPages();
  const customerParts = [d.customerName, d.customerEmail].filter(
    (v): v is string => !!v && v.length > 0,
  );
  const customerLine = customerParts.length > 0 ? `Klient: ${customerParts.join(" · ")}` : null;

  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    const footerY = pageH - 36;
    doc.setDrawColor(LINE);
    doc.line(margin, footerY - 14, pageW - margin, footerY - 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(MUTED);
    doc.text(`ID zamowienia: ${d.orderId}`, margin, footerY);
    doc.text(
      `Wygenerowano: ${new Date().toLocaleString("pl-PL")}`,
      pageW - margin,
      footerY,
      { align: "right" },
    );
    if (customerLine) {
      doc.text(customerLine, margin, footerY - 22);
    }
  }

  return doc;
}

function drawInfoBox(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  label: string,
  value: string,
) {
  doc.setDrawColor(LINE);
  doc.setFillColor(250, 250, 247);
  doc.roundedRect(x, y, w, 64, 8, 8, "FD");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(MUTED);
  doc.text(label.toUpperCase(), x + 14, y + 22);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(INK);
  doc.text(value, x + 14, y + 46);
}
