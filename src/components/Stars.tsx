import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating,
  size = "size-4",
  className,
}: {
  rating: number;
  size?: string;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            size,
            i <= Math.round(rating)
              ? "fill-[#FBBC04] text-[#FBBC04]"
              : "fill-black/10 text-black/10",
          )}
        />
      ))}
    </span>
  );
}

/** Google's four-colour "G", inlined so the page stays self-contained. */
export function GoogleGlyph({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.9 2.6 13.7l7.8 6.1C12.3 13.9 17.7 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.6 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.4z"/>
      <path fill="#FBBC05" d="M10.4 28.2c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6.1C1 16.1 0 19.9 0 23.5s1 7.4 2.6 10.8l7.8-6.1z"/>
      <path fill="#34A853" d="M24 47c6.2 0 11.5-2 15.3-5.6l-7.6-5.9c-2.1 1.4-4.8 2.3-7.7 2.3-6.3 0-11.7-4.4-13.6-10.3l-7.8 6.1C6.5 41.1 14.6 47 24 47z"/>
    </svg>
  );
}
