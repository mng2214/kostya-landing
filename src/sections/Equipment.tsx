import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { equipmentServiced } from "@/content";

/**
 * "All appliances" answers nothing — a visitor is looking for their specific
 * machine. This lists them so the answer is visible without a phone call.
 *
 * Each column is a real link to the category that covers it. That matters for
 * the hover treatment below: lifting and tinting a block on hover promises it
 * is clickable, so it had better be. Non-interactive text that reacts to the
 * cursor is a small lie the visitor pays for with a wasted click.
 */
export function Equipment() {
  return (
    <section className="container-page py-16 lg:py-24">
      <Reveal>
        <h2 className="type-title max-w-xl text-[32px] sm:text-[42px]">
          {equipmentServiced.title}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-px bg-black/[0.07] sm:grid-cols-2 lg:grid-cols-4">
        {equipmentServiced.groups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.06}>
            <Link
              to={group.to}
              className={[
                "group relative flex h-full flex-col bg-white p-7",
                // Scale from the block's own centre, lifted a touch. Kept to
                // 1.02 — anything more and the text visibly resamples.
                "motion-safe:transition-[transform,background-color,box-shadow]",
                "motion-safe:duration-[var(--dur-base)] motion-safe:ease-[var(--ease-out-quint)]",
                "hover:z-10 hover:bg-surface motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.02]",
                "hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.45)]",
                "focus-visible:z-10 focus-visible:bg-surface",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <h3
                  className="text-[13px] uppercase tracking-[0.12em] text-brand-600"
                  style={{ fontVariationSettings: '"wdth" 105, "wght" 700' }}
                >
                  {group.label}
                </h3>
                <ArrowUpRight
                  className="size-4 shrink-0 text-brand-500 opacity-0 transition-opacity duration-[var(--dur-fast)] group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                />
              </div>

              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-[15px] leading-snug text-ink-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
