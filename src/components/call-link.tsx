import type { ReactNode } from "react";
import { getCallHref } from "@/lib/contact";

type CallLinkProps = {
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
  "data-testid"?: string;
};

/** Enlace directo para llamar al consultorio. */
export function CallLink({ className, children, ...rest }: CallLinkProps) {
  return (
    <a href={getCallHref()} className={className} {...rest}>
      {children}
    </a>
  );
}
