import React from 'react';
import { Download, FileText, CheckCircle2, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { PdfExportProgress } from '../utils/pdfExporter';

interface HeaderBarProps {
  onExportPdf: () => void;
  onExportDocx: () => void;
  pdfProgress: PdfExportProgress;
  onApplyPreset: (preset: 'g12-electro' | 'g12-equilibria' | 'g12-kinetics' | 'g10-electro') => void;
  isCapturing: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onExportPdf,
  onExportDocx,
  pdfProgress,
  onApplyPreset,
  isCapturing
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-lg shadow-xs">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
              Semesta Lesson Plan Studio
            </span>
            <span className="text-[11px] font-medium text-teal-700 whitespace-nowrap">
              Cambridge Chemistry & WASC Format
            </span>
          </div>
        </div>

        {/* Zone 2: 4 clean single-line preset links */}
        <nav className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="text-slate-400 font-normal mr-1">Presets:</span>
          <button
            type="button"
            onClick={() => onApplyPreset('g12-electro')}
            className="px-2.5 py-1.5 rounded-md hover:bg-slate-100 hover:text-teal-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Grade 12 Electrochemistry
          </button>
          <span className="text-slate-300">·</span>
          <button
            type="button"
            onClick={() => onApplyPreset('g12-equilibria')}
            className="px-2.5 py-1.5 rounded-md hover:bg-slate-100 hover:text-teal-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Grade 12 Equilibria & Buffers
          </button>
          <span className="text-slate-300">·</span>
          <button
            type="button"
            onClick={() => onApplyPreset('g12-kinetics')}
            className="px-2.5 py-1.5 rounded-md hover:bg-slate-100 hover:text-teal-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Grade 12 Reaction Kinetics
          </button>
          <span className="text-slate-300">·</span>
          <button
            type="button"
            onClick={() => onApplyPreset('g10-electro')}
            className="px-2.5 py-1.5 rounded-md hover:bg-slate-100 hover:text-teal-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Grade 10 IGCSE Chemistry
          </button>
        </nav>

        {/* Zone 3: Export actions with status */}
        <div className="flex items-center gap-3 shrink-0">
          {pdfProgress.status === 'building' && (
            <div className="flex items-center gap-2 text-xs font-medium text-teal-800 bg-teal-50 px-3 py-1.5 rounded-md border border-teal-200">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>{pdfProgress.message}</span>
            </div>
          )}

          {pdfProgress.status === 'ready' && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-md border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Ready</span>
            </div>
          )}

          {pdfProgress.status === 'error' && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-rose-700 bg-rose-50 px-2.5 py-1.5 rounded-md border border-rose-200">
              <AlertCircle className="w-3.5 h-3.5" />
              <span className="truncate max-w-[140px]">{pdfProgress.message}</span>
            </div>
          )}

          <button
            type="button"
            onClick={onExportDocx}
            disabled={isCapturing}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 active:scale-98 transition-all disabled:opacity-50 whitespace-nowrap shadow-xs cursor-pointer"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Export DOCX</span>
          </button>

          <button
            type="button"
            onClick={onExportPdf}
            disabled={isCapturing || pdfProgress.status === 'building'}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 active:scale-98 rounded-lg shadow-sm transition-all disabled:opacity-60 whitespace-nowrap cursor-pointer"
          >
            {isCapturing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Export Official PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
