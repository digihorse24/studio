import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, CreditCard, TrendingUp, PlusCircle, FileText, MinusCircle } from 'lucide-react';
import Link from 'next/link';

// Mock data, wird später durch echte Daten ersetzt
const kpiData = {
  gesamtumsatz: "1.250,00 €",
  offenePosten: "280,00 €",
  umsatzProTermin: "75,50 €"
};

const mockTransactions = [
  { id: '1', date: '2024-07-20', type: 'Bezahlung', customer: 'Erika Mustermann', amount: '85,00 €', status: 'bezahlt' },
  { id: '2', date: '2024-07-19', type: 'Rechnung', customer: 'Max Power', amount: '120,00 €', status: 'offen' },
  { id: '3', date: '2024-07-18', type: 'Ausgabe', customer: 'Werkzeughandel', amount: '-45,00 €', status: 'gebucht' },
];

export default function UmsaetzePage() {
    return (
        <>
            <PageHeader title="Financial Cockpit">
                <div className="flex items-center gap-2">
                    <Button variant="outline"><MinusCircle className="mr-2 h-4 w-4" /> Ausgabe buchen</Button>
                    <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> Rechnung erstellen</Button>
                    <Button><PlusCircle className="mr-2 h-4 w-4" /> Zahlung erfassen</Button>
                </div>
            </PageHeader>
            <main className="flex-1 p-4 md:p-6 space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Gesamtumsatz (Dieser Monat)</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpiData.gesamtumsatz}</div>
                            <p className="text-xs text-muted-foreground">+5.2% zum Vormonat</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Offene Posten</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpiData.offenePosten}</div>
                            <p className="text-xs text-muted-foreground">2 fällige Rechnungen</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Ø Umsatz pro Termin</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpiData.umsatzProTermin}</div>
                             <p className="text-xs text-muted-foreground">Basierend auf 16 Terminen</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section - Placeholder */}
                 <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Umsatzverlauf</CardTitle>
                             <CardDescription>Die letzten 6 Monate</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground">
                                Liniendiagramm wird hier angezeigt
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Umsatz nach Quellen</CardTitle>
                            <CardDescription>Aufteilung nach Leistungskategorien</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground">
                                Donut-Diagramm wird hier angezeigt
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transactions List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Transaktionsliste</CardTitle>
                        <CardDescription>Eine Übersicht aller finanziellen Bewegungen.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Datum</TableHead>
                                    <TableHead>Typ</TableHead>
                                    <TableHead>Kunde/Beschreibung</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Betrag</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockTransactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell>{tx.date}</TableCell>
                                    <TableCell>{tx.type}</TableCell>
                                    <TableCell>{tx.customer}</TableCell>
                                    <TableCell>{tx.status}</TableCell>
                                    <TableCell className="text-right">{tx.amount}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </>
    );
}
