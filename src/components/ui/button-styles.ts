type ButtonVariant = "primary" | "secondary" | "inverse";
/** "bare": sin padding, altura ni alineación, para botones con disposición propia. */
type ButtonSize = "lg" | "md" | "bare";

const base =
  "inline-flex items-center gap-2 rounded-control text-[17px] font-bold leading-tight no-underline select-none text-center";

const variants: Record<ButtonVariant, string> = {
  // Coral siempre con texto Tinta (contraste ~5:1).
  primary: "bg-coral text-ink hover:bg-coral-hover active:bg-coral-hover",
  secondary: "border-[1.5px] border-ink bg-white text-ink hover:bg-mist active:bg-mist",
  // Para bandas Tinta.
  inverse: "border-[1.5px] border-white text-white hover:bg-white/10 active:bg-white/10",
};

const sizes: Record<ButtonSize, string> = {
  lg: "min-h-[52px] justify-center px-5",
  md: "min-h-12 justify-center px-4",
  bare: "",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "lg", extra = ""): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}
