import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import Logo from '@/components/logo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="text-center max-w-2xl mx-auto">
        <Logo className="text-5xl justify-center" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mt-6">
          Ihre digitale Komplettlösung für die Hufbearbeitung
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Verwalten Sie Kunden, Pferde und Termine an einem Ort. Erstellen Sie professionelle Hufanalysen und optimieren Sie Ihren Arbeitsalltag mit intelligenten KI-Funktionen.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/dashboard">
              Zum Dashboard
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="link" size="lg">
            <Link href="#">Mehr erfahren <span aria-hidden="true">→</span></Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
