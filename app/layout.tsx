import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tiffin Menu Planner",
  description: "Plan a week of tiffin without repeating a sabzi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
