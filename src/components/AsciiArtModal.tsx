import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Copy, Check, Download } from 'lucide-react';

interface AsciiArtModalProps {
  /** Selector for the source canvas element */
  canvasSelector?: string;
  /** Directly pass a canvas element */
  canvasElement?: HTMLCanvasElement | null;
  onClose: () => void;
}

const ASCII_CHARS = ' .:-=+*#%@';
const ASCII_WIDTH = 100;
const ASCII_HEIGHT = 50;

function canvasToAscii(source: HTMLCanvasElement, cols: number, rows: number): string {
  // Create an off-screen canvas at the target resolution
  const offscreen = document.createElement('canvas');
  offscreen.width = cols;
  offscreen.height = rows;
  const ctx = offscreen.getContext('2d');
  if (!ctx) return '';

  ctx.drawImage(source, 0, 0, cols, rows);
  const imageData = ctx.getImageData(0, 0, cols, rows);
  const data = imageData.data;

  let ascii = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const idx = (y * cols + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      // Luminance
      const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const charIdx = Math.floor(brightness * (ASCII_CHARS.length - 1));
      ascii += ASCII_CHARS[charIdx];
    }
    ascii += '\n';
  }
  return ascii;
}

export default function AsciiArtModal({ canvasSelector, canvasElement, onClose }: AsciiArtModalProps) {
  const [ascii, setAscii] = useState('');
  const [copied, setCopied] = useState(false);
  const [cols, setCols] = useState(ASCII_WIDTH);
  const [rows, setRows] = useState(ASCII_HEIGHT);
  const preRef = useRef<HTMLPreElement>(null);

  const getSourceCanvas = useCallback((): HTMLCanvasElement | null => {
    if (canvasElement) return canvasElement;
    if (canvasSelector) return document.querySelector<HTMLCanvasElement>(canvasSelector);
    return document.querySelector<HTMLCanvasElement>('.studio-canvas canvas');
  }, [canvasElement, canvasSelector]);

  const generateAscii = useCallback(() => {
    const source = getSourceCanvas();
    if (!source) {
      setAscii('// No canvas found — open a sketch in the Studio first');
      return;
    }
    setAscii(canvasToAscii(source, cols, rows));
  }, [getSourceCanvas, cols, rows]);

  useEffect(() => {
    generateAscii();
  }, [generateAscii]);

  const handleCopy = () => {
    navigator.clipboard.writeText(ascii);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([ascii], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `ascii-art-${Date.now()}.txt`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[var(--deep)] border border-white/[0.08] rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04]">
          <h3 className="text-sm font-bold text-white flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-lg">⣿</span>
            ASCII Art Export
          </h3>
          <div className="flex items-center gap-2">
            {/* Size controls */}
            <div className="flex items-center gap-1.5 text-[0.6rem] text-[var(--text-muted)]">
              <label>Cols</label>
              <input
                type="number"
                value={cols}
                onChange={(e) => setCols(Math.max(20, Math.min(200, parseInt(e.target.value) || 80)))}
                className="w-12 px-1.5 py-0.5 rounded-md bg-[var(--void)] border border-white/[0.06] text-white text-center text-[0.6rem]"
              />
              <label>Rows</label>
              <input
                type="number"
                value={rows}
                onChange={(e) => setRows(Math.max(10, Math.min(100, parseInt(e.target.value) || 40)))}
                className="w-12 px-1.5 py-0.5 rounded-md bg-[var(--void)] border border-white/[0.06] text-white text-center text-[0.6rem]"
              />
              <button
                onClick={generateAscii}
                className="px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-300 text-[0.6rem] hover:bg-purple-500/25 transition-colors"
              >
                Refresh
              </button>
            </div>
            <div className="w-px h-4 bg-white/[0.06]" />
            <button onClick={handleCopy} className="p-1.5 rounded-lg text-[var(--text-dim)] hover:text-white hover:bg-white/[0.04] transition-all" title="Copy ASCII">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button onClick={handleDownload} className="p-1.5 rounded-lg text-[var(--text-dim)] hover:text-white hover:bg-white/[0.04] transition-all" title="Download .txt">
              <Download className="w-3.5 h-3.5" />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-[var(--text-dim)] hover:text-white hover:bg-white/[0.04] transition-all">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ASCII output */}
        <div className="p-4 overflow-auto max-h-[calc(85vh-60px)]">
          <pre
            ref={preRef}
            className="bg-[var(--void)] rounded-xl p-4 text-[0.5rem] leading-[0.6rem] text-emerald-400/80 overflow-x-auto select-all whitespace-pre"
            style={{
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em',
            }}
          >
            {ascii}
          </pre>
        </div>
      </div>
    </div>
  );
}
