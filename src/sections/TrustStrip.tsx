import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Star, Timer } from "lucide-react";
import { company, googleReviews } from "@/content";

const items = [
  {
    icon: Star,
    value: `${googleReviews.rating} / 5`,
    label: `${googleReviews.total} Google reviews`,
  },
  {
    icon: ShieldCheck,
    value: "Licensed & insured",
    label: "State of Illinois",
  },
  {
    icon: Timer,
    value: "24/7 emergency",
    label: "No heat, no cooling",
  },
  {
    icon: MapPin,
    value: company.addressShort,
    label: company.serviceArea,
  },
];

/**
 * Evidence, not adjectives. Sits directly under the hero because the first
 * question a stranger has is "are these people real and are they near me".
 */
export function TrustStrip() {
  return (
    <section aria-label="Credentials" className="border-y border-line bg-surface">
      <div className="container-page">
        <ul className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.li
              key={item.value}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-4 py-6 sm:border-line lg:py-7 [&:not(:first-child)]:lg:border-l lg:pl-8 lg:first:pl-0"
            >
              <item.icon
                className="size-5 shrink-0 text-brand-500"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p
                  className="text-[16px] leading-tight"
                  style={{ fontVariationSettings: '"wdth" 106, "wght" 660' }}
                >
                  {item.value}
                </p>
                <p className="mt-1 truncate text-[13px] text-ink-muted">
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
