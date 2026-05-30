import { useEffect } from 'react';

/**
 * JsonLd — injects JSON-LD structured data into <head>.
 * Used for SportsEvent schema on race detail pages.
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
 * Only populates fields we have data for; avoids asserting demo data as official.
 */
export function buildSportsEventLd(race, url = '') {
  if (!race) return null;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: race.name,
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
  if (url) ld.url = url;
  if (race.officialWebsite) ld.url = race.officialWebsite;
  if (race.organizer && !race.demo) {
    ld.organizer = { '@type': 'Organization', name: race.organizer };
  }
  if (race.description && !race.demo) {
    ld.description = race.description;
  }

  return ld;
}

export default JsonLd;
