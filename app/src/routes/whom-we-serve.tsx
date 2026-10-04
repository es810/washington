import { createFileRoute } from "@tanstack/react-router";

import { PAGE_META } from "../lib/site";

export const Route = createFileRoute("/whom-we-serve")({
  head: () => ({
    meta: [
      { title: PAGE_META.whomWeServe.title },
      { name: "description", content: PAGE_META.whomWeServe.description },
      { property: "og:title", content: PAGE_META.whomWeServe.title },
      { property: "og:description", content: PAGE_META.whomWeServe.description },
    ],
  }),
  component: WhomWeServe,
});

type Audience = {
  number: string;
  name: string;
  description?: string;
};

const AUDIENCES: Audience[] = [
  {
    number: "01",
    name: "Corporations",
    description:
      "Corporations expanding operations in the United States or the Middle East.",
  },
  {
    number: "02",
    name: "Diplomats",
    description: "Diplomats based in Washington, D.C.",
  },
  {
    number: "03",
    name: "Media Outlets and International Organizations",
    description:
      "Media outlets and international organizations based in Washington, D.C.",
  },
  {
    number: "04",
    name: "Investment Firms",
  },
  {
    number: "05",
    name: "Government Relations Professionals",
    description: "New government relations hires.",
  },
];

function WhomWeServe() {
  return (
    <>
      {/* Page band */}
      <section className="bg-navy text-ivory">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <p className="wa-rise flex items-center gap-4 text-[0.75rem] uppercase tracking-[0.22em] text-gold-soft">
            <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
            Audiences
          </p>
          <h1 className="wa-rise mt-7 max-w-3xl font-display text-[2.25rem] leading-[1.1] tracking-[-0.02em] sm:text-5xl md:text-[3.5rem]">
            Whom We Serve
          </h1>
          <p
            className="wa-rise mt-8 max-w-[58ch] text-[1.0625rem] leading-[1.8] text-ivory/80"
            data-delay="1"
          >
            We deliver practical knowledge and clear-eyed assessments to the
            audiences below.
          </p>
        </div>
      </section>

      {/* Audience entries */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="border-t border-ivory-line">
            {AUDIENCES.map((audience) => (
              <div
                key={audience.number}
                className="grid gap-4 border-b border-ivory-line py-10 md:grid-cols-12 md:items-baseline md:gap-10 md:py-12"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-2xl leading-none tracking-[-0.02em] text-gold md:col-span-1 md:text-3xl"
                >
                  {audience.number}
                </span>
                <h2 className="font-display text-2xl leading-tight tracking-[-0.01em] text-navy md:col-span-5 md:text-3xl">
                  {audience.name}
                </h2>
                {audience.description ? (
                  <p className="max-w-[54ch] text-[1.0625rem] leading-[1.8] text-charcoal-soft md:col-span-6">
                    {audience.description}
                  </p>
                ) : (
                  <span aria-hidden="true" className="hidden md:col-span-6 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
