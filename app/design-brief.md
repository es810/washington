# Washington Analytica — design brief

## Design read
For policy, corporate and diplomatic professionals who need sober authority, not
hype. Emotional register: quiet institutional confidence, the calm of a well-set
printed briefing document read in a good chair.

## Concept spine
**The page is a printed briefing document.** Hairline rules, folio-style
numerals, wide margins, a running head, and generous leading. Chrome is
typographic, never decorative. Nothing bounces; things are set.

## Delivery tier
`editorial` — typography + photography + bespoke chrome, micro-motion only.
Non-animated: no camera journey. Micro-motion is limited to (a) nav hairline
travel, (b) hero underline draw, (c) one-time entrance fades on mount
(transform + opacity, fired on mount, never viewport-gated), (d) hover states.

## Locked palette
Client brand colours, supplied verbatim — override the default palette bans.
- Navy `#10243A` (grounds, hero overlay, footer, type on ivory)
- Warm ivory `#F7F5F0` (primary page ground)
- Muted gold `#B59A64` (rules, numerals, link underline, one accent only)
- Charcoal `#252B33` (body text on ivory)
Supporting tints derived from navy/charcoal only: navy-800 `#16304C`, ivory-200
`#EFEBE2` (hairlines), ivory-300 `#E2DDD1`.

## Locked type
- Display / headings: **Newsreader** (serif) — user explicitly requested elegant
  serif headings for an editorial advisory brand; justified and named here.
- Body / UI: **Inter** (sans) — neutral, highly readable at body size; never used
  as display.
- Rules: display scale `text-4xl md:text-6xl tracking-[-0.02em] leading-[1.05]`
  for two-line heroes; body `text-[1.0625rem] leading-[1.75] max-w-[68ch]`.
- No em-dashes or en-dashes anywhere in visible copy. Client copy containing them
  is repunctuated (comma / colon / period) with meaning preserved.

## Animation mode
`non-animated` — user picked "Non-animated editorial" at intake.

## Section plan
Home (`/`):
1. Hero — full-bleed architectural photograph + navy scrim, display headline split over two lines.
2. Introduction — centered editorial column on ivory, hairline above.
3. Our Expertise — asymmetric two-panel split (numberless editorial panels, no icons).
4. Who We Serve — typographic row list on navy (`divide-y` rows).
5. Founder Preview — split 5/7 text + typographic monogram plate (no portrait).
6. Footer — navy, shared.

About (`/about`): page heading hero (navy band, no photo) → about text (editorial
column) → founder (split, anchored `#founder`) → education (definition list) →
books (two typographic entries) → footer.

Workshops (`/workshops`): heading hero → intro column → four numbered editorial
sections (`01`–`04`), each a two-column split (label rail + topic list).
Whom We Serve (`/whom-we-serve`): heading hero → five numbered typographic rows.

Distinct layout families per page, no consecutive repeats. Eyebrows: hero only
on interior pages; on home the hero eyebrow plus one section kicker (≤ ceil(6/3)=2).

## Asset plan
Generated with Higgsfield, no stock:
- `hero-dc.jpg` — architectural Washington, D.C. at blue hour, non-partisan, no
  people, no handshakes, no flags-as-politics. 16:9 wide.
- `dc-colonnade.jpg` — neoclassical colonnade detail, warm ivory/navy grade (About page).
- `dc-rowhouses.jpg` — Washington residential architecture, quiet street (Workshops band).
- Branding: 3:2 cover scene + 1:1 flat icon via `generate_app_branding`.
- Wordmark: typographic "Washington Analytica" + a drawn WA monogram (inline SVG,
  gold hairline frame) — no generated logo file.

## CTA inventory (each its own component, no shared button style)
1. Hero primary "Explore Our Expertise" — gold label, underline that draws in on
   hover, arrow travels along it, magnetic pull. *Drawing underline (the single
   use of that rationed garment page-wide).*
2. Hero secondary "About Washington Analytica" — corner-bracket frame (viewfinder)
   that closes around the label on hover.
3. Founder preview "Meet Our Founder" — full-width band CTA; the whole band shears
   its navy grade and the gold rule extends on hover.
4. Nav links — sliding hairline under the active/hovered link, never pill buttons.
5. Footer links — plain rule-under rule, no fill.

## Anti-convergence ledger
No previous build in this chat. Axes set here: palette = deep navy + warm ivory +
muted gold (heritage institutional, client-supplied); type = serif display +
neutral sans; hero = full-bleed photograph with type block bottom-left; technique
= editorial typographic system (non-animated path, no catalog gizmo); garments =
drawing underline / viewfinder brackets / shearing band; corner language = all
sharp, zero radius except the monogram plate.
