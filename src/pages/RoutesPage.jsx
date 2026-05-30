import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import DemoDataNotice from '../components/DemoDataNotice';
import { trackEvent } from '../utils/trackEvent';
import { SITE_CONFIG } from '../config/site';
import { REAL_ROUTES } from '../data/routes.real';
import { getImageFallback, getImageAlt } from '../utils/getImageFallback';

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

        {REAL_ROUTES.some(r => r.demo) && (
          <DemoDataNotice
            message="Algunas rutas de esta página son fichas demo o pendientes de verificación. Los datos de distancia, desnivel y trazados son aproximados."
            showLink
          />
        )}

        {/* Route cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REAL_ROUTES.map((route) => (
            <div
              key={route.slug}
              className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-0.5"
            >
              <div className="relative h-44">
                <img
                  src={getImageFallback(route, 'route')}
                  alt={getImageAlt(route, 'ruta trail')}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/placeholders/route.svg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-bold text-lg leading-tight">{route.name}</p>
                  <p className="text-sm text-white/80 capitalize">{route.island.replace('-', ' ')} {route.municipality ? `- ${route.municipality}` : ''}</p>
                </div>
                {/* Demo badge */}
                {route.demo && (
                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1 bg-amber-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <AlertCircle size={10} /> Demo / Pendiente
                    </span>
                  </div>
                )}
                {route.verified && (
                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1 bg-green-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Verificado
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-3">
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                    {route.distanceLabel || 'Distancia pendiente'}
                  </span>
                  <span className="text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                    {route.elevationLabel || 'Desnivel pendiente'}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${route.difficulty ? (DIFFICULTY_COLOR[route.difficulty.charAt(0).toUpperCase() + route.difficulty.slice(1)] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300') : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}>
                    {route.difficulty ? route.difficulty.charAt(0).toUpperCase() + route.difficulty.slice(1) : 'Dificultad pendiente'}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {route.description || 'Información pendiente de completar.'}
                </p>

                {route.warnings && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                    <span className="font-bold">Aviso:</span> {route.warnings}
                  </p>
                )}

                {route.officialInfoUrl ? (
                  <a href={route.officialInfoUrl} target="_blank" rel="noopener noreferrer" className="block text-xs text-primary hover:underline mt-2">
                    Ver fuente oficial: {route.sourceName || 'Enlace'}
                  </a>
                ) : null}

                {route.gpxUrl ? (
                  <a
                    href={route.gpxUrl}
                    className="w-full flex items-center justify-center gap-2 py-2 mt-4 rounded-xl border border-primary text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <Map size={14} />
                    Descargar GPX
                  </a>
                ) : (
                  <button
                    className="w-full flex items-center justify-center gap-2 py-2 mt-4 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-60"
                    disabled
                    title="GPX pendiente de añadir"
                  >
                    <Map size={14} />
                    GPX pendiente de añadir
                  </button>
                )}
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
