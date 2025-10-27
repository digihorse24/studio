"use client"

import { Button } from "@/components/ui/button"
import type { Kunde } from "@/lib/types"
import { ArrowRight, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export const columns = [
  {
    header: "Kunde",
    accessorKey: "name",
    cell: (row: Kunde) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.name}</span>
        <span className="text-sm text-muted-foreground">{row.kid}</span>
      </div>
    )
  },
  {
    header: "Kontakt",
    accessorKey: "email",
     cell: (row: Kunde) => (
      <div className="flex flex-col">
        <span className="flex items-center gap-2"><Mail className="h-3 w-3"/> {row.email}</span>
        <span className="flex items-center gap-2"><MapPin className="h-3 w-3"/> {row.address.split(',')[1]?.trim()}</span>
      </div>
    )
  },
  {
    header: "Pferde",
    accessorKey: "pferde_ids",
    cell: (row: Kunde) => (
      <span>{row.pferde_ids.length}</span>
    )

  },
  {
    header: "Aktion",
    accessorKey: "id",
    cell: (row: { id: string }) => (
        <Button asChild variant="outline" size="sm">
            <Link href={`/kunden/${row.id}`}>Details anzeigen <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
    )
  },
]
