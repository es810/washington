import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "../components/reveal";
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
  /** true places the image on the right and the content on the left. */
  flip: boolean;
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
    flip: false,
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
    flip: true,
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
    flip: false,
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
    flip: true,
  },
];

/* One workshop row. The image comes first in the document so that mobile stacks
 * image, then title and content; on desktop the two columns are placed
 * explicitly, which is what flips the pairing. The navy backing sits behind the
 * image offset 14px, alternating outward, and the gold number straddles the
 * image's outer bottom corner. */
function WorkshopRow({ offering }: { offering: Offering }) {
  const { flip } = offering;

  return (
    <article
      className={`grid gap-10 py-14 md:gap-16 md:py-20 ${
        flip ? "md:grid-cols-[52fr_48fr]" : "md:grid-cols-[48fr_52fr]"
      }`}
    >
      <div
        className={`relative ${
          flip ? "md:col-start-2 md:row-start-1" : "md:col-start-1 md:row-start-1"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-0 bg-navy ${
            flip
              ? "translate-x-3.5 translate-y-3.5"
              : "-translate-x-3.5 translate-y-3.5"
          }`}
        />
        <img
          src={offering.image}
          alt={offering.imageAlt}
          width={1100}
          height={619}
          loading="lazy"
          decoding="async"
          className="relative block h-auto w-full"
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-0 font-display text-5xl leading-none tracking-[-0.02em] text-gold [text-shadow:0_2px_24px_#10243aa6] md:text-6xl ${
            flip
              ? "right-0 translate-x-1/4 translate-y-1/3"
              : "left-0 -translate-x-1/4 translate-y-1/3"
          }`}
        >
          {offering.number}
        </span>
      </div>

      <div
        className={
          flip ? "md:col-start-1 md:row-start-1" : "md:col-start-2 md:row-start-1"
        }
      >
        <h2 className="font-display text-2xl leading-tight tracking-[-0.01em] text-navy md:text-3xl">
          {offering.title}
        </h2>

        {offering.duration ? (
          <p className="mt-4 text-[0.75rem] uppercase tracking-[0.2em] text-gold">
            {offering.duration}
          </p>
        ) : null}

        {offering.description ? (
          <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-[1.8] text-charcoal">
            {offering.description}
          </p>
        ) : null}

        {offering.listLabel ? (
          <p className="mt-9 text-[0.75rem] uppercase tracking-[0.2em] text-gold">
            {offering.listLabel}
          </p>
        ) : (
          <span aria-hidden="true" className="mt-9 block h-px w-full bg-ivory-line" />
        )}

        <ul className="mt-4">
          {offering.items.map((item) => (
            <li
              key={item}
              className="flex gap-5 border-t border-ivory-line py-4 last:border-b last:border-ivory-line"
            >
              <span aria-hidden="true" className="mt-3 h-px w-6 shrink-0 bg-gold/60" />
              <span className="max-w-[62ch] text-[1rem] leading-[1.7] text-charcoal">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

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

      {/* Offerings */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-32">
          <div className="divide-y divide-ivory-line">
            {OFFERINGS.map((offering) => (
              <Reveal key={offering.number}>
                <WorkshopRow offering={offering} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
