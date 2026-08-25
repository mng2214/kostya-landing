import { useMemo } from "react";
import { useSeo } from "@/lib/seo";
import { seo } from "@/content";
import { breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/sections/ContactForm";
import { ContactBand } from "@/sections/ContactBand";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";
import { CallbackButton } from "@/components/CallbackButton";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { company } from "@/content";

export default function Contact() {
  const schema = useMemo(
    () => [
      localBusinessSchema(),
      breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
      faqSchema(),
    ],
    [],
  );
  useSeo({ ...seo.contact, path: "/contact", schema });

  return (
    <>
      <PageHero
        kicker="Contact us"
        title="Tell us what broke"
        body={`We cover ${company.serviceArea}. Send the form, request a callback, or just call — all three reach the same crew.`}
        crumbs={[{ label: "Contact" }]}
      >
        <CallbackButton variant="solid" />
      </PageHero>

      <ContactForm />

      <section className="container-page pb-16">
        <Reveal>
          <div className="overflow-hidden rounded-[var(--radius-panel)] border border-black/[0.08]">
            <Placeholder
              label="Map — service area"
              ratio="21/8"
              rounded="rounded-none"
              className="w-full"
            />
          </div>
          <p className="mt-4 text-center text-[13px] text-ink-muted">
            Map placeholder — drop in a Google Maps embed for{" "}
            <a
              href={company.mapHref}
              target="_blank"
              rel="noreferrer noopener"
              className="font-semibold text-brand-600 hover:underline"
            >
              {company.address}
            </a>
          </p>
        </Reveal>
      </section>

      <ContactBand />
      <Faq />
      <FinalCta />
    </>
  );
}
