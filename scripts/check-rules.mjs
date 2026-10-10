// Reglas del proyecto (parte de `npm run check`).
// Lee la config y los datos en TypeScript con el soporte nativo de Node (>= 22.18).
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const errors = [];
const fail = (message) => errors.push(message);
const rel = (file) => relative(root, file).split(sep).join("/");

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const CODE_EXT = /\.(ts|tsx|js|jsx|mjs|css)$/;
const srcFiles = walk(join(root, "src")).filter((file) => CODE_EXT.test(file));
const read = (file) => readFileSync(file, "utf8");

// Comentarios fuera: las reglas aplican al código, no a la documentación interna.
function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
}

function report(file, source, regex, message) {
  const lines = source.split("\n");
  lines.forEach((line, index) => {
    if (regex.test(line)) fail(`${rel(file)}:${index + 1} ${message}: ${line.trim().slice(0, 120)}`);
    regex.lastIndex = 0;
  });
}

const { site } = await import(pathToFileURL(join(root, "src/config/site.ts")).href);
const { services } = await import(pathToFileURL(join(root, "src/data/services.ts")).href);

// 1. "wa.me" solo puede aparecer en src/lib/booking.ts
for (const file of srcFiles) {
  if (rel(file) === "src/lib/booking.ts") continue;
  report(file, read(file), /wa\.me/, 'enlace de WhatsApp fuera de src/lib/booking.ts');
}

// 1b. La URL base solo se resuelve en src/lib/site-url.ts
for (const file of srcFiles) {
  if (rel(file) === "src/lib/site-url.ts") continue;
  const source = stripComments(read(file));
  report(file, source, /vercel\.app|NEXT_PUBLIC_SITE_URL|VERCEL_PROJECT_PRODUCTION_URL|localhost/, "URL base fuera de getSiteUrl()");
}

// 2. Nada de marca, teléfonos ni colores hardcodeados en componentes y páginas
const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const familyName = site.doctor.familyName.split(" ")[0];
const brandTerms = [
  site.name,
  site.doctor.fullName,
  familyName,
  familyName.normalize("NFD").replace(/[̀-ͯ]/g, ""),
];
const brandRegex = new RegExp(brandTerms.map(escape).join("|"), "i");
const phoneDigits = site.phone.whatsapp;
const phoneRegex = new RegExp(
  [
    escape(site.phone.e164),
    escape(site.phone.display),
    phoneDigits,
    phoneDigits.slice(-10),
    String.raw`\b\d{3}[\s.-]\d{3}[\s.-]\d{4}\b`,
  ].join("|"),
);
const hexRegex = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/;

const uiFiles = srcFiles.filter((file) => {
  const path = rel(file);
  return (path.startsWith("src/components/") || path.startsWith("src/app/")) && path !== "src/app/globals.css";
});

for (const file of uiFiles) {
  const source = stripComments(read(file));
  report(file, source, brandRegex, "nombre del doctor o de la marca hardcodeado (usa src/config o src/data)");
  report(file, source, phoneRegex, "teléfono hardcodeado (usa src/config/site.ts)");
  report(file, source, hexRegex, "color hex hardcodeado (usa los tokens de globals.css)");
  report(file, source, /→/, 'flecha "→" prohibida');
  report(file, source, /(?<![-\w])uppercase\b/, "texto en MAYÚSCULAS prohibido");
  report(file, source, /(?<![-\w])italic\b/, "cursivas prohibidas");
  report(file, source, /100vh|h-screen|min-h-screen/, "usa svh/dvh en lugar de 100vh");
}

// 3. Lenguaje de salud responsable en los textos
const dataFiles = srcFiles.filter((file) => rel(file).startsWith("src/data/"));
const claimRegex =
  /\b(el|la|los|las) mejor(es)?\b|garantiza|garantía de|antes y después|cura definitiva|\bte curamos\b|100\s?%|milagr|resultados asegurados/i;
for (const file of dataFiles) {
  const source = stripComments(read(file));
  report(file, source, claimRegex, "afirmación de salud no permitida");
  report(file, source, /→/, 'flecha "→" prohibida');
  report(file, source, /ilustrativ/i, 'aviso "ilustrativo" (el único aviso vive en site.demoNotice)');
}

// 4. Integridad de los servicios
const slugs = new Set();
for (const service of services) {
  if (slugs.has(service.slug)) fail(`services: slug duplicado ${service.slug}`);
  slugs.add(service.slug);
  if (service.faqs.length < 2 || service.faqs.length > 4)
    fail(`services: ${service.slug} debe tener de 2 a 4 preguntas frecuentes (tiene ${service.faqs.length})`);
  if (service.variants.length < 1) fail(`services: ${service.slug} no tiene variantes`);
  const ids = service.variants.map((variant) => variant.id);
  if (new Set(ids).size !== ids.length) fail(`services: ${service.slug} tiene ids de variante repetidos`);
}
for (const service of services) {
  for (const related of service.related) {
    if (!slugs.has(related)) fail(`services: ${service.slug} apunta a un relacionado inexistente: ${related}`);
    if (related === service.slug) fail(`services: ${service.slug} se relaciona consigo mismo`);
  }
}
const photoNames = services.map((service) => service.photo.name);
if (new Set(photoNames).size !== photoNames.length) fail("services: hay fotos de servicio repetidas");

// 5. Archivos requeridos
const required = [
  "README.md",
  "DECISIONES.md",
  "PHOTOS.md",
  "VALIDAR_CON_CLIENTE.md",
  "src/app/globals.css",
  "src/app/layout.tsx",
  "src/config/site.ts",
  "src/config/booking.ts",
  "src/config/nav.ts",
  "src/config/seo.ts",
  "src/data/services.ts",
  "src/data/doctor.ts",
  "src/data/faqs.ts",
  "src/data/testimonials.ts",
  "src/data/hours.ts",
  "src/data/booking-messages.ts",
  "src/lib/booking.ts",
  "src/lib/contact.ts",
  "src/lib/hours.ts",
  "src/lib/jsonld.ts",
  "src/components/photo.tsx",
  "src/components/booking-link.tsx",
  "src/components/open-status.tsx",
  "src/components/service-booking.tsx",
  "src/app/page.tsx",
  "src/app/servicios/page.tsx",
  "src/app/servicios/[slug]/page.tsx",
  "src/app/el-doctor/page.tsx",
  "src/app/primera-consulta/page.tsx",
  "src/app/ubicacion/page.tsx",
  "src/app/preguntas-frecuentes/page.tsx",
  "src/app/aviso-de-privacidad/page.tsx",
  "src/app/not-found.tsx",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/app/opengraph-image.tsx",
];
for (const file of required) {
  if (!existsSync(join(root, file))) fail(`falta el archivo requerido: ${file}`);
}

if (errors.length) {
  console.error(`check-rules: ${errors.length} problema(s)\n` + errors.map((error) => `  - ${error}`).join("\n"));
  process.exit(1);
}
console.log(`check-rules: OK (${srcFiles.length} archivos revisados)`);
