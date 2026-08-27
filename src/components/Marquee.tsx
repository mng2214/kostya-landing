import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite marquee.
 *
 * The track is rendered twice and translated by exactly -50%, so the loop is
 * seamless regardless of content width. CSS animation rather than a JS loop:
 * it runs on the compositor and costs nothing on the main thread.
 *
 * `overflow: hidden` clips horizontally, which is the point — but it clips
 * vertically too, and borders sitting flush against that edge lost their
 * bottom line. The track carries its own vertical padding so nothing ever
 * touches the clip boundary.
 */
export function Marquee({
  children,
  speed = 60,
  reverse = false,
  className,
}: {
  children: ReactNode;
  /** Seconds for one full pass. Longer = slower. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("marquee group relative overflow-hidden", className)}
      style={{ ["--marquee-duration" as string]: `${speed}s` }}
    >
      <div
        className={cn(
          "marquee-track flex w-max items-center gap-3 py-1",
          reverse && "marquee-track-reverse",
        )}
      >
        <div className="flex shrink-0 items-center gap-3">{children}</div>
        <div className="flex shrink-0 items-center gap-3" aria-hidden="true">
          {children}
        </div>
      </div>

      {/* Edges fade into the section colour so items enter and leave, not pop. */}
      <div className="marquee-fade pointer-events-none absolute inset-y-0 left-0 w-24" />
      <div className="marquee-fade-right pointer-events-none absolute inset-y-0 right-0 w-24" />
    </div>
  );
}
