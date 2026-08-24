import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { services } from "@/content";

export function ServiceCard({
  service,
}: {
  service: (typeof services)[number];
}) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-black/[0.08] bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-[0_24px_50px_-28px_rgba(81,116,255,0.7)]"
    >
      <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
        <ServiceIcon name={service.icon} />
      </span>

      <h3 className="mt-6 text-[19px] font-semibold">{service.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
        {service.short}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-black/[0.07] pt-5">
        <span className="text-[13px] font-semibold text-ink-muted">
          From {service.priceFrom}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-600">
          Learn more
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

export function Services({
  limit,
  showHeader = true,
}: {
  limit?: number;
  showHeader?: boolean;
}) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <section className="bg-surface-alt py-16 lg:py-24">
      <div className="container-page">
        {showHeader && (
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>What we do</Eyebrow>
                <h2 className="type-title mt-5 text-[32px] sm:text-[42px] max-w-xl">
                  Explore our wide range of services
                </h2>
              </div>
              <Button to="/contact">Get a Quote</Button>
            </div>
          </Reveal>
        )}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.07}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
