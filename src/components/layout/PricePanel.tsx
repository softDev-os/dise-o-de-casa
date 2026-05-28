import { useState } from 'react';

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
    <div className="bg-card-2 border-b border-border">
      {/* Toggle button - matching original */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-2.5 px-[18px] py-3 text-left cursor-pointer select-none transition-colors duration-200 hover:text-accent"
      >
        <span className="text-[11px] tracking-[1.5px] uppercase text-muted font-semibold">
          ⚙️ &nbsp;{title}
          {description && <span className="ml-1">— {description}</span>}
        </span>
        <span className="ml-auto text-sm transition-transform duration-300">
          {collapsed ? '▼' : '▲'}
        </span>
      </button>

      {/* Body - collapsible with animation */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${collapsed ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'}
        `}
      >
        <div className="px-[18px] pb-5 pt-0 border-t border-border">
          {/* Inputs grid - matching original */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(155px,1fr))] gap-[9px]">
            {fields.map((field) => (
              <div key={field.key} className="flex flex-col gap-1">
                <label className="text-[9px] tracking-[1.5px] uppercase text-muted font-semibold">
                  {field.label}
                </label>
                <div className="relative">
                  {field.prefix && (
                    <span className="absolute left-[11px] top-1/2 -translate-y-1/2 text-muted text-xs">
                      {field.prefix}
                    </span>
                  )}
                  <input
                    type="number"
                    value={values[field.key] || 0}
                    onChange={(e) => onChange(field.key, Number(e.target.value))}
                    className={`
                      w-full bg-white/[0.04] border border-border rounded-[7px]
                      px-[11px] py-2 text-light text-xs font-medium
                      outline-none transition-colors duration-200
                      focus:border-accent
                      ${field.prefix ? 'pl-7' : ''}
                      ${field.suffix ? 'pr-7' : ''}
                    `}
                  />
                  {field.suffix && (
                    <span className="absolute right-[11px] top-1/2 -translate-y-1/2 text-muted text-xs">
                      {field.suffix}
                    </span>
                  )}
                </div>
                {field.hint && (
                  <div className="text-[9px] text-muted">{field.hint}</div>
                )}
              </div>
            ))}
          </div>

          {/* Recalculate button - matching original */}
          <button
            onClick={onRecalculate}
            className="mt-[14px] w-full bg-accent text-bg border-none rounded-[7px] py-[11px] font-display text-lg tracking-[2px] cursor-pointer transition-all duration-200 hover:bg-accent-2 hover:-translate-y-[1px]"
          >
            ⚡ RECALCULAR TODO EL APARTAMENTO
          </button>
        </div>
      </div>
    </div>
  );
}
