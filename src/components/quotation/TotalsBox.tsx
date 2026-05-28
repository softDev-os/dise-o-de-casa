import { ProgressBar } from '../ui';

interface TotalRow {
  label: string;
  value: number;
  highlight?: boolean;
}

interface ProgressItem {
  label: string;
  percentage: number;
  color: string;
}

interface TotalsBoxProps {
  rows: TotalRow[];
  finalLabel: string;
  finalValue: number;
  finalCurrency?: string;
  showProgress?: boolean;
  progressItems?: ProgressItem[];
}

export function TotalsBox({
  rows,
  finalLabel,
  finalValue,
  finalCurrency = 'COP',
  showProgress = false,
  progressItems = [],
}: TotalsBoxProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-gradient-to-br from-[#141e1a] to-[#0f1512] border border-accent/20 rounded-2xl p-5 relative overflow-hidden mb-6">
      {/* Decorative circle */}
      <div className="absolute -bottom-12 -right-10 w-50 h-50 rounded-full bg-radial-[at_center] from-accent/6 to-transparent" />

      {/* Rows */}
      {rows.map((row, index) => (
        <div
          key={index}
          className="flex justify-between py-2 border-b border-border text-sm last:border-b-0"
        >
          <span className="text-muted">{row.label}</span>
          <span className={`font-semibold ${row.highlight ? 'text-accent-2' : 'text-light'}`}>
            ${formatCurrency(row.value)}
          </span>
        </div>
      ))}

      {/* Progress bars */}
      {showProgress && progressItems.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          {progressItems.map((item, index) => (
            <ProgressBar
              key={index}
              label={item.label}
              value={item.percentage}
              color={item.color}
              size="sm"
            />
          ))}
        </div>
      )}

      {/* Final total */}
      <div className="flex justify-between items-end mt-4 pt-4 border-t border-accent/20">
        <div>
          <div className="font-display text-base tracking-[3px] text-accent">
            {finalLabel}
          </div>
          <div className="text-[10px] text-muted mt-0.5">
            Incluye materiales y mano de obra
          </div>
        </div>
        <div className="font-display text-4xl text-accent-2 leading-none">
          ${formatCurrency(finalValue)}
          <span className="text-lg ml-1">{finalCurrency}</span>
        </div>
      </div>
    </div>
  );
}
