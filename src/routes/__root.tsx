import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { CookieBanner } from "@/components/site/CookieBanner";
import { ConsentScripts } from "@/components/site/ConsentScripts";
import { ConsentDebugPanel } from "@/components/site/ConsentDebugPanel";
import { CONTACT } from "@/lib/contact";
import { initMotionFallbacks } from "@/lib/motion";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "KSIGN" },
      { property: "og:site_name", content: "KSIGN" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/71437845-488b-42eb-9d0f-dc3a205b7e74",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/71437845-488b-42eb-9d0f-dc3a205b7e74",
      },
      { name: "google-site-verification", content: "S2o5wKlzjOCj6UvtXbHl9G5uTqK6kClgxpESHmVR77k" },
      { title: "KSIGN — strona za 999 zł" },
      { property: "og:title", content: "KSIGN — strona za 999 zł" },
      { name: "twitter:title", content: "KSIGN — strona za 999 zł" },
      {
        name: "description",
        content:
          "Nowoczesna strona internetowa dla małej firmy. Pakiet Start: 999 zł, realizacja 3–7 dni, premium wygląd i prosty proces.",
      },
      {
        property: "og:description",
        content:
          "Nowoczesna strona internetowa dla małej firmy. Pakiet Start: 999 zł, realizacja 3–7 dni, premium wygląd i prosty proces.",
      },
      {
        name: "twitter:description",
        content:
          "Nowoczesna strona internetowa dla małej firmy. Pakiet Start: 999 zł, realizacja 3–7 dni, premium wygląd i prosty proces.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:ital,wght@0,300..700;1,300..700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://ksign.pl/#org",
              name: "KSIGN",
              url: "https://ksign.pl",
              email: CONTACT.email,
              areaServed: "PL",
              sameAs: ["https://www.facebook.com/ksign2026", "https://www.instagram.com/ksign.pl/"],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: CONTACT.email,
                  availableLanguage: ["Polish", "English"],
                  areaServed: "PL",
                },
                {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  email: CONTACT.email,
                  availableLanguage: ["Polish", "English"],
                  areaServed: "PL",
                },
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://ksign.pl/#site",
              url: "https://ksign.pl",
              name: "KSIGN",
              inLanguage: "pl-PL",
              publisher: { "@id": "https://ksign.pl/#org" },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <HeadContent />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Przejdź do treści
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}


function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    initMotionFallbacks();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConsentScripts />
      <Outlet />
      <CookieBanner />
      <ConsentDebugPanel />
    </QueryClientProvider>
  );
}

