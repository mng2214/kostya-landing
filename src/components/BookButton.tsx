import { CalendarCheck, PhoneCall } from "lucide-react";
import { useCallbackModal } from "./CallbackModal";
import { bookingLabel, bookingUrl, isConfigured } from "@/lib/booking";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "light" | "quiet";

const styles: Record<Variant, string> = {
  solid:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-[0_6px_20px_-6px_rgba(34,64,156,0.45)]",
  outline: "border border-black/15 text-ink hover:border-black/40 hover:bg-black/[0.03]",
  light: "bg-white text-ink hover:bg-white/90 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.35)]",
  quiet: "border border-white/35 text-white hover:bg-white/10",
};

/**
 * The site's primary conversion action.
 *
 * One component for both states: it opens Housecall Pro when scheduling is
 * connected, and the callback modal until then — with a label that matches
 * whichever of the two actually happens.
 */
export function BookButton({
  label,
  topic,
  variant = "solid",
  size = "md",
  className,
}: {
  label?: string;
  topic?: string;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
}) {
  const { open } = useCallbackModal();
  const Icon = isConfigured ? CalendarCheck : PhoneCall;

  const classes = cn(
    "inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-action)] font-semibold transition-all active:scale-[0.98] whitespace-nowrap",
    styles[variant],
    size === "lg" ? "h-14 px-7 text-base" : "h-12 px-6 text-[15px]",
    className,
  );

  const inner = (
    <>
      <Icon className="size-4" aria-hidden="true" />
      {label ?? bookingLabel}
    </>
  );

  if (isConfigured) {
    return (
      <a href={bookingUrl} target="_blank" rel="noreferrer noopener" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={() => open(topic)} className={classes}>
      {inner}
    </button>
  );
}
