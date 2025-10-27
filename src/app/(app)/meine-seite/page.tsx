'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Save, Image as ImageIcon, Briefcase } from 'lucide-react';

export default function MeineSeitePage() {
  return (
    <>
      <PageHeader title="Meine Seite bearbeiten">
        <Button variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          Live-Vorschau
        </Button>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Speichern
        </Button>
      </PageHeader>
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basis-Informationen</CardTitle>
                <CardDescription>
                  Passen Sie hier die grundlegenden Inhalte Ihrer persönlichen Landingpage an.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="headline">Überschrift</Label>
                  <Input id="headline" placeholder="Zertifizierter Hufbearbeiter Max Mustermann" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-text">Über mich Text</Label>
                  <Textarea id="about-text" placeholder="Beschreiben Sie sich und Ihre Dienstleistungen..." rows={6} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ImageIcon className="h-5 w-5" /> Bilder & Logo</CardTitle>
                <CardDescription>Laden Sie Ihr Logo und Bilder für Ihre Galerie hoch.</CardDescription>
              </CardHeader>
              <CardContent>
                 <p className="text-center text-muted-foreground py-8">Platzhalter für Bildupload (wird in Kürze implementiert).</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5" /> Angebote & Leistungen</CardTitle>
                <CardDescription>Verwalten Sie hier Ihre angebotenen Leistungen.</CardDescription>
              </CardHeader>
              <CardContent>
                 <p className="text-center text-muted-foreground py-8">Platzhalter für Angebots-Editor (wird in Kürze implementiert).</p>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
                <CardDescription>Zeigen Sie potenziellen Kunden, ob Sie verfügbar sind.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="customer-status">Neukunden-Status</Label>
                   <Select>
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
                    <CardTitle>Öffentliche URL</CardTitle>
                    <CardDescription>Ihre Seite ist unter diesem Link erreichbar.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-2 bg-muted rounded-md text-sm text-muted-foreground overflow-x-auto">
                        /profi/max-mustermann
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}