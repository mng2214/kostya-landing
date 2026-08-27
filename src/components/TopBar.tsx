import { company } from "@/content";
import { SocialIcon } from "./SocialIcon";

/**
 * Utility bar.
 *
 * No icons. An envelope, a map pin and a clock in a row is the single most
 * template-looking thing a site can put above its header — three borrowed
 * glyphs that repeat what the text beside them already says.
 *
 * The separator is the same rotated square used between town names in the
 * service-areas rows, so the bar speaks the site's own vocabulary instead of
 * an icon library's.
 *
 * The email address is deliberately not here: a plain mailto in the header is
 * the first thing address harvesters take. It lives in the footer, on the
 * contact page and in the structured data.
 */
function Diamond() {
  return (
    <span
      aria-hidden="true"
      className="mx-5 inline-block size-1 shrink-0 rotate-45 bg-brand-500/60"
    />
  );
}

export function TopBar() {
  return (
    <div className="hidden border-b border-black/[0.06] bg-white text-[13px] text-ink-muted lg:block">
      <div className="container-page flex h-11 items-center justify-between">
        <p className="flex items-center">
          <span>{company.address}</span>
          <Diamond />
          <span>{company.hours}</span>
        </p>

        <ul className="flex items-center gap-4">
          {company.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className="block text-ink-muted transition-colors hover:text-brand-600"
              >
                <SocialIcon name={s.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
