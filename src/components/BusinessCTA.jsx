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

  const configs = {
    race: {
      text: `¿Organizas ${quotedName || 'esta carrera'}?`,
      primaryCta: 'Publicar carrera',
      primaryLink: '/para-organizadores',
      secondaryCta: 'Destacar',
      secondaryLink: '/anunciate?producto=carrera-destacada'
    },
    club: {
      text: `¿Gestionas ${quotedName || 'este club'}?`,
      primaryCta: 'Reclamar ficha',
      primaryLink: '/para-clubes',
      secondaryCta: 'Añadir gratis',
      secondaryLink: '/anade-tu-ficha'
    },
    shop: {
      text: `¿Es tu tienda ${quotedName || ''}?`,
      primaryCta: 'Reclamar ficha',
      primaryLink: '/para-tiendas',
      secondaryCta: 'Añadir gratis',
      secondaryLink: '/anade-tu-ficha'
    },
  };

  const config = configs[type] || configs.race;

  const handleClick = (target) => {
    trackEvent('business_cta_click', { type, name, target });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl border border-dashed border-primary/40 bg-primary/5 dark:bg-primary/10">
      <div className="flex items-start gap-3 flex-1">
        <Megaphone size={20} className="text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">{config.text}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Actualiza la información y llega a más corredores.</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <Link
          to={config.primaryLink}
          onClick={() => handleClick('primary')}
          className="flex-1 sm:flex-none text-center px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors"
        >
          {config.primaryCta}
        </Link>
        <Link
          to={config.secondaryLink}
          onClick={() => handleClick('secondary')}
          className="flex-1 sm:flex-none text-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          {config.secondaryCta}
        </Link>
      </div>
    </div>
  );
};

export default BusinessCTA;
