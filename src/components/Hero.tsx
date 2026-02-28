import { ArrowDown, Wand2, Terminal, Palette, Sparkles, Eye } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Nebula blobs */}
      <div className="nebula-blob w-[600px] h-[600px] bg-purple-600/[0.07] -top-32 -right-40" />
      <div className="nebula-blob w-[500px] h-[500px] bg-cyan-500/[0.05] -bottom-20 -left-40" style={{ animationDelay: '-8s' }} />
      <div className="nebula-blob w-[350px] h-[350px] bg-pink-500/[0.04] top-1/3 left-1/2" style={{ animationDelay: '-15s' }} />

      {/* Subtle radial glow behind title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-purple-900/[0.08] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Agents League badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/15 bg-purple-500/[0.06] mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs text-purple-300/80" style={{ fontFamily: 'var(--font-body)' }}>
            Microsoft Agents League 2026 — Visual Creativity
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-up text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.05] mb-5 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          <span className="text-white">Visual Story & </span>
          <br className="hidden sm:block" />
          <span className="gradient-text">Palette Studio.</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up-d1 text-lg sm:text-xl text-[var(--text-dim)] leading-relaxed mb-4 max-w-xl mx-auto">
          Generative art, brand palettes, and ASCII exports — powered by algorithms that paint the cosmos.
        </p>
        <p className="animate-fade-up-d1 text-sm text-[var(--text-muted)] mb-10 max-w-md mx-auto">
          Scroll to watch the sky evolve. Hover to reveal the math. Create with Copilot.
        </p>

        {/* CTA */}
        <div className="animate-fade-up-d2 flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <button
            onClick={onExplore}
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all duration-300
              bg-gradient-to-r from-purple-600 to-purple-500
              hover:from-purple-500 hover:to-purple-400
              shadow-lg shadow-purple-600/20 hover:shadow-purple-500/30 hover:scale-[1.02]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <Sparkles className="w-4 h-4" />
            Explore Gallery
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <a
            href="#design-assistant"
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-medium text-[var(--text-dim)] transition-all duration-300
              border border-white/[0.06] hover:border-purple-500/20 hover:text-white hover:bg-white/[0.02]"
          >
            <Palette className="w-4 h-4" />
            Design Assistant
          </a>
        </div>

        {/* Feature pills */}
        <div className="animate-fade-up-d3 flex flex-wrap items-center justify-center gap-2">
          {[
            { icon: <Wand2 className="w-3 h-3" />, label: '7 Art Algorithms' },
            { icon: <Eye className="w-3 h-3" />, label: 'Scroll-driven Sky' },
            { icon: <Palette className="w-3 h-3" />, label: 'Palette Generator' },
            { icon: <Terminal className="w-3 h-3" />, label: 'MCP for Copilot' },
            { icon: <Sparkles className="w-3 h-3" />, label: 'ASCII Export' },
          ].map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] text-[var(--text-muted)] border border-white/[0.04] bg-white/[0.01]"
            >
              {feature.icon}
              {feature.label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up-d3">
        <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-purple-400/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
