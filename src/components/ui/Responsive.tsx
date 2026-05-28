interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const sizeStyles = {
  sm: 'max-w-[640px]',
  md: 'max-w-[960px]',
  lg: 'max-w-[1280px]',
  full: 'max-w-full',
};

export function Container({ children, className = '', size = 'md' }: ContainerProps) {
  return (
    <div className={`${sizeStyles[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: number;
}

export function ResponsiveGrid({
  children,
  className = '',
  cols = { default: 1, sm: 2, lg: 3 },
  gap = 3,
}: GridProps) {
  const gridCols = [
    `grid-cols-${cols.default || 1}`,
    cols.sm ? `sm:grid-cols-${cols.sm}` : '',
    cols.md ? `md:grid-cols-${cols.md}` : '',
    cols.lg ? `lg:grid-cols-${cols.lg}` : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={`grid ${gridCols} gap-${gap} ${className}`}>
      {children}
    </div>
  );
}

interface StackProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'vertical' | 'horizontal';
  gap?: number;
  wrap?: boolean;
}

export function Stack({
  children,
  className = '',
  direction = 'vertical',
  gap = 4,
  wrap = false,
}: StackProps) {
  return (
    <div
      className={`
        ${direction === 'horizontal' ? 'flex-row' : 'flex-col'}
        flex gap-${gap} ${wrap ? 'flex-wrap' : ''} ${className}
      `}
    >
      {children}
    </div>
  );
}

interface ShowProps {
  children: React.ReactNode;
  above?: 'sm' | 'md' | 'lg';
  below?: 'sm' | 'md' | 'lg';
}

export function Show({ children, above, below }: ShowProps) {
  let className = '';

  if (above) {
    className = `hidden ${above}:block`;
  } else if (below) {
    className = `block ${below}:hidden`;
  }

  return <div className={className}>{children}</div>;
}
