# Design — diseño-de-casa

**Fecha**: 2026-05-28
**Fase**: SDD Design

---

## 1. Arquitectura de Componentes

### 1.1 Diagrama de Componentes (Jerarquía)

```
App
├── QuotationPage
│   ├── Header (tag, title, pills)
│   ├── Tabs (navegación principal)
│   │
│   ├── Tab: Plano
│   │   └── FloorPlan
│   │       ├── Room (SVG) × N
│   │       ├── DimensionLine × N
│   │       └── Legend
│   │
│   ├── Tab: Materiales
│   │   ├── PricePanel (inputs editables)
│   │   └── MaterialTable
│   │       ├── Badge × N (categorías)
│   │       └── Row × N (materiales)
│   │
│   ├── Tab: Resumen
│   │   ├── QuotationSummary
│   │   │   ├── RoomCard × N
│   │   │   └── TotalsBox
│   │   │       ├── ProgressBar × N
│   │   │       └── Total Final
│   │   └── PDFButton
│   │
│   └── Footer
│
└── PDFPreview (modal)
    └── PDF content renderizado
```

### 1.2 Diagrama de Componentes (Vista Modular)

```
┌─────────────────────────────────────────────────────────────────┐
│                         UI COMPONENTS                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐ ┌───────┐ ┌──────┐ ┌───────────┐ ┌───────────┐ │
│  │MetricCard│ │ Badge │ │ Tabs │ │ InputField│ │ProgressBar│ │
│  └──────────┘ └───────┘ └──────┘ └───────────┘ └───────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                        LAYOUT COMPONENTS                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐ ┌────────────┐ ┌──────────┐                     │
│  │  Header  │ │ PricePanel │ │  Footer  │                     │
│  └──────────┘ └────────────┘ └──────────┘                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                     QUOTATION COMPONENTS                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐ ┌───────────┐ ┌─────────┐ ┌──────────────┐ │
│  │MaterialTable │ │ TotalsBox │ │RoomCard │ │QuotationSum. │ │
│  └──────────────┘ └───────────┘ └─────────┘ └──────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                      FLOOR PLAN COMPONENTS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────┐ ┌──────┐ ┌───────────────┐                    │
│  │ FloorPlan │ │ Room │ │DimensionLine  │                    │
│  └───────────┘ └──────┘ └───────────────┘                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                        EXPORT COMPONENTS                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐ ┌──────────┐                                 │
│  │ PDFPreview  │ │ PDFButton│                                 │
│  └─────────────┘ └──────────┘                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Data Flow

### 2.1 Flujo de Datos Principal

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  User Input │────▶│   Zustand    │────▶│   UI Render     │
│  (Prices,   │     │   Store      │     │   (Components)  │
│   Rooms)    │     │              │     │                 │
└─────────────┘     └──────┬───────┘     └─────────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  useQuotation│
                    │    hook      │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │useCalculator │
                    │    hook      │
                    └──────────────┘
```

### 2.2 Diagrama de Flujo Detallado

```
                           ┌─────────────────┐
                           │   User Action   │
                           │ (input change)  │
                           └────────┬────────┘
                                    │
                                    ▼
                           ┌─────────────────┐
                           │  Input onChange  │
                           │   handler       │
                           └────────┬────────┘
                                    │
                                    ▼
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
           ┌───────────────┐               ┌───────────────┐
           │ updatePrices  │               │ updateRoom    │
           │ (store)       │               │ (store)       │
           └───────┬───────┘               └───────┬───────┘
                   │                               │
                   ▼                               ▼
           ┌───────────────┐               ┌───────────────┐
           │ recalculate   │               │ recalculate   │
           │ (hook)        │               │ (hook)        │
           └───────┬───────┘               └───────┬───────┘
                   │                               │
                   └───────────────┬───────────────┘
                                   │
                                   ▼
                           ┌───────────────┐
                           │ Update State  │
                           │ (Zustand)     │
                           └───────┬───────┘
                                   │
                                   ▼
                           ┌───────────────┐
                           │ Re-render UI  │
                           │ (React)       │
                           └───────────────┘
```

---

## 3. State Management

### 3.1 Zustand Store Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                      QUOTATION STORE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  STATE                                                          │
│  ├── quotations[]          ← Array de cotizaciones              │
│  │   ├── id                                                     │
│  │   ├── title                                                  │
│  │   ├── rooms[]              ← Ambientes                      │
│  │   │   ├── id                                                 │
│  │   │   ├── name                                               │
│  │   │   ├── dimensions                                         │
│  │   │   └── materials[]         ← Materiales por ambiente     │
│  │   │       ├── id                                             │
│  │   │       ├── name                                           │
│  │   │       ├── quantity                                       │
│  │   │       ├── unitPrice                                      │
│  │   │       └── total                                          │
│  │   └── totals                                               │
│  │       ├── subtotal                                           │
│  │       ├── labor                                              │
│  │       ├── unforeseen                                         │
│  │       └── total                                              │
│  │                                                              │
│  ├── currentId             ← Cotización activa                  │
│  ├── prices                ← Configuración de precios           │
│  │   ├── piso: { material, manoObra }                          │
│  │   ├── pared: { material, manoObra }                         │
│  │   └── ...                                                    │
│  │                                                              │
│  └── preferences           ← Preferencias usuario              │
│      ├── currency: 'COP'                                        │
│      ├── theme: 'dark'                                          │
│      └── defaultMargin: 8                                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  ACTIONS                                                        │
│  ├── createQuotation(data) → id                                │
│  ├── updateQuotation(id, updates)                              │
│  ├── deleteQuotation(id)                                       │
│  ├── setCurrent(id)                                            │
│  ├── updateRoom(quotationId, roomId, updates)                  │
│  ├── updateMaterial(quotationId, roomId, materialId, updates)  │
│  ├── updatePrices(prices)                                      │
│  ├── recalculate(quotationId)                                  │
│  ├── save()                    ← localStorage                  │
│  ├── load()                    ← localStorage                  │
│  ├── exportJSON()                                              │
│  └── importJSON(json)                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Persistencia Flow

```
┌──────────────┐     ┌──────────────┐     ┌────────────────┐
│  App Init    │────▶│ store.load() │────▶│ localStorage   │
│              │     │              │     │ getItem()      │
└──────────────┘     └──────┬───────┘     └────────┬───────┘
                            │                      │
                            ▼                      │
                    ┌───────────────┐              │
                    │ Hydrate State │              │
                    │               │              │
                    └───────┬───────┘              │
                            │                      │
                            ▼                      │
                    ┌───────────────┐              │
                    │  Render App   │              │
                    └───────┬───────┘              │
                            │                      │
                            ▼                      │
                    ┌───────────────┐              │
                    │ State Change  │              │
                    └───────┬───────┘              │
                            │                      │
                            ▼                      │
                    ┌───────────────┐     ┌────────┴───────┐
                    │ store.save()  │────▶│ localStorage   │
                    │               │     │ setItem()      │
                    └───────────────┘     └────────────────┘
```

---

## 4. PDF Generation Flow

### 4.1 Flujo de Generación PDF

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│ User Click  │────▶│  usePDF hook │────▶│  jsPDF Library  │
│ "Descargar" │     │              │     │                 │
└─────────────┘     └──────┬───────┘     └────────┬────────┘
                           │                      │
                           ▼                      ▼
                    ┌──────────────┐     ┌─────────────────┐
                    │ Get Current  │     │ Create PDF Doc  │
                    │ Quotation    │     │ (A4/Letter)     │
                    └──────┬───────┘     └────────┬────────┘
                           │                      │
                           ▼                      ▼
                    ┌──────────────┐     ┌─────────────────┐
                    │ Render SVG   │     │ Add Header      │
│ to Canvas      │────▶│ (title, date)│
                    │ (html2canvas)│     └────────┬────────┘
                    └──────┬───────┘              │
                           │                      ▼
                           │              ┌─────────────────┐
                           │              │ Add Floor Plan  │
                           │              │ (as image)      │
                           │              └────────┬────────┘
                           │                      │
                           ▼                      ▼
                    ┌──────────────┐     ┌─────────────────┐
                    │ Generate     │     │ Add Tables      │
                    │ Tables Data  │────▶│ (materials)     │
                    └──────────────┘     └────────┬────────┘
                                                 │
                                                 ▼
                                         ┌─────────────────┐
                                         │ Add Totals      │
                                         │ + Notes         │
                                         └────────┬────────┘
                                                  │
                                                  ▼
                                         ┌─────────────────┐
                                         │ Download PDF    │
                                         │ (saveAs)        │
                                         └─────────────────┘
```

### 4.2 Estructura del PDF

```
┌─────────────────────────────────────────┐
│              PDF PAGE 1                 │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │         HEADER                  │   │
│  │  Logo     Cotización #123       │   │
│  │           Fecha: 2026-05-28     │   │
│  │           Cliente: xxx          │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │         PLANO                   │   │
│  │  [SVG Floor Plan as Image]      │   │
│  │  Leyenda: Hab P, Hab R, ...     │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │       ESPECIFICACIONES          │   │
│  │  Dimensiones: 8.06 × 6.28 m    │   │
│  │  Área: 50.6 m²                  │   │
│  │  Alto: 2.22 m                   │   │
│  └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│              PDF PAGE 2                 │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │    MATERIALES - HAB. P          │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │ Piso  │ 6.81 m² │ $xxx │   │   │
│  │  │ Pared │ 18.5 m² │ $xxx │   │   │
│  │  └─────────────────────────┘   │   │
│  │  Subtotal: $xxx                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │    MATERIALES - HAB. R          │   │
│  │  ...                            │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ... (más ambientes) ...               │
│                                         │
├─────────────────────────────────────────┤
│              PDF PAGE N                 │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │         TOTALES                 │   │
│  │  Materiales:      $xxx,xxx,xxx  │   │
│  │  Mano de obra:    $xxx,xxx,xxx  │   │
│  │  Imprevistos (8%): $xx,xxx,xxx  │   │
│  │  ─────────────────────────────  │   │
│  │  TOTAL:           $xxx,xxx,xxx  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │         NOTAS                   │   │
│  │  • Vigencia: 30 días           │   │
│  │  • Precios sujetos a cambio    │   │
│  │  • No incluye permisos         │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │         FIRMA                   │   │
│  │  _________________________      │   │
│  │  Firma del contratista          │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

---

## 5. Responsive Design (Mobile-First)

### 5.1 Filosofía: Mobile-First Estricto

**Regla fundamental**: El CSS base es para móvil (320px). Todo se escribe para mobile primero, luego se agregan `@media (min-width: ...)` para pantallas más grandes.

```
❌ NO: @media (max-width: 640px) { ... }
✅ SÍ: /* base styles = mobile (320px) */
       @media (min-width: 640px) { /* tablet */ }
       @media (min-width: 1024px) { /* desktop */ }
```

**Beneficios mobile-first**:
- CSS más ligero (mobile es el default)
- Mejor performance en mobile (no overrides)
- Progressive enhancement natural
- Mejor para SEO (Google prioriza mobile)

### 5.2 Diagrama de Breakpoints

```
┌──────────────┐       ┌─────────────────┐     ┌───────────────────────────┐
│   MOBILE     │       │    TABLET       │     │       DESKTOP             │
│  (default)   │──────▶│  (min-width:    │────▶│    (min-width:            │
│  320-639px   │       │   640px)        │     │     1024px)               │
│              │       │  640-1023px     │     │     1024px+               │
├──────────────┤       ├─────────────────┤     ├───────────────────────────┤
│              │       │                 │     │                           │
│  Stack       │       │  2 columns      │     │  Multi-column layout      │
│  layout      │       │  layout         │     │  with sidebar             │
│              │       │                 │     │                           │
│  Full-width  │       │  Compact        │     │  Full tables              │
│  inputs      │       │  tables         │     │  Full floor plan          │
│              │       │                 │     │                           │
│  Horizontal  │       │  Scrollable     │     │  All tabs visible         │
│  scroll tabs │       │  tabs           │     │                           │
│              │       │                 │     │                           │
└──────────────┘       └─────────────────┘     └───────────────────────────┘
```

### 5.3 CSS Mobile-First Template

```css
/* ========== MOBILE (default, 320px+) ========== */
.metric-grid {
  display: grid;
  grid-template-columns: 1fr; /* 1 columna en mobile */
  gap: 10px;
}

.room-grid {
  display: grid;
  grid-template-columns: 1fr; /* 1 columna en mobile */
  gap: 12px;
}

.price-grid {
  display: grid;
  grid-template-columns: 1fr; /* 1 columna en mobile */
  gap: 10px;
}

.material-table {
  /* Card view en mobile */
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tabs {
  /* Horizontal scroll en mobile */
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.tabs::-webkit-scrollbar {
  display: none;
}

.floor-plan {
  /* Scroll horizontal en mobile */
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* ========== TABLET (640px+) ========== */
@media (min-width: 640px) {
  .metric-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas */
  }

  .room-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas */
  }

  .price-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas */
  }

  .material-table {
    /* Compact table en tablet */
    display: table;
    width: 100%;
  }
}

/* ========== DESKTOP (1024px+) ========== */
@media (min-width: 1024px) {
  .metric-grid {
    grid-template-columns: repeat(4, 1fr); /* 4 columnas */
  }

  .room-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  }

  .price-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  }

  .tabs {
    /* Todas las tabs visibles sin scroll */
    overflow-x: visible;
    flex-wrap: wrap;
  }
}
```

### 5.4 Component Adaptations (Mobile-First)

| Component | Mobile (default) | Tablet (640px+) | Desktop (1024px+) |
|-----------|------------------|-----------------|-------------------|
| **Header** | Stack pills vertical | Wrap pills horizontal | Single row pills |
| **Tabs** | Horizontal scroll | Horizontal scroll | All visible, wrap |
| **FloorPlan** | Scroll horizontal | Fit width | Full size |
| **MaterialTable** | Card view (stacked) | Compact table | Full table |
| **PricePanel** | Full width, 1 col | 2 columns | 3-4 columns |
| **MetricCard** | Full width (1 col) | 2 columns | 4 columns |
| **RoomCard** | Full width (1 col) | 2 columns | 3 columns |

### 5.5 Mobile-First Rules

1. **Touch targets**: Mínimo 44×44px en mobile
2. **Font sizes**: Base 16px, no escalones menores a 12px
3. **Spacing**: Generoso en mobile (padding 16px+)
4. **Inputs**: Full-width en mobile, auto-width en desktop
5. **Scroll**: Horizontal scroll para tabs y floor plan en mobile
6. **Tables**: Card view en mobile, table view en tablet+
7. **Floor Plan**: Siempre scrollable, nunca se corta
8. **Pills**: Stack vertical en mobile, horizontal en tablet+

## 6. Animaciones

### 6.1 Transition Map

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Tabs | Click | Slide + Fade | 200ms | ease-out |
| PricePanel | Toggle | Collapse/Expand height | 300ms | ease-in-out |
| MaterialTable row | Hover | Background fade | 150ms | ease |
| RoomCard | Hover | TranslateY(-2px) + border | 200ms | ease-out |
| MetricCard | Hover | Shadow increase | 200ms | ease |
| ProgressBar | Value change | Width transition | 600ms | ease |
| PDF Preview | Open | Scale + Fade | 250ms | ease-out |
| TotalsBox | Value change | Number count up | 400ms | ease-out |

### 6.2 Animation CSS

```css
/* Base transition */
.transition-base {
  transition: all 200ms ease-out;
}

/* Collapse animation */
.collapse-enter {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 300ms ease-in-out, opacity 200ms ease;
}
.collapse-enter-active {
  max-height: 1000px;
  opacity: 1;
}

/* Card hover */
.card-hover {
  transition: transform 200ms ease-out, border-color 200ms ease;
}
.card-hover:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
}

/* Number count animation */
@keyframes countUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.count-up {
  animation: countUp 400ms ease-out;
}
```

---

## 7. Accessibility

### 7.1 ARIA Labels

| Component | ARIA |
|-----------|------|
| Tabs | `role="tablist"`, `role="tab"`, `aria-selected` |
| PricePanel | `aria-expanded`, `aria-controls` |
| MaterialTable | `role="table"`, `aria-label` |
| InputField | `aria-label`, `aria-describedby` |
| ProgressBar | `role="progressbar"`, `aria-valuenow` |
| PDFButton | `aria-label="Descargar PDF"` |

### 7.2 Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Navigate between interactive elements |
| Arrow Left/Right | Switch between tabs |
| Enter/Space | Activate button/toggle |
| Escape | Close modal/panel |

---

## 8. Performance Considerations

### 8.1 Optimization Points

| Area | Strategy |
|------|----------|
| **SVG Rendering** | Memoize floor plan, only re-render on dimension change |
| **Calculations** | Debounce price inputs (300ms), memoize results |
| **PDF Generation** | Web Worker for heavy computation |
| **State Updates** | Batch updates with Zustand |
| **Bundle Size** | Tree-shake Lucide icons, lazy load PDF lib |

### 8.2 Bundle Size Budget

| Chunk | Target | Content |
|-------|--------|---------|
| Main | < 100KB | React, Zustand, core components |
| Vendor | < 150KB | Lucide, utility libs |
| PDF | < 200KB | jsPDF, html2canvas (lazy loaded) |
| **Total** | < 450KB | |

---

**Fin de design**
