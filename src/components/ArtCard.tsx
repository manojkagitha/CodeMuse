import { Play } from 'lucide-react';
import type { SketchConfig } from '../types';
import CanvasRenderer from './CanvasRenderer';

interface ArtCardProps {
  sketch: SketchConfig;
  onSelect: (sketch: SketchConfig) => void;
}

export default function ArtCard({ sketch, onSelect }: ArtCardProps) {
  // Default params
  const defaultParams: Record<string, number> = {};
  sketch.params.forEach(p => { defaultParams[p.id] = p.default; });

  const categoryColors: Record<string, string> = {
    generative: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    particle: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    fractal: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    wave: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    interactive: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  };

  return (
    <div
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
      onClick={() => onSelect(sketch)}
    >
      {/* Canvas Preview */}
      <div className="relative overflow-hidden">
        <CanvasRenderer
          sketch={sketch}
          params={defaultParams}
          width={400}
          height={260}
          className="w-full"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500/90 text-white font-medium">
            <Play className="w-5 h-5" />
            Open in Studio
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span>{sketch.icon}</span>
            {sketch.name}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full border ${categoryColors[sketch.category]}`}>
            {sketch.category}
          </span>
        </div>
        <p className="text-sm text-slate-400 line-clamp-2">
          {sketch.description}
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <span>{sketch.params.length} adjustable parameters</span>
        </div>
      </div>
    </div>
  );
}
