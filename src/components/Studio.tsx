import { useState } from 'react';
import { Code, Sliders, RotateCcw, Download, Copy, Check, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import type { SketchConfig } from '../types';
import CanvasRenderer from './CanvasRenderer';

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
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </button>
        <span className="text-slate-600">/</span>
        <span className="text-white font-medium flex items-center gap-2">
          {sketch.icon} {sketch.name}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Area - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  {sketch.icon} {sketch.name}
                </h2>
                <p className="text-sm text-slate-400 mt-1">{sketch.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                  title="Download as PNG"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                  title="Reset parameters"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="studio-canvas bg-[#0f0f1a] rounded-xl overflow-hidden flex items-center justify-center">
              <CanvasRenderer
                sketch={sketch}
                params={params}
                width={800}
                height={500}
              />
            </div>
          </div>

          {/* Code Section */}
          <div className="glass-card rounded-2xl p-4 mt-6">
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2 text-white font-medium">
                <Code className="w-5 h-5 text-indigo-400" />
                View Source Code
              </div>
              {showCode ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {showCode && (
              <div className="mt-4 relative">
                <button
                  onClick={handleCopyCode}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-slate-300 text-xs hover:bg-white/20 transition-all"
                >
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <pre className="bg-[#0d0d15] rounded-xl p-4 overflow-x-auto">
                  <code className="text-sm text-slate-300 font-mono whitespace-pre">
                    {sketch.code}
                  </code>
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Controls Panel */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl p-5 sticky top-24">
            <button
              onClick={() => setShowParams(!showParams)}
              className="flex items-center justify-between w-full text-left mb-4"
            >
              <div className="flex items-center gap-2 text-white font-medium">
                <Sliders className="w-5 h-5 text-pink-400" />
                Parameters
              </div>
              {showParams ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {showParams && (
              <div className="space-y-5">
                {sketch.params.map((param) => (
                  <div key={param.id}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-slate-300">{param.label}</label>
                      <span className="text-sm font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
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
                      className="w-full h-2 rounded-full appearance-none bg-slate-700 cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-indigo-500
                        [&::-webkit-slider-thumb]:shadow-lg
                        [&::-webkit-slider-thumb]:shadow-indigo-500/30
                        [&::-webkit-slider-thumb]:hover:bg-indigo-400
                        [&::-webkit-slider-thumb]:transition-all"
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>{param.min}</span>
                      <span>{param.max}</span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleReset}
                  className="w-full mt-4 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-sm hover:bg-white/5 hover:border-slate-400 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to Defaults
                </button>
              </div>
            )}

            {/* Quick info */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <h4 className="text-sm font-medium text-white mb-3">About this artwork</h4>
              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Category</span>
                  <span className="text-slate-300 capitalize">{sketch.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Parameters</span>
                  <span className="text-slate-300">{sketch.params.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Renderer</span>
                  <span className="text-slate-300">Canvas 2D</span>
                </div>
                <div className="flex justify-between">
                  <span>Real-time</span>
                  <span className="text-green-400">● 60fps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
