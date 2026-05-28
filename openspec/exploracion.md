# Exploración — diseño-de-casa

**Fecha**: 2026-05-28
**Fase**: SDD Explore

---

## 1. Visión General del Proyecto

**Nombre**: diseño-de-casa
**Tipo**: Sistema de cotizaciones profesionales para construcción/renovación
**Ubicación**: /home/softdev/work/diseño-de-casa

Es un proyecto **standalone HTML** (no usa framework ni build system). Cada archivo `.html` es una cotización completa autocontenida.

---

## 2. Estructura del Proyecto

```
diseño-de-casa/
├── cotizacion_apartamento_v1.html   (55 KB)
├── cotizacion_apartamento_v2.html   (53 KB)
├── cotizacion_bano_v3.html          (42 KB)
├── IMG_*.jpg                        (6 fotos del sitio)
├── creado con gemini casa medidas.png (plano original)
├── .atl/
│   └── skill-registry.md
└── .pi/
    └── settings.json
```

---

## 3. Análisis de Archivos

### 3.1 cotizacion_apartamento_v1.html

**Título**: "Cotización Apartamento — Bogotá 2026"
**Propósito**: Presupuesto de obra para apartamento completo

**Especificaciones del apartamento**:
- Dimensiones: 8.06 × 6.28 m = 50.6 m²
- Alto: 2.22 m
- 3 Habitaciones (Hab P: 6.81m², Hab R: 9.31m², Hab A: 8.79m²)
- Baño (3.26 m²), Lavadero (1.44 m²)
- Cocina (5.32 m²), Sala (9.45 m²)
- Pasillo central (2.51 × 0.78 m)

**Estructura de tabs** (3):
1. 🏠 Plano General — SVG interactivo con layout
2. 🧱 Materiales — Tabla detallada por categoría
3. 📊 Resumen Total — Totales y progreso

**Sistema de precios**:
- Inputs editables (COP colombianos)
- Categorías: piso, paredes, techo, electricidad, carpintería, etc.
- Botón "RECALCULAR" para actualizar totales
- % de imprevistos configurable

---

### 3.2 cotizacion_apartamento_v2.html

**Título**: "Apartamento Por Ambiente"
**Propósito**: Versión más detallada, desglosada por ambiente

**Mismas dimensiones** que v1, pero con:
- 10 tabs (una por ambiente):
  - 🏠 Plano (general)
  - 🛏 Hab. P
  - 🛏 Hab. R
  - 🛏 Hab. A
  - 🛑 Sala
  - 🛁 Baño
  - 🫧 Lavadero
  - 🍳 Cocina
  - 🚪 Pasillo
  - 📊 Total

**Panel de precios global**:
- Configuración centralizada de costos
- Afecta todos los ambientes
- Botón "RECALCULAR TODO EL APARTAMENTO"

**Mejora respecto a v1**:
- Más granular por ambiente
- Cada ambiente tiene su propia tabla de materiales
- Más profesional para presentar al cliente

---

### 3.3 cotizacion_bano_v3.html

**Título**: "Baño Completo"
**Propósito**: Cotización específica para renovación de baño

**Especificaciones del baño**:
- Dimensiones: 6 × 2.20 m = 13.2 m²
- Paredes: ~2.40 m alto = 39.36 m²
- Baldosas necesarias: 322 unidades (60×30cm + 10% desperdicio)

**Estructura de tabs** (3):
1. 🪨 Piso & Paredes — Plano, áreas, precios de baldosa
2. 🚿 Accesorios — Ducha, inodoro, lavamanos, etc.
3. 📊 Total — Resumen final

**Características**:
- Alerta de medidas corregidas (banner amarillo)
- Cards de accesorios con especificaciones
- SVG con layout del baño y fixtures

---

## 4. Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Markup | HTML5 semántico |
| Estilo | CSS3 con Custom Properties (theming) |
| Lógica | JavaScript vanilla (sin framework) |
| Gráficos | SVG inline (planos interactivos) |
| Tipografía | Google Fonts (Bebas Neue + DM Sans) |
| Build | Ninguno (archivos estáticos) |

---

## 5. Patrones de Diseño UI

### Paleta de colores (CSS Custom Properties):
```css
--bg: #0c0f0e        /* Fondo principal */
--card: #141918       /* Tarjetas */
--accent: #6ec8a9     /* Teal (principal) */
--accent2: #8ee8c8    /* Teal claro */
--light: #e0f0eb      /* Texto principal */
--muted: #607a72      /* Texto secundario */
--green: #6eb88a      /* Habitaciones */
--blue: #7a9ec8       /* Baño */
--gold: #c8b46e       /* Cocina */
--red: #d9735a        /* Alertas/accent */
--purple: #a07ec8     /* Lavadero/sala */
```

### Componentes UI recurrentes:
- **Metric cards**: KPIs con ícono, label, valor
- **Room cards**: Info por ambiente con emoji
- **Price panel**: Inputs editables para precios
- **Material table**: Tabla con badges de categoría
- **Totals box**: Resumen con gradiente
- **Progress bars**: Indicadores visuales
- **SVG floor plans**: Planos interactivos con leyenda

### Patrones de interacción:
- Tabs para navegación
- Inputs numéricos para configuración
- Botón "RECALCULAR" para actualizar
- Hover effects en cards
- Responsive (media queries para móvil)

---

## 6. Observaciones y Oportunidades

### Fortalezas:
✅ Diseño visual profesional y consistente
✅ Dark theme atractivo
✅ SVGs bien construidos con escalas precisas
✅ Sistema de precios flexible
✅ Responsive design

### Áreas de mejora identificadas:
⚠️ **Duplicación de código**: Los 3 archivos comparten ~80% del CSS
⚠️ **Sin build system**: Dificulta mantenimiento
⚠️ **JavaScript inline**: Mezclado con HTML, difícil de testear
⚠️ **Sin framework**: Limita reutilización de componentes
⚠️ **Archivos muy grandes**: 42-55 KB cada uno

---

## 7. Preguntas para Continuar

1. **¿Cuál es el objetivo principal del proyecto?**
   - ¿Es una herramienta personal?
   - ¿Es un producto para vender?
   - ¿Es un sitio web público?

2. **¿Qué funcionalidad falta?**
   - ¿Exportar a PDF?
   - ¿Guardar cotizaciones?
   - ¿Comparar versiones?
   - ¿Múltiples usuarios?

3. **¿Hay preferencia tecnológica?**
   - ¿Mantener HTML standalone?
   - ¿Migrar a framework (React, Vue, Angular)?
   - ¿Agregar backend?

4. **¿Cuál es el siguiente paso prioritario?**
   - ¿Refactorizar para reutilización?
   - ¿Agregar nuevas cotizaciones?
   - ¿Mejorar UX?
   - ¿Exportar/generar PDFs?

---

## 8. Recomendación SDD

Dado el estado actual del proyecto, recomiendo:

**Fase SDD siguiente**: `proposal`

El proyecto tiene suficiente contexto para generar una propuesta de arquitectura que aborde:
- Extracción de componentes compartidos
- Sistema de diseño unificado
- Potencial migración a framework
- Roadmap de funcionalidades

---

**Fin de exploración**
