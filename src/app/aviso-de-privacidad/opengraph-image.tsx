import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { privacyPage } from "@/data/pages/misc";

export const alt = privacyPage.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: privacyPage.title, subtitle: undefined });
}
