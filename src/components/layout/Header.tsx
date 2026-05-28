import { type Pill } from "../../types";

interface HeaderProps {
	tag: string;
	title: string;
	subtitle?: string;
	pills: Pill[];
}

const pillVariantStyles: Record<string, string> = {
	teal: "bg-accent/10 border-accent/20 text-accent",
	gold: "bg-gold/10 border-gold/20 text-gold",
	blue: "bg-blue/10 border-blue/20 text-blue",
	red: "bg-red/10 border-red/20 text-red",
	purple: "bg-purple/10 border-purple/20 text-purple",
	green: "bg-green/10 border-green/20 text-green",
};

export function Header({ tag, title, subtitle, pills }: HeaderProps) {
	return (
		<header className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#101a16] to-bg p-7 pb-5">
			{/* Decorative circle */}
			<div className="absolute -top-20 -right-15 w-75 h-75 rounded-full bg-radial-[at_center] from-accent/8 to-transparent" />

			<div className="text-[10px] tracking-[3px] uppercase text-accent font-semibold mb-1.5">
				{tag}
			</div>

			<h1 className="font-display text-[46px] leading-none text-light">
				{title}
				{subtitle && <span className="text-accent ml-2">{subtitle}</span>}
			</h1>

			<div className="flex flex-wrap gap-2 mt-3.5">
				{pills.map((pill, index) => (
					<span
						key={index}
						className={`
              rounded-[20px] py-0.5 px-3 text-[11px] font-medium
              border ${pillVariantStyles[pill.variant] || pillVariantStyles.teal}
            `}
					>
						{pill.icon && <span className="mr-1">{pill.icon}</span>}
						{pill.label}
					</span>
				))}
			</div>
		</header>
	);
}
