
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import Logo from '@/components/logo';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AppPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Laden...</p>
      </div>
    );
  }

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
            <Link href="/login">
              Jetzt Anmelden
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
           <Button asChild size="lg" variant="outline">
            <Link href="/signup">
              Registrieren
            </Link>
          </Button>
        </div>
      </div>
      <footer className="absolute bottom-8 text-center text-sm text-muted-foreground">
        <Link href="/datenschutz" className="hover:text-foreground transition-colors">
          Datenschutzerklärung
        </Link>
      </footer>
    </main>
  );
}
