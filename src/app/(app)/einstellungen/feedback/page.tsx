import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function FeedbackSettingsPage() {
  return (
    <>
      <PageHeader title="Feedback-Einstellungen" />
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Automatisierte Feedback-Anfragen</CardTitle>
              <CardDescription>
                Hier können Sie einstellen, wie und wann Ihre Kunden nach einem Termin um Feedback gebeten werden.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Die Konfiguration für automatisierte Feedback-Anfragen wird hier in Kürze verfügbar sein.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
