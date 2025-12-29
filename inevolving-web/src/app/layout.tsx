import "../../src/globals.scss";
import type { Metadata, Viewport } from "next";
import  DynamicManifest  from "./DynamicManifest";

export const metadata: Metadata = {
  title: "InEvolving",
  description: "Software Para gestão de auxilio, no evolução pessoal e profissional.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "InEvolving",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0E31",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Desativa o gesto de pinça e zoom manual
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        <DynamicManifest /> 
        {children}
      </body>
    </html>
  );
}
