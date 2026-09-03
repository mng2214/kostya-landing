import {
  allServices,
  businessFacts,
  company,
  faqs,
  googleReviews,
  serviceAreaTowns,
  serviceGroups,
  site,
} from "@/content";

const ID = `${site.url}/#business`;

/**
 * The core LocalBusiness node. Every other block references it by @id so
 * crawlers see one business, not five.
 *
 * HomeAndConstructionBusiness is the correct parent type for a mixed
 * handyman / HVAC / appliance operation; HVACBusiness alone would understate
 * the other two service lines.
 */
export function localBusinessSchema() {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "HVACBusiness"],
    "@id": ID,
    name: businessFacts.legalName,
    url: site.url,
    telephone: company.phoneE164,
    email: company.email,
    description: company.tagline,
    image: site.url + site.ogImage,
    priceRange: businessFacts.priceRange,
    currenciesAccepted: businessFacts.currenciesAccepted,
    paymentAccepted: businessFacts.paymentAccepted,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessFacts.streetAddress,
      addressLocality: businessFacts.addressLocality,
      addressRegion: businessFacts.addressRegion,
      addressCountry: businessFacts.addressCountry,
      ...(businessFacts.postalCode ? { postalCode: businessFacts.postalCode } : {}),
    },
    areaServed: serviceAreaTowns.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "State", name: "Illinois" },
    })),
    openingHoursSpecification: businessFacts.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Repair services",
      itemListElement: allServices.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.short,
        },
      })),
    },
    sameAs: company.socials.map((s) => s.href),
  };

  if (businessFacts.founded) node.foundingDate = businessFacts.founded;

  /*
   * aggregateRating is emitted ONLY once a real Google place_id is wired up.
   * Publishing invented review counts is a Google structured-data violation
   * and risks a manual action — the placeholder numbers stay out of the markup.
   */
  if (googleReviews.placeId) {
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: googleReviews.rating,
      reviewCount: googleReviews.total,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return node;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: company.name,
    publisher: { "@id": ID },
    inLanguage: "en-US",
  };
}

/** One Service node per category page. */
export function serviceGroupSchema(groupSlug: string) {
  const group = serviceGroups.find((g) => g.slug === groupSlug);
  if (!group) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: group.title,
    description: group.short,
    url: `${site.url}/${group.slug}`,
    serviceType: group.title,
    provider: { "@id": ID },
    areaServed: serviceAreaTowns.map((name) => ({ "@type": "City", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: group.title,
      itemListElement: group.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.short },
      })),
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: site.url + c.path,
    })),
  };
}


