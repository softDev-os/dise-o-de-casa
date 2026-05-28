# Spec — diseño-de-casa

**Fecha**: 2026-05-28
**Fase**: SDD Spec

---

## 1. Componentes UI Base

### 1.1 MetricCard

**Props**:
```typescript
interface MetricCardProps {
  icon: string;           // Emoji o Lucide icon name
  label: string;          // "Piso", "Paredes", etc.
  value: number | string; // 13.2, "322 und"
  unit?: string;          // "m²", "und", "%"
  subtitle?: string;      // "6 × 2.20 m"
  variant?: 'teal' | 'green' | 'gold' | 'blue' | 'purple' | 'red';
  trend?: 'up' | 'down'; // Para indicar cambio
}
```

**Wireframe**:
```
┌─────────────────────────────┐
│ 🪨                          │  ← icon (26px)
│ PISO                        │  ← label (9px uppercase)
│ 13.2 m²                     │  ← value + unit (28px + 13px)
│ 6 × 2.20 m                  │  ← subtitle (10px)
└─────────────────────────────┘
   ↑ top border: 3px colored
```

**Variantes de color**:
- `teal`: `--accent` (#6ec8a9) — áreas principales
- `green`: `--green` (#6eb88a) — habitaciones
- `gold`: `--gold` (#c8b46e) — cocinas
- `blue`: `--blue` (#7a9ec8) — baños
- `purple`: `--purple` (#a07ec8) — lavaderos
- `red`: `--red` (#d9735a) — alertas

---

### 1.2 Badge

**Props**:
```typescript
interface BadgeProps {
  label: string;           // "PISO", "PARED", "TECHO"
  variant: BadgeVariant;
  size?: 'sm' | 'md';
}

type BadgeVariant = 
  | 'piso'     // teal
  | 'pared'    // gold
  | 'techo'    // green
  | 'revest'   // red
  | 'mo'       // blue (mano de obra)
  | 'elect'    // purple
  | 'carp';    // orange
```

**Wireframe**:
```
┌──────┐
│ PISO │  ← 8px uppercase, rounded (7px)
└──────┘
```

---

### 1.3 Tabs

**Props**:
```typescript
interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'default' | 'pills';
}

interface TabItem {
  id: string;
  label: string;
  icon?: string;       // Emoji
  badge?: number;      // Contador opcional
  disabled?: boolean;
}
```

**Wireframe**:
```
┌─────────────────────────────────────────────────────────┐
│ 🏠 Plano   🧱 Materiales   📊 Resumen   📝 Notas (3)  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│              [Contenido del tab activo]                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
   ↑ active tab: accent bottom border + accent color
   ↑ badge: small circle counter
```

---

### 1.4 InputField

**Props**:
```typescript
interface InputFieldProps {
  label: string;            // "Baldosa 60×30 (x und)"
  value: number;
  onChange: (value: number) => void;
  type?: 'number' | 'text';
  prefix?: string;          // "$"
  suffix?: string;          // "m²", "und"
  hint?: string;            // Texto de ayuda
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}
```

**Wireframe**:
```
┌─────────────────────────────────────────┐
│ BALDOSA 60×30 (X UND)                   │  ← label (9px uppercase)
│ ┌─────────────────────────────────────┐ │
│ │ $ 8,500                             │ │  ← input (13px)
│ └─────────────────────────────────────┘ │
│ Sirve para piso y paredes               │  ← hint (9px muted)
└─────────────────────────────────────────┘
```

---

### 1.5 ProgressBar

**Props**:
```typescript
interface ProgressBarProps {
  label: string;
  value: number;       // 0-100
  color?: string;      // CSS color
  showValue?: boolean;
  size?: 'sm' | 'md';
}
```

**Wireframe**:
```
Piso                    75%
┌─────────────────────────────────────────┐
│████████████████████████████░░░░░░░░░░░░░│
└─────────────────────────────────────────┘
```

---

## 2. Componentes de Layout

### 2.1 Header

**Props**:
```typescript
interface HeaderProps {
  tag: string;              // "Presupuesto de Obra · Bogotá 2026"
  title: string;            // "APARTAMENTO"
  subtitle?: string;        // "COMPLETO"
  pills: Pill[];
  onBack?: () => void;      // Navegación
}

interface Pill {
  icon?: string;
  label: string;
  variant: 'teal' | 'gold' | 'blue' | 'red' | 'purple';
}
```

**Wireframe**:
```
┌─────────────────────────────────────────────────────────────────┐
│ ● ● ●                    ← gradient background                 │
│                                                                 │
│ Presupuesto de Obra · Bogotá 2026    ← tag (10px uppercase)    │
│                                                                 │
│ APARTAMENTO COMPLETO        ← title (46px Bebas Neue)          │
│                                                                 │
│ [📐 8.06×6.28m] [🛏 3 Hab] [🛁 Baño] [🍳 Cocina] [📏 2.22m]  │
│    ↑ pills: rounded, colored borders                            │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2.2 PricePanel

**Props**:
```typescript
interface PricePanelProps {
  title: string;
  description?: string;
  fields: PriceField[];
  values: Record<string, number>;
  onChange: (key: string, value: number) => void;
  onRecalculate: () => void;
  collapsed?: boolean;
}

interface PriceField {
  key: string;          // "p_baldosa"
  label: string;        // "Baldosa 60×30 (x und)"
  hint?: string;        // "Sirve para piso y paredes"
  prefix?: string;      // "$"
  suffix?: string;      // "m²"
}
```

**Wireframe**:
```
┌─────────────────────────────────────────────────────────────────┐
│ ⚙️ CONFIGURAR PRECIOS (COP) — clic para expandir        [▼]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐  │
│  │ BALDOSA 60×30   │ │ PEGANTE (x m²)  │ │ FRAGUA (x m²)   │  │
│  │ $ 8,500         │ │ $ 4,500         │ │ $ 3,500         │  │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              ⚡ RECALCULAR TODO                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Componentes de Cotización

### 3.1 MaterialTable

**Props**:
```typescript
interface MaterialTableProps {
  materials: Material[];
  categories: MaterialCategory[];
  showLabor?: boolean;
  compact?: boolean;      // Para vista móvil
}

interface Material {
  id: string;
  name: string;
  detail?: string;
  category: MaterialCategory;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  laborPrice?: number;
  laborTotal?: number;
}
```

**Wireframe**:
```
┌──────────────────────────────────────────────────────────────────────────┐
│ MATERIAL                    CANTIDAD    P.UNITARIO     TOTAL            │
├──────────────────────────────────────────────────────────────────────────┤
│ ── PISO ──────────────────────────────────────────────────────────────  │
│                                                                          │
│ [PISO]                                                               │
│ Baldosa 60×30 cm           322 und     $8,500         $2,737,000       │
│ Sirve para piso y paredes                                               │
│                                                                          │
│ ── PARED ─────────────────────────────────────────────────────────────  │
│                                                                          │
│ [PARED]                                                              │
│ Pegante / mortero          52.56 m²    $4,500         $236,520         │
│ Piso + paredes                                                          │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│ SUBTOTAL                                │              $4,203,520       │
└──────────────────────────────────────────────────────────────────────────┘
   ↑ badges: colored by category
   ↑ hover: subtle background highlight
```

---

### 3.2 TotalsBox

**Props**:
```typescript
interface TotalsBoxProps {
  rows: TotalRow[];
  finalLabel: string;         // "TOTAL ESTIMADO"
  finalValue: number;
  finalCurrency?: string;     // "COP"
  showProgress?: boolean;
  progressItems?: ProgressItem[];
}

interface TotalRow {
  label: string;
  value: number;
  highlight?: boolean;
}

interface ProgressItem {
  label: string;
  percentage: number;
  color: string;
}
```

**Wireframe**:
```
┌─────────────────────────────────────────────────────────────────┐
│ Materiales                              │         $3,850,000   │
│ Mano de obra                            │         $1,200,000   │
│ Imprevistos (8%)                        │           $404,000   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Piso           ████████████████████░░░░  80%                   │
│ Paredes        ████████████░░░░░░░░░░░░  50%                   │
│ Techo          ░░░░░░░░░░░░░░░░░░░░░░░░   0%                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ TOTAL ESTIMADO                                                  │
│ $5,454,000 COP                                                  │
│ ↑ gradient background, big value (42px)                        │
└─────────────────────────────────────────────────────────────────┘
```

---

### 3.3 RoomCard

**Props**:
```typescript
interface RoomCardProps {
  emoji: string;         // "🛏"
  name: string;          // "Hab. P"
  dimensions: string;    // "2.56 × 2.66"
  area: number;          // 6.81
  stats: RoomStat[];
  variant: RoomVariant;
  onClick?: () => void;
}

interface RoomStat {
  key: string;
  value: string;
}

type RoomVariant = 'teal' | 'green' | 'gold' | 'blue' | 'purple' | 'red';
```

**Wireframe**:
```
┌─────────────────────────────────────┐
│ 🛏                                  │
│ HAB. P                              │
│ 2.56 × 2.66 m                       │
│                                     │
│ Piso         6.81 m²                │
│ Paredes      18.5 m²                │
│ Perímetro    10.44 m                │
│                                     │
│ 6.81 m²                             │
│ ↑ border-top: 1px, accent color     │
└─────────────────────────────────────┘
   ↑ hover: border-color accent, translateY(-2px)
```

---

## 4. Componentes de Floor Plan

### 4.1 FloorPlan

**Props**:
```typescript
interface FloorPlanProps {
  rooms: FloorPlanRoom[];
  dimensions: Dimensions;
  showGrid?: boolean;
  showDimensions?: boolean;
  interactive?: boolean;
  onRoomClick?: (roomId: string) => void;
  scale?: number;          // px per meter, default 25
}

interface FloorPlanRoom {
  id: string;
  name: string;
  x: number;              // meters from left
  y: number;              // meters from top
  width: number;          // meters
  height: number;         // meters
  variant: RoomVariant;
  showLabel?: boolean;
  windows?: Window[];
  doors?: Door[];
}
```

**Wireframe**:
```
┌─────────────────────────────────────────────────────────────────┐
│ ┌──────┐ ┌────┐┌──┐┌────────┐                                 │
│ │HAB. P│ │BAÑO││LAV││COCINA  │                                 │
│ │2.56  │ │1.80││0.8││2.66    │                                 │
│ │×2.66 │ │×1.8││×1.││×2.00   │                                 │
│ │6.81m²│ │3.26││1.4││5.32m²  │                                 │
│ └──────┘ └────┘└──┘└────────┘                                 │
│ ┌──────┐ ┌──────┐┌────────┐                                   │
│ │HAB. R│ │HAB. A││ SALA   │                                   │
│ │2.66  │ │2.51  ││ 2.67   │                                   │
│ │×3.50 │ │×3.50 ││ ×3.54  │                                   │
│ │9.31m²│ │8.79m²││ 9.45m² │                                   │
│ └──────┘ └──────┘└────────┘                                   │
│                                                                 │
│ ←────────── 8.06 m ──────────→                                 │
│ ↑ grid pattern, dimension lines                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 4.2 Room (SVG)

**Props**:
```typescript
interface RoomProps {
  name: string;
  x: number;          // pixels
  y: number;
  width: number;      // pixels
  height: number;
  area: number;
  variant: RoomVariant;
  showDimensions?: boolean;
  onClick?: () => void;
  windows?: Window[];
  doors?: Door[];
}
```

---

## 5. Especificación PDF

### 5.1 Estructura del PDF

```
┌─────────────────────────────────────────┐
│ HEADER                                  │
│ - Logo (placeholder)                    │
│ - Título cotización                     │
│ - Fecha, cliente                        │
├─────────────────────────────────────────┤
│ PLANO                                   │
│ - SVG renderizado como imagen           │
│ - Leyenda de ambientes                  │
├─────────────────────────────────────────┤
│ ESPECIFICACIONES                        │
│ - Pills de dimensiones                  │
│ - Tabla de áreas por ambiente           │
├─────────────────────────────────────────┤
│ MATERIALES (por ambiente)               │
│ - Tablas detalladas                     │
│ - Badges de categoría                   │
├─────────────────────────────────────────┤
│ TOTALES                                 │
│ - Desglose materiales/MO                │
│ - Imprevistos                           │
│ - TOTAL FINAL destacado                │
├─────────────────────────────────────────┤
│ NOTAS                                   │
│ - Condiciones generales                 │
│ - Vigencia presupuesto                  │
│ - Firma                                 │
└─────────────────────────────────────────┘
```

### 5.2 Configuración PDF

```typescript
interface PDFConfig {
  format: 'a4' | 'letter';
  orientation: 'portrait' | 'landscape';
  margins: { top: number; right: number; bottom: number; left: number };
  colors: typeof theme.colors;
  fonts: {
    title: string;      // Bebas Neue
    body: string;       // DM Sans
  };
  showLogo: boolean;
  showPlano: boolean;
  showNotes: boolean;
  customNotes?: string[];
}
```

### 5.3 Props del componente PDF

```typescript
interface PDFGeneratorProps {
  quotation: Quotation;
  config?: Partial<PDFConfig>;
  onGenerate: (pdf: Blob) => void;
  onError: (error: Error) => void;
}
```

---

## 6. Custom Hooks

### 6.1 useQuotation

```typescript
interface UseQuotationReturn {
  quotation: Quotation;
  updateRoom: (roomId: string, updates: Partial<Room>) => void;
  updateMaterial: (roomId: string, materialId: string, updates: Partial<Material>) => void;
  updatePrices: (prices: Partial<PriceConfig>) => void;
  recalculate: () => void;
  reset: () => void;
  exportJSON: () => string;
  importJSON: (json: string) => void;
}
```

### 6.2 useCalculator

```typescript
interface UseCalculatorReturn {
  calculateArea: (dims: Dimensions) => number;
  calculatePerimeter: (dims: Dimensions) => number;
  calculateWallArea: (dims: Dimensions) => number;
  calculateMaterialQuantity: (area: number, unitSize: [number, number], waste?: number) => number;
  calculateSubtotal: (materials: Material[]) => number;
  calculateTotal: (subtotal: number, labor: number, unforeseen: number) => number;
}
```

### 6.3 usePDF

```typescript
interface UsePDFReturn {
  generatePDF: (quotation: Quotation, config?: Partial<PDFConfig>) => Promise<Blob>;
  previewPDF: (quotation: Quotation) => string; // base64
  downloadPDF: (quotation: Quotation, filename?: string) => void;
  isGenerating: boolean;
  error: Error | null;
}
```

---

## 7. Store (Zustand)

```typescript
interface QuotationStore {
  // State
  quotations: Quotation[];
  currentId: string | null;
  prices: PriceConfig;
  preferences: UserPreferences;
  
  // Actions
  createQuotation: (data: Partial<Quotation>) => string;
  updateQuotation: (id: string, updates: Partial<Quotation>) => void;
  deleteQuotation: (id: string) => void;
  setCurrent: (id: string | null) => void;
  updatePrices: (prices: Partial<PriceConfig>) => void;
  
  // Persistence
  save: () => void;
  load: () => void;
  exportAll: () => string;
  importAll: (json: string) => void;
}

interface UserPreferences {
  currency: 'COP';
  language: 'es';
  theme: 'dark';
  defaultMargin: number;       // % imprevistos
  showPlanoByDefault: boolean;
}
```

---

## 8. Criterios de Aceptación por Fase

### Fase 1: Setup + Componentes Base

- [ ] Proyecto Vite + React + TypeScript creado
- [ ] Tailwind configurado con paleta de colores
- [ ] MetricCard renderiza correctamente con todas las variantes
- [ ] Badge muestra todas las variantes de color
- [ ] Tabs cambia de tab y muestra contenido
- [ ] InputField acepta numéricos y muestra hint
- [ ] ProgressBar muestra porcentaje correctamente
- [ ] Storybook o similar para desarrollo de componentes

### Fase 2: Componentes de Cotización

- [ ] Header muestra tag, título, pills correctamente
- [ ] PricePanel colapsa/expande, inputs son editables
- [ ] MaterialTable agrupa por categoría con badges
- [ ] TotalsBox muestra desglose y total final
- [ ] RoomCard muestra emoji, dimensiones, área
- [ ] Todos los componentes son responsive (320px+)

### Fase 3: Migración de Cotizaciones

- [ ] ApartmentV1 renderiza idéntico al HTML original
- [ ] ApartmentV2 muestra 10 tabs por ambiente
- [ ] BathroomV3 renderiza con medidas corregidas
- [ ] Todos los cálculos coinciden con originales (±1%)
- [ ] SVG floor plans son interactivos
- [ ] Inputs de precios funcionan y recalculan

### Fase 4: PDF + State Management

- [ ] Zustand store persiste en localStorage
- [ ] PDF genera en < 3 segundos
- [ ] PDF incluye header, plano, materiales, totales
- [ ] PDF es legible y profesional
- [ ] Descarga funciona en Chrome, Firefox, Safari
- [ ] Se puede guardar y cargar cotizaciones

### Fase 5: UX Polish + Nuevo Template

- [ ] Animaciones son suaves (< 300ms)
- [ ] Mobile layout es usable
- [ ] Loading states muestran feedback
- [ ] KitchenV1 template funciona correctamente
- [ ] PCT improvement en código duplicado: < 20%

---

## 9. Dependencias

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.4.0",
    "lucide-react": "^0.290.0",
    "jspdf": "^2.5.1",
    "html2canvas": "^1.4.1"
  },
  "devDependencies": {
    "typescript": "^5.2.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.1.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

---

**Fin de spec**
