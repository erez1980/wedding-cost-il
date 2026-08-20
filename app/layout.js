import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: {
    default: "מחשבון עלות חתונה בישראל | חתונה בתכלס",
    template: "%s | חתונה בתכלס",
  },
  description:
    "מחשבון עלות חתונה בישראל: חשבו אולם, מנות, ספקים, הפקה ורשת ביטחון שקופה — ותדעו מהו התקציב המשוער לאירוע שלכם.",
  metadataBase: new URL("https://wedding.erez-sites.app"),
  alternates: { canonical: "/" },
  keywords: ["מחשבון חתונה", "עלות חתונה", "תקציב חתונה", "עלות חתונה בישראל"],
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "/",
    siteName: "חתונה בתכלס",
    title: "מחשבון עלות חתונה בישראל | חתונה בתכלס",
    description: "בנו תקציב חתונה ברור עם פירוט מלא ורשת ביטחון שקופה.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "חתונה בתכלס — מחשבון עלות חתונה בישראל",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "מחשבון עלות חתונה בישראל | חתונה בתכלס",
    description: "בנו תקציב חתונה ברור עם פירוט מלא ורשת ביטחון שקופה.",
    images: ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "חתונה בתכלס",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  inLanguage: "he-IL",
  description: "מחשבון עלות חתונה בישראל עם פירוט סעיפים ורשת ביטחון שקופה.",
  url: "https://wedding.erez-sites.app/",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ILS" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-CGQCRTQMJG" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CGQCRTQMJG');`}
        </Script>
      </body>
    </html>
  );
}
