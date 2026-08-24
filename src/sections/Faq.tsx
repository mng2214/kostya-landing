import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/content";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-page py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <h2 className="type-title text-[32px] sm:text-[42px] max-w-sm">
            Questions we get before the first visit
          </h2>
          <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-ink-muted">
            Anything not covered here — call and ask. We would rather answer it
            now than have it become a surprise on the invoice.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "text-[17px] font-semibold transition-colors",
                        isOpen ? "text-brand-600" : "text-ink",
                      )}
                    >
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full transition-colors",
                        isOpen
                          ? "bg-brand-500 text-white"
                          : "bg-black/[0.05] text-ink",
                      )}
                    >
                      {isOpen ? (
                        <Minus className="size-4" aria-hidden="true" />
                      ) : (
                        <Plus className="size-4" aria-hidden="true" />
                      )}
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-6 pr-10 text-[15px] leading-relaxed text-ink-muted">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
