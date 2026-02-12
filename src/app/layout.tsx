import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import AppHeader from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "Bharath Password Strength & Crack-Time Detector",
  description: "Defensive password strength + crack-time estimator (client-side)."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-dvh">
            <AppHeader />
            <main className="mx-auto max-w-5xl px-4 pb-16 pt-6">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
