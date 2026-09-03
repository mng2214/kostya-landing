import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Mail, MapPin, Phone } from "lucide-react";
import { company, footer, serviceGroups } from "@/content";
import { SocialIcon } from "./SocialIcon";

/** Same number as the phone line, in wa.me's digits-only format. */
const whatsappHref =
  company.socials.find((s) => s.icon === "whatsapp")?.href ??
  `https://wa.me/${company.phoneHref.replace(/\D/g, "")}`;

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        className="mb-5 text-[12px] uppercase tracking-[0.14em] text-ink-muted"
        style={{ fontVariationSettings: '"wdth" 104, "wght" 640' }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-surface pt-16 pb-8">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo className="items-start [&_img]:h-14" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-muted">
              {footer.blurb}
            </p>
          </div>

          {footer.columns.map((col) => (
            <Column key={col.title} title={col.title}>
              <ul className="-my-1.5">
                {col.links.map((l) => (
                  <li key={l.label + l.to}>
                    <Link
                      to={l.to}
                      className="-mx-2 inline-flex min-h-11 items-center px-2 text-[15px] text-ink-muted transition-colors hover:text-brand-600"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          ))}

          <div className="space-y-9">
            <Column title="Services">
              <ul className="-my-1.5">
                {serviceGroups.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/${s.slug}`}
                      className="-mx-2 inline-flex min-h-11 items-center px-2 text-[15px] text-ink-muted transition-colors hover:text-brand-600"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>

            <Column title="Find us">
              <ul className="-my-1 space-y-1 text-[15px] text-ink-muted">
                <li>
                  <a
                    href={company.phoneHref}
                    className="-mx-2 inline-flex min-h-11 items-center gap-2.5 px-2 transition-colors hover:text-brand-600"
                  >
                    <Phone className="size-4 text-brand-500" aria-hidden="true" />
                    {company.phone}
                  </a>
                </li>
                {/*
                  WhatsApp sits directly under the phone number because it is
                  the same number — for anyone who would rather send a photo of
                  the fault than describe it, which for appliance work is often
                  faster than the call.
                */}
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="-mx-2 inline-flex min-h-11 items-center gap-2.5 px-2 transition-colors hover:text-brand-600"
                  >
                    <span className="text-brand-500">
                      <SocialIcon name="whatsapp" className="size-4" />
                    </span>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={company.emailHref}
                    className="-mx-2 inline-flex min-h-11 items-center gap-2.5 px-2 transition-colors hover:text-brand-600"
                  >
                    <Mail className="size-4 text-brand-500" aria-hidden="true" />
                    {company.email}
                  </a>
                </li>
                <li>
                  <a
                    href={company.mapHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="-mx-2 inline-flex min-h-11 items-start gap-2.5 px-2 py-2 transition-colors hover:text-brand-600"
                  >
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-brand-500"
                      aria-hidden="true"
                    />
                    {company.address}
                  </a>
                </li>
              </ul>
            </Column>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-black/[0.08] pt-6 text-[13px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="transition-colors hover:text-brand-600">
              Privacy Policy
            </Link>
            <p>{company.hours}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
