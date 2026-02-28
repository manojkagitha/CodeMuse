# 🎨 CodeMuse — Visual Story & Palette Studio

> **Microsoft Agents League 2026 — Creative Apps Track (Battle #1)**
>
> A scroll-driven visual experience that fuses generative art, brand palette generation, ASCII art export, and an MCP server that gives GitHub Copilot creative superpowers.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with Copilot](https://img.shields.io/badge/Built%20with-GitHub%20Copilot-8957e5)](https://github.com/features/copilot)
[![MCP Server](https://img.shields.io/badge/MCP-6%20Tools-00d4aa)](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)
[![Agents League](https://img.shields.io/badge/Agents%20League-2026-ff6b6b)](https://github.com/microsoft/agentsleague)

---

## ✨ What is CodeMuse?

CodeMuse is a **Visual Story & Palette Studio** — a creative platform where:

- The **sky literally changes** as you scroll (night → dawn → day → sunset), driven by a real-time Canvas background engine
- **7 generative art algorithms** render live with interactive controls
- A **Design Assistant** generates deterministic color palettes and logo/layout ideas from project vibes
- Any canvas artwork can be **exported as ASCII art** with configurable charsets
- An **MCP server** with 6 tools gives GitHub Copilot visual creativity capabilities

### 🌗 Scroll-Driven Sky Engine
The entire page background evolves through time-of-day phases as you scroll:

| Scroll | Phase | Visual |
|--------|-------|--------|
| 0–25% | **Night** | Deep void blue, full stars & constellation lines |
| 25–50% | **Dawn** | Stars fade, warm rose/amber horizon glow |
| 50–75% | **Day** | Soft blue-sky gradient, no stars |
| 75–100% | **Sunset** | Golden-to-purple gradient, stars reappear |

### 🖼️ Generative Art Gallery
Seven real-time algorithms rendered on HTML5 Canvas with **hover-to-reveal algorithm details**:

| Artwork | Math | Technique |
|---------|------|-----------|
| 🌊 **Flow Field** | Perlin noise → vector angle | Particle advection along noise-derived flow vectors |
| ✨ **Cosmic Nebula** | F = G·m/r² | N-body orbital dynamics with trail fading |
| 🌳 **Living Fractal Tree** | L → L·ratio | Depth-limited recursion with wind perturbation |
| 🎵 **Wave Interference** | sin(ωx + φ) superposition | Multi-layer sine interference with phase offset |
| 🚀 **Hyperspace Stars** | scale = f/z | 3D→2D projection with parallax velocity |
| 🎯 **Spirograph Engine** | (R−r)cos(θ) + d·cos((R−r)θ/r) | Epicycloid parametric curve tracing |
| 🔮 **Digital Mandala** | θ = 2π/n | N-fold radial mirroring with breathing radius |

Each artwork features:
- **Live canvas rendering** at 60fps
- **Hover overlay** revealing the algorithm name, math formula, and technique
- **Interactive parameter controls** (sliders for real-time adjustment)
- **Source code viewer** with copy-to-clipboard
- **PNG export** and **ASCII art export**

### 🎨 Design Assistant
A built-in brand identity tool that generates:
- **Color palettes** (5 colors with hex codes, names, and CSS variables)
- **Logo & layout suggestions** (3 concepts per vibe)
- Vibes: Bold, Calm, Tech, Playful, Minimal, Cosmic

All deterministic — no external API keys required.

### ⣿ ASCII Art Export
Convert any live canvas artwork to ASCII art:
- Configurable columns/rows (20–200 cols)
- Brightness-to-character mapping via luminance
- Copy to clipboard or download as `.txt`

### 🔌 MCP Server for GitHub Copilot
A **Model Context Protocol server** with **6 creative coding tools**:

| Tool | Description |
|------|-------------|
| `generate_art` | Complete, runnable generative art code for 7 styles |
| `create_color_palette` | Harmonious color palettes (warm, cool, neon, pastel, cyberpunk, monochrome) |
| `creative_challenge` | Creative coding challenges with hints and starter code |
| `code_to_animation` | CSS, Canvas, or SVG animations from natural language |
| `suggest_brand_scene` | Brand palettes, background scenes, and typography for any vibe |
| `ascii_style` | ASCII art charsets, density settings, and conversion code |

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- [VS Code](https://code.visualstudio.com/) with [GitHub Copilot](https://github.com/features/copilot)

### Run the Web App

```bash
# Clone the repository
git clone https://github.com/kagithamanoj/CodeMuse.git
cd CodeMuse

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and scroll to watch the sky evolve!

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
- *"Suggest a brand scene for a playful app called Fizz"*
- *"What ASCII art style should I use for dense images?"*
- *"Give me an advanced creative coding challenge"*
- *"Create a bouncing particle animation in Canvas"*

---

## 🏗️ Architecture

```
CodeMuse/
├── src/                          # React Web Application
│   ├── App.tsx                   # Main app with scroll layout + sky engine
│   ├── components/
│   │   ├── BackgroundScene.tsx   # Scroll-driven sky (night→dawn→day→sunset)
│   │   ├── ScrollLayout.tsx      # Scroll progress tracker (0→1)
│   │   ├── Header.tsx            # Navigation with glass-morphism
│   │   ├── Hero.tsx              # "Visual Story & Palette Studio" landing
│   │   ├── Gallery.tsx           # Art grid with live canvas previews
│   │   ├── ArtCard.tsx           # Cards with hover-to-reveal algorithm details
│   │   ├── CanvasRenderer.tsx    # Generic canvas animation engine
│   │   ├── Studio.tsx            # Full studio with controls + ASCII export
│   │   ├── DesignAssistantPanel.tsx  # Palette & logo suggestion generator
│   │   ├── AsciiArtModal.tsx     # Canvas → ASCII art converter
│   │   ├── MCPSection.tsx        # MCP server documentation (6 tools)
│   │   ├── ZoneOut.tsx           # Poetic interstitial section
│   │   ├── ConstellationBg.tsx   # Static constellation canvas (legacy)
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
│   │   ├── index.ts              # Server with 6 tools (stdio transport)
│   │   └── templates/            # Art templates, palettes, challenges
│   └── package.json
├── .vscode/mcp.json              # VS Code MCP configuration
└── docs/                         # Additional documentation
```

### Design Decisions

1. **Scroll-driven background** — The `BackgroundScene` component reads `scrollProgress` (0→1) and computes sky gradients + star alpha per frame using `requestAnimationFrame`. Stars fade during day and reappear at sunset, creating a time-of-day narrative as users explore the page.

2. **Deterministic design assistant** — All palette/logo suggestions use a hash-based variant selection from curated vibe libraries. No external AI APIs needed — reliable, fast, and zero-configuration.

3. **ASCII art via luminance mapping** — Canvas pixels are downsampled to a configurable grid, luminance-mapped to a 10-character charset for instant text-art conversion.

4. **Hover-to-reveal on art cards** — Each card stores algorithm metadata (math formula + technique). A hover overlay animates in to show the computational details behind each piece.

5. **No external AI API required** — All generative art is algorithmic (Canvas 2D), and the MCP server uses curated templates. Consistent, high-quality output with zero configuration.

6. **MCP over stdio** — The MCP server uses standard I/O transport for seamless VS Code Copilot integration.

---

## 🤖 How GitHub Copilot Helped Build This

This project was built **entirely with GitHub Copilot assistance** in VS Code:

### Code Generation
- **Scroll-based sky engine**: Copilot helped design the color interpolation logic for smooth night→dawn→day→sunset transitions
- **Generative art algorithms**: Copilot suggested mathematical formulas for spirograph (epicycloid equations), Perlin-like noise for flow fields, and recursive branching for fractal trees
- **Design Assistant**: Copilot generated the vibe-to-palette mapping system with curated color harmonies
- **ASCII art converter**: Copilot recommended the luminance-to-character mapping approach with configurable density
- **MCP server**: Copilot implemented all 6 tool definitions, request handlers, and brand scene templates

### Problem Solving
- **Canvas performance**: Copilot suggested using `requestAnimationFrame` with linear color interpolation for smooth background transitions
- **Scroll tracking**: Copilot recommended a passive scroll listener with render-prop pattern for efficient re-renders
- **Hover reveals**: Copilot designed the overlay animation with transform + opacity for smooth reveal transitions

### Creative Design
- Night-to-day sky narrative that tells a visual story as users scroll
- Algorithm metadata overlay combining math notation with plain-English technique descriptions
- Deterministic palette generation that produces consistent results from project names

---

## 🎯 Challenge Alignment

### Track: Creative Apps with GitHub Copilot ✅

| Requirement | Status | Details |
|-------------|--------|---------|
| GitHub Copilot usage | ✅ | Entire project built with Copilot — code gen, debugging, design |
| Creative application | ✅ | Visual story engine, generative art, palette studio, ASCII export |
| MCP server integration | ✅ | 6 creative tools for Copilot Chat |
| Visual Creativity | ✅ | Scroll-driven sky, hover reveals, brand design assistant |
| Public repository | ✅ | MIT licensed, fully documented |
| Demo-able | ✅ | Web app runs locally with `npm run dev` |

### Judging Criteria Coverage

| Criteria | Weight | How CodeMuse Addresses It |
|----------|--------|---------------------------|
| **Accuracy & Relevance** | 20% | Meets all Creative Apps requirements; 6-tool MCP server; visual creativity focus |
| **Reasoning & Multi-step** | 20% | Scroll → sky phase → color interpolation → star alpha; Name + vibe → hash → palette → CSS vars; Canvas → downsample → luminance → ASCII |
| **Creativity & Originality** | 15% | Scroll-driven sky narrative, hover-to-reveal math overlays, deterministic brand assistant, ASCII art export |
| **UX & Presentation** | 15% | Evolving background, cosmic glass-morphism UI, live canvas previews, interactive parameter controls |
| **Reliability & Safety** | 20% | No API keys needed, deterministic outputs, template-based MCP, input validation, graceful error handling |
| **Community Vote** | 10% | Visually stunning scroll experience, shareable PNG/ASCII exports |

---

## 📦 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS 4** | Utility-first styling |
| **HTML5 Canvas** | Real-time generative art + scroll-driven sky |
| **Lucide React** | Icon library |
| **MCP SDK** | Model Context Protocol server (6 tools) |
| **GitHub Copilot** | AI-assisted development throughout |

---

## 🎬 Demo

### Web Gallery
1. Run `npm run dev` and open [localhost:5173](http://localhost:5173)
2. **Scroll slowly** to watch the sky evolve from night through dawn, day, and sunset
3. Hover over art cards to see the **algorithm math and techniques** revealed
4. Click any artwork to open the Studio
5. Adjust parameters with sliders and watch the art transform in real-time
6. Click the **⣿ ASCII** button to export as text art
7. Use the **Design Assistant** to generate brand palettes and logo ideas
8. Download your favorite creations as PNG

### MCP Server in Action
1. Build the MCP server: `cd mcp-server && npm install && npm run build`
2. Open VS Code with the project
3. The `.vscode/mcp.json` config auto-loads the server
4. Open Copilot Chat and try:
   - *"Generate a fractal tree generative art sketch"*
   - *"Suggest a brand scene for a cosmic app called Aurora"*
   - *"What ASCII style works best for detailed images?"*

---

## 🤝 Contributing

Contributions are welcome! Here are some ideas:
- Add new generative art algorithms (Voronoi diagrams, L-systems, cellular automata)
- Enhance the Design Assistant with font pairing suggestions
- Add audio reactivity using Web Audio API
- Implement gallery sharing with URL-encoded parameters
- Add more ASCII art charsets and export formats

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
  <strong>Code</strong><em>Muse</em> — Visual Story & Palette Studio ✨
</p>
