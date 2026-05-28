// types/quotation.ts

export type Currency = 'COP';

export type MaterialCategory =
  | 'piso'
  | 'pared'
  | 'techo'
  | 'electricidad'
  | 'carpinteria'
  | 'revestimiento'
  | 'impermeabilizacion'
  | 'accesorio';

export type RoomVariant = 'teal' | 'green' | 'gold' | 'blue' | 'purple' | 'red';

export interface Dimensions {
  width: number;   // metros
  length: number;  // metros
  height: number;  // metros
}

export interface Material {
  id: string;
  name: string;
  detail?: string;
  category: MaterialCategory;
  quantity: number;
  unit: string;        // "m²", "und", "m", "punto"
  unitPrice: number;   // COP
  total: number;       // quantity * unitPrice
  laborPrice?: number; // COP por unidad
  laborTotal?: number; // laborPrice * quantity
}

export interface Room {
  id: string;
  name: string;
  emoji: string;
  dimensions: Dimensions;
  area: number;        // m²
  wallArea?: number;   // m²
  perimeter?: number;  // m
  materials: Material[];
  subtotal: number;    // sum(materials.total)
  laborTotal: number;  // sum(materials.laborTotal)
  variant: RoomVariant;
}

export interface PriceConfig {
  piso: { material: number; manoObra: number };
  pared: { material: number; manoObra: number };
  techo: { material: number; manoObra: number };
  electricidad: { punto: number };
  carpinteria: { puerta: number };
  revestimiento: { material: number; manoObra: number };
  impermeabilizacion: { material: number };
  imprevistos: number; // porcentaje (ej: 8 = 8%)
}

export interface Quotation {
  id: string;
  title: string;
  tag: string;         // "Presupuesto de Obra · Bogotá 2026"
  client?: string;
  date: Date;
  rooms: Room[];
  prices: PriceConfig;
  subtotal: number;    // sum(rooms.subtotal)
  laborTotal: number;  // sum(rooms.laborTotal)
  unforeseen: number;  // (subtotal + laborTotal) * imprevistos%
  total: number;       // subtotal + laborTotal + unforeseen
  currency: Currency;
}

export interface Pill {
  icon?: string;
  label: string;
  variant: RoomVariant;
}

export interface FloorPlanRoom {
  id: string;
  name: string;
  x: number;          // metros desde izquierda
  y: number;          // metros desde arriba
  width: number;      // metros
  height: number;     // metros
  variant: RoomVariant;
  showLabel?: boolean;
  area?: number;
  dimensions?: string;
}

export interface UserPreferences {
  currency: Currency;
  language: 'es';
  theme: 'dark';
  defaultMargin: number;
  showPlanoByDefault: boolean;
}
