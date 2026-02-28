import { useState, useEffect, useCallback, type ReactNode } from 'react';

interface ScrollLayoutProps {
  children: (scrollProgress: number) => ReactNode;
}

/**
 * Tracks scroll position as a 0→1 value and passes it to children
 * via render-prop. Used to drive the BackgroundScene day/night cycle.
 */
export default function ScrollLayout({ children }: ScrollLayoutProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    // passive listener for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial value
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return <>{children(scrollProgress)}</>;
}
