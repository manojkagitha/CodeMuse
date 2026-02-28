import { Github, Sparkles, Layers } from 'lucide-react';

interface HeaderProps {
  view: 'gallery' | 'studio';
  onViewChange: (view: 'gallery' | 'studio') => void;
}

export default function Header({ view, onViewChange }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{
      background: 'rgba(3, 0, 20, 0.6)',
      backdropFilter: 'blur(24px) saturate(1.3)',
      borderBottom: '1px solid rgba(139, 92, 246, 0.06)',
    }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => onViewChange('gallery')}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-base font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="text-white">Code</span>
              <span className="text-purple-400">Muse</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <button
              onClick={() => onViewChange('gallery')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${
                view === 'gallery'
                  ? 'bg-purple-500/15 text-purple-300 shadow-inner shadow-purple-500/10'
                  : 'text-[var(--text-dim)] hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 inline mr-1 -mt-px" />
              Gallery
            </button>
            <button
              onClick={() => onViewChange('studio')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${
                view === 'studio'
                  ? 'bg-purple-500/15 text-purple-300 shadow-inner shadow-purple-500/10'
                  : 'text-[var(--text-dim)] hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 inline mr-1 -mt-px" />
              Studio
            </button>
          </nav>

          {/* GitHub */}
          <a
            href="https://github.com/manojkagitha/CodeMuse"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-[var(--text-dim)] hover:text-white hover:bg-white/[0.03] transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Source</span>
          </a>
        </div>
      </div>
    </header>
  );
}
