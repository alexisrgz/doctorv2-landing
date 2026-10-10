import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { locationPage } from "@/data/pages/misc";

export const alt = locationPage.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: locationPage.title, subtitle: locationPage.intro });
}
