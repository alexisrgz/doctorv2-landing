/**
 * Plantillas de los mensajes prellenados de WhatsApp.
 * Variables: {doctor}, {servicio}, {variante}.
 */
export const bookingMessages = {
  general: "Hola, vi la página del {doctor} y me gustaría agendar una cita. ¿Qué horarios tienen disponibles?",
  service: "Hola, me gustaría agendar: {servicio} ({variante}). ¿Qué horarios tienen disponibles?",
} as const;

export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
