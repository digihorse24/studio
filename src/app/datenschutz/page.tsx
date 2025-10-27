import { PageHeader } from '@/components/page-header';

export default function DatenschutzPage() {
    return (
        <div className="bg-background text-foreground">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Datenschutzerklärung</h1>
                
                <div className="space-y-6 text-muted-foreground">
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-foreground">1. Allgemeines</h2>
                        <p>Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten (nachfolgend „Daten“) innerhalb unserer Anwendung HufManager (nachfolgend „Anwendung“) und der mit ihr verbundenen Webseiten, Funktionen und Inhalte auf.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-foreground">2. Verantwortlicher</h2>
                        <p>
                            [Ihr Name/Firmenname]<br />
                            [Ihre Adresse]<br />
                            [PLZ, Ort]<br />
                            E-Mail: [Ihre E-Mail-Adresse]
                        </p>
                        <p className="mt-2 text-sm italic">Bitte ersetzen Sie die obigen Platzhalter durch Ihre korrekten Unternehmensdaten.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-foreground">3. Art der verarbeiteten Daten</h2>
                        <ul>
                            <li>- Bestandsdaten (z.B. Namen, Adressen von Kunden).</li>
                            <li>- Kontaktdaten (z.B. E-Mail, Telefonnummern).</li>
                            <li>- Inhaltsdaten (z.B. Texteingaben, Fotografien, Analysedaten, Unterschriften).</li>
                            <li>- Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten).</li>
                            <li>- Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen).</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-foreground">4. Zweck der Verarbeitung</h2>
                        <p>Zurverfügungstellung der Anwendung, ihrer Funktionen und Inhalte, Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern, Sicherheitsmaßnahmen, Reichweitenmessung/Marketing.</p>
                        <p>Die in der Hufanalyse erfassten Daten, einschließlich Bilder und Unterschriften, werden ausschließlich zur Erfüllung des Vertragszwecks – der Erstellung und Speicherung der Hufanalyse – verarbeitet und dem jeweiligen Kunden zugeordnet.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-foreground">5. Rechte der betroffenen Personen</h2>
                        <p>Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der Daten entsprechend Art. 15 DSGVO.</p>
                        <p>Sie haben gemäß Art. 16 DSGVO das Recht, die Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.</p>
                        <p>Sie haben nach Maßgabe des Art. 17 DSGVO das Recht zu verlangen, dass betreffende Daten unverzüglich gelöscht werden, bzw. alternativ nach Maßgabe des Art. 18 DSGVO eine Einschränkung der Verarbeitung der Daten zu verlangen.</p>
                    </section>

                     <section>
                        <h2 className="text-2xl font-semibold mb-3 text-foreground">6. Einwilligung zur Datenverarbeitung für Hufanalysen</h2>
                        <p>Vor Abschluss einer Hufanalyse holt der Nutzer (Hufbearbeiter) die explizite Einwilligung seines Kunden zur Verarbeitung der Analysedaten, einschließlich der Speicherung der Unterschrift, gemäß Art. 6 Abs. 1 lit. a DSGVO ein. Diese Einwilligung wird innerhalb der Anwendung dokumentiert.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
