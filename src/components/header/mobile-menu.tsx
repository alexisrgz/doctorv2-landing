"use client";

import { Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { mainNav } from "@/config/nav";
import { actions } from "@/data/pages/common";
import { BookingLink } from "../booking-link";
import { CallLink } from "../call-link";
import { WhatsAppIcon } from "../icons/whatsapp-icon";
import { buttonClasses } from "../ui/button-styles";
import { NavLinks } from "./main-nav";

const MENU_ID = "menu-principal";

/**
 * Menú a pantalla completa con <dialog> modal: el navegador aporta el focus trap,
 * Esc para cerrar y el fondo inerte. Se cierra al navegar.
 */
export function MobileMenu({ brand, footer }: { brand: ReactNode; footer?: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar al navegar (incluye el enlace de la marca dentro del panel).
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-expanded={open}
        aria-controls={MENU_ID}
        aria-haspopup="dialog"
        className="-mr-2 inline-flex size-12 items-center justify-center rounded-control text-ink hover:bg-mist xl:hidden"
      >
        <Menu aria-hidden="true" className="size-6" />
        <span className="sr-only">Abrir menú</span>
      </button>

      <dialog
        ref={dialogRef}
        id={MENU_ID}
        aria-label="Menú"
        onClose={() => setOpen(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-white p-0 text-ink backdrop:bg-ink/40"
      >
        <div className="flex min-h-full flex-col pb-[calc(24px+env(safe-area-inset-bottom))]">
          <div className="container-page flex h-14 shrink-0 items-center justify-between border-b border-line lg:h-[72px]">
            {brand}
            <button
              type="button"
              onClick={close}
              className="-mr-2 inline-flex size-12 items-center justify-center rounded-control hover:bg-mist"
            >
              <X aria-hidden="true" className="size-6" />
              <span className="sr-only">Cerrar menú</span>
            </button>
          </div>

          <nav aria-label="Principal" className="container-page pt-4">
            <ul className="flex flex-col">
              <NavLinks
                items={mainNav}
                onNavigate={close}
                linkClassName="flex min-h-14 items-center border-b border-line font-display text-[24px] leading-tight font-bold tracking-[-0.02em] text-ink"
                activeClassName="underline decoration-2 underline-offset-[6px]"
              />
            </ul>
          </nav>

          <div className="container-page mt-8 flex flex-col gap-3">
            <BookingLink source="menu" className={buttonClasses("primary", "lg", "w-full")}>
              <WhatsAppIcon />
              {actions.book}
            </BookingLink>
            <CallLink className={buttonClasses("secondary", "lg", "w-full")}>
              <Phone aria-hidden="true" className="size-5" />
              {actions.call}
            </CallLink>
          </div>

          {footer ? <div className="container-page mt-auto pt-8">{footer}</div> : null}
        </div>
      </dialog>
    </>
  );
}
