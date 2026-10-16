// Declaration for libraries loaded via CDN
declare global {
  interface Window {
    html2canvas?: any;
    jspdf?: {
      jsPDF: any;
    };
    MathJax?: {
      typesetPromise?: (elements?: any[]) => Promise<any>;
    };
  }
}

export interface PdfExportProgress {
  status: 'idle' | 'building' | 'ready' | 'error';
  message: string;
  progressPercent: number;
}

export async function exportLessonPlanToPdf(
  containerEl: HTMLElement,
  filename: string = 'Semesta_Chemistry_Lesson_Plan.pdf',
  onProgress?: (progress: PdfExportProgress) => void
): Promise<void> {
  const updateProgress = (status: PdfExportProgress['status'], message: string, progressPercent: number) => {
    if (onProgress) {
      onProgress({ status, message, progressPercent });
    }
  };

  try {
    updateProgress('building', 'Preparing fonts and math formulas...', 10);

    // 1. Ensure fonts are loaded
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    // 2. Typeset LaTeX with MathJax 3 (svg: fontCache 'none')
    if (window.MathJax && window.MathJax.typesetPromise) {
      await window.MathJax.typesetPromise([containerEl]);
    }

    // 3. Fix explicit width and height in px on every SVG so html2canvas renders them crisp and accurately
    const svgs = containerEl.querySelectorAll('svg');
    svgs.forEach((svg) => {
      const rect = svg.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        svg.setAttribute('width', `${Math.ceil(rect.width)}px`);
        svg.setAttribute('height', `${Math.ceil(rect.height)}px`);
      }
    });

    // 4. Verify html2canvas and jsPDF are loaded
    const html2canvas = window.html2canvas;
    const jsPdfLib = window.jspdf?.jsPDF || (window as any).jsPDF;

    if (!html2canvas) {
      throw new Error('html2canvas library is not loaded.');
    }
    if (!jsPdfLib) {
      throw new Error('jsPDF library is not loaded.');
    }

    updateProgress('building', 'Analyzing document sections...', 20);

    // 5. Query all distinct blocks marked with data-pdf-block="true"
    let blockElements = Array.from(
      containerEl.querySelectorAll<HTMLElement>('[data-pdf-block="true"]')
    ).filter(el => {
      // Exclude hidden or zero-height elements
      return el.offsetHeight > 0 && el.offsetWidth > 0;
    });

    if (blockElements.length === 0) {
      blockElements = [containerEl];
    }

    // Initialize jsPDF with A4 Portrait (210mm x 297mm)
    const pdf = new jsPdfLib({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Exact A4 dimensions and 20 mm margins
    const pageWidth = 210;
    const pageHeight = 297;
    const marginX = 20; // 20 mm Left/Right margin
    const marginTop = 20; // 20 mm Top margin
    const marginBottom = 20; // 20 mm Bottom margin
    const contentWidth = pageWidth - marginX * 2; // 170 mm exact content width
    const contentHeight = pageHeight - marginTop - marginBottom; // 257 mm exact content height
    const pageBottomY = pageHeight - marginBottom; // 277 mm
    const blockGapMm = 2.0; // Clean 2 mm spacing between blocks

    let currentY = marginTop;
    let pageNumber = 1;

    // Helper to draw standard Semesta & Cambridge running headers & footers
    const drawRunningHeaderFooter = (doc: any, pNum: number) => {
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105); // slate-600

      // Running Header at 12mm
      doc.text(
        'SEMESTA SCHOOL | EV-B3.1 | Sample Lesson Plans | WASC Initial Report 2026-2027',
        marginX,
        12
      );
      doc.setDrawColor(203, 213, 225); // slate-300
      doc.setLineWidth(0.3);
      doc.line(marginX, 14, pageWidth - marginX, 14);

      // Running Footer at 287mm
      doc.line(marginX, 284, pageWidth - marginX, 284);
      doc.text(
        'Cambridge International Education | WASC Evidence | Criteria B.3, B.1, C.3',
        marginX,
        289
      );
      doc.text(
        `Page ${pNum}`,
        pageWidth - marginX - 12,
        289
      );
    };

    // Draw header/footer on page 1
    drawRunningHeaderFooter(pdf, pageNumber);

    const totalBlocks = blockElements.length;

    for (let i = 0; i < totalBlocks; i++) {
      const blockEl = blockElements[i];
      const stepPercent = 20 + Math.round(((i + 1) / totalBlocks) * 70);
      updateProgress('building', `Processing table block ${i + 1} of ${totalBlocks}...`, stepPercent);

      // Capture block using scale: 2 for sharp vector-like text
      const canvas = await html2canvas(blockEl, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
        imageTimeout: 15000,
        // Match standard A4 pixel content width to avoid unwanted text wrapping
        windowWidth: 794
      });

      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;
      if (imgWidthPx === 0 || imgHeightPx === 0) continue;

      // Calculate exact rendered height in mm for contentWidth = 170 mm
      const blockHeightMm = (imgHeightPx / imgWidthPx) * contentWidth;
      const remainingSpaceMm = pageBottomY - currentY;

      // KEEP-WITH-NEXT & CLEAN PAGINATION RULES:
      // 1. If block fits in remaining space on current page: place it directly.
      // 2. If block does not fit in remaining space:
      //    Check if we already printed content on this page (currentY > marginTop).
      //    If so, add a new page FIRST, reset currentY to marginTop, and place the table intact!
      //    This prevents tables from awkwardly cracking across borders or text.
      // 3. NO extra blank page: We only call pdf.addPage() right before placing a real block.
      // 4. NO out of paper: If blockHeightMm > contentHeight (an unusually massive block),
      //    we handle it safely with exact bounds.

      if (blockHeightMm <= remainingSpaceMm) {
        // Fits comfortably on current page
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        pdf.addImage(imgData, 'JPEG', marginX, currentY, contentWidth, blockHeightMm);
        currentY += blockHeightMm + blockGapMm;
      } else if (currentY > marginTop) {
        // Does not fit on current page, but fits on a fresh page -> Push intact to next page!
        pdf.addPage();
        pageNumber++;
        drawRunningHeaderFooter(pdf, pageNumber);
        currentY = marginTop;

        if (blockHeightMm <= contentHeight) {
          const imgData = canvas.toDataURL('image/jpeg', 0.98);
          pdf.addImage(imgData, 'JPEG', marginX, currentY, contentWidth, blockHeightMm);
          currentY += blockHeightMm + blockGapMm;
        } else {
          // Block is taller than a single full page (rare edge case):
          // Slice cleanly into page-sized chunks without running off paper
          let renderedPxY = 0;
          const mmToPxRatio = imgHeightPx / blockHeightMm;

          while (renderedPxY < imgHeightPx) {
            const availSpaceMm = pageBottomY - currentY;
            const sliceHeightMm = Math.min(availSpaceMm, (imgHeightPx - renderedPxY) / mmToPxRatio);
            const sliceHeightPx = Math.min(sliceHeightMm * mmToPxRatio, imgHeightPx - renderedPxY);

            if (sliceHeightPx <= 0 || sliceHeightMm <= 0) break;

            const sliceCanvas = document.createElement('canvas');
            sliceCanvas.width = imgWidthPx;
            sliceCanvas.height = sliceHeightPx;
            const sliceCtx = sliceCanvas.getContext('2d');

            if (sliceCtx) {
              sliceCtx.fillStyle = '#ffffff';
              sliceCtx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
              sliceCtx.drawImage(
                canvas,
                0,
                renderedPxY,
                imgWidthPx,
                sliceHeightPx,
                0,
                0,
                imgWidthPx,
                sliceHeightPx
              );

              const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.98);
              pdf.addImage(sliceData, 'JPEG', marginX, currentY, contentWidth, sliceHeightMm);
            }

            renderedPxY += sliceHeightPx;
            currentY += sliceHeightMm;

            // Only add a new page if there are still pixels left to render for this block
            if (renderedPxY < imgHeightPx - 2) {
              pdf.addPage();
              pageNumber++;
              drawRunningHeaderFooter(pdf, pageNumber);
              currentY = marginTop;
            }
          }
          currentY += blockGapMm;
        }
      } else {
        // We are already at the top of a fresh page and block is slightly taller than page
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        const renderHeight = Math.min(blockHeightMm, contentHeight);
        pdf.addImage(imgData, 'JPEG', marginX, currentY, contentWidth, renderHeight);
        currentY += renderHeight + blockGapMm;
      }
    }

    updateProgress('building', 'Finalizing clean PDF...', 95);

    // Save with blob output as per strict requirement
    const pdfBlob = pdf.output('blob');
    saveBlobFile(pdfBlob, filename, pdf);

    updateProgress('ready', 'PDF ready! Clean document downloaded without cracks or blank pages.', 100);
  } catch (error: any) {
    console.error('PDF export error:', error);
    updateProgress('error', `Failed to generate PDF: ${error?.message || 'Unknown error'}`, 0);
    throw error;
  }
}

/**
 * Saves a Blob reliably inside sandboxed / iframe environments,
 * with graceful fallback to pdf.save().
 */
export function saveBlobFile(blob: Blob, filename: string, pdfInstance?: any): void {
  try {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      try {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (e) {
        // ignore clean up error
      }
    }, 4000);
  } catch (e) {
    console.warn('URL.createObjectURL failed, falling back to pdf.save():', e);
    if (pdfInstance && typeof pdfInstance.save === 'function') {
      pdfInstance.save(filename);
    }
  }
}
