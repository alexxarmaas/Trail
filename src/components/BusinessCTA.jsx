import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Mail } from 'lucide-react';
import { trackEvent } from '../utils/trackEvent';
import { SITE_CONFIG } from '../config/site';

/**
 * BusinessCTA — call-to-action for businesses or organizers to claim their listing.
 * @param {string} type - 'race' | 'club' | 'shop'
 * @param {string} name - entity name
 */
const CLAIM_EVENTS = {
  race: 'claim_race',
  club: 'claim_club',
  shop: 'claim_shop',
};

const BusinessCTA = ({ type = 'race', name = '' }) => {
  const quotedName = name ? `"${name}"` : null;

  const labels = {
    race: {
      text: `¿Organizas ${quotedName || 'esta carrera'}? Reclama o mejora esta ficha.`,
      cta: 'Reclama esta ficha',
    },
    club: {
      text: `¿Gestionas ${quotedName || 'este club'}? Reclama esta ficha y añade datos oficiales.`,
      cta: 'Reclama esta ficha',
    },
    shop: {
      text: `¿Es tu tienda ${quotedName || ''}? Reclama esta ficha y llega a más corredores.`,
      cta: 'Reclama esta ficha',
    },
  };

  const config = labels[type] || labels.race;
  const eventName = CLAIM_EVENTS[type] || CLAIM_EVENTS.race;
  const subject = encodeURIComponent(`Reclamación de ficha: ${name || type}`);
  const mailtoHref = `mailto:${SITE_CONFIG.email}?subject=${subject}`;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl border border-dashed border-primary/40 bg-primary/5 dark:bg-primary/10">
      <Megaphone size={18} className="text-primary shrink-0 mt-0.5" />
      <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">{config.text}</p>
      <a
        href={mailtoHref}
        onClick={() => trackEvent(eventName, { name })}
        className="whitespace-nowrap flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
      >
        <Mail size={14} />
        {config.cta} →
      </a>
    </div>
  );
};

export default BusinessCTA;
