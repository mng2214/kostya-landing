import { CalendarCheck, ExternalLink, Phone } from "lucide-react";
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
            <div className="mx-auto max-w-2xl rounded-[var(--radius-panel)] border border-black/[0.08] bg-surface p-8 text-center sm:p-12">
              <span className="inline-flex size-14 items-center justify-center rounded-none bg-brand-50 text-brand-600">
                <CalendarCheck className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-[24px] font-semibold">
                Online booking is being connected
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-ink-muted">
                The {booking.provider} scheduler goes live here shortly. Until
                then, call and we will book you in directly — usually faster
                than the form anyway.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <CallButton variant="solid" size="lg" />
              </div>

              <p className="mt-8 flex items-center justify-center gap-2 text-[13px] text-ink-muted">
                <Phone className="size-3.5" aria-hidden="true" />
                {company.hours}
              </p>

              <p className="mt-6 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-ink-muted/60">
                <ExternalLink className="size-3" aria-hidden="true" />
                Set VITE_BOOKING_URL to activate
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
