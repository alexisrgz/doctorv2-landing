/**
 * Único util de horarios. Lo consumen el chip del hero, la tarjeta de ubicación,
 * la tabla de horarios y el footer, para que nunca se contradigan.
 */
import { site } from "@/config/site";
import {
  dayNames,
  hoursCopy,
  weekDisplayOrder,
  weeklyHours,
  type DayIndex,
  type TimeRange,
} from "@/data/hours";

export type OpenStatus = {
  isOpen: boolean;
  /** Día de hoy en la zona horaria del consultorio. */
  today: DayIndex;
  /** "Abierto" | "Cerrado" */
  state: string;
  /** Frase completa, por ejemplo "Abierto hoy hasta las 19:00". */
  message: string;
};

export type ScheduleDay = {
  day: DayIndex;
  name: string;
  ranges: readonly TimeRange[];
  /** "9:00 a 19:00" o "Cerrado" */
  text: string;
};

const WEEKDAYS: Record<string, DayIndex> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const zonedFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: site.timeZone,
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Día de la semana y minutos desde medianoche en la zona horaria del consultorio. */
export function getZonedNow(now: Date): { day: DayIndex; minutes: number } {
  const parts = zonedFormatter.formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  const day = WEEKDAYS[get("weekday")] ?? 0;
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));
  return { day, minutes: hour * 60 + minute };
}

function toMinutes(time: string): number {
  const [hours = "0", minutes = "0"] = time.split(":");
  return Number(hours) * 60 + Number(minutes);
}

/** "09:00" -> "9:00" */
export function formatTime(time: string): string {
  const [hours = "0", minutes = "00"] = time.split(":");
  return `${Number(hours)}:${minutes}`;
}

function formatRanges(ranges: readonly TimeRange[]): string {
  if (ranges.length === 0) return hoursCopy.closedDay;
  return ranges
    .map((range) => `${formatTime(range.open)}${hoursCopy.rangeJoiner}${formatTime(range.close)}`)
    .join(", ");
}

export function getWeekSchedule(): ScheduleDay[] {
  return weekDisplayOrder.map((day) => ({
    day,
    name: dayNames[day],
    ranges: weeklyHours[day],
    text: formatRanges(weeklyHours[day]),
  }));
}

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const { day, minutes } = getZonedNow(now);
  const todayRanges = weeklyHours[day];

  const current = todayRanges.find((range) => minutes >= toMinutes(range.open) && minutes < toMinutes(range.close));
  if (current) {
    return {
      isOpen: true,
      today: day,
      state: hoursCopy.open,
      message: hoursCopy.openUntil(formatTime(current.close)),
    };
  }

  const laterToday = todayRanges.find((range) => toMinutes(range.open) > minutes);
  if (laterToday) {
    return {
      isOpen: false,
      today: day,
      state: hoursCopy.closed,
      message: hoursCopy.closedOpensToday(formatTime(laterToday.open)),
    };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = ((day + offset) % 7) as DayIndex;
    const first = weeklyHours[nextDay][0];
    if (!first) continue;
    const time = formatTime(first.open);
    return {
      isOpen: false,
      today: day,
      state: hoursCopy.closed,
      message: offset === 1 ? hoursCopy.closedOpensTomorrow(time) : hoursCopy.closedOpensOn(dayNames[nextDay], time),
    };
  }

  return { isOpen: false, today: day, state: hoursCopy.closed, message: hoursCopy.closed };
}
