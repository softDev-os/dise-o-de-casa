import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Quotation, type PriceConfig, type UserPreferences } from '../types';
import { useQuotation } from '../hooks';

interface QuotationStore {
  // State
  quotations: Quotation[];
  currentId: string | null;
  prices: PriceConfig;
  preferences: UserPreferences;

  // Actions
  createQuotation: (data: Partial<Quotation>) => string;
  updateQuotation: (id: string, updates: Partial<Quotation>) => void;
  deleteQuotation: (id: string) => void;
  setCurrent: (id: string | null) => void;
  updatePrices: (prices: Partial<PriceConfig>) => void;
  recalculate: (id: string) => void;
  exportAll: () => string;
  importAll: (json: string) => void;
}

const defaultPrices: PriceConfig = {
  piso: { material: 35000, manoObra: 20000 },
  pared: { material: 15000, manoObra: 0 },
  techo: { material: 28000, manoObra: 20000 },
  electricidad: { punto: 45000 },
  carpinteria: { puerta: 380000 },
  revestimiento: { material: 50000, manoObra: 25000 },
  impermeabilizacion: { material: 25000 },
  imprevistos: 8,
};

const defaultPreferences: UserPreferences = {
  currency: 'COP',
  language: 'es',
  theme: 'dark',
  defaultMargin: 8,
  showPlanoByDefault: true,
};

export const useQuotationStore = create<QuotationStore>()(
  persist(
    (set, get) => {
      const { recalculate: recalc } = useQuotation();

      return {
        // Initial state
        quotations: [],
        currentId: null,
        prices: defaultPrices,
        preferences: defaultPreferences,

        // Create a new quotation
        createQuotation: (data) => {
          const id = crypto.randomUUID();
          const quotation: Quotation = {
            id,
            title: data.title || 'Nueva Cotización',
            tag: data.tag || 'Cotización',
            date: new Date(),
            rooms: data.rooms || [],
            prices: get().prices,
            subtotal: 0,
            laborTotal: 0,
            unforeseen: 0,
            total: 0,
            currency: 'COP',
            ...data,
          };

          set((state) => ({
            quotations: [...state.quotations, recalc(quotation)],
            currentId: id,
          }));

          return id;
        },

        // Update an existing quotation
        updateQuotation: (id, updates) => {
          set((state) => ({
            quotations: state.quotations.map((q) =>
              q.id === id ? recalc({ ...q, ...updates }) : q
            ),
          }));
        },

        // Delete a quotation
        deleteQuotation: (id) => {
          set((state) => ({
            quotations: state.quotations.filter((q) => q.id !== id),
            currentId: state.currentId === id ? null : state.currentId,
          }));
        },

        // Set current quotation
        setCurrent: (id) => {
          set({ currentId: id });
        },

        // Update default prices
        updatePrices: (prices) => {
          set((state) => ({
            prices: { ...state.prices, ...prices },
          }));
        },

        // Recalculate a specific quotation
        recalculate: (id) => {
          set((state) => ({
            quotations: state.quotations.map((q) =>
              q.id === id ? recalc(q) : q
            ),
          }));
        },

        // Export all quotations as JSON
        exportAll: () => {
          const { quotations, prices, preferences } = get();
          return JSON.stringify({ quotations, prices, preferences }, null, 2);
        },

        // Import quotations from JSON
        importAll: (json) => {
          try {
            const parsed = JSON.parse(json);
            set({
              quotations: (parsed.quotations || []).map(recalc),
              prices: { ...defaultPrices, ...parsed.prices },
              preferences: { ...defaultPreferences, ...parsed.preferences },
            });
          } catch (err) {
            console.error('Error importing quotations:', err);
          }
        },
      };
    },
    {
      name: 'diseno-de-casa-storage',
      partialize: (state) => ({
        quotations: state.quotations,
        prices: state.prices,
        preferences: state.preferences,
      }),
    }
  )
);
