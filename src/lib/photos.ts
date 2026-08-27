/**
 * Photo registry.
 *
 * Any file dropped into `src/assets/photos/` named after a slot below is
 * picked up at build time — no import to add, no component to edit. Slots with
 * no file fall back to the tinted placeholder panel, so the site is always in
 * a shippable state while photography trickles in.
 *
 * Vite fingerprints these, which is why they live in src/ rather than public/.
 * The only exception is the social preview (`public/og-cover.jpg`), which meta
 * tags reference by a stable path.
 */

const files = import.meta.glob("../assets/photos/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const bySlot: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  const slot = path.split("/").pop()!.replace(/\.[^.]+$/, "");
  bySlot[slot] = url;
}

export type PhotoSlot =
  | "hero-technician"
  | "about-crew"
  | "about-van"
  | "why-us-technician"
  | "service-refrigerator-repair"
  | "service-washer-dryer-repair"
  | "service-dishwasher-repair"
  | "service-oven-stove-repair"
  | "service-air-conditioning-repair"
  | "service-heating-furnace-repair"
  | "service-commercial";

/** Intrinsic size per slot, so <img> can reserve space and avoid layout shift. */
export const PHOTO_SIZES: Record<PhotoSlot, { width: number; height: number }> = {
  "hero-technician": { width: 1800, height: 1620 },
  "about-crew": { width: 800, height: 1067 },
  "about-van": { width: 800, height: 1067 },
  "why-us-technician": { width: 1400, height: 1260 },
  "service-refrigerator-repair": { width: 1000, height: 1250 },
  "service-washer-dryer-repair": { width: 1000, height: 1250 },
  "service-dishwasher-repair": { width: 1000, height: 1250 },
  "service-oven-stove-repair": { width: 1000, height: 1250 },
  "service-air-conditioning-repair": { width: 1000, height: 1250 },
  "service-heating-furnace-repair": { width: 1000, height: 1250 },
  // The selector panel is a tall portrait slot, same as the service images.
  "service-commercial": { width: 1000, height: 1250 },
};

export function photoUrl(slot: string): string | undefined {
  return bySlot[slot];
}

/** Falls back to a square when a slot has no declared size. */
export function photoSize(slot: string) {
  return PHOTO_SIZES[slot as PhotoSlot] ?? { width: 1000, height: 1250 };
}

/** How many slots are filled — used by the build report. */
export function photoCount(): number {
  return Object.keys(bySlot).length;
}
