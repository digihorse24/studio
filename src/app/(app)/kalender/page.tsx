import { PageHeader } from '@/components/page-header';
import { CalendarClient } from './components/calendar-client';
import { mockTermine, mockKunden, mockPferde } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function KalenderPage() {
    const termine = mockTermine;
    const kunden = mockKunden;
    const pferde = mockPferde;

    const events = termine.map(termin => {
        const kunde = kunden.find(k => k.id === termin.kunde_id);
        const pferd = pferde.find(p => p.id === termin.pferd_id);
        return {
            ...termin,
            title: termin.service,
            pferdName: pferd?.name,
            kundeName: kunde?.name,
        }
    })

    return (
        <>
            <PageHeader title="Kalender" />
            <main className="flex-1 p-4 md:p-6">
                <CalendarClient events={events} />
            </main>
        </>
    );
}
