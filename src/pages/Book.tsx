import { Clock3, PhoneCall } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CallButton } from "@/components/CallButton";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/sections/ContactForm";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";
import { useSeo } from "@/lib/seo";
import { bookingLabel, bookingUrl, isConfigured } from "@/lib/booking";
import { booking, company, seo } from "@/content";

export default function Book() {
  useSeo({ ...seo.book, path: "/book" });

  return (
    <>
      <PageHero
        kicker={bookingLabel}
        title={booking.headline}
        body={booking.body}
        crumbs={[{ label: bookingLabel }]}
      />

      <section className="container-page py-16 lg:py-24">
        <Reveal>
          {isConfigured ? (
            /*
             * Housecall Pro is embedded rather than linked, so the customer
             * never leaves the site mid-booking.
             */
            <div className="overflow-hidden rounded-[var(--radius-panel)] border border-black/[0.08]">
              <iframe
                src={bookingUrl}
                title={`${booking.provider} online booking`}
                className="h-[820px] w-full"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="mx-auto max-w-2xl border border-black/[0.08] bg-surface p-8 text-center sm:p-12">
              <span className="inline-flex size-14 items-center justify-center bg-brand-50 text-brand-600">
                <PhoneCall className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-[24px] font-semibold">
                Two ways to reach the crew
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-ink-muted">
                Call and describe the fault — that is usually the fastest route
                to a time window. Or send the form below and we come back to you
                with one.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <CallButton variant="solid" size="lg" />
              </div>

              <p className="mt-8 flex items-center justify-center gap-2 text-[13px] text-ink-muted">
                <Clock3 className="size-3.5" aria-hidden="true" />
                {company.hours}
              </p>
            </div>
          )}
        </Reveal>
      </section>

      <ContactForm />
      <Faq />
      <FinalCta />
    </>
  );
}
