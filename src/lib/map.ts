/**
 * Map embed URL.
 *
 * The keyless `output=embed` endpoint needs no API key or billing account,
 * which is the right trade for a coverage map that never changes. Override it
 * with VITE_MAP_EMBED_URL to point at a specific place, a saved map, or the
 * paid Embed API later.
 */
const override = import.meta.env.VITE_MAP_EMBED_URL as string | undefined;

/** Zoom 9 fits the metro and the suburbs we actually cover. */
const DEFAULT = "https://maps.google.com/maps?q=Chicago,IL&z=9&output=embed";

export const mapEmbedUrl = override?.trim() || DEFAULT;
