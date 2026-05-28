# diseño-de-casa

Sistema de cotizaciones profesionales para construcción y renovación de viviendas.

## Stack

- React 18
- TypeScript
- Tailwind CSS v4
- Vite
- Zustand
- jsPDF

## Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Tests
npm run test
```

## Deploy en Vercel

### Opción 1: Deploy desde GitHub

1. Sube el repositorio a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa el repositorio
4. Vercel detectará automáticamente la configuración de Vite
5. Haz clic en "Deploy"

### Opción 2: Deploy con Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Opción 3: Deploy con vercel.json

Crea un archivo `vercel.json` en la raíz:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── ui/           # Componentes base (MetricCard, Badge, Tabs, etc.)
│   ├── layout/       # Header, Footer, PricePanel
│   ├── floor-plan/   # FloorPlan, Room, DimensionLine
│   └── quotation/    # MaterialTable, TotalsBox, RoomCard
├── hooks/            # useCalculator, useQuotation, usePDF
├── store/            # Zustand store con persistencia
├── types/            # TypeScript interfaces
├── templates/        # ApartmentV1, ApartmentV2, BathroomV3
└── styles/           # Animaciones CSS
```

## Características

- ✅ 3 cotizaciones profesionales
- ✅ Floor plans SVG interactivos
- ✅ Cálculos automáticos
- ✅ Precios editables
- ✅ Exportación PDF
- ✅ Persistencia localStorage
- ✅ Animaciones suaves
- ✅ Responsive mobile-first
- ✅ Dark theme profesional
- ✅ 22 tests pasando

## Licencia

MIT
