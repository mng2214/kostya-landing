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
