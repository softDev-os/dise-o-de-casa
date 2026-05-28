import { useState } from 'react';
import { type Quotation } from '../types';
import { useCalculator } from './useCalculator';

export function usePDF() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { formatCurrency } = useCalculator();

  /**
   * Genera un PDF de la cotización
   */
  const generatePDF = async (quotation: Quotation): Promise<Blob> => {
    setIsGenerating(true);
    setError(null);

    try {
      // Dynamic import para lazy loading
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      // Header
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(quotation.tag, 20, 20);

      doc.setFontSize(24);
      doc.setTextColor(20);
      doc.text(quotation.title, 20, 32);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Fecha: ${new Date(quotation.date).toLocaleDateString('es-CO')}`, 20, 40);
      doc.text(`Moneda: ${quotation.currency}`, 20, 46);

      // Separator
      doc.setDrawColor(200);
      doc.line(20, 50, 190, 50);

      // Rooms summary
      let y = 60;
      doc.setFontSize(14);
      doc.setTextColor(20);
      doc.text('Resumen por Ambiente', 20, y);
      y += 10;

      quotation.rooms.forEach((room) => {
        doc.setFontSize(11);
        doc.setTextColor(50);
        doc.text(`${room.emoji} ${room.name}`, 25, y);
        doc.text(`${room.area} m²`, 120, y);
        doc.text(`$${formatCurrency(room.subtotal)}`, 160, y);
        y += 7;
      });

      // Totals
      y += 10;
      doc.setDrawColor(200);
      doc.line(20, y, 190, y);
      y += 10;

      doc.setFontSize(11);
      doc.setTextColor(50);
      doc.text('Materiales:', 25, y);
      doc.text(`$${formatCurrency(quotation.subtotal)}`, 160, y);
      y += 7;

      doc.text('Mano de obra:', 25, y);
      doc.text(`$${formatCurrency(quotation.laborTotal)}`, 160, y);
      y += 7;

      doc.text(`Imprevistos (${quotation.prices.imprevistos}%):`, 25, y);
      doc.text(`$${formatCurrency(quotation.unforeseen)}`, 160, y);
      y += 10;

      // Final total
      doc.setDrawColor(110, 200, 169);
      doc.setLineWidth(0.5);
      doc.line(20, y, 190, y);
      y += 10;

      doc.setFontSize(14);
      doc.setTextColor(110, 200, 169);
      doc.text('TOTAL ESTIMADO:', 25, y);
      doc.setFontSize(18);
      doc.text(`$${formatCurrency(quotation.total)} COP`, 140, y);

      // Notes
      y += 20;
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text('Notas:', 20, y);
      y += 5;
      doc.text('• Vigencia: 30 días', 25, y);
      y += 5;
      doc.text('• Precios sujetos a cambio sin previo aviso', 25, y);
      y += 5;
      doc.text('• No incluye permisos ni licencias', 25, y);

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(180);
      doc.text('Generado con diseño-de-casa', 20, 285);

      return doc.output('blob');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error generating PDF');
      setError(error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Descarga el PDF
   */
  const downloadPDF = async (quotation: Quotation, filename?: string) => {
    try {
      const blob = await generatePDF(quotation);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `cotizacion-${quotation.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading PDF:', err);
    }
  };

  return {
    generatePDF,
    downloadPDF,
    isGenerating,
    error,
  };
}
