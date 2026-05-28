import { type MaterialCategory } from '../../types';

interface BadgeProps {
  label: string;
  variant: MaterialCategory;
  size?: 'sm' | 'md';
}

const variantStyles: Record<MaterialCategory, string> = {
  piso: 'bg-accent/12 text-accent',
  pared: 'bg-gold/12 text-gold',
  techo: 'bg-green/12 text-green',
  electricidad: 'bg-blue/12 text-blue',
  carpinteria: 'bg-purple/12 text-purple',
  revestimiento: 'bg-red/12 text-red',
  impermeabilizacion: 'bg-blue/8 text-blue',
  accesorio: 'bg-green/8 text-green',
};

const sizeStyles = {
  sm: 'text-[7px] px-1.5 py-0.5 rounded-[6px]',
  md: 'text-[8px] px-1.5 py-1 rounded-[7px]',
};

export function Badge({ label, variant, size = 'md' }: BadgeProps) {
  return (
    <span
      className={`
        inline-block tracking-[1px] uppercase font-bold
        ${variantStyles[variant]}
        ${sizeStyles[size]}
      `}
    >
      {label}
    </span>
  );
}
