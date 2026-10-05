import { createFileRoute } from "@tanstack/react-router";

import { ASSETS, PAGE_META } from "../lib/site";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: PAGE_META.workshops.title },
      { name: "description", content: PAGE_META.workshops.description },
      { property: "og:title", content: PAGE_META.workshops.title },
      { property: "og:description", content: PAGE_META.workshops.description },
    ],
  }),
  component: Workshops,
});

type Offering = {
  number: string;
  title: string;
  duration?: string;
  description: string;
  listLabel?: string;
  items: string[];
  image: string;
  imageAlt: string;
};

const OFFERINGS: Offering[] = [
  {
    number: "01",
    title: "How Washington Really Works",
    duration: "4-5 Days | Interactive Workshop",
    description:
      "An interactive four- to five-day workshop for corporate teams, diplomats, government officials, and journalists who need a working knowledge of the U.S. political system, including how things actually get done.",
    listLabel: "Topics",
    items: [
      "The Executive Branch in Practice: agencies, the interagency process, and how regulations are made.",
      "How Congress, the courts, and national security agencies interact and shape White House decisions.",
      "K Street Explained: lobbying, advocacy, and coalition-building strategies.",
      "Elections and Policy Cycles: how campaigns, midterms, and transitions reshape the agenda.",
      "Media, Messaging, and the Beltway News Cycle.",
    ],
    image: ASSETS.workshopCapitolMeeting,
    imageAlt:
      "Five colleagues in discussion around a boardroom table, with the United States Capitol visible through the window behind them.",
  },
  {
    number: "02",
    title: "Emerging U.S. Foreign Policy Toward the Middle East: Assessment",
    description:
      "Forward-looking analysis of how emerging U.S. foreign policy is likely to shape the Middle East, designed for decision-makers seeking clear, relevant insights.",
    listLabel: "Areas of focus",
    items: [
      "The posture of the White House, the State Department, and the Pentagon toward key regional relationships.",
      "Tracking trends in sanctions, arms sales, and security assistance.",
      "Scenario planning around elections, leadership transitions, and policy pivots.",
      "Briefing memos ahead of major summits, votes, or diplomatic milestones.",
    ],
    image: ASSETS.workshopMapBriefing,
    imageAlt:
      "Three analysts reviewing a large map of the Middle East and North Africa spread across a conference table.",
  },
  {
    number: "03",
    title: "Middle East Geopolitical Risk Assessments",
    description:
      "Independent assessments of the political, security, and economic currents reshaping the region, built for clients who need to plan months and years ahead.",
    listLabel: "Areas of focus",
    items: [
      "Country and subregional risk profiles.",
      "Tracking alliances, political regimes, and regional rivalries.",
      "Implications for energy, trade, and the investment climate.",
      "On-demand rapid assessments.",
    ],
    image: ASSETS.workshopPort,
    imageAlt:
      "A container ship loaded with cargo at a commercial port at sunset, with gantry cranes and energy infrastructure along the waterfront.",
  },
  {
    number: "04",
    title: "Middle Eastern Sovereign Wealth Fund Dynamics (MESWF)",
    description: "",
    items: [
      "Understanding sovereign wealth funds in the Gulf Cooperation Council (GCC) states.",
      "Shifting investment priorities toward domestic objectives.",
    ],
    image: ASSETS.workshopGulfModel,
    imageAlt:
      "A Gulf investment team reviewing an architectural model of a city, with the Dubai skyline behind them.",
  },
];

function Workshops() {
  return (
    <>
      {/* Page band */}
      <section className="relative isolate overflow-hidden bg-navy text-ivory">
        <img
          src={ASSETS.rowHouses}
          alt="A quiet Washington, D.C. residential street of brick row houses at dusk."
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-navy/85" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/50"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <p className="wa-rise flex items-center gap-4 text-[0.75rem] uppercase tracking-[0.22em] text-gold-soft">
            <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
            Washington, D.C. and at the client’s location
          </p>
          <h1 className="wa-rise mt-7 max-w-3xl font-display text-[2.25rem] leading-[1.1] tracking-[-0.02em] sm:text-5xl md:text-[3.5rem]">
            Our Workshops
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-[68ch]">
            <p className="wa-rise font-display text-2xl leading-snug tracking-[-0.01em] text-navy md:text-[1.75rem]">
              All workshops are delivered in Washington, D.C. or at the client’s
              location.
            </p>
            <p
              className="wa-rise mt-8 text-[1.0625rem] leading-[1.8] text-charcoal"
              data-delay="1"
            >
              Our workshops are designed for professionals seeking a deeper
              understanding of the policy process in Washington, D.C. and the
              emerging dynamics of the Middle East.
            </p>
            <p
              className="wa-rise mt-6 text-[1.0625rem] leading-[1.8] text-charcoal-soft"
              data-delay="1"
            >
              Participants examine the formal structures and informal networks that
              shape policy outcomes and learn how to apply these insights to their
              work.
            </p>
          </div>
        </div>
      </section>

      {/* The four offerings, as equal cards in a 2x2 grid. Each card carries its
          own photograph above its title, so the images sit with their topics
          rather than in a separate gallery. Every image is the same 16:9 frame
          and its source is natively 16:9, so nothing is cropped or stretched.
          Cards grow vertically as needed, so no topic text is clipped. */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-32">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            {OFFERINGS.map((offering) => (
              <article
                key={offering.number}
                className="wa-rise flex flex-col border border-ivory-line bg-ivory-shade sm:aspect-square"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={offering.image}
                    alt={offering.imageAlt}
                    width={1100}
                    height={619}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-8 md:p-10">
                  <p className="text-[0.75rem] uppercase tracking-[0.2em] text-gold">
                    {offering.number}
                  </p>

                  <h2 className="mt-5 font-display text-2xl leading-tight tracking-[-0.01em] text-navy md:text-[1.75rem]">
                    {offering.title}
                  </h2>

                  {offering.duration ? (
                    <p className="mt-4 text-[0.75rem] uppercase tracking-[0.2em] text-charcoal-soft">
                      {offering.duration}
                    </p>
                  ) : null}

                  {offering.description ? (
                    <p className="mt-5 text-[1rem] leading-[1.75] text-charcoal">
                      {offering.description}
                    </p>
                  ) : null}

                  {offering.listLabel ? (
                    <p className="mt-7 text-[0.75rem] uppercase tracking-[0.2em] text-gold">
                      {offering.listLabel}
                    </p>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="mt-7 block h-px w-full bg-ivory-line"
                    />
                  )}

                  <ul className="mt-3">
                    {offering.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-4 border-t border-ivory-line py-3 last:border-b last:border-ivory-line"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-3 h-px w-5 shrink-0 bg-gold/60"
                        />
                        <span className="text-[0.9375rem] leading-[1.7] text-charcoal">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
