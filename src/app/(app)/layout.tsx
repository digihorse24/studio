import React from "react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset } from "@/components/ui/sidebar";
import Logo from "@/components/logo";
import { SidebarNav } from "@/components/sidebar-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FirebaseClientProvider } from "@/firebase";
import { UserNav } from "@/components/user-nav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter>
            <UserNav />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </FirebaseClientProvider>
  );
}
