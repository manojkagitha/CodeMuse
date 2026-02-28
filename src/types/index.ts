export interface SketchConfig {
  id: string;
  name: string;
  description: string;
  category: 'generative' | 'particle' | 'fractal' | 'wave' | 'interactive';
  icon: string;
  params: SketchParam[];
  render: (ctx: CanvasRenderingContext2D, width: number, height: number, params: Record<string, number>, time: number) => void;
  code: string;
}

export interface SketchParam {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
}

export type ViewMode = 'gallery' | 'studio';
