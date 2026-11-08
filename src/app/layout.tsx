import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aaddy — MERN Stack Developer & Freelance Web Developer",
  description: "Full-stack developer building web apps with the MERN stack and AI. 10+ client projects across e-commerce, real estate, industrial, and loan consultancy sectors.",
  keywords: ["MERN stack", "Full-stack developer", "Next.js", "React", "Node.js", "Freelance", "Web development"],
  authors: [{ name: "Aaddy" }],
  creator: "Aaddy",
  publisher: "Aaddy",
  robots: "index, follow",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "[ADD: Portfolio URL]",
    siteName: "Aaddy Portfolio",
    title: "Aaddy — MERN Stack Developer & Freelance Web Developer",
    description: "Full-stack developer building web apps with the MERN stack and AI. 10+ client projects across e-commerce, real estate, industrial, and loan consultancy sectors.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aaddy Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaddy — MERN Stack Developer",
    description: "Full-stack developer building web apps with the MERN stack and AI.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "[ADD: Google verification]",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Aaddy",
              jobTitle: "MERN Stack Developer & Freelance Web Developer",
              description: "Full-stack developer building web apps with the MERN stack and AI. 10+ client projects across e-commerce, real estate, industrial, and loan consultancy sectors.",
              url: "[ADD: Portfolio URL]",
              sameAs: [
                "[ADD: GitHub URL]",
                "[ADD: LinkedIn URL]",
              ],
              knowsAbout: [
                "MongoDB",
                "Express",
                "React",
                "Node.js",
                "Next.js",
                "React Native",
                "Expo",
                "TypeScript",
                "JavaScript",
                "Socket.io",
                "WebRTC",
                "Groq API",
                "Vercel",
                "AI coding agents",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}