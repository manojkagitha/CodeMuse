import { useState } from 'react';
import type { SketchConfig, ViewMode } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Studio from './components/Studio';
import MCPSection from './components/MCPSection';
import Footer from './components/Footer';
import BackgroundScene from './components/BackgroundScene';
import ScrollLayout from './components/ScrollLayout';
import ZoneOut from './components/ZoneOut';
import DesignAssistantPanel from './components/DesignAssistantPanel';

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
    <ScrollLayout>
      {(scrollProgress) => (
        <div className="min-h-screen" style={{ background: 'var(--void)' }}>
          {/* Scroll-driven sky background — night → dawn → day → sunset */}
          <BackgroundScene scrollProgress={scrollProgress} />

          <div className="relative z-10">
            <Header view={view} onViewChange={handleViewChange} />

            {view === 'gallery' && !selectedSketch ? (
              <>
                <Hero onExplore={() => {
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                }} />
                <ZoneOut />
                <Gallery onSelectSketch={handleSelectSketch} />

                {/* Design Assistant section */}
                <section id="design-assistant" className="py-20 px-5 sm:px-8 max-w-6xl mx-auto">
                  <div className="mb-14">
                    <p className="section-label mb-3 text-amber-400/50">D E S I G N &nbsp; A S S I S T A N T</p>
                    <h2
                      className="text-3xl sm:text-4xl font-bold text-white mb-3"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Build your <span className="gradient-text-gold">visual identity.</span>
                    </h2>
                    <p className="text-sm text-[var(--text-dim)] max-w-lg">
                      Generate color palettes and logo concepts for your project — all deterministic, no API keys needed.
                    </p>
                  </div>
                  <div className="max-w-lg">
                    <DesignAssistantPanel />
                  </div>
                </section>

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
      )}
    </ScrollLayout>
  );
}
