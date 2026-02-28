import { Heart, Github, ExternalLink, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.03] pt-14 pb-10 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="text-white">Code</span>
                <span className="text-purple-400">Muse</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-xs">
              Visual Story & Palette Studio — generative art, brand palettes, and AI coding tools.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[0.65rem] spaced-caps text-[var(--text-muted)] mb-3">Resources</h4>
            <ul className="space-y-2 text-xs text-[var(--text-dim)]">
              {[
                { label: 'Agents League', href: 'https://github.com/microsoft/agentsleague' },
                { label: 'MCP in VS Code', href: 'https://code.visualstudio.com/docs/copilot/chat/mcp-servers' },
                { label: 'GitHub Copilot', href: 'https://github.com/features/copilot' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-2.5 h-2.5 opacity-40" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenge */}
          <div>
            <h4 className="text-[0.65rem] spaced-caps text-[var(--text-muted)] mb-3">Submission</h4>
            <p className="text-xs text-[var(--text-dim)] mb-3 leading-relaxed">
              Built for Microsoft Agents League 2026 — Creative Apps Track.
            </p>
            <a
              href="https://github.com/kagithamanoj/CodeMuse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-[var(--text-dim)] border border-white/[0.05] hover:border-purple-500/20 hover:text-white hover:bg-white/[0.02] transition-all"
            >
              <Github className="w-3 h-3" />
              View Source
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.65rem] text-[var(--text-muted)]">
          <p className="flex items-center gap-1">
            Built with
            <Heart className="w-2.5 h-2.5 text-pink-500/60" />
            using GitHub Copilot
          </p>
          <p>MIT License · 2026</p>
        </div>
      </div>
    </footer>
  );
}
