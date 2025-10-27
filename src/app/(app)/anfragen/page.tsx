import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AnfragenPage() {
  return (
    <>
      <PageHeader title="Anfragen" />
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Neue Anfragen</CardTitle>
              <CardDescription>
                Hier erscheinen Anfragen, die über das Kontaktformular Ihrer Landingpage gesendet werden.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">Noch keine Anfragen erhalten.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
