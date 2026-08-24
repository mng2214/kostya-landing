import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { company, footer, services } from "@/content";

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

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Stub: no list is connected yet. Wire to your ESP here.
        setDone(true);
        setEmail("");
        window.setTimeout(() => setDone(false), 4000);
      }}
      className="mt-6"
    >
      <label
        htmlFor="newsletter-email"
        className="mb-2.5 block text-[13px] font-semibold text-ink"
      >
        Sign up for our newsletter
      </label>
      <div className="flex items-center gap-2 rounded-[var(--radius-pill)] border border-black/10 bg-white p-1.5 pl-5 focus-within:border-brand-500">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-12 min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-ink-muted/60"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600"
        >
          {done ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <ArrowRight className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
      <p
        aria-live="polite"
        className="mt-2 min-h-5 text-[12px] font-medium text-brand-600"
      >
        {done ? "Thanks — you're on the list." : ""}
      </p>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-surface pt-16 pb-8">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link
              to="/"
              className="inline-flex min-h-11 items-center whitespace-nowrap text-[22px] leading-none"
              style={{ fontVariationSettings: '"wdth" 112, "wght" 800', letterSpacing: "-0.03em" }}
            >
              {company.logo.main}
              <span className="text-brand-500">{company.logo.accent}</span>
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-muted">
              {footer.blurb}
            </p>
            <Newsletter />
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
                {services.slice(0, 4).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
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
          <p>{company.hours}</p>
        </div>
      </div>
    </footer>
  );
}
