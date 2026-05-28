import { type RoomVariant } from "../../types";

interface RoomStat {
	key: string;
	value: string;
}

interface RoomCardProps {
	emoji: string;
	name: string;
	dimensions: string;
	area: number;
	stats: RoomStat[];
	variant: RoomVariant;
	onClick?: () => void;
}

const variantBorderColors: Record<RoomVariant, string> = {
	teal: "border-t-accent",
	green: "border-t-green",
	gold: "border-t-gold",
	blue: "border-t-blue",
	purple: "border-t-purple",
	red: "border-t-red",
};

export function RoomCard({
	emoji,
	name,
	dimensions,
	area,
	stats,
	variant,
	onClick,
}: RoomCardProps) {
	return (
		<div
			onClick={onClick}
			className={`
        bg-card border border-border rounded-[14px] p-4
        transition-all duration-200 cursor-pointer
        hover:border-accent/30 hover:-translate-y-0.5
        ${variantBorderColors[variant]}
        border-t-[3px]
      `}
		>
			{/* Header */}
			<div className="flex items-center gap-2.5 mb-3">
				<span className="text-2xl">{emoji}</span>
				<div>
					<div className="font-display text-base tracking-[1px] text-light">
						{name}
					</div>
					<div className="text-[10px] text-muted">{dimensions} m</div>
				</div>
			</div>

			{/* Stats */}
			<div className="flex flex-col gap-1.5">
				{stats.map((stat, index) => (
					<div key={index} className="flex justify-between text-[11px]">
						<span className="text-muted">{stat.key}</span>
						<span className="text-light font-semibold">{stat.value}</span>
					</div>
				))}
			</div>

			{/* Area */}
			<div className="mt-3 pt-3 border-t border-border font-display text-xl text-accent-2">
				{area} m²
			</div>
		</div>
	);
}
