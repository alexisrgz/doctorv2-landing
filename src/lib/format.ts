import { site } from "@/config/site";
import { labels } from "@/data/pages/common";

const priceFormatter = new Intl.NumberFormat(site.locale, {
  style: "currency",
  currency: site.currency,
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
});

/** 1200 -> "$1,200" */
export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}

/** 40 -> "40 min"; {30, 40} -> "30 a 40 min" */
export function formatDuration(min: number, max: number = min): string {
  return min === max ? `${min} ${labels.minutes}` : `${min} a ${max} ${labels.minutes}`;
}
