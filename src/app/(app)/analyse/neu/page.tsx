import { PageHeader } from '@/components/page-header';
import { AnalysisProvider } from './context/analysis-context';
import { AnalysisWizard } from './components/analysis-wizard';
import { mockPferde } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function NewAnalysisPage() {
    const pferde = mockPferde;

    return (
        <AnalysisProvider>
            <PageHeader title="Neue Hufanalyse" />
            <main className="flex-1 p-4 md:p-6">
                <div className="max-w-4xl mx-auto">
                    <AnalysisWizard pferde={pferde} />
                </div>
            </main>
        </AnalysisProvider>
    );
}
