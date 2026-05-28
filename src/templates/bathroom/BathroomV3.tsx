import { useState } from 'react';
import { Header, Footer } from '../../components/layout';
import { Tabs } from '../../components/ui';
import { FloorPlan } from '../../components/floor-plan';
import { MaterialTable, QuotationSummary } from '../../components/quotation';
import { usePDF } from '../../hooks';
import { bathroomV3Data, bathroomV3FloorPlan, bathroomV3Pills } from './bathroomV3Data';

export function BathroomV3() {
  const [activeTab, setActiveTab] = useState('piso-paredes');
  const { downloadPDF, isGenerating } = usePDF();

  const tabs = [
    { id: 'piso-paredes', label: 'Piso & Paredes', icon: '🪨' },
    { id: 'accesorios', label: 'Accesorios', icon: '🚿' },
    { id: 'total', label: 'Total', icon: '📊' },
  ];

  const room = bathroomV3Data.rooms[0];
  const pisoMateriales = room.materials.filter((m) => m.category === 'piso');
  const paredMateriales = room.materials.filter((m) => m.category === 'revestimiento');
  const techoMateriales = room.materials.filter((m) => m.category === 'techo' || m.category === 'impermeabilizacion');
  const accesorios = room.materials.filter((m) => m.category === 'accesorio' || m.category === 'carpinteria');

  return (
    <div className="min-h-screen bg-bg">
      <Header
        tag={bathroomV3Data.tag}
        title="BAÑO"
        subtitle="COMPLETO"
        pills={bathroomV3Pills}
      />

      {/* Alert banner */}
      <div className="bg-gradient-to-r from-gold/12 to-gold/5 border-l-3 border-gold px-5 py-3 text-xs text-gold flex items-center gap-2.5">
        ⚠️ <strong>Medidas corregidas:</strong> El baño es 6 × 2.20 m (13.2 m² de piso). 
        Paredes completas hasta ~2.40 m = 39.36 m². Las baldosas necesarias subieron de 48 a 322 unidades.
      </div>

      <div className="max-w-[960px] mx-auto px-4 py-6">
        <Tabs items={tabs} activeId={activeTab} onChange={setActiveTab} />

        <main className="mt-6">
          {/* Tab: Piso & Paredes */}
          {activeTab === 'piso-paredes' && (
            <div>
              <div className="font-display text-lg tracking-[2px] text-accent mb-4">
                PLANO REAL DEL BAÑO
              </div>
              <div className="bg-card border border-border rounded-2xl p-5 flex flex-col lg:flex-row gap-6 items-start mb-6">
                <FloorPlan
                  rooms={bathroomV3FloorPlan}
                  width={6.00}
                  height={2.20}
                  scale={30}
                  showGrid={true}
                  showDimensions={true}
                />
                <div className="flex-1 min-w-[200px] flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0 bg-accent" />
                    <span className="text-muted">Piso (baldosa 60×30)</span>
                    <span className="text-light font-semibold ml-auto">13.2 m²</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0 bg-gold" />
                    <span className="text-muted">Paredes (baldosa)</span>
                    <span className="text-light font-semibold ml-auto">39.36 m²</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0 bg-green" />
                    <span className="text-muted">Techo PVC</span>
                    <span className="text-light font-semibold ml-auto">13.2 m²</span>
                  </div>
                  <div className="border-t border-border my-1" />
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted">Total baldosa necesaria</span>
                    <span className="text-accent-2 font-semibold ml-auto">52.56 m²</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted">+10% desperdicio</span>
                    <span className="text-accent-2 font-semibold ml-auto">~57.8 m²</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-light font-semibold">Unidades 60×30</span>
                    <span className="text-accent-2 font-semibold ml-auto text-base">322 und</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <div className="bg-card border border-border rounded-xl p-4 border-t-3 border-t-accent">
                  <div className="text-xl mb-1">🪨</div>
                  <div className="text-[9px] tracking-[2px] uppercase text-muted mb-1">Piso</div>
                  <div className="font-display text-2xl text-light">13.2 <span className="text-xs text-muted">m²</span></div>
                  <div className="text-[10px] text-muted">6 × 2.20 m</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 border-t-3 border-t-gold">
                  <div className="text-xl mb-1">🧱</div>
                  <div className="text-[9px] tracking-[2px] uppercase text-muted mb-1">Paredes</div>
                  <div className="font-display text-2xl text-light">39.36 <span className="text-xs text-muted">m²</span></div>
                  <div className="text-[10px] text-muted">Perímetro × 2.40m</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 border-t-3 border-t-green">
                  <div className="text-xl mb-1">🏠</div>
                  <div className="text-[9px] tracking-[2px] uppercase text-muted mb-1">Techo PVC</div>
                  <div className="font-display text-2xl text-light">13.2 <span className="text-xs text-muted">m²</span></div>
                  <div className="text-[10px] text-muted">Igual al piso</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 border-t-3 border-t-blue">
                  <div className="text-xl mb-1">🔲</div>
                  <div className="text-[9px] tracking-[2px] uppercase text-muted mb-1">Baldosas</div>
                  <div className="font-display text-2xl text-light">322 <span className="text-xs text-muted">und</span></div>
                  <div className="text-[10px] text-muted">60×30 + 10% desp.</div>
                </div>
              </div>

              <div className="font-display text-lg tracking-[2px] text-accent mb-3">PISO</div>
              <MaterialTable materials={pisoMateriales} />
              <div className="font-display text-lg tracking-[2px] text-accent mb-3">PAREDES</div>
              <MaterialTable materials={paredMateriales} />
              <div className="font-display text-lg tracking-[2px] text-accent mb-3">TECHO + IMPERMEABILIZACIÓN</div>
              <MaterialTable materials={techoMateriales} />
            </div>
          )}

          {/* Tab: Accesorios */}
          {activeTab === 'accesorios' && (
            <div>
              <div className="font-display text-lg tracking-[2px] text-accent mb-4">
                ACCESORIOS DEL BAÑO
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {accesorios.map((acc) => (
                  <div key={acc.id} className="bg-card border border-border rounded-[14px] p-4 transition-all duration-200 hover:border-accent/30 hover:-translate-y-0.5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">
                        {acc.name.includes('Ducha') ? '🚿' : 
                         acc.name.includes('Inodoro') ? '🚽' :
                         acc.name.includes('Lavamanos') ? '🪣' :
                         acc.name.includes('Espejo') ? '🪞' :
                         acc.name.includes('Toallero') ? '🧴' :
                         acc.name.includes('Jabonera') ? '🧼' : '🚪'}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-light">{acc.name}</div>
                        <div className="text-[10px] text-muted">{acc.detail}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border">
                      <div className="text-[9px] tracking-[1px] uppercase text-muted">Precio</div>
                      <div className="font-display text-xl text-accent-2">
                        ${new Intl.NumberFormat('es-CO').format(acc.total)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Total */}
          {activeTab === 'total' && (
            <div>
              <div className="font-display text-lg tracking-[2px] text-accent mb-4">
                RESUMEN TOTAL
              </div>
              <QuotationSummary
                rooms={bathroomV3Data.rooms}
                subtotal={bathroomV3Data.subtotal}
                laborTotal={bathroomV3Data.laborTotal}
                unforeseen={bathroomV3Data.unforeseen}
                total={bathroomV3Data.total}
              />
              <button
                onClick={() => downloadPDF(bathroomV3Data)}
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
