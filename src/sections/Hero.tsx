import { motion, type Variants } from "framer-motion";
import { BookButton } from "@/components/BookButton";
import { CallButton } from "@/components/CallButton";
import { Placeholder } from "@/components/Placeholder";
import { hero } from "@/content";

const EASE = [0.22, 1, 0.36, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: EASE },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/*
        The image breaks the container and runs to the viewport edge on wide
        screens. Symmetric two-column heroes are the reflex; this isn't one.
      */}
      <div className="container-page relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
        <div className="relative z-10 max-w-2xl">
          <motion.h1
            custom={0}
            variants={rise}
            initial="hidden"
            animate="show"
            /*
             * Fluid size instead of breakpoint steps: at 1024px the text
             * column is only ~483px wide, so a fixed lg size overflows.
             * Measured against the widest word pair in the headline.
             */
            style={{ fontSize: "clamp(2.5rem, 4.9vw, 4rem)" }}
            className="type-display"
          >
            {hero.title[0]}{" "}
            <span className="text-brand-500">{hero.title[1]}</span>
          </motion.h1>

          <motion.p
            custom={1}
            variants={rise}
            initial="hidden"
            animate="show"
            className="type-lead prose-measure mt-7 max-w-[46ch] text-[18px] text-ink-muted"
          >
            {hero.body}
          </motion.p>

          <motion.div
            custom={2}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <BookButton size="lg" />
            <CallButton variant="outline" size="lg" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:-mr-[max(0px,calc((100vw-1240px)/2+2rem))]"
        >
          <Placeholder
            slot="hero-technician"
            alt="A USA Appliance & HVAC technician testing a furnace control board with a multimeter in a Chicago basement"
            priority
            label="Hero — technician portrait"
            ratio="4/3.6"
            rounded="rounded-[var(--radius-panel)] lg:rounded-r-none"
            className="w-full"
          />

        </motion.div>
      </div>
    </section>
  );
}
