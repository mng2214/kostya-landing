import { sendToFormspree } from "./forms";

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

const SLOT_LABEL: Record<string, string> = Object.fromEntries(
  CALLBACK_SLOTS.map((s) => [s.id, s.label]),
);

/** "Call me back" modal. Same inbox as the contact form, different subject. */
export async function requestCallback(
  req: CallbackRequest,
): Promise<CallbackResult> {
  const res = await sendToFormspree(
    {
      form: "Callback request",
      name: req.name,
      phone: req.phone,
      preferred_time: SLOT_LABEL[req.when] ?? req.when,
      topic: req.topic || "Not specified",
    },
    `CALLBACK — ${req.name} — ${SLOT_LABEL[req.when] ?? req.when}`,
  );

  if (!res.ok) return res;
  return { ok: true, etaMinutes: req.when === "asap" ? 15 : 60 };
}
