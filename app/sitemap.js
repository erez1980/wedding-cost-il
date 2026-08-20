export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: "https://wedding.erez-sites.app/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
