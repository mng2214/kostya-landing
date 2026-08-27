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
  /** Services with a page of their own; the rest live on the category page. */
  hasPage?: boolean;
  body?: string[];
  includes?: string[];
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
        hasPage: true,
        body: [
          "A refrigerator that stops holding temperature is the one repair that cannot wait — the cost of the food inside often exceeds the cost of the visit.",
          "Most cooling failures come down to a handful of causes: a failed start relay or compressor, a blocked defrost cycle icing the evaporator, dirty condenser coils, or a door seal that no longer closes. All four are diagnosable on site.",
        ],
        includes: [
          "Not cooling or cooling intermittently",
          "Ice build-up in the freezer compartment",
          "Water pooling under or inside the unit",
          "Compressor, start relay and thermostat faults",
          "Door seal replacement and alignment",
        ],
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
        hasPage: true,
        body: [
          "Washers and dryers fail in predictable ways, and most of those failures are worth repairing well before the machine is worth replacing.",
          "A dryer that runs but does not heat is usually an element or thermal fuse. A washer that will not drain is usually a pump or a blocked filter. Neither justifies a new machine.",
        ],
        includes: [
          "Washer will not drain or spin",
          "Drum bearing noise and vibration",
          "Dryer runs but does not heat",
          "Dryer vent cleaning and airflow",
          "Door latch, lid switch and control faults",
        ],
      },
      {
        slug: "dishwasher-repair",
        title: "Dishwasher repair",
        short: "Leaks, poor cleaning, drainage faults and pump failures.",
        icon: "utensils",
        hasPage: true,
        body: [
          "A dishwasher that leaks is doing quiet damage to the cabinet and floor underneath it long before the puddle reaches the room.",
          "Poor cleaning results are rarely the detergent. More often it is a blocked spray arm, a failing circulation pump, or an inlet valve that is not filling the machine properly.",
        ],
        includes: [
          "Leaking from the door or underneath",
          "Dishes coming out dirty or filmed",
          "Not draining at the end of the cycle",
          "Circulation and drain pump replacement",
          "Inlet valve and float switch faults",
        ],
      },
      {
        slug: "oven-stove-repair",
        title: "Oven, stove, range and cooktop repair",
        short: "Heating faults, ignition problems, controls and burners.",
        icon: "cooking-pot",
        hasPage: true,
        body: [
          "Cooking equipment failures fall into two groups: it does not heat, or it does not heat accurately. The second is the one people live with for months without realising it.",
          "Gas and electric, freestanding and built-in, including induction cooktops and wall ovens.",
        ],
        includes: [
          "Oven not reaching or holding temperature",
          "Burner will not ignite or clicks continuously",
          "Bake and broil element replacement",
          "Control board and thermostat calibration",
          "Induction and glass cooktop faults",
        ],
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
        hasPage: true,
        body: [
          "An air conditioner that needs refrigerant every summer does not need refrigerant — it has a leak. Topping it up annually is a subscription to a problem, not a repair.",
          "Weak airflow and short cycling are usually inexpensive to fix and expensive to ignore, because both make the compressor work harder than it was designed to.",
        ],
        includes: [
          "Refrigerant leak detection and repair",
          "Condenser and compressor service",
          "Capacitor and contactor replacement",
          "Evaporator coil cleaning",
          "Thermostat diagnosis and replacement",
        ],
      },
      {
        slug: "heating-furnace-repair",
        title: "Heating and furnace repair",
        short: "No heat, ignition faults, blower problems and safety checks.",
        icon: "flame",
        hasPage: true,
        body: [
          "Chicago winters are unforgiving on older equipment, and a no-heat call in January is an emergency rather than an inconvenience.",
          "Most no-heat failures trace to the ignitor, the flame sensor, the inducer motor or a control board — all repairable, all much cheaper than a replacement furnace.",
        ],
        includes: [
          "No heat or intermittent heating",
          "Hot-surface ignitor and flame sensor",
          "Inducer and blower motor replacement",
          "Control board diagnosis",
          "Combustion and safety inspection",
        ],
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

/** Services that get a page of their own, rather than a card on a category page. */
export const pagedServices = allServices.filter((s) => s.hasPage);

/**
 * Equipment we service. Kept explicit because "all appliances" answers nothing
 * — a visitor is looking for their specific machine.
 */
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
      cta: { label: "Book a repair", to: "/book" },
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
  title: "Book a service call",
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
  headline: "Book a service call",
  body: "Pick a time that works. You will get a confirmation and a technician assigned to the job.",
  provider: "Housecall Pro",
} as const;

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
  home: {
    title: "Appliance & HVAC Repair in Chicago — USA Appliance & HVAC",
    description:
      "Appliance and HVAC diagnostics, repair, installation and maintenance across Chicago and surrounding areas. Residential and commercial. Book online.",
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
      "Call 224 360-1633 or book online. Appliance and HVAC service for residential and commercial customers across Chicago and surrounding areas.",
  },
  book: {
    title: "Book Online — USA Appliance & HVAC",
    description:
      "Pick a time for appliance or HVAC service in Chicago and the surrounding areas. Residential and commercial customers welcome.",
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
