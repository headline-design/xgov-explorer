import type { MetadataRoute } from "next";
import { proposals } from "@/data/xgov-sessions";

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

  // Define documentation routes
  const docRoutes = [
    { route: "/docs", priority: 0.9, changeFrequency: "weekly" as const },
    {
      route: "/docs/team-management",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      route: "/docs/wallet-integration",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      route: "/docs/progress-updates",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency,
    priority,
  }));

  // Combine all routes
  return [...staticRoutes, ...docRoutes, ...proposalUrls];
}
