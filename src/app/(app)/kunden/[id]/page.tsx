import { PageHeader } from '@/components/page-header';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, User, Mail, Phone, Home, Users, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { HorseshoeIcon } from '@/components/logo';
import { mockKunden, mockPferde, mockPartner, mockConsents } from '@/lib/data';

export const dynamic = 'force-dynamic';

async function HorseList({ kundeId }: { kundeId: string }) {
    const kunde = mockKunden.find(k => k.id === kundeId);
    if (!kunde) return null;
    const pferde = mockPferde.filter(p => kunde.pferde_ids.includes(p.id));

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pferde.map(pferd => (
                <Card key={pferd.id}>
                    <CardContent className="p-4">
                        <div className="flex gap-4">
                            <Avatar className="h-24 w-24 rounded-md">
                               <AvatarImage asChild src={pferd.imageUrl} data-ai-hint={pferd.imageHint} alt={pferd.name}>
                                 <Image src={pferd.imageUrl!} alt={pferd.name} width={96} height={96} className="object-cover" />
                               </AvatarImage>
                               <AvatarFallback className="rounded-md">{pferd.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h3 className="font-bold">{pferd.name}</h3>
                                <p className="text-sm text-muted-foreground">{pferd.rasse}</p>
                                <p className="text-sm text-muted-foreground">{pferd.alter} Jahre alt</p>
                                <Badge variant="secondary">{pferd.eqid}</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

async function PartnerList() {
    const partners = mockPartner;
    return (
         <div className="grid gap-4 md:grid-cols-2">
            {partners.map(partner => (
                <Card key={partner.id}>
                    <CardHeader>
                        <CardTitle>{partner.name}</CardTitle>
                        <CardDescription>{partner.profession}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground"/> {partner.email}</p>
                        <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground"/> {partner.phone}</p>
                         <Badge variant="outline">{partner.pid}</Badge>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

async function ConsentManager({ kundeId }: { kundeId: string }) {
    const consents = mockConsents.filter(c => c.kunde_id === kundeId);
    const pferde = mockPferde;
    const partners = mockPartner;
    
    const statusColors: { [key: string]: string } = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        denied: 'bg-red-100 text-red-800',
        revoked: 'bg-gray-100 text-gray-800',
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Freigaben</CardTitle>
                <CardDescription>Verwalten Sie hier die Datenfreigaben für Partner.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {consents.map(consent => {
                    const pferd = pferde.find(p => p.id === consent.pferd_id);
                    const partner = partners.find(p => p.id === consent.partner_id);
                    return (
                        <div key={consent.id} className="p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h4 className="font-semibold">Freigabe für {partner?.name} ({pferd?.name})</h4>
                                <p className="text-sm text-muted-foreground">Angefragt am: {format(parseISO(consent.requested_at), 'dd.MM.yyyy')}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {consent.scopes.map(scope => <Badge key={scope} variant="secondary">{scope}</Badge>)}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                               <Badge className={statusColors[consent.status]}>{consent.status}</Badge>
                               <Button variant="outline" size="sm">Details</Button>
                            </div>
                        </div>
                    );
                })}
                 <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Neue Freigabe anfragen
                </Button>
            </CardContent>
        </Card>
    )
}

export default async function KundeDetailPage({ params }: { params: { id: string } }) {
    const kunde = mockKunden.find(k => k.id === params.id);

    if (!kunde) {
        notFound();
    }

    return (
        <>
            <PageHeader title={`Kunde: ${kunde.name}`} />
            <main className="flex-1 p-4 md:p-6 space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                             <div>
                                <CardTitle className="flex items-center gap-2 text-2xl"><User className="h-6 w-6" /> {kunde.name}</CardTitle>
                                <CardDescription>{kunde.kid}</CardDescription>
                            </div>
                            <Button variant="outline">Bearbeiten</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> {kunde.email}</p>
                        <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> {kunde.phone}</p>
                        <p className="flex items-center gap-2"><Home className="h-4 w-4 text-muted-foreground" /> {kunde.address}</p>
                    </CardContent>
                </Card>

                <Tabs defaultValue="pferde">
                    <TabsList>
                        <TabsTrigger value="pferde"><HorseshoeIcon className="mr-2 h-4 w-4" /> Pferde</TabsTrigger>
                        <TabsTrigger value="partner"><Users className="mr-2 h-4 w-4" /> Partner</TabsTrigger>
                        <TabsTrigger value="freigaben"><ShieldCheck className="mr-2 h-4 w-4" /> Freigaben</TabsTrigger>
                    </TabsList>
                    <TabsContent value="pferde" className="mt-4">
                       <HorseList kundeId={kunde.id} />
                    </TabsContent>
                    <TabsContent value="partner" className="mt-4">
                       <PartnerList />
                    </TabsContent>
                    <TabsContent value="freigaben" className="mt-4">
                        <ConsentManager kundeId={kunde.id} />
                    </TabsContent>
                </Tabs>
            </main>
        </>
    );
}
