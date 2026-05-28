import { type Material, type MaterialCategory } from "../../types";
import { Badge } from "../ui";

interface MaterialTableProps {
	materials: Material[];
	showLabor?: boolean;
	compact?: boolean;
}

const categoryLabels: Record<MaterialCategory, string> = {
	piso: "PISO",
	pared: "PARED",
	techo: "TECHO",
	electricidad: "ELECTRICIDAD",
	carpinteria: "CARPINTERÍA",
	revestimiento: "REVESTIMIENTO",
	impermeabilizacion: "IMPERMEABILIZACIÓN",
	accesorio: "ACCESORIO",
};

export function MaterialTable({
	materials,
	showLabor = false,
}: MaterialTableProps) {
	// Group materials by category
	const grouped = materials.reduce(
		(acc, mat) => {
			if (!acc[mat.category]) {
				acc[mat.category] = [];
			}
			acc[mat.category].push(mat);
			return acc;
		},
		{} as Record<MaterialCategory, Material[]>,
	);

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("es-CO", {
			style: "decimal",
			minimumFractionDigits: 0,
		}).format(value);
	};

	return (
		<div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
			{/* Table header */}
			<div
				className={`
        grid ${showLabor ? "grid-cols-[2fr_0.8fr_0.9fr_0.9fr_1fr]" : "grid-cols-[2fr_0.8fr_1fr_1fr]"}
        px-4 py-2.5 bg-accent/5 border-b border-border
        text-[9px] tracking-[2px] uppercase text-muted font-semibold
      `}
			>
				<div>Material</div>
				<div>Cantidad</div>
				<div className="text-right">P. Unitario</div>
				{showLabor && <div className="text-right">M.O.</div>}
				<div className="text-right">Total</div>
			</div>

			{/* Grouped rows */}
			{Object.entries(grouped).map(([category, items]) => (
				<div key={category}>
					{/* Category separator */}
					<div className="px-4 py-1.5 bg-white/2 border-b border-border text-[9px] tracking-[2px] uppercase font-bold text-muted">
						<Badge
							label={categoryLabels[category as MaterialCategory]}
							variant={category as MaterialCategory}
							size="sm"
						/>
					</div>

					{/* Material rows */}
					{items.map((material) => (
						<div
							key={material.id}
							className={`
                grid ${showLabor ? "grid-cols-[2fr_0.8fr_0.9fr_0.9fr_1fr]" : "grid-cols-[2fr_0.8fr_1fr_1fr]"}
                px-4 py-3 border-b border-border
                transition-colors duration-150 hover:bg-white/2
                last:border-b-0
              `}
						>
							<div>
								<div className="text-sm font-medium text-light">
									{material.name}
								</div>
								{material.detail && (
									<div className="text-[10px] text-muted mt-0.5">
										{material.detail}
									</div>
								)}
							</div>
							<div className="text-xs text-light">
								{material.quantity} {material.unit}
							</div>
							<div className="text-xs text-muted text-right">
								${formatCurrency(material.unitPrice)}
							</div>
							{showLabor && material.laborPrice && (
								<div className="text-xs text-green text-right">
									${formatCurrency(material.laborPrice)}
								</div>
							)}
							<div className="text-sm font-semibold text-accent-2 text-right">
								${formatCurrency(material.total + (material.laborTotal || 0))}
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
