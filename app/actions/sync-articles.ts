"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

type ArticleInput = {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt?: Date;
  coverImage?: string;
  tags?: string[];
  proposalId?: string;
  featured?: boolean;
  author?: string;
};

/**
 * Synchronizes a Contentlayer article with the Prisma database
 * Creates the article if it doesn't exist, updates it if it does
 */
export async function syncArticle(article: ArticleInput) {
  try {
    // Get the current user or use a default author
    const session = await getSession();
    const authorId =
      session?.user?.id || process.env.DEFAULT_AUTHOR_ID || "system";

    // Generate table of contents from content (simplified version)
    const headings = article.content.match(/#{1,6}\s+(.+)/g) || [];
    const tableOfContents = headings.map((heading) => {
      const level = heading.match(/^#+/)?.[0].length || 1;
      const text = heading.replace(/^#+\s+/, "");
      const slug = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      return { level, text, slug };
    });

    // Check if article already exists
    const existingArticle = await prisma.article.findUnique({
      where: { slug: article.slug },
    });

    if (existingArticle) {
      // Update existing article
      await prisma.article.update({
        where: { id: existingArticle.id },
        data: {
          title: article.title,
          description: article.description,
          content: article.content,
          publishedAt: article.publishedAt || existingArticle.publishedAt,
          coverImage: article.coverImage,
          tags: article.tags || [],
          tableOfContents: tableOfContents,
          proposalId: article.proposalId,
          featured: article.featured || false,
          // Don't update authorId to preserve original authorship
        },
      });

      return existingArticle.id;
    } else {
      // Create new article
      const newArticle = await prisma.article.create({
        data: {
          slug: article.slug,
          title: article.title,
          description: article.description,
          content: article.content,
          publishedAt: article.publishedAt || new Date(),
          coverImage: article.coverImage,
          tags: article.tags || [],
          tableOfContents: tableOfContents,
          proposalId: article.proposalId,
          featured: article.featured || false,
          authorId,
          viewCount: 0,
        },
      });

      return newArticle.id;
    }
  } catch (error) {
    console.error("Error syncing article:", error);
    return null;
  }
}

/**
 * Increments the view count for an article
 */
export async function incrementViewCount(articleId: string) {
  try {
    await prisma.article.update({
      where: { id: articleId },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return true;
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return false;
  }
}

/**
 * Batch synchronizes multiple articles
 */
export async function batchSyncArticles(articles: ArticleInput[]) {
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
