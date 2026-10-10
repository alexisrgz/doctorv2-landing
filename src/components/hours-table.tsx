"use client";

import { hoursCopy } from "@/data/hours";
import { getOpenStatus, getWeekSchedule } from "@/lib/hours";
import { minuteToDate, useMinute } from "./hooks/use-minute";

type HoursTableProps = {
  caption: string;
  className?: string;
};

/** Tabla semanal de horarios; resalta el día de hoy (calculado en el cliente con el mismo util). */
export function HoursTable({ caption, className = "" }: HoursTableProps) {
  const minute = useMinute();
  const status = minute === null ? null : getOpenStatus(minuteToDate(minute));
  const week = getWeekSchedule();

  return (
    <table
      className={`w-full border-collapse text-[17px] ${className}`}
      data-testid="hours-table"
      data-open-state={status ? (status.isOpen ? "open" : "closed") : "loading"}
    >
      <caption className="sr-only">{caption}</caption>
      <tbody>
        {week.map((row) => {
          const isToday = status?.today === row.day;
          return (
            <tr
              key={row.day}
              data-day={row.day}
              data-today={isToday ? "true" : undefined}
              aria-current={isToday ? "date" : undefined}
              className={`border-b border-line last:border-b-0 ${isToday ? "bg-mist font-bold" : ""}`}
            >
              <th scope="row" className="py-3 pr-4 pl-3 text-left font-[inherit]">
                <span className="inline-flex flex-wrap items-center gap-x-2">
                  {row.name}
                  {isToday ? (
                    <span className="rounded-full bg-ink px-2 py-0.5 text-meta font-bold text-white">
                      {hoursCopy.today}
                    </span>
                  ) : null}
                </span>
              </th>
              <td className={`py-3 pr-3 text-right tabular-nums ${row.ranges.length ? "" : "text-slate"}`}>
                {row.text}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
