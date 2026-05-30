import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, Mail, AlertCircle, ArrowRight, Search, Filter } from 'lucide-react';
import SEO from '../components/SEO';
import DemoDataNotice from '../components/DemoDataNotice';
import { trackEvent } from '../utils/trackEvent';
import { SITE_CONFIG } from '../config/site';
import { REAL_ROUTES } from '../data/routes.real';
import { getImageFallback, getImageAlt } from '../utils/getImageFallback';
import { ISLANDS_DATA } from '../data/islands';

const DIFFICULTY_COLOR = {
  'muy-alta': 'bg-red-200 text-red-900 dark:bg-red-900/50 dark:text-red-300 font-bold',
  'alta': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  'media-alta': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'media': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'baja': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
};

const RoutesPage = () => {
  const mailtoHref = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Sugerencia de ruta trail en Canarias')}`;

  const [searchTerm, setSearchTerm] = useState('');
  const [islandFilter, setIslandFilter] = useState('all');
  const [qualityFilter, setQualityFilter] = useState('all');

  const filteredRoutes = REAL_ROUTES.filter((route) => {
    const searchStr = `${route.name} ${route.municipality} ${route.island} ${route.description || ''}`.toLowerCase();
    const searchMatch = !searchTerm || searchStr.includes(searchTerm.toLowerCase());
    const islandMatch = islandFilter === 'all' || route.island === islandFilter;
    
    let matchesQuality = true;
    if (qualityFilter === 'verified') matchesQuality = route.verified === true;
    else if (qualityFilter === 'pending') matchesQuality = route.status === 'pending' || route.verified === false;
    else if (qualityFilter === 'demo') matchesQuality = route.demo === true;
    else if (qualityFilter === 'featured') matchesQuality = route.featured === true;

    return searchMatch && islandMatch && matchesQuality;
  });

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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-4xl">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar ruta o municipio..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-1">
            <Filter size={14} className="text-gray-400" />
            <select
              value={qualityFilter}
              onChange={(e) => setQualityFilter(e.target.value)}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Todas</option>
              <option value="verified">Verificadas</option>
              <option value="pending">Pendientes</option>
              <option value="demo">Demo</option>
              <option value="featured">Destacadas</option>
            </select>

            <select
              value={islandFilter}
              onChange={(e) => setIslandFilter(e.target.value)}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Todas las islas</option>
              {ISLANDS_DATA.map((island) => (
                <option key={island.slug} value={island.slug}>
                  {island.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {REAL_ROUTES.some(r => r.demo) && (
          <DemoDataNotice
            message="Algunas rutas de esta página son fichas demo o pendientes de verificación. Los datos de distancia, desnivel y trazados son aproximados."
            showLink
          />
        )}

        {/* Route cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
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
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${route.difficulty ? (DIFFICULTY_COLOR[route.difficulty.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300') : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}>
                    {route.difficulty ? route.difficulty.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Dificultad pendiente'}
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
