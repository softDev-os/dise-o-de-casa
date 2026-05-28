# Proposal — diseño-de-casa

**Fecha**: 2026-05-28
**Fase**: SDD Proposal

---

## 1. Executive Summary

Transformar el sistema actual de cotizaciones HTML standalone en una aplicación web moderna con arquitectura de componentes, reduciendo duplicación de código en 80% y habilitando funcionalidades avanzadas como exportación PDF y nuevos templates.

---

## 2. Problema Actual

| Métrica | Actual | Target |
|---------|--------|--------|
| Código duplicado | ~80% | < 20% |
| Archivos | 3 HTML (42-55 KB) | App unificada |
| Mantenibilidad | Baja (cambio en 3 lugares) | Alta (componente único) |
| Extensibilidad | Difícil (copiar+pegar) | Fácil (nuevo template) |
| Mobile | Básico | Responsive completo |
| PDF | No disponible | Exportable |

---

## 3. Arquitectura Propuesta

### 3.1 Stack Tecnológico

```
Frontend:  React 18 + TypeScript
Styling:   Tailwind CSS + CSS Modules
Build:     Vite
State:     Zustand (ligero)
PDF:       jsPDF + html2canvas
Icons:     Lucide React
```

**¿Por qué React?**
- Ecosistema maduro para componentes UI
- TypeScript nativo
- Gran comunidad en LATAM
- Ideal para dashboards/formularios
- Next.js disponible si necesita SSR

**¿Por qué no Vue/Angular?**
- Vue: buena opción, pero React tiene más librerías de PDF
- Angular: demasiado pesado para herramienta personal

---

### 3.2 Estructura de Componentes

```
src/
├── components/
│   ├── ui/                    # Componentes base
│   │   ├── MetricCard.tsx
│   │   ├── Badge.tsx
│   │   ├── Tabs.tsx
│   │   ├── ProgressBar.tsx
│   │   └── InputField.tsx
│   │
│   ├── layout/                # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── PricePanel.tsx
│   │
│   ├── floor-plan/            # SVG interactivo
│   │   ├── FloorPlan.tsx
│   │   ├── Room.tsx
│   │   └── DimensionLine.tsx
│   │
│   ├── quotation/             # Cotización components
│   │   ├── MaterialTable.tsx
│   │   ├── TotalsBox.tsx
│   │   ├── RoomCard.tsx
│   │   └── QuotationSummary.tsx
│   │
│   └── export/                # Exportación
│       ├── PDFPreview.tsx
│       └── PDFButton.tsx
│
├── templates/                 # Templates de cotización
│   ├── apartment/
│   │   ├── ApartmentV1.tsx
│   │   └── ApartmentV2.tsx
│   ├── bathroom/
│   │   └── BathroomV3.tsx
│   ├── kitchen/               # Nuevo
│   │   └── KitchenV1.tsx
│   └── facade/                # Nuevo
│       └── FacadeV1.tsx
│
├── hooks/                     # Custom hooks
│   ├── useQuotation.ts
│   ├── useCalculator.ts
│   └── usePDF.ts
│
├── store/                     # State management
│   └── quotationStore.ts
│
├── types/                     # TypeScript types
│   ├── quotation.ts
│   ├── room.ts
│   └── material.ts
│
├── utils/                     # Utilities
│   ├── calculator.ts
│   ├── formatters.ts
│   └── pdfGenerator.ts
│
└── styles/                    # Global styles
    ├── globals.css
    └── theme.ts
```

---

### 3.3 Modelo de Datos

```typescript
// types/quotation.ts
interface Quotation {
  id: string;
  title: string;
  client?: string;
  date: Date;
  rooms: Room[];
  prices: PriceConfig;
  subtotal: number;
  tax: number;
  total: number;
  currency: 'COP';
}

interface Room {
  id: string;
  name: string;
  emoji: string;
  dimensions: Dimensions;
  area: number;
  materials: Material[];
  subtotal: number;
}

interface Dimensions {
  width: number;   // metros
  length: number;  // metros
  height: number;  // metros
}

interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  labor?: number;
}

type MaterialCategory = 
  | 'piso' 
  | 'pared' 
  | 'techo' 
  | 'electricidad' 
  | 'carpinteria' 
  | 'revestimiento';

interface PriceConfig {
  piso: { material: number; manoObra: number };
  pared: { material: number; manoObra: number };
  techo: { material: number; manoObra: number };
  // ... etc
}
```

---

## 4. Plan de Refactorización

### Fase 1: Setup y Componentes Base (2-3 días)

1. **Inicializar proyecto Vite + React + TypeScript**
   ```bash
   npm create vite@latest diseño-de-casa -- --template react-ts
   cd diseño-de-casa
   npm install
   npm install -D tailwindcss @tailwindcss/vite
   npm install zustand lucide-react
   ```

2. **Configurar Tailwind con paleta de colores actual**
   ```typescript
   // tailwind.config.js
   module.exports = {
     theme: {
       extend: {
         colors: {
           bg: '#0c0f0e',
           card: '#141918',
           accent: '#6ec8a9',
           accent2: '#8ee8c8',
           light: '#e0f0eb',
           muted: '#607a72',
           green: '#6eb88a',
           blue: '#7a9ec8',
           gold: '#c8b46e',
           red: '#d9735a',
           purple: '#a07ec8',
         }
       }
     }
   }
   ```

3. **Crear componentes UI base**
   - `MetricCard`
   - `Badge`
   - `Tabs`
   - `ProgressBar`
   - `InputField`

### Fase 2: Componentes de Cotización (3-4 días)

4. **Crear layout components**
   - `Header` (con pills de especificaciones)
   - `Footer`
   - `PricePanel` (inputs editables)

5. **Crear floor plan components**
   - `FloorPlan` (SVG wrapper)
   - `Room` (rectángulo con label)
   - `DimensionLine` (líneas de medida)

6. **Crear quotation components**
   - `MaterialTable`
   - `TotalsBox`
   - `RoomCard`

### Fase 3: Migrar Cotización Existente (2-3 días)

7. **Migrar cotizacion_apartamento_v1.html**
   - Extraer datos a TypeScript types
   - Crear `ApartmentV1.tsx`
   - Conectar con `useQuotation` hook

8. **Migrar cotizacion_apartamento_v2.html**
   - Crear `ApartmentV2.tsx`
   - Implementar tabs por ambiente

9. **Migrar cotizacion_bano_v3.html**
   - Crear `BathroomV3.tsx`
   - Adaptar modelo de datos

### Fase 4: Funcionalidades Nuevas (3-4 días)

10. **Exportación a PDF**
    - Instalar `jsPDF` + `html2canvas`
    - Crear `usePDF` hook
    - Diseñar template de PDF profesional
    - Agregar botón de descarga

11. **State Management con Zustand**
    - Crear `quotationStore`
    - Persistir en localStorage
    - Implementar historial de cotizaciones

### Fase 5: Polish y Nuevos Templates (2-3 días)

12. **Mejoras UX/UI**
    - Animaciones con Framer Motion o CSS
    - Mejor responsive design
    - Loading states
    - Toast notifications

13. **Nuevo template: Cocina**
    - Crear `KitchenV1.tsx`
    - Modelar materiales específicos (mesón, gabinetes, etc.)

---

## 5. Roadmap con Estimaciones

```
Semana 1:  Fase 1 + Fase 2 (setup + componentes base)
Semana 2:  Fase 3 (migrar cotizaciones existentes)
Semana 3:  Fase 4 (PDF + state management)
Semana 4:  Fase 5 (polish + nuevos templates)
```

**Total estimado**: 10-14 días de desarrollo

---

## 6. Decisiones Técnicas

| Decisión | Opción elegida | Razón |
|----------|---------------|-------|
| Framework | React 18 | Ecosistema, TypeScript, PDF libs |
| Styling | Tailwind | Rapid prototyping, dark theme fácil |
| State | Zustand | Ligero, simple, persistencia built-in |
| Build | Vite | Rápido, moderno, DX superior |
| PDF | jsPDF + html2canvas | Maduro, flexible, buena calidad |
| TypeScript | Sí | Type safety para datos financieros |

---

## 7. Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Complejidad de SVG | Alto | Empezar con SVG estático, iterar |
| Calidad PDF | Medio | Testear con varios navegadores |
| Curva de aprendizaje | Bajo | React es conocido, documentación abundante |
| Tiempo estimado | Medio | Priorizar features core, dejar polish para después |

---

## 8. Alternativas Consideradas

### Opción A: Refactorizar sin framework
- **Pro**: Menos cambio, más rápido
- **Con**: Sigue siendo HTML, difícil de mantener
- **Veredicto**: ❌ No resuelve el problema de duplicación

### Opción B: Vue 3 + Nuxt
- **Pro**: Más simple que React, bueno para forms
- **Con**: Menos librerías de PDF, comunidad más pequeña en LATAM
- **Veredicto**: 🟡 Viable pero React es mejor para este caso

### Opción C: Angular
- **Pro**: Completo, opinionated
- **Con**: Pesado para proyecto personal, curva más empinada
- **Veredicto**: ❌ Over-engineering

---

## 9. Siguiente Paso

**Fase SDD siguiente**: `spec`

Si esta propuesta es aprobada, la fase de spec definirá:
- Contratos de componentes (props, events)
- Wireframes de UI
- Especificación de PDF
- Criterios de aceptación detallados

---

**Fin de proposal**
