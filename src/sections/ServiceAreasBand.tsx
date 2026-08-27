import { Button } from "@/components/Button";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { company, serviceAreaTowns } from "@/content";

/**
 * Coverage as two counter-running lines.
 *
 * Boxed chips with a pin on each one turned this into a tag cloud — twenty-two
 * identical rectangles competing with each other, and the same icon repeated
 * twenty-two times carrying no information after the first. Set as plain type
 * with a single accent dot between names, it reads as one continuous statement
 * of reach, which is what the section is actually saying.
 *
 * Hover pauses both rows so a specific town can be read. The full list also
 * lives on /service-areas as static text, so motion is never the only route to
 * the information.
 */
function Row({ towns, reverse, speed }: { towns: readonly string[]; reverse?: boolean; speed: number }) {
  return (
    <Marquee speed={speed} reverse={reverse}>
      {towns.map((town) => (
        <span key={town} className="flex items-center gap-8 pr-8">
          <span
            className="whitespace-nowrap text-[20px] leading-none text-ink transition-colors duration-200 hover:text-brand-600 sm:text-[24px]"
            style={{ fontVariationSettings: '"wdth" 104, "wght" 560' }}
          >
            {town}
          </span>
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rotate-45 bg-brand-500/70"
          />
        </span>
      ))}
    </Marquee>
  );
}

export function ServiceAreasBand() {
  const half = Math.ceil(serviceAreaTowns.length / 2);

  return (
    <section className="overflow-hidden py-16 lg:py-24">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="type-title max-w-md text-[32px] sm:text-[42px]">
                Service areas
              </h2>
              <p className="type-lead mt-5 max-w-[48ch] text-[16px] text-ink-muted">
                We cover {company.serviceArea}. If you are on the edge of our
                range we will say so up front rather than adding a travel charge
                later.
              </p>
            </div>
            <Button to="/service-areas" variant="outline">
              All service areas
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Full-bleed: the lines should run off both edges of the screen. */}
      <div
        className="mt-12 space-y-5"
        style={{ ["--marquee-edge" as string]: "#ffffff" }}
      >
        <Row towns={serviceAreaTowns.slice(0, half)} speed={78} />
        <Row towns={serviceAreaTowns.slice(half)} speed={94} reverse />
      </div>
    </section>
  );
}
