import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { BookButton } from "@/components/BookButton";
import { CallButton } from "@/components/CallButton";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Eyebrow } from "@/components/Eyebrow";
import { Process } from "@/sections/Process";
import { FinalCta } from "@/sections/FinalCta";
import { useSeo } from "@/lib/seo";
import type { PhotoSlot } from "@/lib/photos";
import { seo, serviceGroups } from "@/content";
import NotFound from "./NotFound";

export default function ServiceDetail() {
  const { group: groupSlug, slug } = useParams();
  const group = serviceGroups.find((g) => g.slug === groupSlug);
  const service = group?.services.find((s) => s.slug === slug && s.hasPage);

  useSeo(
    service && group
      ? {
          title: `${service.title} — USA Appliance & HVAC`.slice(0, 60),
          description: service.short,
          path: `/${group.slug}/${service.slug}`,
        }
      : { ...seo.notFound, noindex: true },
  );

  if (!group || !service) return <NotFound />;

  const siblings = group.services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        kicker={group.navLabel}
        title={service.title}
        body={service.short}
        crumbs={[{ label: group.navLabel, to: `/${group.slug}` }, { label: service.title }]}
      >
        <div className="flex flex-wrap gap-3">
          <BookButton />
          <CallButton />
        </div>
      </PageHero>

      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal>
            <span className="inline-flex size-14 items-center justify-center rounded-none bg-brand-50 text-brand-600">
              <ServiceIcon name={service.icon} className="size-7" />
            </span>

            {service.body?.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="type-lead mt-6 max-w-[62ch] text-[17px] text-ink-muted"
              >
                {p}
              </p>
            ))}

            {service.includes && (
              <>
                <h2 className="mt-12 text-[24px] font-semibold">What we handle</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-none border border-black/[0.08] bg-white px-5 py-4"
                    >
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      <span className="text-[15px] leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>

          {/*
            The sidebar used to run more than twice the height of the text
            beside it: a 4:5 portrait in a ~445px column is ~556px tall before
            the booking box is added, so it dangled far below the article and
            crowded the next section.

            Two changes: the image is cropped to 4:3 in this position (the file
            is untouched — object-cover does the work), and the column sticks
            once the article outruns it on the services with longer lists.
          */}
          <Reveal delay={0.08}>
            <div className="lg:sticky lg:top-28">
            <Placeholder
              slot={`service-${service.slug}` as PhotoSlot}
              alt={`${service.title} — ${service.short}`}
              label={service.title}
              ratio="4/3"
              className="w-full"
            />

            <div className="mt-5 rounded-[var(--radius-card)] border border-black/[0.08] bg-surface p-7">
              <h3 className="text-[17px] font-semibold">Book this repair</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                Pick a time online, or call and describe the fault — whichever is
                faster for you.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <BookButton className="w-full" />
                <CallButton className="w-full" />
              </div>
            </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-alt py-16">
        <div className="container-page">
          <Eyebrow>{`More in ${group.navLabel}`}</Eyebrow>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {siblings.map((s) => {
              const card = (
                <>
                  <span className="inline-flex size-11 items-center justify-center rounded-none bg-brand-50 text-brand-600">
                    <ServiceIcon name={s.icon} className="size-5" />
                  </span>
                  <h3 className="mt-5 text-[17px] font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                    {s.short}
                  </p>
                </>
              );
              const cls =
                "rounded-[var(--radius-card)] border border-black/[0.08] bg-white p-6 transition-all";
              return s.hasPage ? (
                <Link
                  key={s.slug}
                  to={`/${group.slug}/${s.slug}`}
                  className={`${cls} hover:-translate-y-1 hover:border-brand-500/30`}
                >
                  {card}
                </Link>
              ) : (
                <div key={s.slug} className={cls}>
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Process />
      <FinalCta />
    </>
  );
}
