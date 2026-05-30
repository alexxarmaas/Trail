import { useEffect } from 'react';

/**
 * SEO component — updates document head for client-side SEO.
 * No SSR. Sets title, meta description, og:title, og:description, canonical.
 */
const SEO = ({
  title,
  description,
  canonical,
  ogImage = '/og-image.svg',
}) => {
  const siteName = 'Trail Canarias';
  const fullTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} | Carreras, rutas y clubes de trail running en Canarias`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Meta description
    setMeta('name', 'description', description || 'Calendario de carreras trail en Canarias, rutas por isla, clubes, tiendas especializadas y recursos para corredores de montaña.');

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description || '');
    setMeta('property', 'og:image', ogImage);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    return () => {
      // Reset to default on unmount
      document.title = `${siteName} | Carreras, rutas y clubes de trail running en Canarias`;
    };
  }, [fullTitle, description, canonical, ogImage]);

  return null;
};

function setMeta(attr, name, content) {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default SEO;
