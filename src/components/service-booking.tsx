"use client";

import { Clock, Phone } from "lucide-react";
import { useId, useState } from "react";
import { actions } from "@/data/pages/common";
import { serviceDetailPage } from "@/data/pages/services";
import type { ServiceVariant } from "@/data/services";
import { isExternalBooking } from "@/lib/booking";
import { formatDuration, formatPrice } from "@/lib/format";
import { BookingLink } from "./booking-link";
import { CallLink } from "./call-link";
import { WhatsAppIcon } from "./icons/whatsapp-icon";
import { MobileBarFrame } from "./mobile-bar";
import { buttonClasses } from "./ui/button-styles";

type ServiceBookingProps = {
  slug: string;
  name: string;
  shortName?: string;
  variants: readonly [ServiceVariant, ...ServiceVariant[]];
  priceNote?: string;
};

const copy = serviceDetailPage.booking;

/**
 * Reserva del detalle de servicio. Un solo estado (la variante elegida) alimenta a la vez
 * el precio, la etiqueta del botón y el mensaje de WhatsApp, en la tarjeta y en la barra móvil.
 */
export function ServiceBooking({ slug, name, shortName, variants, priceNote }: ServiceBookingProps) {
  const [variantId, setVariantId] = useState(variants[0].id);
  const variant = variants.find((item) => item.id === variantId) ?? variants[0];
  const groupName = useId();
  const price = formatPrice(variant.price);
  const titleLine = `${copy.bookPrefix} · ${shortName ?? name}`;
  const detailLine = `${variant.label} · ${price}`;

  return (
    <>
      <section
        aria-labelledby="reserva-titulo"
        data-testid="booking-card"
        className="rounded-soft border border-line bg-white p-5 sm:p-6"
      >
        <h2 id="reserva-titulo" className="text-h3">
          {serviceDetailPage.sections.price}
        </h2>

        {variants.length > 1 ? (
          <fieldset className="mt-4">
            <legend className="mb-2 text-meta font-bold">{copy.chooseVariant}</legend>
            <div className="grid grid-cols-2 gap-1 rounded-control bg-mist p-1">
              {variants.map((item) => (
                <label
                  key={item.id}
                  data-testid="variant-option"
                  className="flex min-h-12 cursor-pointer items-center justify-center rounded-[10px] border-[1.5px] border-transparent px-2 py-2 text-center text-[15px] leading-tight font-bold text-slate has-checked:border-ink has-checked:bg-white has-checked:text-ink has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink"
                >
                  <input
                    type="radio"
                    name={groupName}
                    value={item.id}
                    checked={item.id === variant.id}
                    onChange={() => setVariantId(item.id)}
                    className="sr-only"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          <p aria-live="polite" aria-atomic="true">
            <span className="sr-only">{variant.label}: </span>
            <span key={variant.id} data-testid="variant-price" className="block animate-fade font-display text-price font-bold tracking-[-0.02em]">
              {price}
            </span>
          </p>
          <p className="inline-flex items-center gap-1.5 text-meta font-bold text-slate">
            <Clock aria-hidden="true" className="size-5" />
            {formatDuration(variant.durationMin)}
          </p>
        </div>
        {priceNote ? <p className="mt-3 text-meta text-slate">{priceNote}</p> : null}

        <BookingLink
          service={slug}
          variant={variant.id}
          source="detalle-servicio"
          data-testid="service-book"
          className={buttonClasses("primary", "lg", "mt-5 w-full justify-start px-4 py-2")}
        >
          <WhatsAppIcon className="size-5 shrink-0" />
          <span className="flex min-w-0 flex-col items-start text-left">
            <span data-testid="service-book-label">{titleLine}</span>
            <span className="text-meta font-normal">{detailLine}</span>
          </span>
        </BookingLink>
        <CallLink className={buttonClasses("secondary", "md", "mt-3 w-full")}>
          <Phone aria-hidden="true" className="size-5" />
          {actions.call}
        </CallLink>
        {isExternalBooking() ? <p className="mt-3 text-meta text-slate">{copy.note}</p> : null}
      </section>

      <MobileBarFrame label={titleLine}>
        <BookingLink
          service={slug}
          variant={variant.id}
          source="barra-servicio"
          data-testid="mobile-service-book"
          className={buttonClasses("primary", "lg", "min-w-0 flex-1 justify-start px-4 py-1.5")}
        >
          <WhatsAppIcon className="size-5 shrink-0" />
          <span className="flex min-w-0 flex-col items-start text-left">
            <span className="w-full truncate">{titleLine}</span>
            <span className="text-meta font-normal">{detailLine}</span>
          </span>
        </BookingLink>
        <CallLink aria-label={actions.call} className={buttonClasses("secondary", "lg", "w-[52px] shrink-0 px-0")}>
          <Phone aria-hidden="true" className="size-5" />
        </CallLink>
      </MobileBarFrame>
    </>
  );
}
