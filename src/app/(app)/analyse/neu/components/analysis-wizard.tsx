"use client";

import { useState } from 'react';
import { useAnalysis } from '../context/analysis-context';
import { Pferd } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { SignaturePad } from './signature-pad';
import { AssessmentRadio } from './assessment-radio';
import { generateHoofAnalysisSummary, GenerateHoofAnalysisSummaryOutput } from '@/ai/flows/generate-hoof-analysis-summary';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Sparkles, Send, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function AnalysisWizard({ pferde }: { pferde: Pferd[] }) {
  const { state, dispatch } = useAnalysis();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [aiSummary, setAiSummary] = useState<GenerateHoofAnalysisSummaryOutput | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const handleSelectPferd = (pferdId: string) => {
    dispatch({ type: 'UPDATE_DATA', payload: { pferd_id: pferdId } });
    handleNext();
  };

  const handleGenerateSummary = async () => {
    setIsAiLoading(true);
    try {
        const analysisData = JSON.stringify(state, null, 2);
        const result = await generateHoofAnalysisSummary({ analysisData });
        setAiSummary(result);
        toast({ title: "Zusammenfassung generiert!", description: "Die KI-Analyse wurde erfolgreich abgeschlossen." });
    } catch (error) {
        console.error("AI summary failed", error);
        toast({ variant: "destructive", title: "Fehler", description: "Zusammenfassung konnte nicht generiert werden." });
    } finally {
        setIsAiLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Progress value={progress} className="w-full" />
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Schritt 1: Pferd auswählen</CardTitle>
            <CardDescription>Wählen Sie das Pferd für die Analyse aus.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={handleSelectPferd} value={state.pferd_id}>
              <SelectTrigger>
                <SelectValue placeholder="Pferd auswählen..." />
              </SelectTrigger>
              <SelectContent>
                {pferde.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Schritt 2: Hufbewertung</CardTitle>
            <CardDescription>Bewerten Sie die verschiedenen Aspekte des Hufs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Strahl</Label>
              <AssessmentRadio value={state.assessment.strahl} onChange={v => dispatch({type: 'UPDATE_DATA', payload: {assessment: {...state.assessment, strahl: v}}})} />
            </div>
            <div>
              <Label>Sohle</Label>
              <AssessmentRadio value={state.assessment.sohle} onChange={v => dispatch({type: 'UPDATE_DATA', payload: {assessment: {...state.assessment, sohle: v}}})} />
            </div>
            <div>
                <Label>Hufwand</Label>
                <AssessmentRadio value={state.assessment.hufwand} onChange={v => dispatch({type: 'UPDATE_DATA', payload: {assessment: {...state.assessment, hufwand: v}}})} />
            </div>
            <div>
                <Label>Allgemeiner Zustand</Label>
                <AssessmentRadio value={state.assessment.allgemein} onChange={v => dispatch({type: 'UPDATE_DATA', payload: {assessment: {...state.assessment, allgemein: v}}})} />
            </div>
             <div>
                <Label>Notizen</Label>
                <Textarea value={state.notes} onChange={e => dispatch({type: 'UPDATE_DATA', payload: {notes: e.target.value}})} />
             </div>
          </CardContent>
        </Card>
      )}
      
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Schritt 3: Abschluss & Unterschrift</CardTitle>
            <CardDescription>Bestätigen Sie die Analyse und lassen Sie den Kunden unterschreiben.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="items-top flex space-x-2">
                <Checkbox id="dsgvo" checked={state.dsgvo_accepted} onCheckedChange={(checked) => dispatch({ type: 'UPDATE_DATA', payload: { dsgvo_accepted: !!checked }})}/>
                <div className="grid gap-1.5 leading-none">
                    <label htmlFor="dsgvo" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        DSGVO-Einwilligung
                    </label>
                    <p className="text-sm text-muted-foreground">
                       Der Kunde bestätigt die Verarbeitung der Daten gemäß der Datenschutzerklärung.
                    </p>
                </div>
            </div>
            <div>
                <Label>Unterschrift des Kunden</Label>
                <SignaturePad onEndSignature={(sig) => dispatch({type: 'UPDATE_DATA', payload: {signature: sig}})} />
                {state.signature && <p className="text-sm text-green-600 mt-2">Unterschrift erfasst.</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Schritt 4: Zusammenfassung & Bericht</CardTitle>
             <CardDescription>Hier sehen Sie die Zusammenfassung und können einen KI-basierten Bericht erstellen.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
                <Button onClick={handleGenerateSummary} disabled={isAiLoading} size="lg">
                    {isAiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4" />}
                    KI-Zusammenfassung erstellen
                </Button>
            </div>
            {aiSummary && (
                <div className="space-y-4">
                    <Card>
                        <CardHeader><CardTitle>Zusammenfassung</CardTitle></CardHeader>
                        <CardContent><p className="whitespace-pre-wrap">{aiSummary.summary}</p></CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Empfehlungen</CardTitle></CardHeader>
                        <CardContent><p className="whitespace-pre-wrap">{aiSummary.recommendations}</p></CardContent>
                    </Card>
                </div>
            )}
             <Button size="lg" variant="secondary"><Send className="mr-2 h-4 w-4" /> Bericht als PDF exportieren</Button>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
        </Button>
        <Button onClick={handleNext} disabled={currentStep === totalSteps}>
          Weiter <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}