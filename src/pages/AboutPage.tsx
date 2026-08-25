import { useMemo } from "react";
import { useSeo } from "@/lib/seo";
import { seo } from "@/content";
import { breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { About } from "@/sections/About";
import { Process } from "@/sections/Process";
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
        title="A Chicago-area crew that shows up when it says it will"
        body={`${company.name} covers ${company.serviceArea}. Handyman work, HVAC and appliance repair under one number, with written estimates and a warranty on the labour.`}
        crumbs={[{ label: "About" }]}
      />
      <About />
      <WhyUs />
      <Process />
      <GoogleReviews />
      <Faq />
      <FinalCta />
    </>
  );
}
