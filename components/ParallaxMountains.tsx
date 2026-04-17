'use client';

import { useEffect, useState } from 'react';

export function ParallaxMountains() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="parallax-mountains" aria-hidden="true">
      <div
        className="parallax-aura parallax-aura-left"
        style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0)` }}
      />
      <div
        className="parallax-aura parallax-aura-right"
        style={{ transform: `translate3d(0, ${scrollY * 0.12}px, 0)` }}
      />
      <div
        className="parallax-mountain parallax-mountain-back"
        style={{ transform: `translate3d(-50%, ${scrollY * 0.08}px, 0)` }}
      />
      <div
        className="parallax-mountain parallax-mountain-mid"
        style={{ transform: `translate3d(-50%, ${scrollY * 0.14}px, 0)` }}
      />
      <div
        className="parallax-mountain parallax-mountain-front"
        style={{ transform: `translate3d(-50%, ${scrollY * 0.2}px, 0)` }}
      />
      <div
        className="parallax-mountain parallax-mountain-foreground"
        style={{ transform: `translate3d(-50%, ${scrollY * 0.28}px, 0)` }}
      />
    </div>
  );
}