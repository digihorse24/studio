import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, AlertTriangle, ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { format } from 'date-fns';

export default async function DashboardPage() {
    const today = format(new Date(), 'yyyy-MM-dd');
    const allTermine = await api.getTermine();
    const allKunden = await api.getKunden();
    const allPferde = await api.getPferde();
    
    const todaysAppointments = allTermine.filter(t => t.date === today && t.status === 'geplant');
    
    // Mock data for horses needing attention
    const dueHorses = allPferde.slice(0, 2);

    return (
        <>
            <PageHeader title="Dashboard" />
            <main className="flex-1 p-4 md:p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-1.5">
                                <CardTitle>Heutige Termine</CardTitle>
                                <CardDescription>Eine Übersicht Ihrer Termine für heute.</CardDescription>
                            </div>
                            <Button asChild variant="outline">
                                <Link href="/kalender">Kalender anzeigen <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                           {todaysAppointments.length > 0 ? (
                                <ul className="space-y-4">
                                {todaysAppointments.map(termin => {
                                    const kunde = allKunden.find(k => k.id === termin.kunde_id);
                                    const pferd = allPferde.find(p => p.id === termin.pferd_id);
                                    return (
                                        <li key={termin.id} className="flex items-center gap-4 p-3 bg-accent/50 rounded-lg">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                                                {termin.time.split(':')[0]}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold">{termin.service}</p>
                                                <p className="text-sm text-muted-foreground">{pferd?.name} ({kunde?.name})</p>
                                            </div>
                                            <Clock className="h-5 w-5 text-muted-foreground" />
                                        </li>
                                    )
                                })}
                                </ul>
                           ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <p>Keine Termine für heute geplant.</p>
                            </div>
                           )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Fällige Pferde</CardTitle>
                            <CardDescription>Pferde, die bald wieder eine Behandlung benötigen.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {dueHorses.length > 0 ? (
                                <ul className="space-y-4">
                                    {dueHorses.map(pferd => {
                                        const kunde = allKunden.find(k => k.id === pferd.besitzer_id);
                                        return (
                                        <li key={pferd.id} className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={pferd.imageUrl} data-ai-hint={pferd.imageHint} alt={pferd.name}/>
                                                <AvatarFallback>{pferd.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p className="font-semibold">{pferd.name}</p>
                                                <p className="text-sm text-muted-foreground">{kunde?.name}</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-yellow-600">
                                                <AlertTriangle className="h-4 w-4" />
                                                <span>Fällig</span>
                                            </div>
                                        </li>
                                    )})}
                                </ul>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>Keine fälligen Pferde.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                 <div className="mt-6 grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Schnellzugriff</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                            <Button asChild size="lg" variant="outline">
                                <Link href="/kunden/neu">
                                    <Plus className="mr-2 h-4 w-4" /> Neuen Kunden anlegen
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link href="/kalender">
                                    <Plus className="mr-2 h-4 w-4" /> Neuen Termin erstellen
                                </Link>
                            </Button>
                             <Button asChild size="lg" variant="outline">
                                <Link href="/analyse/neu">
                                    <Plus className="mr-2 h-4 w-4" /> Neue Hufanalyse starten
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
