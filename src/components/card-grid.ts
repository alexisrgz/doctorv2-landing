/**
 * Columnas de una rejilla de tarjetas según el número de elementos, para no dejar
 * filas con una sola tarjeta: primero una división exacta (4, 3, 2) y si no, la que no deje huérfanas.
 */
export type GridColumns = 1 | 2 | 3 | 4;

export function columnsFor(count: number): GridColumns {
  if (count <= 1) return 1;
  for (const columns of [4, 3, 2] as const) {
    if (columns <= count && count % columns === 0) return columns;
  }
  for (const columns of [4, 3] as const) {
    if (columns <= count && count % columns !== 1) return columns;
  }
  return 2;
}

/** Clases de rejilla por columnas en desktop (≥1024px), con su paso intermedio. */
const GRID_CLASS: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  // 2 columnas de 640 a 1023px, 4 desde 1024px.
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function cardGridClasses(count: number): string {
  return GRID_CLASS[columnsFor(count)];
}

/** Formato de duración y precio en las tarjetas: apilado solo en rejillas de 4 columnas. */
export type CardMetaLayout = "inline" | "stacked-lg";

export function metaLayoutFor(count: number): CardMetaLayout {
  return columnsFor(count) === 4 ? "stacked-lg" : "inline";
}
