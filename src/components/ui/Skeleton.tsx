interface SkeletonProps {
	className?: string;
	width?: string | number;
	height?: string | number;
}

export function Skeleton({ className = "", width, height }: SkeletonProps) {
	return (
		<div
			className={`skeleton ${className}`}
			style={{
				width: width || "100%",
				height: height || "1rem",
			}}
		/>
	);
}

export function MetricCardSkeleton() {
	return (
		<div className="bg-card border border-border rounded-xl p-4 border-t-3 border-t-border">
			<Skeleton width={24} height={24} className="mb-2" />
			<Skeleton width={60} height={10} className="mb-2" />
			<Skeleton width={80} height={28} className="mb-1" />
			<Skeleton width={100} height={10} />
		</div>
	);
}

export function MaterialTableSkeleton() {
	return (
		<div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
			{/* Header */}
			<div className="grid grid-cols-[2fr_0.8fr_1fr_1fr] px-4 py-2.5 bg-accent/5 border-b border-border">
				<Skeleton width={60} height={10} />
				<Skeleton width={40} height={10} />
				<Skeleton width={50} height={10} />
				<Skeleton width={40} height={10} />
			</div>
			{/* Rows */}
			{[1, 2, 3].map((i) => (
				<div
					key={i}
					className="grid grid-cols-[2fr_0.8fr_1fr_1fr] px-4 py-3 border-b border-border"
				>
					<Skeleton width={120} height={14} />
					<Skeleton width={50} height={14} />
					<Skeleton width={60} height={14} />
					<Skeleton width={70} height={14} />
				</div>
			))}
		</div>
	);
}

export function RoomCardSkeleton() {
	return (
		<div className="bg-card border border-border rounded-[14px] p-4 border-t-3 border-t-border">
			<div className="flex items-center gap-2.5 mb-3">
				<Skeleton width={28} height={28} />
				<div>
					<Skeleton width={80} height={16} className="mb-1" />
					<Skeleton width={60} height={10} />
				</div>
			</div>
			<div className="flex flex-col gap-1.5">
				<Skeleton width="100%" height={12} />
				<Skeleton width="100%" height={12} />
				<Skeleton width="100%" height={12} />
			</div>
			<Skeleton
				width={60}
				height={24}
				className="mt-3 pt-3 border-t border-border"
			/>
		</div>
	);
}

export function TabsSkeleton() {
	return (
		<div className="flex border-b border-border bg-card-2">
			{[1, 2, 3].map((i) => (
				<Skeleton key={i} width={80} height={40} className="mx-2" />
			))}
		</div>
	);
}

export function HeaderSkeleton() {
	return (
		<div className="border-b border-border bg-gradient-to-br from-[#101a16] to-bg p-7 pb-5">
			<Skeleton width={200} height={10} className="mb-2" />
			<Skeleton width={300} height={46} className="mb-4" />
			<div className="flex gap-2">
				<Skeleton width={120} height={24} className="rounded-[20px]" />
				<Skeleton width={100} height={24} className="rounded-[20px]" />
				<Skeleton width={140} height={24} className="rounded-[20px]" />
			</div>
		</div>
	);
}
