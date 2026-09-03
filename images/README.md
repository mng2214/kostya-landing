# Source images

**Nothing here is served to the browser.** The site loads `src/assets/photos/`
plus `public/og-cover.jpg` for the social preview.

Only two files remain, because photography is now the client's to supply.
Every slot on the site ships a "your image here" placeholder instead of a
generated photo, and the placeholders carry their required pixel size in both
the filename and the picture, so nobody has to look anything up.

| File | Installed as | Why it stays |
|---|---|---|
| `why-us-chicago.jpg` | `src/assets/photos/why-us-chicago.jpg` | The skyline behind "Why choose us" — a stock city view, not something the client photographs |
| `favicon-mark__1024x1024.jpeg` | `public/favicon-32.png`, `favicon-512.png`, `apple-touch-icon.png` | The logo mark, not photography |

The favicon source is cropped tight to its frame before resizing — the generated
image had a wide white margin, and at 32px every wasted pixel of padding costs
legibility. The white *outside* the frame is made transparent; the white inside
it is part of the mark. The Apple icon keeps a solid white ground, because iOS
composites transparency onto black.

## Replacing a placeholder

Every file in `src/assets/photos/` is named `<slot>__<width>x<height>.jpg`.
**Save the new photo over the existing file, keeping its name**, and it appears
on the site — `src/lib/photos.ts` strips the `__WxH` suffix and matches on the
slot, so no code changes.

| File to replace | Where it appears |
|---|---|
| `hero-technician__1800x1620.jpg` | Home, the large photo beside the headline |
| `help-refrigerator__900x675.jpg` | Home, "What can we help you with?" card 1 |
| `help-washer-dryer__900x675.jpg` | Home, "What can we help you with?" card 2 |
| `help-dishwasher__900x675.jpg` | Home, "What can we help you with?" card 3 |
| `help-oven-range__900x675.jpg` | Home, "What can we help you with?" card 4 |
| `help-hvac__900x675.jpg` | Home, "What can we help you with?" card 5 |
| `help-installation__900x675.jpg` | Home, "What can we help you with?" card 6 |
| `service-refrigerator-repair__1000x1250.jpg` | Home, expanding panel (desktop) — refrigerators |
| `service-washer-dryer-repair__1000x1250.jpg` | Home, expanding panel (desktop) — washers and dryers |
| `service-dishwasher-repair__1000x1250.jpg` | Home, expanding panel (desktop) — dishwashers |
| `service-oven-stove-repair__1000x1250.jpg` | Home, expanding panel (desktop) — ovens and ranges |
| `service-air-conditioning-repair__1000x1250.jpg` | Home, expanding panel (desktop) — HVAC |
| `service-heating-furnace-repair__1000x1250.jpg` | Home, expanding panel (desktop) — installation |
| `about-crew__800x1067.jpg` | About block, left |
| `about-van__800x1067.jpg` | About block, right |

One image lives outside that folder:

| File to replace | Where it appears |
|---|---|
| `public/og-cover.jpg` — 1200 × 630 | The picture shown when the site is shared in Messenger, WhatsApp, Facebook or iMessage |

**Keep that filename exactly.** Unlike the photos above it is not matched by
slot: the path is written into `index.html` and `content.ts`, and the services
that render link previews cache it by URL. Until it is replaced, every shared
link shows "YOUR IMAGE HERE".

The size in the name is what the slot is displayed at. A larger file works and
is simply scaled down; a smaller one will look soft. Match the **aspect ratio** —
the image is cropped to fill its box, so a landscape photo dropped into a
portrait slot loses its sides.

The six `help-*` shots and the six `service-*` shots cover the same six
categories. They exist twice because the phone carousel wants a landscape
product shot and the desktop panel wants a tall one; the same photograph
cropped two ways is fine.

## Regenerating the placeholders

`python3 scripts/gen-placeholders.py` redraws all of them, reading the sizes
straight out of `PHOTO_SIZES` in `src/lib/photos.ts` so the two cannot drift.
Pass slot names to redraw only some. `why-us-chicago` is listed in `KEEP_REAL`
and is never overwritten.

If a slot has no file at all, the site falls back to a tinted panel with the
service icon rather than breaking — but the placeholder is the better state,
because it tells the client what is missing.
