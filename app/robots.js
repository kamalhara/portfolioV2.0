const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://kamalveer-portfolio.aurora-lamp-4868.chatgpt.site";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
