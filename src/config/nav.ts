export type NavItem = {
  href: string;
  label: string;
  /** Etiqueta corta, solo para el header de escritorio. Menú móvil, footer y títulos usan label. */
  shortLabel?: string;
};

/** Menú principal (5 entradas). */
export const mainNav: readonly NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/el-doctor", label: "El doctor" },
  { href: "/servicios", label: "Servicios y chequeos", shortLabel: "Servicios" },
  { href: "/primera-consulta", label: "Tu primera consulta" },
  { href: "/ubicacion", label: "Ubicación y contacto", shortLabel: "Ubicación" },
];

/** Enlaces secundarios que solo viven en el footer. */
export const footerNav: readonly NavItem[] = [
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/aviso-de-privacidad", label: "Aviso de privacidad" },
];
