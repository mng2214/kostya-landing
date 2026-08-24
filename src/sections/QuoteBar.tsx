import { Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { CallbackButton } from "@/components/CallbackButton";
import { company, quoteBar } from "@/content";
import { Reveal } from "@/components/Reveal";

export function QuoteBar() {
  return (
    <section className="container-page pb-16 pt-4">
      <Reveal>
        <div className="flex flex-col items-start gap-6 rounded-[var(--radius-panel)] bg-brand-500 px-7 py-8 text-white sm:px-10 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-xl text-[24px] font-semibold leading-snug sm:text-[28px]">
            {quoteBar.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button to={quoteBar.cta.to} variant="light">
              {quoteBar.cta.label}
            </Button>
            <CallbackButton variant="quiet" />
            <a
              href={company.phoneHref}
              className="inline-flex h-12 items-center gap-2.5 rounded-[var(--radius-pill)] border border-white/35 px-6 text-[15px] font-medium transition-colors hover:bg-white/10"
            >
              <Phone className="size-4" aria-hidden="true" />
              {company.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
