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

  // Get upcoming favorited races (next 3)
  const upcomingFavorites = useMemo(() => {
    return favoritedRaces
      .sort((a, b) => new Date(a.date) - new Date(b.date))
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

  // Calculate days until next race
  const getDaysUntil = (dateStr) => {
    const raceDate = new Date(dateStr);
    const today = new Date();
    const diffTime = raceDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
                    <img src={race.image} alt={race.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-white">
                      <h3 className="font-bold text-sm">{race.name}</h3>
                      <p className="text-xs opacity-90">{race.location}</p>
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
                      <span>{race.elevation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Clock size={14} />
                      <span>{race.distance}</span>
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
                  <img src={race.image} alt={race.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white">
                    <h3 className="font-bold text-sm">{race.name}</h3>
                    <p className="text-xs opacity-90 flex items-center gap-1">
                      <MapPin size={12} />
                      {race.location}
                    </p>
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{race.date}</span>
                  <Badge variant="neutral" className="text-xs">{race.distance}</Badge>
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
    </div>
  );
};

export default Dashboard;
