import React, { useState } from 'react';
import { ChevronLeft, Calendar, Mountain, Clock, MapPin, Shield, CheckCircle, Heart, Share2 } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';
import { useLanguage } from '../context/LanguageContext';

const RaceDetail = ({ race, onClose }) => {
  const { t } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);

  if (!race) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in fade-in slide-in-from-bottom-10 duration-300">
      {/* Hero Section */}
      <div className="relative h-72 md:h-96">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img 
          src={race.image} 
          alt={race.name} 
          className="w-full h-full object-cover"
        />
        
        {/* Navigation & Actions */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-3">
             <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 backdrop-blur-md rounded-full transition-colors ${isFavorite ? 'bg-red-500/80 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
              >
                <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
              <Share2 size={24} />
            </button>
          </div>
        </div>

        {/* Title Block */}
        <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
          <Badge variant="accent" className="mb-2 uppercase tracking-wider text-[10px]">
            {race.type} Series
          </Badge>
          <h1 className="text-4xl font-bold leading-tight mb-2">{race.name}</h1>
          <div className="flex items-center gap-4 text-sm opacity-90">
             <span className="flex items-center gap-1">
                <Calendar size={16} />
                {race.date}
             </span>
             <span className="flex items-center gap-1">
                <MapPin size={16} />
                {race.location}
             </span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto p-6 space-y-8 pb-32">
        
        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex flex-col items-center text-center">
                <Mountain className="text-green-600 mb-2" size={24} />
                <span className="text-2xl font-bold text-gray-900">{race.elevation}</span>
                <span className="text-xs text-green-700 font-medium uppercase">{t('race.detail.elevation')}</span>
             </div>
             <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex flex-col items-center text-center">
                <MapPin className="text-orange-600 mb-2" size={24} />
                <span className="text-2xl font-bold text-gray-900">{race.distance}</span>
                <span className="text-xs text-orange-700 font-medium uppercase">{t('race.detail.distance')}</span>
             </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col items-center text-center">
                <Clock className="text-blue-600 mb-2" size={24} />
                <span className="text-2xl font-bold text-gray-900">06:00</span>
                <span className="text-xs text-blue-700 font-medium uppercase">{t('race.detail.startTime')}</span>
             </div>
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex flex-col items-center text-center">
                <CheckCircle className="text-purple-600 mb-2" size={24} />
                <span className="text-2xl font-bold text-gray-900">8</span>
                <span className="text-xs text-purple-700 font-medium uppercase">{t('race.detail.checkpoints')}</span>
             </div>
        </div>

        {/* Elevation Profile (CSS Graph) */}
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mountain size={20} />
                {t('race.detail.profile')}
            </h3>
            <div className="h-48 w-full bg-gray-50 rounded-2xl p-4 border border-gray-100 relative overflow-hidden flex items-end gap-1">
                {/* Simulated Graph Bars */}
                {[20, 35, 45, 30, 60, 80, 55, 40, 65, 90, 70, 45, 55, 30, 20].map((h, i) => (
                    <div 
                        key={i} 
                        className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-sm relative group"
                        style={{ height: `${h}%` }}
                    >
                         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-900 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {i * 5}km
                        </div>
                    </div>
                ))}
                 {/* Decorative Line */}
                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10"></div>
            </div>
        </div>

        {/* Mandatory Gear */}
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield size={20} />
                {t('race.detail.mandatoryGear')}
            </h3>
            <ul className="space-y-3">
                {['Water Container (1L min)', 'Survival Blanket', 'Whistle', 'Waterproof Jacket with hood', 'Headlamp + Spare batteries'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                            <CheckCircle size={14} />
                        </div>
                        <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
        
        {/* Description Placeholder */}
        <div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">{t('race.detail.about')}</h3>
             <p className="text-gray-600 leading-relaxed">
                This legendary course takes you through the most spectacular peaks of the region. 
                Prepare for technical descents, steep climbs, and breathtaking views. 
                The terrain varies from soft forest trails to rocky alpine ridges.
             </p>
        </div>

      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-50 flex justify-between items-center md:pl-72">
        <div className="hidden md:block">
            <p className="text-sm text-gray-500">Registration closes in 12 days</p>
            <p className="font-bold text-lg text-primary">€120.00</p>
        </div>
        <Button className="w-full md:w-auto md:px-12 shadow-xl shadow-primary/20">
            {t('race.detail.registration')}
        </Button>
      </div>
    </div>
  );
};

export default RaceDetail;
