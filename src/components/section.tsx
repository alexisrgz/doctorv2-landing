import type { ReactNode } from "react";

type Tone = "white" | "mist" | "sand" | "ink";

const TONE_CLASS: Record<Tone, string> = {
  white: "bg-white text-ink",
  mist: "bg-mist text-ink",
  // Arena: una sola banda cálida por página.
  sand: "bg-sand text-ink",
  // Tinta: solo para el cierre con CTA (y el footer).
  ink: "on-ink bg-ink text-white",
};

type SectionProps = {
  id?: string;
  tone?: Tone;
  /** Esquinas superiores redondeadas (24px), para bandas que asoman. */
  roundedTop?: boolean;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
  "data-testid"?: string;
};

export function Section({
  id,
  tone = "white",
  roundedTop = false,
  labelledBy,
  className = "",
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-testid={rest["data-testid"]}
      className={`${TONE_CLASS[tone]} ${roundedTop ? "rounded-t-band" : ""} py-14 lg:py-24 ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

type SectionHeaderProps = {
  id: string;
  title: string;
  /** Texto de apoyo a la derecha en desktop (debajo del título en móvil). */
  intro?: ReactNode;
  /** Acción (enlace o botón) junto al texto de apoyo. */
  action?: ReactNode;
  className?: string;
  /** Color de texto secundario: Pizarra por defecto; en banda Tinta, blanco. */
  inverse?: boolean;
};

/**
 * Encabezado de sección: título a la izquierda y apoyo a la derecha en desktop,
 * para no dejar media pantalla vacía.
 */
export function SectionHeader({ id, title, intro, action, className = "", inverse = false }: SectionHeaderProps) {
  return (
    <div className={`grid gap-4 lg:grid-cols-12 lg:items-start lg:gap-8 ${className}`}>
      <h2 id={id} className="text-h2 lg:col-span-6">
        {title}
      </h2>
      {intro || action ? (
        <div className="flex flex-col gap-1 lg:col-span-5 lg:col-start-8 lg:pt-2">
          {intro ? <p className={`max-w-[52ch] ${inverse ? "text-white/85" : "text-slate"}`}>{intro}</p> : null}
          {action ? <div>{action}</div> : null}
        </div>
      ) : null}
    </div>
  );
}
