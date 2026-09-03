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

/**
 * The size a slot expects is carried in the filename as a `__<W>x<H>` suffix
 * and stripped back off here, so `hero-technician__1800x1620.jpg` fills the
 * `hero-technician` slot. The client replaces photography by dropping a file
 * over the one already in the folder, and the name tells them what to supply
 * without opening anything. A plain `hero-technician.jpg` still works.
 */
const bySlot: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  const file = path.split("/").pop()!.replace(/\.[^.]+$/, "");
  bySlot[file.replace(/__\d+x\d+$/, "")] = url;
}

export type PhotoSlot =
  | "hero-technician"
  | "about-crew"
  | "about-van"
  | "service-refrigerator-repair"
  | "service-washer-dryer-repair"
  | "service-dishwasher-repair"
  | "service-oven-stove-repair"
  | "service-air-conditioning-repair"
  | "service-heating-furnace-repair"
  | "why-us-chicago"
  | "help-refrigerator"
  | "help-washer-dryer"
  | "help-dishwasher"
  | "help-oven-range"
  | "help-hvac"
  | "help-installation";

/** Intrinsic size per slot, so <img> can reserve space and avoid layout shift. */
export const PHOTO_SIZES: Record<PhotoSlot, { width: number; height: number }> = {
  "hero-technician": { width: 1800, height: 1620 },
  "about-crew": { width: 800, height: 1067 },
  "about-van": { width: 800, height: 1067 },
  "service-refrigerator-repair": { width: 1000, height: 1250 },
  "service-washer-dryer-repair": { width: 1000, height: 1250 },
  "service-dishwasher-repair": { width: 1000, height: 1250 },
  "service-oven-stove-repair": { width: 1000, height: 1250 },
  "service-air-conditioning-repair": { width: 1000, height: 1250 },
  "service-heating-furnace-repair": { width: 1000, height: 1250 },
  // Wide, dark backdrop for the "why choose us" band.
  "why-us-chicago": { width: 2400, height: 1000 },
  // Product shots for the "what can we help you with" cards. 4:3 to match the
  // aspect the card renders, so nothing is cropped away after generation.
  "help-refrigerator": { width: 900, height: 675 },
  "help-washer-dryer": { width: 900, height: 675 },
  "help-dishwasher": { width: 900, height: 675 },
  "help-oven-range": { width: 900, height: 675 },
  "help-hvac": { width: 900, height: 675 },
  "help-installation": { width: 900, height: 675 },
};

export function photoUrl(slot: string): string | undefined {
  return bySlot[slot];
}

/** Falls back to a square when a slot has no declared size. */
export function photoSize(slot: string) {
  return PHOTO_SIZES[slot as PhotoSlot] ?? { width: 1000, height: 1250 };
}

