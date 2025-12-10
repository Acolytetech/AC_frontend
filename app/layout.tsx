import Script from "next/script";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <script src="https://accounts.google.com/gsi/client" async defer></script>

      <body className="flex flex-col min-h-screen">
        <Script src="https://www.noupe.com/embed/019af80f65cf70f1a463e671645e0f211b05.js" strategy="afterInteractive" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
