# Kostya Inc — design system

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
| `--color-brand-500` | `#5174ff` | Primary action, accents |
| `--color-brand-600` | `#4353ff` | Hover / pressed |
| `--color-brand-50` | `#f1f4ff` | Tinted surfaces, icon wells |
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
