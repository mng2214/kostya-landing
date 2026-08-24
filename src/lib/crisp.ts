/**
 * Crisp loader.
 *
 * With VITE_CRISP_WEBSITE_ID set, the real Crisp widget is injected and the
 * local stub never renders. Without it, `isConfigured` is false and the app
 * falls back to <CrispChat /> — a visual stand-in so the layout can be
 * reviewed without a Crisp account.
 */

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
  }
}

const websiteId = import.meta.env.VITE_CRISP_WEBSITE_ID as string | undefined;

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
