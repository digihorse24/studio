import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/components/data-table';
import { columns } from './components/columns';
import { Card, CardContent } from '@/components/ui/card';
import { Kunde } from '@/lib/types';
import { mockKunden } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function KundenPage() {
    const kunden = Array.isArray(mockKunden) ? mockKunden : [];

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
                <Card>
                    <CardContent className="p-0">
                        <DataTable columns={columns} data={kunden} />
                    </CardContent>
                </Card>
            </main>
        </>
    );
}
