import {
	type Quotation,
	type Room,
	type Material,
	type PriceConfig,
} from "../types";
import { useCalculator } from "./useCalculator";

export function useQuotation() {
	const {
		calculateArea,
		calculatePerimeter,
		calculateWallArea,
		calculateSubtotal,
		calculateLaborTotal,
		calculateTotal,
		calculateUnforeseen,
	} = useCalculator();

	/**
	 * Actualiza un room específico en la cotización
	 */
	const updateRoom = (
		quotation: Quotation,
		roomId: string,
		updates: Partial<Room>,
	): Quotation => {
		const updatedRooms = quotation.rooms.map((room) =>
			room.id === roomId ? { ...room, ...updates } : room,
		);
		return recalculate({ ...quotation, rooms: updatedRooms });
	};

	/**
	 * Actualiza un material específico en un room
	 */
	const updateMaterial = (
		quotation: Quotation,
		roomId: string,
		materialId: string,
		updates: Partial<Material>,
	): Quotation => {
		const updatedRooms = quotation.rooms.map((room) => {
			if (room.id !== roomId) return room;
			const updatedMaterials = room.materials.map((mat) =>
				mat.id === materialId
					? {
							...mat,
							...updates,
							total:
								(updates.quantity || mat.quantity) *
								(updates.unitPrice || mat.unitPrice),
							laborTotal: updates.laborPrice
								? (updates.quantity || mat.quantity) * updates.laborPrice
								: mat.laborTotal,
						}
					: mat,
			);
			return { ...room, materials: updatedMaterials };
		});
		return recalculate({ ...quotation, rooms: updatedRooms });
	};

	/**
	 * Actualiza la configuración de precios
	 */
	const updatePrices = (
		quotation: Quotation,
		prices: Partial<PriceConfig>,
	): Quotation => {
		return recalculate({
			...quotation,
			prices: { ...quotation.prices, ...prices },
		});
	};

	/**
	 * Recalcula todos los totales de la cotización
	 */
	const recalculate = (quotation: Quotation): Quotation => {
		const updatedRooms = quotation.rooms.map((room) => {
			const subtotal = calculateSubtotal(room.materials);
			const laborTotal = calculateLaborTotal(room.materials);
			return {
				...room,
				subtotal,
				laborTotal,
				area: calculateArea(room.dimensions),
				wallArea: calculateWallArea(room.dimensions),
				perimeter: calculatePerimeter(room.dimensions),
			};
		});

		const subtotal = updatedRooms.reduce((sum, room) => sum + room.subtotal, 0);
		const laborTotal = updatedRooms.reduce(
			(sum, room) => sum + room.laborTotal,
			0,
		);
		const unforeseen = calculateUnforeseen(
			subtotal,
			laborTotal,
			quotation.prices.imprevistos,
		);
		const total = calculateTotal(
			subtotal,
			laborTotal,
			quotation.prices.imprevistos,
		);

		return {
			...quotation,
			rooms: updatedRooms,
			subtotal,
			laborTotal,
			unforeseen,
			total,
		};
	};

	/**
	 * Exporta la cotización como JSON
	 */
	const exportJSON = (quotation: Quotation): string => {
		return JSON.stringify(quotation, null, 2);
	};

	/**
	 * Importa una cotización desde JSON
	 */
	const importJSON = (json: string): Quotation => {
		const parsed = JSON.parse(json);
		return recalculate(parsed);
	};

	/**
	 * Crea una cotización vacía
	 */
	const createEmpty = (title: string, tag: string): Quotation => {
		return {
			id: crypto.randomUUID(),
			title,
			tag,
			date: new Date(),
			rooms: [],
			prices: {
				piso: { material: 35000, manoObra: 20000 },
				pared: { material: 15000, manoObra: 0 },
				techo: { material: 28000, manoObra: 20000 },
				electricidad: { punto: 45000 },
				carpinteria: { puerta: 380000 },
				revestimiento: { material: 50000, manoObra: 25000 },
				impermeabilizacion: { material: 25000 },
				imprevistos: 8,
			},
			subtotal: 0,
			laborTotal: 0,
			unforeseen: 0,
			total: 0,
			currency: "COP",
		};
	};

	return {
		updateRoom,
		updateMaterial,
		updatePrices,
		recalculate,
		exportJSON,
		importJSON,
		createEmpty,
	};
}
