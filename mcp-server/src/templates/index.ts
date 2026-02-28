/**
 * CodeMuse MCP Server - Creative Coding Templates
 * 
 * Provides generative art code templates that GitHub Copilot
 * can use to help developers create creative coding projects.
 */

export interface ArtTemplate {
  name: string;
  description: string;
  code: string;
  language: string;
}

export const artTemplates: Record<string, ArtTemplate> = {
  'flow-field': {
    name: 'Flow Field',
    description: 'Particle flow following noise-based vector fields',
    language: 'javascript',
    code: `// Flow Field - Generative Art
// Particles flow along noise-based vector fields creating organic patterns.

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Simple noise function (replace with a proper Perlin noise library for production)
function noise(x, y, t) {
  return Math.sin(x * 0.005 * 100 + t) * Math.cos(y * 0.005 * 80 + t * 0.7) +
         Math.sin((x + y) * 0.005 * 60 + t * 1.3) * 0.5;
}

const PARTICLE_COUNT = 200;
const SPEED = 2;
let time = 0;

function animate() {
  // Fade effect for trails
  ctx.fillStyle = 'rgba(15, 15, 26, 0.03)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const seed = i * 137.508;
    const px = ((seed * 7.31 + time * 0.1 * SPEED) % canvas.width + canvas.width) % canvas.width;
    const py = ((seed * 13.97 + time * 0.08 * SPEED) % canvas.height + canvas.height) % canvas.height;

    const angle = noise(px, py, time * 0.001) * Math.PI * 2;
    const dx = Math.cos(angle) * SPEED * 2;
    const dy = Math.sin(angle) * SPEED * 2;

    const hue = (i / PARTICLE_COUNT * 360 + time * 0.5) % 360;
    ctx.strokeStyle = \`hsla(\${hue}, 80%, 65%, 0.6)\`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px + dx * 4, py + dy * 4);
    ctx.stroke();
  }

  time++;
  requestAnimationFrame(animate);
}

animate();`,
  },

  'particles': {
    name: 'Cosmic Nebula',
    description: 'Particle system with gravitational forces and orbital dynamics',
    language: 'javascript',
    code: `// Cosmic Nebula - Particle System
// Particles orbit a center point with gravity, creating nebula-like formations.

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const particles = [];
const cx = canvas.width / 2;
const cy = canvas.height / 2;
const GRAVITY = 0.1;
const MAX_PARTICLES = 500;

function spawnParticle() {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: cx + Math.cos(angle) * 30,
    y: cy + Math.sin(angle) * 30,
    vx: Math.cos(angle + Math.PI / 2) * (Math.random() * 2 + 1),
    vy: Math.sin(angle + Math.PI / 2) * (Math.random() * 2 + 1),
    life: 0,
    maxLife: Math.random() * 200 + 100,
    hue: Math.random() * 60 + 200,
    size: Math.random() * 3 + 1,
  };
}

function animate() {
  ctx.fillStyle = 'rgba(15, 15, 26, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Spawn particles
  for (let i = 0; i < 3; i++) {
    if (particles.length < MAX_PARTICLES) particles.push(spawnParticle());
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    const dx = cx - p.x;
    const dy = cy - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy) + 1;

    // Gravity + orbital force
    p.vx += (dx / dist) * GRAVITY * 0.5 + (-dy / dist) * 0.02;
    p.vy += (dy / dist) * GRAVITY * 0.5 + (dx / dist) * 0.02;
    p.vx *= 0.998;
    p.vy *= 0.998;
    p.x += p.vx;
    p.y += p.vy;
    p.life++;

    if (p.life >= p.maxLife) { particles.splice(i, 1); continue; }

    const alpha = (1 - p.life / p.maxLife) * 0.8;
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
    grad.addColorStop(0, \`hsla(\${p.hue}, 90%, 70%, \${alpha})\`);
    grad.addColorStop(1, \`hsla(\${p.hue}, 70%, 30%, 0)\`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();`,
  },

  'fractal': {
    name: 'Fractal Tree',
    description: 'Recursive fractal tree with wind animation',
    language: 'javascript',
    code: `// Living Fractal Tree - Recursive Art
// A growing tree that sways in the wind using recursive branching.

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const MAX_DEPTH = 9;
const BRANCH_ANGLE = 25 * Math.PI / 180;
const BRANCH_RATIO = 0.67;
let time = 0;

function drawBranch(x, y, length, angle, depth) {
  if (depth <= 0 || length < 2) return;

  const wind = Math.sin(time * 0.002) * 0.1 * (MAX_DEPTH - depth) * 0.3;
  const finalAngle = angle + wind;
  const endX = x + Math.cos(finalAngle) * length;
  const endY = y + Math.sin(finalAngle) * length;

  const depthRatio = depth / MAX_DEPTH;
  const hue = depthRatio > 0.5 ? 30 : 120 + Math.sin(time * 0.001) * 30;
  
  ctx.strokeStyle = \`hsl(\${hue}, 60%, \${20 + depthRatio * 30}%)\`;
  ctx.lineWidth = Math.max(1, depth * 1.2);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  if (depth <= 2) {
    ctx.fillStyle = \`hsla(\${120 + Math.sin(time * 0.001 + x * 0.01) * 80}, 70%, 55%, 0.7)\`;
    ctx.beginPath();
    ctx.arc(endX, endY, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  drawBranch(endX, endY, length * BRANCH_RATIO, finalAngle - BRANCH_ANGLE, depth - 1);
  drawBranch(endX, endY, length * BRANCH_RATIO, finalAngle + BRANCH_ANGLE, depth - 1);
}

function animate() {
  ctx.fillStyle = 'rgba(15, 15, 26, 1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawBranch(canvas.width / 2, canvas.height - 30, canvas.height * 0.25, -Math.PI / 2, MAX_DEPTH);
  time++;
  requestAnimationFrame(animate);
}

animate();`,
  },

  'waves': {
    name: 'Wave Interference',
    description: 'Overlapping sine waves creating moiré patterns',
    language: 'javascript',
    code: `// Wave Interference - Mathematical Art
// Multiple sine wave layers creating beautiful interference patterns.

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const WAVE_COUNT = 5;
const FREQUENCY = 2;
const AMPLITUDE = 60;
let time = 0;

function animate() {
  ctx.fillStyle = 'rgba(15, 15, 26, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let layer = 0; layer < WAVE_COUNT; layer++) {
    const offset = (layer / WAVE_COUNT) * Math.PI * 2;
    const hue = (layer / WAVE_COUNT * 360 + time * 0.3) % 360;
    const yCenter = canvas.height / 2;

    ctx.strokeStyle = \`hsla(\${hue}, 80%, 60%, 0.4)\`;
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let x = 0; x < canvas.width; x += 2) {
      const nx = x / canvas.width;
      const y = yCenter +
        Math.sin(nx * FREQUENCY * Math.PI * 2 + time * 0.003 + offset) * AMPLITUDE +
        Math.sin(nx * FREQUENCY * 1.5 * Math.PI * 2 + time * 0.002) * AMPLITUDE * 0.5;
      
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  time++;
  requestAnimationFrame(animate);
}

animate();`,
  },

  'spirograph': {
    name: 'Spirograph',
    description: 'Mathematical spirograph using epicycloid curves',
    language: 'javascript',
    code: `// Spirograph Engine - Epicycloid Curves
// Creates classic spirograph patterns from parametric equations.

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const R = 120; // Outer radius
const r = 65;  // Inner radius  
const d = 40;  // Pen offset
let time = 0;

function animate() {
  ctx.fillStyle = 'rgba(15, 15, 26, 0.02)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const t = time * 0.002;

  for (let i = 0; i < 2000; i++) {
    const theta = (t + i * 0.003) * 2;
    const nextTheta = (t + (i + 1) * 0.003) * 2;

    const x1 = cx + (R - r) * Math.cos(theta) + d * Math.cos(((R - r) / r) * theta);
    const y1 = cy + (R - r) * Math.sin(theta) - d * Math.sin(((R - r) / r) * theta);
    const x2 = cx + (R - r) * Math.cos(nextTheta) + d * Math.cos(((R - r) / r) * nextTheta);
    const y2 = cy + (R - r) * Math.sin(nextTheta) - d * Math.sin(((R - r) / r) * nextTheta);

    const hue = (i / 2000 * 360 + time * 0.2) % 360;
    ctx.strokeStyle = \`hsla(\${hue}, 85%, 65%, 0.6)\`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  time++;
  requestAnimationFrame(animate);
}

animate();`,
  },

  'mandala': {
    name: 'Digital Mandala',
    description: 'Sacred geometry mandala with breathing animation',
    language: 'javascript',
    code: `// Digital Mandala - Sacred Geometry
// Symmetrical mandala that breathes and evolves over time.

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const SYMMETRY = 8;
const LAYERS = 5;
let time = 0;

function animate() {
  ctx.fillStyle = 'rgba(15, 15, 26, 1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;
  const breath = Math.sin(time * 0.001) * 0.2 + 1;

  ctx.save();
  ctx.translate(cx, cy);

  for (let layer = LAYERS; layer >= 1; layer--) {
    const radius = (layer / LAYERS) * maxRadius * breath;
    const hue = (layer / LAYERS * 200 + time * 0.3) % 360;

    for (let s = 0; s < SYMMETRY; s++) {
      ctx.save();
      ctx.rotate((s / SYMMETRY) * Math.PI * 2 + time * 0.0003);

      for (let c = 0; c < 6; c++) {
        const angle = (c / 6) * Math.PI * 0.8 - Math.PI * 0.4;
        const dist = radius * 0.6 + c * 5;
        const px = Math.cos(angle) * dist;
        const py = Math.sin(angle) * dist;

        ctx.strokeStyle = \`hsla(\${(hue + c * 15) % 360}, 75%, 60%, 0.5)\`;
        ctx.beginPath();
        ctx.arc(px, py, 8 - c, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }
  }
  ctx.restore();

  time++;
  requestAnimationFrame(animate);
}

animate();`,
  },

  'starfield': {
    name: 'Hyperspace Stars',
    description: 'Warp-speed star field with depth and parallax',
    language: 'javascript',
    code: `// Hyperspace Stars - Warp Speed Effect
// Stars streak past at light speed with parallax depth.

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const STAR_COUNT = 400;
const WARP_SPEED = 8;
let time = 0;

function animate() {
  ctx.fillStyle = 'rgba(15, 15, 26, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const maxDist = Math.max(canvas.width, canvas.height) * 0.7;

  for (let i = 0; i < STAR_COUNT; i++) {
    const seed = i * 997.131;
    const angle = (seed % (Math.PI * 2000)) / 1000;
    const dist = (seed * 3.71 + time * WARP_SPEED * 0.5) % maxDist;
    
    const x = cx + Math.cos(angle) * dist;
    const y = cy + Math.sin(angle) * dist;
    const trailLen = 15 * dist / 300;
    const trailX = cx + Math.cos(angle) * (dist - trailLen);
    const trailY = cy + Math.sin(angle) * (dist - trailLen);

    const size = (dist / maxDist) * 3 + 0.5;
    const alpha = Math.min(1, dist / 100);
    const hue = (i * 137.508) % 360;

    const grad = ctx.createLinearGradient(trailX, trailY, x, y);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(1, \`hsla(\${hue}, 70%, 80%, \${alpha * 0.8})\`);
    
    ctx.strokeStyle = grad;
    ctx.lineWidth = size * 0.8;
    ctx.beginPath();
    ctx.moveTo(trailX, trailY);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.fillStyle = \`hsla(\${hue}, 60%, 95%, \${alpha})\`;
    ctx.beginPath();
    ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  time++;
  requestAnimationFrame(animate);
}

animate();`,
  },
};

export const colorPalettes: Record<string, { name: string; colors: string[]; description: string }> = {
  warm: {
    name: 'Warm Sunset',
    colors: ['#FF6B6B', '#FFA07A', '#FFD93D', '#FF8C42', '#C0392B', '#E74C3C'],
    description: 'A warm palette inspired by golden hour sunsets',
  },
  cool: {
    name: 'Arctic Ice',
    colors: ['#74B9FF', '#A29BFE', '#00CEC9', '#6C5CE7', '#0984E3', '#81ECEC'],
    description: 'Cool blues and purples evoking frozen landscapes',
  },
  neon: {
    name: 'Neon Nights',
    colors: ['#FF006E', '#8338EC', '#3A86FF', '#FFBE0B', '#FB5607', '#00F5D4'],
    description: 'Vibrant neon colors for bold, eye-catching designs',
  },
  pastel: {
    name: 'Soft Dreams',
    colors: ['#FFB5E8', '#B5DEFF', '#E7FFAC', '#FFC9DE', '#C4FAF8', '#F3E8FF'],
    description: 'Soft, dreamy pastels for gentle aesthetics',
  },
  monochrome: {
    name: 'Shadow & Light',
    colors: ['#1A1A2E', '#2D2D44', '#4A4A6A', '#7B7B9E', '#A8A8C8', '#E8E8F0'],
    description: 'Sophisticated monochrome gradient from dark to light',
  },
  cyberpunk: {
    name: 'Cyber City',
    colors: ['#0D0221', '#0F084B', '#26081C', '#FF2A6D', '#05D9E8', '#D1F7FF'],
    description: 'Cyberpunk-inspired palette with neon accents on dark backgrounds',
  },
};

export const creativeChallenges = {
  beginner: [
    {
      title: 'Rainbow Rain',
      description: 'Create a rain effect where each raindrop is a different color of the rainbow. Drops should fall at random speeds and positions.',
      hint: 'Use an array of particle objects with x, y, speed, and hue properties. Update positions each frame.',
      starter: `const drops = [];
for (let i = 0; i < 100; i++) {
  drops.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: Math.random() * 3 + 1,
    hue: (i / 100) * 360,
    length: Math.random() * 20 + 5,
  });
}`,
    },
    {
      title: 'Breathing Circle',
      description: 'Create a circle that smoothly grows and shrinks like breathing. Add a color gradient that shifts with the breath.',
      hint: 'Use Math.sin(time) to create smooth oscillation. Multiply by your desired radius range.',
      starter: `let time = 0;
function animate() {
  ctx.clearRect(0, 0, width, height);
  const radius = 50 + Math.sin(time * 0.02) * 30;
  const hue = (time * 0.5) % 360;
  // Draw your breathing circle here
  time++;
  requestAnimationFrame(animate);
}`,
    },
  ],
  intermediate: [
    {
      title: 'Audio Visualizer (Mock)',
      description: 'Create a circular audio visualizer with bars radiating from the center. Use sine waves to simulate audio frequency data.',
      hint: 'Generate mock frequency data with Math.sin at different frequencies. Map each frequency to a bar length.',
      starter: `const BARS = 64;
function getFrequencyData() {
  return Array.from({ length: BARS }, (_, i) => 
    Math.abs(Math.sin(time * 0.02 + i * 0.3) * 
    Math.cos(time * 0.01 + i * 0.1)) * 100
  );
}`,
    },
    {
      title: 'Conway\'s Game of Life',
      description: 'Implement Conway\'s Game of Life with colorful cells. Dead cells should fade out gradually rather than disappearing instantly.',
      hint: 'Use a 2D grid. Each cell has a state (alive/dead) and an age. Apply the standard rules each generation.',
      starter: `const GRID_SIZE = 50;
const grid = [];
for (let y = 0; y < GRID_SIZE; y++) {
  grid[y] = [];
  for (let x = 0; x < GRID_SIZE; x++) {
    grid[y][x] = { alive: Math.random() > 0.7, age: 0 };
  }
}`,
    },
  ],
  advanced: [
    {
      title: 'N-body Gravity Simulation',
      description: 'Create an N-body gravitational simulation with 50+ particles. Include collision detection and merging. Use Euler integration.',
      hint: 'For each pair of particles, calculate gravitational force proportional to masses and inverse square of distance.',
      starter: `const G = 0.5;
const bodies = Array.from({ length: 50 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 2,
  vy: (Math.random() - 0.5) * 2,
  mass: Math.random() * 5 + 1,
}));`,
    },
    {
      title: 'Reaction-Diffusion Pattern',
      description: 'Implement a Gray-Scott reaction-diffusion system to generate organic coral-like patterns that evolve over time.',
      hint: 'Use two chemical concentrations (U, V) on a grid. Apply diffusion (Laplacian) and reaction equations each step.',
      starter: `const W = 200, H = 200;
const dU = 1.0, dV = 0.5, f = 0.055, k = 0.062;
const u = Array.from({ length: W * H }, () => 1);
const v = Array.from({ length: W * H }, () => 0);
// Seed a small area
for (let i = 90; i < 110; i++)
  for (let j = 90; j < 110; j++)
    v[j * W + i] = 1;`,
    },
  ],
};
