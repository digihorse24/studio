import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { KundeForm } from './components/kunde-form';

export default function NewKundePage() {
    return (
        <>
            <PageHeader title="Neuen Kunden anlegen" />
            <main className="flex-1 p-4 md:p-6">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Kundendaten</CardTitle>
                            <CardDescription>
                                Füllen Sie die Informationen unten aus, um einen neuen Kunden zu Ihrem System hinzuzufügen.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <KundeForm />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
