import { type RoomVariant } from "../../types";

interface MetricCardProps {
	icon: string;
	label: string;
	value: number | string;
	unit?: string;
	subtitle?: string;
	variant?: RoomVariant;
}

const variantStyles: Record<RoomVariant, string> = {
	teal: "border-t-accent",
	green: "border-t-green",
	gold: "border-t-gold",
	blue: "border-t-blue",
	purple: "border-t-purple",
	red: "border-t-red",
};

export function MetricCard({
	icon,
	label,
	value,
	unit,
	subtitle,
	variant = "teal",
}: MetricCardProps) {
	return (
		<div
			className={`
        bg-card border border-border rounded-xl p-4 relative overflow-hidden
        border-t-3 ${variantStyles[variant]}
        transition-all duration-200 hover:border-accent/30 hover:-translate-y-0.5
      `}
		>
			<div className="text-xl mb-1.5">{icon}</div>
			<div className="text-[9px] tracking-[2px] uppercase text-muted mb-1 font-semibold">
				{label}
			</div>
			<div className="font-display text-2xl text-light leading-none">
				{value}
				{unit && <span className="text-xs text-muted ml-1">{unit}</span>}
			</div>
			{subtitle && (
				<div className="text-[10px] text-muted mt-1">{subtitle}</div>
			)}
		</div>
	);
}
