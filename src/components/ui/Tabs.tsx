interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export function Tabs({ items, activeId, onChange }: TabsProps) {
  return (
    <div
      className="flex border-b border-border bg-card-2 overflow-x-auto scrollbar-hide"
      role="tablist"
    >
      {items.map((item) => (
        <button
          key={item.id}
          role="tab"
          aria-selected={item.id === activeId}
          disabled={item.disabled}
          onClick={() => onChange(item.id)}
          className={`
            flex items-center gap-2 px-5 py-3.5 text-[11px] tracking-[1.5px] uppercase
            font-semibold whitespace-nowrap cursor-pointer select-none
            border-b-2 transition-all duration-200
            ${
              item.id === activeId
                ? 'text-accent border-b-accent'
                : 'text-muted border-b-transparent hover:text-light'
            }
            ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
          {item.badge !== undefined && (
            <span className="bg-accent/20 text-accent text-[10px] px-1.5 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
