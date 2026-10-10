import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  intro?: ReactNode;
  /** Arriba del título (por ejemplo, migas de pan). */
  eyebrow?: ReactNode;
  /** Botones bajo el texto. */
  actions?: ReactNode;
  /** Apoyo a la derecha en desktop: foto, dato o CTA. Obligatorio para no dejar zonas muertas. */
  aside: ReactNode;
  /** Proporción de columnas en desktop. */
  layout?: "text-wide" | "balanced";
};

/** Encabezado de páginas interiores. Marca el "hero" de la página para la barra inferior móvil. */
export function PageHeader({ title, intro, eyebrow, actions, aside, layout = "text-wide" }: PageHeaderProps) {
  const textCols = layout === "balanced" ? "lg:col-span-6" : "lg:col-span-7";
  const asideCols = layout === "balanced" ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-4 lg:col-start-9";
  return (
    <section data-hero className="pt-6 pb-12 lg:pt-16 lg:pb-20">
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className={textCols}>
          {eyebrow}
          <h1 className="text-h1">{title}</h1>
          {intro ? <p className="mt-4 max-w-[52ch] text-lead text-slate">{intro}</p> : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        <div className={asideCols}>{aside}</div>
      </div>
    </section>
  );
}
