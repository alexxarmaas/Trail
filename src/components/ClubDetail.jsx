import React from 'react';
import { X, MapPin, Users, Calendar, Trophy, Mountain, ChevronRight, Share2, Heart } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import GlassCard from '../components/GlassCard';
import { useLanguage } from '../context/LanguageContext';

const ClubDetail = ({ club, onClose }) => {
  const { t } = useLanguage();

  if (!club) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in fade-in slide-in-from-bottom-10 duration-300">
      {/* Hero Header */}
      <div className="relative h-64 md:h-80 w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img 
          src={club.image} 
          alt={club.name} 
          className="w-full h-full object-cover"
        />
        
        {/* Navigation */}
        <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex gap-3">
             <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                <Heart size={24} />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
              <Share2 size={24} />
            </button>
          </div>
        </div>

        {/* Club Intro */}
        <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
           <Badge variant="accent" className="mb-2 bg-primary/90 text-white border-none">
             {t('clubs.detail.verified')}
           </Badge>
           <h1 className="text-3xl md:text-4xl font-bold mb-2">{club.name}</h1>
           <div className="flex items-center gap-4 text-sm md:text-base opacity-90">
             <span className="flex items-center gap-1">
                <MapPin size={16} />
                {club.location}
             </span>
             <span className="flex items-center gap-1">
                <Users size={16} />
                {club.members} {t('clubs.detail.members')}
             </span>
           </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto p-6 space-y-8 pb-32">
        
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                <p className="text-2xl font-bold text-gray-900">12k</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">{t('clubs.detail.avgDist')}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                <p className="text-2xl font-bold text-gray-900">450m</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">{t('clubs.detail.avgElev')}</p>
            </div>
             <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                <p className="text-2xl font-bold text-gray-900">Weekly</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">{t('clubs.detail.meetups')}</p>
            </div>
        </div>

        {/* About Section */}
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{t('clubs.detail.about')}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
                {club.description} We are a community of passionate trail runners dedicated to exploring the local mountains. 
                Whether you're training for an ultra or just want to enjoy nature, everyone is welcome.
            </p>
        </div>

        {/* Upcoming Events */}
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{t('clubs.detail.upcomingRuns')}</h3>
                <button className="text-primary font-medium text-sm">{t('clubs.detail.viewAll')}</button>
            </div>
            
            <div className="space-y-4">
                {[1, 2].map((i) => (
                    <GlassCard key={i} className="flex items-center p-4 bg-white border-gray-100 active:scale-[0.99] transition-transform">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex flex-col items-center justify-center text-primary font-bold shrink-0 mr-4">
                            <span className="text-xs uppercase">OCT</span>
                            <span className="text-xl">1{i+4}</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg">Sunday Long Run</h4>
                            <p className="text-gray-500 text-sm flex items-center gap-2">
                                <Mountain size={14} /> 15km • 800m+
                            </p>
                        </div>
                        <ChevronRight className="text-gray-300" />
                    </GlassCard>
                ))}
            </div>
        </div>

        {/* Members Grid Preview */}
        <div>
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{t('clubs.detail.members')}</h3>
                <span className="text-gray-500 text-sm">{club.members} {t('clubs.detail.runners')}</span>
            </div>
            <div className="flex -space-x-3 overflow-hidden py-2">
                {[1,2,3,4,5,6].map(i => (
                    <img 
                        key={i}
                        className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover"
                        src={`https://source.unsplash.com/random/100x100?face,${i}`}
                        alt=""
                    />
                ))}
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-bold ring-2 ring-white">
                    +{(club.members || 142) - 6}
                </div>
            </div>
        </div>

      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-50 md:pl-72">
        <Button className="w-full shadow-xl shadow-primary/20 h-12 text-lg">
            {t('clubs.detail.join')}
        </Button>
      </div>

    </div>
  );
};

export default ClubDetail;
