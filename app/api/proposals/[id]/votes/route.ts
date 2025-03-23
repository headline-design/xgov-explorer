import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const proposalId = params.id

    if (!proposalId) {
      return NextResponse.json({ error: "Missing proposal ID" }, { status: 400 })
    }

    // Fetch vote counts from database
    const voteData = await prisma.vote
      .groupBy({
        by: ["voteType"],
        where: {
          proposalId,
        },
        _count: {
          id: true,
        },
      })
      .catch(() => [])

    // Calculate upvotes and downvotes
    const upvotes = voteData.find((v) => v.voteType === "UPVOTE")?._count?.id || 0
    const downvotes = voteData.find((v) => v.voteType === "DOWNVOTE")?._count?.id || 0

    return NextResponse.json({ upvotes, downvotes })
  } catch (error) {
    console.error("Error fetching vote counts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

