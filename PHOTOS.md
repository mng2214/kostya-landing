# Photography brief — USA Appliance & HVAC

Ten image slots, plus a map and a social preview. Every slot below lists the
exact aspect ratio the layout enforces, the export size (2× the largest
rendered width), and the filename to drop into `src/assets/photos/`.

Deliver **JPEG or WebP, sRGB, quality ~82**. Do not crop to a different ratio —
the layout crops with `object-fit: cover`, but off-ratio files waste bytes.

---

## The look

One sentence to hold in mind: **a competent crew already at work, photographed
by a journalist, not a company that hired models.**

| Do | Don't |
|---|---|
| Natural available light, window light, work lights | Studio strobes, white seamless backgrounds |
| Cool-neutral white balance (~5600K) | Warm orange grading, teal-and-orange HDR |
| Candid — the subject is doing the task | Posing, arms crossed, thumbs up, grin at camera |
| Real Midwestern housing: brick two-flats, finished basements, forced-air furnaces, detached garages, alley access | Generic sunny suburban stock houses, palm trees, Californian light |
| Worn but clean workwear, mismatched layers | Pristine matching corporate uniforms |
| 35–50mm look, f/2.8–f/4, mild depth of field | Ultra-wide distortion, heavy bokeh |
| Muted slate-blue / warm-grey palette | Saturated brand-blue props, colour-graded skies |

**Nothing readable in frame** — no logos, no signage, no brand marks on tools or
clothing. The site puts its own type over and next to these; competing text
fights it.

The palette exists to sit next to `#22409C` without arguing with it. Cool,
low-saturation frames make the accent read as the only colour on the page —
which is the whole point of the design.

---

## Coverage rule

Across the ten frames the three service lines must each be unmistakable at a
glance, because visitors scan images before they read headings:

- **HVAC** — slots 1, 4, 6, 7 (furnace board, condenser capacitor, ignitor,
  mini-split install). This is the largest share on purpose: it is the emergency
  work, and emergencies are what people search for at 9pm.
- **Kitchen & laundry appliances** — slot 8, shot in an actual kitchen with the
  dishwasher pulled out. Alternates for oven and refrigerator are listed there.
- **Handyman, electrical, plumbing** — slots 5, 9, 10.

Slots 2 and 3 carry the company itself rather than a trade.

## Slot list

| # | Slot | File | Ratio | Export | Where |
|---|---|---|---|---|---|
| 1 | Hero | `hero-technician.jpg` | 10:9 | **1800 × 1620** | Home, bleeds to viewport edge |
| 2 | Crew on site | `about-crew.jpg` | 3:4 | **800 × 1067** | About block, left, offset down |
| 3 | Van & tools | `about-van.jpg` | 3:4 | **800 × 1067** | About block, right |
| 4 | Technician at work | `why-us-technician.jpg` | 10:9 | **1400 × 1260** | "Why us" |
| 5 | Handyman repairs | `service-handyman-repairs.jpg` | 4:5 | **1000 × 1250** | `/services/handyman-repairs` |
| 6 | Furnace & heating | `service-furnace-heating.jpg` | 4:5 | **1000 × 1250** | `/services/furnace-heating` |
| 7 | Air conditioning | `service-hvac-repair.jpg` | 4:5 | **1000 × 1250** | `/services/hvac-repair` |
| 8 | Appliance repair | `service-appliance-repair.jpg` | 4:5 | **1000 × 1250** | `/services/appliance-repair` |
| 9 | Electrical & lighting | `service-electrical.jpg` | 4:5 | **1000 × 1250** | `/services/electrical` |
| 10 | Plumbing | `service-plumbing.jpg` | 4:5 | **1000 × 1250** | `/services/plumbing` |
| — | Social preview | `og-cover.jpg` | 1.91:1 | **1200 × 630** | optional, replaces generated `og.png` |
| — | Map | *(none)* | 21:8 | — | use a real Google Maps embed, not a picture |

The hero is the only image that loads eagerly and gets preloaded. Everything
else is `loading="lazy"`.

---

## Generation prompts

If you generate rather than shoot, prepend this **style block** to every prompt
and append the **negative block** after it.

**Style block**

```
Documentary editorial photograph, photorealistic. Natural available light,
cool-neutral white balance around 5600K. 35mm lens, f/2.8, mild depth of field.
Muted desaturated palette — slate blue, warm grey, worn metal. Subtle film
grain. Candid working moment, subject absorbed in the task and not aware of the
camera. Midwestern United States residential setting, late winter.
```

**Negative block**

```
--no text, letters, words, signage, logos, brand marks, watermarks,
posed smiling at camera, thumbs up, crossed arms, stock-photo styling,
white studio background, orange and teal grading, HDR, lens flare,
oversaturated colors, plastic skin, extra fingers, deformed hands, tool belts
worn as a costume
```

Aspect ratio flags: hero and "why us" `--ar 10:9`, About pair `--ar 3:4`,
service images `--ar 4:5`, social preview `--ar 1.91:1`.

---

### 1. `hero-technician.jpg` — 1800 × 1620, 10:9

```
A service technician in his forties kneeling beside an open high-efficiency gas
furnace in a finished residential basement, reading a multimeter clipped to the
control board. Ductwork and a water heater behind him, slightly out of focus.
He wears a dark grey work shirt with the sleeves pushed up, no branding. Cool
daylight falling from a small basement window on the left, mixed with the warm
pool of a clamp work light. He is looking at the meter, not at the camera.
Composition leaves clear negative space in the upper left.
```

*Why:* this is the first thing a stranger sees, and it has to answer "do these
people actually know how to do this". A meter reading beats a wrench pose. Leave
the upper-left quiet — the headline sits beside it and the image bleeds off the
right edge of the screen.

### 2. `about-crew.jpg` — 800 × 1067, 3:4

```
Two service technicians standing in the doorway of a Chicago brick two-flat,
mid-conversation about a clipboard one of them is holding. Vertical framing.
Late afternoon overcast light, bare trees and old snow on the walk behind them.
Working outerwear, unmatched. One is gesturing toward the interior of the house.
Neither is looking at the camera.
```

### 3. `about-van.jpg` — 800 × 1067, 3:4

```
Vertical shot into the open rear doors of a work van, showing organised shelving
with parts bins, coiled copper line set, a vacuum pump and a folded drop cloth.
A hand reaches in for a tool at the edge of frame. Grey daylight, wet asphalt of
an alley behind. Plain white van interior, no lettering or livery of any kind.
```

*Why:* an organised van is a real trust signal in this trade, and it needs no
face — cheap to shoot, and it carries the "we came prepared" claim.

### 4. `why-us-technician.jpg` — 1400 × 1260, 10:9

```
Close three-quarter view of a technician's hands seating a new capacitor into an
outdoor air-conditioning condenser, the access panel resting against the unit.
Shallow focus on the hands and the component. Behind, the blurred siding of a
suburban house and a patch of grey sky. Gloves off, the work is delicate.
```

### 5. `service-handyman-repairs.jpg` — 1000 × 1250, 4:5

```
Vertical frame of a person patching and sanding a drywall repair around a
doorway inside an occupied home — furniture edge and a rug visible, a drop cloth
underfoot. Dust hanging in the window light. Focus on the taping knife and the
patched surface.
```

### 6. `service-furnace-heating.jpg` — 1000 × 1250, 4:5

```
Vertical frame of a gas furnace with the front panel removed, the inducer motor
and hot-surface ignitor visible, a gloved hand steadying a replacement ignitor
into position. Cold basement light, exposed joists overhead. Emphasis on the
components rather than the person.
```

### 7. `service-hvac-repair.jpg` — 1000 × 1250, 4:5

```
Vertical frame of a wall-mounted ductless mini-split head being levelled during
installation in an older apartment with tall windows and plaster walls. A
technician's arms and a spirit level in frame, line set entering a neat wall
penetration. Cool daylight from the window.
```

### 8. `service-appliance-repair.jpg` — 1000 × 1250, 4:5

```
Vertical frame in a real family kitchen: a dishwasher pulled forward out from
under the counter with its lower access panel removed, a technician crouched
beside it with both hands on the circulation pump, a flashlight clamped to the
cabinet throwing light into the cavity. Shaker cabinets, a stone counter, a
kettle and a fruit bowl visible but soft at the edges of frame. Cool daylight
from a window off-frame left.
```

*Alternates, if you want more than one appliance frame:* a wall oven pulled out
of its cabinet with the control board exposed; or a refrigerator eased away from
the wall with the technician working on the condenser coils behind it. Same
kitchen, same light — shoot them in one visit.

### 9. `service-electrical.jpg` — 1000 × 1250, 4:5

```
Vertical frame of gloved hands wiring a GFCI outlet into a wall box in a
half-renovated kitchen, wire strippers and a voltage tester resting on the
counter beside it. Focus tight on the box and the conductors. Overcast light
from a window off-frame left.
```

### 10. `service-plumbing.jpg` — 1000 × 1250, 4:5

```
Vertical frame under a kitchen sink, shot from the cabinet opening: a technician
tightening a compression fitting on a supply line with a basin wrench, a towel
and a small pan catching drips. Work light throwing a hard shadow. Cramped,
real, slightly awkward angle.
```

### Optional — `og-cover.jpg` — 1200 × 630, 1.91:1

```
Wide horizontal establishing shot: a work van parked at the curb of a Chicago
residential street of brick two-flats on a grey winter afternoon, a technician
walking toward the house carrying a tool bag, seen from behind. Plain unmarked
van. Generous empty sky in the upper third.
```

*Why:* the social preview needs to survive a heavy text overlay and a 300px-wide
thumbnail. A wide establishing shot with empty sky does both.

---

## A note on generated vs. real

For a local trades business, real photographs of the actual crew, the actual van
and actual finished jobs outperform anything generated — that is the entire
proposition of a local service company, and prospects can usually tell. Generated
people are also awkward on a page that shows a Google rating right beneath them.

A practical split that costs almost nothing: shoot slots 2 and 3 (crew and van)
on a phone in twenty minutes, and generate slots 5–10, which are mostly hands
and equipment and where nobody's identity is being claimed.

---

## Handing them over

**Drop the files into `src/assets/photos/` using exactly the filenames above.
Nothing else is needed.** The wiring already exists: each slot looks itself up by
filename at build time, renders a real `<img>` when the file is there, and falls
back to the tinted panel when it is not. So photography can land one frame at a
time and the site is shippable at every point in between.

What you get for free per photo:

- `width`/`height` baked in from the table above, so nothing shifts as images load
- `loading="lazy"` everywhere except the hero, which is `eager` + `fetchpriority="high"`
  because it is the largest-contentful-paint element
- `alt` text already written for every slot
- Vite fingerprints the filename, so the files cache forever and still update on change

The one exception is the social preview: `og-cover.jpg` goes in `public/`, because
the meta tags reference it at a fixed path that must not change between builds.

Accepted formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`. Same basename either way.

## Generating them from here

`scripts/gen-photos.py` holds every prompt below in runnable form:

```bash
python3 scripts/gen-photos.py --list
python3 scripts/gen-photos.py --only hero-technician
python3 scripts/gen-photos.py --all           # Nano Banana Pro
python3 scripts/gen-photos.py --all --flash   # cheaper, faster
```

It reads `GEMINI_API_KEY` from `~/.claude/.env`, requests the nearest aspect ratio
the API supports, then centre-crops and resizes to the exact pixel size each slot
needs and writes progressive JPEG at quality 82 straight into `src/assets/photos/`.
A slot that fails does not stop the batch.
