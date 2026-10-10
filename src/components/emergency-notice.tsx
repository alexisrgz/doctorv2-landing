import { TriangleAlert } from "lucide-react";
import { practice } from "@/data/practice";

/** Aviso de que el consultorio no es servicio de urgencias. */
export function EmergencyNotice({ className = "" }: { className?: string }) {
  return (
    <aside
      aria-label="Urgencias"
      className={`flex gap-3 rounded-soft border-[1.5px] border-ink bg-white p-5 ${className}`}
    >
      <TriangleAlert aria-hidden="true" className="mt-0.5 size-6 shrink-0" />
      <p className="max-w-[60ch] font-bold">{practice.emergencyNotice}</p>
    </aside>
  );
}
