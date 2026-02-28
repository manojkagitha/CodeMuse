import { Heart, Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              Code<span className="text-indigo-400">Muse</span>
            </h3>
            <p className="text-sm text-slate-500">
              AI-Powered Creative Coding Companion. Generate stunning generative art and extend GitHub Copilot with creative tools.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-medium text-white mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="https://github.com/microsoft/agentsleague" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Agents League <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://code.visualstudio.com/docs/copilot/chat/mcp-servers" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  MCP in VS Code <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  GitHub Copilot <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Challenge Info */}
          <div>
            <h4 className="text-sm font-medium text-white mb-3">Challenge Submission</h4>
            <p className="text-sm text-slate-500 mb-3">
              Built for the Microsoft Agents League 2026 — Creative Apps Track (Battle #1).
            </p>
            <a
              href="https://github.com/manojVibeCoding/CodeMuse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-slate-300 text-sm hover:bg-white/10 transition-all"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <p>
            Built with <Heart className="w-3 h-3 inline text-pink-500" /> using GitHub Copilot — MIT License
          </p>
          <p>© 2026 CodeMuse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
