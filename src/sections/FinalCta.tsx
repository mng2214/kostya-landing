import { BookButton } from "@/components/BookButton";
import { CallButton } from "@/components/CallButton";
import { Reveal } from "@/components/Reveal";
import { finalCta } from "@/content";

export function FinalCta() {
  return (
    <section className="container-page pb-20 pt-4">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[var(--radius-panel)] bg-brand-500 px-7 py-16 text-center text-white sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 -z-10 size-72 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -right-20 -z-10 size-80 rounded-full bg-brand-600/50 blur-3xl"
          />

          <h2 className="mx-auto max-w-2xl text-[32px] font-semibold leading-[1.14] sm:text-[44px]">
            {finalCta.title[0]}
            <br />
            {finalCta.title[1]}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-white/80">
            {finalCta.body}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <BookButton variant="light" size="lg" />
            <CallButton variant="quiet" size="lg" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
