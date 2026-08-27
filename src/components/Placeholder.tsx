import { ImageIcon } from "lucide-react";
import { cn, hueFrom } from "@/lib/utils";
import { photoSize, photoUrl, type PhotoSlot } from "@/lib/photos";

/**
 * An image slot.
 *
 * Given a `slot`, this renders the real photograph if one exists in
 * `src/assets/photos/`. Until then it draws a tinted panel of the right shape,
 * so the layout is correct whether or not photography has landed yet.
 *
 * `alt` is required whenever a slot is named: once a real photo appears, an
 * empty alt would be a genuine accessibility hole rather than a placeholder.
 */
type Props = {
  label: string;
  ratio?: string;
  className?: string;
  rounded?: string;
  showMeta?: boolean;
} & (
  | { slot: PhotoSlot; alt: string; priority?: boolean }
  | { slot?: undefined; alt?: undefined; priority?: undefined }
);

export function Placeholder({
  label,
  ratio = "4/3",
  className,
  rounded = "rounded-[var(--radius-panel)]",
  showMeta = true,
  ...photo
}: Props) {
  const src = photo.slot ? photoUrl(photo.slot) : undefined;

  if (src && photo.slot) {
    const { width, height } = photoSize(photo.slot);
    return (
      <img
        src={src}
        alt={photo.alt}
        width={width}
        height={height}
        loading={photo.priority ? "eager" : "lazy"}
        // The hero is the LCP element; everything else can wait its turn.
        fetchPriority={photo.priority ? "high" : "auto"}
        decoding={photo.priority ? "sync" : "async"}
        className={cn("h-full w-full object-cover", rounded, className)}
        style={{ aspectRatio: ratio }}
      />
    );
  }

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
