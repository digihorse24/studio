import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Handshake } from 'lucide-react';
import { mockPartner } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PartnerPage() {
    const partner = mockPartner;

    return (
        <>
            <PageHeader title="Partner">
                <Button asChild>
                    <Link href="/partner/neu">
                        <Plus className="mr-2 h-4 w-4" />
                        Partner anlegen
                    </Link>
                </Button>
            </PageHeader>
            <main className="flex-1 p-4 md:p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {partner.map(p => (
                        <Card key={p.id}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Handshake className="h-5 w-5" />
                                    {p.name}
                                </CardTitle>
                                <CardDescription>{p.profession}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm">
                                    <p><strong>E-Mail:</strong> {p.email}</p>
                                    <p><strong>Telefon:</strong> {p.phone}</p>
                                    <Badge variant="outline">{p.pid}</Badge>
                                </div>
                                <Button asChild className="w-full mt-4">
                                    <Link href={`/partner/${p.id}`}>
                                        Details anzeigen
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </>
    );
}
