import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "VIXWA LABS — Beyond what exists. Into what's possible.",
  description:
    "VIXWA LABS is a research and innovation lab exploring ideas, advancing knowledge and developing thoughtful solutions to complex challenges.",
  keywords: [
    "VIXWA LABS",
    "research lab",
    "innovation",
    "intelligent systems",
    "emerging technologies",
    "applied research",
    "data discovery",
  ],
  authors: [{ name: "VIXWA LABS" }],
  openGraph: {
    title: "VIXWA LABS — Beyond what exists. Into what's possible.",
    description:
      "Exploring ideas, advancing knowledge and developing thoughtful solutions to complex challenges.",
    siteName: "VIXWA LABS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIXWA LABS",
    description:
      "Exploring ideas, advancing knowledge and developing thoughtful solutions to complex challenges.",
  },
  icons: {
    icon: "/vixwa-brand-emblem.png",
    shortcut: "/vixwa-brand-emblem.png",
    apple: "/vixwa-brand-emblem.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Great+Vibes&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Unregister any obsolete Service Workers, purge stale caches, and force fresh reload if controlled */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                try {
                  var isControlled = Boolean(navigator.serviceWorker && navigator.serviceWorker.controller);
                  if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(function(regs) {
                      for (var i = 0; i < regs.length; i++) {
                        regs[i].unregister();
                      }
                    });
                  }
                  if ('caches' in window) {
                    caches.keys().then(function(names) {
                      for (var i = 0; i < names.length; i++) {
                        caches.delete(names[i]);
                      }
                    });
                  }
                  if (isControlled && !sessionStorage.getItem('vixwa_sw_purged')) {
                    sessionStorage.setItem('vixwa_sw_purged', '1');
                    window.location.reload();
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
