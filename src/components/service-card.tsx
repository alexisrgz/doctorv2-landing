import { Clock, Tag } from "lucide-react";
import Link from "next/link";
import { labels } from "@/data/pages/common";
import { getDurationRange, getStartingPrice, type Service } from "@/data/services";
import { formatDuration, formatPrice } from "@/lib/format";
import { Photo } from "./photo";
import { SERVICE_ICONS } from "./service-icon";

type ServiceCardProps = {
  service: Service;
  /** Nivel del título dentro de la página. */
  headingLevel?: "h2" | "h3";
  sizes?: string;
};

/** Tarjeta de servicio: foto suave, nombre, una línea, duración y precio desde. Toda la tarjeta es el enlace. */
export function ServiceCard({
  service,
  headingLevel: Heading = "h3",
  sizes = "(min-width: 1024px) 380px, 82vw",
}: ServiceCardProps) {
  const { min, max } = getDurationRange(service);
  const titleId = `servicio-${service.slug}-titulo`;
  const summaryId = `servicio-${service.slug}-resumen`;
  const multipleVariants = service.variants.length > 1;

  return (
    <Link
      href={`/servicios/${service.slug}`}
      aria-labelledby={titleId}
      aria-describedby={summaryId}
      data-testid="service-card"
      className="group flex h-full flex-col rounded-soft border border-line bg-white p-3 pb-5 text-ink no-underline"
    >
      <Photo
        name={service.photo.name}
        alt={service.photo.alt}
        focal={service.photo.focal}
        shape="soft"
        ratio="4:3"
        sizes={sizes}
        icon={SERVICE_ICONS[service.icon]}
      />
      <div className="flex flex-1 flex-col px-2 pt-4">
        <Heading id={titleId} className="text-h3 group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
          {service.name}
        </Heading>
        <p id={summaryId} className="mt-2 text-slate">
          {service.summary}
        </p>
        <p className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-4 text-meta font-bold">
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden="true" className="size-5 text-slate" />
            {formatDuration(min, max)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Tag aria-hidden="true" className="size-5 text-slate" />
            {multipleVariants ? `${labels.from} ` : ""}
            {formatPrice(getStartingPrice(service))}
          </span>
        </p>
      </div>
    </Link>
  );
}
