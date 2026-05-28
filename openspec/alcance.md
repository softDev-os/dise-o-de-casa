# Alcance — diseño-de-casa

**Fecha**: 2026-05-28
**Tipo**: Herramienta personal

---

## Objetivo

Sistema personal de cotizaciones profesionales para construcción y renovación de viviendas en Colombia (COP).

---

## Estado Actual

- 3 archivos HTML standalone (v1, v2, v3)
- ~80% código CSS/JS duplicado
- Sin build system
- Dark theme profesional
- SVGs interactivos con planos

---

## Funcionalidades Planeadas (Prioridad)

### 🔴 Prioridad 1: Reducir Duplicación
- Extraer CSS compartido a variables/components
- Unificar paleta de colores y tipografía
- Crear sistema de diseño reutilizable
- Reducir tamaño total de archivos

### 🔴 Prioridad 2: Mejorar UX/UI
- Animaciones suaves (transiciones, hover)
- Mejor responsive design (mobile-first)
- Feedback visual en inputs
- Loading states para cálculos

### 🟡 Prioridad 3: Migrar a Framework
- Evaluar opciones: React, Vue, Angular
- Crear componentes reutilizables:
  - `<MetricCard>`
  - `<PricePanel>`
  - `<MaterialTable>`
  - `<FloorPlanSVG>`
  - `<Tabs>`
- Mantener dark theme

### 🟡 Prioridad 4: Exportar a PDF
- Generar PDF profesional de cotizaciones
- Incluir logo, planos SVG, tablas
- Opciones de formato (A4, Letter)
- Descarga directa

### 🟢 Prioridad 5: Nuevos Tipos de Cotización
- Cocina completa
- Fachada exterior
- Sala/comedor
- Habitación principal
- Lavandería
- Patio/terraza

---

## Stack Target

| Capa | Actual | Target |
|------|--------|--------|
| Markup | HTML5 | Framework (React/Vue) |
| Estilo | CSS3 inline | CSS Modules / Tailwind |
| Lógica | JS vanilla | TypeScript |
| Build | Ninguno | Vite / Next.js |
| PDF | N/A | jsPDF / Puppeteer |

---

## Restricciones

- Moneda: COP (pesos colombianos)
- Medidas: metros / metros cuadrados
- Idioma: Español
- Estilo: Dark theme (paleta teal/gold)

---

## Criterios de Aceptación

- [ ] < 20% código duplicado entre templates
- [ ] Mobile responsive (320px+)
- [ ] Animaciones < 300ms
- [ ] PDF exportable en < 3 segundos
- [ ] 5+ templates de cotización

---

**Fin del alcance**
