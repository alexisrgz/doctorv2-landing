"use client";

import { hoursCopy } from "@/data/hours";
import { getOpenStatus } from "@/lib/hours";
import { minuteToDate, useMinute } from "./hooks/use-minute";

type OpenStatusProps = {
  /** chip: pastilla blanca sobre foto; inline: texto con punto; inverse: sobre banda Tinta. */
  variant?: "chip" | "inline" | "inverse";
  className?: string;
  "data-testid"?: string;
};

const VARIANT_CLASS = {
  chip: "min-h-9 rounded-full bg-white px-3.5 py-1.5 text-meta font-bold text-ink",
  inline: "text-[17px] font-bold text-ink",
  inverse: "text-[17px] font-bold text-white",
} as const;

/**
 * Estado de horario. En el servidor muestra "Consultando horario…";
 * tras montar calcula el estado con src/lib/hours.ts y se actualiza cada minuto.
 */
export function OpenStatus({ variant = "inline", className = "", ...rest }: OpenStatusProps) {
  const minute = useMinute();
  const status = minute === null ? null : getOpenStatus(minuteToDate(minute));
  const state = status ? (status.isOpen ? "open" : "closed") : "loading";

  const dotClass = status?.isOpen
    ? "bg-coral"
    : variant === "inverse"
      ? "bg-white/60"
      : "bg-slate";

  return (
    <p
      data-open-state={state}
      data-testid={rest["data-testid"] ?? "open-status"}
      className={`inline-flex items-center gap-2 ${VARIANT_CLASS[variant]} ${className}`}
    >
      <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${status ? dotClass : "bg-transparent"}`} />
      <span>{status ? status.message : hoursCopy.loading}</span>
    </p>
  );
}
