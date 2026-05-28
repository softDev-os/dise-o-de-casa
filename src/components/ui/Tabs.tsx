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
    <div className="border-b border-border bg-card-2 overflow-x-auto">
      <div className="flex min-w-max">
        {items.map((item) => (
          <button
            key={item.id}
            disabled={item.disabled}
            onClick={() => onChange(item.id)}
            className={`
              px-4 py-3 text-[10px] tracking-[1.5px] uppercase font-semibold
              whitespace-nowrap cursor-pointer select-none
              border-b-2 transition-all duration-200
              ${
                activeId === item.id
                  ? 'text-accent border-b-accent'
                  : 'text-muted border-b-transparent hover:text-light'
              }
              ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {item.icon && <span className="mr-1">{item.icon}</span>}
            {item.label}
            {item.badge !== undefined && (
              <span className="ml-1.5 bg-accent/20 text-accent text-[10px] px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
