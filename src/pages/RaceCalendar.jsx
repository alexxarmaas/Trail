import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Mountain, Heart, Filter, Search, ArrowUpDown, Plus, Megaphone, CheckCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { useFavorites } from '../context/FavoritesContext';
import { useRaces } from '../context/RacesContext';
import { getImageFallback, getImageAlt } from '../utils/getImageFallback';
import SEO from '../components/SEO';
import FeaturedBadge from '../components/FeaturedBadge';
import DemoDataNotice from '../components/DemoDataNotice';
import NewsletterSignup from '../components/NewsletterSignup';
import { ISLANDS_DATA, getIslandName } from '../data/islands';

const RACE_TYPES = [
  { value: 'all', label: 'Todas' },
  { value: 'ultra', label: 'Ultra' },
  { value: 'marathon', label: 'Maratón' },
  { value: 'short', label: 'Corta' },
];

const SORT_OPTIONS = [
  { value: 'date-asc', label: 'Próximas primero' },
  { value: 'dist-desc', label: 'Más distancia' },
  { value: 'elev-desc', label: 'Más desnivel' },
  { value: 'featured', label: 'Destacadas primero' },
];

const STATUS_LABEL = {
  confirmed: { text: '✓ Confirmada', cls: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
  pending: { text: '⏳ Pendiente', cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
};

const RaceCalendar = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { races } = useRaces();
  const navigate = useNavigate();

  const [typeFilter, setTypeFilter] = useState('all');
  const [islandFilter, setIslandFilter] = useState('all');
  const [distanceFilter, setDistanceFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-asc');
  const [qualityFilter, setQualityFilter] = useState('all');

  const filteredRaces = useMemo(() => {
    let list = races.filter((race) => {
      const typeMatch = typeFilter === 'all' || race.type === typeFilter;
      const islandMatch = islandFilter === 'all' || race.island === islandFilter;
      
      let distanceMatch = true;
      if (distanceFilter === 'lt15') distanceMatch = race.distVal <= 15;
      else if (distanceFilter === '15-30') distanceMatch = race.distVal > 15 && race.distVal <= 30;
      else if (distanceFilter === '30-50') distanceMatch = race.distVal > 30 && race.distVal <= 50;
      else if (distanceFilter === 'gt50') distanceMatch = race.distVal > 50;

      const q = searchTerm.toLowerCase();
      const searchMatch =
        !q ||
        race.name.toLowerCase().includes(q) ||
        (race.island && getIslandName(race.island).toLowerCase().includes(q)) ||
        (race.municipality && race.municipality.toLowerCase().includes(q)) ||
        (race.location && race.location.toLowerCase().includes(q));

      let matchesQuality = true;
      if (qualityFilter === 'verified') matchesQuality = race.verified === true;
      else if (qualityFilter === 'pending') matchesQuality = race.status === 'pending' || race.verified === false;
      else if (qualityFilter === 'demo') matchesQuality = race.demo === true;
      else if (qualityFilter === 'featured') matchesQuality = race.featured === true;

      return typeMatch && islandMatch && distanceMatch && searchMatch && matchesQuality;
    });

    // Sort
    list = [...list].sort((a, b) => {
      if (sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'dist-desc') {
        return (b.distVal || 0) - (a.distVal || 0);
      }
      if (sortBy === 'elev-desc') {
        return (b.elevVal || 0) - (a.elevVal || 0);
      }
      if (sortBy === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      return 0;
    });

    return list;
  }, [races, typeFilter, islandFilter, distanceFilter, searchTerm, sortBy, qualityFilter]);

  // Stats for hero
  const islandsWithRaces = [...new Set(races.map((r) => r.island))].length;

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

        {/* HERO BLOCK */}
        <div className="rounded-3xl bg-gradient-to-br from-primary to-green-800 p-6 md:p-8 text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/3" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Calendario Trail Canarias
              </h1>
              <p className="text-white/80 text-base md:text-lg max-w-xl">
                Carreras, clubes y tiendas de trail running en las Islas Canarias.
              </p>
              {/* Mini stats */}
              <div className="flex gap-4 mt-4 flex-wrap">
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-1.5">
                  <Mountain size={16} />
                  <span className="font-bold">{races.length}</span>
                  <span className="text-white/75 text-sm">carreras</span>
                </div>
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-1.5">
                  <MapPin size={16} />
                  <span className="font-bold">{islandsWithRaces}</span>
                  <span className="text-white/75 text-sm">islas</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/publica-tu-carrera"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition-colors shadow-lg"
              >
                <Plus size={18} />
                Publica tu carrera
              </Link>
              <Link
                to="/anunciate"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <Megaphone size={18} />
                Anúnciate
              </Link>
            </div>
          </div>
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar carrera, isla o municipio..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Buscar carrera"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Quality filter */}
            <div className="flex items-center gap-1">
              <Filter size={14} className="text-gray-400 shrink-0" />
              <select
                value={qualityFilter}
                onChange={(e) => setQualityFilter(e.target.value)}
                aria-label="Filtrar por estado"
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Todas</option>
                <option value="verified">Verificadas</option>
                <option value="pending">Pendientes</option>
                <option value="demo">Demo</option>
                <option value="featured">Destacadas</option>
              </select>
            </div>
            
            {/* Island filter */}
            <div className="flex items-center gap-1">
              <Filter size={14} className="text-gray-400 shrink-0" />
              <select
                value={islandFilter}
                onChange={(e) => setIslandFilter(e.target.value)}
                aria-label="Filtrar por isla"
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

            {/* Distance filter */}
            <div className="flex items-center gap-1">
              <select
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(e.target.value)}
                aria-label="Filtrar por distancia"
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Todas las distancias</option>
                <option value="lt15">Hasta 15 km</option>
                <option value="15-30">15–30 km</option>
                <option value="30-50">30–50 km</option>
                <option value="gt50">50 km+</option>
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

            {/* Sort */}
            <div className="flex items-center gap-1">
              <ArrowUpDown size={14} className="text-gray-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Ordenar carreras"
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRaces.map((race) => {
            const islandName = getIslandName(race.island);
            const statusInfo = STATUS_LABEL[race.status] || STATUS_LABEL.pending;

            return (
              <div
                key={race.id}
                className="cursor-pointer relative"
                onClick={() => navigate(`/carreras/${race.slug}`)}
              >
                <GlassCard className="group hover:-translate-y-1 transition-transform duration-300 p-0 overflow-hidden border-0 bg-white/40 dark:bg-gray-900/40 hover:bg-white/60 dark:hover:bg-gray-800/60 h-full flex flex-col">
                  {/* Image Header */}
                  <div className="relative h-48 sm:h-56">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src={getImageFallback(race, 'race')}
                      alt={getImageAlt(race, 'carrera trail')}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/placeholders/race.svg';
                      }}
                    />

                    {/* Badges top-left */}
                    <div className="absolute top-3 left-3 z-20 flex gap-2 flex-wrap">
                      {race.featured && <FeaturedBadge />}
                      {race.isPublished && (
                        <span className="bg-primary/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                          Nueva
                        </span>
                      )}
                    </div>

                    {/* Island name top-right */}
                    <div className="absolute top-3 right-3 z-20">
                      <span className="bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                        {islandName}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-4 left-4 z-20 text-white">
                      <h2 className="text-xl font-bold leading-tight">{race.name}</h2>
                      <div className="flex items-center gap-1 text-sm text-gray-200 mt-1">
                        <MapPin size={14} />
                        <span>{race.municipality || race.location}</span>
                      </div>
                    </div>

                    {/* Favorite + Date */}
                    <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(race.id);
                        }}
                        aria-label={isFavorite(race.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                        className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all hover:scale-110"
                      >
                        <Heart size={18} fill={isFavorite(race.id) ? 'currentColor' : 'none'} />
                      </button>
                      <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {race.dateLabel || race.date}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    {race.demo && (
                      <DemoDataNotice
                        message="Datos pendientes de verificación."
                        className="mb-3 text-xs py-1.5"
                      />
                    )}

                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1.5 flex-1">
                        <Mountain size={16} className="text-orange-500 shrink-0" />
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {race.elevationLabel || race.elevation || 'N/D'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} className="text-green-600 shrink-0" />
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {race.distanceLabel || race.distance || 'N/D'}
                        </span>
                      </div>
                    </div>

                    {/* Status + registration badges */}
                    <div className="flex gap-2 flex-wrap mt-auto pt-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusInfo.cls}`}>
                        {statusInfo.text}
                      </span>
                      {race.registrationUrl && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 flex items-center gap-1">
                          <CheckCircle size={10} /> Inscripción disponible
                        </span>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        {filteredRaces.length === 0 && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <Mountain size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">No hay carreras para este filtro.</p>
            <button
              onClick={() => { setSearchTerm(''); setTypeFilter('all'); setIslandFilter('all'); setDistanceFilter('all'); }}
              className="mt-3 text-sm text-primary hover:underline"
            >
              Borrar filtros
            </button>
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
