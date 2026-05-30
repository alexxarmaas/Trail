import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Mountain, MapPin, Calendar, Users, ShoppingBag } from 'lucide-react';
import { getIslandBySlug } from '../data/islands';
import { useRaces } from '../context/RacesContext';
import { CLUBS_DATA } from '../data/clubs';
import { SHOPS_DATA } from '../data/shops';
import { REAL_ROUTES } from '../data/routes.real';
import SEO from '../components/SEO';
import DemoDataNotice from '../components/DemoDataNotice';
import FeaturedBadge from '../components/FeaturedBadge';
import { SITE_CONFIG } from '../config/site';
import { getImageFallback, getImageAlt } from '../utils/getImageFallback';

const IslandPage = () => {
  const { island } = useParams();
  const navigate = useNavigate();
  const islandData = getIslandBySlug(island);
  const { races } = useRaces();

  const islandRaces = races.filter((r) => r.island === island);
  const clubs = CLUBS_DATA.filter((c) => c.island === island);
  const shops = SHOPS_DATA.filter((s) => s.island === island);
  const islandRoutes = REAL_ROUTES.filter((r) => r.island === island);

  if (!islandData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
        <p className="text-6xl mb-4">🗺️</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Isla no encontrada</h1>
        <button
          onClick={() => navigate('/carreras')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
        >
          <ChevronLeft size={18} />
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`Trail Running en ${islandData.name} · Carreras, Clubes y Tiendas`}
        description={islandData.seoText}
        canonical={`${SITE_CONFIG.url}/islas/${island}`}
        ogImage={islandData.image}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Hero */}
        <div className="relative h-72">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
          <img 
            src={getImageFallback(islandData, 'island')} 
            alt={getImageAlt(islandData, 'isla')} 
            className="w-full h-full object-cover" 
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/placeholders/island.svg';
            }}
          />
          <div className="absolute top-4 left-4 z-20">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
            <h1 className="text-4xl font-bold">Trail Running en {islandData.name}</h1>
            <p className="text-white/80 mt-2 max-w-xl">{islandData.seoText}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto p-6 space-y-10">

          {/* Races */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Mountain size={20} className="text-primary" />
                Carreras en {islandData.name}
              </h2>
              <Link
                to="/carreras"
                className="text-sm text-primary hover:underline"
              >
                Ver todas →
              </Link>
            </div>
            {islandRaces.length === 0 ? (
              <p className="text-gray-500 text-sm">No hay carreras registradas para esta isla todavía.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {islandRaces.map((race) => (
                  <Link
                    key={race.id}
                    to={`/carreras/${race.slug}`}
                    className="block p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex gap-3">
                      <img
                        src={getImageFallback(race, 'race')}
                        alt={getImageAlt(race, 'carrera trail')}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/placeholders/race.svg';
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm">{race.name}</h3>
                          {race.featured && <FeaturedBadge />}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <Calendar size={12} />
                          <span>{race.dateLabel}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>{race.distanceLabel}</span>
                          <span>·</span>
                          <span>{race.elevationLabel}</span>
                        </div>
                        {race.demo && (
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">⚠ Datos demo</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Clubs */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Users size={20} className="text-primary" />
                Clubes en {islandData.name}
              </h2>
              <Link to="/clubes" className="text-sm text-primary hover:underline">
                Ver todos →
              </Link>
            </div>
            {clubs.length === 0 ? (
              <p className="text-gray-500 text-sm">No hay clubes registrados para esta isla todavía.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {clubs.map((club) => (
                  <Link
                    key={club.id}
                    to={`/clubes/${club.slug}`}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-colors"
                  >
                    <img
                      src={getImageFallback(club, 'club')}
                      alt={getImageAlt(club, 'club')}
                      className="w-12 h-12 rounded-full object-cover shrink-0"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/placeholders/club.svg';
                      }}
                    />
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white">{club.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <Users size={12} />
                        <span>{club.members} miembros</span>
                      </div>
                      {club.demo && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">⚠ Datos demo</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Shops */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                Tiendas en {islandData.name}
              </h2>
              <Link to="/tiendas" className="text-sm text-primary hover:underline">
                Ver todas →
              </Link>
            </div>
            {shops.length === 0 ? (
              <p className="text-gray-500 text-sm">No hay tiendas registradas para esta isla todavía.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shops.map((shop) => (
                  <Link
                    key={shop.id}
                    to={`/tiendas/${shop.slug}`}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-colors"
                  >
                    <img
                      src={getImageFallback(shop, 'shop')}
                      alt={getImageAlt(shop, 'tienda')}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/placeholders/shop.svg';
                      }}
                    />
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white">{shop.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <MapPin size={12} />
                        <span>{shop.municipality}</span>
                      </div>
                      {shop.demo && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">⚠ Datos demo</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Routes */}
          {islandRoutes.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  Rutas en {islandData.name}
                </h2>
                <Link to="/rutas" className="text-sm text-primary hover:underline">
                  Ver todas →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {islandRoutes.map((route) => (
                  <div
                    key={route.slug}
                    className="flex flex-col p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">{route.name}</h3>
                      {route.demo && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">⚠ Demo</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">{route.distanceLabel || 'Distancia pendiente'}</span>
                      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">{route.elevationLabel || 'Desnivel pendiente'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SEO description */}
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white mb-2">
              Trail running en {islandData.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              {islandData.description}
            </p>
          </div>

          <DemoDataNotice message="Algunos datos de esta página son provisionales y están pendientes de verificación con fuentes oficiales." />
        </div>
      </div>
    </>
  );
};

export default IslandPage;
