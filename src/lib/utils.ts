export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Deterministic hue from a string, clamped to a cool slate-to-brand band.
 * Placeholders should vary just enough to be distinguishable without turning
 * the page into a colour wheel.
 */
export function hueFrom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return 205 + (h % 40); // 205–244°
}
