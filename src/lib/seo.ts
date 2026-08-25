import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { company, site } from "@/content";

type SeoInput = {
  title: string;
  description: string;
  /** Path only, e.g. "/services". Defaults to the current location. */
  path?: string;
  /** "website" for pages, "article" for editorial. */
  type?: "website" | "article";
  image?: string;
  /** JSON-LD objects to attach to this route. */
  schema?: Array<Record<string, unknown>>;
  noindex?: boolean;
};

const MANAGED = "data-seo-managed";

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(MANAGED, "");
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    el.setAttribute(MANAGED, "");
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Writes per-route metadata into <head>.
 *
 * This is a client-side SPA, so search and AI crawlers that do not execute
 * JavaScript would otherwise see the same index.html for every route. The
 * prerender step (scripts/prerender.mjs) runs this in a real browser and
 * writes the resulting HTML to disk — that is what makes these tags count.
 */
export function useSeo({
  title,
  description,
  path,
  type = "website",
  image = site.ogImage,
  schema = [],
  noindex = false,
}: SeoInput) {
  const location = useLocation();
  const url = site.url + (path ?? location.pathname);
  const absoluteImage = image.startsWith("http") ? image : site.url + image;

  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertLink("canonical", url);
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    });

    // Open Graph — Facebook, LinkedIn, WhatsApp, Telegram, iMessage
    const og: Array<[string, string]> = [
      ["og:title", title],
      ["og:description", description],
      ["og:url", url],
      ["og:type", type],
      ["og:image", absoluteImage],
      ["og:image:width", "1200"],
      ["og:image:height", "630"],
      ["og:image:alt", `${company.name} — ${company.tagline}`],
      ["og:site_name", company.name],
      ["og:locale", site.locale],
    ];
    for (const [property, content] of og) {
      upsertMeta(`meta[property="${property}"]`, { property, content });
    }

    // Twitter / X
    const tw: Array<[string, string]> = [
      ["twitter:card", "summary_large_image"],
      ["twitter:title", title],
      ["twitter:description", description],
      ["twitter:image", absoluteImage],
    ];
    if (site.twitterHandle) tw.push(["twitter:site", site.twitterHandle]);
    for (const [name, content] of tw) {
      upsertMeta(`meta[name="${name}"]`, { name, content });
    }

    // JSON-LD: replace this route's blocks wholesale on every navigation.
    document.head
      .querySelectorAll('script[type="application/ld+json"][data-route]')
      .forEach((n) => n.remove());
    for (const block of schema) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-route", "");
      s.textContent = JSON.stringify(block);
      document.head.appendChild(s);
    }
  }, [title, description, url, type, absoluteImage, noindex, schema]);
}
