'use client';

import {
  AlertTriangle,
  Heart,
  Leaf,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export type ActionType = 'signaler' | 'projet' | 'refuge' | null;

interface BottomBarProps {
  onAction: (action: ActionType) => void;
}

export default function BottomBar({ onAction }: BottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-leaf-100 shadow-lg z-50">
      <div className="flex items-center justify-around py-3 px-2 gap-2 max-w-md mx-auto">
        <Button
          variant="ghost"
          onClick={() => onAction('signaler')}
          className="flex-1 flex flex-col items-center gap-1.5 h-auto py-3 px-2 hover:bg-red-50 rounded-xl transition-all group"
        >
          <div className="p-2.5 rounded-full bg-red-100 group-hover:bg-red-200 transition-colors">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <span className="text-xs font-semibold text-red-700">Signaler</span>
        </Button>

        <Button
          variant="ghost"
          onClick={() => onAction('projet')}
          className="flex-1 flex flex-col items-center gap-1.5 h-auto py-3 px-2 hover:bg-amber-50 rounded-xl transition-all group"
        >
          <div className="p-2.5 rounded-full bg-amber-100 group-hover:bg-amber-200 transition-colors">
            <Leaf className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-xs font-semibold text-amber-700">Projet</span>
        </Button>

        <Button
          variant="ghost"
          onClick={() => onAction('refuge')}
          className="flex-1 flex flex-col items-center gap-1.5 h-auto py-3 px-2 hover:bg-leaf-50 rounded-xl transition-all group"
        >
          <div className="p-2.5 rounded-full bg-leaf-100 group-hover:bg-leaf-200 transition-colors">
            <Home className="w-5 h-5 text-leaf-600" />
          </div>
          <span className="text-xs font-semibold text-leaf-700">Refuge</span>
        </Button>
      </div>
    </div>
  );
}
