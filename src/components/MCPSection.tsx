import { Terminal, Copy, Check, Server, Wrench, Palette, Zap, Lightbulb } from 'lucide-react';
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
      icon: <Palette className="w-5 h-5 text-purple-400" />,
      description: 'Generate p5.js or Canvas API code for a specific art style',
      params: 'style: "flow-field" | "particles" | "fractal" | "waves" | "spirograph" | "mandala" | "starfield"',
    },
    {
      name: 'create_color_palette',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      description: 'Generate harmonious color palettes for creative coding projects',
      params: 'mood: "warm" | "cool" | "neon" | "pastel" | "monochrome" | "cyberpunk"',
    },
    {
      name: 'creative_challenge',
      icon: <Lightbulb className="w-5 h-5 text-emerald-400" />,
      description: 'Get a random creative coding challenge with hints and starter code',
      params: 'difficulty: "beginner" | "intermediate" | "advanced"',
    },
    {
      name: 'code_to_animation',
      icon: <Wrench className="w-5 h-5 text-cyan-400" />,
      description: 'Generate CSS/JS animation code from natural language descriptions',
      params: 'description: string, type: "css" | "canvas" | "svg"',
    },
  ];

  const configSnippet = `// .vscode/mcp.json
{
  "servers": {
    "codemuse": {
      "command": "npx",
      "args": ["codemuse-mcp-server"],
      "env": {}
    }
  }
}`;

  const usageSnippet = `// In GitHub Copilot Chat, try:
// "Generate a flow field generative art sketch"
// "Create a cyberpunk color palette for my project"
// "Give me a creative coding challenge"
// "Create a bouncing particle animation in Canvas"`;

  return (
    <section id="mcp-server" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm mb-6">
          <Server className="w-4 h-4" />
          MCP Server for GitHub Copilot
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Extend Copilot with <span className="gradient-text">Creative Powers</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          CodeMuse includes a Model Context Protocol (MCP) server that adds creative coding tools directly to GitHub Copilot in VS Code. Generate art, get color palettes, and tackle creative challenges — all from Copilot Chat.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tools List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-indigo-400" />
            Available Tools
          </h3>
          {tools.map((tool) => (
            <div key={tool.name} className="glass-card rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{tool.icon}</div>
                <div>
                  <h4 className="text-white font-medium font-mono text-sm">{tool.name}</h4>
                  <p className="text-slate-400 text-sm mt-1">{tool.description}</p>
                  <code className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded mt-2 inline-block">
                    {tool.params}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Setup Instructions */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-pink-400" />
            Quick Setup
          </h3>

          {/* Install */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-white">1. Install the MCP Server</h4>
              <button
                onClick={() => copyToClipboard('npm install -g codemuse-mcp-server', 'install')}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copiedId === 'install' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <pre className="bg-[#0d0d15] rounded-lg p-3 text-sm">
              <code className="text-green-400 font-mono">npm install -g codemuse-mcp-server</code>
            </pre>
          </div>

          {/* Configure */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-white">2. Configure VS Code</h4>
              <button
                onClick={() => copyToClipboard(configSnippet, 'config')}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copiedId === 'config' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <pre className="bg-[#0d0d15] rounded-lg p-3 text-sm overflow-x-auto">
              <code className="text-slate-300 font-mono whitespace-pre">{configSnippet}</code>
            </pre>
          </div>

          {/* Usage */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-white">3. Use in Copilot Chat</h4>
              <button
                onClick={() => copyToClipboard(usageSnippet, 'usage')}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copiedId === 'usage' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <pre className="bg-[#0d0d15] rounded-lg p-3 text-sm overflow-x-auto">
              <code className="text-slate-300 font-mono whitespace-pre">{usageSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
