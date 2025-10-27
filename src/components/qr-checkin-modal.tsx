'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

interface QrCheckinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QrCheckinModal({ open, onOpenChange }: QrCheckinModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>QR-Code Check-in</DialogTitle>
          <DialogDescription>
            Scannen Sie den QR-Code am Stall, um das Pferd schnell zu identifizieren.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center bg-muted/50 rounded-lg aspect-square w-full">
            <div className="text-center text-muted-foreground p-4">
                <Camera className="mx-auto h-16 w-16 mb-4" />
                <p>Kameravorschau nicht verfügbar.</p>
                <p className="text-xs">In einer echten Anwendung würde hier der Kamerastream angezeigt.</p>
            </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Abbrechen
          </Button>
          <Button type="button">Scannen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
