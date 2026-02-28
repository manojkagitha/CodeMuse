import { useState } from 'react';
import { Code, Sliders, RotateCcw, Download, Copy, Check, ArrowLeft, ChevronDown, ChevronUp, Type } from 'lucide-react';
import type { SketchConfig } from '../types';
import CanvasRenderer from './CanvasRenderer';
import AsciiArtModal from './AsciiArtModal';

interface StudioProps {
  sketch: SketchConfig;
  onBack: () => void;
}

export default function Studio({ sketch, onBack }: StudioProps) {
  const [params, setParams] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    sketch.params.forEach(p => { defaults[p.id] = p.default; });
    return defaults;
  });
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showParams, setShowParams] = useState(true);
  const [showAscii, setShowAscii] = useState(false);

  const handleParamChange = (id: string, value: number) => {
    setParams(prev => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    const defaults: Record<string, number> = {};
    sketch.params.forEach(p => { defaults[p.id] = p.default; });
    setParams(defaults);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sketch.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const canvas = document.querySelector<HTMLCanvasElement>('.studio-canvas canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `codemuse-${sketch.id}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-5 sm:px-8 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-[var(--text-dim)] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Gallery
        </button>
        <span className="text-[var(--text-muted)]/30">/</span>
        <span className="text-sm text-white font-medium flex items-center gap-1.5" style={{ fontFamily: 'var(--font-display)' }}>
          {sketch.icon} {sketch.name}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Canvas Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="cosmic-card-static p-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2
                  className="text-lg font-bold text-white flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {sketch.icon} {sketch.name}
                </h2>
                <p className="text-xs text-[var(--text-dim)] mt-0.5">{sketch.description}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowAscii(true)}
                  className="p-2 rounded-xl text-[var(--text-dim)] hover:text-white hover:bg-purple-500/10 transition-all"
                  title="View as ASCII Art"
                >
                  <Type className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-xl text-[var(--text-dim)] hover:text-white hover:bg-purple-500/10 transition-all"
                  title="Download as PNG"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-xl text-[var(--text-dim)] hover:text-white hover:bg-purple-500/10 transition-all"
                  title="Reset parameters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="studio-canvas bg-[var(--void)] rounded-2xl overflow-hidden flex items-center justify-center">
              <CanvasRenderer
                sketch={sketch}
                params={params}
                width={800}
                height={500}
              />
            </div>
          </div>

          {/* Code Section */}
          <div className="cosmic-card-static p-4">
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2 text-white text-sm font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                <Code className="w-4 h-4 text-cyan-400" />
                Source Code
              </div>
              {showCode ? <ChevronUp className="w-4 h-4 text-[var(--text-dim)]" /> : <ChevronDown className="w-4 h-4 text-[var(--text-dim)]" />}
            </button>

            {showCode && (
              <div className="mt-3 relative">
                <button
                  onClick={handleCopyCode}
                  className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 text-[var(--text-muted)] text-[0.65rem] hover:bg-white/10 hover:text-white transition-all"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <pre className="bg-[var(--void)] rounded-xl p-4 overflow-x-auto">
                  <code className="text-xs text-[var(--text-dim)] whitespace-pre" style={{ fontFamily: 'var(--font-mono)' }}>
                    {sketch.code}
                  </code>
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Controls Panel */}
        <div className="lg:col-span-1">
          <div className="cosmic-card-static p-5 sticky top-20">
            <button
              onClick={() => setShowParams(!showParams)}
              className="flex items-center justify-between w-full text-left mb-4"
            >
              <div className="flex items-center gap-2 text-white text-sm font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                <Sliders className="w-4 h-4 text-purple-400" />
                Parameters
              </div>
              {showParams ? <ChevronUp className="w-4 h-4 text-[var(--text-dim)]" /> : <ChevronDown className="w-4 h-4 text-[var(--text-dim)]" />}
            </button>

            {showParams && (
              <div className="space-y-5">
                {sketch.params.map((param) => (
                  <div key={param.id}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs text-[var(--text-dim)]">{param.label}</label>
                      <span
                        className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {params[param.id]?.toFixed(param.step < 1 ? 2 : 0)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={params[param.id] ?? param.default}
                      onChange={(e) => handleParamChange(param.id, parseFloat(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[0.6rem] text-[var(--text-muted)] mt-1">
                      <span>{param.min}</span>
                      <span>{param.max}</span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleReset}
                  className="w-full mt-3 py-2 rounded-xl border border-white/[0.06] text-[var(--text-dim)] text-xs hover:bg-white/[0.02] hover:text-white hover:border-purple-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Defaults
                </button>
              </div>
            )}

            {/* Quick info */}
            <div className="mt-5 pt-5 border-t border-white/[0.04]">
              <h4 className="text-xs font-medium text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>Details</h4>
              <div className="space-y-2 text-[0.65rem] text-[var(--text-muted)]">
                <div className="flex justify-between">
                  <span>Category</span>
                  <span className="text-[var(--text-dim)] capitalize">{sketch.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Parameters</span>
                  <span className="text-[var(--text-dim)]">{sketch.params.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Renderer</span>
                  <span className="text-[var(--text-dim)]">Canvas 2D</span>
                </div>
                <div className="flex justify-between">
                  <span>Framerate</span>
                  <span className="text-emerald-400/70">● 60fps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ASCII Art Modal */}
      {showAscii && (
        <AsciiArtModal onClose={() => setShowAscii(false)} />
      )}
    </div>
  );
}
