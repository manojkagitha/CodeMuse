import { sketches } from '../sketches';
import type { SketchConfig } from '../types';
import ArtCard from './ArtCard';

interface GalleryProps {
  onSelectSketch: (sketch: SketchConfig) => void;
}

export default function Gallery({ onSelectSketch }: GalleryProps) {
  return (
    <section id="gallery" className="py-20 px-5 sm:px-8 max-w-6xl mx-auto">
      {/* Section header */}
      <div className="mb-14">
        <p className="section-label mb-3 text-purple-400/50">G A L L E R Y</p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-white mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Generative Art <span className="gradient-text">Collection</span>
        </h2>
        <p className="text-sm text-[var(--text-dim)] max-w-lg">
          Seven algorithms that turn math into visual poetry. Each piece renders live on Canvas — tap any card to enter the Studio.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sketches.map((sketch, i) => (
          <div
            key={sketch.id}
            className={`${
              i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
            } ${i === 3 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
          >
            <ArtCard
              sketch={sketch}
              onSelect={onSelectSketch}
              featured={i === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
