import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import prisma  from "@/lib/prisma"

// DELETE /api/teams/[id]/members/[memberId] - Remove a team member
export async function DELETE(request, { params }) {
  const session = await getSession()

  // Authentication check
  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id, memberId } = params

  try {
    // Check if the current user is an admin of the team
    const userMembership = await prisma.teamMember.findFirst({
      where: {
        userId: session.user.id,
        teamId: id,
        role: "admin",
      },
    })

    if (!userMembership) {
      return NextResponse.json({ error: "You are not an admin of this team" }, { status: 403 })
    }

    // Get the member to be removed
    const memberToRemove = await prisma.teamMember.findUnique({
      where: { id: memberId },
    })

    if (!memberToRemove) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 })
    }

    // Prevent removing yourself
    if (memberToRemove.userId === session.user.id) {
      return NextResponse.json({ error: "You cannot remove yourself from the team" }, { status: 400 })
    }

    // Remove the team member
    await prisma.teamMember.delete({
      where: { id: memberId },
    })

    return NextResponse.json({
      message: "Team member removed successfully",
    })
  } catch (error) {
    console.error("Error removing team member:", error)
    return NextResponse.json({ error: "Failed to remove team member" }, { status: 500 })
  }
}

