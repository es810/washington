import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { ASSETS, FOOTER_LINKS, NAV_LINKS, SITE, type NavItem } from "../lib/site";

/* The Washington Analytica mark. Two files: the navy and orange brand mark for
 * the light header and the daytime hero, and the solid white knockout for the
 * navy footer. Sized by height only, so the logo's own proportions are never
 * stretched. Empty alt text because the company name sits beside it in text. */
export function Monogram({
  className = "h-9",
  tone = "brand",
}: {
  className?: string;
  tone?: "brand" | "white";
}) {
  return (
    <img
      src={tone === "brand" ? ASSETS.logoBrand : ASSETS.logoWhite}
      alt=""
      width={253}
      height={144}
      className={`w-auto shrink-0 ${className}`}
    />
  );
}

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = !item.hash && item.to === pathname;

  return (
    <Link
      to={item.to}
      hash={item.hash}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className="group relative block py-1 text-[0.8125rem] uppercase tracking-[0.14em] text-charcoal-soft transition-colors duration-500 ease-wa hover:text-navy focus-visible:text-navy motion-reduce:transition-none"
    >
      {item.label}
      <span
        aria-hidden="true"
        className={`absolute -bottom-0.5 left-0 h-px w-full origin-center bg-gold transition-transform duration-500 ease-wa motion-reduce:transition-none ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ivory-line bg-ivory/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 md:h-20 md:px-8">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label={`${SITE.name} home`}
        >
          <Monogram className="h-[30px] md:h-9" tone="brand" />
          <span className="font-display text-[1.0625rem] font-bold leading-none tracking-[-0.01em] text-navy md:text-xl">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="wa-mobile-nav"
          className="flex items-center gap-2.5 py-2 text-[0.8125rem] uppercase tracking-[0.14em] text-navy md:hidden"
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span aria-hidden="true" className="flex h-3 w-4 flex-col justify-between">
            <span
              className={`h-px w-full bg-navy transition-transform duration-500 ease-wa motion-reduce:transition-none ${
                open ? "translate-y-[5.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-navy transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-px w-full bg-navy transition-transform duration-500 ease-wa motion-reduce:transition-none ${
                open ? "-translate-y-[5.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="wa-mobile-nav"
        hidden={!open}
        className="border-t border-ivory-line bg-ivory md:hidden"
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col px-5 py-2"
          aria-label="Primary mobile"
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              onClick={() => setOpen(false)}
              className="border-b border-ivory-line py-4 font-display text-xl text-navy last:border-b-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-ivory">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <Monogram className="h-9 md:h-10" tone="white" />
              <span className="font-display text-2xl leading-none tracking-[-0.01em]">
                {SITE.name}
              </span>
            </div>
            <p className="mt-6 font-display text-lg leading-snug text-ivory/80">
              {SITE.tagline}
            </p>
            <p className="mt-4 text-[0.8125rem] uppercase tracking-[0.14em] text-gold-soft">
              {SITE.city}
            </p>
          </div>

          <nav className="flex flex-col gap-4" aria-label="Footer">
            {FOOTER_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="w-fit border-b border-transparent pb-1 text-[0.8125rem] uppercase tracking-[0.14em] text-ivory/80 transition-colors duration-500 ease-wa hover:border-gold hover:text-ivory motion-reduce:transition-none"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/15 pt-8 text-[0.8125rem] text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE.name}. All rights reserved.
          </p>
          <p>{SITE.city}</p>
        </div>
      </div>
    </footer>
  );
}
