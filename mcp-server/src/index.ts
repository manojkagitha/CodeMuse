#!/usr/bin/env node

/**
 * CodeMuse MCP Server
 * 
 * A Model Context Protocol server that adds creative coding tools
 * to GitHub Copilot in VS Code. Part of the CodeMuse project,
 * built for the Microsoft Agents League 2026 - Creative Apps Track.
 * 
 * Tools:
 * - generate_art: Generate generative art code templates
 * - create_color_palette: Create harmonious color palettes
 * - creative_challenge: Get creative coding challenges with starter code
 * - code_to_animation: Generate animation code from descriptions
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { artTemplates, colorPalettes, creativeChallenges } from './templates/index.js';

const server = new Server(
  {
    name: 'codemuse-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ── List available tools ──────────────────────────────────────────────────────
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'generate_art',
        description:
          'Generate complete, runnable HTML5 Canvas generative art code for a given style. Returns ready-to-use JavaScript code that creates mesmerizing visual patterns. Styles: flow-field, particles, fractal, waves, spirograph, mandala, starfield.',
        inputSchema: {
          type: 'object' as const,
          properties: {
            style: {
              type: 'string',
              enum: ['flow-field', 'particles', 'fractal', 'waves', 'spirograph', 'mandala', 'starfield'],
              description: 'The generative art style to generate code for',
            },
          },
          required: ['style'],
        },
      },
      {
        name: 'create_color_palette',
        description:
          'Generate a harmonious color palette for creative coding projects. Returns hex colors with descriptions. Moods: warm, cool, neon, pastel, monochrome, cyberpunk.',
        inputSchema: {
          type: 'object' as const,
          properties: {
            mood: {
              type: 'string',
              enum: ['warm', 'cool', 'neon', 'pastel', 'monochrome', 'cyberpunk'],
              description: 'The mood/theme of the color palette',
            },
          },
          required: ['mood'],
        },
      },
      {
        name: 'creative_challenge',
        description:
          'Get a random creative coding challenge with description, hints, and starter code. Great for practice and inspiration!',
        inputSchema: {
          type: 'object' as const,
          properties: {
            difficulty: {
              type: 'string',
              enum: ['beginner', 'intermediate', 'advanced'],
              description: 'Difficulty level of the challenge',
            },
          },
          required: ['difficulty'],
        },
      },
      {
        name: 'code_to_animation',
        description:
          'Generate animation code from a natural language description. Supports CSS animations, Canvas animations, and SVG animations.',
        inputSchema: {
          type: 'object' as const,
          properties: {
            description: {
              type: 'string',
              description: 'Natural language description of the desired animation',
            },
            type: {
              type: 'string',
              enum: ['css', 'canvas', 'svg'],
              description: 'Type of animation output',
            },
          },
          required: ['description', 'type'],
        },
      },
    ],
  };
});

// ── Handle tool calls ─────────────────────────────────────────────────────────
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'generate_art': {
      const style = (args as { style: string }).style;
      const template = artTemplates[style];

      if (!template) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Unknown art style: "${style}". Available styles: ${Object.keys(artTemplates).join(', ')}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: `# 🎨 ${template.name}\n\n${template.description}\n\n\`\`\`${template.language}\n${template.code}\n\`\`\`\n\n**Tips:**\n- Copy this code into an HTML file with a \`<canvas>\` element\n- Adjust the constants at the top to customize\n- Try combining multiple art styles together!`,
          },
        ],
      };
    }

    case 'create_color_palette': {
      const mood = (args as { mood: string }).mood;
      const palette = colorPalettes[mood];

      if (!palette) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Unknown mood: "${mood}". Available moods: ${Object.keys(colorPalettes).join(', ')}`,
            },
          ],
        };
      }

      const colorList = palette.colors
        .map((c, i) => `  ${i + 1}. \`${c}\` — ${'█'.repeat(6)}`)
        .join('\n');

      return {
        content: [
          {
            type: 'text' as const,
            text: `# 🎨 ${palette.name}\n\n${palette.description}\n\n## Colors\n${colorList}\n\n## Usage in CSS\n\`\`\`css\n:root {\n${palette.colors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}\n\`\`\`\n\n## Usage in JavaScript\n\`\`\`javascript\nconst palette = ${JSON.stringify(palette.colors, null, 2)};\nconst randomColor = palette[Math.floor(Math.random() * palette.length)];\n\`\`\``,
          },
        ],
      };
    }

    case 'creative_challenge': {
      const difficulty = (args as { difficulty: string }).difficulty as keyof typeof creativeChallenges;
      const challenges = creativeChallenges[difficulty];

      if (!challenges) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Unknown difficulty: "${difficulty}". Choose: beginner, intermediate, advanced`,
            },
          ],
        };
      }

      const challenge = challenges[Math.floor(Math.random() * challenges.length)];

      return {
        content: [
          {
            type: 'text' as const,
            text: `# 🎯 Creative Challenge: ${challenge.title}\n\n**Difficulty:** ${difficulty}\n\n## Description\n${challenge.description}\n\n## Hint\n💡 ${challenge.hint}\n\n## Starter Code\n\`\`\`javascript\n${challenge.starter}\n\`\`\`\n\nGood luck! Have fun and be creative! 🚀`,
          },
        ],
      };
    }

    case 'code_to_animation': {
      const { description, type } = args as { description: string; type: string };

      const animations: Record<string, string> = {
        css: `/* Animation: ${description} */
@keyframes custom-animation {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  50% {
    opacity: 1;
    transform: translateY(-5px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animated-element {
  animation: custom-animation 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Hover state */
.animated-element:hover {
  animation: custom-animation 0.3s ease reverse;
}`,
        canvas: `// Canvas Animation: ${description}
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let time = 0;
const elements = Array.from({ length: 20 }, (_, i) => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 20 + 5,
  speed: Math.random() * 2 + 0.5,
  hue: (i / 20) * 360,
}));

function animate() {
  ctx.fillStyle = 'rgba(15, 15, 26, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  elements.forEach(el => {
    el.y += el.speed;
    el.x += Math.sin(time * 0.02 + el.hue) * 0.5;
    if (el.y > canvas.height + el.radius) el.y = -el.radius;

    const glow = ctx.createRadialGradient(el.x, el.y, 0, el.x, el.y, el.radius * 2);
    glow.addColorStop(0, \`hsla(\${el.hue + time * 0.5}, 80%, 60%, 0.8)\`);
    glow.addColorStop(1, \`hsla(\${el.hue + time * 0.5}, 80%, 60%, 0)\`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(el.x, el.y, el.radius * 2, 0, Math.PI * 2);
    ctx.fill();
  });

  time++;
  requestAnimationFrame(animate);
}

animate();`,
        svg: `<!-- SVG Animation: ${description} -->
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
    </radialGradient>
  </defs>
  
  <circle cx="200" cy="200" r="50" fill="url(#glow)">
    <animate attributeName="r" values="30;60;30" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
  </circle>

  <circle cx="200" cy="200" r="30" fill="#6366f1" opacity="0.9">
    <animate attributeName="r" values="20;35;20" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>`,
      };

      const code = animations[type] || animations['css'];

      return {
        content: [
          {
            type: 'text' as const,
            text: `# ✨ Generated Animation\n\n**Description:** ${description}\n**Type:** ${type.toUpperCase()}\n\n\`\`\`${type === 'svg' ? 'html' : type === 'css' ? 'css' : 'javascript'}\n${code}\n\`\`\`\n\n**Tips:**\n- Customize the timing, colors, and easing functions\n- Combine multiple animations for complex effects\n- Use CSS custom properties for easy theming`,
          },
        ],
      };
    }

    default:
      return {
        content: [
          {
            type: 'text' as const,
            text: `Unknown tool: ${name}`,
          },
        ],
      };
  }
});

// ── Start the server ──────────────────────────────────────────────────────────
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('CodeMuse MCP Server running on stdio');
}

main().catch(console.error);
