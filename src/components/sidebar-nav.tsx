"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Calendar, ClipboardCheck, Sparkles, Star, MessageSquareQuote } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/kunden", label: "Kunden", icon: Users },
  { href: "/kalender", label: "Kalender", icon: Calendar },
  { href: "/analyse", label: "Analyse", icon: ClipboardCheck },
  { href: "/meine-seite", label: "Meine Seite", icon: Star },
  { href: "/anfragen", label: "Anfragen", icon: MessageSquareQuote },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
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
    </SidebarMenu>
  );
}
