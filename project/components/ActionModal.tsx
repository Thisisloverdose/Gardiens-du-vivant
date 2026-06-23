'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check, Camera } from 'lucide-react';
import type { ActionType } from './BottomBar';
import { useStore, type Signalement, type Projet, type Refuge } from '@/lib/store';

interface ActionModalProps {
  action: ActionType;
  onClose: () => void;
  latitude: number;
  longitude: number;
}

export default function ActionModal({
  action,
  onClose,
  latitude,
  longitude,
}: ActionModalProps) {
  const commune = useStore((state) => state.commune);
  const addSignalement = useStore((state) => state.addSignalement);
  const addProjet = useStore((state) => state.addProjet);
  const addRefuge = useStore((state) => state.addRefuge);

  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    titre: '',
    projectType: '',
    date: '',
    photoUrl: '',
  });

  const handleSubmit = () => {
    const communeName = commune?.nom || 'Commune inconnue';

    if (action === 'signaler') {
      const signalement: Omit<Signalement, 'id' | 'createdAt'> = {
        type: formData.type as Signalement['type'],
        description: formData.description,
        latitude,
        longitude,
        commune: communeName,
      };
      addSignalement(signalement);
    } else if (action === 'projet') {
      const projet: Omit<Projet, 'id' | 'createdAt'> = {
        titre: formData.titre,
        description: formData.description,
        type: formData.projectType as Projet['type'],
        date: formData.date || undefined,
        latitude,
        longitude,
        commune: communeName,
      };
      addProjet(projet);
    } else if (action === 'refuge') {
      const refuge: Omit<Refuge, 'id' | 'createdAt'> = {
        type: formData.type as Refuge['type'],
        description: formData.description,
        photoUrl: formData.photoUrl || undefined,
        latitude,
        longitude,
        commune: communeName,
      };
      addRefuge(refuge);
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  const getModalContent = () => {
    if (showSuccess) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-leaf-100 flex items-center justify-center mb-4 animate-bounce">
            <Check className="w-8 h-8 text-leaf-600" />
          </div>
          <p className="font-semibold text-leaf-700 text-lg mb-1">Action enregistree</p>
          <p className="text-sm text-muted-foreground">
            Vous contribuez au vivant de votre commune
          </p>
        </div>
      );
    }

    switch (action) {
      case 'signaler':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                Signaler un probleme
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Categorie</Label>
                <Select
                  value={formData.type}
                  onValueChange={(v) => setFormData({ ...formData, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dechets">Dechets</SelectItem>
                    <SelectItem value="pollution">Pollution</SelectItem>
                    <SelectItem value="nature_degradee">Nature degradee</SelectItem>
                    <SelectItem value="animal">Animal en detresse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Photo (optionnelle)</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => {}}
                  >
                    <Camera className="w-4 h-4" />
                    Ajouter une photo
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description courte</Label>
                <Textarea
                  placeholder="Decrivez le probleme..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                onClick={handleSubmit}
                disabled={!formData.type || !formData.description}
              >
                Envoyer le signalement
              </Button>
            </div>
          </>
        );

      case 'projet':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-amber-600">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                Creer un projet
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input
                  placeholder="Ex: Nettoyage du parc"
                  value={formData.titre}
                  onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Decrivez le projet..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(v) => setFormData({ ...formData, projectType: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nettoyage">Nettoyage</SelectItem>
                    <SelectItem value="plantation">Plantation</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date (optionnelle)</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <Button
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3"
                onClick={handleSubmit}
                disabled={!formData.titre || !formData.description || !formData.projectType}
              >
                Creer le projet
              </Button>
            </div>
          </>
        );

      case 'refuge':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-leaf-600">
                <div className="w-3 h-3 rounded-full bg-leaf-500" />
                Creer un refuge
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Type de refuge</Label>
                <Select
                  value={formData.type}
                  onValueChange={(v) => setFormData({ ...formData, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jardin">Jardin biodiversite</SelectItem>
                    <SelectItem value="nichoir">Nichoir</SelectItem>
                    <SelectItem value="mare">Mare</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Decrivez votre refuge..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Photo (optionnelle)</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => {}}
                  >
                    <Camera className="w-4 h-4" />
                    Ajouter une photo
                  </Button>
                </div>
              </div>

              <div className="bg-leaf-50 border border-leaf-200 rounded-lg p-3">
                <p className="text-sm text-leaf-800">
                  Les refuges contribuent +2 points a la tendance du vivant
                </p>
              </div>

              <Button
                className="w-full bg-leaf-600 hover:bg-leaf-700 text-white py-3"
                onClick={handleSubmit}
                disabled={!formData.type || !formData.description}
              >
                Valider le refuge
              </Button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={action !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        {getModalContent()}
      </DialogContent>
    </Dialog>
  );
}
