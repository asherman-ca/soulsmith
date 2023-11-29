import "./globals.css";
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
      <body className="bg-background text-foreground dark">
        <Providers>
          <Toaster />
          <Nav />
          <WithSidebar>{children}</WithSidebar>
        </Providers>
      </body>
    </html>
  );
}
