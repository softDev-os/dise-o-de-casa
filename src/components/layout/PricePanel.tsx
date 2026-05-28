import { useState } from "react";
import { InputField } from "../ui";

interface PriceField {
	key: string;
	label: string;
	hint?: string;
	prefix?: string;
	suffix?: string;
}

interface PricePanelProps {
	title: string;
	description?: string;
	fields: PriceField[];
	values: Record<string, number>;
	onChange: (key: string, value: number) => void;
	onRecalculate: () => void;
	collapsed?: boolean;
}

export function PricePanel({
	title,
	description,
	fields,
	values,
	onChange,
	onRecalculate,
	collapsed: initialCollapsed = true,
}: PricePanelProps) {
	const [collapsed, setCollapsed] = useState(initialCollapsed);

	return (
		<div className="bg-card border border-border rounded-2xl mb-6 overflow-hidden">
			{/* Header - always visible */}
			<button
				onClick={() => setCollapsed(!collapsed)}
				className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-white/2 transition-colors"
			>
				<span className="text-sm text-muted">
					⚙️ &nbsp;{title}
					{description && (
						<span className="text-[10px] text-muted ml-2">— {description}</span>
					)}
				</span>
				<span className="text-muted text-xs transition-transform duration-300">
					{collapsed ? "▼" : "▲"}
				</span>
			</button>

			{/* Body - collapsible */}
			<div
				className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${collapsed ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"}
        `}
			>
				<div className="p-4 pt-0">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
						{fields.map((field) => (
							<InputField
								key={field.key}
								label={field.label}
								value={values[field.key] || 0}
								onChange={(value) => onChange(field.key, value)}
								prefix={field.prefix}
								suffix={field.suffix}
								hint={field.hint}
							/>
						))}
					</div>
					<button
						onClick={onRecalculate}
						className="mt-4 w-full bg-accent text-bg border-none rounded-lg py-3 font-display text-xl tracking-[2px] cursor-pointer transition-all duration-200 hover:bg-accent-2 hover:-translate-y-0.5"
					>
						⚡ RECALCULAR TODO
					</button>
				</div>
			</div>
		</div>
	);
}
