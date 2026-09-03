import { ServiceIcon } from "@/components/ServiceIcon";
import { type Service } from "@/content";

/**
 * A single service inside a category.
 *
 * These are statements, not destinations — services have no pages of their
 * own — so the hover reads as emphasis rather than affordance: the card slides
 * a little, the badge wakes up, the body text firms from muted to ink. No
 * lift, no shadow, no pointer cursor, nothing that promises a click that isn't
 * there. Colour and a nudge say "you are looking at this"; depth would say
 * "you can press this".
 *
 * Everything animated here is transform or colour, so hovering across a grid
 * of them never touches layout.
 */
export function ServiceRow({ service }: { service: Service }) {
  return (
    <div
      className={[
        "group flex gap-3.5 rounded-[var(--radius-card)] border border-black/[0.08] bg-white p-5",
        "motion-safe:transition-[translate,border-color]",
        "motion-safe:duration-[var(--dur-base)] motion-safe:ease-[var(--ease-out-quint)]",
        "hover:border-brand-500/35 motion-safe:hover:translate-x-1",
      ].join(" ")}
    >
      <span
        className={[
          "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-none bg-brand-50 text-brand-600",
          "transition-colors duration-[var(--dur-base)] ease-[var(--ease-out-quint)]",
          "group-hover:bg-brand-500 group-hover:text-white",
        ].join(" ")}
      >
        <ServiceIcon name={service.icon} className="size-[18px]" />
      </span>
      <span className="min-w-0">
        <span className="block text-[16px] font-semibold transition-colors duration-[var(--dur-base)] group-hover:text-brand-600">
          {service.title}
        </span>
        <span className="mt-1 block text-[14px] leading-snug text-ink-muted transition-colors duration-[var(--dur-base)] group-hover:text-ink">
          {service.short}
        </span>
      </span>
    </div>
  );
}
