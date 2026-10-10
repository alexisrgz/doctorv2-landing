import { Accessibility, Car, Phone, Quote } from "lucide-react";
import Link from "next/link";
import { doctor, getYearsOfPractice } from "@/data/doctor";
import { actions } from "@/data/pages/common";
import { homePage } from "@/data/pages/home";
import { photos } from "@/data/photos";
import { practice } from "@/data/practice";
import { getFeaturedServices } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { BookingLink } from "../booking-link";
import { columnsFor, metaLayoutFor } from "../card-grid";
import { CallLink } from "../call-link";
import { WhatsAppIcon } from "../icons/whatsapp-icon";
import { StepList } from "../lists";
import { LocationCard } from "../location-card";
import { OpenStatus } from "../open-status";
import { Photo } from "../photo";
import { Section, SectionHeader } from "../section";
import { ServiceCard } from "../service-card";
import { SnapRow } from "../snap-row";
import { buttonClasses } from "../ui/button-styles";

const textLink = "link inline-flex min-h-12 items-center font-bold";

/** Hero de inicio. Móvil: foto (forma firma) + título + CTAs visibles sin scroll. Desktop: dos columnas. */
export function HomeHero() {
  const { hero } = homePage;
  return (
    <section data-hero aria-labelledby="hero-titulo" className="pt-3 pb-6 lg:pt-12 lg:pb-20">
      <div className="container-page grid gap-4 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="relative lg:order-2 lg:col-span-6 lg:col-start-7">
          <Photo
            {...photos.heroDoctor}
            shape="signature"
            priority
            sizes="(min-width: 1200px) 580px, (min-width: 1024px) 50vw, 100vw"
            className="w-full animate-reveal max-lg:aspect-auto max-lg:h-[clamp(180px,38svh,300px)]"
          />
          <div className="absolute bottom-3 left-3 lg:bottom-5 lg:left-5">
            <OpenStatus variant="chip" data-testid="hero-open-status" />
          </div>
        </div>
        <div className="lg:order-1 lg:col-span-6 lg:pr-4">
          <h1 id="hero-titulo" className="text-h1 animate-rise">
            {hero.title}
          </h1>
          <p className="mt-3 max-w-[46ch] animate-rise text-slate [animation-delay:80ms] lg:mt-5 lg:text-lead">
            {hero.subtitle}
          </p>
          <div className="mt-5 flex animate-rise gap-3 [animation-delay:160ms] lg:mt-9" data-testid="hero-ctas">
            <BookingLink
              source="hero"
              data-testid="hero-book"
              className={buttonClasses("primary", "lg", "flex-1 sm:flex-none sm:px-7")}
            >
              <WhatsAppIcon />
              {actions.book}
            </BookingLink>
            <CallLink data-testid="hero-call" className={buttonClasses("secondary", "lg", "sm:px-7")}>
              <Phone aria-hidden="true" className="size-5" />
              {actions.call}
            </CallLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedServices() {
  const { featured } = homePage;
  const featuredServices = getFeaturedServices();
  const columns = columnsFor(featuredServices.length);
  return (
    <Section tone="mist" roundedTop labelledBy="destacados-titulo">
      <SectionHeader
        id="destacados-titulo"
        title={featured.title}
        intro={featured.intro}
        action={
          <Link href="/servicios" className={textLink}>
            {actions.allServices}
          </Link>
        }
      />
      <SnapRow label={featured.title} columns={columns === 1 ? 2 : columns} className="mt-8 lg:mt-12">
        {featuredServices.map((service) => (
          <li key={service.slug}>
            <ServiceCard
              service={service}
              metaLayout={metaLayoutFor(featuredServices.length)}
              sizes="(min-width: 1024px) 270px, 82vw"
            />
          </li>
        ))}
      </SnapRow>
    </Section>
  );
}

/** Resumen de la primera consulta: la banda Arena de la página. */
export function FirstVisitSummary() {
  const { firstVisit } = homePage;
  return (
    <Section tone="sand" labelledBy="primera-titulo">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 id="primera-titulo" className="text-h2">
            {firstVisit.title}
          </h2>
          <p className="mt-4 max-w-[40ch] text-slate">{firstVisit.intro}</p>
          <Link href="/primera-consulta" className={`${textLink} mt-4`}>
            {firstVisit.link}
          </Link>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <StepList steps={firstVisit.steps} columns={2} />
        </div>
      </div>
    </Section>
  );
}

export function DoctorSummary() {
  const copy = homePage.doctor;
  const facts = [
    { label: copy.facts.license, value: doctor.license.number },
    { label: copy.facts.years, value: String(getYearsOfPractice()) },
    { label: copy.facts.focus, value: doctor.focus },
  ];
  return (
    <Section labelledBy="doctor-titulo">
      <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-8">
        <div className="md:col-span-5">
          <Photo
            {...photos.doctorHome}
            shape="soft"
            sizes="(min-width: 1024px) 460px, (min-width: 768px) 40vw, 100vw"
            className="max-md:aspect-[4/3]"
          />
        </div>
        <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
          <h2 id="doctor-titulo" className="text-h2">
            {copy.title}
          </h2>
          <p className="mt-4 font-display text-[22px] leading-tight font-bold tracking-[-0.02em]">{doctor.fullName}</p>
          <p className="text-slate">{doctor.role}</p>
          <p className="mt-4 max-w-[55ch]">{copy.text}</p>
          {/* Cédula y años comparten fila; el enfoque (texto largo) ocupa una fila completa. */}
          <dl className="mt-8 grid grid-cols-2 border-y border-line" data-testid="doctor-facts">
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                data-testid="doctor-fact"
                className={
                  index === facts.length - 1
                    ? "col-span-2 border-t border-line py-4"
                    : `py-4 ${index === 0 ? "border-r border-line pr-5" : "pl-5"}`
                }
              >
                <dt className="text-meta text-slate">{fact.label}</dt>
                <dd className="mt-1 font-display text-[19px] leading-snug font-bold tracking-[-0.01em]">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <Link href="/el-doctor" className={`${textLink} mt-4`}>
            {copy.link}
          </Link>
        </div>
      </div>
    </Section>
  );
}

export function Testimonials() {
  const copy = homePage.testimonials;
  return (
    <Section tone="mist" labelledBy="testimonios-titulo">
      <SectionHeader id="testimonios-titulo" title={copy.title} intro={copy.intro} />
      <SnapRow label={copy.title} columns={3} focusable className="mt-8 lg:mt-12">
        {testimonials.map((testimonial) => (
          <li key={testimonial.author}>
            <figure className="flex h-full flex-col rounded-soft bg-white p-6">
              <Quote aria-hidden="true" className="size-6 text-slate" />
              <blockquote className="mt-4 flex-1 text-[19px] leading-normal">
                <p>“{testimonial.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 text-meta">
                <span className="block font-bold">{testimonial.author}</span>
                <span className="text-slate">{testimonial.context}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </SnapRow>
    </Section>
  );
}

export function LocationSummary() {
  const copy = homePage.location;
  return (
    <Section labelledBy="ubicacion-titulo">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="ubicacion-titulo" className="text-h2">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-[44ch] text-slate">{copy.intro}</p>
          <ul className="mt-6 flex flex-col gap-4">
            <li className="flex gap-3">
              <Car aria-hidden="true" className="mt-0.5 size-6 shrink-0" />
              <span>
                <span className="block font-bold">{practice.parking.title}</span>
                <span className="text-slate">{practice.parking.text}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Accessibility aria-hidden="true" className="mt-0.5 size-6 shrink-0" />
              <span>
                <span className="block font-bold">{practice.accessibility.title}</span>
                <span className="text-slate">{practice.accessibility.items.join(". ")}.</span>
              </span>
            </li>
          </ul>
          <Link href="/ubicacion" className={`${textLink} mt-4`}>
            {copy.link}
          </Link>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <LocationCard showPhone />
        </div>
      </div>
    </Section>
  );
}
