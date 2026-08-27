import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "light" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-[var(--radius-action)] font-medium " +
  "transition-all duration-200 active:scale-[0.98] whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-[0_6px_20px_-6px_rgba(34,64,156,0.45)] hover:shadow-[0_10px_28px_-8px_rgba(34,64,156,0.55)]",
  outline:
    "border border-black/15 text-ink hover:border-black/40 hover:bg-black/[0.03]",
  light:
    "bg-white text-ink hover:bg-white/90 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.35)]",
  ghost: "text-ink hover:bg-black/[0.04]",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
};

type Props = CommonProps &
  (
    | { to: string; href?: never; onClick?: never; type?: never; disabled?: never }
    | { href: string; to?: never; onClick?: never; type?: never; disabled?: never }
    | {
        to?: never;
        href?: never;
        onClick?: () => void;
        type?: "button" | "submit";
        disabled?: boolean;
      }
  );

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = true,
  ...rest
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if ("to" in rest && rest.to) {
    return (
      <Link to={rest.to} className={classes}>
        {inner}
      </Link>
    );
  }
  if ("href" in rest && rest.href) {
    const external = /^https?:/.test(rest.href);
    return (
      <a
        href={rest.href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type={rest.type ?? "button"}
      onClick={rest.onClick}
      disabled={rest.disabled}
      className={cn(classes, "disabled:opacity-60 disabled:cursor-not-allowed")}
    >
      {inner}
    </button>
  );
}
