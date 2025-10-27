
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Calendar, ClipboardCheck, MessageSquareQuote, Settings, Handshake, BarChart2, Star, Box, Package, Layers, Repeat, Receipt, Clock, Bell, MessageSquareHeart, User, Cog, Globe } from "lucide-react";
import { HorseshoeIcon } from "@/components/logo";
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import React from "react";

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/analyse", label: "HufAnalyse Pro", icon: ClipboardCheck },
  { href: "/kalender", label: "Kalender", icon: Calendar },
  { href: "/kunden", label: "Kunden", icon: Users },
  { href: "/pferde", label: "Pferde", icon: HorseshoeIcon },
  { href: "/partner", label: "Partner", icon: Handshake },
  { href: "/umsaetze", label: "Umsätze", icon: BarChart2 },
  { href: "/feedback", label: "Feedback", icon: MessageSquareHeart },
  { href: "/anfragen", label: "Anfragen", icon: MessageSquareQuote },
];

const settingsSubMenus = {
  leistungen: [
    { href: "/einstellungen/leistungen", label: "Leistungen", icon: Box },
    { href: "/einstellungen/produkte", label: "Produkte", icon: Package },
    { href: "/einstellungen/bundles", label: "Bundles", icon: Layers },
    { href: "/einstellungen/abos", label: "Abos", icon: Repeat },
    { href: "/einstellungen/angebote", label: "Angebote (Öffentlich)", icon: Star },
    { href: "/einstellungen/preise", label: "Preise & Reisekosten", icon: Receipt },
  ],
  automatisierung: [
    { href: "/einstellungen/oeffnungszeiten", label: "Öffnungszeiten", icon: Clock },
    { href: "/einstellungen/erinnerungen", label: "Erinnerungen & Storno", icon: Bell },
    { href: "/einstellungen/feedback", label: "Feedback", icon: MessageSquareHeart },
  ],
  profil: [
      { href: "/meine-seite", label: "Landing Page", icon: Globe },
      { href: "/account", label: "Mein Konto", icon: User },
      { href: "/einstellungen/system", label: "System", icon: Cog },
  ]
};

export function SidebarNav() {
  const pathname = usePathname();
  const isSettingsActive = pathname.startsWith('/einstellungen') || pathname.startsWith('/meine-seite') || pathname.startsWith('/account');

  return (
    <SidebarMenu>
      {mainNavItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon className="size-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      
      <SidebarMenuItem>
        <Collapsible open={isSettingsActive} onOpenChange={ (isOpen) => {
            if (isOpen && !isSettingsActive) {
                // Logic to handle opening, e.g. navigating or just expanding
            }
        }}>
          <CollapsibleTrigger asChild>
              <SidebarMenuButton
                variant="default"
                className="w-full"
                isActive={isSettingsActive}
              >
                <Settings className="size-4 shrink-0" />
                <span>Einstellungen</span>
              </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarGroupLabel>Leistungen & Produkte</SidebarGroupLabel>
            <SidebarMenuSub>
                {settingsSubMenus.leistungen.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuSubButton asChild isActive={pathname.startsWith(item.href)}>
                            <Link href={item.href}><item.icon className="h-4 w-4" /> {item.label}</Link>
                        </SidebarMenuSubButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenuSub>
            <SidebarGroupLabel>Automatisierung</SidebarGroupLabel>
            <SidebarMenuSub>
                {settingsSubMenus.automatisierung.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuSubButton asChild isActive={pathname.startsWith(item.href)}>
                            <Link href={item.href}><item.icon className="h-4 w-4" /> {item.label}</Link>
                        </SidebarMenuSubButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenuSub>
             <SidebarGroupLabel>Mein Profil</SidebarGroupLabel>
             <SidebarMenuSub>
                {settingsSubMenus.profil.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuSubButton asChild isActive={pathname.startsWith(item.href)}>
                            <Link href={item.href}><item.icon className="h-4 w-4" /> {item.label}</Link>
                        </SidebarMenuSubButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
