/**
 * Pruebas de utilidades (sin navegador). Corren solo en el proyecto desktop.
 */
import { expect, test } from "@playwright/test";
import { getBookingHref, getBookingMessage, isExternalBooking } from "../src/lib/booking";
import { getOpenStatus, getWeekSchedule } from "../src/lib/hours";
import { services } from "../src/data/services";

test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Pruebas de utilidades: basta un proyecto");
});

// Mazatlán es UTC-7 todo el año.
const at = (iso: string) => new Date(`${iso}-07:00`);

test.describe("booking", () => {
  test("whatsapp: mensaje general y por servicio", () => {
    const general = new URL(getBookingHref({}, "whatsapp"));
    expect(general.hostname).toBe("wa.me");
    expect(general.searchParams.get("text")).toContain("me gustaría agendar una cita");

    const href = new URL(getBookingHref({ service: "consulta-general", variant: "seguimiento" }, "whatsapp"));
    expect(href.searchParams.get("text")).toBe(
      "Hola, me gustaría agendar: Consulta general (Consulta de seguimiento). ¿Qué horarios tienen disponibles?",
    );
  });

  test("internal: ningún enlace apunta a wa.me", () => {
    expect(isExternalBooking("internal")).toBe(false);
    expect(getBookingHref({}, "internal")).toBe("/agenda");
    for (const service of services) {
      for (const variant of service.variants) {
        const href = getBookingHref({ service: service.slug, variant: variant.id, source: "test" }, "internal");
        expect(href).not.toContain("wa.me");
        expect(href).toBe(`/agenda?servicio=${service.slug}&variante=${variant.id}`);
      }
    }
  });

  test("variante desconocida usa la primera", () => {
    expect(getBookingMessage({ service: "certificado-medico", variant: "x" })).toContain("(Escolar o laboral)");
  });
});

test.describe("hours", () => {
  test("martes 10:00 abierto", () => {
    const status = getOpenStatus(at("2026-10-13T10:00:00"));
    expect(status.isOpen).toBe(true);
    expect(status.today).toBe(2);
    expect(status.message).toBe("Abierto hoy hasta las 19:00");
  });

  test("domingo cerrado, abre mañana", () => {
    const status = getOpenStatus(at("2026-10-11T12:00:00"));
    expect(status.isOpen).toBe(false);
    expect(status.message).toBe("Cerrado ahora. Abre mañana a las 9:00");
  });

  test("sábado 15:00 cerrado, abre el lunes", () => {
    const status = getOpenStatus(at("2026-10-10T15:00:00"));
    expect(status.isOpen).toBe(false);
    expect(status.today).toBe(6);
    expect(status.message).toBe("Cerrado ahora. Abre el lunes a las 9:00");
  });

  test("antes de abrir y al cierre exacto", () => {
    expect(getOpenStatus(at("2026-10-13T08:30:00")).message).toBe("Cerrado ahora. Abre hoy a las 9:00");
    expect(getOpenStatus(at("2026-10-13T19:00:00")).isOpen).toBe(false);
  });

  test("semana empieza en lunes y domingo cerrado", () => {
    const week = getWeekSchedule();
    expect(week[0]?.name).toBe("Lunes");
    expect(week[6]?.text).toBe("Cerrado");
    expect(week[5]?.text).toBe("9:00 a 14:00");
  });
});
