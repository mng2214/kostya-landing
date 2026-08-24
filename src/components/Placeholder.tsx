import { ImageIcon } from "lucide-react";
import { cn, hueFrom } from "@/lib/utils";

/**
 * Image slot. Real photography is not shipped with this mockup, so every
 * <img> position renders a tinted gradient panel with its intended
 * dimensions. Swap a slot by replacing this component with an <img>.
 */
export function Placeholder({
  label,
  ratio = "4/3",
  className,
  rounded = "rounded-[var(--radius-panel)]",
  showMeta = true,
}: {
  label: string;
  ratio?: string;
  className?: string;
  rounded?: string;
  showMeta?: boolean;
}) {
  const hue = hueFrom(label);
  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden",
        rounded,
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(135deg,
            hsl(${hue} 30% 94%) 0%,
            hsl(${hue + 10} 26% 88%) 48%,
            hsl(${hue + 20} 22% 80%) 100%)`,
        }}
      />
      {/* faint grid so empty slots don't read as broken images */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {showMeta && (
        <div className="flex flex-col items-center gap-2 px-6 text-center">
          <ImageIcon className="size-7 text-black/25" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/35">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
