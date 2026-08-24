/**
 * Lead submission — STUB.
 *
 * This is the single swap point for the contact form. Replace the body with a
 * real call (Formspree, your own endpoint, a CRM) and every form state on the
 * site keeps working unchanged.
 */

export type Lead = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  // Simulated latency so loading states are visible during review.
  await new Promise((r) => setTimeout(r, 900));

  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return { ok: false, error: "You appear to be offline. Check your connection and try again." };
  }

  // Typing "fail" in the message exercises the error branch during review.
  if (/\bfail\b/i.test(lead.message)) {
    return { ok: false, error: "Something went wrong on our end. Please call us instead." };
  }

  // eslint-disable-next-line no-console
  console.info("[stub] lead captured — not sent anywhere yet:", lead);
  return { ok: true };
}
