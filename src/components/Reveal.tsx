import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * Fade-and-rise on first scroll into view.
 *
 * Three rules this had to satisfy, learned the hard way:
 *
 * 1. **Visible is the default.** The element renders opaque. Nothing about it
 *    being seen depends on JavaScript succeeding, so a headless renderer, a
 *    crawler or a tab that never painted gets the content, not a blank block.
 *
 * 2. **Only arm what is off-screen.** Anything already near the viewport is
 *    left alone, so arming never causes a visible flash of content
 *    disappearing and coming back.
 *
 * 3. **CSS transition, not an animation loop.** Framer Motion drives values
 *    through requestAnimationFrame, which is paused while a page is not being
 *    painted — the element would sit at its initial opacity forever. A CSS
 *    transition just applies the final computed value in that case; the
 *    animation is skipped, the content is not.
 *
 * A timer also releases the element regardless, so a missed observer callback
 * costs an animation, never the content.
 */
export function Reveal({ children, delay = 0, y = 14, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Already on screen (or nearly): never hide it.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setHidden(true);

    const release = () => {
      setHidden(false);
      observer.disconnect();
      window.clearTimeout(failsafe);
    };

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && release(),
      { rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);

    const failsafe = window.setTimeout(release, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translateY(${y}px)` : "none",
        transitionProperty: "opacity, transform",
        transitionDuration: "680ms",
        transitionDelay: `${delay}s`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: hidden ? "opacity, transform" : undefined,
      }}
    >
      {children}
    </div>
  );
}
