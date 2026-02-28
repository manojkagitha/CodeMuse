import { useState } from 'react';
import type { SketchConfig, ViewMode } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Studio from './components/Studio';
import MCPSection from './components/MCPSection';
import Footer from './components/Footer';

export default function App() {
  const [view, setView] = useState<ViewMode>('gallery');
  const [selectedSketch, setSelectedSketch] = useState<SketchConfig | null>(null);

  const handleSelectSketch = (sketch: SketchConfig) => {
    setSelectedSketch(sketch);
    setView('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGallery = () => {
    setView('gallery');
    setSelectedSketch(null);
  };

  const handleViewChange = (newView: ViewMode) => {
    if (newView === 'gallery') {
      handleBackToGallery();
    } else {
      setView(newView);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <Header view={view} onViewChange={handleViewChange} />

      {view === 'gallery' && !selectedSketch ? (
        <>
          <Hero onExplore={() => {
            document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
          }} />
          <Gallery onSelectSketch={handleSelectSketch} />
          <MCPSection />
          <Footer />
        </>
      ) : view === 'studio' && selectedSketch ? (
        <Studio sketch={selectedSketch} onBack={handleBackToGallery} />
      ) : (
        <>
          <div className="pt-20">
            <Gallery onSelectSketch={handleSelectSketch} />
          </div>
          <MCPSection />
          <Footer />
        </>
      )}
    </div>
  );
}
