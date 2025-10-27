"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { suggestAppointments, SuggestAppointmentsOutput } from "@/ai/flows/suggest-appointments";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface AISuggestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  calendarData: string;
}

export function AISuggestionModal({ open, onOpenChange, calendarData }: AISuggestionModalProps) {
  const [request, setRequest] = useState("");
  const [suggestions, setSuggestions] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSuggest = async () => {
    if (!request) return;
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result: SuggestAppointmentsOutput = await suggestAppointments({
        calendar: calendarData,
        request: request,
      });
      const parsedSuggestions = JSON.parse(result.suggestions);
      setSuggestions(parsedSuggestions);
    } catch (error) {
      console.error("AI suggestion failed:", error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Terminvorschläge konnten nicht generiert werden.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetAndClose = () => {
    setRequest("");
    setSuggestions(null);
    setIsLoading(false);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            KI Terminvorschläge
          </DialogTitle>
          <DialogDescription>
            Beschreiben Sie, welche Termine Sie suchen. Z.B. "Zwei Termine für Hufbeschlag nächste Woche".
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Ihre Anfrage..."
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          />
          <Button onClick={handleSuggest} disabled={isLoading || !request} className="w-full">
            {isLoading ? "Analysiere..." : "Vorschläge erhalten"}
          </Button>
          <div className="space-y-2">
            {isLoading && (
              <>
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </>
            )}
            {suggestions && (
              <div className="space-y-2 rounded-lg border p-2">
                <h4 className="font-semibold text-sm">Vorschläge:</h4>
                {suggestions.map((s, i) => (
                  <div key={i} className="p-2 bg-accent/50 rounded-md text-sm">
                    <p><strong>{s.service}</strong> für <strong>{s.client}</strong></p>
                    <p>Datum: {s.date} um {s.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={resetAndClose}>
            Schließen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
