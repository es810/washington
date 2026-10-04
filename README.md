# Washington Analytica — website source

Marketing site for Washington Analytica, a Washington, D.C. advisory firm.
Server-rendered React (React 19 + TanStack Start) deploying as a single
Cloudflare Worker.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero video, two entry buttons, introduction, four-image row, Our Expertise, Who We Serve, founder preview |
| `/about` | About Us: overview, Our Founder (portrait and biography), Education, Books |
| `/workshops` | Our Workshops: four alternating image and text sections |
| `/whom-we-serve` | Whom We Serve: five audience entries |

## Layout

```
app/
  src/routes/        file-based routes: index, about, workshops, whom-we-serve,
                     plus __root.tsx which owns the document shell, header and footer
  src/components/    site-chrome.tsx (header, mobile menu, footer, logo)
                     reveal.tsx (the gentle fade-in on scroll used by the workshop rows)
  src/lib/site.ts    navigation, footer links, asset paths, per-page titles
  src/styles.css     design tokens (colour, type, easing) and the motion utilities
  src/app-meta.json  page title, description, favicon, social share image
  public/assets/     all site imagery and the hero video
  design-brief.md    the brief this build was made to
```

## Brand

- Navy `#10243A`, warm ivory `#F7F5F0`, muted gold `#B59A64`, charcoal `#252B33`
- Homepage hero palette: navy `#102F4A`, slate `#263E50`, orange `#E7792B`,
  burnt orange `#A84316`
- Headings in Newsreader (serif), body in Inter (sans), both loaded from Google
  Fonts in `src/routes/__root.tsx`. The company name in the header and hero is
  Newsreader at weight 700.
- The logo orange, sampled from the artwork, is `#E27123`

## Assets

| File | Used by | Notes |
| --- | --- | --- |
| `hero-desktop.mp4` | Home hero | 1920x1080, 24 fps, 13 s, seamless loop, no audio |
| `hero-mobile.mp4` | Home hero under 768px | 720x1278 portrait crop framed on the Washington Monument |
| `hero-poster.jpg` / `hero-poster-mobile.jpg` | Home hero | Poster while the video loads, and the reduced-motion fallback |
| `logo-wa-brand.png` | Header, hero | Navy and orange mark, transparent background |
| `logo-wa-white.png` | Footer | Solid white knockout for navy grounds |
| `founder-portrait.jpg` | About, home founder preview | 724x904 |
| `gallery-01-capitol.jpg` ... `gallery-04-election-2028.jpg` | Home four-image row | 900x600 each, 3:2 |
| `workshop-01-capitol-meeting.jpg` ... `workshop-04-gulf-model.jpg` | Our Workshops | 1100x619 each, 16:9 |
| `washington-dc-colonnade.png` | About page band | |
| `washington-dc-rowhouses.png` | Our Workshops page band | |

The hero video is mounted only when the visitor has not asked for reduced
motion, so a reduced-motion visitor never downloads it and sees the poster
instead. The two encodes are chosen by viewport width, so phones never fetch the
landscape file.

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
