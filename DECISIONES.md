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
- Header: navegación completa desde 1280px; entre 1024 y 1279px se muestran marca + "Agendar cita" + botón de menú, porque las 5 entradas no caben junto al botón sin bajar el texto a menos de 15px.
- Menú móvil con `<dialog>` modal (`showModal`): el navegador aporta el focus trap, Esc y el fondo inerte; se cierra al navegar y al cambiar de ruta.
- La barra inferior móvil se monta por página (no en el layout) porque el detalle de servicio usa su propia barra "Agendar · {servicio}" con el estado de la variante.
- El espacio de la barra inferior se reserva como padding inferior del footer (banda Tinta) en lugar de en el body, para que no quede una franja blanca bajo el footer; el efecto es el mismo: la barra nunca tapa contenido.
- `<OpenStatus>` y la tabla de horarios usan `useSyncExternalStore` con snapshot de servidor `null`: el HTML del servidor dice "Consultando horario…" y el cliente calcula después de hidratar, sin hydration mismatch, revisando el minuto cada 15 s.
- Tarjetas de servicio: toda la tarjeta es el enlace, con `aria-labelledby` al nombre y `aria-describedby` al resumen, para que el nombre accesible sea corto y el área táctil sea grande.
- Selector de variante con radios nativos (teclado y lectores de pantalla sin código extra); segmentos con radio 10px dentro del contenedor de 14px (radios concéntricos).
- `shortName` opcional en servicios, para que "Agendar · {servicio}" quepa en la barra móvil a 360px.
- Imágenes OG con ImageResponse y las fuentes de marca en WOFF (`src/assets/fonts`, licencia OFL incluida): Satori no lee WOFF2.
- Favicon generado (`icon.tsx`) con la inicial del apellido tomada de la config, en lugar del favicon de Next del scaffold.
- Detalle de servicio: `dynamicParams = false` y `generateStaticParams` en la página y en su `opengraph-image`, para que todo sea estático y una URL desconocida dé 404.
- Revelado del hero con `clip-path: inset(9% 12% 14% 0)` a `inset(0)` (700ms): la foto es visible desde el primer cuadro, así el revelado no retrasa el LCP como lo haría partir de un recorte total.
- Escalonado del hero: título 0ms, subtítulo 80ms, CTAs 160ms (máximo 250ms); los CTAs empiezan a verse a los 160ms y quedan completos antes de 500ms.
- Acordeón con `::details-content` + `interpolate-size` (solo CSS): donde no hay soporte, abre sin animación.
- Con `prefers-reduced-motion: reduce` se anulan todas las animaciones y transiciones, y el scroll suave.
- En tablet (768px) la sección del doctor en Inicio pasa a dos columnas y los CTAs del hero dejan de ocupar todo el ancho, para no tener una foto de 900px de alto ni botones desproporcionados.
- Auditoría de la fase 6: la skill `ui-ux-pro-max` no está instalada en este entorno y el documento prohíbe usar otras skills de diseño, así que la auditoría de UX y accesibilidad se hizo a mano con su lista habitual (foco, contraste, áreas táctiles, cursor, retardo táctil, enlaces externos, movimiento reducido, estados de carga, longitud de línea, z-index). Correcciones aplicadas: `cursor: pointer` en botones, radios y summary (Tailwind v4 lo quita); `touch-action: manipulation`; aviso "(se abre en otra pestaña)" para lectores de pantalla en "Cómo llegar"; carruseles de fotos enfocables con teclado (axe `scrollable-region-focusable`); ancho mínimo de 48px en enlaces del footer.
- Prueba del modo "internal": además de las pruebas de `getBookingHref(…, "internal")`, la suite verifica en el DOM que todo enlace a wa.me sale de `<BookingLink>` (atributo `data-booking`) y que el mismo pedido, en modo "internal", no produce wa.me. Así no hace falta un segundo build con la constante cambiada.
- La prueba de "CTAs visibles sin scroll" corre con movimiento reducido (layout final); una prueba aparte, con movimiento activo, verifica que el retraso del escalonado de los CTAs sea de 250ms o menos y que terminen opacos.
- `public/images/.gitkeep`: la carpeta de fotos existe vacía; el sitio se ve completo con placeholders.

## Correcciones tras el despliegue

- Grupo A: `getSiteUrl()` en `src/lib/site-url.ts` es la única fuente de la URL base (NEXT_PUBLIC_SITE_URL → `https://${VERCEL_PROJECT_PRODUCTION_URL}` → `http://localhost:3000`). Se quitó `url` de `src/config/site.ts`, porque ahí no había forma de leer la variable de Vercel sin duplicar la lógica. `absoluteUrl()` vive junto a ella y la usan metadataBase, canonical/og:url (ahora absolutos), sitemap, robots y JSON-LD; la og:image se resuelve con metadataBase.
- Grupo A: `check-rules` falla si `vercel.app`, `localhost` o esas variables de entorno aparecen fuera de `site-url.ts`.
- Grupo A: la prueba compara contra `getSiteUrl()` evaluada en el proceso de Playwright, que es el mismo entorno con el que el `webServer` hace el build.
- Grupo B: la visibilidad de la barra inferior vive en un solo hook, `useBarVisibility({ fromStart, hideWhileFullyVisible })`, que reemplaza a `useAfterHero`. En el detalle de servicio la barra arranca visible (también en el HTML del servidor) y se oculta solo mientras el contenedor del botón "Agendar" de la tarjeta (`[data-bar-anchor]`) está completo en el viewport (IntersectionObserver con umbral 0.99).
- Grupo B: `shortName` ahora es obligatorio en los 7 servicios con los valores pedidos. Línea 1 "Agendar · {shortName}" en 700, sin truncar: si no cabe, hace salto de línea (con "Chequeo escolar y deportivo" a 360px ocupa dos líneas). Línea 2 en 14px con `truncate`: etiqueta de variante si hay varias; si hay una sola, la duración ("40 min · $750"). El botón de la tarjeta usa las mismas dos líneas para que no haya dos formatos. El mensaje de WhatsApp sigue usando `name`.
- Grupo B: el ícono de llamar medía 10px porque `buttonClasses("lg")` siempre metía `px-5` y el `px-0` extra perdía según el orden del CSS generado (en un botón de 52px quedaban ~12px para el ícono). Se agregó el tamaño `"bare"` (sin padding, altura ni `justify`) para botones con disposición propia; `justify-center` pasó de la base a los tamaños `lg`/`md`. Botón de llamar: 52×52, ícono de 22px con `shrink-0`, `aria-label="Llamar"`.
- Grupo C: la barra se oculta mientras cualquier `[data-bar-stop]` interseca el viewport. Lo llevan el CTA de cierre (prop `barStop` de `<Section>`) y el footer. Es una condición más dentro de `useBarVisibility`, así que aplica a todas las páginas con barra, incluido el detalle de servicio (que no tiene CTA de cierre, solo footer). La barra es `fixed` y se oculta con `transform`/`visibility`, así que no mueve el layout; la prueba compara `scrollHeight` antes y después.
- Grupo C: se mantiene la reserva de espacio inferior del footer en móvil (no estaba en la lista de cambios), aunque ahora la barra ya no llega a cubrirlo.
- Grupo D: `columnsFor(n)` (src/components/card-grid.ts) elige las columnas según el número de tarjetas: primero una división exacta (4, 3, 2) y si no hay, 4 o 3 sin dejar una tarjeta sola (5→3, 7→4). Clases: 4 → 2 columnas de 640 a 1023px y 4 desde 1024; 3 → 3 desde 768 (2 columnas dejarían una huérfana); 2 → 2 desde 640. Con los datos actuales: Consultas y seguimiento (4) en 4 columnas y Chequeos preventivos (3) en 3.
- Grupo D: el formato de duración y precio lo decide la rejilla, no la tarjeta: `metaLayoutFor(n)` da "stacked-lg" (dos filas fijas desde 1024px) solo cuando la rejilla es de 4 columnas, y "inline" (una fila, sin salto) en las demás. Lo usan /servicios y los destacados de Inicio; los relacionados (2) quedan en línea. Las tarjetas tienen `h-full` con el bloque de precio al fondo, así que las alturas se alinean por fila.
- Grupo D: en "Quién te atiende" los datos van en una rejilla de 2 columnas: Cédula y Años de práctica comparten fila y Enfoque ocupa la fila completa (también en móvil, donde caben).
