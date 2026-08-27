import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Eyebrow } from "./Eyebrow";

export type Crumb = { label: string; to?: string };

export function PageHero({
  kicker,
  title,
  body,
  crumbs = [],
  children,
}: {
  kicker: string;
  title: string;
  body?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-black/[0.07] bg-surface">
      <div className="container-page py-14 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-muted">
            <li>
              <Link to="/" className="-my-2 inline-flex min-h-11 items-center py-2 transition-colors hover:text-brand-600">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5 opacity-50" aria-hidden="true" />
                {c.to ? (
                  <Link to={c.to} className="-my-2 inline-flex min-h-11 items-center py-2 transition-colors hover:text-brand-600">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-ink">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <Eyebrow>{kicker}</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-[34px] leading-[1.1] sm:text-[46px]">
          {title}
        </h1>
        {body && (
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            {body}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
