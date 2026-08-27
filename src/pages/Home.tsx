import { Hero } from "@/sections/Hero";
import { TrustStrip } from "@/sections/TrustStrip";
import { ServiceSelector } from "@/sections/ServiceSelector";
import { WhyUs } from "@/sections/WhyUs";
import { Equipment } from "@/sections/Equipment";
import { Segments } from "@/sections/Segments";
import { ServiceAreasBand } from "@/sections/ServiceAreasBand";
import { GoogleReviews } from "@/sections/GoogleReviews";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";
import { useSeo } from "@/lib/seo";
import { localBusinessSchema, faqSchema } from "@/lib/schema";
import { seo } from "@/content";

export default function Home() {
  useSeo({
    ...seo.home,
    path: "/",
    schema: [localBusinessSchema(), faqSchema()],
  });

  return (
    <>
      <Hero />
      <TrustStrip />
      <ServiceSelector />
      <WhyUs />
      <Equipment />
      <Segments />
      <ServiceAreasBand />
      <GoogleReviews />
      <Faq />
      <FinalCta />
    </>
  );
}
