import { type RoomVariant } from "../../types";

interface RoomProps {
	name: string;
	x: number; // pixels
	y: number;
	width: number; // pixels
	height: number;
	area?: number;
	dimensions?: string;
	variant: RoomVariant;
	showLabel?: boolean;
	onClick?: () => void;
}

const variantColors: Record<
	RoomVariant,
	{ fill: string; stroke: string; text: string; subtext: string }
> = {
	teal: {
		fill: "rgba(110,200,169,0.07)",
		stroke: "var(--accent)",
		text: "var(--accent)",
		subtext: "rgba(110,200,169,0.6)",
	},
	green: {
		fill: "rgba(110,184,138,0.07)",
		stroke: "var(--green)",
		text: "var(--green)",
		subtext: "rgba(110,184,138,0.6)",
	},
	gold: {
		fill: "rgba(200,180,110,0.07)",
		stroke: "var(--gold)",
		text: "var(--gold)",
		subtext: "rgba(200,180,110,0.6)",
	},
	blue: {
		fill: "rgba(122,158,200,0.08)",
		stroke: "var(--blue)",
		text: "var(--blue)",
		subtext: "rgba(122,158,200,0.6)",
	},
	purple: {
		fill: "rgba(160,126,200,0.08)",
		stroke: "var(--purple)",
		text: "var(--purple)",
		subtext: "rgba(160,126,200,0.4)",
	},
	red: {
		fill: "rgba(217,115,90,0.06)",
		stroke: "var(--red)",
		text: "var(--red)",
		subtext: "rgba(217,115,90,0.6)",
	},
};

export function Room({
	name,
	x,
	y,
	width,
	height,
	area,
	dimensions,
	variant,
	showLabel = true,
	onClick,
}: RoomProps) {
	const colors = variantColors[variant];
	const centerX = x + width / 2;
	const centerY = y + height / 2;

	return (
		<g onClick={onClick} className={onClick ? "cursor-pointer" : ""}>
			{/* Room rectangle */}
			<rect
				x={x}
				y={y}
				width={width}
				height={height}
				fill={colors.fill}
				stroke={colors.stroke}
				strokeWidth={1.5}
				rx={2}
			/>

			{/* Labels */}
			{showLabel && (
				<>
					<text
						x={centerX}
						y={centerY - (area ? 12 : 0)}
						fill={colors.text}
						fontSize={8.5}
						fontFamily="Bebas Neue"
						textAnchor="middle"
						letterSpacing={1}
					>
						{name}
					</text>

					{dimensions && (
						<text
							x={centerX}
							y={centerY + (area ? 2 : 10)}
							fill={colors.subtext}
							fontSize={7}
							fontFamily="DM Sans"
							textAnchor="middle"
						>
							{dimensions}
						</text>
					)}

					{area && (
						<text
							x={centerX}
							y={centerY + (dimensions ? 14 : 10)}
							fill={colors.subtext}
							fontSize={7.5}
							fontFamily="DM Sans"
							textAnchor="middle"
						>
							{area} m²
						</text>
					)}
				</>
			)}
		</g>
	);
}
