import React from 'react';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { trackEvent } from '../utils/trackEvent';

const AffiliateGearBlock = ({ race }) => {
  const distVal = race?.distVal;

  let GEAR_ITEMS = [];

  if (distVal && distVal <= 15) {
    GEAR_ITEMS = [
      { name: 'Zapatillas ligeras', description: 'Para distancias explosivas y cortas.', emoji: '👟', url: '#' },
      { name: 'Cinturón o soft flask', description: 'Hidratación minimalista para carreras rápidas.', emoji: '💧', url: '#' },
      { name: 'Gorra', description: 'Protección contra el sol canario.', emoji: '🧢', url: '#' },
      { name: 'Gel energético', description: 'Aporte rápido de energía.', emoji: '⚡', url: '#' },
      { name: 'Calcetines técnicos', description: 'Evita ampollas en ritmos altos.', emoji: '🧦', url: '#' }
    ];
  } else if (distVal && distVal > 15 && distVal <= 42) {
    GEAR_ITEMS = [
      { name: 'Chaleco de hidratación', description: 'Para llevar agua y material obligatorio.', emoji: '🎒', url: '#' },
      { name: 'Sales minerales', description: 'Vital para prevenir calambres.', emoji: '🧂', url: '#' },
      { name: 'Chaqueta ligera', description: 'Protección contra el viento o lluvia fina.', emoji: '🧥', url: '#' },
      { name: 'Geles', description: 'Nutrición en carrera.', emoji: '⚡', url: '#' },
      { name: 'Bastones opcionales', description: 'Ayuda en las subidas largas.', emoji: '🦯', url: '#' }
    ];
  } else if (distVal && distVal > 42) {
    GEAR_ITEMS = [
      { name: 'Frontal', description: 'Indispensable para correr de noche.', emoji: '🔦', url: '#' },
      { name: 'Manta térmica', description: 'Material de seguridad obligatorio.', emoji: '🆘', url: '#' },
      { name: 'Chaqueta impermeable', description: 'Para cambios bruscos de temperatura.', emoji: '🧥', url: '#' },
      { name: 'Bastones', description: 'Esenciales para ahorrar piernas en ultras.', emoji: '🦯', url: '#' },
      { name: 'Powerbank', description: 'Para cargar el móvil o el reloj en carrera.', emoji: '🔋', url: '#' },
      { name: 'Sales y geles', description: 'Nutrición para más de 5 horas.', emoji: '⚡', url: '#' }
    ];
  } else {
    GEAR_ITEMS = [
      { name: 'Chaleco de hidratación', description: 'Imprescindible en carreras de más de 25 km.', emoji: '🎒', url: '#' },
      { name: 'Frontal de trail', description: 'Para salidas nocturnas y pruebas de más de 10 h.', emoji: '🔦', url: '#' },
      { name: 'Manta térmica', description: 'Material obligatorio en la mayoría de ultras.', emoji: '🆘', url: '#' },
      { name: 'Chaqueta impermeable', description: 'Ligera, compacta y certificada para competición.', emoji: '🧥', url: '#' },
      { name: 'Sales y geles energéticos', description: 'Nutrición específica para esfuerzos prolongados.', emoji: '⚡', url: '#' }
    ];
  }

  return (
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
              onClick={() => trackEvent('affiliate_gear_click', { item: item.name, raceSlug: race?.slug })}
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
};

export default AffiliateGearBlock;
