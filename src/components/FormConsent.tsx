import { cn } from "@/lib/utils";

/**
 * The consent line under a form's submit button.
 *
 * Folded into the reassurance that was already there rather than added beneath
 * it: two stacked lines of small grey text read as boilerplate and get skipped,
 * which is exactly what a disclosure must not do. One sentence the visitor is
 * already reading carries the link better than a second one they are not.
 *
 * The policy opens in a new tab, and through a plain anchor rather than a
 * router link, because navigating in place would unmount a half-filled form —
 * the callback modal would close and lose everything typed into it.
 *
 * `className` carries the spacing: one caller sits in a `space-y` form and
 * wants no margin of its own, the other needs one.
 */
export function FormConsent({
  note,
  action,
  className,
}: {
  /** The existing reassurance, kept so nothing is lost by folding them together. */
  note: string;
  /** Completes "By … you agree" — e.g. "requesting a call". */
  action: string;
  className?: string;
}) {
  return (
    <p className={cn("text-center text-[12px] leading-relaxed text-ink-muted", className)}>
      {note} By {action} you agree to our{" "}
      <a
        href="/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 transition-colors hover:text-brand-600"
      >
        Privacy Policy
      </a>
      .
    </p>
  );
}
