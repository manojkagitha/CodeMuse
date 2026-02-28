import { useState, useMemo, useCallback } from 'react';
import { Palette, Sparkles, Copy, Check, RotateCcw, Lightbulb, Type, Layers } from 'lucide-react';

interface PaletteColor {
  hex: string;
  name: string;
}

interface BrandSuggestion {
  layout: string;
  idea: string;
}

// ── Deterministic vibe-to-palette mapping ──────────────────────────────────────
const VIBE_SEEDS: Record<string, PaletteColor[][]> = {
  bold: [
    [{ hex: '#FF3366', name: 'Electric Rose' }, { hex: '#FF6633', name: 'Solar Flare' }, { hex: '#FFCC00', name: 'Gold Rush' }, { hex: '#1A1A2E', name: 'Void Black' }, { hex: '#FFFFFF', name: 'Pure White' }],
    [{ hex: '#E63946', name: 'Crimson Pulse' }, { hex: '#F4A261', name: 'Amber Heat' }, { hex: '#2A9D8F', name: 'Teal Edge' }, { hex: '#264653', name: 'Ocean Deep' }, { hex: '#E9C46A', name: 'Desert Gold' }],
  ],
  calm: [
    [{ hex: '#A8D8EA', name: 'Sky Mist' }, { hex: '#AA96DA', name: 'Lavender Dream' }, { hex: '#FCBAD3', name: 'Blush Pink' }, { hex: '#FFFFD2', name: 'Soft Cream' }, { hex: '#7EC8E3', name: 'Serene Blue' }],
    [{ hex: '#D4E09B', name: 'Sage Whisper' }, { hex: '#F6F4D2', name: 'Parchment' }, { hex: '#CBDFBD', name: 'Mint Calm' }, { hex: '#F19C79', name: 'Peach Glow' }, { hex: '#A44A3F', name: 'Earth Clay' }],
  ],
  tech: [
    [{ hex: '#0D1117', name: 'GitHub Dark' }, { hex: '#161B22', name: 'Obsidian' }, { hex: '#58A6FF', name: 'Link Blue' }, { hex: '#3FB950', name: 'Terminal Green' }, { hex: '#F78166', name: 'Syntax Coral' }],
    [{ hex: '#1E1E2E', name: 'Catppuccin Base' }, { hex: '#89B4FA', name: 'Sapphire' }, { hex: '#A6E3A1', name: 'Green Code' }, { hex: '#F38BA8', name: 'Pink Error' }, { hex: '#FAB387', name: 'Peach Warn' }],
  ],
  playful: [
    [{ hex: '#FF6B6B', name: 'Bubblegum Red' }, { hex: '#4ECDC4', name: 'Turquoise Pop' }, { hex: '#FFE66D', name: 'Sunshine' }, { hex: '#95E1D3', name: 'Mint Fizz' }, { hex: '#F38181', name: 'Coral Candy' }],
    [{ hex: '#A855F7', name: 'Electric Purple' }, { hex: '#06B6D4', name: 'Cyan Splash' }, { hex: '#F59E0B', name: 'Amber Joy' }, { hex: '#10B981', name: 'Emerald Pop' }, { hex: '#F472B6', name: 'Hot Pink' }],
  ],
  minimal: [
    [{ hex: '#FAFAFA', name: 'Paper' }, { hex: '#E5E5E5', name: 'Silver' }, { hex: '#A3A3A3', name: 'Graphite' }, { hex: '#525252', name: 'Charcoal' }, { hex: '#171717', name: 'Ink' }],
    [{ hex: '#F8FAFC', name: 'Snow' }, { hex: '#CBD5E1', name: 'Slate' }, { hex: '#64748B', name: 'Steel' }, { hex: '#334155', name: 'Dark Slate' }, { hex: '#0F172A', name: 'Midnight' }],
  ],
  cosmic: [
    [{ hex: '#030014', name: 'Deep Void' }, { hex: '#A855F7', name: 'Nebula Purple' }, { hex: '#06B6D4', name: 'Stellar Cyan' }, { hex: '#F59E0B', name: 'Solar Gold' }, { hex: '#F472B6', name: 'Aurora Rose' }],
    [{ hex: '#0A0520', name: 'Dark Matter' }, { hex: '#C084FC', name: 'Soft Nebula' }, { hex: '#22D3EE', name: 'Cyan Star' }, { hex: '#FBBF24', name: 'Gold Dust' }, { hex: '#34D399', name: 'Aurora Green' }],
  ],
};

const VIBES = Object.keys(VIBE_SEEDS);

const LOGO_SUGGESTIONS: Record<string, BrandSuggestion[]> = {
  bold: [
    { layout: 'Stacked headline', idea: 'All-caps sans-serif with a thick underline accent in your primary color' },
    { layout: 'Icon + wordmark', idea: 'A geometric lightning bolt paired with heavy grotesque type' },
    { layout: 'Monogram badge', idea: 'Initials inside a bold circle with high contrast colors' },
  ],
  calm: [
    { layout: 'Centered serif', idea: 'Elegant thin serif with generous letter-spacing and a soft color accent' },
    { layout: 'Organic mark', idea: 'A flowing leaf or wave icon in watercolor style next to light sans-serif' },
    { layout: 'Minimal wordmark', idea: 'Lowercase rounded sans with a single pastel dot accent' },
  ],
  tech: [
    { layout: 'Code-style', idea: 'Monospace font with a blinking cursor after the name, terminal green on dark' },
    { layout: 'Geometric icon', idea: 'Abstract hexagonal or circuit-inspired icon plus clean sans-serif' },
    { layout: 'Gradient wordmark', idea: 'Modern sans-serif with a blue→purple gradient applied to key letters' },
  ],
  playful: [
    { layout: 'Bouncy type', idea: 'Rounded display font with letters at slightly different baselines and fun colors' },
    { layout: 'Mascot combo', idea: 'A simple character illustration centered above a friendly sans-serif' },
    { layout: 'Colorful monogram', idea: 'First letter as a large, multi-colored badge with shadow' },
  ],
  minimal: [
    { layout: 'Thin wordmark', idea: 'Ultra-light weight sans-serif in dark, just the name — nothing more' },
    { layout: 'Icon dot', idea: 'A simple geometric shape (circle, square) as the brand mark beside clean text' },
    { layout: 'Line art', idea: 'Single continuous line drawing that subtly forms your initial' },
  ],
  cosmic: [
    { layout: 'Glow wordmark', idea: 'Display font with a subtle purple glow effect and star particle accents' },
    { layout: 'Constellation mark', idea: 'Connected dots forming your initial, like a star constellation' },
    { layout: 'Gradient orb', idea: 'Spherical gradient icon (purple→cyan) with a bold display font beside it' },
  ],
};

// Simple hash to pick a deterministic variant
function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export default function DesignAssistantPanel() {
  const [projectName, setProjectName] = useState('');
  const [vibe, setVibe] = useState('cosmic');
  const [generated, setGenerated] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const palette = useMemo(() => {
    const variants = VIBE_SEEDS[vibe] || VIBE_SEEDS.cosmic;
    const idx = simpleHash(projectName || 'codemuse') % variants.length;
    return variants[idx];
  }, [projectName, vibe]);

  const logos = useMemo(() => {
    return LOGO_SUGGESTIONS[vibe] || LOGO_SUGGESTIONS.cosmic;
  }, [vibe]);

  const handleGenerate = useCallback(() => {
    setGenerated(true);
  }, []);

  const handleReset = useCallback(() => {
    setProjectName('');
    setVibe('cosmic');
    setGenerated(false);
  }, []);

  const copyHex = useCallback((hex: string, idx: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  }, []);

  const cssVars = palette
    .map((c, i) => `  --brand-${i + 1}: ${c.hex};`)
    .join('\n');

  return (
    <div className="cosmic-card-static p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center">
          <Palette className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Design Assistant
          </h3>
          <p className="text-[0.6rem] text-[var(--text-muted)]">Palette & branding suggestions</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-3 mb-5">
        <div>
          <label className="text-[0.65rem] text-[var(--text-dim)] block mb-1">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => { setProjectName(e.target.value); setGenerated(false); }}
            placeholder="My Awesome Project"
            className="w-full px-3 py-2 rounded-xl bg-[var(--void)] border border-white/[0.06] text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/30 transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          />
        </div>
        <div>
          <label className="text-[0.65rem] text-[var(--text-dim)] block mb-1.5">Vibe</label>
          <div className="flex flex-wrap gap-1.5">
            {VIBES.map((v) => (
              <button
                key={v}
                onClick={() => { setVibe(v); setGenerated(false); }}
                className={`px-2.5 py-1 rounded-lg text-[0.65rem] font-medium capitalize transition-all ${
                  vibe === v
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-white/[0.02] text-[var(--text-muted)] border border-white/[0.04] hover:border-purple-500/15 hover:text-white'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs font-semibold
          hover:from-purple-500 hover:to-cyan-500 transition-all shadow-lg shadow-purple-600/15 flex items-center justify-center gap-2 mb-5"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        <Sparkles className="w-3.5 h-3.5" />
        Generate Palette & Ideas
      </button>

      {/* Results */}
      {generated && (
        <div className="space-y-5 animate-fade-up">
          {/* Color palette */}
          <div>
            <h4 className="text-xs font-medium text-white mb-3 flex items-center gap-1.5" style={{ fontFamily: 'var(--font-display)' }}>
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              Color Palette
            </h4>
            <div className="flex gap-2 mb-3">
              {palette.map((color, i) => (
                <button
                  key={i}
                  onClick={() => copyHex(color.hex, i)}
                  className="group flex-1 flex flex-col items-center gap-1.5"
                  title={`Click to copy ${color.hex}`}
                >
                  <div
                    className="w-full aspect-square rounded-xl border border-white/10 transition-transform group-hover:scale-105 relative"
                    style={{ backgroundColor: color.hex }}
                  >
                    {copiedIdx === i && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    )}
                  </div>
                  <span className="text-[0.55rem] text-[var(--text-muted)] group-hover:text-white transition-colors" style={{ fontFamily: 'var(--font-mono)' }}>
                    {color.hex}
                  </span>
                  <span className="text-[0.5rem] text-[var(--text-muted)] leading-tight text-center">{color.name}</span>
                </button>
              ))}
            </div>

            {/* CSS snippet */}
            <div className="bg-[var(--void)] rounded-xl p-3 relative">
              <button
                onClick={() => { navigator.clipboard.writeText(`:root {\n${cssVars}\n}`); }}
                className="absolute top-2 right-2 p-1 rounded-md text-[var(--text-muted)] hover:text-white transition-colors"
              >
                <Copy className="w-3 h-3" />
              </button>
              <pre className="text-[0.65rem] text-[var(--text-dim)] overflow-x-auto" style={{ fontFamily: 'var(--font-mono)' }}>
{`:root {\n${cssVars}\n}`}
              </pre>
            </div>
          </div>

          {/* Logo / layout suggestions */}
          <div>
            <h4 className="text-xs font-medium text-white mb-3 flex items-center gap-1.5" style={{ fontFamily: 'var(--font-display)' }}>
              <Type className="w-3.5 h-3.5 text-cyan-400" />
              Logo & Layout Ideas
            </h4>
            <div className="space-y-2">
              {logos.map((sug, i) => (
                <div key={i} className="bg-[var(--void)] rounded-xl p-3 border border-white/[0.03]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Lightbulb className="w-3 h-3 text-amber-400/70" />
                    <span className="text-[0.7rem] font-medium text-white">{sug.layout}</span>
                  </div>
                  <p className="text-[0.65rem] text-[var(--text-dim)] leading-relaxed">{sug.idea}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="w-full py-2 rounded-xl border border-white/[0.06] text-[var(--text-dim)] text-xs hover:bg-white/[0.02] hover:text-white hover:border-purple-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
