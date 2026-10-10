// Reglas del proyecto. Se amplía en la fase 2.
import { existsSync } from "node:fs";

const required = ["src/app/globals.css", "src/app/layout.tsx", "README.md", "DECISIONES.md"];
const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  console.error("Faltan archivos requeridos:\n" + missing.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}
console.log("check-rules: OK");
