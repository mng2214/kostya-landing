/**
 * Callback requests — STUB.
 * Same idea as submitLead: one function to replace when a real backend exists.
 */

export type CallbackRequest = {
  name: string;
  phone: string;
  when: string;
  topic: string;
};

export type CallbackResult =
  | { ok: true; etaMinutes: number }
  | { ok: false; error: string };

export const CALLBACK_SLOTS = [
  { id: "asap", label: "As soon as possible", hint: "Usually under 15 min" },
  { id: "morning", label: "Morning", hint: "8:00 – 12:00" },
  { id: "afternoon", label: "Afternoon", hint: "12:00 – 17:00" },
  { id: "evening", label: "Evening", hint: "17:00 – 20:00" },
] as const;

export async function requestCallback(
  req: CallbackRequest,
): Promise<CallbackResult> {
  await new Promise((r) => setTimeout(r, 800));

  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return { ok: false, error: "You appear to be offline. Try again in a moment." };
  }

  // eslint-disable-next-line no-console
  console.info("[stub] callback requested — not sent anywhere yet:", req);
  return { ok: true, etaMinutes: req.when === "asap" ? 15 : 60 };
}
