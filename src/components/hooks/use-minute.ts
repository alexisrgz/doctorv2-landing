"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

const getSnapshot = () => Math.floor(Date.now() / 60_000);
const getServerSnapshot = () => null;

/**
 * Minuto actual (epoch / 60 000). Devuelve null en el servidor y durante la hidratación,
 * así el HTML del servidor y el primer render del cliente coinciden.
 */
export function useMinute(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function minuteToDate(minute: number): Date {
  return new Date(minute * 60_000);
}
