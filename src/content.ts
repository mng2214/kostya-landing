/**
 * Single source of truth for every piece of copy on the site.
 *
 * Contact details are real. Stats, reviews and testimonials are still
 * placeholders — replace them before this goes live.
 */

export const company = {
  name: "Kostya Inc",
  logo: { main: "KOSTYA", accent: "LOGO potom" },
  tagline: "Handyman, HVAC & appliance repair",
  phone: "+1 (786) 798-0765",
  phoneHref: "tel:+17867980765",
  email: "potompostavim@gmail.com",
  emailHref: "mailto:potompostavim@gmail.com",
  addressShort: "Rolling Meadows, IL",
  address: "5555 Chateau Dr, Rolling Meadows, IL",
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=5555+Chateau+Dr+Rolling+Meadows+IL",
  hours: "Mon – Sat, 7:00 AM – 8:00 PM · Emergency service 24/7",
  serviceArea: "Rolling Meadows, the NW suburbs and Chicago",
  socials: [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "X", href: "https://x.com", icon: "x" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  ],
} as const;

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Packages", to: "/packages" },
] as const;

export const navDropdown = {
  label: "Pages",
  items: [
    { label: "Services", to: "/services" },
    { label: "Service detail", to: "/services/hvac-repair" },
    { label: "Contact", to: "/contact" },
    { label: "404", to: "/this-page-does-not-exist" },
  ],
} as const;

export const hero = {
  kicker: "Let's get to work",
  title: ["Affordable home", "repair services"],
  body: "Handyman work, HVAC installs and appliance repair across Chicago — done right the first time, priced up front, no surprise line items.",
  primary: { label: "Get a Quote", to: "/contact" },
  secondary: { label: "View Services", to: "/services" },
};

export const quoteBar = {
  title: "Get in touch with our skilled expert today!",
  cta: { label: "Get a Quote", to: "/contact" },
};

export const about = {
  kicker: "Our company",
  title: "Over 20 years of experience in the field",
  body: [
    "Kostya Inc started as a one-van handyman operation on the North Side and grew into a full-service crew covering handyman work, HVAC and appliance repair.",
    "We are licensed and insured, we show up inside the window we promised, and we hand you a written estimate before a single tool comes out of the truck.",
  ],
  cta: { label: "About us", to: "/about" },
  stats: [
    { value: "20+", label: "Years in business" },
    { value: "1,500+", label: "Jobs completed" },
    { value: "24/7", label: "Emergency callouts" },
  ],
};

export const process = {
  kicker: "What to expect",
  title: "Easy 4-step efficient service process",
  cta: { label: "Get a Quote", to: "/contact" },
  steps: [
    {
      n: "01",
      title: "Consultation",
      body: "Call or send the form. We ask what broke, when, and what you've already tried.",
    },
    {
      n: "02",
      title: "Assessment",
      body: "A tech comes out, diagnoses the fault and gives you a fixed written price.",
    },
    {
      n: "03",
      title: "Execution",
      body: "We do the work with the parts we quoted, and we clean up after ourselves.",
    },
    {
      n: "04",
      title: "Follow-up",
      body: "We check back after a week and the labour stays under warranty for a year.",
    },
  ],
};

export const whyUs = {
  kicker: "Why us",
  title: "We're a professional team offering the best services",
  points: [
    {
      title: "20+ years across HVAC and handyman work",
      body: "Furnaces, condensers, dishwashers, drywall — the crew has seen the failure before.",
    },
    {
      title: "Parts and labour backed by a written warranty",
      body: "One year on labour, manufacturer coverage on every part we install.",
    },
    {
      title: "24/7 availability for heating and cooling",
      body: "A dead furnace in a Chicago January is not a next-week problem.",
    },
  ],
  cta: { label: "About us", to: "/about" },
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: string;
  body: string[];
  includes: string[];
  priceFrom: string;
};

export const services: Service[] = [
  {
    slug: "handyman-repairs",
    title: "General handyman repairs",
    short: "The backlog of small jobs, cleared in a single visit.",
    icon: "wrench",
    priceFrom: "$95 / hour",
    body: [
      "Doors that stick, shelves that were never anchored, a running toilet, a light switch that buzzes. Most homes have a list of these and no single trade that covers them.",
      "We book a half-day or full-day block and work down your list in priority order.",
    ],
    includes: [
      "Door, lock and hinge adjustment",
      "Shelving, TV and cabinet mounting",
      "Drywall patching and touch-up paint",
      "Caulking, grout and sealant work",
      "Minor plumbing and fixture swaps",
    ],
  },
  {
    slug: "furnace-heating",
    title: "Furnace & heating",
    short: "Installation, seasonal service and emergency heat restoration.",
    icon: "flame",
    priceFrom: "$149 diagnostic",
    body: [
      "Chicago winters are unforgiving on old equipment. We service every major furnace brand and install high-efficiency replacements when a repair no longer pencils out.",
      "Emergency no-heat calls are dispatched around the clock through the winter.",
    ],
    includes: [
      "No-heat emergency diagnosis",
      "Ignitor, blower and control board repair",
      "High-efficiency furnace installation",
      "Annual safety and combustion check",
      "Thermostat upgrade and setup",
    ],
  },
  {
    slug: "hvac-repair",
    title: "Air conditioning & HVAC",
    short: "Central air, mini-splits and ductwork — installed and maintained.",
    icon: "wind",
    priceFrom: "$149 diagnostic",
    body: [
      "Weak airflow and short cycling are usually cheap to fix and expensive to ignore. We diagnose the actual cause instead of topping off refrigerant and driving away.",
      "We install central systems and ductless mini-splits, including line-set and condensate work.",
    ],
    includes: [
      "Refrigerant leak detection and repair",
      "Condenser and compressor service",
      "Ductless mini-split installation",
      "Duct sealing and airflow balancing",
      "Spring tune-up and coil cleaning",
    ],
  },
  {
    slug: "appliance-repair",
    title: "Appliance repair",
    short: "Washers, dryers, fridges, ovens and dishwashers.",
    icon: "washing-machine",
    priceFrom: "$120 diagnostic",
    body: [
      "Replacing an appliance is often the more expensive option. We carry common parts for the major brands and finish most repairs on the first visit.",
      "If a repair is not worth the money, we will tell you that instead of selling you one.",
    ],
    includes: [
      "Refrigerator and freezer cooling faults",
      "Washer drain, drum and bearing repair",
      "Dryer heating elements and vent cleaning",
      "Oven, range and cooktop diagnostics",
      "Dishwasher leaks and pump replacement",
    ],
  },
  {
    slug: "electrical",
    title: "Electrical & lighting",
    short: "Fixtures, outlets, switches and panel-adjacent work.",
    icon: "zap",
    priceFrom: "$110 / hour",
    body: [
      "Light fixtures, ceiling fans, dimmers, dead outlets and GFCI protection where code now requires it.",
      "Anything that touches the service panel is handled by a licensed electrician on the crew.",
    ],
    includes: [
      "Fixture and ceiling fan installation",
      "Outlet, switch and dimmer replacement",
      "GFCI and AFCI protection",
      "Under-cabinet and recessed lighting",
      "Dedicated appliance circuits",
    ],
  },
  {
    slug: "plumbing",
    title: "Plumbing repairs",
    short: "Leaks, clogs, fixtures and water heaters.",
    icon: "droplets",
    priceFrom: "$110 / hour",
    body: [
      "Dripping fixtures and slow drains are the visible half of the problem; the hidden half is what a leak does to the subfloor over six months.",
      "We handle repairs and fixture replacement, and we install and service water heaters.",
    ],
    includes: [
      "Faucet, toilet and shower valve repair",
      "Drain clearing and camera inspection",
      "Garbage disposal replacement",
      "Water heater install and service",
      "Supply line and shutoff valve swaps",
    ],
  },
];

export const packages = {
  kicker: "Packages",
  title: "Straightforward pricing, no subscription games",
  body: "Every plan is billed once. Cancel any time — there is nothing to cancel, because we do not lock you into a contract.",
  plans: [
    {
      name: "Single visit",
      price: "$149",
      cadence: "per call-out",
      summary: "One problem, one tech, one fixed price.",
      features: [
        "Diagnostic waived if you approve the repair",
        "Written estimate before work starts",
        "1-year warranty on labour",
        "Next-business-day scheduling",
      ],
      cta: "Book a visit",
      featured: false,
    },
    {
      name: "Home care",
      price: "$390",
      cadence: "per year",
      summary: "Seasonal HVAC service plus priority scheduling.",
      features: [
        "Spring A/C and fall furnace tune-ups",
        "Priority dispatch on emergency calls",
        "15% off all parts and labour",
        "Free filter changes for the year",
        "1-year warranty on labour",
      ],
      cta: "Get covered",
      featured: true,
    },
    {
      name: "Property manager",
      price: "Custom",
      cadence: "per portfolio",
      summary: "Multi-unit coverage with consolidated invoicing.",
      features: [
        "Dedicated scheduling contact",
        "Consolidated monthly invoicing",
        "Turnover and make-ready punch lists",
        "Volume pricing on parts",
        "Documented service history per unit",
      ],
      cta: "Talk to us",
      featured: false,
    },
  ],
};

export const contactSection = {
  kicker: "Contact us",
  title: "Get a free consultation",
  body: "Tell us what is going on and we will come back with a time window and a ballpark. No call centre, no pressure.",
  fields: [
    { name: "name", label: "Name", type: "text", required: true, placeholder: "Jane Kowalski" },
    { name: "email", label: "Email", type: "email", required: true, placeholder: "jane@example.com" },
    { name: "phone", label: "Phone", type: "tel", required: false, placeholder: "(847) 555-0123" },
    { name: "service", label: "Service", type: "select", required: true, placeholder: "Choose a service" },
    { name: "message", label: "Message", type: "textarea", required: true, placeholder: "The furnace is short cycling and throwing a code…" },
  ],
};

export const faqs = [
  {
    q: "Do you charge for the estimate?",
    a: "A diagnostic visit is $149 and it is waived entirely if you approve the repair. Quotes over the phone are free but they are ballparks, not commitments.",
  },
  {
    q: "How fast can you get here?",
    a: "Standard scheduling is next business day. No-heat and no-cooling emergencies are dispatched 24/7, usually within four hours.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes — licensed in the State of Illinois and carrying general liability and workers' compensation coverage. Certificates available on request.",
  },
  {
    q: "What areas do you cover?",
    a: "Chicago proper and suburbs within roughly 40 miles. Anything further we will tell you up front rather than adding a travel surcharge later.",
  },
  {
    q: "What warranty do you offer?",
    a: "One year on our labour, plus whatever the manufacturer provides on parts we supply. Both are written on the invoice.",
  },
];

export const finalCta = {
  title: ["Having a problem?", "We'll fix it today!"],
  body: "Please feel free to contact us. We're happy to talk through the problem before you commit to anything.",
  primary: { label: "Get a Quote", to: "/contact" },
  secondary: { label: "View Services", to: "/services" },
};

export const footer = {
  blurb:
    "Kostya Inc — handyman, HVAC and appliance repair for Chicago and the surrounding suburbs. Licensed, insured, and on time.",
  columns: [
    {
      title: "Navigation",
      links: [
        { label: "Home", to: "/" },
        { label: "About", to: "/about" },
        { label: "Services", to: "/services" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "Packages", to: "/packages" },
        { label: "Privacy", to: "/contact" },
        { label: "Terms", to: "/contact" },
      ],
    },
  ],
};

/**
 * Google Reviews — PLACEHOLDER.
 * These numbers are stand-ins. To go live, either paste the Google Places
 * `place_id` below and fetch reviews server-side, or drop in an embed widget.
 * See src/lib/googleReviews.ts for the swap point.
 */
export const googleReviews = {
  kicker: "Google reviews",
  title: "Rated by Chicago homeowners",
  placeId: "", // TODO(real-data): Google Places place_id
  profileUrl: "https://www.google.com/maps",
  rating: 4.9,
  total: 312,
  distribution: [
    { stars: 5, count: 281 },
    { stars: 4, count: 22 },
    { stars: 3, count: 6 },
    { stars: 2, count: 2 },
    { stars: 1, count: 1 },
  ],
  items: [
    {
      author: "Brendan Buck",
      initial: "B",
      rating: 5,
      when: "2 weeks ago",
      text: "New furnace installed two days after the old one died. Quote matched the invoice to the dollar.",
    },
    {
      author: "Marisol Vega",
      initial: "M",
      rating: 5,
      when: "1 month ago",
      text: "Honest about which appliance was worth repairing. Rare and much appreciated.",
    },
    {
      author: "Danny Okafor",
      initial: "D",
      rating: 5,
      when: "1 month ago",
      text: "Eleven items off my list in one afternoon and the place was spotless afterwards.",
    },
    {
      author: "Priya Raman",
      initial: "P",
      rating: 4,
      when: "2 months ago",
      text: "Tricky mini-split install in an old building. Took longer than estimated but the finish is excellent.",
    },
  ],
} as const;

/**
 * Crisp live chat — PLACEHOLDER.
 * Set VITE_CRISP_WEBSITE_ID in .env to load the real widget.
 * Without it, a local stub bubble renders instead so the UI can be reviewed.
 */
export const crisp = {
  fallbackGreeting: "Hi! Tell us what broke and we'll get you a time window.",
  fallbackName: "Kostya Inc support",
  fallbackStatus: "Typically replies in a few minutes",
} as const;
