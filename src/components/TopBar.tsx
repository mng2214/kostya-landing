import { Mail, MapPin } from "lucide-react";
import { company } from "@/content";

const socialPaths: Record<string, string> = {
  facebook:
    "M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.2-1.5 1.5-1.5H16.7V3.9C16.4 3.9 15.4 3.8 14.3 3.8c-2.3 0-3.8 1.4-3.8 4V10H7.8v3h2.7v8h3z",
  instagram:
    "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.8-7.8a1.07 1.07 0 1 1-2.15 0 1.07 1.07 0 0 1 2.15 0zM21 8.8c-.05-1.4-.37-2.65-1.4-3.67C18.58 4.1 17.34 3.78 15.94 3.7 14.5 3.62 9.5 3.62 8.06 3.7c-1.4.08-2.63.4-3.66 1.42C3.37 6.15 3.05 7.4 2.97 8.8c-.08 1.44-.08 6.44 0 7.88.05 1.4.37 2.65 1.43 3.67 1.03 1.03 2.26 1.35 3.66 1.43 1.44.08 6.44.08 7.88 0 1.4-.08 2.64-.4 3.66-1.43 1.03-1.02 1.35-2.27 1.4-3.67.08-1.44.08-6.43 0-7.88zm-1.9 9.4c-.3.77-.9 1.37-1.68 1.68-1.16.46-3.92.35-5.42.35s-4.26.1-5.42-.35a3.02 3.02 0 0 1-1.68-1.68c-.46-1.16-.35-3.92-.35-5.42s-.1-4.26.35-5.42A3.02 3.02 0 0 1 6.58 5.7C7.74 5.24 10.5 5.35 12 5.35s4.26-.1 5.42.35c.77.3 1.37.9 1.68 1.68.46 1.16.35 3.92.35 5.42s.1 4.26-.35 5.42z",
  x: "M17.5 3h3.1l-6.8 7.8L21.8 21h-6.2l-4.9-6.4L5.1 21H2l7.3-8.3L2.4 3h6.4l4.4 5.8L17.5 3zm-1.1 16.1h1.7L7.7 4.8H5.9l10.5 14.3z",
  linkedin:
    "M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.2 8.4h3.6V21H3.2V8.4zM9.6 8.4h3.45v1.72h.05c.48-.9 1.65-1.86 3.4-1.86 3.64 0 4.3 2.36 4.3 5.44V21h-3.6v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.71-2.54 3.48V21H9.6V8.4z",
};

export function TopBar() {
  return (
    <div className="hidden border-b border-black/[0.06] bg-white text-[13px] text-ink-muted lg:block">
      <div className="container-page flex h-11 items-center justify-between">
        <div className="flex items-center gap-7">
          <a
            href={company.emailHref}
            className="inline-flex items-center gap-2 transition-colors hover:text-brand-600"
          >
            <Mail className="size-4 text-brand-500" aria-hidden="true" />
            {company.email}
          </a>
          <a
            href={company.mapHref}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 transition-colors hover:text-brand-600"
          >
            <MapPin className="size-4 text-brand-500" aria-hidden="true" />
            {company.address}
          </a>
        </div>
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
                <svg viewBox="0 0 24 24" className="size-[15px] fill-current">
                  <path d={socialPaths[s.icon]} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
