import React, { useState } from 'react';
import { Calendar, MapPin, Mountain, Heart, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { useRaces } from '../context/RacesContext';
import SEO from '../components/SEO';
import FeaturedBadge from '../components/FeaturedBadge';
import DemoDataNotice from '../components/DemoDataNotice';
import NewsletterSignup from '../components/NewsletterSignup';
import { ISLANDS_DATA } from '../data/islands';

const RACE_TYPES = [
  { value: 'all', label: 'Todas' },
  { value: 'ultra', label: 'Ultra' },
  { value: 'marathon', label: 'Maratón' },
  { value: 'short', label: 'Corta' },
];

const RaceCalendar = () => {
  const { t } = useLanguage();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { races } = useRaces();
  const navigate = useNavigate();

  const [typeFilter, setTypeFilter] = useState('all');
  const [islandFilter, setIslandFilter] = useState('all');

  const filteredRaces = races.filter((race) => {
    const typeMatch = typeFilter === 'all' || race.type === typeFilter;
    const islandMatch = islandFilter === 'all' || race.island === islandFilter;
    return typeMatch && islandMatch;
  });

  return (
    <>
      <SEO
        title="Calendario de Carreras Trail en Canarias"
        description="Todas las carreras de trail running en Canarias: Transgrancanaria, Transvulcania, Tenerife Bluetrail y más. Filtra por isla y tipo."
      />

      <div className="p-6 md:p-8 space-y-8 min-h-screen relative overflow-hidden transition-colors duration-300">
        {/* Background */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-green-50 to-orange-50/50 dark:from-gray-950 dark:to-gray-900 pointer-events-none transition-colors duration-300" />
        <div className="fixed -top-40 -right-40 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="fixed top-1/2 -left-40 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl -z-10" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              🏔️ Carreras Trail Canarias
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Calendario de carreras de montaña en las Islas Canarias
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Island filter */}
            <div className="flex items-center gap-1">
              <Filter size={14} className="text-gray-400" />
              <select
                value={islandFilter}
                onChange={(e) => setIslandFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Todas las islas</option>
                {ISLANDS_DATA.map((island) => (
                  <option key={island.slug} value={island.slug}>
                    {island.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type filter */}
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
              {RACE_TYPES.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setTypeFilter(f.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    typeFilter === f.value
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRaces.map((race) => (
            <div key={race.id} className="cursor-pointer relative">
              <GlassCard
                className="group hover:-translate-y-1 transition-transform duration-300 p-0 overflow-hidden border-0 bg-white/40 dark:bg-gray-900/40 hover:bg-white/60 dark:hover:bg-gray-800/60"
                onClick={() => navigate(`/carreras/${race.slug}`)}
              >
                {/* Image Header */}
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img
                    src={race.image}
                    alt={race.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    {race.featured && <FeaturedBadge />}
                    {race.isPublished && (
                      <span className="bg-primary/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        Nueva
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <h3 className="text-xl font-bold leading-tight">{race.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-200 mt-1">
                      <MapPin size={14} />
                      <span>{race.location}</span>
                    </div>
                  </div>

                  {/* Favorite + Date */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(race.id);
                      }}
                      className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all hover:scale-110"
                      aria-label="Toggle favorite"
                    >
                      <Heart size={18} fill={isFavorite(race.id) ? 'currentColor' : 'none'} />
                    </button>
                    <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-3 py-1 rounded-full text-xs font-bold">
                      {race.dateLabel || race.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {race.demo && (
                    <DemoDataNotice
                      message="Datos pendientes de verificación oficial."
                      className="mb-3 text-xs py-2"
                    />
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-orange-100/80 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                        <Mountain size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">
                          Desnivel
                        </p>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {race.elevationLabel || race.elevation}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">
                          Distancia
                        </p>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {race.distanceLabel || race.distance}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button variant="primary" className="w-full pointer-events-none">
                    Ver detalles
                  </Button>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        {filteredRaces.length === 0 && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <Mountain size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">No hay carreras para este filtro.</p>
          </div>
        )}

        {/* Newsletter */}
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </div>
    </>
  );
};

export default RaceCalendar;
