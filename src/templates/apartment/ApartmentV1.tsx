import { useState } from "react";
import { Header, Footer, PricePanel } from "../../components/layout";
import { Tabs } from "../../components/ui";
import { FloorPlan } from "../../components/floor-plan";
import { MaterialTable, QuotationSummary } from "../../components/quotation";
import { usePDF } from "../../hooks";
import {
	apartmentV1Data,
	apartmentV1FloorPlan,
	apartmentV1Pills,
} from "./apartmentV1Data";
import { type PriceConfig } from "../../types";

export function ApartmentV1() {
	const [activeTab, setActiveTab] = useState("plano");
	const [prices, setPrices] = useState<PriceConfig>(apartmentV1Data.prices);
	const { downloadPDF, isGenerating } = usePDF();

	const tabs = [
		{ id: "plano", label: "Plano General", icon: "🏠" },
		{ id: "materiales", label: "Materiales", icon: "🧱" },
		{ id: "resumen", label: "Resumen Total", icon: "📊" },
	];

	const priceFields = [
		{
			key: "piso.material",
			label: "Piso material (m²)",
			prefix: "$",
			hint: "Porcelanato / baldosa",
		},
		{
			key: "piso.manoObra",
			label: "M.O. piso (m²)",
			prefix: "$",
			hint: "Nivelación+pegante+fragua",
		},
		{
			key: "pared.material",
			label: "Pintura paredes (m²)",
			prefix: "$",
			hint: "Material + M.O. 2 manos",
		},
		{
			key: "techo.material",
			label: "Pintura cielorraso (m²)",
			prefix: "$",
			hint: "Material + M.O.",
		},
		{
			key: "revestimiento.material",
			label: "Revestimiento mat. (m²)",
			prefix: "$",
			hint: "Cerámica zona húmeda",
		},
		{
			key: "revestimiento.manoObra",
			label: "M.O. revestimiento (m²)",
			prefix: "$",
			hint: "Enchape piso + paredes",
		},
		{
			key: "carpinteria.puerta",
			label: "Carpintería puerta (und)",
			prefix: "$",
			hint: "HDF + marco + bisagras",
		},
		{
			key: "imprevistos",
			label: "Imprevistos (%)",
			suffix: "%",
			hint: "% sobre total obra",
		},
	];

	const handlePriceChange = (key: string, value: number) => {
		const keys = key.split(".");
		if (keys.length === 2) {
			setPrices((prev) => ({
				...prev,
				[keys[0]]: {
					...(prev[keys[0] as keyof PriceConfig] as Record<string, number>),
					[keys[1]]: value,
				},
			}));
		} else {
			setPrices((prev) => ({ ...prev, [key]: value }));
		}
	};

	const handleRecalculate = () => {
		// In a real app, this would recalculate all materials based on new prices
		console.log("Recalculating with prices:", prices);
	};

	return (
		<div className="min-h-screen bg-bg">
			<Header
				tag={apartmentV1Data.tag}
				title="APARTAMENTO"
				subtitle="COMPLETO"
				pills={apartmentV1Pills}
			/>

			<div className="max-w-[980px] mx-auto px-4 py-6">
				<Tabs items={tabs} activeId={activeTab} onChange={setActiveTab} />

				<main className="mt-6">
					{/* Tab: Plano */}
					{activeTab === "plano" && (
						<div>
							<div className="font-display text-lg tracking-[2px] text-accent mb-4">
								PLANO DEL APARTAMENTO
							</div>
							<div className="bg-card border border-border rounded-2xl p-5 flex flex-col lg:flex-row gap-6 items-start">
								<FloorPlan
									rooms={apartmentV1FloorPlan}
									width={8.06}
									height={6.28}
									scale={25}
									showGrid={true}
									showDimensions={true}
								/>
								<div className="flex-1 min-w-[200px] flex flex-col gap-2">
									{apartmentV1FloorPlan.map((room) => (
										<div
											key={room.id}
											className="flex items-center gap-2 text-xs"
										>
											<div
												className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
												style={{ backgroundColor: `var(--${room.variant})` }}
											/>
											<span className="text-muted">{room.name}</span>
											<span className="text-light font-semibold ml-auto">
												{room.area} m²
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Tab: Materiales */}
					{activeTab === "materiales" && (
						<div>
							<PricePanel
								title="CONFIGURAR PRECIOS (COP)"
								description="clic para expandir"
								fields={priceFields}
								values={{
									"piso.material": prices.piso.material,
									"piso.manoObra": prices.piso.manoObra,
									"pared.material": prices.pared.material,
									"techo.material": prices.techo.material,
									"revestimiento.material": prices.revestimiento.material,
									"revestimiento.manoObra": prices.revestimiento.manoObra,
									"carpinteria.puerta": prices.carpinteria.puerta,
									imprevistos: prices.imprevistos,
								}}
								onChange={handlePriceChange}
								onRecalculate={handleRecalculate}
							/>
							{apartmentV1Data.rooms.map((room) => (
								<div key={room.id}>
									<div className="font-display text-lg tracking-[2px] text-accent mb-3">
										{room.emoji} {room.name}
									</div>
									<MaterialTable materials={room.materials} showLabor={true} />
								</div>
							))}
						</div>
					)}

					{/* Tab: Resumen */}
					{activeTab === "resumen" && (
						<div>
							<div className="font-display text-lg tracking-[2px] text-accent mb-4">
								RESUMEN TOTAL
							</div>
							<QuotationSummary
								rooms={apartmentV1Data.rooms}
								subtotal={apartmentV1Data.subtotal}
								laborTotal={apartmentV1Data.laborTotal}
								unforeseen={apartmentV1Data.unforeseen}
								total={apartmentV1Data.total}
							/>
							<button
								onClick={() => downloadPDF(apartmentV1Data)}
								disabled={isGenerating}
								className="mt-6 w-full bg-accent text-bg border-none rounded-lg py-3 font-display text-xl tracking-[2px] cursor-pointer transition-all duration-200 hover:bg-accent-2 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isGenerating ? "⏳ Generando PDF..." : "📄 DESCARGAR PDF"}
							</button>
						</div>
					)}
				</main>
			</div>

			<Footer />
		</div>
	);
}
