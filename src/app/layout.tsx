import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bilikisyahaya.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bilikis Onono Yahaya · Business Intelligence",
    template: "%s · Bilikis Onono Yahaya",
  },
  description:
    "Articles, projects and notes from Bilikis Onono Yahaya as she learns Excel, SQL and Power BI on the way to becoming a Business Intelligence Analyst.",
  openGraph: { type: "website", siteName: "Bilikis Onono Yahaya", locale: "en_GB" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
