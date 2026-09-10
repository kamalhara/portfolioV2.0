import { projects } from "./data/project";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://kamalveer-portfolio.aurora-lamp-4868.chatgpt.site";

export const dynamic = "force-static";

export default function sitemap() {
  const projectPages = projects.map((project) => ({
    url: `${siteUrl}/project/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/project`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectPages,
  ];
}
