import { PageHeader } from '@/components/page-header';
import api from '@/lib/api';
import { CalendarClient } from './components/calendar-client';

export default async function KalenderPage() {
    const termine = await api.getTermine();
    const kunden = await api.getKunden();
    const pferde = await api.getPferde();

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
