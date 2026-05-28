interface DimensionLineProps {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	label: string;
	color?: string;
	offset?: number; // Distancia del label a la línea
}

export function DimensionLine({
	x1,
	y1,
	x2,
	y2,
	label,
	color = "var(--accent)",
	offset = 12,
}: DimensionLineProps) {
	const isHorizontal = Math.abs(y2 - y1) < Math.abs(x2 - x1);
	const midX = (x1 + x2) / 2;
	const midY = (y1 + y2) / 2;

	// Calculate label position
	const labelX = isHorizontal ? midX : midX + offset;
	const labelY = isHorizontal ? midY - offset : midY;

	return (
		<g>
			{/* Main line */}
			<line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={0.8} />

			{/* Start cap */}
			<line
				x1={isHorizontal ? x1 : x1 - 3}
				y1={isHorizontal ? y1 - 3 : y1}
				x2={isHorizontal ? x1 : x1 + 3}
				y2={isHorizontal ? y1 + 3 : y1}
				stroke={color}
				strokeWidth={0.8}
			/>

			{/* End cap */}
			<line
				x1={isHorizontal ? x2 : x2 - 3}
				y1={isHorizontal ? y2 - 3 : y2}
				x2={isHorizontal ? x2 : x2 + 3}
				y2={isHorizontal ? y2 + 3 : y2}
				stroke={color}
				strokeWidth={0.8}
			/>

			{/* Label */}
			<text
				x={labelX}
				y={labelY}
				fill={color}
				fontSize={9}
				fontFamily="DM Sans"
				fontWeight={600}
				textAnchor="middle"
			>
				{label}
			</text>
		</g>
	);
}
