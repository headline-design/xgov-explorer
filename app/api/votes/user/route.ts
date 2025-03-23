import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const entityId = searchParams.get("entityId")
    const entityType = searchParams.get("entityType")

    if (!entityId || !entityType) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Determine which entity we're checking
    const entityData =
      entityType === "proposal" ? { proposalId: entityId, commentId: null } : { proposalId: null, commentId: entityId }

    // Find user's vote
    const vote = await prisma.vote.findFirst({
      where: {
        userId: session.user.id,
        ...entityData,
      },
    })

    return NextResponse.json({ vote })
  } catch (error) {
    console.error("Error fetching user vote:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

