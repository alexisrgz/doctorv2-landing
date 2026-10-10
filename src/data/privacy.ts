/**
 * Aviso de privacidad: PLANTILLA GENÉRICA.
 * El cliente debe sustituir este texto por el que redacte con su asesor legal
 * conforme a la ley de protección de datos personales vigente (ver VALIDAR_CON_CLIENTE.md).
 */
import { site } from "@/config/site";

export type PrivacySection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  list?: readonly string[];
};

const fullAddress = `${site.address.street}, ${site.address.neighborhood}, ${site.address.city}, ${site.address.state}, C.P. ${site.address.postalCode}`;

export const privacyNotice = {
  updatedAt: "9 de octubre de 2026",
  intro: `Este aviso explica qué datos personales se recaban en el consultorio del ${site.doctor.fullName}, para qué se usan y cómo puedes ejercer tus derechos sobre ellos.`,
  sections: [
    {
      id: "responsable",
      title: "Responsable",
      paragraphs: [
        `${site.doctor.fullName}, con domicilio en ${fullAddress}, es responsable del tratamiento de tus datos personales.`,
      ],
    },
    {
      id: "datos",
      title: "Datos que se recaban",
      paragraphs: [
        "Al escribir por WhatsApp para agendar: tu nombre, tu número de teléfono y el motivo general de la cita.",
        "En consulta, además:",
      ],
      list: [
        "Datos de identificación y contacto",
        "Antecedentes de salud, padecimientos, medicamentos y resultados de estudios (datos sensibles)",
        "Datos de facturación, si solicitas factura",
      ],
    },
    {
      id: "finalidades",
      title: "Para qué se usan",
      paragraphs: ["Finalidades necesarias para tu atención:"],
      list: [
        "Agendar, confirmar y, en su caso, reprogramar tus citas",
        "Integrar y resguardar tu expediente clínico",
        "Brindarte atención médica y dar seguimiento a tus indicaciones",
        "Emitir recibos y facturas",
      ],
    },
    {
      id: "transferencias",
      title: "Transferencias",
      paragraphs: [
        "Tus datos no se venden ni se comparten con terceros para fines comerciales. Solo se comunican cuando la ley lo exige o cuando tú lo autorizas por escrito, por ejemplo, para enviar un resumen clínico a otro médico.",
      ],
    },
    {
      id: "derechos",
      title: "Tus derechos",
      paragraphs: [
        "Puedes acceder a tus datos, rectificarlos si son inexactos, cancelarlos cuando ya no sean necesarios u oponerte a su uso para fines específicos. También puedes revocar tu consentimiento.",
      ],
    },
    {
      id: "contacto",
      title: "Cómo ejercer tus derechos",
      paragraphs: [
        `Envía tu solicitud por escrito al domicilio del consultorio o por WhatsApp al ${site.phone.display}, con tu nombre, una forma de contactarte y la descripción de lo que solicitas. Recibirás respuesta en los plazos que marca la ley.`,
      ],
    },
    {
      id: "cambios",
      title: "Cambios a este aviso",
      paragraphs: [
        "Este aviso puede actualizarse. La versión vigente siempre estará publicada en esta página, con su fecha de actualización.",
      ],
    },
  ] satisfies PrivacySection[],
} as const;
