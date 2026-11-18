import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

const routes = ["", "/about", "/projects", "/skills", "/experience", "/resume", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((route) => ({ url: `${siteUrl}${route}` })),
    ...projects.map((project) => ({ url: `${siteUrl}/projects/${project.slug}` })),
  ];
}
