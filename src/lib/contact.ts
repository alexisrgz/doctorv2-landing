import { site } from "@/config/site";

export function getCallHref(): string {
  return `tel:${site.phone.e164}`;
}

export function getPhoneDisplay(): string {
  return site.phone.display;
}

export function getAddressLines(): [string, string] {
  const { street, neighborhood, city, state, postalCode } = site.address;
  return [`${street}, ${neighborhood}`, `${city}, ${state}, C.P. ${postalCode}`];
}

export function getFullAddress(): string {
  return getAddressLines().join(", ");
}

/** Enlace directo a Google Maps (sin iframe). */
export function getMapsHref(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getFullAddress())}`;
}
