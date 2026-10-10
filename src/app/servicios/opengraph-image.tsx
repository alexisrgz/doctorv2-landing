import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { servicesPage } from "@/data/pages/services";

export const alt = servicesPage.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: servicesPage.title, subtitle: servicesPage.intro });
}
