import type { SketchConfig } from '../types';

export const spirographSketch: SketchConfig = {
  id: 'spirograph',
  name: 'Spirograph Engine',
  description: 'Mathematical spirograph patterns created by epicycloid and hypocycloid curves. Pure mathematical beauty in motion.',
  category: 'generative',
  icon: '🎯',
  params: [
    { id: 'outerRadius', label: 'Outer Radius', min: 50, max: 200, step: 5, default: 120 },
    { id: 'innerRadius', label: 'Inner Radius', min: 20, max: 100, step: 5, default: 65 },
    { id: 'penOffset', label: 'Pen Offset', min: 10, max: 80, step: 2, default: 40 },
    { id: 'rotationSpeed', label: 'Speed', min: 0.2, max: 3, step: 0.1, default: 1 },
  ],
  render: (ctx, width, height, params, time) => {
    ctx.fillStyle = 'rgba(15, 15, 26, 0.02)';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const R = params.outerRadius;
    const r = params.innerRadius;
    const d = params.penOffset;
    const speed = params.rotationSpeed;

    const t = time * 0.002 * speed;
    const steps = 2000;

    ctx.lineWidth = 1.5;

    for (let i = 0; i < steps; i++) {
      const theta = (t + i * 0.003) * 2;
      const nextTheta = (t + (i + 1) * 0.003) * 2;

      const x1 = cx + (R - r) * Math.cos(theta) + d * Math.cos(((R - r) / r) * theta);
      const y1 = cy + (R - r) * Math.sin(theta) - d * Math.sin(((R - r) / r) * theta);
      const x2 = cx + (R - r) * Math.cos(nextTheta) + d * Math.cos(((R - r) / r) * nextTheta);
      const y2 = cy + (R - r) * Math.sin(nextTheta) - d * Math.sin(((R - r) / r) * nextTheta);

      const hue = (i / steps * 360 + time * 0.2) % 360;
      ctx.strokeStyle = `hsla(${hue}, 85%, 65%, 0.6)`;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Draw the rolling circles (subtle guide)
    const currentAngle = t * 2;
    const circleX = cx + (R - r) * Math.cos(currentAngle);
    const circleY = cy + (R - r) * Math.sin(currentAngle);

    ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
    ctx.lineWidth = 1;
    
    // Outer circle
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();

    // Inner rolling circle
    ctx.beginPath();
    ctx.arc(circleX, circleY, r, 0, Math.PI * 2);
    ctx.stroke();

    // Pen point
    const penX = circleX + d * Math.cos(((R - r) / r) * currentAngle);
    const penY = circleY - d * Math.sin(((R - r) / r) * currentAngle);
    ctx.fillStyle = 'rgba(244, 114, 182, 0.8)';
    ctx.beginPath();
    ctx.arc(penX, penY, 4, 0, Math.PI * 2);
    ctx.fill();
  },
  code: `// Spirograph Engine - Epicycloid Curves
// Classic mathematical spirograph patterns

const R = outerRadius;   // Fixed circle radius
const r = innerRadius;   // Rolling circle radius  
const d = penOffset;     // Distance from center to pen

for (let i = 0; i < steps; i++) {
  const theta = (time + i * 0.003) * 2;
  
  // Parametric spirograph equations
  const x = cx + (R-r) * cos(theta) + 
            d * cos(((R-r)/r) * theta);
  const y = cy + (R-r) * sin(theta) - 
            d * sin(((R-r)/r) * theta);
  
  const hue = (i/steps * 360 + time) % 360;
  ctx.strokeStyle = \`hsla(\${hue}, 85%, 65%, 0.6)\`;
  ctx.lineTo(x, y);
}

// Draw guide circles
ctx.arc(cx, cy, R, 0, TAU);       // outer
ctx.arc(rollX, rollY, r, 0, TAU); // inner`
};
