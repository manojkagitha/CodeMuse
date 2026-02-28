# 🎨 CodeMuse — AI-Powered Creative Coding Companion

> **Microsoft Agents League 2026 — Creative Apps Track (Battle #1)**
>
> Generate stunning generative art, explore mathematical beauty, and extend GitHub Copilot with creative coding tools through our MCP server.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with Copilot](https://img.shields.io/badge/Built%20with-GitHub%20Copilot-8957e5)](https://github.com/features/copilot)
[![MCP Server](https://img.shields.io/badge/MCP-Server%20Included-00d4aa)](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)
[![Agents League](https://img.shields.io/badge/Agents%20League-2026-ff6b6b)](https://github.com/microsoft/agentsleague)

---

## ✨ What is CodeMuse?

CodeMuse is a **dual-mode creative coding platform** built entirely with GitHub Copilot:

### 🖼️ Interactive Web Gallery
A stunning React web app featuring **7 real-time generative art algorithms** rendered on HTML5 Canvas:

| Artwork | Category | Description |
|---------|----------|-------------|
| 🌊 **Flow Field** | Generative | Particles flowing along noise-based vector fields |
| ✨ **Cosmic Nebula** | Particle | Gravitational particle system with orbital dynamics |
| 🌳 **Living Fractal Tree** | Fractal | Recursive tree with wind animation and seasonal colors |
| 🎵 **Wave Interference** | Wave | Overlapping sine waves creating moiré patterns |
| 🚀 **Hyperspace Stars** | Interactive | Warp-speed star field with parallax depth |
| 🎯 **Spirograph Engine** | Generative | Mathematical epicycloid curves in motion |
| 🔮 **Digital Mandala** | Generative | Sacred geometry with breathing animation |

Each artwork features:
- **Live canvas rendering** at 60fps
- **Interactive parameter controls** (sliders for real-time adjustment)
- **Source code viewer** with copy-to-clipboard
- **PNG export** to save your creations

### 🔌 MCP Server for GitHub Copilot
A **Model Context Protocol server** that integrates directly into VS Code, giving GitHub Copilot creative coding superpowers:

| Tool | Description |
|------|-------------|
| `generate_art` | Get complete, runnable generative art code for 7 different styles |
| `create_color_palette` | Generate harmonious color palettes (warm, cool, neon, pastel, cyberpunk, monochrome) |
| `creative_challenge` | Get creative coding challenges with hints and starter code |
| `code_to_animation` | Generate CSS, Canvas, or SVG animations from descriptions |

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- [VS Code](https://code.visualstudio.com/) with [GitHub Copilot](https://github.com/features/copilot)

### Run the Web App

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/CodeMuse.git
cd CodeMuse

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and explore the gallery!

### Set Up the MCP Server

```bash
# Navigate to the MCP server
cd mcp-server

# Install dependencies
npm install

# Build the TypeScript
npm run build
```

Then add to your VS Code MCP configuration (`.vscode/mcp.json`):

```json
{
  "servers": {
    "codemuse": {
      "command": "node",
      "args": ["${workspaceFolder}/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

Now in Copilot Chat, try:
- *"Generate a flow field generative art sketch"*
- *"Create a cyberpunk color palette for my project"*
- *"Give me an advanced creative coding challenge"*
- *"Create a bouncing particle animation in Canvas"*

---

## 🏗️ Architecture

```
CodeMuse/
├── src/                          # React Web Application
│   ├── App.tsx                   # Main app with routing (gallery/studio)
│   ├── components/
│   │   ├── Header.tsx            # Navigation with glass-morphism
│   │   ├── Hero.tsx              # Animated landing with gradient effects
│   │   ├── Gallery.tsx           # Art grid with live canvas previews
│   │   ├── ArtCard.tsx           # Individual artwork cards
│   │   ├── CanvasRenderer.tsx    # Generic canvas animation engine
│   │   ├── Studio.tsx            # Full-screen studio with controls
│   │   ├── MCPSection.tsx        # MCP server documentation section
│   │   └── Footer.tsx            # Links and attribution
│   ├── sketches/                 # Generative Art Algorithms
│   │   ├── flowField.ts          # 🌊 Noise-based flow field
│   │   ├── particleSystem.ts     # ✨ Gravitational particle nebula
│   │   ├── fractalTree.ts        # 🌳 Recursive fractal tree
│   │   ├── wavePattern.ts        # 🎵 Wave interference patterns
│   │   ├── starField.ts          # 🚀 Hyperspace warp effect
│   │   ├── spirograph.ts         # 🎯 Mathematical spirograph
│   │   ├── mandala.ts            # 🔮 Sacred geometry mandala
│   │   └── index.ts              # Sketch registry
│   └── types/                    # TypeScript type definitions
├── mcp-server/                   # MCP Server for GitHub Copilot
│   ├── src/
│   │   ├── index.ts              # Server entry point (stdio transport)
│   │   └── templates/            # Art templates, palettes, challenges
│   └── package.json
├── .vscode/mcp.json              # VS Code MCP configuration
└── docs/                         # Additional documentation
```

### Design Decisions

1. **No external AI API required** — All generative art is algorithmic (Canvas 2D), making it reliable and fast. The MCP server uses curated templates rather than LLM calls, ensuring consistent, high-quality output.

2. **Separation of concerns** — Each sketch is a self-contained module with its own parameters, render function, and code snippet. This makes it easy to add new art styles.

3. **Device pixel ratio support** — Canvas renders at native resolution for crisp output on Retina/HiDPI displays.

4. **MCP over stdio** — The MCP server uses standard I/O transport for seamless VS Code integration with zero configuration.

---

## 🤖 How GitHub Copilot Helped Build This

This project was built **entirely with GitHub Copilot assistance** in VS Code. Here's how Copilot contributed:

### Code Generation
- **Generative art algorithms**: Copilot suggested the mathematical formulas for spirograph (epicycloid equations), Perlin-like noise for flow fields, and recursive branching for fractal trees
- **React components**: Copilot generated the component structure, Tailwind CSS classes, and state management patterns
- **MCP server**: Copilot helped implement the MCP SDK integration, tool definitions, and request handlers

### Problem Solving
- **Canvas performance**: Copilot suggested using `requestAnimationFrame` with trail effects (semi-transparent overlays) instead of `clearRect` for smooth motion trails
- **Responsive design**: Copilot recommended the glass-morphism card approach with backdrop-filter for the modern UI
- **Type safety**: Copilot generated TypeScript interfaces for sketch configs, parameters, and MCP tool schemas

### Creative Inspiration
- When prompted with "suggest mathematical patterns for generative art", Copilot recommended:
  - Epicycloid/hypocycloid curves for the spirograph
  - Sacred geometry with rotational symmetry for the mandala
  - Wave superposition with moiré effects for interference patterns
  - N-body gravitational simulation for the particle nebula

### Documentation
- README structure and badges
- Code comments and JSDoc annotations
- Architecture documentation

---

## 🎯 Challenge Alignment

### Track: Creative Apps with GitHub Copilot ✅

| Requirement | Status | Details |
|-------------|--------|---------|
| GitHub Copilot usage | ✅ | Entire project built with Copilot — code gen, debugging, docs |
| Creative application | ✅ | Generative art gallery with 7 unique algorithms |
| MCP server integration | ✅ | 4 creative coding tools for Copilot Chat |
| Public repository | ✅ | MIT licensed, fully documented |
| Demo-able | ✅ | Web app runs locally with `npm run dev` |

### Judging Criteria Coverage

| Criteria | Weight | How CodeMuse Addresses It |
|----------|--------|---------------------------|
| **Accuracy & Relevance** | 20% | Meets all Creative Apps requirements, MCP integration as encouraged |
| **Reasoning & Multi-step** | 20% | Multi-step pipeline: user input → style selection → parameter tuning → real-time render → export; MCP: description → template matching → code generation |
| **Creativity & Originality** | 15% | 7 unique generative art algorithms, MCP server for Copilot is a novel approach, mathematical art (spirographs, mandalas, fractals) |
| **UX & Presentation** | 15% | Dark glass-morphism UI, animated hero, live canvas previews, interactive parameter controls, responsive design |
| **Reliability & Safety** | 20% | No API keys needed, template-based MCP for consistent output, input validation, graceful error handling, no external data dependencies |
| **Community Vote** | 10% | Visually appealing demos, shareable PNG exports |

---

## 📦 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS 4** | Utility-first styling |
| **HTML5 Canvas** | Real-time generative art rendering |
| **Lucide React** | Beautiful icon library |
| **MCP SDK** | Model Context Protocol server |
| **GitHub Copilot** | AI-assisted development throughout |

---

## 🎬 Demo

### Web Gallery
1. Run `npm run dev` and open [localhost:5173](http://localhost:5173)
2. Scroll through the gallery to see live generative art previews
3. Click any artwork to open the Studio
4. Adjust parameters with sliders and watch the art transform in real-time
5. Download your favorite creations as PNG

### MCP Server in Action
1. Build the MCP server: `cd mcp-server && npm install && npm run build`
2. Open VS Code with the project
3. The `.vscode/mcp.json` config auto-loads the server
4. Open Copilot Chat and ask: *"Generate a fractal tree generative art sketch"*
5. Copilot uses the `generate_art` tool to return complete, runnable code!

---

## 🤝 Contributing

Contributions are welcome! Here are some ideas:
- Add new generative art algorithms (Voronoi diagrams, L-systems, cellular automata)
- Enhance the MCP server with more tools
- Add audio reactivity using Web Audio API
- Implement gallery sharing with URL-encoded parameters

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🏆 Agents League Submission

- **Track**: 🎨 Creative Apps with GitHub Copilot
- **Challenge**: Microsoft Agents League 2026
- **Submission**: [Issue Link](https://github.com/microsoft/agentsleague/issues/new?template=project.yml)
- **Repository**: Public, MIT Licensed
- **Author**: Built with ❤️ and GitHub Copilot

---

<p align="center">
  <strong>Code</strong><em>Muse</em> — Where code meets creativity ✨
</p>
