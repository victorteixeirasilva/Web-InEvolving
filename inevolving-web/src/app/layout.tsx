import "../../src/globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InEvolving",
  description: "Software Para gestão de auxilio, no evolução pessoal e profissional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
