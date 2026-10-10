import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { doctor } from "@/data/doctor";
import { doctorPage } from "@/data/pages/doctor";

export const alt = doctor.fullName;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: doctor.fullName, subtitle: doctorPage.lead });
}
