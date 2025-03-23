import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!proposalId) {
      return NextResponse.json(
        { error: "Missing proposal ID" },
        { status: 400 }
      );
    }

    // Fetch comments for the proposal
    const comments = await prisma.comment.findMany({
      where: {
        proposalId,
        parentId: null, // Only get top-level comments
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            votes: true,
            _count: {
              select: {
                votes: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        votes: true,
        _count: {
          select: {
            votes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Process comments to include vote counts and user votes
    const processedComments = await Promise.all(
      comments.map(async (comment) => {
        // Get upvotes and downvotes for this comment
        const voteData = await prisma.vote.groupBy({
          by: ["voteType"],
          where: {
            commentId: comment.id,
          },
          _count: {
            id: true,
          },
        });

        const upvotes =
          voteData.find((v) => v.voteType === "UPVOTE")?._count?.id || 0;
        const downvotes =
          voteData.find((v) => v.voteType === "DOWNVOTE")?._count?.id || 0;

        // Get user's vote if logged in
        let userVote: "UPVOTE" | "DOWNVOTE" | null = null;
        if (userId) {
          const vote = await prisma.vote.findFirst({
            where: {
              commentId: comment.id,
              userId,
            },
          });
          userVote = vote?.voteType || null;
        }

        // Process replies
        const processedReplies = await Promise.all(
          comment.replies.map(async (reply) => {
            // Get upvotes and downvotes for this reply
            const replyVoteData = await prisma.vote.groupBy({
              by: ["voteType"],
              where: {
                commentId: reply.id,
              },
              _count: {
                id: true,
              },
            });

            const replyUpvotes =
              replyVoteData.find((v) => v.voteType === "UPVOTE")?._count?.id ||
              0;
            const replyDownvotes =
              replyVoteData.find((v) => v.voteType === "DOWNVOTE")?._count
                ?.id || 0;

            // Get user's vote on reply if logged in
            let replyUserVote: "UPVOTE" | "DOWNVOTE" | null = null;
            if (userId) {
              const vote = await prisma.vote.findFirst({
                where: {
                  commentId: reply.id,
                  userId,
                },
              });
              replyUserVote = vote?.voteType || null;
            }

            return {
              ...reply,
              upvotes,
              downvotes,
              userVote: replyUserVote,
            };
          })
        );

        return {
          ...comment,
          upvotes,
          downvotes,
          userVote,
          replies: processedReplies,
        };
      })
    );

    return NextResponse.json(processedComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;
    const session = await getServerSession(authOptions);

    if (!session?.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!proposalId) {
      return NextResponse.json(
        { error: "Missing proposal ID" },
        { status: 400 }
      );
    }

    const { content, parentId } = await request.json();

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 }
      );
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content,
        userId: session.user.id,
        proposalId,
        parentId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            votes: true,
          },
        },
      },
    });

    // Add empty replies array for consistency
    const commentWithReplies = {
      ...comment,
      replies: [],
      upvotes: 0,
      downvotes: 0,
      userVote: null,
    };

    return NextResponse.json(commentWithReplies);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
