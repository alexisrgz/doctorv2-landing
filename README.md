# Consultorio de medicina general (sitio de muestra)

Sitio informativo multipágina para un consultorio individual de medicina general. Marca y datos ficticios (Dr. Andrés Villaseñor Ríos, Mazatlán). Está pensado para adaptarse a otro médico cambiando solo configuración y datos.

- Next.js 16 (App Router, Turbopack) + TypeScript estricto (`strict`, `noUncheckedIndexedAccess`)
- Tailwind CSS v4 con tokens de marca en `@theme` (`src/app/globals.css`)
- `next/font` (Bricolage Grotesque y Atkinson Hyperlegible Next) y `next/image`
- Playwright + axe para pruebas de extremo a extremo y accesibilidad
- 100 % estático: sin backend, sin base de datos, sin formularios

## Requisitos

- Node.js 22.18 o superior (el script de reglas lee TypeScript con el soporte nativo de Node)
- npm 10 o superior

## Cómo correr

```bash
npm install
npm run dev                 # http://localhost:3000
```

Producción local:

```bash
npm run build
npm run start
```

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción (todas las rutas se prerenderizan) |
| `npm run check` | `typecheck` + `lint` + `check:rules` |
| `npm run check:rules` | Reglas del proyecto (`scripts/check-rules.mjs`), ver abajo |
| `npm run test:e2e` | Build + servidor en el puerto 3100 + suite Playwright |
| `npm run test:e2e:ui` | La suite en modo interactivo |
| `npm run screenshots` | Capturas para revisión manual (con el sitio corriendo en el puerto 3000) |

## Pruebas

```bash
npx playwright install chromium   # solo la primera vez
npm run test:e2e
```

Tres proyectos: móvil 390×664 (táctil, DPR 3), móvil chico 360×600 y desktop 1280×800. La suite cubre:

1. axe sin violaciones WCAG 2.x A/AA en todas las rutas (incluidos los 7 detalles de servicio y el 404).
2. Sin overflow horizontal a 360, 390, 768 y 1280.
3. Ningún texto visible menor a 12px.
4. Áreas táctiles de 48×48 o más en móvil (excepto enlaces dentro de párrafos).
5. CTAs del hero completos sin scroll a 390×664 y 360×600; el escalonado no los oculta más de 300ms.
6. Barra inferior: oculta al cargar, aparece tras el hero, no existe en desktop y no tapa el footer.
7. Estado de horario consistente (chip, tarjeta, footer y tabla) con el reloj fijado a martes 10:00, domingo y sábado 15:00.
8. Selector de variante: precio, botón, barra móvil y mensaje de WhatsApp cambian a la vez.
9. Todo enlace a WhatsApp lleva mensaje y sale de `<BookingLink>`; en modo `internal` ninguno apunta a wa.me.
10. Nunca dos imágenes con forma firma a la vez.
11. Sin fotos duplicadas en una página.
12. sitemap, robots, og:image y canonical de cada ruta; 404 para un servicio inexistente; JSON-LD por página.

Además, `e2e/lib.spec.ts` prueba `booking.ts` y `hours.ts` sin navegador.

Para correr contra un servidor ya levantado: `E2E_BASE_URL=http://localhost:3000 npx playwright test`.

## Reglas del proyecto (`npm run check:rules`)

Falla si:

- aparece `wa.me` fuera de `src/lib/booking.ts`;
- hay teléfonos, colores hex, el nombre del doctor o de la marca escritos en `src/components` o `src/app` (solo se permiten en `src/config`, `src/data` y los tokens de `globals.css`);
- hay flechas "→", `uppercase`, `italic` o `100vh` en componentes y páginas;
- los textos de `src/data` contienen promesas de salud ("el mejor", "garantiza", "antes y después"…) o avisos "ilustrativos";
- los servicios tienen slugs, variantes o fotos repetidas, relacionados inexistentes, o menos de 2 o más de 4 preguntas;
- falta algún archivo requerido.

## Desplegar en Vercel

1. Sube el repositorio a GitHub, GitLab o Bitbucket.
2. En Vercel: **Add New… > Project**, importa el repositorio. Vercel detecta Next.js; no cambies el comando de build (`next build`) ni el directorio de salida.
3. En **Environment Variables** agrega `NEXT_PUBLIC_SITE_URL` con la URL definitiva, sin diagonal final (por ejemplo `https://drvillasenor.mx`). Sin ella se usa `https://dr-villasenor.vercel.app`, que afecta canonical, sitemap, robots, Open Graph y JSON-LD.
4. **Deploy**. Si después cambias el dominio, actualiza la variable y vuelve a desplegar.

La versión de Node en Vercel debe ser 22 o superior (Project Settings > General > Node.js Version).

## Adaptar a otro doctor

Todo lo específico del negocio vive en `src/config` y `src/data`. Los componentes y las páginas no tienen textos de marca, teléfonos, horarios ni precios.

| Qué cambiar | Archivo |
| --- | --- |
| Nombre corto, descriptor, nombre completo, URL, teléfono/WhatsApp, dirección, zona horaria, aviso del footer | `src/config/site.ts` |
| Menú principal y enlaces del footer | `src/config/nav.ts` |
| Plantilla de títulos, descripción por defecto, palabras clave | `src/config/seo.ts` |
| Modo de reserva (`"whatsapp"` o `"internal"`) | `src/config/booking.ts` |
| Colores para imágenes OG (deben coincidir con `globals.css`) | `src/config/brand.ts` |
| Servicios, precios, variantes, preguntas por servicio, fotos | `src/data/services.ts` |
| Cédula, formación, trayectoria, principios, año de inicio | `src/data/doctor.ts` |
| Horario (varios rangos por día) y textos de estado | `src/data/hours.ts` |
| Pagos, seguros, estacionamiento, accesibilidad, aviso de urgencias | `src/data/practice.ts` |
| Preguntas frecuentes | `src/data/faqs.ts` |
| Testimonios (solo reales y con consentimiento) | `src/data/testimonials.ts` |
| Mensajes prellenados de WhatsApp | `src/data/booking-messages.ts` |
| Aviso de privacidad (sustituir por el del cliente) | `src/data/privacy.ts` |
| Textos de cada página | `src/data/pages/*.ts` |
| Fotos | `public/images/` según `PHOTOS.md`; alt y `focal` en `src/data/photos.ts` |
| Paleta y tipografía | tokens en `src/app/globals.css` y fuentes en `src/app/fonts.ts` |

Antes de publicar con datos reales, revisa `VALIDAR_CON_CLIENTE.md`.

## Reserva de citas (fase 2)

Toda acción de cita pasa por `getBookingHref()` en `src/lib/booking.ts` y se renderiza con `<BookingLink>`. Hoy abre WhatsApp con un mensaje prellenado. Para la agenda propia de la fase 2, cambia `BOOKING_MODE` a `"internal"` en `src/config/booking.ts`: todos los enlaces pasarán a `/agenda?servicio={slug}&variante={id}` (esa ruta aún no existe).

## Estructura

```
src/
  app/          rutas, metadata, opengraph-image, sitemap, robots, not-found
  components/   UI (servidor por defecto; cliente: menú, barra inferior, estado de horario, reserva)
  config/       marca, contacto, navegación, SEO, modo de reserva
  data/         servicios, doctor, horarios, FAQ, testimonios, textos de página
  lib/          booking, contact, hours, format, jsonld, metadata, og
  assets/fonts  fuentes WOFF para las imágenes OG (licencia OFL)
e2e/            pruebas Playwright
scripts/        check-rules.mjs, screenshots.mjs
```

Documentos: `DECISIONES.md` (decisiones y porqués), `PHOTOS.md` (fotos esperadas), `VALIDAR_CON_CLIENTE.md` (pendientes legales y de datos).
