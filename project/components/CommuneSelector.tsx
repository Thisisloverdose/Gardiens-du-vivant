'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MapPin, Navigation, Search, X, Check } from 'lucide-react';
import { useStore } from '@/lib/store';

const BELGIAN_COMMUNES = [
  { nom: 'Bruxelles', latitude: 50.8503, longitude: 4.3517 },
  { nom: 'Anvers', latitude: 51.2194, longitude: 4.4025 },
  { nom: 'Gand', latitude: 51.0543, longitude: 3.7174 },
  { nom: 'Charleroi', latitude: 50.4110, longitude: 4.4446 },
  { nom: 'Liege', latitude: 50.6326, longitude: 5.5698 },
  { nom: 'Bruges', latitude: 51.2093, longitude: 3.2247 },
  { nom: 'Namur', latitude: 50.4673, longitude: 4.8721 },
  { nom: 'Leuven', latitude: 50.8798, longitude: 4.7005 },
  { nom: 'Mons', latitude: 50.4555, longitude: 3.9432 },
  { nom: 'Arlon', latitude: 49.6700, longitude: 5.8167 },
  { nom: 'Lille', latitude: 50.6292, longitude: 3.0573 },
  { nom: 'Tourcoing', latitude: 50.7268, longitude: 3.2325 },
  { nom: 'Roubaix', latitude: 50.6918, longitude: 3.1813 },
  { nom: 'Dunkerque', latitude: 51.0344, longitude: 2.3768 },
  { nom: 'Valenciennes', latitude: 50.3593, longitude: 3.5232 },
  { nom: 'Maubeuge', latitude: 50.2776, longitude: 3.9662 },
  { nom: 'Cambrai', latitude: 50.1762, longitude: 3.2329 },
  { nom: 'Douai', latitude: 50.3707, longitude: 3.0797 },
  { nom: 'Arras', latitude: 50.2910, longitude: 2.7807 },
  { nom: 'Boulogne-sur-Mer', latitude: 50.7257, longitude: 1.6139 },
];

interface CommuneSelectorProps {
  onCommuneSelect?: (lat: number, lng: number) => void;
}

export default function CommuneSelector({ onCommuneSelect }: CommuneSelectorProps) {
  const commune = useStore((state) => state.commune);
  const setCommune = useStore((state) => state.setCommune);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const filteredCommunes = BELGIAN_COMMUNES.filter((c) =>
    c.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGeolocate = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocalisation non disponible');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const nearestCommune = BELGIAN_COMMUNES.reduce((closest, c) => {
          const distance = Math.sqrt(
            Math.pow(c.latitude - latitude, 2) + Math.pow(c.longitude - longitude, 2)
          );
          const closestDistance = Math.sqrt(
            Math.pow(closest.latitude - latitude, 2) + Math.pow(closest.longitude - longitude, 2)
          );
          return distance < closestDistance ? c : closest;
        });

        setCommune(nearestCommune);
        onCommuneSelect?.(nearestCommune.latitude, nearestCommune.longitude);
        setIsLocating(false);
        setIsOpen(false);
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Permission refusee');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Position non disponible');
            break;
          case error.TIMEOUT:
            setLocationError('Delai expire');
            break;
          default:
            setLocationError('Erreur de geolocalisation');
        }
      },
      { timeout: 10000 }
    );
  };

  const handleSelectCommune = (c: typeof BELGIAN_COMMUNES[0]) => {
    setCommune(c);
    onCommuneSelect?.(c.latitude, c.longitude);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClear = () => {
    setCommune(null);
  };

  if (commune) {
    return (
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-leaf-200 shadow-sm">
        <MapPin className="w-4 h-4 text-leaf-600" />
        <span className="text-sm font-medium text-leaf-800">{commune.nom}</span>
        <button
          onClick={handleClear}
          className="p-1 hover:bg-leaf-100 rounded-full transition-colors"
          aria-label="Effacer la commune"
        >
          <X className="w-4 h-4 text-leaf-600" />
        </button>
      </div>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          className="gap-2 border-leaf-300 text-leaf-700 hover:bg-leaf-50"
        >
          <Search className="w-4 h-4" />
          Rechercher une commune
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-3 border-b">
          <Input
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-leaf-200 focus:border-leaf-400"
          />
        </div>

        <div className="p-2 border-b">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-leaf-700 hover:bg-leaf-50"
            onClick={handleGeolocate}
            disabled={isLocating}
          >
            <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            {isLocating ? 'Localisation...' : 'Utiliser ma position'}
          </Button>
          {locationError && (
            <p className="text-xs text-red-500 mt-1 px-2">{locationError}</p>
          )}
        </div>

        <div className="max-h-60 overflow-y-auto">
          {filteredCommunes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aucune commune trouvee
            </p>
          ) : (
            filteredCommunes.map((c) => (
              <button
                key={c.nom}
                onClick={() => handleSelectCommune(c)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-leaf-50 rounded-lg transition-colors flex items-center justify-between group"
              >
                <span className="text-leaf-800">{c.nom}</span>
                <Check className="w-4 h-4 text-leaf-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
