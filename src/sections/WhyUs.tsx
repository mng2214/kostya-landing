import { Check } from "lucide-react";
import { Button } from "@/components/Button";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { whyUs } from "@/content";

export function WhyUs() {
  return (
    <section className="container-page py-16 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Placeholder
            slot="why-us-technician"
            alt="Close view of a technician fitting a replacement capacitor into an air-conditioning condenser"
            label="Technician at work"
            ratio="4/3.6"
            className="w-full"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="type-title text-[32px] sm:text-[42px] max-w-lg">{whyUs.title}</h2>

          {/*
            These points are statements, not destinations, so the hover reads
            as emphasis rather than affordance: a small sideways shift, the
            badge waking up, the body text firming from muted to ink. No lift,
            no shadow, no pointer cursor — nothing that promises a click that
            isn't there.
          */}
          <ul className="mt-9 space-y-2">
            {whyUs.points.map((p) => (
              <li
                key={p.title}
                className={[
                  "group -mx-4 flex gap-4 rounded-[var(--radius-action)] px-4 py-4",
                  "motion-safe:transition-[transform,background-color]",
                  "motion-safe:duration-[var(--dur-base)] motion-safe:ease-[var(--ease-out-quint)]",
                  "hover:bg-surface motion-safe:hover:translate-x-1",
                ].join(" ")}
              >
                <span
                  className={[
                    "mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white",
                    "motion-safe:transition-transform motion-safe:duration-[var(--dur-base)]",
                    "motion-safe:ease-[var(--ease-out-quint)] motion-safe:group-hover:scale-110",
                  ].join(" ")}
                >
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold transition-colors duration-[var(--dur-base)] group-hover:text-brand-600">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-ink-muted transition-colors duration-[var(--dur-base)] group-hover:text-ink">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Button to={whyUs.cta.to} variant="outline">
              {whyUs.cta.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
