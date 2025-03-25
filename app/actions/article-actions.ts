"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

import type { VoteType } from "@prisma/client";
import { getSession } from "@/lib/auth";

// Get article by slug
export async function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({
    where: { slug },
    include: {
      votes: true,
      comments: {
        where: { parentId: null },
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
            },
          },
        },
      },
      _count: {
        select: {
          votes: true,
          comments: true,
          bookmarks: true,
        },
      },
    },
  });
}

// Vote on an article
export async function voteOnArticle(articleId: string, voteType: VoteType) {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to vote");
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

  if (existingVote) {
    // If vote type is the same, remove the vote
    if (existingVote.voteType === voteType) {
      await prisma.articleVote.delete({
        where: {
          id: existingVote.id,
        },
      });
    } else {
      // If vote type is different, update the vote
      await prisma.articleVote.update({
        where: {
          id: existingVote.id,
        },
        data: {
          voteType,
        },
      });
    }
  } else {
    // Create a new vote
    await prisma.articleVote.create({
      data: {
        voteType,
        userId,
        articleId,
      },
    });
  }

  revalidatePath(`/blog/[slug]`);
  return { success: true };
}

// Add a comment to an article
export async function addComment(
  articleId: string,
  content: string,
  parentId?: string
) {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to comment");
  }

  const userId = session.user.id;

  const comment = await prisma.articleComment.create({
    data: {
      content,
      userId,
      articleId,
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
    },
  });

  revalidatePath(`/blog/[slug]`);
  return comment;
}

// Bookmark an article
export async function toggleBookmark(articleId: string) {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to bookmark");
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

  if (existingBookmark) {
    // Remove bookmark
    await prisma.bookmark.delete({
      where: {
        id: existingBookmark.id,
      },
    });
  } else {
    // Add bookmark
    await prisma.bookmark.create({
      data: {
        userId,
        articleId,
      },
    });
  }

  revalidatePath(`/blog/[slug]`);
  return { success: true };
}

// Increment view count
export async function incrementViewCount(articleId: string) {
  await prisma.article.update({
    where: { id: articleId },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  });
}

// Get user's vote on an article
export async function getUserVote(articleId: string) {
  const session = await getSession();
  if (!session?.user?.id) {
    return null;
  }

  const userId = session.user.id;

  const vote = await prisma.articleVote.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });

  return vote;
}

// Check if user has bookmarked an article
export async function getUserBookmark(articleId: string) {
  const session = await getSession();
  if (!session?.user?.id) {
    return false;
  }

  const userId = session.user.id;

  const bookmark = await prisma.bookmark.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });

  return !!bookmark;
}

/**
 * Batch synchronizes multiple articles
 */
export async function batchSyncArticles(articles) {
  try {
    const results = await Promise.all(
      articles.map((article) => syncArticle(article))
    );

    return results.filter(Boolean).length;
  } catch (error) {
    console.error("Error batch syncing articles:", error);
    return 0;
  }
}


/**
 * Sync a Contentlayer article with the database
 */
export async function syncArticle(article: {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: Date;
  coverImage?: string;
  tags?: string[];
  proposalId?: string;
  featured?: boolean;
  author: string;
}): Promise<string> {
  try {
    console.log("Syncing article: at 271", article.slug, article.author);
    // Get default author ID if not provided

    const author = article.author;

    // Generate table of contents from content
    const tableOfContents = generateTableOfContents(article.content);

    // Calculate reading time (approx. 200 words per minute)
    const wordCount = article.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Check if article already exists
    const existingArticle = await prisma.article.findUnique({
      where: { slug: article.slug },
    });

    if (existingArticle) {
      return existingArticle.id; // Return existing article ID if it already exists
    }

    // Create new article
    const newArticle = await prisma.article.create({
      data: {
        slug: article.slug,
        title: article.title,
        description: article.description,
        content: article.content,
        coverImage: article.coverImage,
        publishedAt: article.publishedAt,
        tags: article.tags || [],
        featured: article.featured || false,
        readingTime,
        tableOfContents,
        author,
      },
    });

    return newArticle.id;
  } catch (error) {
    console.error("Error syncing article with database:", error);
    throw error;
  }
}

/**
 * Generate table of contents from markdown content
 */
function generateTableOfContents(content: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ id, text, level });
  }

  return headings;
}
