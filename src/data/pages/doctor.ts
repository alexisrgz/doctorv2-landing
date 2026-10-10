import { doctor } from "../doctor";

export const doctorPage = {
  meta: {
    title: "El doctor",
    description: `${doctor.role} con enfoque en medicina preventiva y seguimiento familiar. Formación, trayectoria y forma de trabajo.`,
  },
  lead: "Médico general con enfoque en medicina preventiva y seguimiento familiar.",
  sections: {
    education: "Formación",
    timeline: "Trayectoria",
    principles: "Cómo atiende",
    principlesIntro: "Tres principios que guían cada consulta.",
    office: "El consultorio",
    officeIntro: "Un espacio tranquilo y luminoso, en planta baja y con acceso por rampa.",
  },
} as const;
