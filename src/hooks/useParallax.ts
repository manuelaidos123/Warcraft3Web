import { useEffect, useRef, useState, useCallback } from "react";

export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        setOffset(window.scrollY * speed);
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [speed]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { ref, offset };
}

export function useParallaxLayers() {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgOffset = scrollY * 0.3;
  const contentOffset = scrollY * 0.15;
  const opacity = Math.max(0, 1 - scrollY / 600);

  return { bgRef, contentRef, bgOffset, contentOffset, opacity };
}
