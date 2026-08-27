# USA Appliance & HVAC — design system

## Scene
A homeowner standing in a cold basement at 9pm in January, phone in hand,
furnace dead. The page has to read as *competent and already awake* — not
cheerful, not corporate. Closer to a well-made tool than a brochure.

## Color strategy: committed
The brand indigo carries identity; a near-black ink carries authority. One
section is fully drenched in ink so the page has a spine instead of being
blue-accents-on-white the whole way down.

| Token | Value | Role |
|---|---|---|
| `--color-brand-500` | `#22409c` | Primary action, accents — 9.2:1 with white |
| `--color-brand-600` | `#1a3080` | Hover / pressed |
| `--color-brand-50` | `#eef1fb` | Tinted surfaces, icon wells |
| `--color-brand-400` | `#7c93e8` | Accents on ink sections — 6.7:1 on `--color-ink` |
| `--color-ink` | `#0b0b0f` | Body text, drenched sections |
| `--color-ink-muted` | `#4a4e5a` | Secondary text (≥4.5:1 on white) |
| `--color-surface` | `#f7f7f7` | Section alternation |
| `--color-surface-alt` | `#f1f1f7` | Second alternation step |

Deliberately NOT used: the home-services reflex palette (professional blue +
urgent orange). Trades sites all look like that; this one shouldn't.

## Typography
One family, two personalities — `Archivo`, a variable grotesque drawn for
signage and highlight use.

- **Display**: Archivo at width 118–125, weight 700–800. Wide, structural,
  slightly industrial. Letter-spacing floor `-0.03em`.
- **Body / UI**: Archivo at normal width, 400–600.

Pairing two *different* geometric sans-serifs is the usual mistake; using one
family across its width axis gets contrast without mismatch.

## Shape

Actions are square: `--radius-action: 8px` on every button, icon button and
tag chip. Not a true 0 — sharp corners on a 48px control read as a rendering
defect rather than a decision.

Deliberately still round: avatar and initial circles, check bullets, review
progress bars, decorative blur blobs, and the chat launcher with its pulse
rings — a square bubble emitting circular rings looks broken.

The earlier accent `#5174ff` was only **3.97:1** against white, below the AA
floor for the white button labels sitting on it. The current `#22409c` is
9.2:1, so the primary action is now legible by measurement rather than by hope.

## Rhythm
Spacing scale 4/8. Section padding steps `py-16` → `py-24` → `py-28`; the
drenched section gets the largest. Content max-width 1240px, prose capped at
68ch.

## Motion
Entrance reveals are staggered per-list, not applied uniformly to every
section. Exponential ease-out (`[0.22, 1, 0.36, 1]`), 400–600ms.
`prefers-reduced-motion` collapses everything to a crossfade.

## Rules this project follows
- The `//` kicker is a brand device, used on at most two sections per page —
  not an eyebrow above every heading.
- Numbered markers appear only on the service process, which is a genuine
  ordered sequence.
- No gradient text, no glassmorphism, no side-stripe borders.
- Every icon is Lucide. No emoji.
