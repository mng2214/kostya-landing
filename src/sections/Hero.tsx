import { motion, type Variants } from "framer-motion";
import { Clock3, MapPin } from "lucide-react";
import { Button } from "@/components/Button";
import { CallbackButton } from "@/components/CallbackButton";
import { Placeholder } from "@/components/Placeholder";
import { company, hero } from "@/content";

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
          <motion.p
            custom={0}
            variants={rise}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-ink-muted"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-brand-500" aria-hidden="true" />
              {company.serviceArea}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 className="size-4 text-brand-500" aria-hidden="true" />
              Emergency heat &amp; cooling, 24/7
            </span>
          </motion.p>

          <motion.h1
            custom={1}
            variants={rise}
            initial="hidden"
            animate="show"
            /*
             * Fluid size instead of breakpoint steps: at 1024px the text
             * column is only ~483px wide, so a fixed lg size overflows.
             * Measured against the widest word pair in the headline.
             */
            style={{ fontSize: "clamp(2.5rem, 4.9vw, 4rem)" }}
            className="type-display mt-7"
          >
            {hero.title[0]}{" "}
            <span className="text-brand-500">{hero.title[1]}</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={rise}
            initial="hidden"
            animate="show"
            className="type-lead prose-measure mt-7 max-w-[46ch] text-[18px] text-ink-muted"
          >
            {hero.body}
          </motion.p>

          <motion.div
            custom={3}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button to={hero.primary.to} size="lg">
              {hero.primary.label}
            </Button>
            <CallbackButton
              label="Order a callback"
              className="h-14 px-7 text-base"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:-mr-[max(0px,calc((100vw-1240px)/2+2rem))]"
        >
          <Placeholder
            label="Hero — technician portrait - потом добавим)"
            ratio="4/3.6"
            rounded="rounded-[var(--radius-panel)] lg:rounded-r-none"
            className="w-full"
          />

        </motion.div>
      </div>
    </section>
  );
}
