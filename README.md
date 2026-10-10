# Consultorio de medicina general (sitio de muestra)

Sitio informativo multipágina para un consultorio individual de medicina general. Marca y datos ficticios (Dr. Andrés Villaseñor Ríos, Mazatlán).

Stack: Next.js (App Router) + TypeScript estricto + Tailwind CSS v4 + next/font + next/image. Pruebas con Playwright y axe.

> Este README se completa en la fase 6.

## Requisitos

- Node.js 22.18 o superior
- npm 10 o superior

## Cómo correr

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run check` | Typecheck + ESLint + reglas del proyecto (`scripts/check-rules.mjs`) |
| `npm run test:e2e` | Build + servidor + suite Playwright (móvil 390×664, móvil 360×600, desktop 1280×800) |
