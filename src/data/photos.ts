/**
 * Fotos que no pertenecen a un servicio. Las de servicios viven en services.ts.
 * La lista completa, con descripción de escena, está en PHOTOS.md.
 */
import type { PhotoRatio } from "@/lib/photo-types";

export type PhotoSpec = {
  name: string;
  alt: string;
  ratio: PhotoRatio;
  focal?: string;
};

export const photos = {
  heroDoctor: {
    name: "hero-doctor",
    alt: "El doctor, con bata blanca, sonríe en su consultorio iluminado por luz natural",
    ratio: "4:3",
    focal: "60% 30%",
  },
  doctorHome: {
    name: "doctor-inicio",
    alt: "El doctor conversa con un paciente mayor en el consultorio",
    ratio: "4:5",
    focal: "50% 35%",
  },
  doctorPortrait: {
    name: "doctor-retrato",
    alt: "Retrato del doctor con bata blanca junto a la ventana del consultorio",
    ratio: "4:5",
    focal: "50% 25%",
  },
  officeReception: {
    name: "consultorio-recepcion",
    alt: "Recepción del consultorio con escritorio de madera clara y plantas",
    ratio: "3:2",
    focal: "50% 50%",
  },
  officeConsult: {
    name: "consultorio-consulta",
    alt: "Sala de consulta con escritorio, mesa de exploración y ventana amplia",
    ratio: "3:2",
    focal: "50% 50%",
  },
  officeDetail: {
    name: "consultorio-detalle",
    alt: "Estetoscopio y libreta sobre el escritorio del consultorio",
    ratio: "3:2",
    focal: "50% 50%",
  },
  officeEntrance: {
    name: "consultorio-entrada",
    alt: "Entrada del consultorio a nivel de calle, con rampa de acceso",
    ratio: "3:2",
    focal: "50% 60%",
  },
  officeWaiting: {
    name: "consultorio-sala-espera",
    alt: "Sala de espera con sillas cómodas y luz natural",
    ratio: "3:2",
    focal: "50% 50%",
  },
  firstVisit: {
    name: "primera-consulta",
    alt: "Una paciente llega a la recepción y entrega sus estudios previos",
    ratio: "3:2",
    focal: "50% 45%",
  },
} as const satisfies Record<string, PhotoSpec>;
