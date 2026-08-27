import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A soft light that follows the pointer across a dark section.
 *
 * Position is written to a CSS custom property inside a rAF, so pointer moves
 * never trigger a React render — the whole effect stays off the render path.
 * Pointer-coarse devices (phones, tablets) skip it entirely: there is no
 * cursor to follow, and painting a large radial gradient there is pure cost.
 */
export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
        el.style.setProperty("--spot-opacity", "1");
      });
    };
    const onLeave = () => el.style.setProperty("--spot-opacity", "0");

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={cn("spotlight relative isolate", className)}>
      <div className="spotlight-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      {children}
    </div>
  );
}
