import { useState } from "react";
import { Header, Footer, PricePanel } from "../../components/layout";
import { FloorPlan } from "../../components/floor-plan";
import { MaterialTable, QuotationSummary } from "../../components/quotation";
import { usePDF } from "../../hooks";
import {
	apartmentV2Data,
	apartmentV2FloorPlan,
	apartmentV2Pills,
} from "./apartmentV2Data";
import { type PriceConfig, type Room } from "../../types";

export function ApartmentV2() {
	const [activeTab, setActiveTab] = useState("general");
	const [prices, setPrices] = useState<PriceConfig>(apartmentV2Data.prices);
	const { downloadPDF, isGenerating } = usePDF();

	const tabs = [
		{ id: "general", label: "Plano", icon: "🏠" },
		{ id: "hab-p", label: "Hab. P", icon: "🛏" },
		{ id: "hab-r", label: "Hab. R", icon: "🛏" },
		{ id: "hab-a", label: "Hab. A", icon: "🛏" },
		{ id: "sala", label: "Sala", icon: "🛋" },
		{ id: "bano", label: "Baño", icon: "🛁" },
		{ id: "lavadero", label: "Lavadero", icon: "🫧" },
		{ id: "cocina", label: "Cocina", icon: "🍳" },
		{ id: "pasillo", label: "Pasillo", icon: "🚪" },
		{ id: "total", label: "Total", icon: "📊" },
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
		console.log("Recalculating with prices:", prices);
	};

	const getRoomByTab = (tabId: string): Room | undefined => {
		return apartmentV2Data.rooms.find((r) => r.id === tabId);
	};

	const renderRoomContent = (room: Room) => {
		const roomFloorPlan = apartmentV2FloorPlan.filter((r) => r.id === room.id);

		return (
			<div className="animate-fade-in">
				{/* Room Header */}
				<div className="bg-card border border-border rounded-[14px] p-[18px] flex gap-5 items-center flex-wrap mb-[18px]">
					<span className="text-[38px] flex-shrink-0">{room.emoji}</span>
					<div className="flex-1">
						<div className="font-display text-[28px] tracking-[2px] leading-none">
							{room.name}
						</div>
						<div className="text-[13px] text-muted mt-1">
							{room.dimensions.width}×{room.dimensions.length}m
						</div>
					</div>
					<div className="text-right">
						<div className="font-display text-[38px] text-accent-2 leading-none">
							{room.area}
						</div>
						<div className="text-[14px] text-muted">m²</div>
					</div>
				</div>

				{/* Mini SVG + Legend */}
				<div className="bg-card border border-border rounded-xl p-4 mb-[18px] flex gap-[18px] items-center flex-wrap">
					<FloorPlan
						rooms={roomFloorPlan}
						width={room.dimensions.width}
						height={room.dimensions.length}
						scale={40}
						showGrid={true}
						showDimensions={false}
					/>
					<div className="flex flex-col gap-[7px] flex-1 min-w-[160px]">
						<div className="flex items-center gap-2 text-[11px]">
							<div className="w-2 h-2 rounded-sm flex-shrink-0 bg-accent" />
							<span className="text-muted">Piso</span>
							<span className="text-light font-semibold ml-auto">
								{room.area} m²
							</span>
						</div>
						<div className="flex items-center gap-2 text-[11px]">
							<div className="w-2 h-2 rounded-sm flex-shrink-0 bg-gold" />
							<span className="text-muted">Paredes</span>
							<span className="text-light font-semibold ml-auto">
								{room.wallArea} m²
							</span>
						</div>
						<div className="flex items-center gap-2 text-[11px]">
							<div className="w-2 h-2 rounded-sm flex-shrink-0 bg-green" />
							<span className="text-muted">Perímetro</span>
							<span className="text-light font-semibold ml-auto">
								{room.perimeter} m
							</span>
						</div>
					</div>
				</div>

				{/* Metrics */}
				<div className="grid grid-cols-3 gap-[9px] mb-[18px]">
					<div className="bg-card border border-border rounded-[10px] p-3 relative overflow-hidden border-t-[2px] border-t-accent">
						<div className="text-base mb-1">🪨</div>
						<div className="text-[8px] tracking-[2px] uppercase text-muted mb-0.5">
							Piso
						</div>
						<div className="font-display text-[22px] text-light leading-none">
							{room.area} <span className="text-[11px] text-muted">m²</span>
						</div>
					</div>
					<div className="bg-card border border-border rounded-[10px] p-3 relative overflow-hidden border-t-[2px] border-t-gold">
						<div className="text-base mb-1">🧱</div>
						<div className="text-[8px] tracking-[2px] uppercase text-muted mb-0.5">
							Paredes
						</div>
						<div className="font-display text-[22px] text-light leading-none">
							{room.wallArea} <span className="text-[11px] text-muted">m²</span>
						</div>
					</div>
					<div className="bg-card border border-border rounded-[10px] p-3 relative overflow-hidden border-t-[2px] border-t-green">
						<div className="text-base mb-1">📐</div>
						<div className="text-[8px] tracking-[2px] uppercase text-muted mb-0.5">
							Perímetro
						</div>
						<div className="font-display text-[22px] text-light leading-none">
							{room.perimeter} <span className="text-[11px] text-muted">m</span>
						</div>
					</div>
				</div>

				{/* Material Table */}
				<MaterialTable materials={room.materials} showLabor={true} />

				{/* Subtotal Box */}
				<div className="bg-gradient-to-br from-[#141e1a] to-[#0f1512] border border-accent/20 rounded-[14px] p-[18px] mb-[18px] relative overflow-hidden">
					<div className="absolute -bottom-10 -right-[30px] w-[140px] h-[140px] rounded-full bg-radial-[at_center] from-accent/6 to-transparent" />
					<div className="flex justify-between py-1.5 border-b border-border text-xs">
						<span className="text-muted">Materiales</span>
						<span className="text-light font-semibold">
							${new Intl.NumberFormat("es-CO").format(room.subtotal)}
						</span>
					</div>
					<div className="flex justify-between py-1.5 border-b border-border text-xs">
						<span className="text-muted">Mano de obra</span>
						<span className="text-light font-semibold">
							${new Intl.NumberFormat("es-CO").format(room.laborTotal)}
						</span>
					</div>
					<div className="flex justify-between items-end mt-3.5 pt-3.5 border-t border-accent/20">
						<div className="font-display text-sm tracking-[3px] text-accent">
							SUBTOTAL {room.name.toUpperCase()}
						</div>
						<div className="font-display text-[36px] text-accent-2 leading-none">
							$
							{new Intl.NumberFormat("es-CO").format(
								room.subtotal + room.laborTotal,
							)}
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-bg">
			<Header
				tag={apartmentV2Data.tag}
				title="APARTAMENTO"
				subtitle="POR AMBIENTE"
				pills={apartmentV2Pills}
			/>

			{/* Global price panel */}
			<div className="bg-card-2 border-b border-border">
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
			</div>

			{/* Tabs */}
			<div className="border-b border-border bg-card-2 overflow-x-auto">
				<div className="flex min-w-max">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`
                px-4 py-3 text-[10px] tracking-[1.5px] uppercase font-semibold
                whitespace-nowrap cursor-pointer select-none
                border-b-2 transition-all duration-200
                ${
									activeTab === tab.id
										? "text-accent border-b-accent"
										: "text-muted border-b-transparent hover:text-light"
								}
              `}
						>
							{tab.icon && <span className="mr-1">{tab.icon}</span>}
							{tab.label}
						</button>
					))}
				</div>
			</div>

			<main className="px-4 py-5 max-w-[980px] mx-auto pb-[60px]">
				{/* Tab: Plano General */}
				{activeTab === "general" && (
					<div className="animate-fade-in">
						<div className="font-display text-lg tracking-[2px] text-accent mb-3 flex items-center gap-2.5">
							PLANO GENERAL DEL APARTAMENTO
							<div className="flex-1 h-px bg-border" />
						</div>
						<div className="bg-card border border-border rounded-[14px] p-5 flex flex-col lg:flex-row gap-5 items-start mb-[18px]">
							<FloorPlan
								rooms={apartmentV2FloorPlan}
								width={8.06}
								height={6.28}
								scale={25}
								showGrid={true}
								showDimensions={true}
							/>
							<div className="flex-1 min-w-[180px] flex flex-col gap-[7px]">
								{apartmentV2FloorPlan.map((room) => (
									<div
										key={room.id}
										className="flex items-center gap-2 text-[11px]"
									>
										<div
											className="w-2 h-2 rounded-sm flex-shrink-0"
											style={{
												backgroundColor: `var(--color-${room.variant})`,
											}}
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

				{/* Tabs: Individual rooms */}
				{tabs.slice(1, 9).map((tab) => {
					const room = getRoomByTab(tab.id);
					if (!room || activeTab !== tab.id) return null;
					return <div key={tab.id}>{renderRoomContent(room)}</div>;
				})}

				{/* Tab: Total */}
				{activeTab === "total" && (
					<div className="animate-fade-in">
						<div className="font-display text-lg tracking-[2px] text-accent mb-3 flex items-center gap-2.5">
							RESUMEN FINAL
							<div className="flex-1 h-px bg-border" />
						</div>
						<QuotationSummary
							rooms={apartmentV2Data.rooms}
							subtotal={apartmentV2Data.subtotal}
							laborTotal={apartmentV2Data.laborTotal}
							unforeseen={apartmentV2Data.unforeseen}
							total={apartmentV2Data.total}
						/>
						<button
							onClick={() => downloadPDF(apartmentV2Data)}
							disabled={isGenerating}
							className="mt-[18px] w-full bg-accent text-bg border-none rounded-[7px] py-[11px] font-display text-lg tracking-[2px] cursor-pointer transition-all duration-200 hover:bg-accent-2 hover:-translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isGenerating ? "⏳ Generando PDF..." : "📄 DESCARGAR PDF"}
						</button>
					</div>
				)}
			</main>

			<Footer />
		</div>
	);
}
