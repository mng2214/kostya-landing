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
  allServices,
  equipmentServiced,
  groupSeo,
  process as processContent,
  seo,
  serviceAreaTowns,
  privacy,
  serviceGroups,
  site,
  whyUs,
} from "../src/content";
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  serviceGroupSchema,
  websiteSchema,
} from "../src/lib/schema";

const DIST = path.resolve(import.meta.dir, "../dist");
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Kept under 160 chars so search results don't truncate mid-sentence. */

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
      `Services: ${allServices.map((s) => s.title).join(", ")}.`,
      `Equipment serviced: ${equipmentServiced.groups.flatMap((g) => g.items).join(", ")}.`,
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
  ...serviceGroups.map((g): Route => ({
    path: `/${g.slug}`,
    ...groupSeo[g.slug],
    priority: 0.9,
    changefreq: "monthly",
    schema: [
      serviceGroupSchema(g.slug),
      breadcrumbSchema([{ name: g.navLabel, path: `/${g.slug}` }]),
      faqSchema(),
    ].filter(Boolean),
    summary: [
      `${g.title}: ${g.short}`,
      ...g.intro,
      `Includes: ${g.services.map((x) => `${x.title} — ${x.short}`).join(" ")}`,
    ],
  })),
  {
    path: "/service-areas",
    ...seo.serviceAreas,
    priority: 0.7,
    changefreq: "monthly",
    schema: [localBusinessSchema(), breadcrumbSchema([{ name: "Service Areas", path: "/service-areas" }])],
    summary: [`Towns covered: ${serviceAreaTowns.join(", ")}.`],
  },
  {
    path: "/book",
    ...seo.book,
    priority: 0.9,
    changefreq: "monthly",
    schema: [localBusinessSchema(), breadcrumbSchema([{ name: "Request Service", path: "/book" }])],
    summary: [`Request appliance or HVAC service, or call ${company.phone}.`],
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
  {
    // Low priority but deliberately indexable: ad reviewers and customers both
    // have to be able to reach it, and a noindex policy page reads as hiding.
    path: "/privacy",
    ...seo.privacy,
    priority: 0.3,
    changefreq: "yearly",
    schema: [breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy" }])],
    summary: [
      `Last updated ${privacy.updated}.`,
      privacy.intro,
      ...privacy.sections.map(
        (x) =>
          `${x.heading}: ${[...x.body, ...(("list" in x && x.list) || [])].join(" ")}`,
      ),
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
  /*
   * Strip everything this script is about to own.
   *
   * The shell in index.html carries its own og: and twitter: tags so the dev
   * server has something sane. Left in place they survived into every built
   * page alongside the generated ones — two og:image tags, and scrapers take
   * the first, which was the stale one. Per-route metadata has exactly one
   * author: this file.
   */
  html = html
    .replace(/\n?\s*<title>[\s\S]*?<\/title>/, "")
    .replace(/\n?\s*<meta\s+name="description"[\s\S]*?\/>/, "")
    .replace(/\n?\s*<meta\s+property="og:[^"]*"[^>]*\/>/g, "")
    .replace(/\n?\s*<meta\s+name="twitter:[^"]*"[^>]*\/>/g, "")
    .replace(/\n?\s*<link\s+rel="canonical"[^>]*\/>/g, "");

  html = html.replace("</head>", `  ${headFor(r)}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n      ${noscriptFor(r)}`);

  const outDir = r.path === "/" ? DIST : path.join(DIST, r.path);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  written++;
}

/*
 * A real 404 document.
 *
 * Without one, the catch-all rewrite answered every unknown URL with the home
 * page at HTTP 200 — a soft 404. Search engines treat that as duplicate
 * content and it hides genuine broken links. Vercel serves this file with a
 * real 404 status for anything that is not a generated route.
 */
{
  let html = base
    .replace(/\n?\s*<title>[\s\S]*?<\/title>/, "")
    .replace(/\n?\s*<meta\s+name="description"[\s\S]*?\/>/, "");
  html = html.replace(
    "</head>",
    `  <title>${esc(seo.notFound.title)}</title>
    <meta name="description" content="${esc(seo.notFound.description)}" />
    <meta name="robots" content="noindex, follow" />
  </head>`,
  );
  fs.writeFileSync(path.join(DIST, "404.html"), html);
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

> ${company.tagline} across ${company.serviceArea}. One company covers appliance diagnostics and repair, HVAC repair and installation, and commercial refrigeration and kitchen equipment — for residential and commercial customers, with online booking.

## Why ${company.name} over other contractors

${advantages.map((a) => `- **${a.title}.** ${a.detail}`).join("\n")}

## Services

${serviceGroups
  .map(
    (g) =>
      `### [${g.title}](${site.url}/${g.slug})\n\n${g.short}\n\n` +
      g.services.map((x) => `- ${x.title}: ${x.short}`).join("\n"),
  )
  .join("\n\n")}

## Equipment serviced

${equipmentServiced.groups.map((g) => `- **${g.label}**: ${g.items.join(", ")}`).join("\n")}

## Service area

${serviceAreaTowns.join(", ")} — Illinois. ${company.serviceArea}.

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
## Structured data

This site publishes schema.org markup as HomeAndConstructionBusiness and
HVACBusiness, including areaServed for every town listed above and an
OfferCatalog of all services. No aggregateRating is published: the review data
on the site is not yet connected to a real Google Business Profile.
See ${site.url}/ for the JSON-LD block.

## A note on accuracy

Contact details, service lines and service area on this page are current.
There is no published price list. Customer reviews and any company statistics
shown on the website are placeholders pending real data and must not be quoted
as fact.
`;

fs.writeFileSync(path.join(DIST, "llms-full.txt"), llmsFull);

console.log("seo-build: llms.txt, llms-full.txt");
