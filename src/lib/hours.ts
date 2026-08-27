import { businessFacts } from "@/content";

/**
 * Live open/closed status.
 *
 * Computed in the company's own timezone, not the visitor's: someone checking
 * from another state still needs to know whether this Chicago crew is picking
 * up right now.
 */
const TZ = "America/Chicago";

const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
] as const;

export type OpenState = {
  open: boolean;
  /** Short label for the badge, e.g. "Open now" or "Closed". */
  label: string;
  /** Supporting line, e.g. "Until 6:00 PM" or "Opens Mon at 8:00 AM". */
  detail: string;
};

function nowInChicago() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    weekday: get("weekday"),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const pretty = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
};

export function getOpenState(): OpenState {
  const { weekday, minutes } = nowInChicago();

  const today = businessFacts.openingHours.find((slot) =>
    (slot.days as readonly string[]).includes(weekday),
  );

  if (today) {
    const opens = toMinutes(today.opens);
    const closes = toMinutes(today.closes);
    if (minutes >= opens && minutes < closes) {
      return { open: true, label: "Open now", detail: `Until ${pretty(today.closes)}` };
    }
    if (minutes < opens) {
      return { open: false, label: "Closed", detail: `Opens today at ${pretty(today.opens)}` };
    }
  }

  // Walk forward to the next day the company actually works.
  const todayIndex = DAYS.indexOf(weekday as (typeof DAYS)[number]);
  for (let step = 1; step <= 7; step++) {
    const day = DAYS[(todayIndex + step) % 7];
    const slot = businessFacts.openingHours.find((s) =>
      (s.days as readonly string[]).includes(day),
    );
    if (slot) {
      const when = step === 1 ? "tomorrow" : day;
      return { open: false, label: "Closed", detail: `Opens ${when} at ${pretty(slot.opens)}` };
    }
  }

  return { open: false, label: "Closed", detail: businessFacts.openingHours.length ? "" : "Call for hours" };
}
