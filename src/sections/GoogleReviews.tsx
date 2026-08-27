import { ExternalLink } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { GoogleGlyph, Stars } from "@/components/Stars";
import { googleReviews as g } from "@/content";

/**
 * Google Reviews — PLACEHOLDER BLOCK.
 * Layout and states are real; the data is stubbed in content.ts. To go live,
 * fetch Places reviews server-side and pass them in place of `g.items`.
 */
export function GoogleReviews() {
  /*
   * Renders nothing until real reviews are wired up. An empty five-star block
   * is worse than no block, and inventing reviews would be both dishonest and
   * a Google structured-data policy violation.
   */
  if (!g.items.length || !g.total) return null;

  const max = Math.max(...g.distribution.map((d) => d.count));

  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="container-page">
        <Reveal>
          <Eyebrow>{g.kicker}</Eyebrow>
          <h2 className="type-title mt-5 text-[32px] sm:text-[42px] max-w-xl">{g.title}</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[340px_1fr]">
          <Reveal>
            <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-black/[0.08] bg-white p-7">
              <div className="flex items-center gap-2.5">
                <GoogleGlyph />
                <span className="text-[15px] font-semibold">Google rating</span>
              </div>

              <div className="mt-6 flex items-end gap-3">
                <span className="text-[52px] font-extrabold leading-none">
                  {g.rating}
                </span>
                <div className="pb-1.5">
                  <Stars rating={g.rating} />
                  <p className="mt-1 text-[13px] text-ink-muted">
                    {g.total} reviews
                  </p>
                </div>
              </div>

              <ul className="mt-7 space-y-2">
                {g.distribution.map((d) => (
                  <li key={d.stars} className="flex items-center gap-3">
                    <span className="w-3 text-[12px] font-semibold text-ink-muted">
                      {d.stars}
                    </span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.07]">
                      <span
                        className="block h-full rounded-full bg-[#FBBC04]"
                        style={{ width: `${(d.count / max) * 100}%` }}
                      />
                    </span>
                    <span className="w-9 text-right text-[12px] text-ink-muted">
                      {d.count}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={g.profileUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-[var(--radius-action)] border border-black/12 px-5 py-3 text-[14px] font-semibold transition-colors hover:border-brand-500 hover:text-brand-600"
              >
                See all on Google
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>

              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.12em] text-ink-muted/60">
                Placeholder data
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {g.items.map((r, i) => (
              <Reveal key={r.author} delay={(i % 2) * 0.07}>
                <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-black/[0.08] bg-white p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[14px] font-bold text-brand-600">
                      {r.initial}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-semibold">
                        {r.author}
                      </p>
                      <p className="text-[12px] text-ink-muted">{r.when}</p>
                    </div>
                    <GoogleGlyph className="size-4 shrink-0 opacity-70" />
                  </div>

                  <Stars rating={r.rating} className="mt-4" size="size-3.5" />

                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                    {r.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
