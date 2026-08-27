import { Link } from "react-router-dom";
import mark from "@/assets/brand/logo-mark.png";
import { cn } from "@/lib/utils";

/**
 * Header/footer lockup.
 *
 * The supplied logo is a stacked square: at a 74px header height the whole
 * thing would shrink to ~40px and "APPLIANCE & HVAC" would be about four
 * pixels tall — unreadable. So the monogram is used as the mark and the
 * descriptor is set live in Archivo beside it, which stays crisp at any size
 * and gives the horizontal lockup the header actually needs.
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
      className={cn("group inline-flex min-h-11 shrink-0 items-center gap-2.5", className)}
    >
      {/*
        The swoosh occupies the top third of the artwork, so centring the whole
        image drops the "USA" letters well below the descriptor. Measured: the
        letter band sits below the image centre. A percentage translate is
        used so the nudge scales with h-9 / h-10 instead of being pinned to a
        fixed pixel value.
      */}
      <img
        src={mark}
        alt=""
        width={361}
        height={240}
        className="h-9 w-auto -translate-y-[23%] sm:h-10"
      />
      <span
        className={cn(
          "hidden text-[11px] uppercase leading-tight sm:block",
          tone === "light" ? "text-white/70" : "text-ink-muted",
        )}
        style={{
          fontVariationSettings: '"wdth" 104, "wght" 700',
          letterSpacing: "0.14em",
        }}
      >
        Appliance
        <br />
        &amp; HVAC
      </span>
    </Link>
  );
}
