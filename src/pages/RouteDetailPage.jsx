import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Map, ExternalLink, AlertTriangle, Route as RouteIcon, TrendingUp, Info } from 'lucide-react';
import SEO from '../components/SEO';
import { REAL_ROUTES } from '../data/routes.real';
import { ISLANDS_DATA } from '../data/islands';
import { getImageFallback, getImageAlt } from '../utils/getImageFallback';
import DemoDataNotice from '../components/DemoDataNotice';
import DataInfoBlock from '../components/DataInfoBlock';
import QualityBadge from '../components/QualityBadge';

const DIFFICULTY_COLOR = {
  'muy-alta': 'bg-red-200 text-red-900 dark:bg-red-900/50 dark:text-red-300 font-bold',
  'alta': 'bg-orange-200 text-orange-900 dark:bg-orange-900/50 dark:text-orange-300 font-bold',
  'media-alta': 'bg-amber-200 text-amber-900 dark:bg-amber-900/50 dark:text-amber-300 font-semibold',
  'media': 'bg-yellow-200 text-yellow-900 dark:bg-yellow-900/50 dark:text-yellow-300 font-semibold',
  'baja': 'bg-green-200 text-green-900 dark:bg-green-900/50 dark:text-green-300 font-semibold',
};

const RouteDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const route = REAL_ROUTES.find((r) => r.slug === slug);

  if (!route) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
        <p className="text-6xl mb-4">🗺️</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ruta no encontrada</h1>
        <p className="text-gray-500 mb-6">No hemos encontrado ninguna ruta con este identificador.</p>
        <button
          onClick={() => navigate('/rutas')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
        >
          <ChevronLeft size={18} />
          Volver a rutas
        </button>
      </div>
    );
  }

  const sourceLink = route.officialInfoUrl || route.sourceUrl;

  return (
    <>
      <SEO
        title={`${route.name} · Ruta Trail en Canarias`}
        description={route.description || `Ruta de trail running en ${route.municipality || route.island}.`}
        canonical={`https://trailcanarias.vercel.app/rutas/${route.slug}`}
        ogImage={route.image}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Hero */}
        <div className="h-64 md:h-80 relative overflow-hidden">
          <img 
            src={getImageFallback(route, 'route')} 
            alt={getImageAlt(route, 'ruta trail')} 
            className="w-full h-full object-cover" 
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/placeholders/route.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
          <div className="absolute top-4 left-4 z-20">
            <button
              onClick={() => navigate('/rutas')}
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute bottom-6 left-6 z-20 text-white">
            <QualityBadge item={route} className="mb-2 w-fit" />
            <h1 className="text-3xl font-bold leading-tight">{route.name}</h1>
            <div className="flex items-center gap-1 mt-1 text-sm opacity-90 capitalize">
              <MapPin size={14} />
              <span>{route.island.replace('-', ' ')} {route.municipality ? `- ${route.municipality}` : ''}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto p-6 space-y-6">
          {route.demo && (
            <DemoDataNotice message="Datos demo. Esta ficha está pendiente de verificación con información oficial." />
          )}

          {route.warnings && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex gap-3 text-amber-900 dark:text-amber-200">
              <AlertTriangle size={24} className="shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-1">Aviso importante</h4>
                <p className="text-sm opacity-90">{route.warnings}</p>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
              <RouteIcon size={24} className="mx-auto text-primary mb-1" />
              <p className="font-bold text-gray-900 dark:text-white">{route.distanceLabel || '-'}</p>
              <p className="text-xs text-gray-500 uppercase font-semibold">Distancia</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
              <TrendingUp size={24} className="mx-auto text-primary mb-1" />
              <p className="font-bold text-gray-900 dark:text-white">{route.elevationLabel || '-'}</p>
              <p className="text-xs text-gray-500 uppercase font-semibold">Desnivel</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center flex flex-col justify-center">
              <p className={`text-xs font-semibold px-2 py-1 rounded-full w-fit mx-auto ${route.difficulty ? (DIFFICULTY_COLOR[route.difficulty.toLowerCase()] || 'bg-gray-100 text-gray-800') : 'bg-gray-100 text-gray-800'}`}>
                {route.difficulty ? route.difficulty.replace('-', ' ').toUpperCase() : 'N/A'}
              </p>
              <p className="text-xs text-gray-500 uppercase font-semibold mt-2">Dificultad</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center flex flex-col justify-center">
              <p className="font-bold text-gray-900 dark:text-white capitalize">{route.routeType || '-'}</p>
              <p className="text-xs text-gray-500 uppercase font-semibold mt-1">Tipo</p>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Sobre la ruta</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
              {route.description || 'Información detallada pendiente de completar.'}
            </p>
          </div>

          {/* CTA Links */}
          <div className="flex flex-col sm:flex-row gap-3">
            {route.gpxUrl ? (
              <a
                href={route.gpxUrl}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
              >
                <Map size={20} />
                Descargar GPX
              </a>
            ) : (
              <div className="flex-1 flex flex-col gap-2">
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-bold cursor-not-allowed bg-gray-50 dark:bg-gray-800/50"
                >
                  <Map size={20} />
                  GPX pendiente de añadir
                </button>
              </div>
            )}

            {sourceLink && (
              <a
                href={sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <ExternalLink size={20} />
                Ver fuente oficial
              </a>
            )}
          </div>

          {/* Suggestion CTA */}
          {!route.gpxUrl && (
            <div className="text-center mt-2">
              <Link 
                to={`/corregir-ficha?type=ruta&slug=${encodeURIComponent(route.slug)}&name=${encodeURIComponent(route.name)}`}
                className="text-sm text-primary hover:underline font-semibold flex items-center justify-center gap-1"
              >
                <Info size={14} /> ¿Tienes el track GPX? Sugerir archivo
              </Link>
            </div>
          )}

          {/* Data Info */}
          <DataInfoBlock item={route} type="ruta" />
        </div>
      </div>
    </>
  );
};

export default RouteDetailPage;
