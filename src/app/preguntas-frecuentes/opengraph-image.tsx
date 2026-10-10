import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { faqPage } from "@/data/pages/misc";

export const alt = faqPage.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: faqPage.title, subtitle: faqPage.intro });
}
