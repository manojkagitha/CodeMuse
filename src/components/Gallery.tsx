import { sketches } from '../sketches';
import type { SketchConfig } from '../types';
import ArtCard from './ArtCard';

interface GalleryProps {
  onSelectSketch: (sketch: SketchConfig) => void;
}

export default function Gallery({ onSelectSketch }: GalleryProps) {
  return (
    <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Generative Art <span className="gradient-text">Gallery</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Explore 7 unique generative art algorithms. Each piece is rendered in real-time on HTML5 Canvas — click any artwork to open it in the interactive Studio with full parameter controls.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sketches.map((sketch) => (
          <ArtCard
            key={sketch.id}
            sketch={sketch}
            onSelect={onSelectSketch}
          />
        ))}
      </div>
    </section>
  );
}
