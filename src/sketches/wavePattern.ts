import type { SketchConfig } from '../types';

export const wavePatternSketch: SketchConfig = {
  id: 'wave-interference',
  name: 'Wave Interference',
  description: 'Overlapping sine waves create mesmerizing moiré and interference patterns. A visual symphony of mathematics.',
  category: 'wave',
  icon: '🎵',
  params: [
    { id: 'waveCount', label: 'Wave Layers', min: 2, max: 8, step: 1, default: 5 },
    { id: 'frequency', label: 'Frequency', min: 0.5, max: 5, step: 0.1, default: 2 },
    { id: 'amplitude', label: 'Amplitude', min: 20, max: 120, step: 5, default: 60 },
    { id: 'speed', label: 'Speed', min: 0.5, max: 4, step: 0.1, default: 1.5 },
  ],
  render: (ctx, width, height, params, time) => {
    ctx.fillStyle = 'rgba(15, 15, 26, 0.08)';
    ctx.fillRect(0, 0, width, height);

    const layers = Math.floor(params.waveCount);
    const freq = params.frequency;
    const amp = params.amplitude;
    const spd = params.speed;

    for (let layer = 0; layer < layers; layer++) {
      const layerOffset = (layer / layers) * Math.PI * 2;
      const hue = (layer / layers * 360 + time * 0.3) % 360;
      const yCenter = height / 2 + Math.sin(layerOffset + time * 0.001) * (height * 0.15);

      ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.4)`;
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < width; x += 2) {
        const normalX = x / width;
        const y = yCenter + 
          Math.sin(normalX * freq * Math.PI * 2 + time * 0.003 * spd + layerOffset) * amp +
          Math.sin(normalX * freq * 1.5 * Math.PI * 2 + time * 0.002 * spd + layerOffset * 2) * amp * 0.5 +
          Math.cos(normalX * freq * 0.7 * Math.PI * 2 + time * 0.004 * spd) * amp * 0.3;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Fill area under wave with subtle gradient
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = `hsla(${hue}, 70%, 40%, 0.03)`;
      ctx.fill();
    }

    // Interference dots at intersections
    for (let x = 0; x < width; x += 20) {
      for (let layer1 = 0; layer1 < layers - 1; layer1++) {
        const y1 = height / 2 +
          Math.sin(x / width * freq * Math.PI * 2 + time * 0.003 * spd + (layer1 / layers) * Math.PI * 2) * amp;
        const y2 = height / 2 +
          Math.sin(x / width * freq * Math.PI * 2 + time * 0.003 * spd + ((layer1 + 1) / layers) * Math.PI * 2) * amp;
        
        if (Math.abs(y1 - y2) < 10) {
          const hue = (time * 0.5 + x * 0.3) % 360;
          ctx.fillStyle = `hsla(${hue}, 90%, 75%, 0.5)`;
          ctx.beginPath();
          ctx.arc(x, (y1 + y2) / 2, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  },
  code: `// Wave Interference - Mathematical Art
// Overlapping sine waves with moiré patterns

for (let layer = 0; layer < waveCount; layer++) {
  const offset = (layer / waveCount) * PI * 2;
  const hue = (layer / waveCount * 360 + time) % 360;
  
  ctx.strokeStyle = \`hsla(\${hue}, 80%, 60%, 0.4)\`;
  ctx.beginPath();
  
  for (let x = 0; x < width; x += 2) {
    const nx = x / width;
    const y = center + 
      sin(nx * freq * TAU + time + offset) * amp +
      sin(nx * freq * 1.5 * TAU + time) * amp * 0.5;
    
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
}

// Highlight intersection points
if (abs(y1 - y2) < threshold) {
  drawGlowDot(x, (y1+y2)/2, hue);
}`
};
