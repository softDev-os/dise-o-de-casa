import { describe, it, expect } from "vitest";
import { useCalculator } from "../hooks/useCalculator";

describe("useCalculator", () => {
	const calculator = useCalculator();

	describe("calculateArea", () => {
		it("calculates area correctly", () => {
			expect(
				calculator.calculateArea({ width: 2.56, length: 2.66, height: 2.22 }),
			).toBe(6.81);
		});

		it("rounds to 2 decimal places", () => {
			expect(
				calculator.calculateArea({ width: 3.33, length: 3.33, height: 2.22 }),
			).toBe(11.09);
		});
	});

	describe("calculatePerimeter", () => {
		it("calculates perimeter correctly", () => {
			expect(
				calculator.calculatePerimeter({
					width: 2.56,
					length: 2.66,
					height: 2.22,
				}),
			).toBe(10.44);
		});
	});

	describe("calculateWallArea", () => {
		it("calculates wall area correctly", () => {
			expect(
				calculator.calculateWallArea({
					width: 2.56,
					length: 2.66,
					height: 2.22,
				}),
			).toBe(23.18);
		});
	});

	describe("calculateMaterialQuantity", () => {
		it("calculates quantity without waste", () => {
			expect(calculator.calculateMaterialQuantity(13.2, [0.6, 0.3], 0)).toBe(
				74,
			);
		});

		it("calculates quantity with 10% waste", () => {
			expect(calculator.calculateMaterialQuantity(13.2, [0.6, 0.3], 10)).toBe(
				81,
			);
		});

		it("rounds up to nearest integer", () => {
			expect(calculator.calculateMaterialQuantity(10, [0.6, 0.3], 10)).toBe(62);
		});
	});

	describe("calculateSubtotal", () => {
		it("calculates subtotal from materials array", () => {
			const materials = [
				{
					id: "1",
					name: "Test",
					category: "piso" as const,
					quantity: 10,
					unit: "und",
					unitPrice: 1000,
					total: 10000,
				},
				{
					id: "2",
					name: "Test 2",
					category: "pared" as const,
					quantity: 5,
					unit: "m²",
					unitPrice: 2000,
					total: 10000,
				},
			];
			expect(calculator.calculateSubtotal(materials)).toBe(20000);
		});

		it("returns 0 for empty array", () => {
			expect(calculator.calculateSubtotal([])).toBe(0);
		});
	});

	describe("calculateTotal", () => {
		it("calculates total with unforeseen percentage", () => {
			expect(calculator.calculateTotal(1000000, 500000, 8)).toBe(1620000);
		});

		it("rounds to nearest integer", () => {
			expect(calculator.calculateTotal(100000, 50000, 8)).toBe(162000);
		});
	});

	describe("formatCurrency", () => {
		it("formats number as COP currency", () => {
			expect(calculator.formatCurrency(1234567)).toBe("1.234.567");
		});

		it("formats small numbers", () => {
			expect(calculator.formatCurrency(1000)).toBe("1.000");
		});
	});
});
