import { PhoneCall } from "lucide-react";
import { useCallbackModal } from "./CallbackModal";
import { cn } from "@/lib/utils";

type Props = {
  topic?: string;
  label?: string;
  variant?: "solid" | "outline" | "light" | "quiet";
  className?: string;
};

const styles = {
  solid:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-[0_6px_20px_-6px_rgba(81,116,255,0.6)]",
  outline: "border border-black/15 text-ink hover:border-black/40 hover:bg-black/[0.03]",
  light: "bg-white text-ink hover:bg-white/90",
  quiet: "border border-white/35 text-white hover:bg-white/10",
} as const;

export function CallbackButton({
  topic,
  label = "Order a callback",
  variant = "outline",
  className,
}: Props) {
  const { open } = useCallbackModal();
  return (
    <button
      type="button"
      onClick={() => open(topic)}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2.5 rounded-[var(--radius-pill)] px-6 text-[15px] font-medium transition-all active:scale-[0.98] whitespace-nowrap",
        styles[variant],
        className,
      )}
    >
      <PhoneCall className="size-4" aria-hidden="true" />
      {label}
    </button>
  );
}
