import { useMemo } from "react";
import { useSeo } from "@/lib/seo";
import { seo } from "@/content";
import { faqSchema, localBusinessSchema, websiteSchema } from "@/lib/schema";
import { Hero } from "@/sections/Hero";
import { TrustStrip } from "@/sections/TrustStrip";
import { Services } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { About } from "@/sections/About";
import { WhyUs } from "@/sections/WhyUs";
import { GoogleReviews } from "@/sections/GoogleReviews";
import { ContactForm } from "@/sections/ContactForm";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";

export default function Home() {
  const schema = useMemo(
    () => [localBusinessSchema(), websiteSchema(), faqSchema()],
    [],
  );
  useSeo({ ...seo.home, path: "/", schema });

  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <Process />
      <About />
      <WhyUs />
      <GoogleReviews />
      <ContactForm />
      <Faq />
      <FinalCta />
    </>
  );
}
