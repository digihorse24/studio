
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, UploadCloud, Trash2, Globe } from 'lucide-react';
import Logo from '@/components/logo';

type CustomerStatus = "accepting" | "limited" | "closed";

const statusMapping: { [key in CustomerStatus]: { text: string; color: string; } } = {
  accepting: { text: "Neukunden verfügbar", color: "bg-green-500" },
  limited: { text: "Begrenzt verfügbar", color: "bg-orange-500" },
  closed: { text: "Ausgebucht", color: "bg-red-500" },
};

export default function MeineSeitePage() {
  const [headline, setHeadline] = useState("Professionelle Hufpflege für gesunde Pferdehufe");
  const [subheadline, setSubheadline] = useState("Fachgerechte Barhufbearbeitung im Raum Karlsruhe.");
  const [aboutText, setAboutText] = useState("Mit jahrelanger Erfahrung und einer Leidenschaft für das Wohl der Pferde biete ich eine umfassende Hufpflege. Mein Ziel ist es, durch präzise und schonende Bearbeitung die Hufgesundheit zu fördern und die natürliche Funktion des Hufmechanismus zu unterstützen.\n\nMeine Leistungen umfassen:\n- Barhufpflege\n- Umstellung auf Barhuf\n- Beratung zur Hufgesundheit");
  const [status, setStatus] = useState<CustomerStatus>("accepting");
  const [logo, setLogo] = useState<File | null>(null);
  const [contactTitle, setContactTitle] = useState("Nehmen Sie Kontakt auf");
  const [buttonText, setButtonText] = useState("Anfrage senden");
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // In a real app, this would save to a database.
    setTimeout(() => {
        setIsSaving(false);
    }, 1500);
  }

  return (
    <>
      <PageHeader title="Landingpage Editor">
        <Button onClick={handleSave}>
          {isSaving ? "Gespeichert!" : <><Save className="mr-2 h-4 w-4" /> Veröffentlichen</>}
        </Button>
      </PageHeader>
      <main className="flex-1 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Editor Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Allgemeine Einstellungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Logo</Label>
                 <div className="flex items-center gap-4">
                    <div className="w-full flex items-center justify-center border-2 border-dashed rounded-lg p-6">
                        <div className="text-center">
                            <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">Logo hierher ziehen oder klicken</p>
                        </div>
                    </div>
                     {logo && (
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive"/></Button>
                     )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-status">Neukunden-Status</Label>
                <Select value={status} onValueChange={(value: CustomerStatus) => setStatus(value)}>
                  <SelectTrigger id="customer-status">
                    <SelectValue placeholder="Status auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accepting">Nimmt Neukunden auf</SelectItem>
                    <SelectItem value="limited">Begrenzt verfügbar</SelectItem>
                    <SelectItem value="closed">Nimmt keine Neukunden auf</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Hero-Bereich</CardTitle>
            </CardHeader>
             <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="headline">Überschrift</Label>
                  <Input id="headline" value={headline} onChange={e => setHeadline(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subheadline">Unterüberschrift</Label>
                  <Input id="subheadline" value={subheadline} onChange={e => setSubheadline(e.target.value)} />
                </div>
              </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Inhaltsbereich ("Mein Angebot")</CardTitle>
            </CardHeader>
             <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about-text">Haupttext</Label>
                  <Textarea id="about-text" value={aboutText} onChange={e => setAboutText(e.target.value)} rows={10} />
                </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Kontaktformular</CardTitle>
            </CardHeader>
             <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-title">Formular-Überschrift</Label>
                  <Input id="contact-title" value={contactTitle} onChange={e => setContactTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="button-text">Button-Text</Label>
                  <Input id="button-text" value={buttonText} onChange={e => setButtonText(e.target.value)} />
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview */}
        <div className="sticky top-20">
          <Card className="overflow-hidden">
            <CardHeader className="p-2 border-b bg-muted/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-500"></span>
                    <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                    <span className="h-3 w-3 rounded-full bg-green-500"></span>
                </div>
                <div className="flex-1 bg-background rounded-md px-2 py-1 text-xs text-muted-foreground flex items-center gap-1">
                    <Globe className="h-3 w-3"/>
                    <span>/profi/ihr-name</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-white text-gray-800 scale-[.9] origin-top-left" style={{ height: '700px', overflowY: 'auto' }}>
                {/* Public Landing Page Preview */}
                <header className="p-4 flex justify-between items-center border-b">
                  <Logo className="text-xl" />
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2 text-sm font-medium">
                        <span className={`h-3 w-3 rounded-full ${statusMapping[status].color}`}></span>
                        {statusMapping[status].text}
                     </div>
                     <Button variant="outline" size="sm">Demo ansehen</Button>
                  </div>
                </header>

                <main>
                    <section className="text-center py-12 px-4 bg-gray-50">
                        <h1 className="text-4xl font-bold tracking-tight">{headline}</h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subheadline}</p>
                    </section>

                    <section id="angebot" className="py-12 px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">Mein Angebot</h2>
                        <div className="max-w-2xl mx-auto prose">
                            {aboutText.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                    </section>

                    <section id="kontakt" className="py-12 px-4 bg-gray-50">
                        <div className="max-w-xl mx-auto">
                             <h2 className="text-3xl font-bold text-center mb-8">{contactTitle}</h2>
                             <form className="space-y-4">
                                <Input placeholder="Ihr Name"/>
                                <Input type="email" placeholder="Ihre E-Mail"/>
                                <Textarea placeholder="Ihre Nachricht" rows={5}/>
                                <Button className="w-full" size="lg">{buttonText}</Button>
                             </form>
                        </div>
                    </section>
                </main>
                <footer className="text-center p-4 border-t text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} HufManager. Alle Rechte vorbehalten.</p>
                </footer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
