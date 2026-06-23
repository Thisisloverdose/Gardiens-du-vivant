'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScoreHeader from '@/components/ScoreHeader';
import BottomBar, { type ActionType } from '@/components/BottomBar';
import ActionModal from '@/components/ActionModal';
import { useStore } from '@/lib/store';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-leaf-50 rounded-xl" />,
});

const DEFAULT_CENTER: [number, number] = [50.50, 4.35];

export default function MapPage() {
  const commune = useStore((state) => state.commune);
  const [mapCenter, setMapCenter] = useState<[number, number]>(
    commune ? [commune.latitude, commune.longitude] : DEFAULT_CENTER
  );
  const [currentAction, setCurrentAction] = useState<ActionType>(null);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (commune) {
      setMapCenter([commune.latitude, commune.longitude]);
    }
  }, [commune]);

  useEffect(() => {
    if (!userPosition && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition([pos.coords.latitude, pos.coords.longitude]);
          if (!commune) {
            setMapCenter([pos.coords.latitude, pos.coords.longitude]);
          }
        },
        () => {}
      );
    }
  }, [userPosition, commune]);

  const getActionPosition = (): [number, number] => {
    if (commune) return [commune.latitude, commune.longitude];
    if (userPosition) return userPosition;
    return mapCenter;
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-leaf-50 to-white">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 bg-white/90 backdrop-blur-sm border-b border-leaf-100 shadow-sm">
        <Link href="/">
          <Button variant="ghost" size="icon" className="hover:bg-leaf-50 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-leaf-600" />
          <span className="text-lg font-bold text-leaf-800">Ma Commune Vivante</span>
        </Link>
      </header>

      {/* Score Header */}
      <ScoreHeader onCommuneSelect={(lat, lng) => setMapCenter([lat, lng])} />

      {/* Map */}
      <div className="flex-1 relative px-4 py-3">
        <div className="h-full w-full rounded-xl border border-leaf-200 shadow-lg overflow-hidden bg-leaf-50">
          <Map center={mapCenter} zoom={13} />
        </div>
      </div>

      {/* Spacer for bottom bar */}
      <div className="h-20" />

      {/* Bottom Bar */}
      <BottomBar onAction={setCurrentAction} />

      {/* Action Modal */}
      {currentAction && (
        <ActionModal
          action={currentAction}
          onClose={() => setCurrentAction(null)}
          latitude={getActionPosition()[0]}
          longitude={getActionPosition()[1]}
        />
      )}
    </div>
  );
}
