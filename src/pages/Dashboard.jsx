import React, { useMemo } from 'react';
import { Calendar, Heart, TrendingUp, Mountain, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { useUser } from '../context/UserContext';
import { useRaces } from '../context/RacesContext';
import { BarChart3, Download, Database, ShieldAlert, CheckCircle2, Inbox } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SHOPS_DATA } from '../data/shops';
import { CLUBS_DATA } from '../data/clubs';
import { REAL_ROUTES } from '../data/routes.real';
import { exportToCsv } from '../utils/exportCsv';
import { trackEvent } from '../utils/trackEvent';
import { getImageFallback, getImageAlt } from '../utils/getImageFallback';

const Dashboard = () => {
  const { t } = useLanguage();
  const { favorites } = useFavorites();
  const { userProfile } = useUser();
  const { races } = useRaces();
  const navigate = useNavigate();

  // Get favorited races
  const favoritedRaces = useMemo(() => {
    return races.filter(race => favorites.includes(race.id));
  }, [favorites, races]);

  // Helper for safe date sorting
  const getDateTime = (date) => {
    if (!date) return Number.MAX_SAFE_INTEGER;
    const time = new Date(date).getTime();
    return Number.isNaN(time) ? Number.MAX_SAFE_INTEGER : time;
  };

  // Get upcoming favorited races (next 3)
  const upcomingFavorites = useMemo(() => {
    return favoritedRaces
      .sort((a, b) => getDateTime(a.date) - getDateTime(b.date))
      .slice(0, 3);
  }, [favoritedRaces]);

  // Recommend races based on user preferences
  const recommendedRaces = useMemo(() => {
    if (!userProfile?.preferredRaceTypes || userProfile.preferredRaceTypes.length === 0) {
      return races.slice(0, 3);
    }
    
    return races
      .filter(race => userProfile.preferredRaceTypes.includes(race.type))
      .filter(race => !favorites.includes(race.id))
      .slice(0, 3);
  }, [userProfile, favorites, races]);

  // Local Metrics
  const localMetrics = useMemo(() => {
    try {
      const events = JSON.parse(localStorage.getItem('trailcanarias_events') || '[]');
      const listingReqs = JSON.parse(localStorage.getItem('trailcanarias_listing_requests') || '[]');
      const newsletter = JSON.parse(localStorage.getItem('trailcanarias_newsletter') || '[]');
      const submittedRaces = JSON.parse(localStorage.getItem('trailcanarias_submitted_races') || '[]');

      return {
        clicksInscripcion: events.filter(e => e.eventName === 'registration_click').length,
        clicksWeb: events.filter(e => e.eventName === 'official_website_click').length,
        clicksAnunciate: events.filter(e => 
          ['advertise_cta_click', 'anunciate_cta_click', 'pricing_cta_click'].includes(e.eventName)
        ).length,
        altasNewsletter: newsletter.length,
        solicitudesFicha: listingReqs.length,
        clicksAfiliacion: events.filter(e => e.eventName === 'affiliate_gear_click').length,
        clicksDestacar: events.filter(e => e.eventName === 'highlight_race_cta_click').length,
        carrerasEnviadas: submittedRaces.length,
      };
    } catch {
      return {
        clicksInscripcion: 0, clicksWeb: 0, clicksAnunciate: 0, altasNewsletter: 0,
        solicitudesFicha: 0, clicksAfiliacion: 0, clicksDestacar: 0, carrerasEnviadas: 0
      };
    }
  }, []);

  // Admin state
  const [correctionRequests, setCorrectionRequests] = useState([]);
  const [listingRequests, setListingRequests] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    try {
      setCorrectionRequests(JSON.parse(localStorage.getItem('trailcanarias_correction_requests') || '[]'));
      setListingRequests(JSON.parse(localStorage.getItem('trailcanarias_listing_requests') || '[]'));
    } catch (e) {
      console.error(e);
    }
  }, [refreshKey]);

  const markAsReviewed = (key, id) => {
    try {
      const data = JSON.parse(localStorage.getItem(key) || '[]');
      const updated = data.map(item => item.id === id ? { ...item, status: 'reviewed' } : item);
      localStorage.setItem(key, JSON.stringify(updated));
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  // Pending entities logic
  const pendingEntities = useMemo(() => {
    const filterPending = (arr, type) => arr
      .filter(i => i.status === 'pending' || i.demo || !i.verified)
      .map(i => ({ ...i, entityType: type }));
    
    return [
      ...filterPending(races, 'Carrera'),
      ...filterPending(SHOPS_DATA, 'Tienda'),
      ...filterPending(CLUBS_DATA, 'Club'),
      ...filterPending(REAL_ROUTES, 'Ruta')
    ].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)).slice(0, 5);
  }, [races]);

  // Calculate days until next race
  const getDaysUntil = (dateStr) => {
    const raceDate = new Date(dateStr);
    const today = new Date();
    const diffTime = raceDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Data Quality Metrics
  const qualityMetrics = useMemo(() => {
    const calc = (arr) => ({
      total: arr.length,
      verified: arr.filter(i => i.verified).length,
      demo: arr.filter(i => i.demo).length,
      pending: arr.filter(i => i.status === 'pending' || i.verified === false).length,
      noSource: arr.filter(i => !i.sourceUrl).length,
      noImage: arr.filter(i => !i.image).length,
      featuredNotVerified: arr.filter(i => i.featured && !i.verified).length,
    });
    return {
      races: { ...calc(races), noDate: races.filter(r => !r.date).length, confirmedNotVerified: races.filter(r => r.status === 'confirmed' && !r.verified).length },
      shops: calc(SHOPS_DATA),
      clubs: calc(CLUBS_DATA),
      routes: { ...calc(REAL_ROUTES), noGpx: REAL_ROUTES.filter(r => !r.gpxUrl).length },
    };
  }, [races]);

  const handleExport = (key, filename, eventType) => {
    try {
      const data = JSON.parse(localStorage.getItem(key) || '[]');
      exportToCsv(filename, data);
      trackEvent('dashboard_export_csv', { type: eventType });
    } catch (err) {
      console.error('Error exporting data:', err);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {t('dashboard.welcome')}, {userProfile?.name || 'Runner'}! 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{t('dashboard.subtitle')}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-4 bg-white/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Heart size={20} className="text-red-600 dark:text-red-400" fill="currentColor" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{favorites.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">{t('dashboard.favorites')}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 bg-white/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Calendar size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingFavorites.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">{t('dashboard.upcoming')}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 bg-white/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrendingUp size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{races.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">{t('dashboard.available')}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 bg-white/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Mountain size={20} className="text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{userProfile?.fitnessLevel || 'N/A'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">{t('dashboard.level')}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Upcoming Races */}
      {upcomingFavorites.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('dashboard.upcomingRaces')}</h2>
            <button 
              onClick={() => navigate('/carreras')}
              className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
            >
              {t('dashboard.viewAll')} <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {upcomingFavorites.map((race) => {
              const daysUntil = getDaysUntil(race.date);
              return (
                <GlassCard 
                  key={race.id} 
                  className="p-0 overflow-hidden bg-white/60 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800 hover:scale-[1.02] transition-transform cursor-pointer"
                  onClick={() => navigate('/carreras')}
                >
                  <div className="h-32 relative">
                    <img
                      src={getImageFallback(race, 'race')}
                      alt={getImageAlt(race, 'carrera trail')}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/placeholders/race.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-white">
                      <h3 className="font-bold text-sm">{race.name}</h3>
                      <p className="text-xs opacity-90">{race.location || race.municipality || 'Canarias'}</p>
                    </div>
                    {daysUntil > 0 && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="neutral" className="bg-white/90 text-gray-900 text-xs">
                          {daysUntil}d
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Mountain size={14} />
                      <span>{race.elevationLabel || race.elevation || 'Desnivel pendiente'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Clock size={14} />
                      <span>{race.distanceLabel || race.distance || 'Distancia pendiente'}</span>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommended Races */}
      {recommendedRaces.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('dashboard.recommended')}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.recommendedSubtitle')}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {recommendedRaces.map((race) => (
              <GlassCard 
                key={race.id} 
                className="p-0 overflow-hidden bg-white/60 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800 hover:scale-[1.02] transition-transform cursor-pointer"
                onClick={() => navigate('/carreras')}
              >
                <div className="h-32 relative">
                  <img
                    src={getImageFallback(race, 'race')}
                    alt={getImageAlt(race, 'carrera trail')}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/placeholders/race.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white">
                    <h3 className="font-bold text-sm">{race.name}</h3>
                    <p className="text-xs opacity-90 flex items-center gap-1">
                      <MapPin size={12} />
                      {race.location || race.municipality || 'Canarias'}
                    </p>
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{race.dateLabel || race.date || 'Fecha pendiente'}</span>
                  <Badge variant="neutral" className="text-xs">{race.distanceLabel || race.distance || 'Distancia pendiente'}</Badge>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {favorites.length === 0 && (
        <GlassCard className="p-8 text-center bg-white/60 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800">
          <Heart size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('dashboard.noFavorites')}</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{t('dashboard.noFavoritesSubtitle')}</p>
          <Button onClick={() => navigate('/carreras')}>
            {t('dashboard.browseRaces')}
          </Button>
        </GlassCard>
      )}

      {/* Métricas locales */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center">
              <BarChart3 size={20} className="fill-current" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Métricas locales (MVP)</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Estas métricas se guardan solo en este navegador y sirven para validar el MVP. No son analítica real.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Clicks inscripción', value: localMetrics.clicksInscripcion },
            { label: 'Clicks web oficial', value: localMetrics.clicksWeb },
            { label: 'Clicks anunciate', value: localMetrics.clicksAnunciate },
            { label: 'Altas newsletter', value: localMetrics.altasNewsletter },
            { label: 'Solicitudes ficha', value: localMetrics.solicitudesFicha },
            { label: 'Clicks afiliación', value: localMetrics.clicksAfiliacion },
            { label: 'Destacar carrera', value: localMetrics.clicksDestacar },
            { label: 'Carreras enviadas', value: localMetrics.carrerasEnviadas }
          ].map((m, i) => (
            <GlassCard key={i} className="p-4 bg-white/60 dark:bg-gray-900/60 flex flex-col justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {m.label}
              </span>
              <span className="text-2xl font-black text-gray-900 dark:text-white">
                {m.value}
              </span>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Calidad de datos */}
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
            <Database size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Calidad de datos</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Resumen del estado de la base de datos.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            { 
              title: 'Carreras', 
              metrics: qualityMetrics.races, 
              extras: `${qualityMetrics.races.noDate} sin fecha · ${qualityMetrics.races.confirmedNotVerified} confirmadas no verificadas` 
            },
            { title: 'Tiendas', metrics: qualityMetrics.shops, extras: '' },
            { title: 'Clubes', metrics: qualityMetrics.clubs, extras: '' },
            { title: 'Rutas', metrics: qualityMetrics.routes, extras: `${qualityMetrics.routes.noGpx} sin GPX` },
          ].map((block, idx) => (
            <GlassCard key={idx} className="p-5 bg-white/60 dark:bg-gray-900/60 flex flex-col justify-between">
              <h3 className="font-bold text-lg mb-3">{block.title} <span className="text-sm text-gray-400 font-normal">({block.metrics.total} total)</span></h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm mb-3">
                <div className="flex flex-col"><span className="text-green-600 font-bold">{block.metrics.verified}</span> <span className="text-gray-500 text-xs">Verificados</span></div>
                <div className="flex flex-col"><span className="text-amber-500 font-bold">{block.metrics.demo}</span> <span className="text-gray-500 text-xs">Demo</span></div>
                <div className="flex flex-col"><span className="text-orange-500 font-bold">{block.metrics.pending}</span> <span className="text-gray-500 text-xs">Pendientes</span></div>
                <div className="flex flex-col"><span className="text-gray-700 dark:text-gray-300 font-bold">{block.metrics.noImage}</span> <span className="text-gray-500 text-xs">Sin imagen</span></div>
              </div>
              {(block.extras || block.metrics.featuredNotVerified > 0 || block.metrics.noSource > 0) && (
                <div className="text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
                  {block.metrics.featuredNotVerified > 0 && <p className="text-red-500 flex items-center gap-1"><ShieldAlert size={12}/> {block.metrics.featuredNotVerified} destacados no verificados</p>}
                  {block.metrics.noSource > 0 && <p>{block.metrics.noSource} sin enlace a fuente oficial</p>}
                  {block.extras && <p>{block.extras}</p>}
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Exportación CSV */}
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
            <Download size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Exportación CSV</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Descarga los datos recopilados por la aplicación (solo local).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="flex items-center gap-2 py-3" onClick={() => handleExport('trailcanarias_listing_requests', 'solicitudes_ficha.csv', 'listing_requests')}>
            <Download size={16} /> Solicitudes Ficha
          </Button>
          <Button variant="outline" className="flex items-center gap-2 py-3" onClick={() => handleExport('trailcanarias_correction_requests', 'correcciones_ficha.csv', 'correction_requests')}>
            <Download size={16} /> Corregir Fichas
          </Button>
          <Button variant="outline" className="flex items-center gap-2 py-3" onClick={() => handleExport('trailcanarias_newsletter', 'newsletter.csv', 'newsletter')}>
            <Download size={16} /> Newsletter
          </Button>
          <Button variant="outline" className="flex items-center gap-2 py-3" onClick={() => handleExport('trailcanarias_events', 'eventos_tracking.csv', 'events')}>
            <Download size={16} /> Eventos Tracking
          </Button>
        </div>
      </div>

      {/* Admin Local */}
      <div className="mt-12 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center">
            <Inbox size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bandeja de Entrada (Local)</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Revisa sugerencias de usuarios y fichas de alta.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Correction Requests */}
          <GlassCard className="p-5 bg-white/60 dark:bg-gray-900/60">
            <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
              Correcciones
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">{correctionRequests.filter(r => r.status === 'pending').length} pdt</span>
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
              {correctionRequests.length === 0 ? (
                <p className="text-sm text-gray-500">No hay correcciones pendientes.</p>
              ) : (
                correctionRequests.map(req => (
                  <div key={req.id} className={`p-3 rounded-xl border ${req.status === 'reviewed' ? 'bg-gray-50/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 opacity-60' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold uppercase text-primary">{req.type || 'General'}</span>
                      {req.status === 'pending' && (
                        <button onClick={() => markAsReviewed('trailcanarias_correction_requests', req.id)} className="text-xs flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors">
                          <CheckCircle2 size={14}/> Revisado
                        </button>
                      )}
                    </div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white mb-1">{req.itemName}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 break-words"><span className="font-semibold text-gray-700 dark:text-gray-300">Problema:</span> {req.issue}</p>
                    {req.correction && <p className="text-xs text-gray-600 dark:text-gray-400 break-words"><span className="font-semibold text-gray-700 dark:text-gray-300">Dato correcto:</span> {req.correction}</p>}
                  </div>
                ))
              ).reverse()}
            </div>
          </GlassCard>

          {/* Listing Requests */}
          <GlassCard className="p-5 bg-white/60 dark:bg-gray-900/60">
            <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
              Nuevas Fichas
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">{listingRequests.filter(r => r.status === 'pending').length} pdt</span>
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
              {listingRequests.length === 0 ? (
                <p className="text-sm text-gray-500">No hay solicitudes nuevas.</p>
              ) : (
                listingRequests.map(req => (
                  <div key={req.id} className={`p-3 rounded-xl border ${req.status === 'reviewed' ? 'bg-gray-50/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 opacity-60' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold uppercase text-primary">{req.type}</span>
                      {req.status === 'pending' && (
                        <button onClick={() => markAsReviewed('trailcanarias_listing_requests', req.id)} className="text-xs flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors">
                          <CheckCircle2 size={14}/> Revisado
                        </button>
                      )}
                    </div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white mb-1">{req.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{req.island} {req.municipality ? `- ${req.municipality}` : ''}</p>
                    <div className="flex gap-2 mt-2">
                      {req.web && <a href={req.web} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">Web</a>}
                      {req.instagram && <a href={`https://instagram.com/${req.instagram.replace('@','')}`} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">Instagram</a>}
                    </div>
                  </div>
                ))
              ).reverse()}
            </div>
          </GlassCard>

          {/* Pending Priority Entities */}
          <GlassCard className="p-5 bg-white/60 dark:bg-gray-900/60 lg:col-span-2">
            <h3 className="font-bold text-lg mb-4">Entidades Demo/Pendientes Prioritarias</h3>
            <p className="text-sm text-gray-500 mb-4">Top 5 entidades de la BD real que necesitan verificación (priorizadas por destacado).</p>
            <div className="space-y-2">
              {pendingEntities.map((ent, idx) => (
                <div key={`${ent.entityType}-${ent.slug}-${idx}`} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-500 uppercase w-16">{ent.entityType}</span>
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">{ent.name}</span>
                    {ent.featured && <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-bold">Destacado</span>}
                    {ent.demo && <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">Demo</span>}
                  </div>
                  <span className="text-xs text-gray-500">{ent.island?.replace('-', ' ')}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
