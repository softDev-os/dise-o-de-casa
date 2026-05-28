import { type Pill } from '../../types';

interface HeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  pills: Pill[];
}

const pillVariantStyles: Record<string, string> = {
  teal: 'bg-accent/10 border-accent/20 text-accent',
  gold: 'bg-gold/10 border-gold/20 text-gold',
  blue: 'bg-blue/10 border-blue/20 text-blue',
  red: 'bg-red/10 border-red/20 text-red',
  purple: 'bg-purple/10 border-purple/20 text-purple',
  green: 'bg-green/10 border-green/20 text-green',
};

export function Header({ tag, title, subtitle, pills }: HeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#101a16] to-bg px-6 py-[18px]">
      {/* Decorative circle - matching original */}
      <div className="absolute -top-20 -right-15 w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(110,200,169,0.08)_0%,transparent_70%)]" />
      
      {/* Tag */}
      <div className="text-[10px] tracking-[3px] uppercase text-accent font-semibold mb-[5px]">
        {tag}
      </div>
      
      {/* Title - matching original Bebas Neue 42px */}
      <h1 className="font-display text-[42px] leading-none text-light">
        {title}
        {subtitle && <span className="text-accent ml-2">{subtitle}</span>}
      </h1>
      
      {/* Pills - matching original spacing */}
      <div className="flex flex-wrap gap-[7px] mt-3">
        {pills.map((pill, index) => (
          <span
            key={index}
            className={`
              rounded-[20px] py-[3px] px-[11px] text-[10px] font-medium
              border ${pillVariantStyles[pill.variant] || pillVariantStyles.teal}
              transition-all duration-200 hover:scale-105
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
