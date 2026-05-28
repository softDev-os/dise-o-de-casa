import { useState } from 'react';
import { Header, Footer, PricePanel } from '../../components/layout';
import { Tabs } from '../../components/ui';
import { FloorPlan } from '../../components/floor-plan';
import { MaterialTable, QuotationSummary } from '../../components/quotation';
import { usePDF } from '../../hooks';
import { apartmentV2Data, apartmentV2FloorPlan, apartmentV2Pills } from './apartmentV2Data';
import { type PriceConfig } from '../../types';

export function ApartmentV2() {
  const [activeTab, setActiveTab] = useState('general');
  const [prices, setPrices] = useState<PriceConfig>(apartmentV2Data.prices);
  const { downloadPDF, isGenerating } = usePDF();

  const tabs = [
    { id: 'general', label: 'Plano', icon: '🏠' },
    { id: 'hab-p', label: 'Hab. P', icon: '🛏' },
    { id: 'hab-r', label: 'Hab. R', icon: '🛏' },
    { id: 'hab-a', label: 'Hab. A', icon: '🛏' },
    { id: 'sala', label: 'Sala', icon: '🛋' },
    { id: 'bano', label: 'Baño', icon: '🛁' },
    { id: 'lavadero', label: 'Lavadero', icon: '🫧' },
    { id: 'cocina', label: 'Cocina', icon: '🍳' },
    { id: 'pasillo', label: 'Pasillo', icon: '🚪' },
    { id: 'total', label: 'Total', icon: '📊' },
  ];

  const priceFields = [
    { key: 'piso.material', label: 'Piso material (m²)', prefix: '$', hint: 'Porcelanato / baldosa' },
    { key: 'piso.manoObra', label: 'M.O. piso (m²)', prefix: '$', hint: 'Nivelación+pegante+fragua' },
    { key: 'pared.material', label: 'Pintura paredes (m²)', prefix: '$', hint: 'Material + M.O. 2 manos' },
    { key: 'techo.material', label: 'Pintura cielorraso (m²)', prefix: '$', hint: 'Material + M.O.' },
    { key: 'revestimiento.material', label: 'Revestimiento mat. (m²)', prefix: '$', hint: 'Cerámica zona húmeda' },
    { key: 'revestimiento.manoObra', label: 'M.O. revestimiento (m²)', prefix: '$', hint: 'Enchape piso + paredes' },
    { key: 'carpinteria.puerta', label: 'Carpintería puerta (und)', prefix: '$', hint: 'HDF + marco + bisagras' },
    { key: 'imprevistos', label: 'Imprevistos (%)', suffix: '%', hint: '% sobre total obra' },
  ];

  const handlePriceChange = (key: string, value: number) => {
    const keys = key.split('.');
    if (keys.length === 2) {
      setPrices((prev) => ({
        ...prev,
        [keys[0]]: {
          ...(prev[keys[0] as keyof PriceConfig] as Record<string, number>),
          [keys[1]]: value,
        },
      }));
    } else {
      setPrices((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleRecalculate = () => {
    console.log('Recalculating with prices:', prices);
  };

  const getRoomByTab = (tabId: string) => {
    return apartmentV2Data.rooms.find((r) => r.id === tabId);
  };

  return (
    <div className="min-h-screen bg-bg">
      <Header
        tag={apartmentV2Data.tag}
        title="APARTAMENTO"
        subtitle="POR AMBIENTE"
        pills={apartmentV2Pills}
      />

      {/* Global price panel */}
      <div className="max-w-[980px] mx-auto px-4 pt-4">
        <PricePanel
          title="CONFIGURAR PRECIOS (COP)"
          description="clic para expandir"
          fields={priceFields}
          values={{
            'piso.material': prices.piso.material,
            'piso.manoObra': prices.piso.manoObra,
            'pared.material': prices.pared.material,
            'techo.material': prices.techo.material,
            'revestimiento.material': prices.revestimiento.material,
            'revestimiento.manoObra': prices.revestimiento.manoObra,
            'carpinteria.puerta': prices.carpinteria.puerta,
            'imprevistos': prices.imprevistos,
          }}
          onChange={handlePriceChange}
          onRecalculate={handleRecalculate}
        />
      </div>

      <div className="max-w-[980px] mx-auto px-4 py-4">
        <Tabs items={tabs} activeId={activeTab} onChange={setActiveTab} />

        <main className="mt-6">
          {/* Tab: Plano General */}
          {activeTab === 'general' && (
            <div>
              <div className="font-display text-lg tracking-[2px] text-accent mb-4">
                PLANO GENERAL DEL APARTAMENTO
              </div>
              <div className="bg-card border border-border rounded-2xl p-5 flex flex-col lg:flex-row gap-6 items-start">
                <FloorPlan
                  rooms={apartmentV2FloorPlan}
                  width={8.06}
                  height={6.28}
                  scale={25}
                  showGrid={true}
                  showDimensions={true}
                />
                <div className="flex-1 min-w-[200px] flex flex-col gap-2">
                  {apartmentV2FloorPlan.map((room) => (
                    <div key={room.id} className="flex items-center gap-2 text-xs">
                      <div
                        className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                        style={{ backgroundColor: `var(--${room.variant})` }}
                      />
                      <span className="text-muted">{room.name}</span>
                      <span className="text-light font-semibold ml-auto">{room.area} m²</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tabs: Individual rooms */}
          {tabs.slice(1, 9).map((tab) => {
            const room = getRoomByTab(tab.id);
            if (!room || activeTab !== tab.id) return null;
            
            return (
              <div key={tab.id}>
                <div className="font-display text-lg tracking-[2px] text-accent mb-4">
                  {room.emoji} {room.name}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="text-[9px] tracking-[2px] uppercase text-muted mb-1">Área</div>
                    <div className="font-display text-2xl text-accent-2">{room.area} m²</div>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="text-[9px] tracking-[2px] uppercase text-muted mb-1">Paredes</div>
                    <div className="font-display text-2xl text-accent-2">{room.wallArea} m²</div>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="text-[9px] tracking-[2px] uppercase text-muted mb-1">Perímetro</div>
                    <div className="font-display text-2xl text-accent-2">{room.perimeter} m</div>
                  </div>
                </div>
                <MaterialTable materials={room.materials} showLabor={true} />
              </div>
            );
          })}

          {/* Tab: Total */}
          {activeTab === 'total' && (
            <div>
              <div className="font-display text-lg tracking-[2px] text-accent mb-4">
                RESUMEN TOTAL
              </div>
              <QuotationSummary
                rooms={apartmentV2Data.rooms}
                subtotal={apartmentV2Data.subtotal}
                laborTotal={apartmentV2Data.laborTotal}
                unforeseen={apartmentV2Data.unforeseen}
                total={apartmentV2Data.total}
              />
              <button
                onClick={() => downloadPDF(apartmentV2Data)}
                disabled={isGenerating}
                className="mt-6 w-full bg-accent text-bg border-none rounded-lg py-3 font-display text-xl tracking-[2px] cursor-pointer transition-all duration-200 hover:bg-accent-2 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? '⏳ Generando PDF...' : '📄 DESCARGAR PDF'}
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
