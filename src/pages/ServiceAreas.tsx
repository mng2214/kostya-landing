import { PageHero } from "@/components/PageHero";
import { BookButton } from "@/components/BookButton";
import { CallButton } from "@/components/CallButton";
import { Reveal } from "@/components/Reveal";
import { useSeo } from "@/lib/seo";
import { Segments } from "@/sections/Segments";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";
import { company, seo, serviceAreaTowns } from "@/content";

export default function ServiceAreas() {
  const COLUMNS = 6; // lowest common multiple of the 2- and 3-column layouts
  const fillers = (COLUMNS - (serviceAreaTowns.length % COLUMNS)) % COLUMNS;

  useSeo({ ...seo.serviceAreas, path: "/service-areas" });

  return (
    <>
      <PageHero
        kicker="Service areas"
        title="Where we work"
        body={`USA Appliance & HVAC covers ${company.serviceArea} for appliance and HVAC repair, installation and maintenance.`}
        crumbs={[{ label: "Service Areas" }]}
      >
        <div className="flex flex-wrap gap-3">
          <BookButton />
          <CallButton />
        </div>
      </PageHero>

      <section className="container-page py-16 lg:py-24">
        <Reveal>
          {/*
            The grid lines are the container background showing through a 1px
            gap. That trick leaves the tail of the last row grey whenever the
            count is not a multiple of the column count — 22 towns across 3
            columns left two grey blocks. Blank filler cells complete the row so
            the pattern holds at any count and any breakpoint.

            The repeated pin is gone for the same reason it left the marquee:
            twenty-two identical icons carry no information after the first.
          */}
          <ul className="grid gap-px overflow-hidden bg-black/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreaTowns.map((town) => (
              <li
                key={town}
                className="flex items-center gap-3 bg-white px-6 py-5 text-[16px]"
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rotate-45 bg-brand-500/70"
                />
                {town}
              </li>
            ))}
            {Array.from({ length: fillers }).map((_, i) => (
              <li key={`filler-${i}`} aria-hidden="true" className="hidden bg-white sm:block" />
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 max-w-[60ch] text-[15px] leading-relaxed text-ink-muted">
            Not on the list? Call {company.phone} and ask. We would rather tell
            you no on the phone than add a travel charge to the invoice.
          </p>
        </Reveal>
      </section>

      <Segments />
      <Faq />
      <FinalCta />
    </>
  );
}
