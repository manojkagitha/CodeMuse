import { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  hue: number;
}

interface BackgroundSceneProps {
  scrollProgress: number; // 0 → 1
}

/**
 * Scroll-driven background scene that evolves through time-of-day phases:
 *   0.00–0.25  Night  — deep void blue, full stars & constellations
 *   0.25–0.50  Dawn   — stars fade, gradient warms to rose/amber
 *   0.50–0.75  Day    — light gradient, no stars
 *   0.75–1.00  Sunset — warm golden-to-purple gradient
 */
export default function BackgroundScene({ scrollProgress }: BackgroundSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animRef = useRef<number>(0);
  const progressRef = useRef(scrollProgress);

  // Keep progress in a ref so the animation loop reads the latest
  progressRef.current = scrollProgress;

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
    window.addEventListener('resize', resize);

    // Create stars once
    starsRef.current = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.6 + 0.3,
      baseOpacity: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.003 + 0.001,
      twinkleOffset: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.7 ? (Math.random() > 0.5 ? 270 : 190) : 0,
    }));

    // Helpers
    const lerpColor = (a: number[], b: number[], t: number) =>
      a.map((v, i) => v + (b[i] - v) * t);

    const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

    const animate = () => {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      const p = progressRef.current;
      const time = Date.now();

      // ── Sky gradient ────────────────────────────────────────
      // Define key colors [r, g, b] for each phase boundary
      const nightTop = [3, 0, 20];       // #030014
      const nightBot = [10, 5, 32];      // #0a0520
      const dawnTop = [50, 20, 60];      // rose-dusky
      const dawnBot = [80, 40, 30];      // warm amber
      const dayTop = [60, 100, 160];     // soft blue
      const dayBot = [180, 210, 240];    // pale sky
      const sunsetTop = [80, 30, 90];    // deep purple
      const sunsetBot = [200, 120, 50];  // warm gold

      let topColor: number[];
      let botColor: number[];

      if (p < 0.25) {
        // Night
        const t = p / 0.25;
        topColor = lerpColor(nightTop, dawnTop, t * 0.3);
        botColor = lerpColor(nightBot, dawnBot, t * 0.3);
      } else if (p < 0.5) {
        // Dawn
        const t = (p - 0.25) / 0.25;
        topColor = lerpColor(dawnTop, dayTop, t);
        botColor = lerpColor(dawnBot, dayBot, t);
      } else if (p < 0.75) {
        // Day
        const t = (p - 0.5) / 0.25;
        topColor = lerpColor(dayTop, sunsetTop, t);
        botColor = lerpColor(dayBot, sunsetBot, t);
      } else {
        // Sunset → back toward night
        const t = (p - 0.75) / 0.25;
        topColor = lerpColor(sunsetTop, nightTop, t);
        botColor = lerpColor(sunsetBot, nightBot, t);
      }

      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, `rgb(${topColor.map(Math.round).join(',')})`);
      grad.addColorStop(1, `rgb(${botColor.map(Math.round).join(',')})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // ── Stars (fade based on scroll) ────────────────────────
      // Full at night (0–0.2), fading dawn (0.2–0.45), invisible day, reappear sunset→night (0.8–1)
      let starAlphaMultiplier: number;
      if (p < 0.2) {
        starAlphaMultiplier = 1;
      } else if (p < 0.45) {
        starAlphaMultiplier = 1 - (p - 0.2) / 0.25;
      } else if (p < 0.8) {
        starAlphaMultiplier = 0;
      } else {
        starAlphaMultiplier = (p - 0.8) / 0.2;
      }
      starAlphaMultiplier = clamp(starAlphaMultiplier);

      if (starAlphaMultiplier > 0.01) {
        const stars = starsRef.current;

        // Draw constellation lines
        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const dx = (stars[i].x - stars[j].x) * W;
            const dy = (stars[i].y - stars[j].y) * H;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              const lineAlpha = (1 - dist / 120) * 0.1 * starAlphaMultiplier;
              ctx.beginPath();
              ctx.moveTo(stars[i].x * W, stars[i].y * H);
              ctx.lineTo(stars[j].x * W, stars[j].y * H);
              ctx.strokeStyle = `rgba(168, 132, 252, ${lineAlpha})`;
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          }
        }

        // Draw stars
        for (const star of stars) {
          const sx = star.x * W;
          const sy = star.y * H;
          const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6;
          const alpha = star.baseOpacity * twinkle * starAlphaMultiplier;

          // Glow
          if (star.radius > 1) {
            const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.radius * 4);
            if (star.hue > 0) {
              glow.addColorStop(0, `hsla(${star.hue}, 80%, 75%, ${alpha * 0.3})`);
            } else {
              glow.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.2})`);
            }
            glow.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(sx, sy, star.radius * 4, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();
          }

          // Core
          ctx.beginPath();
          ctx.arc(sx, sy, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = star.hue > 0
            ? `hsla(${star.hue}, 70%, 80%, ${alpha})`
            : `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
      }

      // ── Atmospheric glow during dawn/sunset ──────────────────
      if (p > 0.2 && p < 0.5) {
        // Dawn glow — warm horizon
        const t = clamp((p - 0.2) / 0.3);
        const glow = ctx.createRadialGradient(W * 0.5, H * 0.9, 0, W * 0.5, H * 0.9, H * 0.7);
        glow.addColorStop(0, `rgba(255, 160, 80, ${0.12 * t})`);
        glow.addColorStop(0.5, `rgba(255, 100, 120, ${0.06 * t})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);
      }

      if (p > 0.6 && p < 0.9) {
        // Sunset glow — golden horizon
        const t = p < 0.75 ? (p - 0.6) / 0.15 : 1 - (p - 0.75) / 0.15;
        const glow = ctx.createRadialGradient(W * 0.5, H * 0.85, 0, W * 0.5, H * 0.85, H * 0.8);
        glow.addColorStop(0, `rgba(255, 180, 60, ${0.15 * clamp(t)})`);
        glow.addColorStop(0.4, `rgba(255, 100, 80, ${0.08 * clamp(t)})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
