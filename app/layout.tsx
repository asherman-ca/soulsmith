import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Providers } from "./providers";
import WithSidebar from "@/components/WithSidebar";
import Nav from "@/components/nav/Nav";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground dark">
        <Providers>
          <WithSidebar>
            <Nav />
            {children}
          </WithSidebar>
        </Providers>
      </body>
    </html>
  );
}
