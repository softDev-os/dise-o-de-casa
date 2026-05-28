import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricCard, Badge, ProgressBar } from './';

describe('MetricCard', () => {
  it('renders with required props', () => {
    render(<MetricCard icon="🪨" label="PISO" value={13.2} />);
    expect(screen.getByText('🪨')).toBeInTheDocument();
    expect(screen.getByText('PISO')).toBeInTheDocument();
    expect(screen.getByText('13.2')).toBeInTheDocument();
  });

  it('renders with unit and subtitle', () => {
    render(
      <MetricCard
        icon="🪨"
        label="PISO"
        value={13.2}
        unit="m²"
        subtitle="6 × 2.20 m"
      />
    );
    expect(screen.getByText('m²')).toBeInTheDocument();
    expect(screen.getByText('6 × 2.20 m')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { container } = render(
      <MetricCard icon="🪨" label="PISO" value={13.2} variant="blue" />
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('border-t-blue');
  });
});

describe('Badge', () => {
  it('renders with label', () => {
    render(<Badge label="PISO" variant="piso" />);
    expect(screen.getByText('PISO')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { container } = render(<Badge label="PISO" variant="piso" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-accent');
  });

  it('applies size styles', () => {
    const { container } = render(<Badge label="PISO" variant="piso" size="sm" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('text-[7px]');
  });
});

describe('ProgressBar', () => {
  it('renders with label and value', () => {
    render(<ProgressBar label="Piso" value={75} />);
    expect(screen.getByText('Piso')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('clamps value to 0-100', () => {
    render(<ProgressBar label="Test" value={150} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('hides value when showValue is false', () => {
    render(<ProgressBar label="Test" value={50} showValue={false} />);
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });
});
