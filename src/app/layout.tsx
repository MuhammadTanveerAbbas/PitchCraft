import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import LoadingOverlay from "@/components/loading-overlay";
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
  metadataBase: new URL("http://localhost:9002"),
  title: "PitchCraft",
  description:
    "A case study of PitchCraft: AI-powered SaaS that transforms startup ideas into compelling pitches in seconds. Built in 2 weeks with Next.js and Google AI.",
  keywords: [
    "portfolio case study",
    "startup pitch generator",
    "saas case study",
    "ai business tool",
    "next.js project",
    "mvp development",
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
        url: "/og-image.png",
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
    images: ["/twitter-image.png"],
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
        <nav className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2 text-xl font-bold">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C12 2 15 5 15 9C15 10 14 11 13 11H11C10 11 9 10 9 9C9 5 12 2 12 2Z" />
                  <path d="M13 11V16L15 18V20C15 21 14 22 13 22H11C10 22 9 21 9 20V18L11 16V11H13Z" />
                  <path d="M7 14L9 16L7 18L5 16L7 14Z" />
                  <path d="M17 14L19 16L17 18L15 16L17 14Z" />
                  <circle cx="12" cy="7" r="1" fill="white" />
                </svg>
                PitchCraft
              </a>
              <div className="flex items-center gap-6"></div>
              <a
                href="https://github.com/MuhammadTanveerAbbas/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors mr-6"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </nav>
        {children}
        <Toaster />
        <LoadingOverlay />
      </body>
    </html>
  );
}
