import React, { useState } from 'react';
import { Search, Users, Trophy, MapPin } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import ClubDetail from '../components/ClubDetail';
import { useLanguage } from '../context/LanguageContext';

const CLUBS = [
  // ... (keep data as is for now, maybe translate descriptions later if needed, but names remain)
  {
    id: 1,
    name: 'Summit Striders',
    members: 142,
    location: 'Denver, CO',
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=400',
    description: 'We run high, we run far. Join us for weekly altitude training.',
  },
  {
    id: 2,
    name: 'Valley Runners',
    members: 89,
    location: 'Chamonix, FR',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=400',
    description: 'Exploring the trails around Mont Blanc since 2010.',
  },
  {
    id: 3,
    name: 'Coastal Trail Club',
    members: 256,
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=400',
    description: 'Ocean breeze and steep hills. All paces welcome.',
  },
  {
    id: 4,
    name: 'Alpine Goats',
    members: 45,
    location: 'Zermatt, CH',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&q=80&w=400',
    description: 'If it is not steep, we are not interested. Vertical K specialists.',
  },
   {
    id: 5,
    name: 'Forest Phantoms',
    members: 112,
    location: 'Portland, OR',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400',
    description: 'Running through the misty forests of the PNW.',
  },
  {
    id: 6,
    name: 'Desert Rats',
    members: 78,
    location: 'Moab, UT',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=400',
    description: 'Technical slickrock running and canyon adventures.',
  },
];

const ClubsDirectory = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClub, setSelectedClub] = useState(null);

  const filteredClubs = CLUBS.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 space-y-8 min-h-screen relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-green-50/50 to-blue-50/50 pointer-events-none" />
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t('clubs.directory.title')}</h1>
          <p className="text-gray-500 mt-1">{t('clubs.directory.subtitle')}</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t('clubs.directory.searchPlaceholder')}
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm hover:shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredClubs.map((club) => (
          <GlassCard 
            key={club.id} 
            className="group hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center p-6 border-transparent hover:border-primary/20 bg-white/60 cursor-pointer"
            onClick={() => setSelectedClub(club)}
          >
            <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
                    <img 
                        src={club.image} 
                        alt={club.name} 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute -bottom-1 -right-1 z-20 bg-yellow-400 rounded-full p-1.5 border-2 border-white shadow-sm">
                    <Trophy size={14} className="text-yellow-900" />
                </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-1">{club.name}</h3>
            
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                <MapPin size={14} />
                <span>{club.location}</span>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{club.description}</p>
            
            <div className="mt-auto w-full space-y-3">
                 <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50 py-2 rounded-lg">
                    <Users size={16} />
                    <span className="font-semibold text-gray-900">{club.members}</span>
                    <span>{t('clubs.card.members')}</span>
                </div>
                <Button variant="outline" className="w-full py-2 text-sm hover:bg-primary hover:text-white transition-colors">
                    {t('clubs.card.viewDetails')}
                </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Club Detail Overlay */}
      {selectedClub && (
        <ClubDetail club={selectedClub} onClose={() => setSelectedClub(null)} />
      )}
    </div>
  );
};

export default ClubsDirectory;
