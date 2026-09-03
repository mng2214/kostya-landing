import { useParams } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { BookButton } from "@/components/BookButton";
import { CallButton } from "@/components/CallButton";
import { Reveal } from "@/components/Reveal";
import { ServiceRow } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { ServiceAreasBand } from "@/sections/ServiceAreasBand";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";
import { useSeo } from "@/lib/seo";
import { groupSeo, serviceGroups } from "@/content";
import NotFound from "./NotFound";

/** One component behind all four category routes — the data drives the page. */
export default function ServiceCategory() {
  const { group: slug } = useParams();
  const group = serviceGroups.find((g) => g.slug === slug);
  const meta = group ? groupSeo[group.slug] : undefined;

  useSeo(
    meta
      ? { ...meta, path: `/${slug}` }
      : { title: "Page Not Found", description: "", noindex: true },
  );

  if (!group) return <NotFound />;

  return (
    <>
      <PageHero
        kicker={group.navLabel}
        title={group.title}
        body={group.short}
        crumbs={[{ label: group.navLabel }]}
      >
        <div className="flex flex-wrap gap-3">
          <BookButton />
          <CallButton />
        </div>
      </PageHero>

      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            {group.intro.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="type-lead mt-0 mb-5 max-w-[46ch] text-[17px] text-ink-muted"
              >
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.services.map((s) => (
                <ServiceRow key={s.slug} service={s} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Process />
      <ServiceAreasBand />
      <Faq />
      <FinalCta />
    </>
  );
}
