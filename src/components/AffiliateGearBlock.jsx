import React from 'react';
import { ShoppingBag, ExternalLink } from 'lucide-react';

/**
 * AffiliateGearBlock — recommended gear for trail runners.
 * Links marked with TODO: replace # with real affiliate URLs.
 */
const GEAR_ITEMS = [
  {
    name: 'Chaleco de hidratación',
    description: 'Imprescindible en carreras de más de 25 km.',
    emoji: '🎒',
    // TODO: replace with affiliate URL
    url: '#',
  },
  {
    name: 'Frontal de trail',
    description: 'Para salidas nocturnas y pruebas de más de 10 h.',
    emoji: '🔦',
    url: '#',
  },
  {
    name: 'Manta térmica',
    description: 'Material obligatorio en la mayoría de ultras.',
    emoji: '🌡️',
    url: '#',
  },
  {
    name: 'Chaqueta impermeable',
    description: 'Ligera, compacta y certificada para competición.',
    emoji: '🧥',
    url: '#',
  },
  {
    name: 'Sales y geles energéticos',
    description: 'Nutrición específica para esfuerzos prolongados.',
    emoji: '⚡',
    url: '#',
  },
];

const AffiliateGearBlock = () => (
  <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
    <div className="flex items-center gap-2 mb-4">
      <ShoppingBag size={18} className="text-primary" />
      <h3 className="text-base font-bold text-gray-900 dark:text-white">Material recomendado</h3>
    </div>
    <ul className="space-y-3">
      {GEAR_ITEMS.map((item) => (
        <li key={item.name}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
          >
            <span className="text-xl">{item.emoji}</span>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                {item.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
            </div>
            <ExternalLink size={14} className="text-gray-400 group-hover:text-primary transition-colors shrink-0" />
          </a>
        </li>
      ))}
    </ul>
    <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-3 text-center">
      * Los enlaces de afiliado ayudan a mantener Trail Canarias gratuito.
    </p>
  </div>
);

export default AffiliateGearBlock;
