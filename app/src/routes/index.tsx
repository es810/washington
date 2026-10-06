import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { ASSETS } from "../lib/site";

export const Route = createFileRoute("/")({
  // The home page inherits the site's own title/description from the root route.
  component: Index,
});

/* Hero media. The photograph is server-rendered and always present: it is the
 * poster while the video loads and the reduced-motion fallback. The video is
 * mounted only when the visitor has no reduced-motion preference, so a
 * reduced-motion visitor never fetches it.
 *
 * Framing: the frame is 16:9 with open sky in the top third, the Capitol and
 * its lights between roughly 31% and 66%, and dark water below. The media is
 * anchored to the top and the container is a full viewport tall, so on a 16:9
 * screen nothing is cropped at all and on wider screens the crop comes off the
 * dark water rather than the sky the headline needs. */
function HeroMedia() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const mobile = window.matchMedia("(max-width: 767px)");
    const apply = () =>
      setVideoSrc(
        mobile.matches ? ASSETS.heroVideoMobile : ASSETS.heroVideoDesktop,
      );

    apply();
    mobile.addEventListener("change", apply);
    return () => mobile.removeEventListener("change", apply);
  }, []);

  return (
    <>
      <picture className="wa-settle absolute inset-0 block">
        <source media="(max-width: 767px)" srcSet={ASSETS.heroPosterMobile} />
        <img
          src={ASSETS.heroPoster}
          alt="The illuminated dome of the United States Capitol at night, seen across the Capitol Reflection Pool."
          className="h-full w-full object-cover object-top"
          fetchPriority="high"
        />
      </picture>

      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover object-top"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}

/* The two primary routes. One shared style string so both buttons are identical
 * in colour, typography, padding and corner treatment. */
const ACTION =
  "flex w-full items-center justify-center gap-3 bg-hero-orange px-7 py-4 text-[0.8125rem] uppercase tracking-[0.14em] text-navy transition-colors duration-300 ease-wa hover:bg-[#d56820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory motion-reduce:transition-none";

/* The solid black band directly below the video: the supporting paragraph, then
 * the two actions. */
function HeroOutro() {
  return (
    <section className="bg-[#1f1f1f] text-ivory">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="mx-auto max-w-[62ch] text-center text-[1.0625rem] leading-[1.9] text-ivory md:text-[1.1875rem] md:leading-[1.9]">
          Washington Analytica helps navigate the American policy process and
          understand the shifting geopolitics of the Middle East.
        </p>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14">
          <Link to="/" hash="expertise" className={ACTION}>
            <span>Explore Our Expertise</span>
            <span aria-hidden="true">&#8594;</span>
          </Link>
          <Link to="/about" className={ACTION}>
            About Washington Analytica
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Audience row: the whole row is the target; the rule extends and an arrow
 * slides in from the left on hover. */
function AudienceRow({ label }: { label: string }) {
  return (
    <Link
      to="/whom-we-serve"
      className="group flex items-center justify-between gap-6 border-t border-ivory/15 py-7 md:py-8"
    >
      <span className="font-display text-2xl leading-none tracking-[-0.01em] text-ivory transition-transform duration-500 ease-wa group-hover:translate-x-2 motion-reduce:transition-none md:text-3xl">
        {label}
      </span>
      <span aria-hidden="true" className="flex shrink-0 items-center gap-3 text-gold-soft">
        <span className="h-px w-6 bg-gold/50 transition-all duration-500 ease-wa group-hover:w-14 motion-reduce:transition-none" />
        <span className="-translate-x-2 opacity-0 transition-all duration-500 ease-wa group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none">
          &#8594;
        </span>
      </span>
    </Link>
  );
}

/* Founder band: the strip fills with charcoal from the bottom as the label
 * lifts to light gray. The band itself is the hit area. */
function FounderBand() {
  return (
    <Link
      to="/about"
      hash="founder"
      className="group relative isolate flex items-center justify-between gap-6 overflow-hidden border-y border-charcoal/15 py-7 md:py-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-navy transition-transform duration-500 ease-wa group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
      />
      <span className="font-display text-2xl leading-none tracking-[-0.01em] text-navy transition-colors duration-500 ease-wa group-hover:text-ivory motion-reduce:transition-none md:text-3xl">
        Meet Our Founder
      </span>
      <span
        aria-hidden="true"
        className="h-px w-10 shrink-0 bg-gold transition-all duration-500 ease-wa group-hover:w-24 motion-reduce:transition-none"
      />
    </Link>
  );
}

/* The four images, in order, with the caption shown beneath each frame. The
 * orange is the exact tone measured from the WA logo. */
const IMAGES = [
  {
    src: ASSETS.galleryCapitol,
    alt: "The United States Capitol at night, its dome and colonnaded wings lit against a dark sky and reflected in the wet stone plaza.",
    caption: "Washington Institutions",
    mode: "photo",
    frameColor: undefined,
  },
  {
    src: ASSETS.galleryUsUae,
    alt: "A double exposure: a handshake in the foreground over the New York skyline and a United States flag on the left, the Dubai skyline on the right, with a blurred business meeting behind.",
    caption: "Strategic Partnerships",
    mode: "photo",
    frameColor: undefined,
  },
  {
    src: ASSETS.galleryHormuz,
    alt: "Donald Trump before a satellite map of the Strait of Hormuz labelled with Iran, Bandar Abbas, the Persian Gulf, Hormuz Island, the Gulf of Oman, Dubai, and Fujairah.",
    caption: "Regional Affairs",
    mode: "artwork",
    frameColor: "#e2b87c",
  },
  {
    src: ASSETS.galleryElection2028,
    alt: "A graphic reading 2028, Vote, Presidential Election, set in blue, white, and red on a dark blue field.",
    caption: "US Elections",
    mode: "artwork",
    frameColor: "#343c6b",
  },
];

function Index() {
  return (
    <>
      {/* 1. Hero. A full-viewport frame of the Capitol at night, anchored top so
          the open sky above the dome is never cropped. The headline sits in
          that sky, centred across two lines and clear of the building. The logo
          and company name deliberately do not appear over the video. */}
      <section className="relative isolate flex min-h-dvh items-start justify-center overflow-hidden bg-navy">
        <HeroMedia />

        <div aria-hidden="true" className="wa-hero-scrim absolute inset-0" />

        <div className="wa-hero-shadow relative mx-auto w-full max-w-4xl px-5 pt-14 text-center sm:pt-20 md:px-8 md:pt-24">
          <p className="wa-rise flex items-center justify-center gap-4 text-[0.65rem] uppercase tracking-[0.18em] text-gold-soft md:text-[0.72rem] md:tracking-[0.22em]">
            <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
            Washington, D.C. Advisory Firm
          </p>

          <h1
            className="wa-rise mx-auto mt-6 font-display text-[1.55rem] leading-[1.12] tracking-[-0.02em] text-hero-navy sm:text-[2.25rem] md:mt-7 md:text-[3rem] lg:text-[3.5rem]"
            data-delay="1"
          >
            Understanding Washington.
            <br />
            Anticipating the Middle East.
          </h1>
        </div>
      </section>

      {/* 2. Solid black band below the video: the supporting paragraph and the
          two actions, all outside the video. */}
      <HeroOutro />

      {/* 3. Introduction, then the four-image row 36px below the text. All four
          frames equal and 3:2, with an orange rule and a numbered caption under
          each. */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-20 md:px-8 md:pt-28 md:pb-20">
          <div className="mx-auto max-w-[68ch] border-t border-ivory-line pt-10 md:pt-14">
            <h2 className="wa-rise font-display text-3xl leading-tight tracking-[-0.02em] text-navy md:text-4xl">
              Where Washington and the Middle East Meet
            </h2>
            <p className="wa-rise mt-8 text-[1.0625rem] leading-[1.8] text-charcoal" data-delay="1">
              Washington Analytica is built on two simple ideas: navigating
              American government and its institutions is a learnable skill, and
              understanding the Middle East requires disciplined, on-the-ground
              analysis rather than headlines.
            </p>
            <p
              className="wa-rise mt-6 text-[1.0625rem] leading-[1.8] text-charcoal-soft"
              data-delay="1"
            >
              Our team combines American and regional specialists to deliver
              practical knowledge and clear-eyed assessments.
            </p>
          </div>

          <ul className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {IMAGES.map((item) => (
              <li key={item.src} className="group">
                <div className="wa-frame relative aspect-[3/2] w-full overflow-hidden rounded-[8px] shadow-sm ring-1 ring-transparent transition-shadow duration-500 ease-wa group-hover:ring-[#e27123] motion-reduce:transition-none">
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={900}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className={
                      item.mode === "photo"
                        ? "wa-zoom h-full w-full object-cover"
                        : "h-full w-full object-contain"
                    }
                  />
                </div>

                <span
                  aria-hidden="true"
                  className="block h-[3px] w-full origin-left scale-x-[0.35] bg-[#e27123] transition-transform duration-500 ease-wa group-hover:scale-x-100 motion-reduce:transition-none"
                />

                <p className="mt-3 text-[0.6875rem] uppercase tracking-[0.16em] text-navy">
                  {item.caption}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Our Expertise. Two panels of equal width and equal prominence: same
          rule, same heading treatment, same spacing, stacking on mobile. */}
      <section id="expertise" className="border-t border-ivory-line bg-ivory-shade">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex items-baseline gap-6">
            <span aria-hidden="true" className="h-px w-12 bg-gold" />
            <h2 className="font-display text-3xl leading-tight tracking-[-0.02em] text-navy md:text-4xl">
              Our Expertise
            </h2>
          </div>

          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
            <article className="wa-rise">
              <span aria-hidden="true" className="block h-px w-full bg-navy/20" />
              <h3 className="mt-8 font-display text-2xl leading-tight tracking-[-0.01em] text-navy md:text-3xl">
                Navigating Washington
              </h3>
              <p className="mt-5 text-[1.0625rem] leading-[1.8] text-charcoal">
                Practical understanding of how decisions are made inside
                Washington and how to navigate the American policy process.
              </p>
            </article>

            <article className="wa-rise" data-delay="1">
              <span aria-hidden="true" className="block h-px w-full bg-navy/20" />
              <h3 className="mt-8 font-display text-2xl leading-tight tracking-[-0.01em] text-navy md:text-3xl">
                Understanding the Middle East
              </h3>
              <p className="mt-5 text-[1.0625rem] leading-[1.8] text-charcoal">
                Disciplined analysis of regional dynamics and how decisions made
                inside the Beltway affect the Middle East, and vice versa.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 5. Who We Serve */}
      <section id="who-we-serve" className="bg-navy text-ivory">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="max-w-[62ch]">
            <h2 className="wa-rise font-display text-3xl leading-tight tracking-[-0.02em] md:text-4xl">
              Who We Serve
            </h2>
            <p className="wa-rise mt-6 text-[1.0625rem] leading-[1.8] text-ivory/80" data-delay="1">
              We deliver practical knowledge and clear-eyed assessments to:
            </p>
          </div>

          <div className="mt-12 border-b border-ivory/15 md:mt-16">
            <AudienceRow label="Corporations" />
            <AudienceRow label="Governments" />
            <AudienceRow label="Media Outlets" />
            <AudienceRow label="Institutional Investors" />
          </div>
        </div>
      </section>

      {/* 6. Founder preview */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <div className="wa-rise md:col-span-5">
              <img
                src={ASSETS.founderPortrait}
                alt="Mohamed Elmenshawy, Founder and Executive Director of Washington Analytica."
                width={724}
                height={904}
                className="block h-auto w-full max-w-[340px] border border-ivory-line"
              />
              <p className="mt-6 font-display text-2xl leading-tight tracking-[-0.01em] text-navy">
                Mohamed Elmenshawy
              </p>
              <span aria-hidden="true" className="mt-4 block h-px w-14 bg-gold" />
              <p className="mt-4 text-[0.75rem] uppercase tracking-[0.2em] text-charcoal-soft">
                Founder and Executive Director
              </p>
            </div>

            <div className="wa-rise md:col-span-7" data-delay="1">
              <h2 className="font-display text-3xl leading-tight tracking-[-0.02em] text-navy md:text-4xl">
                Led by Experience in Washington
              </h2>
              <p className="mt-7 max-w-[58ch] text-[1.0625rem] leading-[1.8] text-charcoal">
                A veteran journalist and political analyst, Mohamed Elmenshawy
                leads Washington Analytica from Washington, D.C. He has closely
                followed U.S. domestic and foreign affairs since 2001.
              </p>
              <div className="mt-12">
                <FounderBand />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
