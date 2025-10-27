'use client';

import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { getAuth, signOut } from 'firebase/auth';

export default function AccountPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
  };

  if (isUserLoading) {
    return <div>Lade Benutzerdaten...</div>;
  }

  if (!user) {
    return <div>Bitte melden Sie sich an, um Ihre Kontoinformationen anzuzeigen.</div>;
  }

  return (
    <>
      <PageHeader title="Mein Konto" />
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{user.displayName || 'Benutzer'}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleLogout} variant="destructive">
                Abmelden
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
