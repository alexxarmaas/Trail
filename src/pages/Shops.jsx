import React, { useState } from 'react';
import { MapPin, Phone, Star, ExternalLink, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import SEO from '../components/SEO';
import FeaturedBadge from '../components/FeaturedBadge';
import DemoDataNotice from '../components/DemoDataNotice';
import { SHOPS_DATA } from '../data/shops';
import { ISLANDS_DATA } from '../data/islands';

const Shops = () => {
  const navigate = useNavigate();
  const [islandFilter, setIslandFilter] = useState('all');

  const filteredShops = SHOPS_DATA.filter(
    (shop) => islandFilter === 'all' || shop.island === islandFilter
  );

  return (
    <>
      <SEO
        title="Tiendas de Trail Running en Canarias"
        description="Directorio de tiendas especializadas en trail running en Canarias. Zapatillas, equipamiento técnico, nutrición y más en Tenerife, Gran Canaria y otras islas."
        canonical="https://trailcanarias.vercel.app/tiendas"
      />

      <div className="p-6 md:p-8 space-y-8 min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-orange-50/50 to-green-50/50 dark:from-gray-950 dark:to-gray-900 pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              🏪 Tiendas Trail en Canarias
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Tiendas especializadas en trail running y material de montaña
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              onClick={() => navigate(`/tiendas/${shop.slug}`)}
              className="cursor-pointer"
            >
              <GlassCard className="bg-white dark:bg-gray-900 p-4 flex gap-4 shadow-sm hover:shadow-md h-full border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 transition-all">
                <div className="w-28 h-28 shrink-0 rounded-xl overflow-hidden">
                  <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{shop.name}</h3>
                      {shop.featured && <FeaturedBadge />}
                    </div>

                    {shop.rating && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{shop.rating}</span>
                        {shop.reviews && <span>({shop.reviews})</span>}
                      </div>
                    )}

                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin size={14} />
                      <span>{shop.municipality}</span>
                    </div>

                    {shop.demo && (
                      <DemoDataNotice
                        message="Ficha demo. Datos pendientes de verificación."
                        className="mt-2 text-xs py-1.5"
                      />
                    )}

                    <div className="flex gap-2 mt-2 flex-wrap">
                      {shop.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 uppercase font-semibold tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary hover:text-white transition-colors">
                      <ExternalLink size={12} />
                      Ver tienda
                    </button>
                    {shop.phone && (
                      <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors">
                        <Phone size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        {filteredShops.length === 0 && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <MapPin size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">No hay tiendas para este filtro.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Shops;
