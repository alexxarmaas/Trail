import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import DemoDataNotice from '../components/DemoDataNotice';
import { trackEvent } from '../utils/trackEvent';
import { SITE_CONFIG } from '../config/site';

const DEMO_ROUTES = [
  {
    slug: 'ruta-de-los-volcanes',
    name: 'Ruta de los Volcanes',
    island: 'La Palma',
    distance: '~34 km',
    elevation: '+2.200 m',
    difficulty: 'Alta',
    image: 'https://images.unsplash.com/photo-1541280910158-c4e14f9c94a3?auto=format&fit=crop&q=80&w=800',
    description: 'Recorrido icónico por la dorsal de La Palma. Pasa por el Roque de los Muchachos y los campos de lava del volcán.',
  },
  {
    slug: 'pico-de-las-nieves',
    name: 'Circular Pico de las Nieves',
    island: 'Gran Canaria',
    distance: '~18 km',
    elevation: '+900 m',
    difficulty: 'Media',
    image: 'https://images.unsplash.com/photo-1502126324834-38f8e02d7160?auto=format&fit=crop&q=80&w=800',
    description: 'Ruta circular desde el Mirador de Pozo de las Nieves hasta el punto más alto de Gran Canaria.',
  },
  {
    slug: 'macizo-de-anaga',
    name: 'Travesía del Macizo de Anaga',
    island: 'Tenerife',
    distance: '~22 km',
    elevation: '+1.400 m',
    difficulty: 'Media-Alta',
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800',
    description: 'Travesía por el bosque de laurisilva del Macizo de Anaga. Flora endémica y vistas al Atlántico.',
  },
];

const DIFFICULTY_COLOR = {
  'Alta': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  'Media-Alta': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'Media': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'Baja': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
};

const RoutesPage = () => {
  const mailtoHref = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Sugerencia de ruta trail en Canarias')}`;

  return (
    <>
      <SEO
        title="Rutas Trail en Canarias · GPX y Mapas"
        description="Próximamente: rutas GPX verificadas por isla en Canarias. Ruta de los Volcanes, Pico de las Nieves, Anaga y más."
      />

      <div className="p-6 md:p-8 space-y-8 min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-green-50 to-teal-50/50 dark:from-gray-950 dark:to-gray-900 pointer-events-none" />

        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Map size={24} className="text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Rutas</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Rutas trail en Canarias
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg">
            Próximamente: rutas GPX verificadas por isla. Descarga, navega y explora los mejores senderos de las Islas Canarias.
          </p>

          {/* CTA */}
          <a
            href={mailtoHref}
            onClick={() => trackEvent('route_suggest_click')}
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            <Mail size={16} />
            ¿Quieres sugerir una ruta? Escríbenos
          </a>
        </div>

        <DemoDataNotice
          message="Las rutas de esta página son fichas demo. Los datos de distancia, desnivel y trazados son aproximados y están pendientes de verificación."
          showLink
        />

        {/* Route cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_ROUTES.map((route) => (
            <div
              key={route.slug}
              className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-0.5"
            >
              <div className="relative h-44">
                <img
                  src={route.image}
                  alt={route.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-bold text-lg leading-tight">{route.name}</p>
                  <p className="text-sm text-white/80">{route.island}</p>
                </div>
                {/* Demo badge */}
                <div className="absolute top-3 right-3">
                  <span className="flex items-center gap-1 bg-amber-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <AlertCircle size={10} /> Demo
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                    {route.distance}
                  </span>
                  <span className="text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                    {route.elevation}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFFICULTY_COLOR[route.difficulty] || ''}`}>
                    {route.difficulty}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {route.description}
                </p>

                <button
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-60"
                  disabled
                  title="Próximamente"
                >
                  <Map size={14} />
                  GPX · Próximamente
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon block */}
        <div className="max-w-2xl mx-auto rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/10 p-6 text-center">
          <Map size={40} className="mx-auto text-primary mb-3" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Tienes un GPX de una ruta en Canarias?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Estamos construyendo el directorio de rutas de trail running de Canarias. Si tienes un archivo GPX verificado de una ruta y quieres contribuir, escríbenos.
          </p>
          <a
            href={mailtoHref}
            onClick={() => trackEvent('route_suggest_click')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            <Mail size={16} />
            Enviar una ruta
          </a>
        </div>
      </div>
    </>
  );
};

export default RoutesPage;
