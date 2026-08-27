import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { photoUrl } from "@/lib/photos";
import { serviceGroups } from "@/content";
import { cn } from "@/lib/utils";

/**
 * Expanding photo panels, one per service category.
 *
 * Desktop: panels share a row and the active one takes most of the width.
 * Mobile: the expansion is meaningless without a pointer, so it degrades to a
 * plain stack of cards — same markup, same links, no gesture to discover.
 *
 * On smoothness: `flex-grow` is the one property here that forces layout every
 * frame, so everything else is kept off the layout path — the detail block
 * fades and lifts instead of animating its height (`grid-rows: 0fr→1fr` is
 * another per-frame layout pass), and the image uses a small scale delta.
 * All of it shares one curve and one duration so nothing arrives out of step.
 *
 * Photography is reused from the service slots rather than duplicated, so this
 * section adds no extra bytes to the bundle.
 */
const PANEL_PHOTO: Record<string, string> = {
  "appliance-repair": "service-dishwasher-repair",
  "hvac-services": "service-air-conditioning-repair",
  installation: "service-heating-furnace-repair",
  "commercial-services": "service-commercial",
};

const EASE = "var(--ease-out-quint)";

export function ServiceSelector() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-surface-alt py-16 lg:py-24">
      <div className="container-page">
        <Reveal>
          <Eyebrow>Our services</Eyebrow>
          <h2 className="type-title mt-5 max-w-2xl text-[32px] sm:text-[42px]">
            Appliance and HVAC service, residential and commercial
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 flex flex-col gap-4 lg:h-[520px] lg:flex-row lg:gap-3">
            {serviceGroups.map((group, i) => {
              const isActive = active === i;
              const photo = photoUrl(PANEL_PHOTO[group.slug] ?? "");

              return (
                <Link
                  key={group.slug}
                  to={`/${group.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-label={`${group.title} — ${group.short}`}
                  className={cn(
                    "group relative isolate flex overflow-hidden rounded-[var(--radius-panel)]",
                    "h-56 lg:h-full",
                    isActive ? "lg:grow-[4]" : "lg:grow",
                  )}
                  style={{
                    flexBasis: 0,
                    transitionProperty: "flex-grow",
                    transitionDuration: "var(--dur-slow)",
                    transitionTimingFunction: EASE,
                    willChange: "flex-grow",
                  }}
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 -z-10 size-full object-cover motion-reduce:transform-none"
                      style={{
                        transform: isActive ? "scale(1)" : "scale(1.04)",
                        transitionProperty: "transform",
                        transitionDuration: "var(--dur-slow)",
                        transitionTimingFunction: EASE,
                      }}
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-500 to-brand-700"
                    />
                  )}

                  {/* Ink wash: the label has to stay legible over any photograph. */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 -z-10 bg-gradient-to-t",
                      isActive
                        ? "from-ink/85 via-ink/35 to-ink/10"
                        : "from-ink/90 via-ink/70 to-ink/50",
                    )}
                    style={{
                      transitionProperty: "opacity",
                      transitionDuration: "var(--dur-base)",
                      transitionTimingFunction: EASE,
                    }}
                  />

                  {/*
                    Collapsed panels are ~104px wide inside their padding —
                    narrower than the word "Commercial" at this size, so a
                    horizontal heading simply got clipped. Collapsed state runs
                    the title vertically instead, which is the honest fix: the
                    full name stays readable at any panel width.

                    Two layers crossfade rather than one layer switching
                    writing-mode, because writing-mode cannot animate and would
                    snap halfway through the expansion.
                  */}
                  <div
                    aria-hidden={isActive}
                    className={cn(
                      "absolute inset-0 hidden flex-col justify-between p-7 text-white lg:flex",
                      isActive ? "opacity-0" : "opacity-100",
                    )}
                    style={{
                      transitionProperty: "opacity",
                      transitionDuration: "var(--dur-fast)",
                      transitionTimingFunction: EASE,
                    }}
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-[var(--radius-action)] bg-white/15 backdrop-blur-[2px]">
                      <ServiceIcon name={group.icon} className="size-5" />
                    </span>

                    <span
                      className="whitespace-nowrap text-[20px] leading-none [writing-mode:vertical-rl] rotate-180"
                      style={{ fontVariationSettings: '"wdth" 110, "wght" 700' }}
                    >
                      {group.title}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "relative flex w-full flex-col justify-end p-6 text-white lg:p-7",
                      isActive ? "lg:opacity-100" : "lg:opacity-0",
                    )}
                    style={{
                      transitionProperty: "opacity",
                      transitionDuration: "var(--dur-base)",
                      transitionTimingFunction: EASE,
                    }}
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-[var(--radius-action)] bg-white/15 backdrop-blur-[2px] lg:hidden">
                      <ServiceIcon name={group.icon} className="size-5" />
                    </span>

                    <h3
                      className="mt-5 text-[20px] leading-tight lg:mt-0 lg:text-[22px]"
                      style={{ fontVariationSettings: '"wdth" 110, "wght" 700' }}
                    >
                      {group.title}
                    </h3>

                    <div className="lg:grid lg:grid-rows-[1fr]">
                      <div className="lg:overflow-hidden">
                        <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-white/75">
                          {group.short}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                          {group.services.slice(0, 4).map((s) => (
                            <li key={s.slug} className="text-[13px] text-white/60">
                              {s.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <span className="mt-5 inline-flex items-center gap-1.5 whitespace-nowrap text-[14px] font-semibold">
                      View services
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
