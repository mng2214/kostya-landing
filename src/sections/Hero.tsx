import { BookButton } from "@/components/BookButton";
import { CallButton } from "@/components/CallButton";
import { Enter } from "@/components/Enter";
import { Placeholder } from "@/components/Placeholder";
import { hero } from "@/content";

/**
 * The entrance used to be driven by Framer Motion. On the live site the image
 * column sat at opacity 0 — Motion animates through requestAnimationFrame,
 * which is paused whenever the page is not being painted, so the animation
 * never ran and the photo simply never appeared. `Enter` keeps the same
 * staggered feel but can only ever be late, not absent.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/*
        The image breaks the container and runs to the viewport edge on wide
        screens. Symmetric two-column heroes are the reflex; this isn't one.
      */}
      <div className="container-page relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
        <div className="relative z-10 max-w-2xl">
          <Enter>
            <h1
              /*
               * Fluid size instead of breakpoint steps: at 1024px the text
               * column is only ~483px wide, so a fixed lg size overflows.
               * Measured against the widest word pair in the headline.
               */
              style={{ fontSize: "clamp(2.5rem, 4.9vw, 4rem)" }}
              className="type-display"
            >
              {hero.title[0]}{" "}
              <span className="text-brand-500">{hero.title[1]}</span>
            </h1>
          </Enter>

          <Enter delay={0.08}>
            <p className="type-lead prose-measure mt-7 max-w-[46ch] text-[18px] text-ink-muted">
              {hero.body}
            </p>
          </Enter>

          <Enter delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <BookButton size="lg" />
              <CallButton variant="outline" size="lg" />
            </div>
          </Enter>
        </div>

        <Enter
          delay={0.12}
          y={0}
          scale={0.98}
          className="relative lg:-mr-[max(0px,calc((100vw-1240px)/2+2rem))]"
        >
          <Placeholder
            slot="hero-technician"
            alt="A USA Appliance & HVAC technician testing a furnace control board with a multimeter in a Chicago basement"
            priority
            label="Hero — technician portrait"
            ratio="4/3.6"
            rounded="rounded-[var(--radius-panel)] lg:rounded-r-none"
            className="w-full"
          />
        </Enter>
      </div>
    </section>
  );
}
