/**
 * Testimonios ficticios. Solo hablan de trato, tiempo y claridad;
 * nunca de diagnósticos ni de mejoría de una condición.
 */
export type Testimonial = {
  quote: string;
  author: string;
  context: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    quote: "Nunca sentí prisa. Me dejó contarle todo y al final me explicó cada indicación con calma.",
    author: "Mariana G.",
    context: "Paciente desde 2021",
  },
  {
    quote: "Escribí por WhatsApp en la mañana y me dieron cita esa misma tarde. Me atendieron a la hora acordada.",
    author: "Jorge L.",
    context: "Paciente desde 2023",
  },
  {
    quote: "Me explicó mis estudios con palabras sencillas y me dio todo por escrito. Salí sin dudas.",
    author: "Lucía P.",
    context: "Paciente desde 2022",
  },
];
