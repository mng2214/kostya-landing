# Source images

Originals as generated. **Nothing here is served to the browser.** The site
loads the cropped and resized copies in `src/assets/photos/`, plus
`public/og-cover.jpg` for the social preview.

Naming: `<slot>__<source WxH>.jpeg`. The size in the name is the size of *this
file*, not the size it is used at — the build crops each one to the ratio its
slot needs.

## In use

| Source file | Installed as | Used at | Where it appears |
|---|---|---|---|
| `hero-technician__1088x976.jpeg` | `src/assets/photos/hero-technician.jpg` | 1800×1620 | Home, hero |
| `why-us-technician__1088x976.jpeg` | `src/assets/photos/why-us-technician.jpg` | 1400×1260 | Home, "Why choose us" |
| `about-crew__896x1200.jpeg` | `src/assets/photos/about-crew.jpg` | 800×1067 | About block, left |
| `about-van__896x1200.jpeg` | `src/assets/photos/about-van.jpg` | 800×1067 | About block, right |
| `service-refrigerator-repair__928x1152.jpeg` | `src/assets/photos/service-refrigerator-repair.jpg` | 1000×1250 | `/appliance-repair/refrigerator-repair` |
| `service-washer-dryer-repair__928x1152.jpeg` | `src/assets/photos/service-washer-dryer-repair.jpg` | 1000×1250 | `/appliance-repair/washer-dryer-repair` |
| `service-dishwasher-repair__928x1152.jpeg` | `src/assets/photos/service-dishwasher-repair.jpg` | 1000×1250 | `/appliance-repair/dishwasher-repair` + Appliance panel |
| `service-oven-stove-repair__928x1152.jpeg` | `src/assets/photos/service-oven-stove-repair.jpg` | 1000×1250 | `/appliance-repair/oven-stove-repair` |
| `service-air-conditioning-repair__928x1152.jpeg` | `src/assets/photos/service-air-conditioning-repair.jpg` | 1000×1250 | `/hvac-services/air-conditioning-repair` + HVAC panel |
| `service-heating-furnace-repair__928x1152.jpeg` | `src/assets/photos/service-heating-furnace-repair.jpg` | 1000×1250 | `/hvac-services/heating-furnace-repair` + Installation panel |
| `service-commercial__928x1152.jpeg` | `src/assets/photos/service-commercial.jpg` | 1000×1250 | Commercial panel on the home selector |
| `og-cover__1376x768.jpeg` | `public/og-cover.jpg` | 1200×630 | Link preview in social apps and messengers |
| `favicon-mark__1024x1024.jpeg` | `public/favicon-32.png`, `favicon-512.png`, `apple-touch-icon.png` | 32 / 512 / 180 | Browser tab, bookmarks, phone home screen |

## Not used

Kept for reference only. The first three show trades the company does not
offer — putting them on the site would advertise services that do not exist.

| File | Why not |
|---|---|
| `unused__drywall-patching__928x1152.jpeg` | Handyman work — from the previous brand |
| `unused__electrical-gfci-outlet__928x1152.jpeg` | Electrical — from the previous brand |
| `unused__plumbing-under-sink__928x1152.jpeg` | Plumbing — from the previous brand |
| `unused__contact-sheet-grid__1088x976.jpeg` | A grid of thumbnails, not a usable frame |

The favicon source is cropped tight to its frame before resizing — the generated image had a wide white margin, and at 32px every wasted pixel of padding costs legibility. The white *outside* the frame is made transparent; the white inside it is part of the mark. The Apple icon keeps a solid white ground, because iOS composites transparency onto black.

## Adding a new one

1. Generate with `scripts/gen-photos.py` (prompts and ratios live there), or by
   hand using the prompts in `PHOTOS.md`.
2. Drop the original here with the same naming pattern.
3. Put the cropped copy in `src/assets/photos/<slot>.jpg` — the filename *is*
   the wiring, `src/lib/photos.ts` picks it up at build time with no import to
   add. A slot with no file falls back to a tinted placeholder, so the site is
   never broken mid-way.
