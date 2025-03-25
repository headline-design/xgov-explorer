"use server";

import { revalidatePath } from "next/cache";
import prisma  from "@/lib/prisma";
import type { VoteType } from "@prisma/client";
import { getSession } from "@/lib/auth";

type ActionResponse = {
  success: boolean;
  message: string;
  data?: any;
};

/**
 * Vote on an article (like/unlike)
 */
export async function voteOnArticle(
  articleId: string,
  voteType: VoteType = "UPVOTE"
): Promise<ActionResponse> {
  try {
    const session = await getSession();

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to vote on articles",
      };
    }

    const userId = session.user.id;

    // Check if user has already voted
    const existingVote = await prisma.articleVote.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
    });

    // If vote exists and is the same type, remove it (toggle off)
    if (existingVote && existingVote.voteType === voteType) {
      await prisma.articleVote.delete({
        where: {
          userId_articleId: {
            userId,
            articleId,
          },
        },
      });

      revalidatePath(`/blog/[slug]`);
      return {
        success: true,
        message: "Vote removed successfully",
      };
    }

    // If vote exists but is a different type, update it
    if (existingVote) {
      await prisma.articleVote.update({
        where: {
          userId_articleId: {
            userId,
            articleId,
          },
        },
        data: {
          voteType,
        },
      });

      revalidatePath(`/blog/[slug]`);
      return {
        success: true,
        message: "Vote updated successfully",
      };
    }

    // If no vote exists, create a new one
    await prisma.articleVote.create({
      data: {
        voteType,
        userId,
        articleId,
      },
    });

    revalidatePath(`/blog/[slug]`);
    return {
      success: true,
      message: "Vote added successfully",
    };
  } catch (error) {
    console.error("Error voting on article:", error);
    return {
      success: false,
      message: "Failed to vote on article",
    };
  }
}

/**
 * Toggle bookmark status for an article
 */
export async function toggleBookmark(
  articleId: string
): Promise<ActionResponse> {
  try {
    const session = await getSession();

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to bookmark articles",
      };
    }

    const userId = session.user.id;

    // Check if bookmark exists
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
    });

    // If bookmark exists, remove it
    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          userId_articleId: {
            userId,
            articleId,
          },
        },
      });

      revalidatePath(`/blog/[slug]`);
      return {
        success: true,
        message: "Bookmark removed successfully",
      };
    }

    // If no bookmark exists, create a new one
    await prisma.bookmark.create({
      data: {
        userId,
        articleId,
      },
    });

    revalidatePath(`/blog/[slug]`);
    return {
      success: true,
      message: "Bookmark added successfully",
    };
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    return {
      success: false,
      message: "Failed to toggle bookmark",
    };
  }
}

/**
 * Add a comment to an article
 */
export async function addComment(
  articleId: string,
  content: string,
  parentId?: string
): Promise<ActionResponse> {
  try {
    const session = await getSession();

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to comment",
      };
    }

    const userId = session.user.id;

    // Validate content
    if (!content.trim()) {
      return {
        success: false,
        message: "Comment cannot be empty",
      };
    }

    // Create comment
    const comment = await prisma.articleComment.create({
      data: {
        content,
        userId,
        articleId,
        parentId,
      },
    });

    revalidatePath(`/blog/[slug]`);
    return {
      success: true,
      message: "Comment added successfully",
      data: comment,
    };
  } catch (error) {
    console.error("Error adding comment:", error);
    return {
      success: false,
      message: "Failed to add comment",
    };
  }
}

/**
 * Delete a comment
 */
export async function deleteComment(
  commentId: string
): Promise<ActionResponse> {
  try {
    const session = await getSession();

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to delete comments",
      };
    }

    const userId = session.user.id;

    // Get the comment
    const comment = await prisma.articleComment.findUnique({
      where: { id: commentId },
      include: { article: true },
    });

    if (!comment) {
      return {
        success: false,
        message: "Comment not found",
      };
    }

    // Check if user is the author of the comment
    if (comment.userId !== userId) {
      return {
        success: false,
        message: "You can only delete your own comments",
      };
    }

    // Delete the comment
    await prisma.articleComment.delete({
      where: { id: commentId },
    });

    revalidatePath(`/blog/[slug]`);
    return {
      success: true,
      message: "Comment deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return {
      success: false,
      message: "Failed to delete comment",
    };
  }
}

/**
 * Increment view count for an article
 */
export async function incrementViewCount(
  articleId: string
): Promise<ActionResponse> {
  try {
    // Get the article
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      return {
        success: false,
        message: "Article not found",
      };
    }

    // Increment view count
    await prisma.article.update({
      where: { id: articleId },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return {
      success: true,
      message: "View count incremented successfully",
    };
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return {
      success: false,
      message: "Failed to increment view count",
    };
  }
}
