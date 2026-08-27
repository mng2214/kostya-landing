/**
 * Formspree transport.
 *
 * One place that talks to the network, so every form on the site shares the
 * same error handling, the same timeout and the same shape of result.
 *
 * The endpoint is not a secret: it ends up in the client bundle whatever we do,
 * which is how Formspree is designed to work. Keeping it here with an env
 * override means a staging deploy can point somewhere else without a code edit.
 */

const ENDPOINT =
  (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined)?.trim() ||
  "https://formspree.io/f/xbgjrwzj";

export type SendResult = { ok: true } | { ok: false; error: string };

const GENERIC =
  "Something went wrong sending that. Please call us instead — we'll pick up.";

export async function sendToFormspree(
  payload: Record<string, unknown>,
  subject: string,
): Promise<SendResult> {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return { ok: false, error: "You appear to be offline. Check your connection and try again." };
  }

  // A hung request is worse than a failed one: the user sits on a spinner with
  // no idea whether the message went anywhere.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...payload, _subject: subject }),
      signal: controller.signal,
    });

    if (res.ok) return { ok: true };

    // Formspree reports validation problems as { errors: [{ message }] }.
    const data = await res.json().catch(() => null);
    const message =
      data?.errors?.map((e: { message?: string }) => e.message).filter(Boolean).join(" ") ||
      data?.error;

    return { ok: false, error: message || GENERIC };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return { ok: false, error: "That took too long. Please try again, or call us." };
    }
    return { ok: false, error: GENERIC };
  } finally {
    clearTimeout(timeout);
  }
}
