import type { MetadataRoute } from "next";
import { NEWSLETTERS } from "@/lib/newsletters";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/docs",
    "/newsletter",
    "/contact",
    "/privacy",
    "/terms",
    "/signin",
  ].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/docs" ? 0.9 : 0.7,
  }));

  const posts: MetadataRoute.Sitemap = NEWSLETTERS.map((n) => ({
    url: `${SITE_URL}/newsletter/${n.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...posts];
}
