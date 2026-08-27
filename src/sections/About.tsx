import { Button } from "@/components/Button";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { about } from "@/content";

export function About() {
  return (
    <section className="container-page py-16 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <Placeholder
              slot="about-crew"
              alt="Two USA Appliance & HVAC technicians talking through a job at the door of a Chicago two-flat"
              label="Crew on site"
              ratio="3/4"
              className="mt-8 w-full"
              rounded="rounded-[var(--radius-card)]"
            />
            <Placeholder
              slot="about-van"
              alt="The back of a USA Appliance & HVAC work van, shelved with parts bins, copper line set and a vacuum pump"
              label="Van & tools"
              ratio="3/4"
              className="w-full"
              rounded="rounded-[var(--radius-card)]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.08} className="order-1 lg:order-2">
          <h2 className="type-title text-[32px] sm:text-[42px] max-w-lg">{about.title}</h2>
          {about.body.map((p) => (
            <p
              key={p.slice(0, 24)}
              className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-muted"
            >
              {p}
            </p>
          ))}

          <dl className="mt-9 grid max-w-lg grid-cols-3 gap-4 border-y border-black/[0.08] py-6">
            {about.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-[30px] font-extrabold leading-none text-brand-500">
                    {s.value}
                  </span>
                  <span className="mt-2 block text-[13px] leading-snug text-ink-muted">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <Button to={about.cta.to} variant="outline">
              {about.cta.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
