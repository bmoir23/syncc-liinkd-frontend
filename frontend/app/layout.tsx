import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { PostHogProvider } from "@/utils/posthog";

export const metadata: Metadata = {
  title: {
    default: "Syncc Liinkd",
    template: "%s | Syncc Liinkd",
  },
  description: "Your professional link-in-bio and AI-powered booking platform",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <PostHogProvider>
          {children}
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "hsl(224 71.4% 6%)",
                border: "1px solid hsl(215 27.9% 16.9%)",
                color: "hsl(210 20% 98%)",
              },
            }}
          />
        </PostHogProvider>
      </body>
    </html>
  );
}
