import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brandColors } from "@/config/brand";
import { seo } from "@/config/seo";
import { site } from "@/config/site";

export const ogSize = seo.ogImageSize;
export const ogContentType = "image/png";

const fontsDir = join(process.cwd(), "src", "assets", "fonts");
const fonts = Promise.all([
  readFile(join(fontsDir, "bricolage-grotesque-latin-700-normal.woff")),
  readFile(join(fontsDir, "atkinson-hyperlegible-next-latin-400-normal.woff")),
]);

type OgInput = {
  title: string;
  subtitle?: string;
};

/** Imagen Open Graph de marca: plana, sin degradados, con la forma firma. */
export async function renderOgImage({ title, subtitle }: OgInput) {
  const [display, body] = await fonts;
  const { ink, mist, white, coral, slate } = brandColors;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: white,
          padding: 64,
          fontFamily: "Atkinson",
          color: ink,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Bricolage", fontSize: 34, letterSpacing: -0.5 }}>{site.name}</div>
            <div style={{ fontSize: 24, color: slate, marginTop: 4 }}>{site.descriptor}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Bricolage", fontSize: title.length > 40 ? 60 : 72, lineHeight: 1.06, letterSpacing: -1.5 }}>
              {title}
            </div>
            {subtitle ? (
              <div style={{ fontSize: 28, lineHeight: 1.4, color: slate, marginTop: 24, maxWidth: 640 }}>{subtitle}</div>
            ) : null}
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            width: 340,
            height: "100%",
            background: mist,
            borderRadius: "14px 14px 128px 14px",
            display: "flex",
            alignItems: "flex-end",
            padding: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: white,
              borderRadius: 999,
              padding: "10px 18px",
              fontSize: 22,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: coral, marginRight: 10 }} />
            {site.address.city}, {site.address.state}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: display, weight: 700, style: "normal" },
        { name: "Atkinson", data: body, weight: 400, style: "normal" },
      ],
    },
  );
}
