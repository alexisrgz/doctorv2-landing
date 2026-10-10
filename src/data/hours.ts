/**
 * Horario del consultorio en la zona horaria de site.timeZone.
 * Índice de día: 0 = domingo … 6 = sábado. Cada día admite varios rangos.
 */
export type TimeRange = {
  /** "HH:MM", 24 horas */
  open: string;
  /** "HH:MM", 24 horas */
  close: string;
};

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const weeklyHours: Record<DayIndex, readonly TimeRange[]> = {
  0: [],
  1: [{ open: "09:00", close: "19:00" }],
  2: [{ open: "09:00", close: "19:00" }],
  3: [{ open: "09:00", close: "19:00" }],
  4: [{ open: "09:00", close: "19:00" }],
  5: [{ open: "09:00", close: "19:00" }],
  6: [{ open: "09:00", close: "14:00" }],
};

/** Orden en que se muestra la semana. */
export const weekDisplayOrder: readonly DayIndex[] = [1, 2, 3, 4, 5, 6, 0];

export const dayNames: Record<DayIndex, string> = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};

export const hoursCopy = {
  loading: "Consultando horario…",
  open: "Abierto",
  closed: "Cerrado",
  openUntil: (time: string) => `Abierto hoy hasta las ${time}`,
  closedOpensToday: (time: string) => `Cerrado ahora. Abre hoy a las ${time}`,
  closedOpensTomorrow: (time: string) => `Cerrado ahora. Abre mañana a las ${time}`,
  closedOpensOn: (day: string, time: string) => `Cerrado ahora. Abre el ${day.toLowerCase()} a las ${time}`,
  closedDay: "Cerrado",
  rangeJoiner: " a ",
  today: "Hoy",
} as const;
