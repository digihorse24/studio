import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { DataTable } from '@/components/data-table';
import { columns } from './components/columns';

export default async function KundenPage() {
    const kunden = await api.getKunden();

    return (
        <>
            <PageHeader title="Kunden">
                <Button asChild>
                    <Link href="/kunden/neu">
                        <Plus className="mr-2 h-4 w-4" />
                        Kunde anlegen
                    </Link>
                </Button>
            </PageHeader>
            <main className="flex-1 p-4 md:p-6">
                <DataTable columns={columns} data={kunden} />
            </main>
        </>
    );
}
