import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { SITE } from "../lib/site";
import appMetaJson from "../app-meta.json";

declare const __HF_DESIGN_INSPECTOR__: boolean;

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  og_video_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;

const FALLBACK_TITLE = "Washington Analytica | Washington, D.C. Advisory Firm";
const FALLBACK_DESCRIPTION =
  "Washington Analytica helps navigate the American policy process and understand the shifting geopolitics of the Middle East.";

const APP_HOST_ZONES = ["higgsfield.app", "higgsfield-dev.app"];

function toOwnAssetUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("/")) return value;
  try {
    const url = new URL(value);
    const isAppHost = APP_HOST_ZONES.some(
      (zone) => url.hostname === zone || url.hostname.endsWith(`.${zone}`),
    );
    if (isAppHost) return url.pathname + url.search;
    return value;
  } catch {
    return value;
  }
}

const FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&display=swap";

function buildHead(meta: AppMeta) {
  const title = meta.og_title ?? FALLBACK_TITLE;
  const description = meta.og_description ?? FALLBACK_DESCRIPTION;
  const ogImage = toOwnAssetUrl(meta.og_image_url);
  const favicon = toOwnAssetUrl(meta.favicon_url);
  const ogVideo = toOwnAssetUrl(meta.og_video_url);

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "theme-color", content: "#10243A" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: ogImage ? "summary_large_image" : "summary" },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { name: "twitter:image", content: ogImage },
          ]
        : []),
      ...(ogVideo ? [{ property: "og:video", content: ogVideo }] : []),
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous" as const,
      },
      { rel: "stylesheet", href: FONT_STYLESHEET },
      { rel: "stylesheet", href: appCss },
      ...(favicon
        ? [
            { rel: "icon", href: favicon },
            { rel: "apple-touch-icon", href: favicon },
          ]
        : []),
    ],
  };
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70dvh] items-center justify-center px-5">
      <div className="max-w-lg text-center">
        <p className="text-[0.75rem] uppercase tracking-[0.22em] text-gold">
          Page not found
        </p>
        <h1 className="mt-6 font-display text-4xl leading-tight tracking-[-0.02em] text-navy md:text-5xl">
          This page is not on file.
        </h1>
        <p className="mx-auto mt-5 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-charcoal-soft">
          The address you followed does not match a page on this site. Return to
          the home page to continue.
        </p>
        <Link
          to="/"
          className="group relative mt-9 inline-flex items-center gap-3 pb-2 font-display text-lg text-navy"
        >
          <span>Return Home</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-500 ease-wa group-hover:translate-x-1.5 motion-reduce:transition-none"
          >
            &#8594;
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-wa group-hover:scale-x-100 motion-reduce:transition-none"
          />
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportHiggsfieldError(error, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-[70dvh] items-center justify-center px-5">
      <div className="max-w-lg text-center">
        <p className="text-[0.75rem] uppercase tracking-[0.22em] text-gold">
          Something went wrong
        </p>
        <h1 className="mt-6 font-display text-4xl leading-tight tracking-[-0.02em] text-navy">
          This page did not load.
        </h1>
        <p className="mx-auto mt-5 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-charcoal-soft">
          An unexpected error interrupted the page. You can try again or return
          to the home page.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-navy px-6 py-3 text-[0.8125rem] uppercase tracking-[0.14em] text-navy transition-colors duration-500 ease-wa hover:bg-navy hover:text-ivory motion-reduce:transition-none"
          >
            Try again
          </button>
          <a
            href="/"
            className="pb-1 text-[0.8125rem] uppercase tracking-[0.14em] text-charcoal-soft underline decoration-gold/50 underline-offset-4 hover:text-navy"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-ivory font-sans text-charcoal antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (!__HF_DESIGN_INSPECTOR__) {
      return;
    }

    void import("../module/design-inspector/runtime")
      .then(({ installHiggsfieldDesignInspector }) => {
        installHiggsfieldDesignInspector();
      })
      .catch((error) => {
        reportHiggsfieldError(
          error instanceof Error ? error : new Error("Failed to load design inspector"),
          {
            boundary: "higgsfield_design_inspector_import",
          },
        );
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="main">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
