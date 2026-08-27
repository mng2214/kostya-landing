import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BookButton } from "@/components/BookButton";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { serviceGroups, type Service, type ServiceGroup } from "@/content";

/** A single service inside a category — links out only if it has its own page. */
export function ServiceRow({ service, groupSlug }: { service: Service; groupSlug: string }) {
  const inner = (
    <>
      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-none bg-brand-50 text-brand-600">
        <ServiceIcon name={service.icon} className="size-[18px]" />
      </span>
      <span className="min-w-0">
        <span className="block text-[16px] font-semibold">{service.title}</span>
        <span className="mt-1 block text-[14px] leading-snug text-ink-muted">
          {service.short}
        </span>
      </span>
      {service.hasPage && (
        <ArrowRight
          className="mt-2 size-4 shrink-0 text-brand-500 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  const className =
    "group flex gap-3.5 rounded-[var(--radius-card)] border border-black/[0.08] bg-white p-5 transition-colors";

  return service.hasPage ? (
    <Link to={`/${groupSlug}/${service.slug}`} className={`${className} hover:border-brand-500/35`}>
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  );
}

export function GroupCard({ group }: { group: ServiceGroup }) {
  return (
    <Link
      to={`/${group.slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-black/[0.08] bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-[0_24px_50px_-28px_rgba(34,64,156,0.5)]"
    >
      <span className="inline-flex size-12 items-center justify-center rounded-none bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
        <ServiceIcon name={group.icon} />
      </span>

      <h3 className="mt-6 text-[19px] font-semibold">{group.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{group.short}</p>

      <ul className="mt-5 flex-1 space-y-1.5">
        {group.services.slice(0, 4).map((s) => (
          <li key={s.slug} className="text-[14px] text-ink-muted">
            {s.title}
          </li>
        ))}
        {group.services.length > 4 && (
          <li className="text-[14px] text-ink-muted/70">
            +{group.services.length - 4} more
          </li>
        )}
      </ul>

      <span className="mt-6 inline-flex items-center gap-1.5 border-t border-black/[0.07] pt-5 text-[14px] font-semibold text-brand-600">
        View services
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

export function Services() {
  return (
    <section className="bg-surface-alt py-16 lg:py-24">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Our services</Eyebrow>
              <h2 className="type-title mt-5 max-w-xl text-[32px] sm:text-[42px]">
                Appliance and HVAC service, residential and commercial
              </h2>
            </div>
            <BookButton />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceGroups.map((g, i) => (
            <Reveal key={g.slug} delay={(i % 4) * 0.06}>
              <GroupCard group={g} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
