import { Sparkles, ArrowRight, Cpu, Wand2, Terminal } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-pink-900/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Microsoft Agents League 2026 — Creative Apps Track</span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-in text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="text-white">Code</span>
          <span className="gradient-text">Muse</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-delay text-xl sm:text-2xl text-slate-300 mb-4 max-w-2xl mx-auto">
          AI-Powered Creative Coding Companion
        </p>
        <p className="animate-fade-in-delay text-base text-slate-500 mb-10 max-w-xl mx-auto">
          Generate stunning generative art, explore mathematical beauty, and extend GitHub Copilot with creative coding tools through our MCP server.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onExplore}
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            Explore the Gallery
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#mcp-server"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-white/5 hover:border-slate-400 transition-all"
          >
            <Terminal className="w-5 h-5" />
            MCP Server Docs
          </a>
        </div>

        {/* Feature pills */}
        <div className="animate-fade-in-delay-2 flex flex-wrap items-center justify-center gap-3">
          {[
            { icon: <Wand2 className="w-4 h-4" />, label: '7 Art Generators' },
            { icon: <Terminal className="w-4 h-4" />, label: 'MCP Server for Copilot' },
            { icon: <Cpu className="w-4 h-4" />, label: 'Real-time Canvas' },
            { icon: <Sparkles className="w-4 h-4" />, label: 'Built with GitHub Copilot' },
          ].map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-slate-400 text-sm border border-white/5"
            >
              {feature.icon}
              {feature.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
