/**
 * Crisp live chat loader.
 *
 * The website ID is not a secret — it ships in the client script by design —
 * so it lives here with an env override, the same arrangement as the Formspree
 * endpoint. Setting VITE_CRISP_WEBSITE_ID to an empty string turns the real
 * widget off and falls back to the local stub bubble, which is what you want
 * on a staging build that should not appear in the live inbox.
 */

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
  }
}

const override = import.meta.env.VITE_CRISP_WEBSITE_ID as string | undefined;

const websiteId =
  override === undefined
    ? "4c83fcfa-8a14-430e-855e-9799a4b18f76"
    : override.trim();

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
