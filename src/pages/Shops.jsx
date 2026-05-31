import React, { useState } from 'react';
import { MapPin, Phone, Star, ExternalLink, Filter, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import SEO from '../components/SEO';
import FeaturedBadge from '../components/FeaturedBadge';
import DemoDataNotice from '../components/DemoDataNotice';
import QualityBadge from '../components/QualityBadge';
import { SHOPS_DATA } from '../data/shops';
import { ISLANDS_DATA } from '../data/islands';
import { getImageFallback, getImageAlt } from '../utils/getImageFallback';

const Shops = () => {
  const navigate = useNavigate();
  const [islandFilter, setIslandFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [qualityFilter, setQualityFilter] = useState('all');

  const filteredShops = SHOPS_DATA.filter((shop) => {
    const searchStr = `${shop.name} ${shop.municipality} ${shop.island} ${shop.tags?.join(' ')} ${shop.description || ''}`.toLowerCase();
    const matchesSearch = !searchTerm || searchStr.includes(searchTerm.toLowerCase());
    const matchesIsland = islandFilter === 'all' || shop.island === islandFilter;
    
    let matchesQuality = true;
    if (qualityFilter === 'verified') matchesQuality = shop.verified === true;
    else if (qualityFilter === 'pending') matchesQuality = shop.status === 'pending' || shop.verified === false;
    else if (qualityFilter === 'demo') matchesQuality = shop.demo === true;
    else if (qualityFilter === 'featured') matchesQuality = shop.featured === true;

    return matchesSearch && matchesIsland && matchesQuality;
  });

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

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar tienda o municipio..."
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
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              onClick={() => navigate(`/tiendas/${shop.slug}`)}
              className="block group cursor-pointer"
            >
              <GlassCard className="bg-white dark:bg-gray-900 p-0 flex flex-col shadow-sm hover:shadow-md h-full border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 transition-all overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={getImageFallback(shop, 'shop')} 
                    alt={getImageAlt(shop, 'tienda')} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/placeholders/shop.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <h2 className="text-xl font-bold text-white mb-1">{shop.name}</h2>
                    <div className="flex items-center text-white/80 text-sm gap-1">
                      <MapPin size={14} />
                      <span>{shop.island.replace('-', ' ').toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-2 mb-2">
                      {shop.featured && <FeaturedBadge />}
                      <QualityBadge item={shop} />
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
                    <Link 
                      to={`/tiendas/${shop.slug}`}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-primary border border-primary/30 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={12} />
                      Ver tienda
                    </Link>
                    {shop.phone && (
                      <button 
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `tel:${shop.phone}`; }}
                      >
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
