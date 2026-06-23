import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Signalement {
  id: string;
  type: 'dechets' | 'pollution' | 'nature_degradee' | 'animal';
  description: string;
  latitude: number;
  longitude: number;
  commune: string;
  createdAt: string;
  photoUrl?: string;
}

export interface Projet {
  id: string;
  titre: string;
  description: string;
  type: 'nettoyage' | 'plantation' | 'autre';
  latitude: number;
  longitude: number;
  commune: string;
  date?: string;
  createdAt: string;
}

export interface Refuge {
  id: string;
  type: 'jardin' | 'nichoir' | 'mare';
  description: string;
  latitude: number;
  longitude: number;
  commune: string;
  createdAt: string;
  photoUrl?: string;
}

export interface Commune {
  nom: string;
  latitude: number;
  longitude: number;
}

interface AppState {
  commune: Commune | null;
  signalements: Signalement[];
  projets: Projet[];
  refuges: Refuge[];
  setCommune: (commune: Commune | null) => void;
  addSignalement: (signalement: Omit<Signalement, 'id' | 'createdAt'>) => void;
  addProjet: (projet: Omit<Projet, 'id' | 'createdAt'>) => void;
  addRefuge: (refuge: Omit<Refuge, 'id' | 'createdAt'>) => void;
  getScore: () => number;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      commune: null,
      signalements: [],
      projets: [],
      refuges: [],

      setCommune: (commune) => set({ commune }),

      addSignalement: (signalement) => {
        const newSignalement: Signalement = {
          ...signalement,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          signalements: [...state.signalements, newSignalement],
        }));
      },

      addProjet: (projet) => {
        const newProjet: Projet = {
          ...projet,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          projets: [...state.projets, newProjet],
        }));
      },

      addRefuge: (refuge) => {
        const newRefuge: Refuge = {
          ...refuge,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          refuges: [...state.refuges, newRefuge],
        }));
      },

      getScore: () => {
        const state = get();
        const commune = state.commune;
        if (!commune) return 0;

        const communeName = commune.nom.toLowerCase();
        const refugesCount = state.refuges.filter(
          (r) => r.commune.toLowerCase() === communeName
        ).length;
        const signalementsCount = state.signalements.filter(
          (s) => s.commune.toLowerCase() === communeName
        ).length;
        const projetsCount = state.projets.filter(
          (p) => p.commune.toLowerCase() === communeName
        ).length;

        // Score: +1 signalement, +2 refuge, +1 projet
        return refugesCount * 2 + signalementsCount + projetsCount;
      },
    }),
    {
      name: 'ma-commune-vivante',
    }
  )
);
