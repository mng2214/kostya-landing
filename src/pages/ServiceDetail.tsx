import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { CallbackButton } from "@/components/CallbackButton";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Eyebrow } from "@/components/Eyebrow";
import { Process } from "@/sections/Process";
import { FinalCta } from "@/sections/FinalCta";
import { services } from "@/content";
import NotFound from "./NotFound";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <NotFound />;

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        kicker="Service"
        title={service.title}
        body={service.short}
        crumbs={[{ label: "Services", to: "/services" }, { label: service.title }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button to="/contact">Get a Quote</Button>
          <CallbackButton topic={service.title} />
          <span className="text-[14px] font-semibold text-ink-muted">
            From {service.priceFrom}
          </span>
        </div>
      </PageHero>

      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal>
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <ServiceIcon name={service.icon} className="size-7" />
            </span>

            {service.body.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted"
              >
                {p}
              </p>
            ))}

            <h2 className="mt-12 text-[24px] font-semibold">What's included</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-black/[0.08] bg-white px-5 py-4"
                >
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  <span className="text-[15px] leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <Placeholder label={service.title} ratio="4/5" className="w-full" />

            <div className="mt-5 rounded-[var(--radius-card)] border border-black/[0.08] bg-surface p-7">
              <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-ink-muted">
                Starting at
              </p>
              <p className="mt-2 text-[32px] font-extrabold leading-none text-brand-500">
                {service.priceFrom}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                Final price is fixed in writing after the on-site assessment. No
                hourly creep once the number is agreed.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button to="/contact" className="w-full">
                  Get a Quote
                </Button>
                <CallbackButton
                  topic={service.title}
                  className="w-full"
                  label="Have a tech call me"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-alt py-16">
        <div className="container-page">
          <Eyebrow>More services</Eyebrow>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group rounded-[var(--radius-card)] border border-black/[0.08] bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-500/30"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <ServiceIcon name={s.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-[17px] font-semibold">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                  {s.short}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <FinalCta />
    </>
  );
}
