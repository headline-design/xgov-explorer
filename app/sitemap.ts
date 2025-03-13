import { MetadataRoute } from "next";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://xgov.app";

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

  // Combine all routes
  return [...staticRoutes];
}
