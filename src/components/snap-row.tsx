import type { CSSProperties, ReactNode } from "react";

type SnapRowProps = {
  label: string;
  /** Columnas en desktop (≥1024px). */
  columns: 2 | 3 | 4;
  /** Hazlo enfocable con teclado cuando los elementos no tienen enlaces. */
  focusable?: boolean;
  className?: string;
  children: ReactNode;
};

/** Carrusel con scroll-snap en móvil; rejilla en desktop. Cada hijo debe ser un <li>. */
export function SnapRow({ label, columns, focusable = false, className = "", children }: SnapRowProps) {
  return (
    <ul
      aria-label={label}
      tabIndex={focusable ? 0 : undefined}
      className={`snap-row ${className}`}
      style={{ "--snap-cols": columns } as CSSProperties}
    >
      {children}
    </ul>
  );
}
