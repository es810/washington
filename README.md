# Washington Analytica — website source

Marketing site for Washington Analytica, a Washington, D.C. advisory firm.
Server-rendered React (React 19 + TanStack Start) deploying as a single
Cloudflare Worker.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero video, black outro band with the supporting line and two actions, introduction, four-image row, Our Expertise, Who We Serve, founder preview |
| `/about` | About Us: overview, Our Founder (portrait and biography), Education and Books |
| `/workshops` | Our Workshops: four equal topic cards, each with its own photograph |
| `/whom-we-serve` | Whom We Serve: five audience entries |
| `/contact` | Contact Us: address, email and an enquiry form |

## Layout

```
app/
  src/routes/        file-based routes: index, about, workshops, whom-we-serve,
                     contact, plus __root.tsx which owns the shell, header and footer
  src/components/    site-chrome.tsx (header, mobile menu, footer, logo)
                     contact-form.tsx (the enquiry form)
                     reveal.tsx (gentle fade-in on scroll)
  src/lib/site.ts    navigation, footer links, asset paths, per-page titles
  src/lib/api/       contact.functions.ts (the server function that accepts a message)
  src/styles.css     design tokens (colour, type, easing) and the motion utilities
  src/app-meta.json  page title, description, favicon, social share image
  public/assets/     all site imagery and the hero video
  migrations/        0001_contact_messages.sql
  design-brief.md    the brief the first build was made to
```

## Brand

Neutral gray palette with a single orange accent:

- Charcoal `#333333` for dark grounds, headings and body type
- Medium gray `#666666` for secondary text and elements
- Light gray `#F2F2F2` for light surfaces, `#E8E8E8` for the alternating band
- Orange `#E7792B` for buttons and accents, `#F0924E` on dark grounds,
  `#A84316` for links on light grounds where the bright orange would not hold
- Solid black band under the hero: `#1F1F1F`
- The logo orange, sampled from the artwork, is `#E27123`

Headings are set in Newsreader (serif) and body in Inter (sans), both loaded
from Google Fonts in `src/routes/__root.tsx`. The company name in the header is
Newsreader at weight 700.

## Assets

| File | Used by | Notes |
| --- | --- | --- |
| `hero-capitol-desktop.mp4` | Home hero | 1920x1080, ~9 s, seamless loop, no audio |
| `hero-capitol-mobile.mp4` | Home hero under 768px | 720x1278 portrait crop of the same shot |
| `hero-capitol-poster.jpg` / `hero-capitol-poster-mobile.jpg` | Home hero | Poster while the video loads, and the reduced-motion fallback |
| `logo-wa-brand.png` | Header | Navy and orange mark, transparent background |
| `logo-wa-white.png` | Footer | Solid white knockout for dark grounds |
| `founder-portrait.jpg` | About, home founder preview | 724x904 |
| `gallery-01-capitol.jpg` ... `gallery-04-election-2028.jpg` | Home four-image row | 900x600, 3:2 |
| `workshop-01-capitol-meeting.jpg` ... `workshop-04-gulf-model.jpg` | Our Workshops cards | 1100x619, 16:9 |
| `washington-dc-colonnade.png` | About page band | |
| `washington-dc-rowhouses.png` | Our Workshops page band | |

The hero video is mounted only when the visitor has not asked for reduced
motion, so a reduced-motion visitor never downloads it and sees the poster
instead. The two encodes are chosen by viewport width, so phones never fetch the
landscape file. The hero frame is anchored top: at 16:9 the container matches the
video's aspect and nothing is cropped, and on wider screens the crop comes off
the dark foreground rather than the sky the headline sits in.

## The contact form

Submissions go to a server function (`src/lib/api/contact.functions.ts`) which:

1. validates name, email and message on the server as well as in the browser;
2. stores the message in D1, in `contact_messages`, via the migration in
   `app/migrations/`. Storing it is what makes a submission accepted;
3. then hands it to a transactional email provider, if one is configured.

Email delivery to Mohamed@washingtonanalytica.com needs ONE secret, set as an
environment variable, not in code:

- `CONTACT_EMAIL_API_KEY` — an API key for Resend's send API
- `CONTACT_EMAIL_FROM` — optional, a verified sender; without it the provider's
  test sender is used, which still delivers to the address above

Until that key is set, messages are stored but not emailed, and the form says
"received" rather than "sent", so it never claims a delivery that did not happen.
D1 is enabled in `app/app.manifest.json` (`"db": true`) and is bound as `env.DB`.

## Running it

```
bun install
bun run dev        # local development
bun run build      # production build
bun run typecheck
```

This project is built on the Higgsfield website platform, which supplies the
shared workspace packages (`@higgsfield/quanta`, `@higgsfield/fnf`,
`@higgsfield/fnf-react`) and the deploy pipeline. Those platform packages are
deliberately not included in this handoff, so `bun install` outside the platform
will need them available separately.
