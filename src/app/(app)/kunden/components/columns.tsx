"use client"

import { Button } from "@/components/ui/button"
import type { Kunde } from "@/lib/types"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const columns = [
  {
    header: "KID",
    accessorKey: "kid",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Telefon",
    accessorKey: "phone",
  },
  {
    header: "Aktionen",
    accessorKey: "id",
    cell: (row: Kunde) => (
        <Button asChild variant="ghost" size="icon">
            <Link href={`/kunden/${row.id}`}><ArrowRight className="h-4 w-4" /></Link>
        </Button>
    )
  },
]
