import { useRef, useEffect, useCallback } from 'react';
import type { SketchConfig } from '../types';

interface CanvasRendererProps {
  sketch: SketchConfig;
  params: Record<string, number>;
  width?: number;
  height?: number;
  className?: string;
}

export default function CanvasRenderer({ sketch, params, width = 600, height = 400, className = '' }: CanvasRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const time = Date.now() - startTimeRef.current;
    sketch.render(ctx, canvas.width, canvas.height, params, time);
    animFrameRef.current = requestAnimationFrame(animate);
  }, [sketch, params]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size with device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      canvas.width = width;
      canvas.height = height;
    }

    startTimeRef.current = Date.now();
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [sketch, width, height, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`rounded-2xl ${className}`}
      style={{ width, height }}
    />
  );
}
