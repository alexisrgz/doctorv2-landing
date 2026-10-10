import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { firstVisitPage } from "@/data/pages/first-visit";

export const alt = firstVisitPage.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: firstVisitPage.title, subtitle: firstVisitPage.intro });
}
