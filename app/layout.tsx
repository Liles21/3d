import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nature Table ICT Classroom in the Forest | 3D Interactive Web App",
  description:
    "An interactive 3D web application showcasing the Nature Table ICT Classroom in the Forest concept, featuring solar-powered eco-learning stations, modular library, health outpost, and project showcase.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#022c22",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full h-full flex flex-col bg-emerald-950 text-slate-100 overflow-hidden select-none font-sans overscroll-none">
        {children}
      </body>
    </html>
  );
}
