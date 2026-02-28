import type { SketchConfig } from '../types';

export const flowFieldSketch: SketchConfig = {
  id: 'flow-field',
  name: 'Flow Field',
  description: 'Mesmerizing particle flow following Perlin-like noise vectors. Watch particles dance through invisible force fields.',
  category: 'generative',
  icon: '🌊',
  params: [
    { id: 'particleCount', label: 'Particles', min: 50, max: 500, step: 10, default: 200 },
    { id: 'speed', label: 'Speed', min: 0.5, max: 5, step: 0.1, default: 2 },
    { id: 'noiseScale', label: 'Noise Scale', min: 0.001, max: 0.02, step: 0.001, default: 0.005 },
    { id: 'trailLength', label: 'Trail Opacity', min: 0.01, max: 0.15, step: 0.01, default: 0.03 },
  ],
  render: (ctx, width, height, params, time) => {
    // Fade previous frame
    ctx.fillStyle = `rgba(15, 15, 26, ${params.trailLength})`;
    ctx.fillRect(0, 0, width, height);

    const count = params.particleCount;
    const speed = params.speed;
    const scale = params.noiseScale;

    // Simple noise approximation
    const noise = (x: number, y: number, t: number) => {
      return Math.sin(x * scale * 100 + t) * Math.cos(y * scale * 80 + t * 0.7) +
             Math.sin((x + y) * scale * 60 + t * 1.3) * 0.5;
    };

    for (let i = 0; i < count; i++) {
      const seed = i * 137.508;
      const px = ((seed * 7.31 + time * 0.1 * speed) % width + width) % width;
      const py = ((seed * 13.97 + time * 0.08 * speed) % height + height) % height;

      const angle = noise(px, py, time * 0.001) * Math.PI * 2;
      const dx = Math.cos(angle) * speed * 2;
      const dy = Math.sin(angle) * speed * 2;

      const hue = (i / count * 360 + time * 0.5) % 360;
      ctx.strokeStyle = `hsla(${hue}, 80%, 65%, 0.6)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + dx * 4, py + dy * 4);
      ctx.stroke();
    }
  },
  code: `// Flow Field - Generative Art
// Particles follow noise-based vector fields
const noise = (x, y, t) => {
  return Math.sin(x * 0.005 * 100 + t) * 
         Math.cos(y * 0.005 * 80 + t * 0.7) +
         Math.sin((x + y) * 0.005 * 60 + t * 1.3) * 0.5;
};

for (let i = 0; i < 200; i++) {
  const px = randomX(i);
  const py = randomY(i);
  const angle = noise(px, py, time) * Math.PI * 2;
  
  ctx.strokeStyle = \`hsla(\${hue}, 80%, 65%, 0.6)\`;
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(px + Math.cos(angle) * 8, py + Math.sin(angle) * 8);
  ctx.stroke();
}`
};
