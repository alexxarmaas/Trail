import React, { useState } from 'react';
import { Calendar, MapPin, Mountain, Heart } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import RaceDetail from '../components/RaceDetail';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';

const RACES = [
  {
    id: 1,
    name: 'Ultra Pirineu',
    date: 'Oct 2, 2026',
    distance: '100km',
    distVal: 100,
    elevation: '+6600m',
    elevVal: 6600,
    location: 'Bagà, Spain',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800',
    type: 'ultra',
    courses: [
      { name: '100K', distance: '100km', distVal: 100, elevation: '+6600m', elevVal: 6600 },
      { name: '42K', distance: '42km', distVal: 42, elevation: '+2800m', elevVal: 2800 },
      { name: '21K', distance: '21km', distVal: 21, elevation: '+1500m', elevVal: 1500 },
      { name: 'vertical', distance: '5km', distVal: 5, elevation: '+1000m', elevVal: 1000 },
    ]
  },
  {
    id: 2,
    name: 'Zegama-Aizkorri',
    date: 'May 24, 2026',
    distance: '42km',
    distVal: 42,
    elevation: '+2736m',
    elevVal: 2736,
    location: 'Zegama, Spain',
    image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=800',
    type: 'marathon',
  },
  {
    id: 3,
    name: 'Transvulcania',
    date: 'May 9, 2026',
    distance: '72km',
    distVal: 72,
    elevation: '+4735m',
    elevVal: 4735,
    location: 'La Palma, Spain',
    image: 'https://images.unsplash.com/photo-1541280910158-c4e14f9c94a3?auto=format&fit=crop&q=80&w=800',
    type: 'ultra',
  },
  {
    id: 4,
    name: 'Dolomyths Run',
    date: 'Jul 18, 2026',
    distance: '22km',
    distVal: 22,
    elevation: '+1750m',
    elevVal: 1750,
    location: 'Canazei, Italy',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    type: 'short',
  },
  {
    id: 5,
    name: 'UTMB',
    date: 'Aug 28, 2026',
    distance: '171km',
    distVal: 171,
    elevation: '+10000m',
    elevVal: 10000,
    location: 'Chamonix, France',
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800',
    type: 'ultra',
  },
  {
    id: 6,
    name: 'Sierre-Zinal',
    date: 'Aug 8, 2026',
    distance: '31km',
    distVal: 31,
    elevation: '+2200m',
    elevVal: 2200,
    location: 'Valais, Switzerland',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800',
    type: 'short',
  },
  {
    id: 7,
    name: 'Pilancones Tunte Trail',
    date: 'Jan 17, 2026',
    distance: '34km',
    distVal: 34,
    elevation: '+1900m',
    elevVal: 1900,
    location: 'San Bartolomé de Tirajana, Spain',
    image: 'https://images.unsplash.com/photo-1502126324834-38f8e02d7160?auto=format&fit=crop&q=80&w=800',
    type: 'marathon',
  },
];

const RaceCalendar = () => {
  const { t } = useLanguage();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [filter, setFilter] = useState('all');
  const [selectedRace, setSelectedRace] = useState(null);

  const filteredRaces = filter === 'all' 
    ? RACES 
    : filter === 'favorites'
    ? RACES.filter(race => isFavorite(race.id))
    : RACES.filter(race => {
        if (filter === 'ultra') return race.type === 'ultra';
        if (filter === 'short') return race.type === 'short' || race.type === 'marathon';
        return true;
      });

  return (
    <>
    <div className="p-6 md:p-8 space-y-8 min-h-screen relative overflow-hidden transition-colors duration-300">
        {/* Background Decorative Elements */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-green-50 to-orange-50/50 dark:from-gray-950 dark:to-gray-900 pointer-events-none transition-colors duration-300" />
        <div className="fixed -top-40 -right-40 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="fixed top-1/2 -left-40 w-96 h-96 bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{t('race.title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{t('race.subtitle')}</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {['all', 'favorites', 'short', 'ultra'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1 ${
                filter === f 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {f === 'favorites' && <Heart size={14} fill={filter === 'favorites' ? 'currentColor' : 'none'} />}
              {t(`race.filter.${f}`)}
              {f === 'favorites' && favorites.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">{favorites.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRaces.map((race) => (
          <div key={race.id} className="cursor-pointer relative">
          <GlassCard className="group hover:-translate-y-1 transition-transform duration-300 p-0 overflow-hidden border-0 bg-white/40 dark:bg-gray-900/40 hover:bg-white/60 dark:hover:bg-gray-800/60" onClick={() => setSelectedRace(race)}>
            {/* Image Header */}
            <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img 
                    src={race.image} 
                    alt={race.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 z-20 text-white">
                    <h3 className="text-xl font-bold leading-tight">{race.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-200 mt-1">
                        <MapPin size={14} />
                        <span>{race.location}</span>
                    </div>
                </div>
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
                        {race.date.split(',')[0]}
                     </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-orange-100/80 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                            <Mountain size={18} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">{t('race.elevation')}</p>
                            <p className="font-bold text-gray-900 dark:text-white">{race.elevation}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="p-2 bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
                            <Calendar size={18} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">{t('race.distance')}</p>
                            {race.courses && race.courses.length > 0 ? (
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {race.courses.map(course => {
                                        const colorClass = course.distVal < 21 
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
                                            : course.distVal <= 42 
                                                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800' 
                                                : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800';
                                        
                                        return (
                                            <span key={course.name} className={`text-[10px] px-1.5 py-0.5 rounded border ${colorClass} font-bold`}>
                                                {course.name}
                                            </span>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="font-bold text-gray-900 dark:text-white">{race.distance}</p>
                            )}
                        </div>
                    </div>
                </div>

                <Button variant="primary" className="w-full pointer-events-none">
                    {t('race.register')}
                </Button>
            </div>
          </GlassCard>
          </div>
          
        ))}
        
      </div>
    </div>
    
    {/* Detail Overlay */}
    {selectedRace && (
        <RaceDetail 
            race={selectedRace} 
            similarRaces={RACES.filter(r => r.id !== selectedRace.id)}
            onClose={() => setSelectedRace(null)} 
        />
    )}
    </>
  );
};

export default RaceCalendar;
