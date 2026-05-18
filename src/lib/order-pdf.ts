import { jsPDF } from "jspdf";

export interface OrderPdfData {
  orderId: string;
  productName: string;
  amountCents: number;
  currency: string;
  briefCompleted: boolean;
  deliveryDays: [number, number];
  etaRange: string;
  steps: string[];
  customerEmail?: string | null;
  customerName?: string | null;
}

const INK = "#111111";
const MUTED = "#666666";
const LINE = "#dddddd";

export function generateOrderPdf(d: OrderPdfData): jsPDF {
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

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 36;
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
