import { useEffect, type RefObject } from "react";

type Options = {
  /** Only hint below this width, in px. Above it the strip is a plain grid. */
  below?: number;
  /** How far to nudge, in px. Enough to read as motion, not as a page jump. */
  distance?: number;
};

const OUT_MS = 420;
const HOLD_MS = 140;
const BACK_MS = 520;
/** Long enough for the section's own fade-in to have finished first. */
const ARM_MS = 700;

/** Anything that means the visitor has taken over. */
const ABORT_EVENTS = ["pointerdown", "touchstart", "wheel", "keydown"] as const;

const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Nudges a horizontal strip forward and back, once, the first time it is seen.
 *
 * The cut-off card at the screen edge already says the strip scrolls, but only
 * to someone who looks at the edge. A single small movement says it to someone
 * who does not. It is a hint, so it defers to the user completely: the first
 * touch, wheel or key aborts it mid-flight and restores the strip, and it never
 * runs at all for a visitor who has already scrolled it, or who has asked for
 * reduced motion.
 *
 * Snapping is switched off for the duration. With `scroll-snap-type: mandatory`
 * the browser re-snaps whenever a scroll settles, so it would fight the
 * animation frame by frame and land the strip somewhere neither of us chose.
 */
export function useScrollHint(
  ref: RefObject<HTMLElement | null>,
  { below = 640, distance = 34 }: Options = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (!window.matchMedia(`(max-width: ${below - 1}px)`).matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Nothing to hint at, or the visitor is already ahead of us.
    if (el.scrollWidth - el.clientWidth < distance * 2) return;
    if (el.scrollLeft > 0) return;

    let raf = 0;
    let armTimer = 0;
    let failsafe = 0;
    let running = false;
    const snapWas = el.style.scrollSnapType;

    const finish = () => {
      if (running) {
        cancelAnimationFrame(raf);
        el.style.scrollSnapType = snapWas;
        running = false;
      }
      window.clearTimeout(armTimer);
      window.clearTimeout(failsafe);
      observer.disconnect();
      for (const type of ABORT_EVENTS) el.removeEventListener(type, abort);
    };

    /**
     * Any real input wins immediately, including mid-flight. The position is
     * left where it is rather than reset: restoring snap hands the strip back
     * to the browser, which settles it without fighting the finger.
     */
    const abort = () => finish();

    const animate = (from: number, to: number, ms: number, ease: (t: number) => number) =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / ms);
          el.scrollLeft = from + (to - from) * ease(t);
          if (t < 1 && running) {
            raf = requestAnimationFrame(step);
          } else {
            resolve();
          }
        };
        raf = requestAnimationFrame(step);
      });

    const run = async () => {
      running = true;
      el.style.scrollSnapType = "none";
      /*
       * requestAnimationFrame is paused while the page is not being painted,
       * so a visitor who switches apps mid-hint would leave the strip parked
       * with snapping off. This releases it regardless; mandatory snap then
       * settles the position itself.
       */
      failsafe = window.setTimeout(finish, OUT_MS + HOLD_MS + BACK_MS + 500);
      await animate(0, distance, OUT_MS, easeOut);
      if (!running) return;
      await new Promise((r) => window.setTimeout(r, HOLD_MS));
      if (!running) return;
      await animate(distance, 0, BACK_MS, easeInOut);
      finish();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        armTimer = window.setTimeout(run, ARM_MS);
      },
      // Most of the strip has to be on screen — a hint played at the very
      // bottom edge is a hint nobody sees.
      { threshold: 0.6 },
    );

    observer.observe(el);
    for (const type of ABORT_EVENTS) {
      el.addEventListener(type, abort, { passive: true });
    }

    return finish;
  }, [ref, below, distance]);
}
