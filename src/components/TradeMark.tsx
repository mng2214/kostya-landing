/**
 * Bespoke marks for the credentials strip.
 *
 * The stock icon-in-a-tinted-rounded-square is the single most recognisable
 * tell of a generated landing page, so these are drawn for this company
 * instead: the first mark reuses the snowflake and flame that already live
 * inside the logo, and the last one is a coverage motif rather than the
 * ubiquitous map pin.
 *
 * All four share one grid and one stroke weight (1.5 on a 24-unit box), which
 * is what makes a set read as drawn rather than assembled.
 */
type Props = { className?: string };

const base = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Snowflake beside a flame — cooling and heating, straight from the logo. */
export function TradesMark({ className }: Props) {
  return (
    <svg viewBox="0 0 30 24" className={className} aria-hidden="true" {...base}>
      {/* snowflake */}
      <path d="M8 4.5v15M1.5 8.25l13 7.5M14.5 8.25l-13 7.5" />
      <path d="M8 7.6 6.2 5.9M8 7.6l1.8-1.7M8 16.4l-1.8 1.7M8 16.4l1.8 1.7" />
      {/* flame */}
      <path d="M22.5 4.6c2.6 2.9 3.9 5 3.9 6.9a3.9 3.9 0 0 1-7.8 0c0-1.9 1.3-4 3.9-6.9Z" />
      <path d="M22.5 19.4a2 2 0 0 1-2-2c0-1 .7-2 2-3.2 1.3 1.2 2 2.2 2 3.2a2 2 0 0 1-2 2Z" />
    </svg>
  );
}

/** A house and a storefront sharing a baseline. */
export function SegmentsMark({ className }: Props) {
  return (
    <svg viewBox="0 0 30 24" className={className} aria-hidden="true" {...base}>
      <path d="M1.5 11.2 7.75 5.5 14 11.2V19.5H1.5Z" />
      <path d="M6 19.5v-4.2h3.5v4.2" />
      <path d="M17 19.5V8.2h11.5v11.3Z" />
      <path d="M17 11.6h11.5M21 15.2h3.5M21 19.5v-4.3" />
    </svg>
  );
}

/** A clock reduced to its essentials. */
export function HoursMark({ className }: Props) {
  return (
    <svg viewBox="0 0 30 24" className={className} aria-hidden="true" {...base}>
      <circle cx="15" cy="12" r="8.5" />
      <path d="M15 6.8V12l3.9 2.6" />
    </svg>
  );
}

/** Coverage radiating from a point — a service area, not a dropped pin. */
export function AreaMark({ className }: Props) {
  return (
    <svg viewBox="0 0 30 24" className={className} aria-hidden="true" {...base}>
      <circle cx="11" cy="12" r="2" />
      <path d="M15.6 8a5.7 5.7 0 0 1 0 8M19.4 4.9a10.4 10.4 0 0 1 0 14.2" />
      <path d="M6.4 16a5.7 5.7 0 0 1 0-8" />
    </svg>
  );
}
