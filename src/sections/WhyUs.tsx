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
            label="Technician at work"
            ratio="4/3.6"
            className="w-full"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="type-title text-[32px] sm:text-[42px] max-w-lg">{whyUs.title}</h2>

          <ul className="mt-9 space-y-6">
            {whyUs.points.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold">{p.title}</h3>
                  <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-ink-muted">
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
