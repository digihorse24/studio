"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Pen } from "lucide-react";

export function SignaturePad({ onEndSignature }: { onEndSignature: (dataUrl: string) => void }) {
  // In a real app, this would use a library like react-signature-canvas.
  // This is a placeholder to simulate the functionality.
  
  return (
    <Card>
      <CardContent className="p-2">
        <div 
          className="relative w-full h-48 bg-muted/50 rounded-md flex items-center justify-center cursor-pointer"
          onClick={() => onEndSignature("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/Pj24VgAAAABJRU5ErkJggg==")}
        >
          <div className="text-center text-muted-foreground">
            <Pen className="mx-auto h-8 w-8" />
            <p>Hier unterschreiben</p>
            <p className="text-xs">(Klicken zum Simulieren der Unterschrift)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
