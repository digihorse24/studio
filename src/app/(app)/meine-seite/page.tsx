import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Save } from 'lucide-react';

export default function MeineSeitePage() {
  return (
    <>
      <PageHeader title="Meine Seite bearbeiten">
        <Button variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          Vorschau
        </Button>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Speichern
        </Button>
      </PageHeader>
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Landingpage Editor</CardTitle>
              <CardDescription>
                Passen Sie hier die Inhalte Ihrer persönlichen Landingpage an. Diese Seite ist für potenzielle Neukunden sichtbar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Der Editor wird hier in einem der nächsten Schritte implementiert.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
