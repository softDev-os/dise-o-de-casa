interface SpinnerProps {
	size?: "sm" | "md" | "lg";
	color?: string;
}

const sizeStyles = {
	sm: "w-4 h-4 border-2",
	md: "w-6 h-6 border-2",
	lg: "w-8 h-8 border-3",
};

export function Spinner({
	size = "md",
	color = "var(--accent)",
}: SpinnerProps) {
	return (
		<div
			className={`${sizeStyles[size]} border-transparent rounded-full animate-spin`}
			style={{
				borderTopColor: color,
				borderRightColor: color,
			}}
		/>
	);
}

export function LoadingOverlay({
	message = "Cargando...",
}: {
	message?: string;
}) {
	return (
		<div className="flex flex-col items-center justify-center py-12 gap-4">
			<Spinner size="lg" />
			<span className="text-muted text-sm">{message}</span>
		</div>
	);
}

export function ButtonSpinner({
	children,
	loading = false,
}: {
	children: React.ReactNode;
	loading?: boolean;
}) {
	return (
		<span className="flex items-center justify-center gap-2">
			{loading && <Spinner size="sm" color="var(--bg)" />}
			{children}
		</span>
	);
}
