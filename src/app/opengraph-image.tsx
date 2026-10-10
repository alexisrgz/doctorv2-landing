import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { homePage } from "@/data/pages/home";

export const alt = homePage.hero.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: homePage.hero.title, subtitle: homePage.hero.subtitle });
}
