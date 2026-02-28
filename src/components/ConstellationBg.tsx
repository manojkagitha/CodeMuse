import { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  vx: number;
  vy: number;
  hue: number;
}

interface ConstellationBgProps {
  starCount?: number;
  connectionDistance?: number;
  className?: string;
  intensity?: 'subtle' | 'normal' | 'vivid';
}

export default function ConstellationBg({
  starCount = 120,
  connectionDistance = 130,
  className = '',
  intensity = 'normal',
}: ConstellationBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const opacityMultiplier = intensity === 'vivid' ? 1.4 : intensity === 'subtle' ? 0.6 : 1;

    // Create stars
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.003 + 0.001,
      twinkleOffset: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.7 ? (Math.random() > 0.5 ? 270 : 190) : 0,
    }));

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('resize', resize);

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now();
      const stars = starsRef.current;
      const mouse = mouseRef.current;

      // Update & draw stars
      for (const star of stars) {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6;
        const alpha = star.opacity * twinkle * opacityMultiplier;

        // Star glow
        if (star.radius > 1) {
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 4);
          if (star.hue > 0) {
            glow.addColorStop(0, `hsla(${star.hue}, 80%, 75%, ${alpha * 0.3})`);
          } else {
            glow.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.2})`);
          }
          glow.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        if (star.hue > 0) {
          ctx.fillStyle = `hsla(${star.hue}, 70%, 80%, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }
        ctx.fill();
      }

      // Draw constellation lines
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const lineAlpha = (1 - dist / connectionDistance) * 0.12 * opacityMultiplier;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(168, 132, 252, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse interaction — brighter connections near cursor
        const dxM = stars[i].x - mouse.x;
        const dyM = stars[i].y - mouse.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);

        if (distM < 200) {
          const lineAlpha = (1 - distM / 200) * 0.2 * opacityMultiplier;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${lineAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', resize);
    };
  }, [starCount, connectionDistance, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
