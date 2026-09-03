import { Check } from "lucide-react";
import { BookButton } from "@/components/BookButton";
import { Reveal } from "@/components/Reveal";
import { photoUrl } from "@/lib/photos";
import { whyUs } from "@/content";

/**
 * The trust band, set over a Chicago skyline.
 *
 * The photograph runs at full opacity and a single ink scrim does all the
 * darkening. Dimming the image *and* covering it was doing the same job twice
 * and left the skyline invisible — the left edge in particular sat under solid
 * ink, so the city was not merely dark there, it was not rendered at all.
 *
 * The scrim ramps 85% → 35% across the band because the heading side needs the
 * protection and the skyline side does not. The photo is dark to begin with
 * (its brightest pixel is only 0.17 relative luminance), so even the thinnest
 * end holds white text at 8.2:1 and the body copy at 5.0:1. That body copy is
 * white/70 rather than white/60 for exactly this reason: at 60% it falls to
 * 4.15:1 over the right edge and stops passing.
 *
 * Until a photo exists the band is simply solid ink — never broken, just plainer.
 */
export function WhyUs() {
  const skyline = photoUrl("why-us-chicago");

  return (
    <section className="relative isolate overflow-hidden bg-ink py-20 text-white lg:py-32">
      {skyline && (
        <>
          <img
            src={skyline}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 -z-20 size-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/35"
          />
        </>
      )}

      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p
              className="text-[13px] uppercase tracking-[0.12em] text-brand-400"
              style={{ fontVariationSettings: '"wdth" 105, "wght" 700' }}
            >
              Why choose us
            </p>
            <h2 className="type-title mt-5 max-w-md text-[32px] sm:text-[42px]">
              {whyUs.title}
            </h2>
            <p className="type-lead mt-5 max-w-[44ch] text-[16px] text-white/70">
              Experience, straight answers and work that holds up — for homes
              and businesses across Chicago.
            </p>
            <div className="mt-9">
              <BookButton variant="light" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {/*
                Same rule as the service cards: these are claims, not links,
                so the hover is emphasis only — the badge lights up and the
                body copy comes forward. On ink the move that reads is
                brightness, not shadow, so nothing lifts off the band.
              */}
              {whyUs.points.map((p) => (
                <li
                  key={p.title}
                  className={[
                    "group",
                    "motion-safe:transition-transform",
                    "motion-safe:duration-[var(--dur-base)] motion-safe:ease-[var(--ease-out-quint)]",
                    "motion-safe:hover:translate-x-1",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "inline-flex size-11 items-center justify-center bg-white/10 text-brand-400 backdrop-blur-[2px]",
                      "transition-colors duration-[var(--dur-base)] ease-[var(--ease-out-quint)]",
                      "group-hover:bg-brand-500 group-hover:text-white",
                    ].join(" ")}
                  >
                    <Check className="size-5" aria-hidden="true" />
                  </span>
                  <h3
                    className="mt-4 text-[17px] leading-snug"
                    style={{ fontVariationSettings: '"wdth" 106, "wght" 660' }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/70 transition-colors duration-[var(--dur-base)] group-hover:text-white/90">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
