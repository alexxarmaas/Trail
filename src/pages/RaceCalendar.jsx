import React, { useState } from 'react';
import { Calendar, MapPin, Mountain } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import RaceDetail from '../components/RaceDetail';
import { useLanguage } from '../context/LanguageContext';

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
    image: 'https://images.unsplash.com/photo-1542663914-7264879659e9?auto=format&fit=crop&q=80&w=600',
    type: 'ultra',
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
    image: 'https://images.unsplash.com/photo-1541819660-f47055734567?auto=format&fit=crop&q=80&w=600',
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
    image: 'https://images.unsplash.com/photo-1486749969622-4467c6999b82?auto=format&fit=crop&q=80&w=600',
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
    image: 'https://images.unsplash.com/photo-1522888147772-74d32a493a7d?auto=format&fit=crop&q=80&w=600',
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
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=600',
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
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=600',
    type: 'short',
  },
];

const RaceCalendar = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [selectedRace, setSelectedRace] = useState(null);

  const filteredRaces = filter === 'all' 
    ? RACES 
    : RACES.filter(race => {
        if (filter === 'ultra') return race.type === 'ultra';
        if (filter === 'short') return race.type === 'short' || race.type === 'marathon';
        return true;
      });

  return (
    <>
    <div className="p-6 md:p-8 space-y-8 min-h-screen relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-green-50 to-orange-50/50 pointer-events-none" />
        <div className="fixed -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="fixed top-1/2 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t('race.title')}</h1>
          <p className="text-gray-500 mt-1">{t('race.subtitle')}</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {['all', 'short', 'ultra'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                filter === f 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {t(`race.filter.${f}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRaces.map((race) => (
          <div key={race.id} onClick={() => setSelectedRace(race)} className="cursor-pointer">
          <GlassCard className="group hover:-translate-y-1 transition-transform duration-300 p-0 overflow-hidden border-0 bg-white/40 hover:bg-white/60">
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
                <div className="absolute top-4 right-4 z-20">
                     <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-3 py-1 rounded-full text-xs font-bold">
                        {race.date.split(',')[0]}
                     </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-orange-100/80 text-orange-600 rounded-lg">
                            <Mountain size={18} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">{t('race.elevation')}</p>
                            <p className="font-bold text-gray-900">{race.elevation}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="p-2 bg-green-100/80 text-green-700 rounded-lg">
                            <Calendar size={18} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">{t('race.distance')}</p>
                            <p className="font-bold text-gray-900">{race.distance}</p>
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
        <RaceDetail race={selectedRace} onClose={() => setSelectedRace(null)} />
    )}
    </>
  );
};

export default RaceCalendar;
