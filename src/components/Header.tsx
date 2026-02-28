import { Palette, Github, Sparkles } from 'lucide-react';

interface HeaderProps {
  view: 'gallery' | 'studio';
  onViewChange: (view: 'gallery' | 'studio') => void;
}

export default function Header({ view, onViewChange }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-indigo-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('gallery')}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                Code<span className="text-indigo-400">Muse</span>
              </h1>
              <p className="text-[10px] text-slate-500 -mt-1">AI Creative Coding Companion</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <button
              onClick={() => onViewChange('gallery')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === 'gallery'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4 inline mr-1.5 -mt-0.5" />
              Gallery
            </button>
            <button
              onClick={() => onViewChange('studio')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === 'studio'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Palette className="w-4 h-4 inline mr-1.5 -mt-0.5" />
              Studio
            </button>
          </nav>

          {/* GitHub link */}
          <a
            href="https://github.com/manojVibeCoding/CodeMuse"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
