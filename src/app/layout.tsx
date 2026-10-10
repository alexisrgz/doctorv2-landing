import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/header/site-header";
import { SiteFooter } from "@/components/site-footer";
import { brandColors } from "@/config/brand";
import { seo } from "@/config/seo";
import { site } from "@/config/site";
import { bodyFont, displayFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: seo.defaultTitle, template: seo.titleTemplate },
  description: seo.defaultDescription,
  keywords: [...seo.keywords],
  applicationName: site.name,
  authors: [{ name: site.doctor.fullName }],
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: site.locale.replace("-", "_"),
    siteName: site.name,
    title: seo.defaultTitle,
    description: seo.defaultDescription,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: brandColors.white,
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.locale} className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="flex min-h-svh flex-col">
        <a
          href="#contenido"
          className="sr-only rounded-control bg-ink px-4 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
