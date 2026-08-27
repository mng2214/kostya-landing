import { useEffect } from "react";
import { isConfigured } from "@/lib/crisp";

/**
 * Attention rings on the Crisp launcher.
 *
 * An earlier version measured the launcher and mirrored its coordinates onto a
 * fixed-position overlay. That drifts: the launcher is `position: fixed` and
 * Crisp repositions it for its own reasons (viewport changes, teaser bubbles,
 * safe areas), and any missed sync leaves the rings floating somewhere else on
 * the page.
 *
 * So the rings are injected *into* the launcher instead. They inherit its
 * position by construction and cannot come apart from it. `z-index: -1` puts
 * them behind the button face while they expand past its edge.
 *
 * This is deliberately outside React's tree — the node lives inside markup
 * React does not own, so it is created and removed by hand.
 */
const HOST_CLASS = "crisp-pulse-host";

export function CrispPulse() {
  useEffect(() => {
    if (!isConfigured) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let host: HTMLElement | null = null;
    let observer: MutationObserver | null = null;
    let poll = 0;
    let stopped = false;

    const findLauncher = () =>
      document.querySelector<HTMLElement>('.crisp-client [aria-label]');

    const inject = () => {
      if (stopped) return false;
      const launcher = findLauncher();
      if (!launcher) return false;
      if (launcher.querySelector(`.${HOST_CLASS}`)) return true;

      /*
       * Crisp resets its own subtree with !important, which flattens anything
       * we set from a stylesheet — even scoped through .crisp-client. Inline
       * declarations marked important are the only thing that outranks it.
       * The animation itself stays in CSS; only layout is forced here.
       */
      const force = (el: HTMLElement, decls: Record<string, string>) => {
        for (const [prop, value] of Object.entries(decls)) {
          el.style.setProperty(prop, value, "important");
        }
      };

      host = document.createElement("span");
      host.className = HOST_CLASS;
      host.setAttribute("aria-hidden", "true");
      force(host, {
        position: "absolute",
        inset: "0",
        display: "block",
        "z-index": "-1",
        "pointer-events": "none",
      });

      for (const delayed of [false, true]) {
        const ring = document.createElement("span");
        ring.className = delayed ? "chat-ring chat-ring-delayed" : "chat-ring";
        force(ring, {
          position: "absolute",
          inset: "0",
          display: "block",
          "border-radius": "9999px",
          background: "var(--color-brand-500)",
        });
        host.appendChild(ring);
      }

      launcher.appendChild(host);
      return true;
    };

    const remove = () => {
      host?.remove();
      host = null;
    };

    // Crisp injects asynchronously, so poll briefly rather than guess a delay.
    const deadline = Date.now() + 20000;
    const tick = () => {
      if (stopped) return;
      if (!inject() && Date.now() < deadline) poll = window.setTimeout(tick, 400);
    };
    tick();

    // Crisp re-renders its widget on open/close; re-attach if our node is lost.
    const client = document.querySelector(".crisp-client");
    if (client) {
      observer = new MutationObserver(() => {
        if (!stopped && !document.querySelector(`.${HOST_CLASS}`)) inject();
      });
      observer.observe(client, { childList: true, subtree: true });
    }

    // Once the visitor has engaged, the nudge has done its job.
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(".crisp-client")) {
        stopped = true;
        observer?.disconnect();
        remove();
      }
    };
    document.addEventListener("click", onClick, true);

    return () => {
      stopped = true;
      window.clearTimeout(poll);
      observer?.disconnect();
      document.removeEventListener("click", onClick, true);
      remove();
    };
  }, []);

  return null;
}
