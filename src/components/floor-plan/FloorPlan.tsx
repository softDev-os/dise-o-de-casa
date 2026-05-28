import { type FloorPlanRoom } from '../../types';
import { Room } from './Room';
import { DimensionLine } from './DimensionLine';

interface FloorPlanProps {
  rooms: FloorPlanRoom[];
  width: number;        // metros
  height: number;       // metros
  scale?: number;       // px per meter, default 25
  showGrid?: boolean;
  showDimensions?: boolean;
  onRoomClick?: (roomId: string) => void;
}

export function FloorPlan({
  rooms,
  width,
  height,
  scale = 25,
  showGrid = true,
  showDimensions = true,
  onRoomClick,
}: FloorPlanProps) {
  const svgWidth = width * scale + 40;  // margen para cotas
  const svgHeight = height * scale + 40;
  const margin = 8;

  // Convertir metros a pixels
  const toPixel = (meters: number) => meters * scale;

  return (
    <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 drop-shadow-[0_0_16px_rgba(110,200,169,0.1)]"
      >
        <defs>
          {/* Grid pattern */}
          {showGrid && (
            <pattern id="grid" width={scale / 2} height={scale / 2} patternUnits="userSpaceOnUse">
              <path
                d={`M${scale / 2} 0L0 0 0 ${scale / 2}`}
                fill="none"
                stroke="#1a2820"
                strokeWidth={0.4}
              />
            </pattern>
          )}
        </defs>

        {/* Background grid */}
        {showGrid && (
          <rect
            width={svgWidth}
            height={svgHeight}
            fill="url(#grid)"
            rx={8}
          />
        )}

        {/* Rooms */}
        {rooms.map((room) => (
          <Room
            key={room.id}
            name={room.name}
            x={margin + toPixel(room.x)}
            y={margin + toPixel(room.y)}
            width={toPixel(room.width)}
            height={toPixel(room.height)}
            area={room.area}
            dimensions={room.dimensions}
            variant={room.variant}
            showLabel={room.showLabel !== false}
            onClick={onRoomClick ? () => onRoomClick(room.id) : undefined}
          />
        ))}

        {/* Dimension lines */}
        {showDimensions && (
          <>
            {/* Ancho total (abajo) */}
            <DimensionLine
              x1={margin}
              y1={margin + toPixel(height) + 10}
              x2={margin + toPixel(width)}
              y2={margin + toPixel(height) + 10}
              label={`${width.toFixed(2)} m`}
              color="var(--accent)"
            />

            {/* Alto total (derecha) */}
            <DimensionLine
              x1={margin + toPixel(width) + 10}
              y1={margin}
              x2={margin + toPixel(width) + 10}
              y2={margin + toPixel(height)}
              label={`${height.toFixed(2)} m`}
              color="var(--gold)"
            />
          </>
        )}
      </svg>
    </div>
  );
}
