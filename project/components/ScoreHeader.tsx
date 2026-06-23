'use client';

import { Leaf, TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';
import { useStore } from '@/lib/store';
import CommuneSelector from './CommuneSelector';

interface ScoreHeaderProps {
  onCommuneSelect?: (lat: number, lng: number) => void;
}

export default function ScoreHeader({ onCommuneSelect }: ScoreHeaderProps) {
  const commune = useStore((state) => state.commune);
  const signalements = useStore((state) => state.signalements);
  const projets = useStore((state) => state.projets);
  const refuges = useStore((state) => state.refuges);

  // Calculate score: +1 signalement, +2 refuge, +1 projet
  const communeName = commune?.nom.toLowerCase() || '';
  const communeRefuges = refuges.filter(r => r.commune.toLowerCase() === communeName).length;
  const communeSignalements = signalements.filter(s => s.commune.toLowerCase() === communeName).length;
  const communeProjets = projets.filter(p => p.commune.toLowerCase() === communeName).length;

  const score = communeRefuges * 2 + communeSignalements + communeProjets;

  const getTendanceLabel = () => {
    if (score >= 10) return 'forte';
    if (score >= 5) return 'moderee';
    if (score > 0) return 'faible';
    return 'aucune';
  };

  const getTendanceColor = () => {
    const tendance = getTendanceLabel();
    if (tendance === 'forte') return 'text-leaf-600';
    if (tendance === 'moderee') return 'text-amber-600';
    if (tendance === 'faible') return 'text-orange-600';
    return 'text-gray-400';
  };

  const getTendanceBg = () => {
    const tendance = getTendanceLabel();
    if (tendance === 'forte') return 'bg-leaf-50 border-leaf-200';
    if (tendance === 'moderee') return 'bg-amber-50 border-amber-200';
    if (tendance === 'faible') return 'bg-orange-50 border-orange-200';
    return 'bg-gray-50 border-gray-200';
  };

  const getTendanceIcon = () => {
    const tendance = getTendanceLabel();
    if (tendance === 'forte') return <TrendingUp className="w-4 h-4 text-leaf-500" />;
    if (tendance === 'moderee' || tendance === 'faible') return <Minus className="w-4 h-4 text-amber-500" />;
    return null;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-leaf-100 shadow-sm">
      <div className="px-4 py-3">
        <div className="flex flex-col gap-3">
          <CommuneSelector onCommuneSelect={onCommuneSelect} />

          {commune && (
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getTendanceBg()}`}>
              <Leaf className="w-5 h-5 text-leaf-600" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Tendance du vivant:</span>
                <span className={`font-bold text-base ${getTendanceColor()}`}>
                  {getTendanceLabel()}
                </span>
                {getTendanceIcon()}
              </div>
              {score > 0 && (
                <span className="text-xs text-muted-foreground ml-auto">
                  ({score} points)
                </span>
              )}
            </div>
          )}
        </div>

        {!commune && (
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground bg-amber-50/50 px-3 py-2 rounded-lg border border-amber-100">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>Choisissez une commune pour continuer</span>
          </div>
        )}
      </div>
    </div>
  );
}
