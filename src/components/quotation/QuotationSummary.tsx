import { type Room } from '../../types';
import { RoomCard } from './RoomCard';
import { TotalsBox } from './TotalsBox';

interface QuotationSummaryProps {
  rooms: Room[];
  subtotal: number;
  laborTotal: number;
  unforeseen: number;
  total: number;
  onRoomClick?: (roomId: string) => void;
}

export function QuotationSummary({
  rooms,
  subtotal,
  laborTotal,
  unforeseen,
  total,
  onRoomClick,
}: QuotationSummaryProps) {
  // Progress items for visualization
  const progressItems = rooms.map((room) => ({
    label: room.name,
    percentage: Math.round((room.subtotal / total) * 100),
    color: `var(--${room.variant})`,
  }));

  return (
    <div className="space-y-6">
      {/* Room cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            emoji={room.emoji}
            name={room.name}
            dimensions={`${room.dimensions.width} × ${room.dimensions.length}`}
            area={room.area}
            stats={[
              { key: 'Piso', value: `${room.area} m²` },
              { key: 'Paredes', value: `${room.wallArea || 0} m²` },
              { key: 'Perímetro', value: `${room.perimeter || 0} m` },
            ]}
            variant={room.variant}
            onClick={onRoomClick ? () => onRoomClick(room.id) : undefined}
          />
        ))}
      </div>

      {/* Totals box */}
      <TotalsBox
        rows={[
          { label: 'Materiales', value: subtotal },
          { label: 'Mano de obra', value: laborTotal },
          { label: 'Imprevistos', value: unforeseen, highlight: true },
        ]}
        finalLabel="TOTAL ESTIMADO"
        finalValue={total}
        finalCurrency="COP"
        showProgress={true}
        progressItems={progressItems}
      />
    </div>
  );
}
