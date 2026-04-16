import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://47.116.21.116";

const routes = [
  "",
  "/02-right",
  "/03-one",
  "/04-two",
  "/05-three",
  "/07-five",
  "/08-six",
  "/09-seven",
  "/details",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
