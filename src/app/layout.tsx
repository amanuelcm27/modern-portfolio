import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amanuel Firew Lema | Backend & AI Engineer",
  description:
    "Portfolio of Amanuel Firew Lema, Backend Engineer, Django Specialist, and AI Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
