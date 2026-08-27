import { Phone } from "lucide-react";
import { company } from "@/content";
import { cn } from "@/lib/utils";

/** Call Now. The number is always the literal number — never a tracking label. */
export function CallButton({
  variant = "outline",
  size = "md",
  showNumber = true,
  className,
}: {
  variant?: "solid" | "outline" | "light" | "quiet";
  size?: "md" | "lg";
  showNumber?: boolean;
  className?: string;
}) {
  const styles = {
    solid: "bg-brand-500 text-white hover:bg-brand-600",
    outline: "border border-black/15 text-ink hover:border-black/40 hover:bg-black/[0.03]",
    light: "bg-white text-ink hover:bg-white/90",
    quiet: "border border-white/35 text-white hover:bg-white/10",
  } as const;

  return (
    <a
      href={company.phoneHref}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-action)] font-semibold transition-all active:scale-[0.98] whitespace-nowrap",
        styles[variant],
        size === "lg" ? "h-14 px-7 text-base" : "h-12 px-6 text-[15px]",
        className,
      )}
    >
      <Phone className="size-4" aria-hidden="true" />
      {showNumber ? company.phone : "Call Now"}
    </a>
  );
}
