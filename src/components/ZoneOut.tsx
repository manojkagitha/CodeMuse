import { useRef, useEffect, useState } from 'react';

export default function ZoneOut() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 sm:py-44 px-6 overflow-hidden"
    >
      {/* Nebula background blobs */}
      <div className="nebula-blob w-[500px] h-[500px] bg-purple-600/8 top-1/4 -left-40" style={{ animationDelay: '0s' }} />
      <div className="nebula-blob w-[400px] h-[400px] bg-cyan-500/6 bottom-1/4 -right-32" style={{ animationDelay: '-7s' }} />
      <div className="nebula-blob w-[300px] h-[300px] bg-pink-500/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '-13s' }} />

      {/* Floating orbs */}
      <div className="absolute top-20 left-[15%] w-2 h-2 rounded-full bg-purple-400/40 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-32 right-[20%] w-1.5 h-1.5 rounded-full bg-cyan-400/30 animate-float" style={{ animationDelay: '-2s' }} />
      <div className="absolute bottom-24 left-[30%] w-1 h-1 rounded-full bg-pink-400/30 animate-float" style={{ animationDelay: '-4s' }} />
      <div className="absolute bottom-40 right-[35%] w-2.5 h-2.5 rounded-full bg-amber-400/20 animate-float" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Top accent line */}
        <div
          className={`mx-auto mb-12 h-px w-16 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent transition-all duration-1000 ${
            isVisible ? 'opacity-100 w-16' : 'opacity-0 w-0'
          }`}
        />

        <p
          className={`text-[0.7rem] spaced-caps text-purple-400/60 mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Sometimes, I zone out
        </p>

        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="text-[var(--text)]">I stare at the cosmos and see </span>
          <span className="gradient-text">algorithms dancing.</span>
        </h2>

        <p
          className={`text-lg sm:text-xl text-[var(--text-dim)] leading-relaxed max-w-xl mx-auto mb-8 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Every star follows a rule. Every nebula is a function.
          What if code could feel like the night sky?
        </p>

        <p
          className={`text-sm text-[var(--text-muted)] italic transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          That's what CodeMuse is about.
        </p>

        {/* Bottom accent line */}
        <div
          className={`mx-auto mt-12 h-px w-16 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 w-16' : 'opacity-0 w-0'
          }`}
        />
      </div>
    </section>
  );
}
