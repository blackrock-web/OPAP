import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { useSession } from "@/lib/session";
import appCss from "../styles.css?url";

const APP_NAME = "ARES-EMD-OPAP Stego Lab";

function RootShell() {
  useEffect(() => {
    useSession.getState().initFromStorage();
  }, []);

  return (
    <html lang="en" className="h-full w-full min-w-full" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-full w-full min-w-full m-0 p-0 bg-bg text-fg antialiased" suppressHydrationWarning>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#f4f1ea" },
      {
        name: "description",
        content:
          "CNN-Assisted Adaptive EMD-OPAP Steganography with Distortion Optimization for Secure Image Data Hiding. Comprehensive benchmark, ablation, and extraction laboratory.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=Source+Sans+3:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: RootShell,
});
