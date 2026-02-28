import { flowFieldSketch } from './flowField';
import { particleSystemSketch } from './particleSystem';
import { fractalTreeSketch } from './fractalTree';
import { wavePatternSketch } from './wavePattern';
import { starFieldSketch } from './starField';
import { spirographSketch } from './spirograph';
import { mandalaSketch } from './mandala';
import type { SketchConfig } from '../types';

export const sketches: SketchConfig[] = [
  flowFieldSketch,
  particleSystemSketch,
  fractalTreeSketch,
  wavePatternSketch,
  starFieldSketch,
  spirographSketch,
  mandalaSketch,
];

export function getSketchById(id: string): SketchConfig | undefined {
  return sketches.find(s => s.id === id);
}
