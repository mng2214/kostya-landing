import { ExternalLink } from "lucide-react";
import { company } from "@/content";
import { mapEmbedUrl } from "@/lib/map";

/**
 * Google Maps embed for the coverage area.
 *
 * Uses the keyless embed endpoint, so there is nothing to provision and no
 * billing account to attach. Centred on the metro at a zoom that shows the
 * whole service area rather than dropping a pin: this is a mobile business
 * with no storefront, and pinning an address the customer cannot visit would
 * misrepresent it.
 *
 * `loading="lazy"` matters more than usual here — a Maps iframe pulls roughly a
 * megabyte across dozens of requests, and this sits well below the fold.
 */
export function ServiceMap() {
  return (
    <>
      <div className="overflow-hidden border border-black/[0.08]">
        <iframe
          src={mapEmbedUrl}
          title={`Service area map — ${company.serviceArea}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[380px] w-full border-0 sm:h-[440px]"
        />
      </div>

      <p className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-center text-[13px] text-ink-muted">
        Serving {company.serviceArea}.
        <a
          href={company.mapHref}
          target="_blank"
          rel="noreferrer noopener"
          className="-my-2 inline-flex min-h-11 items-center gap-1 py-2 font-semibold text-brand-600 hover:underline"
        >
          Open in Google Maps
          <ExternalLink className="size-3" aria-hidden="true" />
        </a>
      </p>
    </>
  );
}
