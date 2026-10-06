import { createFileRoute, Link } from "@tanstack/react-router";

import { ASSETS, PAGE_META } from "../lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: PAGE_META.about.title },
      { name: "description", content: PAGE_META.about.description },
      { property: "og:title", content: PAGE_META.about.title },
      { property: "og:description", content: PAGE_META.about.description },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      {/* Page band */}
      <section className="relative isolate overflow-hidden bg-navy text-ivory">
        <img
          src={ASSETS.colonnade}
          alt="Fluted limestone columns of a Washington, D.C. building in late afternoon light."
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-navy/85" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/55"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <p className="wa-rise flex items-center gap-4 text-[0.75rem] uppercase tracking-[0.22em] text-gold-soft">
            <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
            About Us
          </p>
          <h1 className="wa-rise mt-7 max-w-3xl font-display text-[2.25rem] leading-[1.1] tracking-[-0.02em] sm:text-5xl md:text-[3.5rem]">
            About Washington Analytica
          </h1>
        </div>
      </section>

      {/* About text */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-[68ch]">
            <span aria-hidden="true" className="block h-px w-full bg-ivory-line" />
            <p className="wa-rise mt-10 text-[1.0625rem] leading-[1.8] text-charcoal">
              Washington Analytica (WA) is a Washington, D.C. advisory firm built
              on two simple ideas: first, navigating American government and its
              institutions is a learnable skill; and second, understanding the
              Middle East requires disciplined, on-the-ground analysis rather than
              headlines.
            </p>
            <p
              className="wa-rise mt-6 text-[1.0625rem] leading-[1.8] text-charcoal"
              data-delay="1"
            >
              Our team combines American professionals and regional specialists who
              deliver practical knowledge and clear-eyed assessments to
              corporations, governments, media outlets, and institutional
              investors.
            </p>
            <p
              className="wa-rise mt-6 text-[1.0625rem] leading-[1.8] text-charcoal"
              data-delay="1"
            >
              We work at the intersection of two audiences: professionals who need
              to understand how decisions are made inside Washington, and
              organizations that need to understand how decisions made inside the
              Beltway will affect the Middle East, and vice versa.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="border-t border-ivory-line bg-ivory-shade">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex items-baseline gap-6">
            <span aria-hidden="true" className="h-px w-12 bg-gold" />
            <h2 className="font-display text-3xl leading-tight tracking-[-0.02em] text-navy md:text-4xl">
              Our Founder
            </h2>
          </div>

          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
            <div className="wa-rise md:col-span-4">
              <div className="border border-ivory-line">
                <img
                  src={ASSETS.founderPortrait}
                  alt="Mohamed Elmenshawy, Founder of Washington Analytica."
                  width={724}
                  height={904}
                  className="block h-auto w-full"
                />
              </div>
            </div>

            <div className="wa-rise md:col-span-8" data-delay="1">
              <p className="font-display text-3xl leading-tight tracking-[-0.02em] text-navy md:text-4xl">
                Mohamed Elmenshawy
              </p>
              <p className="mt-4 text-[0.75rem] uppercase tracking-[0.2em] text-gold">
                Founder and Executive Director, Washington Analytica
              </p>
              <span aria-hidden="true" className="mt-8 block h-px w-full bg-ivory-line" />
              <div className="mt-8 max-w-[64ch] space-y-6 text-[1.0625rem] leading-[1.8] text-charcoal">
                <p>
                  Mohamed Elmenshawy is a veteran journalist and political analyst
                  who leads Washington Analytica from his office in Washington,
                  D.C. He has closely followed U.S. domestic and foreign affairs
                  since 2001.
                </p>
                <p>
                  Credentialed by the White House, the State Department, and
                  Congress, he is a member of the White House Correspondents’
                  Association and a founding member of the White House Foreign
                  Correspondents’ Association. He has covered U.S. policy under
                  Presidents George W. Bush, Barack Obama, Donald Trump’s first
                  administration, Joe Biden, and Donald Trump’s second
                  administration.
                </p>
                <p>
                  His reporting and analysis draw on participation in events at the
                  Department of Defense, the State Department, and the White House;
                  interviews with prominent American figures; and visits to
                  Guantanamo Bay and several U.S. military bases. He is also one of
                  the few Arabs to have delivered official testimony before
                  congressional committees.
                </p>
                <p>
                  Elmenshawy has worked at prominent Washington think tanks,
                  including the Middle East Institute, the Center for Defense
                  Information, and the World Security Institute. His work has
                  appeared in major American publications and news outlets,
                  including The New York Times, The Washington Post, Foreign
                  Policy, CNN, and HuffPost.
                </p>
                <p>
                  He spent four years as a researcher at the Middle East Institute
                  after serving as editor-in-chief of The Washington Report. He has
                  also authored numerous research papers and reports on American
                  politics for leading Arab and American think tanks. He holds a
                  Bachelor’s degree in Political Science from Cairo University, a
                  Master’s degree in International Relations from the University
                  of Akron in Ohio, and a Master of Business Administration from
                  American University in Washington, D.C.
                </p>
                <p>
                  He is the author of{" "}
                  <em>
                    America and the Egyptian Revolution: A Testimony from Washington
                  </em>{" "}
                  (2014) and{" "}
                  <em>
                    Trump First: How the President Is Changing America and the World
                  </em>{" "}
                  (2020).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Return link */}
      <section className="bg-navy text-ivory">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-14 md:px-8">
          <p className="font-display text-xl leading-snug tracking-[-0.01em] md:text-2xl">
            Understanding Washington. Anticipating the Middle East.
          </p>
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 pb-2 text-[0.8125rem] uppercase tracking-[0.16em] text-gold-soft transition-colors duration-500 ease-wa hover:text-ivory motion-reduce:transition-none"
          >
            <span>Contact Us</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-500 ease-wa group-hover:translate-x-1.5 motion-reduce:transition-none"
            >
              &#8594;
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-wa group-hover:scale-x-100 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
