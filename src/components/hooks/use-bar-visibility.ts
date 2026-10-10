"use client";

import { useEffect, useState } from "react";

export type BarVisibilityOptions = {
  /** Visible desde la primera pantalla (detalle de servicio) en lugar de entrar tras el hero. */
  fromStart?: boolean;
  /** Selector de un elemento: la barra se oculta mientras esté COMPLETO dentro del viewport. */
  hideWhileFullyVisible?: string;
};

/** Visibilidad de la barra fija inferior móvil. */
export function useBarVisibility({ fromStart = false, hideWhileFullyVisible }: BarVisibilityOptions = {}): boolean {
  const [pastHero, setPastHero] = useState(fromStart);
  const [anchorVisible, setAnchorVisible] = useState(false);

  // Regla general: entra cuando el elemento [data-hero] salió por arriba del viewport.
  useEffect(() => {
    if (fromStart) return;
    const hero = document.querySelector("[data-hero]");
    if (!hero) {
      const frame = requestAnimationFrame(() => setPastHero(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [fromStart]);

  // Evita CTAs duplicados: oculta la barra mientras el botón equivalente se ve completo.
  useEffect(() => {
    if (!hideWhileFullyVisible) return;
    const anchor = document.querySelector(hideWhileFullyVisible);
    if (!anchor) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setAnchorVisible(entry.isIntersecting && entry.intersectionRatio >= 0.99);
      },
      { threshold: [0, 0.5, 0.99, 1] },
    );
    observer.observe(anchor);
    return () => observer.disconnect();
  }, [hideWhileFullyVisible]);

  return pastHero && !anchorVisible;
}
