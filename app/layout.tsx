import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const thai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pongpai Sodsong — Developer & IT Support",
  description:
    "Portfolio of Pongpai Sodsong — IT Support / Teaching Assistant at Com7 (AWS). Building with Next.js, React, TypeScript, Power Platform and a UX-first mindset.",
  keywords: [
    "Pongpai Sodsong",
    "Portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "IT Support",
    "Teaching Assistant",
    "Com7",
    "AWS",
    "UX/UI",
  ],
  authors: [{ name: "Pongpai Sodsong" }],
  openGraph: {
    title: "Pongpai Sodsong — Developer & IT Support",
    description:
      "IT Support / Teaching Assistant at Com7 (AWS). Frontend, Power Platform and UX-first product work.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Light is the default. Only a previously saved choice can switch it to dark,
// and it is applied before first paint so there is no flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${sans.variable} ${display.variable} ${mono.variable} ${thai.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
