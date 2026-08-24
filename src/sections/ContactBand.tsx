import { Mail, Phone } from "lucide-react";
import { CallbackButton } from "@/components/CallbackButton";
import { Reveal } from "@/components/Reveal";
import { company } from "@/content";

export function ContactBand() {
  return (
    <section className="container-page py-16">
      <Reveal>
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-panel)] bg-black/[0.07] md:grid-cols-3">
          <div className="flex flex-col justify-center gap-5 bg-brand-500 p-8 text-white">
            <h2 className="text-[22px] font-semibold leading-snug">
              Request a quote today for your next project
            </h2>
            <CallbackButton variant="light" className="self-start" />
          </div>

          <a
            href={company.phoneHref}
            className="group flex flex-col justify-center gap-2 bg-white p-8 transition-colors hover:bg-brand-50"
          >
            <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
              <Phone className="size-4 text-brand-500" aria-hidden="true" />
              Call us
            </span>
            <span className="text-[22px] font-semibold transition-colors group-hover:text-brand-600">
              {company.phone}
            </span>
          </a>

          <a
            href={company.emailHref}
            className="group flex flex-col justify-center gap-2 bg-white p-8 transition-colors hover:bg-brand-50"
          >
            <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
              <Mail className="size-4 text-brand-500" aria-hidden="true" />
              Email us
            </span>
            <span className="break-all text-[22px] font-semibold transition-colors group-hover:text-brand-600">
              {company.email}
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
