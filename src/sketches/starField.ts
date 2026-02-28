import type { SketchConfig } from '../types';

export const starFieldSketch: SketchConfig = {
  id: 'star-field',
  name: 'Hyperspace Stars',
  description: 'A warp-speed star field that creates a hypnotic tunnel effect. Stars streak past at light speed with depth and parallax.',
  category: 'interactive',
  icon: '🚀',
  params: [
    { id: 'starCount', label: 'Stars', min: 100, max: 800, step: 50, default: 400 },
    { id: 'warpSpeed', label: 'Warp Speed', min: 1, max: 20, step: 1, default: 8 },
    { id: 'trailLength', label: 'Trail Length', min: 1, max: 30, step: 1, default: 15 },
    { id: 'colorMode', label: 'Color Temp', min: 0, max: 1, step: 0.01, default: 0.5 },
  ],
  render: (ctx, width, height, params, time) => {
    ctx.fillStyle = 'rgba(15, 15, 26, 0.15)';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const count = params.starCount;
    const speed = params.warpSpeed;
    const trail = params.trailLength;
    const colorTemp = params.colorMode;

    for (let i = 0; i < count; i++) {
      // Deterministic but animated star positions
      const seed = i * 997.131;
      const angle = (seed % (Math.PI * 2000)) / 1000;
      const baseDist = (seed * 3.71 + time * speed * 0.5) % (Math.max(width, height) * 0.7);
      
      const x = cx + Math.cos(angle) * baseDist;
      const y = cy + Math.sin(angle) * baseDist;
      
      // Trail toward center
      const trailX = cx + Math.cos(angle) * (baseDist - trail * (baseDist / 300));
      const trailY = cy + Math.sin(angle) * (baseDist - trail * (baseDist / 300));

      // Size increases with distance (perspective)
      const size = (baseDist / (Math.max(width, height) * 0.7)) * 3 + 0.5;
      const alpha = Math.min(1, baseDist / 100);

      // Color based on temperature setting
      let hue: number;
      if (colorTemp < 0.33) {
        hue = 200 + Math.random() * 40; // Cool blues
      } else if (colorTemp < 0.66) {
        hue = (i * 137.508) % 360; // Rainbow
      } else {
        hue = 30 + Math.random() * 30; // Warm yellows/oranges
      }

      // Draw trail
      const gradient = ctx.createLinearGradient(trailX, trailY, x, y);
      gradient.addColorStop(0, `hsla(${hue}, 70%, 80%, 0)`);
      gradient.addColorStop(1, `hsla(${hue}, 70%, 80%, ${alpha * 0.8})`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = size * 0.8;
      ctx.beginPath();
      ctx.moveTo(trailX, trailY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Star head
      ctx.fillStyle = `hsla(${hue}, 60%, 95%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Center glow
    const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
    centerGlow.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
    centerGlow.addColorStop(1, 'rgba(99, 102, 241, 0)');
    ctx.fillStyle = centerGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, 60, 0, Math.PI * 2);
    ctx.fill();
  },
  code: `// Hyperspace Stars - Warp Speed Effect
// Parallax star field with speed trails

for (let i = 0; i < starCount; i++) {
  const angle = hash(i) * TAU;
  const dist = (hash(i) * maxDist + time * warpSpeed) % maxDist;
  
  const x = cx + cos(angle) * dist;
  const y = cy + sin(angle) * dist;
  const trailX = cx + cos(angle) * (dist - trailLen);
  const trailY = cy + sin(angle) * (dist - trailLen);
  
  // Perspective: farther = bigger
  const size = (dist / maxDist) * 3 + 0.5;
  
  // Gradient trail from transparent to bright
  const grad = ctx.createLinearGradient(
    trailX, trailY, x, y);
  grad.addColorStop(0, 'transparent');
  grad.addColorStop(1, \`hsla(\${hue}, 70%, 80%, 0.8)\`);
  
  ctx.strokeStyle = grad;
  ctx.beginPath();
  ctx.moveTo(trailX, trailY);
  ctx.lineTo(x, y);
  ctx.stroke();
}`
};
