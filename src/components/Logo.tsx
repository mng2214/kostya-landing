import { Link } from "react-router-dom";
import mark from "@/assets/brand/logo-mark.png";
import { cn } from "@/lib/utils";

/**
 * Header/footer lockup — stacked, matching the original artwork.
 *
 * The supplied logo puts "APPLIANCE & HVAC" under the monogram, so the lockup
 * does the same. The descriptor is set live in Archivo rather than cropped
 * from the image: at header size the artwork's own wordmark renders about five
 * pixels tall and turns to mush, while type stays crisp at any size and can be
 * tracked out to match the width of the mark above it.
 */
export function Logo({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "light";
}) {
  return (
    <Link
      to="/"
      aria-label="USA Appliance & HVAC — home"
      className={cn(
        // Nudged up: the descriptor line sits under the mark, so optically the
        // lockup's centre is lower than its bounding box centre, and row
        // centring alone leaves it sitting heavy.
        "group inline-flex shrink-0 -translate-y-[3px] flex-col items-center",
        className,
      )}
    >
      <img
        src={mark}
        alt=""
        width={361}
        height={240}
        className="h-12 w-auto sm:h-[68px]"
      />
      <span
        className={cn(
          "mt-1.5 whitespace-nowrap text-[9px] uppercase leading-none sm:text-[10px]",
          tone === "light" ? "text-white/75" : "text-ink",
        )}
        style={{
          fontVariationSettings: '"wdth" 104, "wght" 700',
          // Tracked out so the descriptor spans the width of the mark above it,
          // which is what makes a stacked lockup read as one object.
          letterSpacing: "0.13em",
          textIndent: "0.13em",
        }}
      >
        Appliance &amp; HVAC
      </span>
    </Link>
  );
}
