import { Copy, Check, Wrench, Palette, Zap, Lightbulb } from 'lucide-react';
import { useState } from 'react';

export default function MCPSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const tools = [
    {
      name: 'generate_art',
      icon: <Palette className="w-4 h-4 text-purple-400" />,
      description: 'Get complete, runnable generative art code for 7 different styles',
      accent: 'border-purple-500/10 hover:border-purple-500/25',
    },
    {
      name: 'create_color_palette',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      description: 'Generate harmonious color palettes — warm, cool, neon, pastel, cyberpunk',
      accent: 'border-amber-500/10 hover:border-amber-500/25',
    },
    {
      name: 'creative_challenge',
      icon: <Lightbulb className="w-4 h-4 text-emerald-400" />,
      description: 'Get creative coding challenges with hints and starter code',
      accent: 'border-emerald-500/10 hover:border-emerald-500/25',
    },
    {
      name: 'code_to_animation',
      icon: <Wrench className="w-4 h-4 text-cyan-400" />,
      description: 'Generate CSS, Canvas, or SVG animations from plain English',
      accent: 'border-cyan-500/10 hover:border-cyan-500/25',
    },
  ];

  const configSnippet = `{
  "servers": {
    "codemuse": {
      "command": "node",
      "args": ["./mcp-server/dist/index.js"]
    }
  }
}`;

  const usageSnippet = `// Ask Copilot Chat:
"Generate a flow field art sketch"
"Create a cyberpunk palette"
"Give me a creative challenge"
"Animate bouncing particles"`;

  return (
    <section id="mcp-server" className="py-20 px-5 sm:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <p className="section-label mb-3 text-cyan-400/50">M C P &nbsp; S E R V E R</p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-white mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Copilot gains <span className="gradient-text">creative powers.</span>
        </h2>
        <p className="text-sm text-[var(--text-dim)] max-w-lg">
          A Model Context Protocol server that plugs into VS Code, giving GitHub Copilot four creative coding tools — right inside Chat.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Tools - 3 cols */}
        <div className="lg:col-span-3 space-y-3">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className={`cosmic-card-static p-4 flex items-start gap-3 ${tool.accent} transition-all duration-300`}
            >
              <div className="mt-0.5 w-8 h-8 rounded-xl bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                {tool.icon}
              </div>
              <div>
                <h4
                  className="text-sm text-white font-medium"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {tool.name}
                </h4>
                <p className="text-xs text-[var(--text-dim)] mt-0.5 leading-relaxed">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Setup - 2 cols */}
        <div className="lg:col-span-2 space-y-3">
          {/* Config */}
          <div className="cosmic-card-static p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-medium text-white" style={{ fontFamily: 'var(--font-display)' }}>
                .vscode/mcp.json
              </h4>
              <button
                onClick={() => copyToClipboard(configSnippet, 'config')}
                className="flex items-center gap-1 text-[0.6rem] text-[var(--text-muted)] hover:text-white transition-colors"
              >
                {copiedId === 'config' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <pre className="bg-[var(--void)] rounded-xl p-3 text-[0.7rem] overflow-x-auto">
              <code className="text-[var(--text-dim)] whitespace-pre" style={{ fontFamily: 'var(--font-mono)' }}>{configSnippet}</code>
            </pre>
          </div>

          {/* Usage */}
          <div className="cosmic-card-static p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-medium text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Try in Copilot Chat
              </h4>
              <button
                onClick={() => copyToClipboard(usageSnippet, 'usage')}
                className="flex items-center gap-1 text-[0.6rem] text-[var(--text-muted)] hover:text-white transition-colors"
              >
                {copiedId === 'usage' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <pre className="bg-[var(--void)] rounded-xl p-3 text-[0.7rem] overflow-x-auto">
              <code className="text-[var(--text-dim)] whitespace-pre" style={{ fontFamily: 'var(--font-mono)' }}>{usageSnippet}</code>
            </pre>
          </div>

          {/* Install hint */}
          <div className="cosmic-card-static p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-medium text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Quick Start
              </h4>
            </div>
            <div className="space-y-1.5">
              {[
                'cd mcp-server && npm install',
                'npm run build',
                'Reload VS Code window',
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-[0.7rem]">
                  <span className="w-4 h-4 rounded-md bg-purple-500/10 text-purple-400 flex items-center justify-center text-[0.6rem] flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
