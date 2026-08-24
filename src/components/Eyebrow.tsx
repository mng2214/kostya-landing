import { cn } from "@/lib/utils";

/** The template's signature "// SECTION LABEL" marker. */
export function Eyebrow({
  children,
  className,
  tone = "brand",
}: {
  children: string;
  className?: string;
  tone?: "brand" | "light";
}) {
  return (
    <span
      className={cn(
        "kicker",
        tone === "light" && "text-white/70",
        className,
      )}
    >
      <span aria-hidden="true" className="opacity-60">//</span>
      {children}
    </span>
  );
}
