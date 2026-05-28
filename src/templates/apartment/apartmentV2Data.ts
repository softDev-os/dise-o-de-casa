import { type FloorPlanRoom } from '../../types';
import { apartmentV1Data } from '../apartment/apartmentV1Data';

// Reuse the same floor plan
export const apartmentV2FloorPlan: FloorPlanRoom[] = [
  { id: 'hab-p', name: 'HAB. P', x: 0, y: 0, width: 2.56, height: 2.66, variant: 'teal', area: 6.81, dimensions: '2.56×2.66' },
  { id: 'bano', name: 'BAÑO', x: 2.56, y: 0, width: 1.80, height: 1.81, variant: 'blue', area: 3.26, dimensions: '1.80×1.81' },
  { id: 'lavadero', name: 'LAV', x: 4.36, y: 0, width: 0.80, height: 1.80, variant: 'purple', area: 1.44, dimensions: '0.80×1.80' },
  { id: 'cocina', name: 'COCINA', x: 5.16, y: 0, width: 2.66, height: 2.00, variant: 'gold', area: 5.32, dimensions: '2.66×2.00' },
  { id: 'hab-r', name: 'HAB. R', x: 0, y: 2.66, width: 2.66, height: 3.50, variant: 'green', area: 9.31, dimensions: '2.66×3.50' },
  { id: 'hab-a', name: 'HAB. A', x: 2.66, y: 1.81, width: 2.51, height: 3.50, variant: 'red', area: 8.79, dimensions: '2.51×3.50' },
  { id: 'sala', name: 'SALA', x: 5.17, y: 2.00, width: 2.67, height: 3.54, variant: 'purple', area: 9.45, dimensions: '2.67×3.54' },
];

// Reuse the same quotation data
export const apartmentV2Data = apartmentV1Data;

// Pills for header
export const apartmentV2Pills = [
  { icon: '📐', label: '8.06 × 6.28 m', variant: 'teal' as const },
  { icon: '🛏', label: '3 Habitaciones', variant: 'gold' as const },
  { icon: '🛁', label: 'Baño + Lavadero', variant: 'blue' as const },
  { icon: '🍳', label: 'Cocina + Sala', variant: 'red' as const },
  { icon: '📏', label: 'Alto: 2.22 m', variant: 'purple' as const },
];
