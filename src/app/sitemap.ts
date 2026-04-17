import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://47.116.21.116";

const routes = [
  "",
  "/officialWebsite",
  "/officialWebsite/02-right",
  "/officialWebsite/03-one",
  "/officialWebsite/04-two",
  "/officialWebsite/05-three",
  "/officialWebsite/07-five",
  "/officialWebsite/08-six",
  "/officialWebsite/09-seven",
  "/officialWebsite/details",
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
