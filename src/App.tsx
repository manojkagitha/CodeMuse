import { useState } from 'react';
import type { SketchConfig, ViewMode } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Studio from './components/Studio';
import MCPSection from './components/MCPSection';
import Footer from './components/Footer';
import ConstellationBg from './components/ConstellationBg';
import ZoneOut from './components/ZoneOut';

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
    <div className="min-h-screen" style={{ background: 'var(--void)' }}>
      {/* Constellation star field — always visible behind everything */}
      <ConstellationBg intensity="subtle" />

      {/* Subtle top nebula glow */}
      <div className="fixed top-0 left-0 right-0 h-[600px] pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(88, 28, 135, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <Header view={view} onViewChange={handleViewChange} />

        {view === 'gallery' && !selectedSketch ? (
          <>
            <Hero onExplore={() => {
              document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
            }} />
            <ZoneOut />
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
    </div>
  );
}
