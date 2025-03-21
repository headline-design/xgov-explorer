"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users } from "lucide-react"

export function TeamDashboardButton() {
  const { data: session } = useSession()

  // If user is not logged in or has no teams, don't show the button
  if (!session?.user?.teams || session.user.teams.count === 0) {
    return null
  }

  const teamId = session.user.teams.firstTeam
  const teamName = session.user.teams.firstTeam

  return (
    <Button variant="outline" size="sm" asChild className="gap-2">
      <Link href={`/team/${teamId}`}>
        <Users className="h-4 w-4" />
        <span className="hidden md:inline">Team Dashboard</span>
        <span className="inline md:hidden">Team</span>
      </Link>
    </Button>
  )
}

