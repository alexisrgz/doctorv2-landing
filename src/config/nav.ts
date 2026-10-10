export type NavItem = {
  href: string;
  label: string;
};

/** Menú principal (5 entradas). */
export const mainNav: readonly NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios y chequeos" },
  { href: "/el-doctor", label: "El doctor" },
  { href: "/primera-consulta", label: "Tu primera consulta" },
  { href: "/ubicacion", label: "Ubicación y contacto" },
];

/** Enlaces secundarios que solo viven en el footer. */
export const footerNav: readonly NavItem[] = [
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/aviso-de-privacidad", label: "Aviso de privacidad" },
];
