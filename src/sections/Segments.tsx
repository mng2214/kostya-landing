import { Check } from "lucide-react";
import { BookButton } from "@/components/BookButton";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { segments } from "@/content";

export function Segments() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="container-page">
        <Reveal>
          <h2 className="type-title max-w-xl text-[32px] sm:text-[42px]">
            {segments.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {segments.items.map((item, i) => (
            <Reveal key={item.key} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-[var(--radius-panel)] border border-black/[0.08] bg-white p-8">
                <h3 className="text-[24px] font-semibold">{item.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">
                  {item.body}
                </p>

                <ul className="mt-7 flex-1 space-y-3">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      <span className="text-[15px] leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {item.key === "residential" ? (
                    <BookButton variant="outline" />
                  ) : (
                    <Button to={item.cta.to} variant="outline">
                      {item.cta.label}
                    </Button>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
