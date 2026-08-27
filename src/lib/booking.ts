/**
 * Online booking (Housecall Pro).
 *
 * Set VITE_BOOKING_URL to the company's Housecall Pro booking link and every
 * booking control on the site starts pointing at it. Until then the same
 * controls open the callback request modal.
 *
 * The label is derived from that state rather than written by hand, because a
 * button that says "Book Online" and then asks for a callback is a broken
 * promise — the visitor expects to choose a time slot and gets a form. When
 * the URL lands, every button on the site relabels itself at once.
 */

const url = import.meta.env.VITE_BOOKING_URL as string | undefined;

export const bookingUrl = url?.trim() || "";

export const isConfigured = Boolean(bookingUrl);

/** "Book Online" once real scheduling exists; an honest fallback until then. */
export const bookingLabel = isConfigured ? "Book Online" : "Request a Call";
