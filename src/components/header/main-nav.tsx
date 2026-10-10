"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/config/nav";

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavLinksProps = {
  items: readonly NavItem[];
  /** Clases de cada enlace. */
  linkClassName: string;
  /** Clases extra del enlace activo (los inactivos llevan no-underline). */
  activeClassName?: string;
  onNavigate?: () => void;
};

/** Lista de enlaces con aria-current según la ruta actual. */
export function NavLinks({ items, linkClassName, activeClassName = "", onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`${linkClassName} ${active ? activeClassName : "no-underline"}`}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}
