import React from 'react';
import SEO from '../components/SEO';
import { trackEvent } from '../utils/trackEvent';

const Pricing = () => {
  const handleContact = (product) => {
    trackEvent('pricing_cta_click', { product });
  };

  const emailUrl = `mailto:hola@trailcanarias.com?subject=Información sobre publicidad en Trail Canarias`;

  const items = [
    { name: 'Carrera destacada', price: 'desde 49 € / evento' },
    { name: 'Tienda destacada', price: 'desde 19 € / mes' },
    { name: 'Club destacado', price: 'desde 9 € / mes' },
    { name: 'Patrocinio por isla', price: 'desde 99 € / mes' },
    { name: 'Newsletter patrocinada', price: 'desde 59 € / envío' },
    { name: 'Artículo patrocinado', price: 'desde 149 € / publicación' }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <SEO 
        title="Precios para anunciarte en Trail Canarias"
        description="Opciones simples para organizadores, tiendas, clubes y marcas locales."
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
          Precios para anunciarte en Trail Canarias
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Opciones simples para organizadores, tiendas, clubes y marcas locales.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.name}</h3>
            <p className="text-2xl text-primary font-black mb-8">{item.price}</p>
            <div className="mt-auto">
              <a 
                href={emailUrl} 
                onClick={() => handleContact(item.name)}
                className="block w-full text-center py-4 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold rounded-xl transition-all"
              >
                Solicitar información
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
