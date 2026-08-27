import { sendToFormspree } from "./forms";

export type Lead = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

/** Contact / service-request form. Delivered by Formspree. */
export async function submitLead(lead: Lead): Promise<SubmitResult> {
  return sendToFormspree(
    {
      form: "Service request",
      name: lead.name,
      email: lead.email,
      phone: lead.phone || "(not given)",
      service: lead.service,
      message: lead.message,
    },
    `Service request — ${lead.service || "general"} — ${lead.name}`,
  );
}
