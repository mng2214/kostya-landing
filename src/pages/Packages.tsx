import { useMemo } from "react";
import { useSeo } from "@/lib/seo";
import { seo } from "@/content";
import { breadcrumbSchema, faqSchema, offerCatalogSchema } from "@/lib/schema";
import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CallbackButton } from "@/components/CallbackButton";
import { Button } from "@/components/Button";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";
import { packages } from "@/content";
import { cn } from "@/lib/utils";

export default function Packages() {
  const schema = useMemo(
    () => [
      offerCatalogSchema(),
      breadcrumbSchema([{ name: "Packages", path: "/packages" }]),
      faqSchema(),
    ],
    [],
  );
  useSeo({ ...seo.packages, path: "/packages", schema });

  return (
    <>
      <PageHero
        kicker={packages.kicker}
        title={packages.title}
        body={packages.body}
        crumbs={[{ label: "Packages" }]}
      />

      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {packages.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.07}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-[var(--radius-panel)] border p-8",
                  plan.featured
                    ? "border-brand-500 bg-brand-500 text-white shadow-[0_30px_70px_-30px_rgba(81,116,255,0.9)]"
                    : "border-black/[0.08] bg-white",
                )}
              >
                {plan.featured && (
                  <span className="mb-5 inline-flex w-fit rounded-full bg-white/20 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em]">
                    Most popular
                  </span>
                )}

                <h2 className="text-[20px] font-semibold">{plan.name}</h2>
                <p
                  className={cn(
                    "mt-2 text-[15px] leading-relaxed",
                    plan.featured ? "text-white/80" : "text-ink-muted",
                  )}
                >
                  {plan.summary}
                </p>

                <div className="mt-7 flex items-end gap-2">
                  <span className="text-[42px] font-extrabold leading-none">
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "pb-1 text-[14px]",
                      plan.featured ? "text-white/70" : "text-ink-muted",
                    )}
                  >
                    {plan.cadence}
                  </span>
                </div>

                <ul className="mt-8 flex-1 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full",
                          plan.featured
                            ? "bg-white/25 text-white"
                            : "bg-brand-500 text-white",
                        )}
                      >
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      <span
                        className={cn(
                          "text-[15px] leading-snug",
                          plan.featured ? "text-white/90" : "text-ink",
                        )}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9">
                  {plan.featured ? (
                    <Button to="/contact" variant="light" className="w-full">
                      {plan.cta}
                    </Button>
                  ) : (
                    <Button to="/contact" variant="outline" className="w-full">
                      {plan.cta}
                    </Button>
                  )}
                  <CallbackButton
                    topic={plan.name}
                    label="Ask a question first"
                    variant={plan.featured ? "quiet" : "outline"}
                    className="mt-3 w-full"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Faq />
      <FinalCta />
    </>
  );
}
