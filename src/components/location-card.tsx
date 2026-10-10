import { MapPin, Navigation, Phone } from "lucide-react";
import { actions, labels, srNotes } from "@/data/pages/common";
import { practice } from "@/data/practice";
import { getAddressLines, getMapsHref, getPhoneDisplay } from "@/lib/contact";
import { CallLink } from "./call-link";
import { OpenStatus } from "./open-status";
import { buttonClasses } from "./ui/button-styles";

/** Tarjeta de ubicación: dirección, estado de horario y acciones directas. */
export function LocationCard({ showPhone = false, className = "" }: { showPhone?: boolean; className?: string }) {
  const [line1, line2] = getAddressLines();
  return (
    <div data-testid="location-card" className={`rounded-soft border border-line bg-white p-5 sm:p-6 ${className}`}>
      <OpenStatus variant="inline" data-testid="location-open-status" />
      <div className="mt-5 flex gap-3">
        <MapPin aria-hidden="true" className="mt-0.5 size-6 shrink-0" />
        <div>
          <p className="sr-only">{labels.address}</p>
          <address className="not-italic">
            {line1}
            <br />
            {line2}
          </address>
          <p className="mt-1 text-meta text-slate">{practice.directionsHint}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={getMapsHref()}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("secondary", "md", "sm:flex-1")}
        >
          <Navigation aria-hidden="true" className="size-5" />
          {actions.directions}
          <span className="sr-only">{srNotes.newTab}</span>
        </a>
        {showPhone ? (
          <CallLink className={buttonClasses("secondary", "md", "sm:flex-1")}>
            <Phone aria-hidden="true" className="size-5" />
            {getPhoneDisplay()}
          </CallLink>
        ) : null}
      </div>
    </div>
  );
}
