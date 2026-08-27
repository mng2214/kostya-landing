import { useEffect, useState, type ReactNode } from "react";

/**
 * Entrance animation for content that is on screen at load.
 *
 * `Reveal` deliberately leaves above-the-fold content alone, so the hero needs
 * its own primitive — with the same guarantee: the animation is decoration,
 * never the thing that makes content visible.
 *
 * Framer Motion drives values through requestAnimationFrame, which is paused
 * whenever a page is not being painted — a background tab, a headless
 * renderer, a screenshot service. The hero image sat at opacity 0 on the live
 * site for exactly that reason. Here the flip is a React state change plus a
 * CSS transition, scheduled by a timer: timers still run when rAF does not, so
 * the worst case is an entrance that arrives late rather than content that
 * never arrives at all.
 */
export function Enter({
  children,
  delay = 0,
  y = 18,
  scale,
  className,
}: {
  children: ReactNode;
  /** Seconds. */
  delay?: number;
  y?: number;
  scale?: number;
  className?: string;
}) {
  // Starts hidden only once JS is running, so a no-JS render shows content.
  const [shown, setShown] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    setArmed(true);
    const start = window.setTimeout(() => setShown(true), 30);
    // If anything goes wrong above, this still makes the content appear.
    const failsafe = window.setTimeout(() => setShown(true), 1500);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(failsafe);
    };
  }, []);

  const hidden = armed && !shown;
  const transform = hidden
    ? `translateY(${y}px)${scale ? ` scale(${scale})` : ""}`
    : "none";

  return (
    <div
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform,
        transitionProperty: "opacity, transform",
        transitionDuration: "720ms",
        transitionDelay: `${delay}s`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}
