import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone } from 'lucide-react';
import { trackEvent } from '../utils/trackEvent';

/**
 * BusinessCTA — call-to-action for businesses or organizers.
 * @param {string} type - 'race' | 'club' | 'shop'
 * @param {string} name - entity name
 */
const BusinessCTA = ({ type = 'race', name = '' }) => {
  const labels = {
    race: {
      text: `¿Organizas ${name ? `"${name}"` : 'esta carrera'}? Reclama o mejora esta ficha.`,
      cta: 'Publicar mi carrera',
      to: '/publica-tu-carrera',
      event: 'cta_race_claim',
    },
    club: {
      text: `¿Gestionas ${name ? `"${name}"` : 'este club'}? Reclama tu ficha y añade información oficial.`,
      cta: 'Anúnciate',
      to: '/anunciate',
      event: 'cta_club_claim',
    },
    shop: {
      text: `¿Es tu tienda ${name ? `"${name}"` : ''}? Mejora tu ficha y llega a más corredores.`,
      cta: 'Anúnciate',
      to: '/anunciate',
      event: 'cta_shop_claim',
    },
  };

  const config = labels[type] || labels.race;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl border border-dashed border-primary/40 bg-primary/5 dark:bg-primary/10">
      <Megaphone size={18} className="text-primary shrink-0 mt-0.5" />
      <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">{config.text}</p>
      <Link
        to={config.to}
        onClick={() => trackEvent(config.event, { name })}
        className="whitespace-nowrap text-sm font-semibold text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
      >
        {config.cta} →
      </Link>
    </div>
  );
};

export default BusinessCTA;
