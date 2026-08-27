import { motion } from "framer-motion";
import { BookButton } from "@/components/BookButton";
import { CallButton } from "@/components/CallButton";
import { Spotlight } from "@/components/Spotlight";
import { process } from "@/content";

/**
 * The one drenched section on the page. Numbered markers are legitimate here
 * because this genuinely is an ordered sequence — not scaffolding.
 */
export function Process() {
  return (
    <Spotlight className="bg-ink py-20 text-white lg:py-28">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="type-title text-[32px] sm:text-[42px]">
              {process.title}
            </h2>
            <p className="type-lead mt-6 max-w-[42ch] text-[17px] text-white/60">
              No hourly creep, no discovering a second problem once the panel is
              open. The number you agree to is the number on the invoice.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BookButton variant="light" size="lg" />
              <CallButton variant="quiet" size="lg" />
            </div>
          </div>

          <ol className="relative">
            {process.steps.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group grid grid-cols-[auto_1fr] gap-x-6 border-t border-white/12 py-7 last:border-b"
              >
                <span
                  className="text-[15px] tabular-nums text-brand-400 transition-colors group-hover:text-white"
                  style={{ fontVariationSettings: '"wdth" 108, "wght" 700' }}
                >
                  {step.n}
                </span>
                <div>
                  <h3
                    className="text-[21px] leading-tight"
                    style={{ fontVariationSettings: '"wdth" 110, "wght" 660' }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-[46ch] text-[15px] leading-relaxed text-white/60">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </Spotlight>
  );
}
