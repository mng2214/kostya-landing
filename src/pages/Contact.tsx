import { useMemo } from "react";
import { useSeo } from "@/lib/seo";
import { seo } from "@/content";
import { breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/sections/ContactForm";
import { ContactBand } from "@/sections/ContactBand";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";
import { BookButton } from "@/components/BookButton";
import { ServiceMap } from "@/components/ServiceMap";
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
        <BookButton variant="solid" />
      </PageHero>

      <ContactForm />

      <section className="container-page pb-16">
        <Reveal>
          <ServiceMap />
        </Reveal>
      </section>

      <ContactBand />
      <Faq />
      <FinalCta />
    </>
  );
}
