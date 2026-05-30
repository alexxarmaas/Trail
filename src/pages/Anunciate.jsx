import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Star, MapPin, Newspaper, Mail, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import NewsletterSignup from '../components/NewsletterSignup';
import { trackEvent } from '../utils/trackEvent';

const PRODUCTS = [
  {
    id: 'carrera-destacada',
    icon: '🏔️',
    title: 'Carrera Destacada',
    description:
      'Tu carrera aparece en la parte superior del calendario con el badge "Destacada". Máxima visibilidad para el período de inscripciones.',
    price: 'Desde 49 €',
    period: 'por evento',
    highlight: true,
  },
  {
    id: 'tienda-destacada',
    icon: '🏪',
    title: 'Tienda Destacada',
    description:
      'Tu tienda aparece primero en el directorio y en las páginas de isla. Badge "Destacada" y enlace directo a tu web.',
    price: 'Desde 19 €',
    period: 'al mes',
    highlight: false,
  },
  {
    id: 'club-destacado',
    icon: '👥',
    title: 'Club Destacado',
    description:
      'Destacamos tu club en el directorio y en la página de tu isla. Ideal para atraer nuevos miembros.',
    price: 'Desde 9 €',
    period: 'al mes',
    highlight: false,
  },
  {
    id: 'patrocinio-isla',
    icon: '🗺️',
    title: 'Patrocinio por Isla',
    description:
      'Tu marca aparece en la página de una isla concreta: Tenerife, Gran Canaria, La Palma, etc. Segmentación geográfica perfecta.',
    price: 'Desde 99 €',
    period: 'al mes',
    highlight: false,
  },
  {
    id: 'newsletter',
    icon: '📬',
    title: 'Patrocinio Newsletter',
    description:
      'Incluimos tu marca, carrera o tienda en nuestra newsletter mensual dirigida a corredores de trail de Canarias.',
    price: 'Desde 59 €',
    period: 'por envío',
    highlight: false,
  },
  {
    id: 'articulo-patrocinado',
    icon: '📝',
    title: 'Artículo Patrocinado',
    description:
      'Publicamos un artículo sobre tu evento, tienda o producto con enlace permanente en Trail Canarias.',
    price: 'Desde 149 €',
    period: 'publicación única',
    highlight: false,
  },
];

const Anunciate = () => {
  return (
    <>
      <SEO
        title="Anúnciate en Trail Canarias · Publicidad para Marcas y Organizadores"
        description="Llega a los corredores de trail running de Canarias. Publicita tu carrera, tienda o club en Trail Canarias. Precios desde 9 €/mes."
        canonical="https://trailcanarias.vercel.app/anunciate"
      />

      <div className="p-6 md:p-8 space-y-10 min-h-screen">
        {/* Background */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-green-50 to-amber-50/30 dark:from-gray-950 dark:to-gray-900 pointer-events-none" />

        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Megaphone size={28} className="text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Publicidad</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Anúnciate en Trail Canarias
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg leading-relaxed">
            Llega a los corredores de trail running de las Islas Canarias. Publicita tu carrera,
            tienda, club o patrocina contenido del directorio más completo de trail en Canarias.
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className={`relative rounded-2xl border p-6 flex flex-col gap-4 transition-all ${
                product.highlight
                  ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-xl shadow-primary/10'
                  : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900'
              }`}
            >
              {product.highlight && (
                <div className="absolute -top-3 left-4">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider">
                    <Star size={10} fill="currentColor" />
                    Más popular
                  </span>
                </div>
              )}

              <div className="text-4xl">{product.icon}</div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{product.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto">
                <p className="text-2xl font-bold text-primary">{product.price}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{product.period}</p>
              </div>

              <a
                href="mailto:hola@trailcanarias.com?subject=Información sobre publicidad en Trail Canarias"
                onClick={() =>
                  trackEvent('click_anunciate_cta', { product: product.id })
                }
                className={`mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                  product.highlight
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Mail size={16} />
                Contactar
              </a>
            </div>
          ))}
        </div>

        {/* Why Trail Canarias */}
        <div className="max-w-3xl mx-auto rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ¿Por qué anunciarte en Trail Canarias?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Audiencia segmentada', text: 'Corredores de trail running de Canarias, altamente implicados y con alta intención de compra.' },
              { icon: '📍', title: 'Presencia local', text: 'Segmentación por isla. Llega exactamente a los corredores de Tenerife, Gran Canaria o La Palma.' },
              { icon: '💰', title: 'Precios accesibles', text: 'Desde 9 €/mes. Pensado para organizadores locales, clubs y tiendas pequeñas.' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center gap-2">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 p-5 rounded-xl bg-primary/5 border border-primary/20">
            <CheckCircle size={24} className="text-primary shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">
                ¿Prefieres hablar antes de decidir?
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Escríbenos y te explicamos qué opción encaja mejor con tu objetivo.
              </p>
            </div>
            <a
              href="mailto:hola@trailcanarias.com"
              onClick={() => trackEvent('click_anunciate_contact')}
              className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
            >
              Escribir ahora
            </a>
          </div>
        </div>

        {/* También publica tu carrera */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            ¿Organizas una carrera y quieres añadirla al calendario?
          </p>
          <Link
            to="/publica-tu-carrera"
            className="inline-block px-6 py-2 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Publica tu carrera gratis →
          </Link>
        </div>

        {/* Newsletter */}
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </div>
    </>
  );
};

export default Anunciate;
