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
├── templates/        # ApartmentV1, ApartmentV2, BathroomV3
├── types/            # TypeScript interfaces
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

## Deploy en Vercel

1. Importa el repositorio en [vercel.com](https://vercel.com)
2. Vercel detectará automáticamente la configuración de Vite
3. Haz clic en "Deploy"

## Licencia

MIT
