import { useMemo } from "react";
import { useSeo } from "@/lib/seo";
import { seo } from "@/content";
import { breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { About } from "@/sections/About";
import { Process } from "@/sections/Process";
import { Equipment } from "@/sections/Equipment";
import { WhyUs } from "@/sections/WhyUs";
import { GoogleReviews } from "@/sections/GoogleReviews";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";
import { company } from "@/content";

export default function AboutPage() {
  const schema = useMemo(
    () => [
      localBusinessSchema(),
      breadcrumbSchema([{ name: "About", path: "/about" }]),
      faqSchema(),
    ],
    [],
  );
  useSeo({ ...seo.about, path: "/about", schema });

  return (
    <>
      <PageHero
        kicker="Our company"
        title="Seven years on Chicago appliance and HVAC equipment"
        body={`Seven years servicing professional-grade appliance and HVAC equipment across ${company.serviceArea} — for homes, restaurants and managed property. Diagnosis first, then the cost, then the work.`}
        crumbs={[{ label: "About" }]}
      />
      <About />
      <WhyUs />
      <Equipment />
      <Process />
      <GoogleReviews />
      <Faq />
      <FinalCta />
    </>
  );
}
