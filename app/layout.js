import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "חתונה בתכלס",
  description: "במקום לגלות את המספר רק אחרי שסוגרים ספקים — בונים רגע תמונה אמיתית של האירוע.",
  metadataBase: new URL("https://wedding.erez-sites.app"),
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CGQCRTQMJG"
          strategy="afterInteractive"
        />
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
