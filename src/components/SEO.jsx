import { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

/**
 * SEO component — updates document head for client-side SEO.
 * No SSR. Sets title, meta description, og tags, twitter card, canonical.
 *
 * Props:
 *   title        — page-specific title (without site name suffix)
 *   description  — meta description
 *   canonical    — full canonical URL; auto-built from SITE_CONFIG.url + pathname if omitted
 *   ogImage      — absolute path or URL for og:image
 *   type         — og:type (default: 'website')
 */
const SEO = ({
  title,
  description,
  canonical,
  ogImage,
  type = 'website',
}) => {
  const resolvedOgImage = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${SITE_CONFIG.url}${ogImage}`
    : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;

  const resolvedDescription = description || SITE_CONFIG.description;

  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} | Carreras, rutas y clubes de trail running en Canarias`;

  const resolvedCanonical =
    canonical ||
    (typeof window !== 'undefined'
      ? `${SITE_CONFIG.url}${window.location.pathname}`
      : SITE_CONFIG.url);

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Meta description
    setMeta('name', 'description', resolvedDescription);

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', resolvedDescription);
    setMeta('property', 'og:image', resolvedOgImage);
    setMeta('property', 'og:url', resolvedCanonical);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', SITE_CONFIG.name);

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', resolvedDescription);
    setMeta('name', 'twitter:image', resolvedOgImage);

    // Canonical link
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', resolvedCanonical);

    // Cleanup: only reset title; leave meta tags — next page's SEO will overwrite them
    return () => {
      document.title = `${SITE_CONFIG.name} | Carreras, rutas y clubes de trail running en Canarias`;
    };
  }, [fullTitle, resolvedDescription, resolvedCanonical, resolvedOgImage, type]);

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
