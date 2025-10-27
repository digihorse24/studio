import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Kunde, Pferd } from '@/lib/types';
import { mockKunden, mockPferde } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PferdePage() {
    const pferde = mockPferde;
    const kunden = mockKunden;

    return (
        <>
            <PageHeader title="Pferde">
                <Button asChild>
                    <Link href="/pferde/neu">
                        <Plus className="mr-2 h-4 w-4" />
                        Pferd anlegen
                    </Link>
                </Button>
            </PageHeader>
            <main className="flex-1 p-4 md:p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {pferde.map(pferd => {
                        const kunde = kunden.find(k => k.id === pferd.besitzer_id);
                        return (
                            <Card key={pferd.id}>
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src={pferd.imageUrl} alt={pferd.name} data-ai-hint={pferd.imageHint} />
                                            <AvatarFallback>{pferd.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle>{pferd.name}</CardTitle>
                                            <CardDescription>
                                                {kunde?.name || 'Besitzer unbekannt'}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <p><strong>Rasse:</strong> {pferd.rasse}</p>
                                        <p><strong>Alter:</strong> {pferd.alter} Jahre</p>
                                        <Badge variant="outline">{pferd.eqid}</Badge>
                                    </div>
                                    <Button asChild className="w-full mt-4">
                                        <Link href={`/pferde/${pferd.id}`}>
                                            Details anzeigen
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </main>
        </>
    );
}
