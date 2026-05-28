import { type Dimensions, type Material } from "../types";

export function useCalculator() {
	/**
	 * Calcula el área de un rectángulo
	 */
	const calculateArea = (dims: Dimensions): number => {
		return Math.round(dims.width * dims.length * 100) / 100;
	};

	/**
	 * Calcula el perímetro de un rectángulo
	 */
	const calculatePerimeter = (dims: Dimensions): number => {
		return Math.round(2 * (dims.width + dims.length) * 100) / 100;
	};

	/**
	 * Calcula el área de las paredes (perímetro × alto)
	 */
	const calculateWallArea = (dims: Dimensions): number => {
		const perimeter = calculatePerimeter(dims);
		return Math.round(perimeter * dims.height * 100) / 100;
	};

	/**
	 * Calcula la cantidad de material necesaria
	 * @param area - Área a cubrir (m²)
	 * @param unitSize - Tamaño de cada unidad [ancho, alto] en metros
	 * @param waste - Porcentaje de desperdicio (default 10%)
	 */
	const calculateMaterialQuantity = (
		area: number,
		unitSize: [number, number],
		waste: number = 10,
	): number => {
		const unitArea = unitSize[0] * unitSize[1];
		const unitsNeeded = area / unitArea;
		const withWaste = unitsNeeded * (1 + waste / 100);
		return Math.ceil(withWaste);
	};

	/**
	 * Calcula el subtotal de una lista de materiales
	 */
	const calculateSubtotal = (materials: Material[]): number => {
		return materials.reduce((sum, mat) => sum + mat.total, 0);
	};

	/**
	 * Calcula el total de mano de obra
	 */
	const calculateLaborTotal = (materials: Material[]): number => {
		return materials.reduce((sum, mat) => sum + (mat.laborTotal || 0), 0);
	};

	/**
	 * Calcula el total general
	 */
	const calculateTotal = (
		subtotal: number,
		labor: number,
		unforeseenPercent: number,
	): number => {
		const base = subtotal + labor;
		const unforeseen = base * (unforeseenPercent / 100);
		return Math.round(base + unforeseen);
	};

	/**
	 * Calcula el monto de imprevistos
	 */
	const calculateUnforeseen = (
		subtotal: number,
		labor: number,
		unforeseenPercent: number,
	): number => {
		const base = subtotal + labor;
		return Math.round(base * (unforeseenPercent / 100));
	};

	/**
	 * Formatea un número como moneda COP
	 */
	const formatCurrency = (value: number): string => {
		return new Intl.NumberFormat("es-CO", {
			style: "decimal",
			minimumFractionDigits: 0,
		}).format(value);
	};

	return {
		calculateArea,
		calculatePerimeter,
		calculateWallArea,
		calculateMaterialQuantity,
		calculateSubtotal,
		calculateLaborTotal,
		calculateTotal,
		calculateUnforeseen,
		formatCurrency,
	};
}
