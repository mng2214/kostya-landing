/**
 * Crisp live chat loader.
 *
 * The website ID is not a secret — it ships in the client script by design —
 * so it lives here with an env override, the same arrangement as the Formspree
 * endpoint and the map URL.
 *
 * An earlier version treated the variable as "set" whenever it was defined,
 * even as an empty string, so that an empty value could switch the widget off.
 * That is exactly what happened in production: the variable existed in Vercel
 * with no value, the ternary took it at face value, and the chat silently
 * dropped to the local stub. An empty variable now means "not configured" and
 * falls through to the default, matching the other integrations. To actually
 * turn the widget off, set the value to `off`.
 */

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
  }
}

const DEFAULT_ID = "4c83fcfa-8a14-430e-855e-9799a4b18f76";

const override = (import.meta.env.VITE_CRISP_WEBSITE_ID as string | undefined)?.trim();

const websiteId =
  override === "off" || override === "false" ? "" : override || DEFAULT_ID;

export const isConfigured = Boolean(websiteId);

let injected = false;

export function loadCrisp() {
  if (!websiteId || injected) return;
  injected = true;

  window.$crisp = [];
  window.CRISP_WEBSITE_ID = websiteId;

  const script = document.createElement("script");
  script.src = "https://client.crisp.chat/l.js";
  script.async = true;
  document.head.appendChild(script);
}
