import type { SketchConfig } from '../types';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
}

const particles: Particle[] = [];
let initialized = false;

export const particleSystemSketch: SketchConfig = {
  id: 'particle-nebula',
  name: 'Cosmic Nebula',
  description: 'A swirling particle nebula with gravitational forces creating cosmic formations. Particles orbit, collide, and decay.',
  category: 'particle',
  icon: '✨',
  params: [
    { id: 'spawnRate', label: 'Spawn Rate', min: 1, max: 10, step: 1, default: 5 },
    { id: 'gravity', label: 'Gravity', min: 0, max: 0.5, step: 0.01, default: 0.1 },
    { id: 'maxSize', label: 'Max Size', min: 1, max: 8, step: 0.5, default: 4 },
    { id: 'colorShift', label: 'Color Speed', min: 0.1, max: 3, step: 0.1, default: 1 },
  ],
  render: (ctx, width, height, params, time) => {
    ctx.fillStyle = 'rgba(15, 15, 26, 0.05)';
    ctx.fillRect(0, 0, width, height);

    if (!initialized || particles.length === 0) {
      particles.length = 0;
      initialized = true;
    }

    // Spawn new particles
    const cx = width / 2;
    const cy = height / 2;

    for (let i = 0; i < params.spawnRate; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 50 + 20;
      particles.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: Math.cos(angle + Math.PI / 2) * (Math.random() * 2 + 1),
        vy: Math.sin(angle + Math.PI / 2) * (Math.random() * 2 + 1),
        life: 0,
        maxLife: Math.random() * 200 + 100,
        hue: (time * params.colorShift + Math.random() * 60) % 360,
        size: Math.random() * params.maxSize + 1,
      });
    }

    // Cap particles
    while (particles.length > 800) {
      particles.shift();
    }

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      
      // Gravity toward center
      const dx = cx - p.x;
      const dy = cy - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 1;
      p.vx += (dx / dist) * params.gravity * 0.5;
      p.vy += (dy / dist) * params.gravity * 0.5;

      // Orbital force
      p.vx += (-dy / dist) * 0.02;
      p.vy += (dx / dist) * 0.02;

      // Damping
      p.vx *= 0.998;
      p.vy *= 0.998;

      p.x += p.vx;
      p.y += p.vy;
      p.life++;

      // Fade based on life
      const lifeRatio = 1 - p.life / p.maxLife;
      const alpha = lifeRatio * 0.8;

      if (p.life >= p.maxLife) {
        particles.splice(i, 1);
        continue;
      }

      // Draw particle with glow
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      gradient.addColorStop(0, `hsla(${p.hue}, 90%, 70%, ${alpha})`);
      gradient.addColorStop(0.5, `hsla(${p.hue}, 80%, 50%, ${alpha * 0.3})`);
      gradient.addColorStop(1, `hsla(${p.hue}, 70%, 30%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = `hsla(${p.hue}, 90%, 85%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  },
  code: `// Cosmic Nebula - Particle System
// Particles orbit & decay with gravitational forces

function spawnParticle(cx, cy) {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: cx + Math.cos(angle) * 30,
    y: cy + Math.sin(angle) * 30,
    vx: Math.cos(angle + PI/2) * random(1, 3),
    vy: Math.sin(angle + PI/2) * random(1, 3),
    life: 0, maxLife: random(100, 300),
    hue: time * colorShift + random(60),
  };
}

// Gravitational pull + orbital force
const dx = center.x - p.x;
const dy = center.y - p.y;
const dist = Math.sqrt(dx*dx + dy*dy);
p.vx += (dx/dist) * gravity;
p.vy += (dy/dist) * gravity;
p.vx += (-dy/dist) * 0.02; // orbital
p.vy += (dx/dist) * 0.02;`
};
