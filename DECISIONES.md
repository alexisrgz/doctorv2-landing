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
