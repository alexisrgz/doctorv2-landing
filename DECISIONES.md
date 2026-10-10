# Decisiones

Una línea por decisión, con el porqué.

- Repositorio git propio en la carpeta del proyecto (`git init`): la carpeta estaba dentro de un repo en `C:\Users\isent` con cambios ajenos en stage; así los commits del sitio no se mezclan con ese repo.
- Next.js 16.4 (última estable) con Turbopack y el loader `@tailwindcss/turbopack` que trae el scaffold: es la configuración oficial actual y evita PostCSS.
- `cacheComponents` y `partialPrefetching` desactivados: el sitio es 100 % estático y esas opciones solo añaden reglas de Suspense/datos en tiempo de petición sin beneficio aquí.
- Atkinson Hyperlegible Next sí está disponible en `next/font/google` de esta versión, así que se usa (sin fallback a la versión original).
- Bricolage Grotesque se carga como fuente variable con eje `opsz` (requisito de `next/font` para declarar ejes) y se usa en peso 700.
- Tailwind v4 con `--color-*: initial` y sin sombras: solo existen los colores de marca, para que no se cuele un gris o un color fuera del sistema.
- Playwright corre con `reducedMotion: "reduce"` por defecto para medir layout final; el movimiento del hero se prueba aparte con movimiento activo.
- `adjustFontFallback: false` en Atkinson Hyperlegible Next: next/font no tiene métricas para generar el fallback ajustado y emitía un warning; se declara un fallback de sistema explícito.
- 16 fotos en lugar de 14 (`doctor-inicio`, `consultorio-sala-espera`): con la regla "ninguna foto se repite entre páginas salvo la de un servicio", 14 no alcanzaban para la sección del doctor en Inicio (el retrato es de El doctor) ni para 2 fotos en Ubicación (las 3 del consultorio son de El doctor).
- Nombres de foto por servicio: `servicio-{slug}`, para que el nombre se derive del dato y no se repita.
- `<Photo priority>` se traduce a `preload` de `next/image`: en Next 16 `priority` está deprecado.
- Instituciones de la trayectoria inventadas y genéricas (Universidad Costa del Pacífico, Hospital Regional Bahía Sur, Instituto de Educación Médica Continua del Noroeste); marcadas para validar.
- Años de práctica calculados desde `practiceSince` (2012) al momento del build, para que no queden desactualizados.
- `getBookingHref(request, mode = BOOKING_MODE)` acepta el modo como segundo parámetro: permite probar el modo "internal" sin cambiar la constante ni reconstruir el sitio; la constante sigue siendo la única fuente en producción.
- El modo "internal" genera `/agenda?servicio={slug}&variante={id}` (sin `source`, como pide la especificación); `source` se usa solo como atributo `data-booking-source` para medición.
- Mensajes de estado de horario: "Abierto hoy hasta las 19:00" y "Cerrado ahora. Abre … a las …" (punto en lugar de "·", para no usar textos tipo "A · B").
- `scripts/check-rules.mjs` importa `src/config/site.ts` y `src/data/services.ts` con el soporte nativo de TypeScript de Node (≥ 22.18), para derivar los términos prohibidos de la config y no duplicarlos. Además de lo pedido, bloquea "→", `uppercase`, `italic`, `100vh` y frases de publicidad de salud prohibidas.
- Pruebas de utilidades (booking y horarios) dentro de Playwright, sin navegador, para no añadir otro runner.
