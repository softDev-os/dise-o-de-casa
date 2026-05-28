# Tasks — diseño-de-casa

**Fecha**: 2026-05-28
**Fase**: SDD Tasks

---

## Resumen

**Total tasks**: 32
**Estimación total**: 10-14 días
**Priorización**: Por dependencias y valor

---

## Fase 1: Setup y Configuración (Día 1)

### T1.1: Inicializar proyecto Vite
- **Tiempo**: 30 min
- **Dependencias**: Ninguna
- **Descripción**:
  ```bash
  npm create vite@latest diseno-de-casa -- --template react-ts
  cd diseno-de-casa
  npm install
  ```
- **Entregable**: Proyecto base compilable

### T1.2: Configurar Tailwind CSS
- **Tiempo**: 45 min
- **Dependencias**: T1.1
- **Descripción**:
  - Instalar tailwindcss, autoprefixer, postcss
  - Crear tailwind.config.js con paleta de colores
  - Configurar globals.css con imports
- **Entregable**: Tailwind funcionando con dark theme

### T1.3: Configurar TypeScript
- **Tiempo**: 30 min
- **Dependencias**: T1.1
- **Descripción**:
  - Ajustar tsconfig.json (strict mode)
  - Crear carpeta types/
  - Definir types base (Quotation, Room, Material)
- **Entregable**: TypeScript compila sin errores

### T1.4: Instalar dependencias adicionales
- **Tiempo**: 15 min
- **Dependencias**: T1.1
- **Descripción**:
  ```bash
  npm install zustand lucide-react jspdf html2canvas
  npm install -D @types/jspdf
  ```
- **Entregable**: Todas las dependencias instaladas

### T1.5: Crear estructura de carpetas
- **Tiempo**: 15 min
- **Dependencias**: T1.1
- **Descripción**:
  ```
  src/
  ├── components/
  │   ├── ui/
  │   ├── layout/
  │   ├── floor-plan/
  │   ├── quotation/
  │   └── export/
  ├── templates/
  ├── hooks/
  ├── store/
  ├── types/
  ├── utils/
  └── styles/
  ```
- **Entregable**: Estructura creada

---

## Fase 2: Componentes UI Base (Días 2-3)

### T2.1: MetricCard
- **Tiempo**: 1.5 horas
- **Dependencias**: T1.2, T1.3
- **Descripción**:
  - Crear componente con todas las variantes de color
  - Implementar icon (emoji + Lucide)
  - Responsive design
  - Agregar Storybook story
- **Entregable**: MetricCard funcional

### T2.2: Badge
- **Tiempo**: 45 min
- **Dependencias**: T1.2
- **Descripción**:
  - Crear componente con variantes (piso, pared, techo, etc.)
  - Tamaños sm/md
  - Hover states
- **Entregable**: Badge funcional

### T2.3: Tabs
- **Tiempo**: 1.5 horas
- **Dependencias**: T1.2
- **Descripción**:
  - Crear componente con items array
  - Active state con bottom border
  - Soporte para iconos y badges
  - Keyboard navigation
- **Entregable**: Tabs funcional

### T2.4: InputField
- **Tiempo**: 1 hora
- **Dependencias**: T1.2
- **Descripción**:
  - Input numérico con prefix/suffix
  - Label y hint
  - Focus states
  - Validación básica
- **Entregable**: InputField funcional

### T2.5: ProgressBar
- **Tiempo**: 45 min
- **Dependencias**: T1.2
- **Descripción**:
  - Barra de progreso animada
  - Label y porcentaje
  - Variantes de color
- **Entregable**: ProgressBar funcional

### T2.6: Exportar componentes UI desde index
- **Tiempo**: 30 min
- **Dependencias**: T2.1-T2.5
- **Descripción**:
  - Crear barrel exports (index.ts)
  - Documentar props en JSDoc
- **Entregable**: Componentes importables

---

## Fase 3: Componentes de Layout (Día 4)

### T3.1: Header
- **Tiempo**: 1.5 horas
- **Dependencias**: T2.2
- **Descripción**:
  - Tag, título, subtítulo
  - Pills con variantes de color
  - Gradient background
  - Responsive
- **Entregable**: Header funcional

### T3.2: Footer
- **Tiempo**: 30 min
- **Dependencias**: T1.2
- **Descripción**:
  - Texto centrado
  - Border top
  - Estilo muted
- **Entregable**: Footer funcional

### T3.3: PricePanel
- **Tiempo**: 2 horas
- **Dependencias**: T2.3, T2.4
- **Descripción**:
  - Collapse/expand con animación
  - Grid de inputs
  - Botón recalcular
  - State management local
- **Entregable**: PricePanel funcional

---

## Fase 4: Componentes de Floor Plan (Día 5)

### T4.1: Room (SVG)
- **Tiempo**: 2 horas
- **Dependencias**: T1.2
- **Descripción**:
  - SVG rect con fill/stroke
  - Label y dimensiones
  - Variantes de color
  - Click handler
- **Entregable**: Room SVG funcional

### T4.2: DimensionLine (SVG)
- **Tiempo**: 1 hora
- **Dependencias**: T1.2
- **Descripción**:
  - Líneas de medida con flechas
  - Labels de texto
  - Orientación horizontal/vertical
- **Entregable**: DimensionLine funcional

### T4.3: FloorPlan
- **Tiempo**: 2.5 horas
- **Dependencias**: T4.1, T4.2
- **Descripción**:
  - Grid background pattern
  - Renderizar array de rooms
  - Renderizar dimensiones
  - Leyenda
  - Responsive
- **Entregable**: FloorPlan funcional

---

## Fase 5: Componentes de Cotización (Días 6-7)

### T5.1: MaterialTable
- **Tiempo**: 2.5 horas
- **Dependencias**: T2.2
- **Descripción**:
  - Tabla con categorías (badges)
  - Header columns
  - Rows con hover
  - Compact mode para móvil
- **Entregable**: MaterialTable funcional

### T5.2: TotalsBox
- **Tiempo**: 1.5 horas
- **Dependencias**: T2.5
- **Descripción**:
  - Desglose por categoría
  - Progress bars
  - Total final destacado
  - Gradient background
- **Entregable**: TotalsBox funcional

### T5.3: RoomCard
- **Tiempo**: 1.5 horas
- **Dependencias**: T2.1
- **Descripción**:
  - Emoji + nombre
  - Dimensiones
  - Stats list
  - Área destacada
  - Hover effects
- **Entregable**: RoomCard funcional

### T5.4: QuotationSummary
- **Tiempo**: 1 hora
- **Dependencias**: T5.2, T5.3
- **Descripción**:
  - Combina TotalsBox + RoomCards
  - Layout responsive
- **Entregable**: QuotationSummary funcional

---

## Fase 6: Custom Hooks (Día 8)

### T6.1: useCalculator
- **Tiempo**: 1.5 horas
- **Dependencias**: T1.3
- **Descripción**:
  - calculateArea, calculatePerimeter
  - calculateWallArea
  - calculateMaterialQuantity (con desperdicio)
  - calculateSubtotal, calculateTotal
  - Unit tests
- **Entregable**: useCalculator con tests

### T6.2: useQuotation
- **Tiempo**: 2 horas
- **Dependencias**: T6.1
- **Descripción**:
  - CRUD operations sobre Quotation
  - Update room, update material
  - Recalculate totals
  - Export/import JSON
- **Entregable**: useQuotation funcional

### T6.3: usePDF
- **Tiempo**: 2 horas
- **Dependencias**: T6.2
- **Descripción**:
  - generatePDF con jsPDF
  - previewPDF (base64)
  - downloadPDF
  - Error handling
  - Loading state
- **Entregable**: usePDF funcional

---

## Fase 7: Store (Zustand) (Día 8)

### T7.1: quotationStore
- **Tiempo**: 2 horas
- **Dependencias**: T6.2
- **Descripción**:
  - State: quotations[], currentId, prices, preferences
  - Actions: CRUD, updatePrices
  - Persistencia con localStorage
  - Devtools integration
- **Entregable**: Store funcional

### T7.2: Store hydration
- **Tiempo**: 1 hora
- **Dependencias**: T7.1
- **Descripción**:
  - Load from localStorage on init
  - Save on state changes
  - Handle migration (schema changes)
- **Entregable**: Persistencia funcional

---

## Fase 8: Migración de Templates (Días 9-10)

### T8.1: Definir datos de ApartmentV1
- **Tiempo**: 1.5 horas
- **Dependencias**: T6.1
- **Descripción**:
  - Extraer datos del HTML a TypeScript
  - Crear objeto Quotation completo
  - Validar cálculos
- **Entregable**: apartmentV1Data.ts

### T8.2: ApartmentV1 template
- **Tiempo**: 2.5 horas
- **Dependencias**: T8.1, T3.1, T4.3, T5.1
- **Descripción**:
  - Crear componente ApartmentV1
  - 3 tabs: Plano, Materiales, Resumen
  - Integrar todos los componentes
  - Match exacto con HTML original
- **Entregable**: ApartmentV1 funcional

### T8.3: Definir datos de ApartmentV2
- **Tiempo**: 2 horas
- **Dependencias**: T6.1
- **Descripción**:
  - Extraer datos por ambiente
  - 10 ambientes: Hab P, Hab R, Hab A, Sala, Baño, Lav, Cocina, Pasillo
- **Entregable**: apartmentV2Data.ts

### T8.4: ApartmentV2 template
- **Tiempo**: 3 horas
- **Dependencias**: T8.3, T5.3
- **Descripción**:
  - Crear componente ApartmentV2
  - 10 tabs por ambiente
  - PricePanel global
  - Tabla por ambiente
- **Entregable**: ApartmentV2 funcional

### T8.5: Definir datos de BathroomV3
- **Tiempo**: 1 hora
- **Dependencias**: T6.1
- **Descripción**:
  - Extraer datos del baño
  - Medidas corregidas (13.2m²)
- **Entregable**: bathroomV3Data.ts

### T8.6: BathroomV3 template
- **Tiempo**: 2 horas
- **Dependencias**: T8.5, T5.1
- **Descripción**:
  - Crear componente BathroomV3
  - 3 tabs: Piso&Paredes, Accesorios, Total
  - Alert banner de medidas
- **Entregable**: BathroomV3 funcional

---

## Fase 9: PDF Export (Día 11)

### T9.1: PDF layout template
- **Tiempo**: 2 horas
- **Dependencias**: T6.3
- **Descripción**:
  - Diseñar layout en jsPDF
  - Header con logo placeholder
  - Secciones: plano, specs, materiales, totales
  - Footer con notas
- **Entregable**: PDF template base

### T9.2: SVG a imagen para PDF
- **Tiempo**: 1.5 horas
- **Dependencias**: T4.3
- **Descripción**:
  - Convertir SVG floor plan a canvas
  - Embed en PDF como imagen
  - Mantener calidad
- **Entregable**: SVG renderizado en PDF

### T9.3: Tablas de materiales en PDF
- **Tiempo**: 1.5 horas
- **Dependencias**: T9.1
- **Descripción**:
  - Generar tablas con jsPDF
  - Badges de categoría
  - Subtotales y totales
- **Entregable**: Tablas en PDF

### T9.4: PDFPreview component
- **Tiempo**: 1 hora
- **Dependencias**: T9.1
- **Descripción**:
  - Mostrar preview del PDF
  - Botón de descarga
  - Loading state
- **Entregable**: PDFPreview funcional

---

## Fase 10: UX Polish (Día 12)

### T10.1: Animaciones de transición
- **Tiempo**: 1.5 horas
- **Dependencias**: T2.3, T3.3
- **Descripción**:
  - Tab transitions (fade/slide)
  - PricePanel collapse animation
  - Card hover animations
  - < 300ms duration
- **Entregable**: Animaciones suaves

### T10.2: Responsive mobile
- **Tiempo**: 2 horas
- **Dependencias**: Todos los componentes
- **Descripción**:
  - Breakpoints: 320px, 640px, 1024px
  - Stack layout en móvil
  - Tabs scroll horizontal
  - Inputs full-width
- **Entregable**: Mobile responsive

### T10.3: Loading states
- **Tiempo**: 1 hora
- **Dependencias**: T6.3
- **Descripción**:
  - Skeleton loaders
  - Spinner para PDF
  - Disabled states en buttons
- **Entregable**: Loading feedback

---

## Fase 11: Nuevo Template - Cocina (Día 13)

### T11.1: Definir datos de KitchenV1
- **Tiempo**: 1.5 horas
- **Dependencias**: T6.1
- **Descripción**:
  - Modelo de datos para cocina
  - Mesón, gabinetes, azulejos, electrodomésticos
  - Precios referenciales COP
- **Entregable**: kitchenV1Data.ts

### T11.2: KitchenV1 template
- **Tiempo**: 2.5 horas
- **Dependencias**: T11.1, T5.1
- **Descripción**:
  - Crear componente KitchenV1
  - Tabs: Plano, Mesón, Gabinetes, Accesorios, Total
  - Floor plan de cocina
- **Entregable**: KitchenV1 funcional

---

## Fase 12: Testing y QA (Día 14)

### T12.1: Unit tests para hooks
- **Tiempo**: 2 horas
- **Dependencias**: T6.1-T6.3
- **Descripción**:
  - Tests para useCalculator
  - Tests para useQuotation
  - Tests para usePDF (mock)
- **Entregable**: > 80% coverage en hooks

### T12.2: Integration tests
- **Tiempo**: 1.5 horas
- **Dependencias**: T8.2, T8.4, T8.6
- **Descripción**:
  - Test render de cada template
  - Test interacciones (tabs, inputs)
  - Test recálculo de precios
- **Entregable**: Templates renderizan correctamente

### T12.3: Visual regression test
- **Tiempo**: 1 hora
- **Dependencias**: T12.2
- **Descripción**:
  - Screenshots de cada template
  - Comparar con HTML original
  - Ajustar diferencias
- **Entregable**: UI matchea original (±5%)

### T12.4: PDF quality test
- **Tiempo**: 1 hora
- **Dependencias**: T9.1-T9.3
- **Descripción**:
  - Generar PDF de cada template
  - Verificar legibilidad
  - Test en Chrome, Firefox, Safari
- **Entregable**: PDFs generan correctamente

---

## Dependencias Críticas

```
T1.1 → T1.2, T1.3, T1.4, T1.5
T1.2 → T2.1-T2.5, T3.1-T3.3, T4.1-T4.3
T1.3 → T6.1, T6.2
T6.1 → T6.2, T8.1, T8.3, T8.5, T11.1
T6.2 → T6.3, T7.1
T4.3 → T8.2, T8.4, T8.6, T9.2
T5.1 → T8.2, T8.4, T8.6, T11.2
```

---

## Priorización por Valor

### Must Have (MVP)
1. T1.1-T1.5: Setup
2. T2.1-T2.6: Componentes UI base
3. T3.1-T3.3: Layout
4. T4.1-T4.3: Floor plan
5. T5.1-T5.4: Cotización components
6. T6.1-T6.2: Hooks core
7. T8.1-T8.2: ApartmentV1 (1 template funcional)

### Should Have
8. T7.1-T7.2: Store persistence
9. T8.3-T8.6: ApartmentV2 + BathroomV3
10. T9.1-T9.4: PDF export

### Nice to Have
11. T10.1-T10.3: UX polish
12. T11.1-T11.2: KitchenV1
13. T12.1-T12.4: Testing completo

---

## Sprint Sugerido

### Sprint 1 (Días 1-5): Foundation
- T1.1-T1.5: Setup
- T2.1-T2.6: UI components
- T3.1-T3.3: Layout
- T4.1-T4.3: Floor plan

### Sprint 2 (Días 6-10): Core Features
- T5.1-T5.4: Cotización components
- T6.1-T6.3: Hooks
- T7.1-T7.2: Store
- T8.1-T8.6: Migrate templates

### Sprint 3 (Días 11-14): Polish
- T9.1-T9.4: PDF export
- T10.1-T10.3: UX polish
- T11.1-T11.2: KitchenV1
- T12.1-T12.4: Testing

---

**Fin de tasks**
