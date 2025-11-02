import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import LoadingOverlay from "@/components/loading-overlay";
import { ErrorBoundary } from "@/components/error-boundary";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PitchCraft - AI Startup Pitch Generator | Create Investor-Ready Pitches in 60s",
    template: "%s | PitchCraft"
  },
  description:
    "Transform your startup idea into a professional, investor-ready pitch in under 60 seconds. Get structured content, market analysis, MVP roadmap, and pitch deck outline with AI. Free, no signup required.",
  keywords: [
    "startup pitch generator",
    "ai pitch deck",
    "business plan generator",
    "investor pitch",
    "mvp roadmap",
    "startup tools",
    "pitch deck outline",
    "elevator pitch generator",
    "startup pitch template",
    "investor presentation",
    "business pitch ai",
    "pitch deck ai"
  ],
  authors: [{ name: "Muhammad Tanveer Abbas", url: "https://muhammadtanveerabbas.vercel.app" }],
  creator: "Muhammad Tanveer Abbas",
  publisher: "PitchCraft",
  applicationName: "PitchCraft",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PitchCraft",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "PitchCraft - AI Startup Pitch Generator",
    description:
      "Transform your startup idea into a professional pitch in under 60 seconds. Get elevator pitch, market analysis, MVP roadmap & more. Free, no signup required.",
    siteName: "PitchCraft",
    locale: "en_US",
    type: "website",
    url: "https://pitchcraft.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "PitchCraft - AI Startup Pitch Generator",
    description:
      "Generate professional startup pitches in 60 seconds. Get structured content, market insights, and investor-ready presentations.",
    creator: "@m_tanveerabbas",
    site: "@m_tanveerabbas"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://pitchcraft.vercel.app",
  },
  category: "Business Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-black">
        <ErrorBoundary>
          {children}
          <Toaster />
          <LoadingOverlay />
        </ErrorBoundary>
      </body>
    </html>
  );
}
