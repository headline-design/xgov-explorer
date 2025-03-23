import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allBlogs } from "contentlayer/generated";

import { BlogLayout } from "@/components/layouts/blog-layout";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getPostFromParams(params) {
  const slug = await params.slug;
  const post = allBlogs.find((post) => post.slugAsParams === slug);

  if (!post) {
    return null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  // For metadata/SEO purposes, we'll use the light theme version of the OG image
  // or fall back to the static image if useOgImage is false
  const ogImage = post.useOgImage
    ? `/api/og?title=${encodeURIComponent(
        post.title
      )}&summary=${encodeURIComponent(post.description || "")}&theme=light`
    : post.image || "/placeholder-light.svg";

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams(): Promise<
  BlogPostPageProps["params"][]
> {
  return allBlogs
    .filter((post) => post.published !== false)
    .map((post) => ({
      slug: post.slugAsParams,
    }));
}

export default async function BlogPostPage({ params }) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  // Find related posts (posts with matching tags, excluding current post)
  const relatedPosts = post.tags
    ? allBlogs
        .filter(
          (p) =>
            p.slug !== post.slug &&
            p.published !== false &&
            p.tags?.some((tag) => post.tags?.includes(tag))
        )
        .slice(0, 3)
    : [];

  return <BlogLayout post={post} related={relatedPosts} />;
}
