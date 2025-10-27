import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/components/data-table';
import { columns } from './components/columns';
import { Card, CardContent } from '@/components/ui/card';
import { Kunde } from '@/lib/types';
import { generateKid } from '@/lib/ids';

// Move mock data directly into the component to ensure stability during build
const kundenData: Kunde[] = [
  {
    id: 'kunde-1',
    kid: generateKid(),
    name: 'Erika Mustermann',
    email: 'erika.mustermann@example.com',
    phone: '0123 456789',
    address: 'Musterstraße 1, 12345 Musterstadt',
    pferde_ids: ['pferd-1', 'pferd-2'],
  },
  {
    id: 'kunde-2',
    kid: generateKid(),
    name: 'Max Power',
    email: 'max.power@example.com',
    phone: '0987 654321',
    address: 'Powerweg 10, 54321 Kraftort',
    pferde_ids: ['pferd-3'],
  },
];

export default async function KundenPage() {
    const kunden = kundenData;

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
