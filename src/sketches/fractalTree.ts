import type { SketchConfig } from '../types';

export const fractalTreeSketch: SketchConfig = {
  id: 'fractal-tree',
  name: 'Living Fractal Tree',
  description: 'A recursive fractal tree that sways in an invisible wind. Branches grow, bloom, and change color with the seasons.',
  category: 'fractal',
  icon: '🌳',
  params: [
    { id: 'depth', label: 'Depth', min: 4, max: 12, step: 1, default: 9 },
    { id: 'angle', label: 'Branch Angle', min: 10, max: 50, step: 1, default: 25 },
    { id: 'windSpeed', label: 'Wind Speed', min: 0, max: 5, step: 0.1, default: 2 },
    { id: 'branchRatio', label: 'Branch Ratio', min: 0.5, max: 0.8, step: 0.01, default: 0.67 },
  ],
  render: (ctx, width, height, params, time) => {
    ctx.fillStyle = 'rgba(15, 15, 26, 1)';
    ctx.fillRect(0, 0, width, height);

    const maxDepth = Math.floor(params.depth);
    const baseAngle = params.angle * Math.PI / 180;
    const wind = Math.sin(time * 0.002 * params.windSpeed) * 0.1;
    const ratio = params.branchRatio;

    function drawBranch(x: number, y: number, length: number, angle: number, depth: number) {
      if (depth <= 0 || length < 2) return;

      const windEffect = wind * (maxDepth - depth) * 0.3;
      const finalAngle = angle + windEffect;
      
      const endX = x + Math.cos(finalAngle) * length;
      const endY = y + Math.sin(finalAngle) * length;

      // Color gradient: trunk → branches → leaves
      const depthRatio = depth / maxDepth;
      const hue = depthRatio > 0.5 
        ? 30 + (1 - depthRatio) * 40  // Brown trunks
        : 90 + Math.sin(time * 0.001) * 30 + (1 - depthRatio) * 60; // Green/seasonal leaves
      
      const lightness = 20 + depthRatio * 30;
      const lineWidth = Math.max(1, depth * 1.2);

      ctx.strokeStyle = `hsl(${hue}, 60%, ${lightness}%)`;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Leaves at tips
      if (depth <= 2) {
        const leafHue = (120 + Math.sin(time * 0.001 + x * 0.01) * 80) % 360;
        ctx.fillStyle = `hsla(${leafHue}, 70%, 55%, 0.7)`;
        ctx.beginPath();
        ctx.arc(endX, endY, 3 - depth * 0.5 + Math.sin(time * 0.003 + x) * 1, 0, Math.PI * 2);
        ctx.fill();
      }

      const newLength = length * ratio;
      drawBranch(endX, endY, newLength, finalAngle - baseAngle + Math.sin(time * 0.001 + depth) * 0.05, depth - 1);
      drawBranch(endX, endY, newLength, finalAngle + baseAngle + Math.cos(time * 0.001 + depth) * 0.05, depth - 1);
    }

    // Draw ground
    const groundGrad = ctx.createLinearGradient(0, height - 60, 0, height);
    groundGrad.addColorStop(0, 'rgba(15, 15, 26, 0)');
    groundGrad.addColorStop(1, 'rgba(34, 60, 34, 0.3)');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, height - 60, width, 60);

    // Start tree from bottom center
    drawBranch(width / 2, height - 30, height * 0.25, -Math.PI / 2, maxDepth);
  },
  code: `// Living Fractal Tree - Recursive Branching
// Wind-affected recursive tree with seasonal colors

function drawBranch(x, y, length, angle, depth) {
  if (depth <= 0) return;
  
  const windEffect = wind * (maxDepth - depth) * 0.3;
  const endX = x + Math.cos(angle + windEffect) * length;
  const endY = y + Math.sin(angle + windEffect) * length;
  
  // Brown trunks → green leaves gradient
  const hue = depth > maxDepth/2 ? 30 : 120;
  ctx.strokeStyle = \`hsl(\${hue}, 60%, \${20 + depth*3}%)\`;
  ctx.lineWidth = depth * 1.2;
  
  ctx.beginPath();
  ctx.moveTo(x, y); ctx.lineTo(endX, endY);
  ctx.stroke();
  
  // Recursive branches
  drawBranch(endX, endY, length * 0.67, 
    angle - branchAngle, depth - 1);
  drawBranch(endX, endY, length * 0.67, 
    angle + branchAngle, depth - 1);
}

drawBranch(width/2, height, height*0.25, -PI/2, 9);`
};
