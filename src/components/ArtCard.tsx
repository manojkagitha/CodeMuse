import { ArrowUpRight } from 'lucide-react';
import type { SketchConfig } from '../types';
import CanvasRenderer from './CanvasRenderer';

interface ArtCardProps {
  sketch: SketchConfig;
  onSelect: (sketch: SketchConfig) => void;
  featured?: boolean;
}

export default function ArtCard({ sketch, onSelect, featured = false }: ArtCardProps) {
  const defaultParams: Record<string, number> = {};
  sketch.params.forEach(p => { defaultParams[p.id] = p.default; });

  const categoryAccent: Record<string, string> = {
    generative: 'text-purple-400 bg-purple-500/10 border-purple-500/15',
    particle: 'text-amber-400 bg-amber-500/10 border-amber-500/15',
    fractal: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/15',
    wave: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/15',
    interactive: 'text-rose-400 bg-rose-500/10 border-rose-500/15',
  };

  return (
    <div
      className="cosmic-card overflow-hidden cursor-pointer group h-full"
      onClick={() => onSelect(sketch)}
    >
      {/* Canvas Preview */}
      <div className="relative overflow-hidden rounded-t-[20px]">
        <CanvasRenderer
          sketch={sketch}
          params={defaultParams}
          width={featured ? 700 : 400}
          height={featured ? 320 : 240}
          className="w-full"
        />

        {/* Hover overlay with arrow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--void)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-purple-500/80 backdrop-blur-sm flex items-center justify-center
          opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 shadow-lg shadow-purple-500/30">
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>

        {/* Category pill */}
        <div className={`absolute top-3 left-3 text-[0.65rem] font-medium px-2.5 py-0.5 rounded-full border backdrop-blur-sm ${categoryAccent[sketch.category]}`}>
          {sketch.category}
        </div>
      </div>

      {/* Card Info */}
      <div className="px-5 py-4">
        <h3
          className="text-base font-bold text-white flex items-center gap-2 mb-1.5"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="text-lg">{sketch.icon}</span>
          {sketch.name}
        </h3>
        <p className="text-xs text-[var(--text-dim)] leading-relaxed line-clamp-2">
          {sketch.description}
        </p>
        <div className="mt-3 flex items-center gap-3 text-[0.65rem] text-[var(--text-muted)]">
          <span>{sketch.params.length} parameters</span>
          <span className="w-0.5 h-0.5 rounded-full bg-[var(--text-muted)]" />
          <span>Canvas 2D</span>
          <span className="w-0.5 h-0.5 rounded-full bg-[var(--text-muted)]" />
          <span className="text-emerald-400/70">● Live</span>
        </div>
      </div>
    </div>
  );
}
