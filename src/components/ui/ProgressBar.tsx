interface ProgressBarProps {
	label: string;
	value: number; // 0-100
	color?: string;
	showValue?: boolean;
	size?: "sm" | "md";
}

const sizeStyles = {
	sm: "h-1",
	md: "h-1.5",
};

export function ProgressBar({
	label,
	value,
	color = "var(--accent)",
	showValue = true,
	size = "md",
}: ProgressBarProps) {
	const clampedValue = Math.min(100, Math.max(0, value));

	return (
		<div className="flex flex-col gap-1">
			<div className="flex justify-between text-[11px]">
				<span className="text-muted">{label}</span>
				{showValue && (
					<span className="text-light font-semibold">{clampedValue}%</span>
				)}
			</div>
			<div
				className={`${sizeStyles[size]} bg-border rounded-full overflow-hidden`}
			>
				<div
					className="h-full rounded-full transition-all duration-600 ease-out"
					style={{
						width: `${clampedValue}%`,
						backgroundColor: color,
					}}
				/>
			</div>
		</div>
	);
}
