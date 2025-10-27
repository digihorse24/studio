
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Calendar, ClipboardCheck, MessageSquareQuote, Settings, Handshake, BarChart2, Star, Box, Package, Layers, Repeat, Receipt, Clock, Bell, MessageSquareHeart, User, Cog } from "lucide-react";
import { HorseshoeIcon } from "@/components/logo";

import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import React from "react";

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/kunden", label: "Kunden", icon: Users },
  { href: "/pferde", label: "Pferde", icon: HorseshoeIcon },
  { href: "/partner", label: "Partner", icon: Handshake },
  { href: "/kalender", label: "Kalender", icon: Calendar },
  { href: "/analyse", label: "HufAnalyse Pro", icon: ClipboardCheck },
  { href: "/umsaetze", label: "Umsätze", icon: BarChart2 },
  { href: "/anfragen", label: "Anfragen", icon: MessageSquareQuote },
];

const settingsSubMenus = {
  leistungen: [
    { href: "/einstellungen/leistungen", label: "Leistungen", icon: Box },
    { href: "/einstellungen/produkte", label: "Produkte", icon: Package },
    { href: "/einstellungen/bundles", label: "Bundles", icon: Layers },
    { href: "/einstellungen/abos", label: "Abos", icon: Repeat },
  ],
  profil: [
      { href: "/meine-seite", label: "Landing Page", icon: Star },
      { href: "/account", label: "Profil", icon: User },
      { href: "/einstellungen/system", label: "System", icon: Cog },
  ]
};

export function SidebarNav() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(pathname.startsWith('/einstellungen') || pathname.startsWith('/meine-seite') || pathname.startsWith('/account'));

  return (
    <SidebarMenu>
      {mainNavItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href)}
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
        <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <CollapsibleTrigger asChild>
              <SidebarMenuButton
                variant="default"
                className="w-full"
                isActive={isSettingsOpen}
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
                            <Link href={item.href}><item.icon /> {item.label}</Link>
                        </SidebarMenuSubButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenuSub>
             <SidebarGroupLabel>Mein Profil</SidebarGroupLabel>
             <SidebarMenuSub>
                {settingsSubMenus.profil.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuSubButton asChild isActive={pathname.startsWith(item.href)}>
                            <Link href={item.href}><item.icon /> {item.label}</Link>
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
