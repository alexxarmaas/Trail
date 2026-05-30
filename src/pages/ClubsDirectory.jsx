import React, { useState } from 'react';
import { Search, Users, Trophy, MapPin, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import FeaturedBadge from '../components/FeaturedBadge';
import DemoDataNotice from '../components/DemoDataNotice';
import { CLUBS_DATA } from '../data/clubs';
import { ISLANDS_DATA } from '../data/islands';
import { getImageFallback, getImageAlt } from '../utils/getImageFallback';

const ClubsDirectory = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [islandFilter, setIslandFilter] = useState('all');
  const [qualityFilter, setQualityFilter] = useState('all');

  const filteredClubs = CLUBS_DATA.filter((club) => {
    const searchStr = `${club.name} ${club.municipality} ${club.island} ${club.description || ''}`.toLowerCase();
    const searchMatch = !searchTerm || searchStr.includes(searchTerm.toLowerCase());
    const islandMatch = islandFilter === 'all' || club.island === islandFilter;
    
    let matchesQuality = true;
    if (qualityFilter === 'verified') matchesQuality = club.verified === true;
    else if (qualityFilter === 'pending') matchesQuality = club.status === 'pending' || club.verified === false;
    else if (qualityFilter === 'demo') matchesQuality = club.demo === true;
    else if (qualityFilter === 'featured') matchesQuality = club.featured === true;

    return searchMatch && islandMatch && matchesQuality;
  });

  return (
    <>
      <SEO
        title="Clubes de Trail Running en Canarias"
        description="Directorio de clubes de trail running y carrera de montaña en Canarias. Encuentra tu club en Tenerife, Gran Canaria, La Palma, Lanzarote y más islas."
        canonical="https://trailcanarias.vercel.app/clubes"
      />

      <div className="p-6 md:p-8 space-y-8 min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-gray-950 dark:to-gray-900 pointer-events-none" />
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              👥 Clubes de Trail en Canarias
            </h1>
            <p className="text-gray-500 mt-1">
              Encuentra tu club de trail running en las islas
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar club o municipio..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-1">
              <Filter size={14} className="text-gray-400" />
              <select
                value={qualityFilter}
                onChange={(e) => setQualityFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Todos</option>
                <option value="verified">Verificados</option>
                <option value="pending">Pendientes</option>
                <option value="demo">Demo</option>
                <option value="featured">Destacados</option>
              </select>

              <select
                value={islandFilter}
                onChange={(e) => setIslandFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClubs.map((club) => (
            <GlassCard
              key={club.id}
              className="group hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center p-6 border-transparent hover:border-primary/20 bg-white/60 dark:bg-gray-900/60 cursor-pointer"
              onClick={() => navigate(`/clubes/${club.slug}`)}
            >
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
                  <img 
                    src={getImageFallback(club, 'club')} 
                    alt={getImageAlt(club, 'club')} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/placeholders/club.svg';
                    }}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 z-20 bg-yellow-400 rounded-full p-1.5 border-2 border-white shadow-sm">
                  <Trophy size={14} className="text-yellow-900" />
                </div>
              </div>

              {club.featured && <FeaturedBadge className="mb-2" />}

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{club.name}</h3>

              <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                <MapPin size={14} />
                <span>{club.municipality}</span>
              </div>

              {club.demo && (
                <DemoDataNotice
                  message="Datos demo. Pendiente de verificación."
                  className="mb-2 text-xs py-1.5"
                />
              )}

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {club.description}
              </p>

              <div className="mt-auto w-full space-y-3">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50 dark:bg-gray-800 py-2 rounded-lg">
                  <Users size={16} />
                  <span className="font-semibold text-gray-900 dark:text-white">{club.members}</span>
                  <span>miembros</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full py-2 text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  Ver club
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <Users size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">No hay clubes para este filtro.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ClubsDirectory;
