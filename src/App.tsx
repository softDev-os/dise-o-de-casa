import { useState } from 'react';
import { ApartmentV1 } from './templates/apartment/ApartmentV1';
import { ApartmentV2 } from './templates/apartment/ApartmentV2';
import { BathroomV3 } from './templates/bathroom/BathroomV3';

type Template = 'apartment-v1' | 'apartment-v2' | 'bathroom-v3';

function App() {
  const [activeTemplate, setActiveTemplate] = useState<Template>('apartment-v1');

  const templates: { id: Template; label: string; icon: string }[] = [
    { id: 'apartment-v1', label: 'Apartamento V1', icon: '🏠' },
    { id: 'apartment-v2', label: 'Apartamento V2', icon: '🏢' },
    { id: 'bathroom-v3', label: 'Baño V3', icon: '🛁' },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Template selector */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTemplate(t.id)}
            className={`
              px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
              ${
                activeTemplate === t.id
                  ? 'bg-accent text-bg'
                  : 'bg-card border border-border text-muted hover:text-light hover:border-accent/30'
              }
            `}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Active template */}
      {activeTemplate === 'apartment-v1' && <ApartmentV1 />}
      {activeTemplate === 'apartment-v2' && <ApartmentV2 />}
      {activeTemplate === 'bathroom-v3' && <BathroomV3 />}
    </div>
  );
}

export default App;
