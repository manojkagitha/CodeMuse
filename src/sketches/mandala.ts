import type { SketchConfig } from '../types';

export const mandalaSketch: SketchConfig = {
  id: 'mandala',
  name: 'Digital Mandala',
  description: 'Sacred geometry mandala patterns that evolve and breathe. Symmetrical, meditative, and infinitely complex.',
  category: 'generative',
  icon: '🔮',
  params: [
    { id: 'symmetry', label: 'Symmetry', min: 4, max: 16, step: 1, default: 8 },
    { id: 'layers', label: 'Layers', min: 2, max: 8, step: 1, default: 5 },
    { id: 'complexity', label: 'Complexity', min: 3, max: 12, step: 1, default: 6 },
    { id: 'breathSpeed', label: 'Breath Speed', min: 0.2, max: 3, step: 0.1, default: 1 },
  ],
  render: (ctx, width, height, params, time) => {
    ctx.fillStyle = 'rgba(15, 15, 26, 1)';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const sym = Math.floor(params.symmetry);
    const layerCount = Math.floor(params.layers);
    const complexity = Math.floor(params.complexity);
    const breath = Math.sin(time * 0.001 * params.breathSpeed) * 0.2 + 1;
    const maxRadius = Math.min(width, height) * 0.4;

    ctx.save();
    ctx.translate(cx, cy);

    for (let layer = layerCount; layer >= 1; layer--) {
      const layerRadius = (layer / layerCount) * maxRadius * breath;
      const layerHue = (layer / layerCount * 200 + time * 0.3) % 360;

      for (let s = 0; s < sym; s++) {
        ctx.save();
        ctx.rotate((s / sym) * Math.PI * 2 + time * 0.0003 * (layer % 2 === 0 ? 1 : -1));

        // Petal shape
        const petalSize = layerRadius * 0.3 / layerCount * (layerCount - layer + 2);
        
        for (let c = 0; c < complexity; c++) {
          const cAngle = (c / complexity) * Math.PI * 0.8 - Math.PI * 0.4;
          const cDist = layerRadius * 0.6 + c * 5;
          const cSize = petalSize * (1 - c / complexity * 0.5);
          const breathOffset = Math.sin(time * 0.002 * params.breathSpeed + layer + c) * 5;

          const px = Math.cos(cAngle) * (cDist + breathOffset);
          const py = Math.sin(cAngle) * (cDist + breathOffset);

          const hue = (layerHue + c * 15) % 360;
          const alpha = 0.3 + (1 - c / complexity) * 0.4;

          ctx.strokeStyle = `hsla(${hue}, 75%, 60%, ${alpha})`;
          ctx.lineWidth = 1.5;

          // Draw ornate shapes
          ctx.beginPath();
          for (let a = 0; a <= Math.PI * 2; a += 0.1) {
            const r = cSize * (1 + Math.sin(a * 3 + time * 0.002) * 0.3);
            const dx = px + Math.cos(a) * r;
            const dy = py + Math.sin(a) * r;
            a === 0 ? ctx.moveTo(dx, dy) : ctx.lineTo(dx, dy);
          }
          ctx.closePath();
          ctx.stroke();

          // Inner dot
          ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${alpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Connecting lines
        ctx.strokeStyle = `hsla(${layerHue}, 60%, 50%, 0.15)`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(0) * layerRadius, Math.sin(0) * layerRadius);
        ctx.stroke();

        ctx.restore();
      }

      // Layer ring
      ctx.strokeStyle = `hsla(${layerHue}, 70%, 55%, 0.2)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, layerRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Center jewel
    const centerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
    const centerHue = (time * 0.5) % 360;
    centerGlow.addColorStop(0, `hsla(${centerHue}, 90%, 80%, 0.9)`);
    centerGlow.addColorStop(0.5, `hsla(${centerHue}, 80%, 60%, 0.4)`);
    centerGlow.addColorStop(1, `hsla(${centerHue}, 70%, 40%, 0)`);
    ctx.fillStyle = centerGlow;
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  },
  code: `// Digital Mandala - Sacred Geometry
// Symmetrical patterns with breathing animation

const breath = sin(time * breathSpeed) * 0.2 + 1;

ctx.translate(cx, cy);
for (let layer = layers; layer >= 1; layer--) {
  const radius = (layer/layers) * maxRadius * breath;
  
  for (let s = 0; s < symmetry; s++) {
    ctx.rotate((s/symmetry) * TAU);
    
    for (let c = 0; c < complexity; c++) {
      const angle = (c/complexity) * PI * 0.8;
      const dist = radius * 0.6 + c * 5;
      
      // Ornate petal shapes
      ctx.beginPath();
      for (let a = 0; a <= TAU; a += 0.1) {
        const r = size * (1 + sin(a*3 + time) * 0.3);
        ctx.lineTo(
          cos(angle)*dist + cos(a)*r,
          sin(angle)*dist + sin(a)*r
        );
      }
      ctx.stroke();
    }
  }
}`
};
