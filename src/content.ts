/**
 * Single source of truth for every piece of copy on the site.
 *
 * Contact details are real. Anything still unverified is marked
 * TODO(real-data) — those must be settled before launch, and a few of them
 * (address, hours, review counts) affect the schema.org output.
 */

export const company = {
  name: "USA Appliance & HVAC",
  logo: { main: "USA", accent: "Appliance & HVAC" },
  tagline: "Appliance & HVAC repair, installation and maintenance",
  /** Shown on the page. */
  phone: "224 360-1633",
  /** Dialled. Must stay international or mobile browsers mis-parse it. */
  phoneHref: "tel:+12243601633",
  /** E.164, for schema.org telephone. */
  phoneE164: "+12243601633",
  email: "usappliancehvac@gmail.com",
  emailHref: "mailto:usappliancehvac@gmail.com",
  addressShort: "Chicago, IL",
  /** Service-area business: no storefront address published. */
  address: "Chicago and surrounding areas",
  mapHref: "https://www.google.com/maps/search/?api=1&query=Chicago+IL",
  // TODO(real-data): confirm published hours and emergency availability
  hours: "Mon – Sat, 8:00 AM – 6:00 PM",
  serviceArea: "Chicago and surrounding areas",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/usaappliancehvac", icon: "instagram" },
    // wa.me takes the number in international format, digits only.
    { label: "WhatsApp", href: "https://wa.me/12243601633", icon: "whatsapp" },
  ],
} as const;

export const nav = [
  { label: "Home", to: "/" },
  { label: "Appliance Repair", to: "/appliance-repair" },
  { label: "HVAC Services", to: "/hvac-services" },
  { label: "Installation", to: "/installation" },
  { label: "Commercial", to: "/commercial-services" },
] as const;

export const navDropdown = {
  label: "More",
  items: [
    { label: "Service Areas", to: "/service-areas" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
} as const;

export const hero = {
  title: ["Reliable appliance and HVAC", "services in Chicago"],
  body: "Professional diagnostics, repair, installation and maintenance for residential and commercial customers across Chicago and the surrounding areas.",
};

export const about = {
  title: "Appliance and HVAC work, handled by one company",
  body: [
    "USA Appliance & HVAC has spent seven years on appliance and HVAC equipment across Chicago and the surrounding areas — residential kitchens and laundry, and the professional-grade refrigeration and cooking equipment that restaurants and managed property run on.",
    "We help residential and commercial customers diagnose equipment problems, understand their repair options, and restore comfort and functionality as quickly as possible.",
  ],
  cta: { label: "About us", to: "/about" },
  stats: [
    // TODO(real-data): confirm before launch — these drive trust, so they
    // must be defensible if a customer asks.
    { value: "7+ years", label: "On Chicago equipment" },
    { value: "Residential", label: "& commercial customers" },
    { value: "All major", label: "Brands serviced" },
  ],
};

export const process = {
  title: "How a service call works",
  steps: [
    {
      n: "01",
      title: "Book or call",
      body: "Pick a time online, or call and we will find the first opening that works.",
    },
    {
      n: "02",
      title: "Diagnosis",
      body: "A technician identifies the fault and explains what is wrong in plain terms.",
    },
    {
      n: "03",
      title: "Your options",
      body: "You get the repair cost, and an honest answer on whether repair or replacement makes sense.",
    },
    {
      n: "04",
      title: "Repair",
      body: "Most jobs are completed on the first visit with parts carried on the van.",
    },
  ],
};

export const whyUs = {
  title: "Why choose USA Appliance & HVAC",
  points: [
    {
      title: "Seven years on professional-grade equipment",
      body: "Not just home appliances — commercial refrigeration, walk-in coolers and restaurant cooking equipment have been part of the work from the start.",
    },
    {
      title: "Appliance and HVAC under one number",
      body: "A kitchen that needs a dishwasher fixed and a furnace serviced is one appointment, not two contractors.",
    },
    {
      title: "Residential and commercial",
      body: "From a home refrigerator to a restaurant line — the same crew, with the parts and access commercial work requires.",
    },
    {
      title: "Diagnosis before a quote",
      body: "We identify the actual fault first. You get the cost and a straight repair-or-replace recommendation before anything is ordered.",
    },
  ],
  cta: { label: "About us", to: "/about" },
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: string;
};

export type ServiceGroup = {
  slug: string;
  title: string;
  navLabel: string;
  short: string;
  intro: string[];
  icon: string;
  services: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "appliance-repair",
    navLabel: "Appliance Repair",
    title: "Appliance repair",
    short: "Diagnosis and repair for every major kitchen and laundry appliance.",
    icon: "washing-machine",
    intro: [
      "Replacing an appliance is usually the more expensive option, and often an unnecessary one. We diagnose the actual fault first and tell you what the repair costs before anything is ordered.",
      "Common parts are carried on the van, so most repairs are finished on the first visit.",
    ],
    services: [
      {
        slug: "appliance-diagnosis-repair",
        title: "Appliance diagnosis and repair",
        short: "A technician identifies the fault and quotes the repair before work begins.",
        icon: "search-check",
      },
      {
        slug: "refrigerator-repair",
        title: "Refrigerator and freezer repair",
        short: "Cooling failures, leaks, noisy compressors and failed defrost cycles.",
        icon: "refrigerator",
      },
      {
        slug: "ice-maker-repair",
        title: "Ice maker repair",
        short: "No ice, slow production, jams and water line leaks.",
        icon: "snowflake",
      },
      {
        slug: "washer-dryer-repair",
        title: "Washer and dryer repair",
        short: "Drainage, drum, bearing, heating and vent problems.",
        icon: "washing-machine",
      },
      {
        slug: "dishwasher-repair",
        title: "Dishwasher repair",
        short: "Leaks, poor cleaning, drainage faults and pump failures.",
        icon: "utensils",
      },
      {
        slug: "oven-stove-repair",
        title: "Oven, stove, range and cooktop repair",
        short: "Heating faults, ignition problems, controls and burners.",
        icon: "cooking-pot",
      },
      {
        slug: "appliance-installation",
        title: "Appliance installation and hookups",
        short: "Delivery-day installs, water lines, venting and levelling.",
        icon: "plug",
      },
    ],
  },
  {
    slug: "hvac-services",
    navLabel: "HVAC Services",
    title: "HVAC services",
    short: "Heating and cooling diagnosed, repaired and maintained.",
    icon: "wind",
    intro: [
      "Heating and cooling equipment rarely fails without warning — it gets louder, it short cycles, it stops holding a set temperature. Acting on those signs is far cheaper than an emergency call.",
      "We service and repair all major residential and commercial systems.",
    ],
    services: [
      {
        slug: "hvac-diagnosis-repair",
        title: "HVAC diagnosis and repair",
        short: "Finding the actual cause instead of treating the symptom.",
        icon: "search-check",
      },
      {
        slug: "air-conditioning-repair",
        title: "Air conditioning repair",
        short: "Weak airflow, short cycling, refrigerant leaks and failed compressors.",
        icon: "wind",
      },
      {
        slug: "heating-furnace-repair",
        title: "Heating and furnace repair",
        short: "No heat, ignition faults, blower problems and safety checks.",
        icon: "flame",
      },
      {
        slug: "hvac-installation",
        title: "HVAC installation",
        short: "Furnaces, condensers and ductless mini-split systems.",
        icon: "hard-hat",
      },
      {
        slug: "hvac-maintenance",
        title: "Preventive HVAC maintenance",
        short: "Seasonal service that catches failures before the season starts.",
        icon: "calendar-check",
      },
    ],
  },
  {
    slug: "installation",
    navLabel: "Installation",
    title: "Installation",
    short: "New equipment installed, connected and tested properly.",
    icon: "hard-hat",
    intro: [
      "A poor installation shortens the life of good equipment. Incorrect line-set sizing, an unlevel washer, a dryer venting into too much duct — each of these turns a fifteen-year appliance into a ten-year one.",
      "We install what we sell and what you supply, and we test it before we leave.",
    ],
    services: [
      {
        slug: "appliance-installation-hookups",
        title: "Appliance installation and hookups",
        short: "Refrigerators, washers, dryers, dishwashers, ranges and wall ovens.",
        icon: "plug",
      },
      {
        slug: "furnace-installation",
        title: "Furnace and heating installation",
        short: "High-efficiency replacements sized to the actual heat load.",
        icon: "flame",
      },
      {
        slug: "ac-installation",
        title: "Air conditioning installation",
        short: "Central systems and ductless mini-splits, including line-set work.",
        icon: "wind",
      },
      {
        slug: "commercial-equipment-installation",
        title: "Commercial equipment installation",
        short: "Kitchen and refrigeration equipment installed to spec.",
        icon: "store",
      },
    ],
  },
  {
    slug: "commercial-services",
    navLabel: "Commercial",
    title: "Commercial services",
    short: "Kitchen and refrigeration equipment kept running.",
    icon: "store",
    intro: [
      "Commercial equipment failure is not an inconvenience, it is lost revenue and, with refrigeration, lost stock. Response time is the entire service.",
      "We work with restaurants, cafés, retail and property managers across the Chicago area.",
    ],
    services: [
      {
        slug: "commercial-appliance-repair",
        title: "Commercial appliance repair",
        short: "Diagnosis and repair for commercial-grade equipment.",
        icon: "wrench",
      },
      {
        slug: "commercial-refrigeration",
        title: "Commercial refrigerator and freezer repair",
        short: "Walk-ins, reach-ins, prep tables and display cases.",
        icon: "refrigerator",
      },
      {
        slug: "commercial-kitchen-equipment",
        title: "Commercial kitchen equipment repair",
        short: "Ranges, fryers, ovens, dishmachines and holding equipment.",
        icon: "cooking-pot",
      },
      {
        slug: "commercial-maintenance",
        title: "Commercial preventive maintenance",
        short: "Scheduled service that keeps equipment out of the failure window.",
        icon: "calendar-check",
      },
    ],
  },
];

/** Flat index — used by routing, sitemap and the search-friendly listings. */
export const allServices: Array<Service & { group: string; groupSlug: string }> =
  serviceGroups.flatMap((g) =>
    g.services.map((s) => ({ ...s, group: g.title, groupSlug: g.slug })),
  );

/**
 * Equipment we service. Kept explicit because "all appliances" answers nothing
 * — a visitor is looking for their specific machine.
 */
/**
 * The service list — one source, two presentations.
 *
 * Desktop gets the expanding photo panels; touch gets these as cards with
 * product shots, because the panels rely on hover and have nothing to respond
 * to on a phone. Keeping both views on one array is the point: two lists would
 * drift apart the first time someone edits only one of them.
 *
 * "What can we help you with?"
 *
 * Added at the owner's request, for a concrete reason: customers assume the
 * crew only fixes washers and ring up to ask what else is covered. Six named
 * machines answer that before the phone call happens.
 *
 * Every entry points at a page that exists — no dead cards.
 */
export const helpWith = {
  kicker: "Our services",
  title: "What can we help you with?",
  body: "If your machine is not on this list, call and ask — the answer is usually yes.",
  items: [
    {
      title: "Refrigerator & freezer repair",
      slot: "help-refrigerator",
      panelSlot: "service-refrigerator-repair",
      note: "Not cooling, icing up, leaking",
      icon: "refrigerator",
      to: "/appliance-repair/refrigerator-repair",
    },
    {
      title: "Washer & dryer repair",
      slot: "help-washer-dryer",
      panelSlot: "service-washer-dryer-repair",
      note: "Will not drain, spin or heat",
      icon: "washing-machine",
      to: "/appliance-repair/washer-dryer-repair",
    },
    {
      title: "Dishwasher repair",
      slot: "help-dishwasher",
      panelSlot: "service-dishwasher-repair",
      note: "Leaks, poor cleaning, drainage",
      icon: "utensils",
      to: "/appliance-repair/dishwasher-repair",
    },
    {
      title: "Oven, stove & range repair",
      slot: "help-oven-range",
      panelSlot: "service-oven-stove-repair",
      note: "No heat, ignition, controls",
      icon: "cooking-pot",
      to: "/appliance-repair/oven-stove-repair",
    },
    {
      title: "HVAC repair & maintenance",
      slot: "help-hvac",
      panelSlot: "service-air-conditioning-repair",
      note: "Furnaces, A/C, mini-splits",
      icon: "wind",
      to: "/hvac-services",
    },
    {
      title: "Installation services",
      slot: "help-installation",
      panelSlot: "service-heating-furnace-repair",
      note: "Appliances, heating, cooling",
      icon: "hard-hat",
      to: "/installation",
    },
  ],
};

export const equipmentServiced = {
  title: "Appliances and HVAC systems we service",
  groups: [
    {
      label: "Kitchen",
      to: "/appliance-repair",
      items: [
        "Refrigerators & freezers",
        "Ice makers",
        "Dishwashers",
        "Ovens & wall ovens",
        "Ranges & stoves",
        "Cooktops & induction",
        "Range hoods",
        "Garbage disposals",
      ],
    },
    {
      label: "Laundry",
      to: "/appliance-repair",
      items: ["Washers", "Dryers", "Stacked units", "Dryer venting"],
    },
    {
      label: "HVAC",
      to: "/hvac-services",
      items: [
        "Gas furnaces",
        "Central air conditioning",
        "Ductless mini-splits",
        "Heat pumps",
        "Thermostats",
        "Ductwork",
      ],
    },
    {
      label: "Commercial",
      to: "/commercial-services",
      items: [
        "Walk-in coolers & freezers",
        "Reach-in refrigeration",
        "Prep tables & display cases",
        "Commercial ranges & fryers",
        "Dishmachines",
        "Rooftop units",
      ],
    },
  ],
};

export const segments = {
  title: "Residential and commercial",
  items: [
    {
      key: "residential",
      title: "Residential",
      body: "Houses, condos and apartments. Kitchen and laundry appliances, furnaces, air conditioning and ductless systems — diagnosed, repaired and maintained.",
      points: [
        "Same-day service across most of our area",
        "Repair-or-replace advice you can act on",
        "Parts for all major brands on the van",
      ],
      // Rendered by <BookButton>, which derives its own label; kept so the
      // two cards share one shape.
      cta: { label: "Request a call", to: "/book" },
    },
    {
      key: "commercial",
      title: "Commercial",
      body: "Restaurants, cafés, retail and managed property. Refrigeration, cooking equipment and rooftop HVAC, with preventive maintenance that keeps them out of the failure window.",
      points: [
        "Priority response on refrigeration",
        "Scheduled preventive maintenance",
        "Documented service history per site",
      ],
      cta: { label: "Talk to us", to: "/contact" },
    },
  ],
};

export const contactSection = {
  title: "Request a service call",
  body: "Tell us what the equipment is doing and we will come back with a time window. A sentence about the symptom is usually enough to bring the right part on the first visit.",
};

export const faqs = [
  {
    q: "How quickly can you come out?",
    a: "Same-day service is available across most of our area when you call early. Booking online shows you the real openings rather than a promise.",
  },
  {
    q: "Do you charge for diagnosis?",
    a: "Yes — there is a fee for the diagnostic visit, and you are told the exact amount before a technician is dispatched. Nobody arrives without you knowing what the visit costs.",
  },
  {
    q: "Do you work on commercial equipment?",
    a: "Yes — commercial refrigeration, cooking equipment and rooftop HVAC, including scheduled preventive maintenance for restaurants and managed property.",
  },
  {
    q: "Which brands do you service?",
    a: "All major appliance and HVAC manufacturers — from Whirlpool, LG and Samsung to Sub-Zero, Viking and Thermador, and from Carrier and Trane to ductless Mitsubishi systems. If yours is not named here, call and ask; the answer is usually yes.",
  },
  {
    q: "What areas do you cover?",
    a: "Chicago and the surrounding suburbs. If you are on the edge of our range we will tell you up front rather than adding a travel charge later.",
  },
  {
    q: "Is it worth repairing or should I replace it?",
    a: "That depends on the repair cost against the remaining life of the unit. We give you both numbers on site, and we will tell you when replacing is the better call.",
  },
];

export const finalCta = {
  title: ["Equipment down?", "Let's get it running."],
  body: "Appliance and HVAC service for homes and businesses across Chicago and the surrounding areas. Same crew, both trades, one number.",
};

export const footer = {
  blurb:
    "USA Appliance & HVAC — professional appliance and HVAC diagnostics, repair, installation and maintenance for residential and commercial customers across Chicago and the surrounding areas.",
  columns: [
    {
      title: "Services",
      links: [
        { label: "Appliance Repair", to: "/appliance-repair" },
        { label: "HVAC Services", to: "/hvac-services" },
        { label: "Installation", to: "/installation" },
        { label: "Commercial Services", to: "/commercial-services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", to: "/about" },
        { label: "Service Areas", to: "/service-areas" },
        { label: "Contact", to: "/contact" },
        { label: "Request service", to: "/book" },
      ],
    },
  ],
};

/**
 * Google Reviews — PLACEHOLDER until a Place ID exists.
 * Nothing here is published as schema.org aggregateRating: fabricated ratings
 * in structured data violate Google's policy and risk a manual action.
 */
export type GoogleReview = {
  author: string;
  initial: string;
  rating: number;
  when: string;
  text: string;
};

export const googleReviews: {
  kicker: string;
  title: string;
  placeId: string;
  profileUrl: string;
  rating: number;
  total: number;
  distribution: Array<{ stars: number; count: number }>;
  items: GoogleReview[];
} = {
  kicker: "Customer reviews",
  title: "What Chicago customers say",
  placeId: "", // TODO(real-data): Google Business Profile place_id
  profileUrl: "https://www.google.com/maps",
  rating: 0,
  total: 0,
  distribution: [],
  items: [],
};

export const crisp = {
  fallbackGreeting: "Hi! Tell us what the appliance is doing and we'll get you a time window.",
  fallbackName: "USA Appliance & HVAC",
  fallbackStatus: "Typically replies in a few minutes",
} as const;

/**
 * Housecall Pro online booking.
 * Set VITE_BOOKING_URL to the company's Housecall Pro booking link. Until then
 * every booking control falls back to the callback request modal, and the
 * button label follows suit — see lib/booking.ts.
 */
export const booking = {
  headline: "Request a service call",
  body: "Tell us what the equipment is doing and we come back with a time window. Residential and commercial, across Chicago and the surrounding areas.",
  provider: "Housecall Pro",
} as const;

/**
 * Privacy policy.
 *
 * Written from what the code actually does, not from a template: every
 * recipient named below is a service the site really calls — Formspree in
 * `lib/forms.ts`, Crisp in `lib/crisp.ts`, the Google Fonts stylesheet in
 * index.html, and Vercel as the host. If an integration is added or dropped,
 * this text is part of the change.
 *
 * There is deliberately no claim of GDPR or CCPA compliance and no invented
 * retention period. Saying less and meaning it is worth more than a longer
 * document that turns out to be false.
 *
 * TODO(legal): if the business is registered as an LLC, put the registered
 * name in `entity` — a policy naming the wrong controller is worse than none.
 * TODO(analytics): analytics and advertising tags are not installed today, and
 * the "Cookies" section says so. Update this text in the same commit that adds
 * them, not after.
 */
export const privacy = {
  updated: "September 2, 2026",
  entity: company.name,
  intro:
    "This page explains what information USA Appliance & HVAC collects when you use this website, why we collect it, and who else sees it. We are a small service company in Chicago — we collect what we need to answer you and do the work, and nothing else.",
  sections: [
    {
      heading: "Information you give us",
      body: [
        "You only give us information when you choose to contact us. Nothing on this site requires an account, and there is nothing to sign up for.",
      ],
      list: [
        "Service request form: your name, email address, phone number, the service you need and your message.",
        "Request a call: your name, phone number and the time of day you prefer to be called.",
        "Live chat: whatever you type into the chat window, and any contact details you give there.",
        "Calling or emailing us directly: your phone number or email address and what you tell us.",
      ],
    },
    {
      heading: "Information collected automatically",
      body: [
        "Like any website, this one leaves traces even if you never contact us.",
      ],
      list: [
        "Our hosting provider records standard server logs: IP address, browser and device type, the pages requested and when.",
        "The live chat widget stores a small identifier in your browser so a conversation survives a page reload, and its provider sees your IP address and browser details.",
        "Fonts are loaded from Google's font service, which means Google receives your IP address when a page loads.",
      ],
    },
    {
      heading: "How we use it",
      body: [
        "To reply to you, quote and schedule the work, carry it out, and keep ordinary records of jobs we have done. We also use it to reach you about an appointment already arranged.",
        "We do not send marketing email or text messages, and we do not add you to a mailing list.",
      ],
    },
    {
      heading: "Who else sees it",
      body: [
        "We do not sell or rent personal information, and we do not share it for anyone else's advertising. It reaches other companies only because they run parts of this site on our behalf:",
      ],
      list: [
        "Formspree — delivers the forms on this site to our email inbox.",
        "Crisp — provides the live chat window.",
        "Vercel — hosts the site and serves its pages.",
        "Google Fonts — serves the typeface the site is set in.",
      ],
      after: [
        "Each of those companies handles data under its own privacy terms. We may also disclose information where the law requires it.",
      ],
    },
    {
      heading: "Cookies",
      body: [
        "This site sets no advertising or analytics cookies. The only browser storage in use belongs to the live chat, which needs it to keep a conversation open across page loads.",
        "You can block or clear cookies in your browser settings; the chat will simply start fresh each time. If we add analytics or advertising tags later, this page will be updated before they go live.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "We keep enquiries and job records for as long as we need them to serve you and to keep normal business and tax records. Information held inside the services listed above is also subject to their own retention.",
        "If you want your details removed sooner, email us and we will delete what we are not required to keep.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Email or call using the details below and we will respond. Depending on where you live you may have further rights under local law; tell us and we will honour them.",
      ],
    },
    {
      heading: "Children",
      body: [
        "This site is meant for adults arranging appliance and HVAC work. We do not knowingly collect information from children under 13.",
      ],
    },
    {
      heading: "Security",
      body: [
        "The site is served over HTTPS and we limit who can read the enquiries that reach us. No website can promise perfect security, and we will not pretend otherwise.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "If this policy changes, the date at the top of the page changes with it. Material changes will be described here rather than made quietly.",
      ],
    },
  ],
};

export const site = {
  /*
   * The apex is canonical.
   *
   * Vercel is configured with www 308-redirecting to the apex, so this must
   * match: a canonical pointing at a URL that redirects is a needless hop and
   * tells crawlers one thing while the server does another. If the primary is
   * ever flipped back to www in Vercel, flip this line with it — they are one
   * decision, not two.
   */
  url: "https://usaappliancehvac.com",
  locale: "en_US",
  ogImage: "/og-cover.jpg",
  twitterHandle: "",
} as const;

/** Towns covered. Used for schema.org areaServed and the Service Areas page. */
export const serviceAreaTowns = [
  "Chicago",
  "Evanston",
  "Skokie",
  "Niles",
  "Park Ridge",
  "Des Plaines",
  "Franklin Park",
  "Schiller Park",
  "Mount Prospect",
  "Arlington Heights",
  "Palatine",
  "Schaumburg",
  "Rolling Meadows",
  "Hoffman Estates",
  "Elk Grove Village",
  "Buffalo Grove",
  "Wheeling",
  "Northbrook",
  "Glenview",
  "Morton Grove",
  "Oak Park",
  "Cicero",
  "Berwyn",
  "Naperville",
] as const;

/**
 * Structured facts for schema.org. Kept separate from marketing copy so the
 * machine-readable version and the human-readable version cannot drift.
 *
 * This is modelled as a service-area business: no storefront address is
 * published, which is the correct representation for a mobile service company.
 */
export const businessFacts = {
  legalName: "USA Appliance & HVAC",
  streetAddress: "", // TODO(real-data): only publish if there is a real office
  addressLocality: "Chicago",
  addressRegion: "IL",
  postalCode: "",
  addressCountry: "US",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Debit Card",
  // TODO(real-data): confirm published hours
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  founded: "2019", // TODO(real-data): confirm the exact founding year
} as const;

export const advantages = [
  {
    title: "Seven years on professional-grade equipment",
    detail:
      "Not only home appliances: commercial refrigeration, walk-in coolers and restaurant cooking equipment have been part of the work from the start, which is why a domestic call and a restaurant call get the same technician.",
  },
  {
    title: "Appliance and HVAC under one number",
    detail:
      "Most households and businesses keep separate contractors for appliances and for heating and cooling. We cover both, so one call handles a kitchen and a furnace.",
  },
  {
    title: "Residential and commercial",
    detail:
      "The same crew works on home kitchens and on restaurant lines, with the parts access and scheduling commercial refrigeration demands.",
  },
  {
    title: "Diagnosis before a quote",
    detail:
      "We identify the fault first, then give you the repair cost. No estimate is offered before anyone has looked at the equipment.",
  },
  {
    title: "Honest repair-or-replace advice",
    detail:
      "If replacement is cheaper over the remaining life of the unit, we say so. Talking a customer into a doomed repair costs more in referrals than it earns in labour.",
  },
  {
    title: "Online booking",
    detail:
      "Pick a real opening yourself instead of waiting on hold. Calling still works if you would rather explain the problem to a person.",
  },
  {
    title: "All major brands",
    detail:
      "From Whirlpool and LG to Sub-Zero and Viking, and from Carrier and Trane to ductless Mitsubishi systems.",
  },
] as const;

/** Per-route metadata. Titles stay under ~60 chars, descriptions under ~155. */
export const seo = {
  privacy: {
    title: "Privacy Policy — USA Appliance & HVAC",
    description:
      "What information USA Appliance & HVAC collects on this website, why, and who else sees it. No tracking, no marketing lists.",
  },
  home: {
    title: "Appliance & HVAC Repair in Chicago — USA Appliance & HVAC",
    description:
      "Appliance and HVAC diagnostics, repair, installation and maintenance across Chicago and surrounding areas. Residential and commercial. Call or request a visit.",
  },
  about: {
    title: "About USA Appliance & HVAC — Chicago Service Company",
    description:
      "Professional appliance and HVAC repair, installation and maintenance for residential and commercial customers throughout Chicago and surrounding areas.",
  },
  applianceRepair: {
    title: "Appliance Repair in Chicago — Fridges, Washers, Ovens",
    description:
      "Refrigerator, washer, dryer, dishwasher, oven and cooktop repair across Chicago. Diagnosis before a quote, parts for all major brands on the van.",
  },
  hvacServices: {
    title: "HVAC Repair & Service in Chicago — Heating and Cooling",
    description:
      "Air conditioning and furnace repair, HVAC installation and preventive maintenance across Chicago and surrounding areas. Residential and commercial.",
  },
  installation: {
    title: "Appliance & HVAC Installation in Chicago",
    description:
      "Appliance hookups, furnace and air conditioning installation, ductless mini-splits and commercial equipment — installed to spec and tested.",
  },
  commercial: {
    title: "Commercial Appliance & Refrigeration Repair — Chicago",
    description:
      "Commercial refrigeration, kitchen equipment and rooftop HVAC repair with scheduled preventive maintenance for Chicago restaurants and property managers.",
  },
  serviceAreas: {
    title: "Service Areas — Chicago and Surrounding Suburbs",
    description:
      "USA Appliance & HVAC covers Chicago and the surrounding suburbs for appliance and HVAC repair, installation and maintenance.",
  },
  contact: {
    title: "Contact USA Appliance & HVAC — Chicago",
    description:
      "Call 224 360-1633 or send a request. Appliance and HVAC service for residential and commercial customers across Chicago and surrounding areas.",
  },
  book: {
    title: "Request Service — USA Appliance & HVAC, Chicago",
    description:
      "Request appliance or HVAC service in Chicago and the surrounding areas. Call or send the form and we come back with a time window.",
  },
  notFound: {
    title: "Page Not Found — USA Appliance & HVAC",
    description:
      "That page does not exist. Browse appliance and HVAC services, or call 224 360-1633.",
  },
};

/** seo entry for each service category page, keyed by group slug. */
export const groupSeo: Record<string, { title: string; description: string }> = {
  "appliance-repair": seo.applianceRepair,
  "hvac-services": seo.hvacServices,
  installation: seo.installation,
  "commercial-services": seo.commercial,
};
