'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import { QrCheckinModal } from './qr-checkin-modal';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
        <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" onClick={() => setIsQrModalOpen(true)}>
            <QrCode className="mr-2 h-4 w-4" />
            QR-Code Check-in
          </Button>
          {children}
        </div>
      </header>
      <QrCheckinModal open={isQrModalOpen} onOpenChange={setIsQrModalOpen} />
    </>
  );
}
