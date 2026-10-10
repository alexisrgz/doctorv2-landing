import { getService, services } from "@/data/services";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Servicio";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOgImage({ title: service?.name ?? "Servicio", subtitle: service?.summary });
}
