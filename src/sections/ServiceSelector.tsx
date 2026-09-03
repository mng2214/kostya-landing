import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { photoUrl } from "@/lib/photos";
import { HelpCards } from "@/sections/HelpCards";
import { helpWith } from "@/content";
import { cn } from "@/lib/utils";

/**
 * Expanding photo panels — the desktop view of the service list.
 *
 * Hidden below lg, where its companion card grid takes over: the expansion is
 * driven by hover, and a phone has none. Both views read the same array, so
 * the two can never disagree about what the company repairs.
 *
 * On smoothness: `flex-grow` is the one property here that forces layout every
 * frame, so everything else stays off the layout path — the detail block fades
 * rather than animating its height, and the image uses a small scale delta.
 * One curve, one duration, so nothing arrives out of step.
 */
const EASE = "var(--ease-out-quint)";

export function ServiceSelector() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-surface-alt py-16 lg:py-24">
      <div className="container-page">
        <Reveal>
          <Eyebrow>{helpWith.kicker}</Eyebrow>
          <h2 className="type-title mt-5 max-w-2xl text-[32px] sm:text-[42px]">
            {helpWith.title}
          </h2>
          <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-ink-muted">
            {helpWith.body}
          </p>
        </Reveal>

        {/* Touch has no hover, so the panels give way to plain cards. */}
        <HelpCards />

        <Reveal delay={0.08} className="hidden lg:block">
          <div className="mt-12 flex h-[520px] flex-row gap-3">
            {helpWith.items.map((item, i) => {
              const isActive = active === i;
              const photo = photoUrl(item.panelSlot ?? "");

              return (
                <Link
                  key={item.title}
                  to={item.to}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-label={`${item.title} — ${item.note}`}
                  className={cn(
                    "group relative isolate flex h-full overflow-hidden",
                    isActive ? "grow-[4]" : "grow",
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
                        filter: isActive ? "saturate(1.08)" : "saturate(0.95)",
                        transitionProperty: "transform, filter",
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
                        ? "from-ink/80 via-ink/20 to-transparent"
                        : "from-ink/85 via-ink/45 to-ink/20",
                    )}
                    style={{
                      transitionProperty: "opacity",
                      transitionDuration: "var(--dur-base)",
                      transitionTimingFunction: EASE,
                    }}
                  />

                  {/*
                    A collapsed panel is far narrower than its title, so the
                    title runs vertically there. Two layers crossfade because
                    writing-mode cannot animate and would snap mid-expansion.
                  */}
                  <div
                    aria-hidden={isActive}
                    className={cn(
                      "absolute inset-0 flex flex-col justify-between p-6 text-white",
                      isActive ? "opacity-0" : "opacity-100",
                    )}
                    style={{
                      transitionProperty: "opacity",
                      transitionDuration: "var(--dur-fast)",
                      transitionTimingFunction: EASE,
                    }}
                  >
                    <span className="inline-flex size-10 items-center justify-center bg-white/15 backdrop-blur-[2px]">
                      <ServiceIcon name={item.icon} className="size-[18px]" />
                    </span>
                    <span
                      className="whitespace-nowrap text-[18px] leading-none [writing-mode:vertical-rl] rotate-180"
                      style={{ fontVariationSettings: '"wdth" 110, "wght" 700' }}
                    >
                      {item.title}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "relative flex w-full flex-col justify-end p-7 text-white",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                    style={{
                      transitionProperty: "opacity",
                      transitionDuration: "var(--dur-base)",
                      transitionTimingFunction: EASE,
                    }}
                  >
                    <span className="inline-flex size-11 items-center justify-center bg-white/15 backdrop-blur-[2px]">
                      <ServiceIcon name={item.icon} className="size-5" />
                    </span>

                    <h3
                      className="mt-5 text-[24px] leading-tight"
                      style={{ fontVariationSettings: '"wdth" 110, "wght" 700' }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-white/75">
                      {item.note}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-1.5 whitespace-nowrap text-[14px] font-semibold">
                      Learn more
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
