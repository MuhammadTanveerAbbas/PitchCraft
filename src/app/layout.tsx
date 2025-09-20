import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "PitchCraft - AI Startup Pitch Generator",
  description:
    "Generate a complete, one-page startup pitch for your SaaS or MVP idea. Get key features, target audience, monetization strategies, and more, powered by AI.",
  keywords: [
    "startup pitch generator",
    "saas idea generator",
    "mvp planner",
    "ai business plan",
    "elevator pitch",
    "pitch deck",
  ],
  icons: {
    icon: "/fevicon.png",
  },
  openGraph: {
    title: "PitchCraft - AI Startup Pitch Generator",
    description:
      "Turn your idea into a compelling, one-page startup pitch in seconds.",
    siteName: "PitchCraft",
    images: [
      {
        url: "/og-image.png", // It's a good practice to have an OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PitchCraft - AI Startup Pitch Generator",
    description:
      "Generate a complete, one-page startup pitch for your SaaS or MVP idea with AI.",
    // creator: '@yourtwitterhandle', // Add your Twitter handle
    images: ["/twitter-image.png"], // Add a twitter-specific image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
