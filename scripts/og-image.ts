/**
 * Generates the social-share card (public/og.png, 1200x630) and the favicon.
 *
 * Typography only — no photography. When real photos land, swap this for a
 * designed card; the meta tags already point at /og.png either way.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

import { company, services } from "../src/content";

const OUT = path.resolve(import.meta.dir, "../public");
const BRAND = "#5174ff";
const INK = "#0b0b0f";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif";

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="10" fill="${BRAND}"/>

  <!-- soft brand wash, bottom right -->
  <circle cx="1120" cy="600" r="300" fill="${BRAND}" opacity="0.08"/>
  <circle cx="1180" cy="120" r="180" fill="${BRAND}" opacity="0.06"/>

  <text x="80" y="128" font-family="${FONT}" font-size="40" font-weight="800"
        letter-spacing="-1" fill="${INK}">KOSTYA<tspan fill="${BRAND}">INC</tspan></text>

  <text x="80" y="270" font-family="${FONT}" font-size="76" font-weight="800"
        letter-spacing="-3" fill="${INK}">Handyman, HVAC &amp;</text>
  <text x="80" y="352" font-family="${FONT}" font-size="76" font-weight="800"
        letter-spacing="-3" fill="${BRAND}">appliance repair</text>

  <text x="80" y="424" font-family="${FONT}" font-size="30" font-weight="400" fill="#4a4e5a">
    Rolling Meadows &amp; Chicago&#8217;s northwest suburbs
  </text>

  <line x1="80" y1="478" x2="1120" y2="478" stroke="#e6e6ec" stroke-width="2"/>

  <text x="80" y="530" font-family="${FONT}" font-size="26" font-weight="600" fill="${INK}">
    ${esc(company.phone)}
  </text>
  <text x="80" y="574" font-family="${FONT}" font-size="22" font-weight="400" fill="#4a4e5a">
    Fixed written estimates &#183; 24/7 emergency &#183; 1-year labour warranty
  </text>

  <text x="1120" y="530" text-anchor="end" font-family="${FONT}" font-size="22"
        font-weight="600" fill="${BRAND}">${services.length} service lines</text>
</svg>`;

await sharp(Buffer.from(card)).png().toFile(path.join(OUT, "og.png"));

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="${BRAND}"/>
  <text x="32" y="45" text-anchor="middle" font-family="${FONT}" font-size="38"
        font-weight="800" fill="#ffffff">K</text>
</svg>`;

fs.writeFileSync(path.join(OUT, "favicon.svg"), favicon);
await sharp(Buffer.from(favicon)).resize(180, 180).png().toFile(path.join(OUT, "apple-touch-icon.png"));

console.log("og-image: og.png, favicon.svg, apple-touch-icon.png");
