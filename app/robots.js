export const dynamic = "force-static";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://wedding.erez-sites.app/sitemap.xml",
  };
}
