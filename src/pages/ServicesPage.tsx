import { useMemo } from "react";
import { useSeo } from "@/lib/seo";
import { seo } from "@/content";
import { breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Services } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { ContactBand } from "@/sections/ContactBand";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";
import { CallbackButton } from "@/components/CallbackButton";
import { Button } from "@/components/Button";

export default function ServicesPage() {
  const schema = useMemo(
    () => [
      localBusinessSchema(),
      breadcrumbSchema([{ name: "Services", path: "/services" }]),
      faqSchema(),
    ],
    [],
  );
  useSeo({ ...seo.services, path: "/services", schema });

  return (
    <>
      <PageHero
        kicker="What we do"
        title="Handyman, HVAC and appliance repair — one crew, one number"
        body="Six service lines that cover almost everything a house throws at you. Every job is quoted in writing before work starts."
        crumbs={[{ label: "Services" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/contact">Get a Quote</Button>
          <CallbackButton />
        </div>
      </PageHero>
      <Services showHeader={false} />
      <Process />
      <ContactBand />
      <Faq />
      <FinalCta />
    </>
  );
}
