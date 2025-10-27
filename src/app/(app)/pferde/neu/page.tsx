import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function NewPferdPage() {
    return (
        <>
            <PageHeader title="Neues Pferd anlegen" />
            <main className="flex-1 p-4 md:p-6">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pferdedaten</CardTitle>
                            <CardDescription>
                                Füllen Sie die Informationen unten aus, um ein neues Pferd zu Ihrem Bestand hinzuzufügen.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Formular-Komponente wird hier in einem zukünftigen Schritt eingefügt */}
                            <p className="text-muted-foreground text-center py-8">
                                Der Pferde-Editor wird hier in Kürze verfügbar sein.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
