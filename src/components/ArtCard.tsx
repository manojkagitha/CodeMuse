import { ArrowUpRight, Info } from 'lucide-react';
import type { SketchConfig } from '../types';
import CanvasRenderer from './CanvasRenderer';

interface ArtCardProps {
  sketch: SketchConfig;
  onSelect: (sketch: SketchConfig) => void;
  featured?: boolean;
}

// Algorithm details for hover reveal
const algorithmDetails: Record<string, { math: string; technique: string }> = {
  'flow-field': { math: 'Perlin noise → vector angle', technique: 'Particle advection along noise-derived flow vectors' },
  'particle-system': { math: 'Gravitational force: F = G·m/r²', technique: 'N-body orbital dynamics with trail fading' },
  'fractal-tree': { math: 'Recursive branching: L → L·ratio', technique: 'Depth-limited recursion with wind perturbation' },
  'wave-pattern': { math: 'sin(ωx + φ) superposition', technique: 'Multi-layer sine interference with phase offset' },
  'star-field': { math: 'z-depth perspective: scale = f/z', technique: '3D→2D projection with parallax velocity' },
  'spirograph': { math: 'x = (R−r)cos(θ) + d·cos((R−r)θ/r)', technique: 'Epicycloid parametric curve tracing' },
  'mandala': { math: 'Rotational symmetry: θ = 2π/n', technique: 'N-fold radial mirroring with breathing radius' },
};

export default function ArtCard({ sketch, onSelect, featured = false }: ArtCardProps) {
  const defaultParams: Record<string, number> = {};
  sketch.params.forEach(p => { defaultParams[p.id] = p.default; });

  const details = algorithmDetails[sketch.id] || { math: 'Algorithmic', technique: 'Canvas 2D rendering' };

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

        {/* Hover overlay — algorithm details reveal */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--void)] via-[var(--void)]/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
          <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Info className="w-3 h-3 text-cyan-400" />
              <span className="text-[0.6rem] text-cyan-400 font-medium uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
                Algorithm
              </span>
            </div>
            <p className="text-[0.65rem] text-white/90 mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
              {details.math}
            </p>
            <p className="text-[0.6rem] text-[var(--text-dim)] leading-relaxed">
              {details.technique}
            </p>
          </div>
        </div>

        {/* Arrow button */}
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
