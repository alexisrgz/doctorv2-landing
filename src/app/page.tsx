import type { Metadata } from "next";
import { ClosingCta } from "@/components/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { MobileActionBar } from "@/components/mobile-bar";
import {
  DoctorSummary,
  FeaturedServices,
  FirstVisitSummary,
  HomeHero,
  LocationSummary,
  Testimonials,
} from "@/components/sections/home-sections";
import { homePage } from "@/data/pages/home";
import { physicianJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ description: homePage.meta.description, path: "/" });

export default function HomePage() {
  return (
    <>
      <JsonLd data={physicianJsonLd()} />
      <HomeHero />
      <FeaturedServices />
      <FirstVisitSummary />
      <DoctorSummary />
      <Testimonials />
      <LocationSummary />
      <ClosingCta source="cierre-inicio" />
      <MobileActionBar source="barra-inicio" />
    </>
  );
}
