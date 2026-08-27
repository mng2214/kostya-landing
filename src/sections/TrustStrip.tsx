import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaMark,
  HoursMark,
  SegmentsMark,
  TradesMark,
} from "@/components/TradeMark";
import { company } from "@/content";
import { getOpenState, type OpenState } from "@/lib/hours";
import { cn } from "@/lib/utils";

/**
 * The strip under the hero.
 *
 * Hard vertical rules used to cut this into four unequal cells with different
 * inner padding, which read as a table rather than a designed row. The rules
 * are gone: each item now carries its own icon tile, and spacing does the
 * separating.
 *
 * The hours slot is live. Someone with a dead furnace at 9pm wants to know
 * whether anyone is picking up, so the status is computed in the company's own
 * timezone and the dot pulses only while genuinely open — motion that reports
 * state rather than decorating.
 *
 * Deliberately no star rating until a real Google Business Profile exists.
 */
function useOpenState(): OpenState {
  const [state, setState] = useState<OpenState>(() => getOpenState());

  useEffect(() => {
    // A visitor can sit on the page across the opening or closing minute.
    const id = window.setInterval(() => setState(getOpenState()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return state;
}

export function TrustStrip() {
  const hours = useOpenState();

  const items = [
    {
      icon: TradesMark,
      value: "Appliance & HVAC",
      label: "Both trades, one call",
      status: null,
    },
    {
      icon: SegmentsMark,
      value: "Residential & commercial",
      label: "Homes, restaurants, retail",
      status: null,
    },
    {
      icon: HoursMark,
      value: hours.label,
      label: hours.detail,
      status: hours.open,
    },
    {
      icon: AreaMark,
      value: company.addressShort,
      label: company.serviceArea,
      status: null,
    },
  ];

  return (
    <section aria-label="At a glance" className="border-b border-line bg-surface">
      <div className="container-page">
        <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
          {items.map((item, i) => (
            <motion.li
              key={item.value + i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: 0.06 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={[
                "group flex items-center gap-4 py-5 lg:py-7",
                // These are facts, not destinations — so the hover response
                // stays deliberately quieter than the equipment columns, which
                // are real links. No lift, no shadow, no pointer cursor: just
                // the mark waking up and the text firming.
                "motion-safe:transition-transform motion-safe:duration-[var(--dur-base)]",
                "motion-safe:ease-[var(--ease-out-quint)] motion-safe:hover:scale-[1.03]",
              ].join(" ")}
            >
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.12 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={[
                  "inline-flex shrink-0 items-center border-r border-line pr-4 text-brand-500",
                  "transition-colors duration-[var(--dur-base)] group-hover:text-brand-600",
                ].join(" ")}
              >
                <item.icon className="h-6 w-[30px] shrink-0" />
              </motion.span>

              <div className="min-w-0">
                <p
                  className="flex items-center gap-2 text-[15px] leading-tight"
                  style={{ fontVariationSettings: '"wdth" 106, "wght" 660' }}
                >
                  {item.status !== null && (
                    <span
                      className={cn(
                        "relative inline-flex size-2 shrink-0 rounded-full",
                        item.status ? "bg-emerald-500" : "bg-ink-muted/40",
                      )}
                    >
                      {item.status && (
                        <span className="status-pulse absolute inset-0 rounded-full bg-emerald-500" />
                      )}
                    </span>
                  )}
                  {item.value}
                </p>
                <p className="mt-1 text-[13px] leading-snug text-ink-muted transition-colors duration-[var(--dur-base)] group-hover:text-ink">
                  {item.label}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
