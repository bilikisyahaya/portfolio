import type { MetadataRoute } from "next";
import { getArticles, getProjects } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bilikisyahaya.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, projects] = await Promise.all([getArticles(), getProjects()]);
  return [
    ...["", "/articles", "/projects", "/about"].map((p) => ({ url: `${base}${p}` })),
    ...articles.map((a) => ({ url: `${base}/articles/${a.slug}`, lastModified: a.entry.publishedDate ?? undefined })),
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: p.entry.publishedDate ?? undefined })),
  ];
}
