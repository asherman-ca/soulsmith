import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { Providers } from "./providers";
import { Toaster } from "sonner";

import WithSidebar from "@/components/WithSidebar";
import Nav from "@/components/nav/Nav";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "SOULSMITH",
  description: "The best build planner for Soulstone Survivors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="overflow-auto bg-background text-foreground-500 dark scrollbar-hide">
        <Providers>
          <Toaster />
          <Nav />
          <WithSidebar>
            {children}
            <Analytics />
          </WithSidebar>
        </Providers>
      </body>
    </html>
  );
}
