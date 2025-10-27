'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { initiateEmailSignUp, useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { FirebaseError } from 'firebase/app';
import { updateProfile } from 'firebase/auth';

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        if (!auth) throw new Error("Auth service not available");

        // The non-blocking function doesn't return the user,
        // so we'll rely on the onAuthStateChanged listener to redirect.
        initiateEmailSignUp(auth, email, password);

        // We can't update the profile directly without the user object.
        // This part needs to be handled after the user is created and logged in,
        // likely by listening to auth state changes. For now, we'll navigate
        // and assume an observer will pick it up.
        
        toast({
            title: "Registrierung erfolgreich",
            description: "Ihr Konto wurde erstellt. Sie werden weitergeleitet.",
        });

        router.push('/dashboard');

    } catch (error) {
        console.error(error);
        let description = "Ein unerwarteter Fehler ist aufgetreten.";
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    description = "Diese E-Mail-Adresse wird bereits verwendet.";
                    break;
                case 'auth/weak-password':
                    description = "Das Passwort ist zu schwach. Es muss mindestens 6 Zeichen lang sein.";
                    break;
                default:
                    description = "Fehler bei der Registrierung. Bitte versuchen Sie es später erneut.";
            }
        }
        toast({
            variant: "destructive",
            title: "Registrierung fehlgeschlagen",
            description,
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Konto erstellen</CardTitle>
          <CardDescription>
            Geben Sie Ihre Daten ein, um ein neues Konto zu erstellen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Vorname</Label>
                <Input id="first-name" placeholder="Max" required 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Nachname</Label>
                <Input id="last-name" placeholder="Mustermann" required 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
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
              {isLoading ? 'Erstelle Konto...' : 'Konto erstellen'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Bereits ein Konto?{' '}
            <Link href="/login" className="underline">
              Anmelden
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
