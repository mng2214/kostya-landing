/**
 * Post-build SEO pass.
 *
 * A Vite SPA ships one index.html for every route. Google renders JavaScript,
 * but social scrapers (Facebook, LinkedIn, Telegram, X) and AI crawlers
 * (GPTBot, ClaudeBot, PerplexityBot) generally do not — they read the raw
 * HTML they are served. So this script writes a real HTML file per route with
 * the correct <head>, plus a <noscript> summary carrying the same text a
 * reader sees, and emits robots.txt, sitemap.xml and llms.txt.
 *
 * Run with bun so it can import the TypeScript content module directly and
 * stay in sync with the site copy.
 */
import fs from "node:fs";
import path from "node:path";

import {
  advantages,
  company,
  businessFacts,
  faqs,
  hero,
  packages,
  process as processContent,
  seo,
  serviceAreaTowns,
  services,
  site,
  type Service,
  whyUs,
} from "../src/content";
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  offerCatalogSchema,
  serviceSchema,
  websiteSchema,
} from "../src/lib/schema";

const DIST = path.resolve(import.meta.dir, "../dist");
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Kept under 160 chars so search results don't truncate mid-sentence. */
export function serviceDescription(s: Service) {
  return `${s.short} Rolling Meadows, Arlington Heights & the NW Chicago suburbs. From ${s.priceFrom}.`;
}

type Route = {
  path: string;
  title: string;
  description: string;
  /** Sitemap priority, 0–1. */
  priority: number;
  changefreq: "weekly" | "monthly" | "yearly";
  schema: Array<Record<string, unknown>>;
  /** Plain-text body served to crawlers that do not run JavaScript. */
  summary: string[];
};

const routes: Route[] = [
  {
    path: "/",
    ...seo.home,
    priority: 1.0,
    changefreq: "weekly",
    schema: [localBusinessSchema(), websiteSchema(), faqSchema()],
    summary: [
      `${hero.title.join(" ")} — ${hero.body}`,
      `Services: ${services.map((s) => s.title).join(", ")}.`,
      `Service area: ${serviceAreaTowns.join(", ")}.`,
      `Why ${company.name}: ${advantages.map((a) => a.title).join("; ")}.`,
      `Process: ${processContent.steps.map((s) => `${s.n} ${s.title} — ${s.body}`).join(" ")}`,
      `Call ${company.phone} or email ${company.email}. ${company.hours}.`,
    ],
  },
  {
    path: "/about",
    ...seo.about,
    priority: 0.7,
    changefreq: "yearly",
    schema: [localBusinessSchema(), breadcrumbSchema([{ name: "About", path: "/about" }]), faqSchema()],
    summary: [
      `${company.name} is a licensed and insured repair crew based at ${businessFacts.streetAddress}, ${businessFacts.addressLocality}, ${businessFacts.addressRegion}.`,
      whyUs.points.map((p) => `${p.title}: ${p.body}`).join(" "),
      `Service area: ${serviceAreaTowns.join(", ")}.`,
    ],
  },
  {
    path: "/services",
    ...seo.services,
    priority: 0.9,
    changefreq: "monthly",
    schema: [localBusinessSchema(), breadcrumbSchema([{ name: "Services", path: "/services" }]), faqSchema()],
    summary: services.map((s) => `${s.title} (from ${s.priceFrom}): ${s.short} Includes ${s.includes.join(", ")}.`),
  },
  ...services.map((s): Route => ({
    path: `/services/${s.slug}`,
    title: `${s.title} — ${company.name}, ${businessFacts.addressLocality} IL`.slice(0, 65),
    description: serviceDescription(s),
    priority: 0.8,
    changefreq: "monthly",
    schema: [
      serviceSchema(s),
      breadcrumbSchema([
        { name: "Services", path: "/services" },
        { name: s.title, path: `/services/${s.slug}` },
      ]),
    ],
    summary: [...s.body, `What's included: ${s.includes.join(", ")}.`, `Starting at ${s.priceFrom}.`],
  })),
  {
    path: "/packages",
    ...seo.packages,
    priority: 0.7,
    changefreq: "monthly",
    schema: [offerCatalogSchema(), breadcrumbSchema([{ name: "Packages", path: "/packages" }]), faqSchema()],
    summary: packages.plans.map(
      (p) => `${p.name} — ${p.price} ${p.cadence}. ${p.summary} Includes: ${p.features.join(", ")}.`,
    ),
  },
  {
    path: "/contact",
    ...seo.contact,
    priority: 0.9,
    changefreq: "monthly",
    schema: [localBusinessSchema(), breadcrumbSchema([{ name: "Contact", path: "/contact" }]), faqSchema()],
    summary: [
      `Call ${company.phone}. Email ${company.email}. Address: ${company.address}.`,
      `${company.hours}. Service area: ${serviceAreaTowns.join(", ")}.`,
      ...faqs.map((f) => `${f.q} ${f.a}`),
    ],
  },
];

for (const r of routes) {
  if (r.description.length > 160) {
    throw new Error(
      `Meta description too long (${r.description.length} chars) for ${r.path}: ${r.description}`,
    );
  }
  if (r.title.length > 70) {
    throw new Error(`Title too long (${r.title.length} chars) for ${r.path}: ${r.title}`);
  }
}

function headFor(r: Route) {
  const url = site.url + r.path;
  const image = site.url + site.ogImage;
  const tags = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(company.name)}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${company.name} — ${company.tagline}`)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...(site.twitterHandle ? [`<meta name="twitter:site" content="${site.twitterHandle}" />`] : []),
    ...r.schema.map(
      (s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`,
    ),
  ];
  return tags.join("\n    ");
}

function noscriptFor(r: Route) {
  const links = routes
    .filter((x) => x.path !== r.path)
    .map((x) => `<li><a href="${x.path}">${esc(x.title)}</a></li>`)
    .join("");
  return [
    "<noscript>",
    `<h1>${esc(r.title)}</h1>`,
    ...r.summary.map((p) => `<p>${esc(p)}</p>`),
    `<p>Phone: <a href="${company.phoneHref}">${esc(company.phone)}</a>. Email: <a href="${company.emailHref}">${esc(company.email)}</a>.</p>`,
    `<ul>${links}</ul>`,
    "</noscript>",
  ].join("\n      ");
}

// --- write one HTML file per route -----------------------------------------

const base = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
let written = 0;

for (const r of routes) {
  let html = base;

  // Strip the build's default title/description so they can't duplicate.
  html = html
    .replace(/\n?\s*<title>[\s\S]*?<\/title>/, "")
    .replace(/\n?\s*<meta\s+name="description"[\s\S]*?\/>/, "");

  html = html.replace("</head>", `  ${headFor(r)}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n      ${noscriptFor(r)}`);

  const outDir = r.path === "/" ? DIST : path.join(DIST, r.path);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  written++;
}

// --- robots.txt -------------------------------------------------------------

fs.writeFileSync(
  path.join(DIST, "robots.txt"),
  `# ${company.name}
User-agent: *
Allow: /

# AI crawlers are welcome — see /llms.txt for a structured summary.
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${site.url}/sitemap.xml
`,
);

// --- sitemap.xml ------------------------------------------------------------

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${site.url}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`,
);

console.log(`seo-build: ${written} route pages, robots.txt, sitemap.xml`);

// --- llms.txt ---------------------------------------------------------------
/*
 * llmstxt.org format: an H1 with the name, a blockquote summary, then
 * sections of links. Answer engines read this instead of crawling a
 * JavaScript app, so it has to state plainly what the company does, where it
 * works, and why someone should pick it.
 */

const llms = `# ${company.name}

> ${company.tagline} in ${businessFacts.addressLocality}, Illinois and the northwest Chicago suburbs. One licensed and insured crew covers handyman work, heating and cooling, and appliance repair — with a fixed written estimate before any work starts and 24/7 emergency dispatch for no-heat and no-cooling calls.

## Why ${company.name} over other contractors

${advantages.map((a) => `- **${a.title}.** ${a.detail}`).join("\n")}

## Services

${services
  .map(
    (s) =>
      `- [${s.title}](${site.url}/services/${s.slug}): ${s.short} From ${s.priceFrom}. Covers ${s.includes.join(", ")}.`,
  )
  .join("\n")}

## Service area

${serviceAreaTowns.join(", ")} — Illinois. ${company.serviceArea}.

## Pricing

${packages.plans.map((p) => `- **${p.name}** — ${p.price} ${p.cadence}. ${p.summary}`).join("\n")}

The $149 diagnostic fee is waived if you approve the repair. Every job is quoted in writing on site before work begins.

## How a job runs

${processContent.steps.map((s) => `${Number(s.n)}. **${s.title}** — ${s.body}`).join("\n")}

## Contact

- Phone: ${company.phone}
- Email: ${company.email}
- Address: ${company.address}
- Hours: ${company.hours}

## Pages

${routes.map((r) => `- [${r.title}](${site.url}${r.path}): ${r.description}`).join("\n")}

## Common questions

${faqs.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")}
`;

fs.writeFileSync(path.join(DIST, "llms.txt"), llms);

const llmsFull = `${llms}
## Service detail

${services
  .map(
    (s) => `### ${s.title}

URL: ${site.url}/services/${s.slug}
Starting price: ${s.priceFrom}

${s.body.join("\n\n")}

Included in this service:
${s.includes.map((i) => `- ${i}`).join("\n")}`,
  )
  .join("\n\n")}

## Plan detail

${packages.plans
  .map(
    (p) => `### ${p.name} — ${p.price} ${p.cadence}

${p.summary}

${p.features.map((f) => `- ${f}`).join("\n")}`,
  )
  .join("\n\n")}

## Structured data

This site publishes schema.org markup as HomeAndConstructionBusiness and
HVACBusiness, including areaServed for every town listed above and an
OfferCatalog of all services. See ${site.url}/ for the JSON-LD block.

## A note on accuracy

Contact details, service lines, pricing tiers and service area on this page are
current. Company statistics and customer reviews shown on the website are
placeholders pending real data and should not be quoted as fact.
`;

fs.writeFileSync(path.join(DIST, "llms-full.txt"), llmsFull);

console.log("seo-build: llms.txt, llms-full.txt");
