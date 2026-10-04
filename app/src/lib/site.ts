export const SITE = {
  name: "Washington Analytica",
  initials: "WA",
  tagline: "Understanding Washington. Anticipating the Middle East.",
  city: "Washington, D.C.",
} as const;

export type SitePath = "/" | "/about" | "/workshops" | "/whom-we-serve";

export type NavItem = {
  label: string;
  to: SitePath;
  hash?: string;
};

export const NAV_LINKS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Our Expertise", to: "/", hash: "expertise" },
  { label: "Our Workshops", to: "/workshops" },
  { label: "Whom We Serve", to: "/whom-we-serve" },
  { label: "About Us", to: "/about" },
];

export const FOOTER_LINKS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
];

export const ASSETS = {
  heroVideoDesktop: "/assets/hero-desktop.mp4",
  heroVideoMobile: "/assets/hero-mobile.mp4",
  heroPoster: "/assets/hero-poster.jpg",
  heroPosterMobile: "/assets/hero-poster-mobile.jpg",
  founderPortrait: "/assets/founder-portrait.jpg",
  colonnade: "/assets/washington-dc-colonnade.png",
  rowHouses: "/assets/washington-dc-rowhouses.png",
  galleryCapitol: "/assets/gallery-01-capitol.jpg",
  galleryUsUae: "/assets/gallery-02-us-uae.jpg",
  galleryHormuz: "/assets/gallery-03-hormuz.jpg",
  galleryElection2028: "/assets/gallery-04-election-2028.jpg",
  logoWhite: "/assets/logo-wa-white.png",
  logoBrand: "/assets/logo-wa-brand.png",
  workshopCapitolMeeting: "/assets/workshop-01-capitol-meeting.jpg",
  workshopMapBriefing: "/assets/workshop-02-map-briefing.jpg",
  workshopPort: "/assets/workshop-03-port.jpg",
  workshopGulfModel: "/assets/workshop-04-gulf-model.jpg",
} as const;

export const PAGE_META = {
  about: {
    title: "About Washington Analytica | Advisory Firm in Washington, D.C.",
    description:
      "Washington Analytica is a Washington, D.C. advisory firm built on two ideas: navigating American government is a learnable skill, and understanding the Middle East requires disciplined analysis.",
  },
  workshops: {
    title: "Our Workshops | Washington Analytica",
    description:
      "Interactive workshops on how Washington really works, emerging U.S. foreign policy toward the Middle East, regional geopolitical risk, and Gulf sovereign wealth fund dynamics.",
  },
  whomWeServe: {
    title: "Whom We Serve | Washington Analytica",
    description:
      "Washington Analytica serves corporations, diplomats, media outlets and international organizations, investment firms, and government relations professionals.",
  },
} as const;
