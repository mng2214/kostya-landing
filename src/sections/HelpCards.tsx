import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { photoUrl } from "@/lib/photos";
import { useScrollHint } from "@/lib/useScrollHint";
import { helpWith } from "@/content";

/**
 * The touch view of the service list: a product shot per machine.
 *
 * A photograph of a fridge is recognised before the label under it is read,
 * which is what matters when someone is scanning for their own broken thing.
 * Shares its data with the desktop panels — see ServiceSelector.
 *
 * On a phone the six cards are a snap strip rather than a six-screen column:
 * scrolling past five machines to reach the sixth is a worse way to find your
 * own than flicking sideways through them. The strip bleeds past both screen
 * edges and each card is 78vw, so the next one is always cut off in view —
 * that sliver is the whole affordance, which is why there are no arrows.
 * From `sm` up everything fits at once and it goes back to a plain grid.
 *
 * One Reveal wraps the whole block rather than one per card: a card parked
 * off-screen to the right never intersects the viewport, so per-card observers
 * would leave it invisible until the failsafe fired — blank cards for anyone
 * who swipes quickly.
 */
export function HelpCards() {
  const strip = useRef<HTMLDivElement>(null);
  useScrollHint(strip);

  return (
    <div className="lg:hidden">
      <Reveal>
        <div
          ref={strip}
          className={[
            "mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto",
            // Bleed to the screen edges, then pad back in so the first card
            // still lines up with the heading above it.
            "-mx-5 scroll-pl-5 px-5 pb-2 no-scrollbar",
            "sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0",
          ].join(" ")}
        >
          {helpWith.items.map((item) => {
            const photo = photoUrl(item.slot ?? "");

            return (
              <Link
                key={item.title}
                to={item.to}
                className={[
                  "group flex w-[78vw] shrink-0 snap-start flex-col border border-black/[0.08] bg-white",
                  "sm:w-auto",
                  "motion-safe:transition-[translate,box-shadow,border-color]",
                  "motion-safe:duration-[var(--dur-base)] motion-safe:ease-[var(--ease-out-quint)]",
                  "hover:border-brand-500/30 motion-safe:hover:-translate-y-1",
                  "hover:shadow-[0_24px_50px_-30px_rgba(34,64,156,0.5)]",
                ].join(" ")}
              >
                <div className="relative overflow-hidden bg-surface-alt">
                  {photo ? (
                    <img
                      src={photo}
                      alt={item.title}
                      width={900}
                      height={675}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover motion-safe:transition-transform motion-safe:duration-[var(--dur-slow)] motion-safe:group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`Placeholder image: ${item.title}`}
                      className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-brand-50 to-surface-alt text-brand-500/40"
                    >
                      <ServiceIcon name={item.icon} className="size-12" />
                    </div>
                  )}

                  <span className="absolute right-4 top-4 inline-flex size-9 items-center justify-center bg-brand-500 text-white shadow-[0_6px_16px_-6px_rgba(34,64,156,0.6)]">
                    <ServiceIcon name={item.icon} className="size-[18px]" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[17px] font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[14px] leading-snug text-ink-muted">
                    {item.note}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600">
                    Learn more
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}
