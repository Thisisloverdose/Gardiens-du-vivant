'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useStore, type Signalement, type Projet, type Refuge } from '@/lib/store';

const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Red for signalements, Amber/Yellow for projects, Green for refuges
const redIcon = createCustomIcon('#ef4444');
const amberIcon = createCustomIcon('#f59e0b');
const greenIcon = createCustomIcon('#22c55e');

interface MapComponentProps {
  center: [number, number];
  zoom?: number;
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    try {
      map.setView(center, map.getZoom());
    } catch (e) {
      console.error('MapController error:', e);
    }
  }, [center, map]);

  return null;
}

const getSignalementLabel = (type: Signalement['type']) => {
  switch (type) {
    case 'dechets': return 'Dechets';
    case 'pollution': return 'Pollution';
    case 'nature_degradee': return 'Nature degradee';
    case 'animal': return 'Animal en detresse';
    default: return 'Signalement';
  }
};

const getProjetLabel = (type: Projet['type']) => {
  switch (type) {
    case 'nettoyage': return 'Nettoyage';
    case 'plantation': return 'Plantation';
    case 'autre': return 'Autre';
    default: return 'Projet';
  }
};

const getRefugeLabel = (type: Refuge['type']) => {
  switch (type) {
    case 'jardin': return 'Jardin biodiversite';
    case 'nichoir': return 'Nichoir';
    case 'mare': return 'Mare';
    default: return 'Refuge';
  }
};

export default function Map({ center, zoom = 13 }: MapComponentProps) {
  const commune = useStore((state) => state.commune);
  const signalements = useStore((state) => state.signalements);
  const projets = useStore((state) => state.projets);
  const refuges = useStore((state) => state.refuges);

  const filteredSignalements = commune
    ? signalements.filter((s) => s.commune.toLowerCase() === commune.nom.toLowerCase())
    : signalements;

  const filteredProjets = commune
    ? projets.filter((p) => p.commune.toLowerCase() === commune.nom.toLowerCase())
    : projets;

  const filteredRefuges = commune
    ? refuges.filter((r) => r.commune.toLowerCase() === commune.nom.toLowerCase())
    : refuges;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full rounded-xl"
      zoomControl={true}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <MapController center={center} />

      {/* Red markers for signalements */}
      {filteredSignalements.map((s) => (
        <Marker
          key={s.id}
          position={[s.latitude, s.longitude]}
          icon={redIcon}
        >
          <Popup>
            <div className="min-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="font-semibold text-red-600">
                  {getSignalementLabel(s.type)}
                </span>
              </div>
              <p className="text-sm text-gray-700">{s.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(s.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Amber/Yellow markers for projets */}
      {filteredProjets.map((p) => (
        <Marker
          key={p.id}
          position={[p.latitude, p.longitude]}
          icon={amberIcon}
        >
          <Popup>
            <div className="min-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="font-semibold text-amber-600">
                  {p.titre}
                </span>
              </div>
              <p className="text-sm text-gray-700">{p.description}</p>
              <p className="text-xs text-amber-500 mt-1">
                Type: {getProjetLabel(p.type)}
              </p>
              {p.date && (
                <p className="text-sm text-amber-600 mt-1">
                  Date: {new Date(p.date).toLocaleDateString('fr-FR')}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(p.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Green markers for refuges */}
      {filteredRefuges.map((r) => (
        <Marker
          key={r.id}
          position={[r.latitude, r.longitude]}
          icon={greenIcon}
        >
          <Popup>
            <div className="min-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="font-semibold text-green-600">
                  {getRefugeLabel(r.type)}
                </span>
              </div>
              <p className="text-sm text-gray-700">{r.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(r.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
