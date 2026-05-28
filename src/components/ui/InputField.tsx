interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  type?: 'number' | 'text';
  prefix?: string;
  suffix?: string;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export function InputField({
  label,
  value,
  onChange,
  type = 'number',
  prefix,
  suffix,
  hint,
  min,
  max,
  step = 1,
  disabled = false,
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === 'number' ? Number(e.target.value) : e.target.value;
    onChange(newValue as number);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[9px] tracking-[1.5px] uppercase text-muted font-semibold">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`
            w-full bg-white/4 border border-border rounded-lg
            px-3 py-2.5 text-light text-sm font-medium
            outline-none transition-colors duration-200
            focus:border-accent
            ${prefix ? 'pl-7' : ''}
            ${suffix ? 'pr-10' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs">
            {suffix}
          </span>
        )}
      </div>
      {hint && <div className="text-[9px] text-muted mt-0.5">{hint}</div>}
    </div>
  );
}
