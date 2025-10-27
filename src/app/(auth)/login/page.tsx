'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '@/components/logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!auth) throw new Error("Auth service not available");
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Anmeldung erfolgreich",
        description: "Sie werden zum Dashboard weitergeleitet.",
      });
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      let description = "Ein unerwarteter Fehler ist aufgetreten.";
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/invalid-email':
            description = "Kein Benutzer mit dieser E-Mail-Adresse gefunden.";
            break;
          case 'auth/wrong-password':
            description = "Falsches Passwort. Bitte versuchen Sie es erneut.";
            break;
           case 'auth/invalid-credential':
            description = "Ungültige Anmeldeinformationen. Bitte überprüfen Sie Ihre E-Mail und Ihr Passwort.";
            break;
          default:
            description = "Fehler bei der Anmeldung. Bitte versuchen Sie es später erneut.";
        }
      }
      toast({
        variant: "destructive",
        title: "Anmeldung fehlgeschlagen",
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Logo />
            </div>
          <CardTitle className="text-2xl">Willkommen zurück!</CardTitle>
          <CardDescription>
            Melden Sie sich an, um auf Ihr Dashboard zuzugreifen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Passwort</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Anmelden...' : 'Anmelden'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Noch kein Konto?{' '}
            <Link href="/signup" className="underline">
              Registrieren
            </Link>
          </div>
        </CardContent>
      </Card>
  );
}
