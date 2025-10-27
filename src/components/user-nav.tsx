'use client';

import { useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function UserNav() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  if (isUserLoading) {
    return (
        <div className="flex items-center gap-3 p-2">
            <div className="h-9 w-9 bg-muted rounded-full animate-pulse" />
            <div className="space-y-1">
                <div className="h-4 w-20 bg-muted rounded-md animate-pulse" />
                <div className="h-3 w-12 bg-muted rounded-md animate-pulse" />
            </div>
        </div>
    );
  }

  if (!user) {
    return (
        <div className="p-2">
            <Button asChild className="w-full">
                <Link href="/login">Anmelden</Link>
            </Button>
        </div>
    );
  }

  return (
    <Link href="/account">
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent cursor-pointer">
            <Avatar className="h-9 w-9">
            <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`} alt={user.displayName || 'Benutzer'} />
            <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0) || 'B'}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
                <p className="font-semibold truncate">{user.displayName || 'Benutzer'}</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">{user.email}</p>
            </div>
        </div>
    </Link>
  );
}
