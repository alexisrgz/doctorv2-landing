import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brandColors } from "@/config/brand";
import { site } from "@/config/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Ícono del sitio: inicial del apellido en Tinta sobre Bruma, con la forma firma. */
export default async function Icon() {
  const font = await readFile(join(process.cwd(), "src", "assets", "fonts", "bricolage-grotesque-latin-700-normal.woff"));
  const initial = site.doctor.familyName.charAt(0);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brandColors.ink,
          color: brandColors.white,
          borderRadius: "10px 10px 28px 10px",
          fontFamily: "Bricolage",
          fontSize: 44,
        }}
      >
        {initial}
      </div>
    ),
    { ...size, fonts: [{ name: "Bricolage", data: font, weight: 700, style: "normal" }] },
  );
}
