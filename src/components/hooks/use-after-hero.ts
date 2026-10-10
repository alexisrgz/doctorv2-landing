"use client";

import { useEffect, useState } from "react";

/** true cuando el elemento [data-hero] de la página ya salió por arriba del viewport. */
export function useAfterHero(): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) {
      const frame = requestAnimationFrame(() => setPast(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      setPast(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return past;
}
