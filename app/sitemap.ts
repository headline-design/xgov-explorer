import type { MetadataRoute } from "next";
import { proposals } from "@/data/xgov-sessions";
import { allDocs, allLegals, allBlogs } from "contentlayer/generated";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://xgov.app";

  // Helper function to get the most recent date
  const getMostRecentDate = (date: string) => {
    const contentDate = new Date(date);
    const currentDate = new Date();
    return contentDate > currentDate ? currentDate.toISOString() : date;
  };

  // Generate URLs for proposals
  const proposalUrls = proposals.map((proposal) => ({
    url: `${baseUrl}/proposal/${proposal.number}`,
    lastModified: getMostRecentDate(proposal.awardDate),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Define your static routes with enhanced SEO attributes
  const staticRoutes = [
    { route: "", priority: 1.0, changeFrequency: "daily" as const },
    { route: "/teams", priority: 0.9, changeFrequency: "daily" as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency,
    priority,
  }));

  // Generate documentation routes from ContentLayer
  const docRoutes = allDocs
    .filter((doc) => doc.published !== false)
    .map((doc) => ({
      url: `${baseUrl}${doc.slug}`,
      lastModified: new Date().toISOString().split("T")[0], // Docs don't have a date field
      changeFrequency: "weekly" as const,
      priority: doc.featured ? 0.9 : 0.8,
    }));

  // Generate legal routes from ContentLayer
  const legalRoutes = allLegals
    .filter((legal) => legal.published !== false)
    .map((legal) => ({
      url: `${baseUrl}${legal.slug}`,
      lastModified: legal.lastUpdated
        ? new Date(legal.lastUpdated).toISOString()
        : new Date().toISOString().split("T")[0],
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  // Generate blog routes from ContentLayer
  const blogRoutes = allBlogs
    .filter((blog) => blog.published !== false)
    .map((blog) => ({
      url: `${baseUrl}${blog.slug}`,
      lastModified: blog.date
        ? new Date(blog.date).toISOString()
        : new Date().toISOString().split("T")[0],
      changeFrequency: "weekly" as const,
      priority: blog.featured ? 0.9 : 0.8,
    }));

  // Add blog index page
  const blogIndexRoute = {
    url: `${baseUrl}/blog`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "daily" as const,
    priority: 0.9,
  };

  // Combine all routes
  return [
    ...staticRoutes,
    ...docRoutes,
    ...legalRoutes,
    blogIndexRoute,
    ...blogRoutes,
    ...proposalUrls,
  ];
}
