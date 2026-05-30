import { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

/**
 * JsonLd — injects JSON-LD structured data into <head>.
 */
const JsonLd = ({ data }) => {
  useEffect(() => {
    if (!data) return;

    const id = 'trail-canarias-jsonld';
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);

    return () => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
    };
  }, [data]);

  return null;
};

/**
 * Build a SportsEvent JSON-LD object from a race.
 * - Internal URL is always the canonical page URL.
 * - officialWebsite goes into sameAs.
 * - offers only populated if priceFrom exists and demo === false.
 */
export function buildSportsEventLd(race) {
  if (!race) return null;

  const pageUrl = `${SITE_CONFIG.url}/carreras/${race.slug}`;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: race.name,
    url: pageUrl,
    startDate: race.date,
    location: {
      '@type': 'Place',
      name: race.location || `${race.municipality}, Canarias`,
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Canarias',
        addressCountry: 'ES',
      },
    },
  };

  if (race.image) ld.image = race.image;

  if (race.organizer && !race.demo) {
    ld.organizer = { '@type': 'Organization', name: race.organizer };
  }

  if (race.description && !race.demo) {
    ld.description = race.description;
  }

  // sameAs: official website if different from internal URL
  if (race.officialWebsite && race.officialWebsite !== pageUrl) {
    ld.sameAs = race.officialWebsite;
  }

  // Offers block — only when we have verified data
  if (race.priceFrom && !race.demo) {
    ld.offers = {
      '@type': 'Offer',
      price: race.priceFrom,
      priceCurrency: 'EUR',
      url: race.registrationUrl || pageUrl,
      availability: 'https://schema.org/InStock',
    };
  }

  return ld;
}

export default JsonLd;
