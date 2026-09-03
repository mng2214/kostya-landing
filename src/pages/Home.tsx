import { Hero } from "@/sections/Hero";
import { ServiceSelector } from "@/sections/ServiceSelector";
import { WhyUs } from "@/sections/WhyUs";
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
      <ServiceSelector />
      <ServiceAreasBand />
      <WhyUs />
      <Segments />
      <GoogleReviews />
      <Faq />
      <FinalCta />
    </>
  );
}
