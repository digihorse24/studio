import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ClipboardCheck, History } from 'lucide-react';
import Link from 'next/link';

export default function AnalysePage() {
    return (
        <>
            <PageHeader title="HufAnalysePro" />
            <main className="flex-1 p-4 md:p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center">
                        <ClipboardCheck className="mx-auto h-16 w-16 text-primary" />
                        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            HufAnalysePro
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Ihr professionelles Werkzeug zur detaillierten Erfassung und Auswertung des Hufzustands.
                        </p>
                    </div>

                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle>Neue Analyse starten</CardTitle>
                            <CardDescription>
                                Beginnen Sie eine neue, geführte Hufanalyse für ein Pferd.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild size="lg">
                                <Link href="/analyse/neu">
                                    <Plus className="mr-2 h-5 w-5" />
                                    Analyse starten
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <History className="h-5 w-5" />
                                Letzte Analysen
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-muted-foreground">Hier werden Ihre vergangenen Analysen aufgelistet.</p>
                           {/* Placeholder for list of past analyses */}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}