import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { VoteType } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { entityId, entityType, voteType } = await request.json();

    if (
      !entityId ||
      !entityType ||
      (voteType !== "UPVOTE" && voteType !== "DOWNVOTE" && voteType !== null)
    ) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Determine which entity we're voting on
    const entityData =
      entityType === "proposal"
        ? { proposalId: entityId, commentId: null }
        : { proposalId: null, commentId: entityId };

    // Check if user has already voted on this entity
    const existingVote = await prisma.vote.findFirst({
      where: {
        userId: session.user.id,
        ...entityData,
      },
    });

    // If voteType is null, delete the vote
    if (voteType === null) {
      if (existingVote) {
        await prisma.vote.delete({
          where: { id: existingVote.id },
        });
      }
    } else if (existingVote) {
      // If user has already voted, update the vote
      await prisma.vote.update({
        where: { id: existingVote.id },
        data: { voteType: voteType as VoteType },
      });
    } else {
      // Otherwise, create a new vote
      await prisma.vote.create({
        data: {
          voteType: voteType as VoteType,
          userId: session.user.id,
          ...entityData,
        },
      });
    }

    // Get updated vote counts
    const voteData = await prisma.vote.groupBy({
      by: ["voteType"],
      where: {
        ...entityData,
      },
      _count: {
        id: true,
      },
    });

    // Calculate upvotes and downvotes
    const upvotes =
      voteData.find((v) => v.voteType === "UPVOTE")?._count?.id || 0;
    const downvotes =
      voteData.find((v) => v.voteType === "DOWNVOTE")?._count?.id || 0;

    // Get user's current vote
    const userVote = voteType;

    return NextResponse.json({
      success: true,
      voteCount: { upvotes, downvotes },
      userVote,
    });
  } catch (error) {
    console.error("Error processing vote:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
