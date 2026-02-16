import React, { useState, useMemo } from 'react';
import { ChevronLeft, Calendar, Mountain, Clock, MapPin, Shield, CheckCircle, Heart, Share2, Calculator, Droplets, Zap, Download, CloudSun, Wind, Thermometer, ArrowRight } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';
import GlassCard from './GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

  // Define Mandatory Gear items with IDs
  const MANDATORY_GEAR = [
    { id: 'water', key: 'race.detail.gear.items.water' },
    { id: 'blanket', key: 'race.detail.gear.items.blanket' },
    { id: 'whistle', key: 'race.detail.gear.items.whistle' },
    { id: 'jacket', key: 'race.detail.gear.items.jacket' },
    { id: 'lamp', key: 'race.detail.gear.items.lamp' }
  ];

  const RaceDetail = ({ race, similarRaces = [], onClose }) => {
  const { t } = useLanguage();
  const { userProfile } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('info'); // info, strategy
  const [activeView, setActiveView] = useState('profile'); // profile, map

  // Gear Checklist State (Persisted in LocalStorage)
  const [gearState, setGearState] = useState(() => {
    const saved = localStorage.getItem(`trail-companion-gear-${race?.id}`);
    return saved ? JSON.parse(saved) : {};
  });

  const toggleGearItem = (id) => {
    setGearState(prev => {
        const newState = { ...prev, [id]: !prev[id] };
        localStorage.setItem(`trail-companion-gear-${race?.id}`, JSON.stringify(newState));
        return newState;
    });
  };

  const completedGearCount = Object.values(gearState).filter(Boolean).length;
  const gearProgress = Math.round((completedGearCount / MANDATORY_GEAR.length) * 100);
  
  // Initialize with the first course if available, otherwise null (uses default race data)
  const [selectedCourse, setSelectedCourse] = useState(race?.courses?.[0] || null);

  // Merge race data with selected course data, but PRESERVE the race name
  const displayRace = useMemo(() => {
    if (!selectedCourse) return race;
    return {
      ...race,
      ...selectedCourse,
      name: race.name, // Keep the original race name (e.g. "Ultra Pirineu")
      courseName: selectedCourse.name // Store course name separately if needed
    };
  }, [race, selectedCourse]);

  // Dynamic Strategy Calculation
  const strategy = useMemo(() => {
    if (!displayRace.distVal || !displayRace.elevVal) return null;
    
    // Personalized formulas
    let waterPerHour = 0.5; // Base 500ml/h
    let carbsPerHour = 60; // Base 60g/h
    
    if (userProfile && userProfile.weight) {
        // Water: Base 300ml + (Weight * 5ml)
        waterPerHour = 0.3 + (userProfile.weight * 0.005);
        // Carbs: 1g per kg per hour is recommended for ultras
        carbsPerHour = userProfile.weight; 
    }

    // Better time estimation: Naismith's Rule (1h for 5km + 1h for 600m ascent)
    const estTimeHours = (displayRace.distVal / 5) + (displayRace.elevVal / 600);
    
    const totalWater = Math.round(waterPerHour * estTimeHours * 10) / 10;
    const totalCarbs = Math.round(carbsPerHour * estTimeHours);

    // Format time
    const h = Math.floor(estTimeHours);
    const m = Math.round((estTimeHours - h) * 60);

    return {
        water: totalWater, // Liters
        carbs: totalCarbs, // Grams
        time: `${h}h ${m}m`,
        isPersonalized: !!(userProfile && userProfile.weight)
    };
  }, [displayRace, userProfile]);

  // Calendar Export
  const downloadIcsFile = () => {
    if (!displayRace) return;
    
    // Parse date (Assuming "Oct 2, 2026" format)
    const raceDate = new Date(displayRace.date);
    // Set default start time to 06:00
    raceDate.setHours(6, 0, 0);
    
    const formatDate = (date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const start = formatDate(raceDate);
    // End time + 12 hours
    const endDate = new Date(raceDate);
    endDate.setHours(18, 0, 0);
    const end = formatDate(endDate);

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${displayRace.name} - ${displayRace.distance}`,
        `DESCRIPTION:Race day! ${displayRace.distance} with ${displayRace.elevation} elevation gain.`,
        `LOCATION:${displayRace.location}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${displayRace.name.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!race) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in slide-in-from-bottom-10 duration-300">
      {/* Hero Section */}
      <div className="relative h-72 md:h-96">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img 
          src={displayRace.image} 
          alt={displayRace.name} 
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
            {displayRace.type} Series
          </Badge>
          <h1 className="text-4xl font-bold leading-tight mb-2">{displayRace.name}</h1>
          <div className="flex items-center gap-4 text-sm opacity-90">
             <span className="flex items-center gap-1">
                <Calendar size={16} />
                {displayRace.date}
             </span>
             <span className="flex items-center gap-1">
                <MapPin size={16} />
                {displayRace.location}
             </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-6 pt-4 gap-6 sticky top-0 bg-white z-40">
        <button 
            onClick={() => setActiveTab('info')}
            className={`pb-3 font-medium text-sm transition-colors relative ${activeTab === 'info' ? 'text-primary' : 'text-gray-500'}`}
        >
            {t('race.detail.infoTab')}
            {activeTab === 'info' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
        </button>
        <button 
            onClick={() => setActiveTab('strategy')}
            className={`pb-3 font-medium text-sm transition-colors relative ${activeTab === 'strategy' ? 'text-primary' : 'text-gray-500'}`}
        >
            {t('race.strategy.title')}
            {activeTab === 'strategy' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
        </button>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto p-6 space-y-8 pb-32">
        
        {activeTab === 'info' ? (
           <>
            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex flex-col items-center text-center">
                    <Mountain className="text-green-600 mb-2" size={24} />
                    <span className="text-2xl font-bold text-gray-900">{displayRace.elevation}</span>
                    <span className="text-xs text-green-700 font-medium uppercase">{t('race.detail.elevation')}</span>
                 </div>
                 <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex flex-col items-center text-center">
                    <MapPin className="text-orange-600 mb-2" size={24} />
                    <span className="text-2xl font-bold text-gray-900">{displayRace.distance}</span>
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

            {/* Weather & Countdown Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Weather Widget */}
                <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <CloudSun size={100} />
                    </div>
                    
                    <div className="flex justify-between items-start mb-4 z-10">
                        <div>
                            <h3 className="font-bold text-gray-900">{t('race.detail.weather.title')}</h3>
                            <p className="text-xs text-gray-500">{t('race.detail.weather.historical')}</p>
                        </div>
                    </div>

                    <div className="flex items-end gap-4 z-10">
                        <div>
                            <span className="text-4xl font-bold text-gray-900">12°</span>
                            <span className="text-sm text-gray-500 ml-1">C</span>
                        </div>
                        <div className="space-y-1 text-xs font-medium text-gray-600 mb-1">
                            <div className="flex items-center gap-1">
                                <Wind size={12} />
                                15 km/h NW
                            </div>
                            <div className="flex items-center gap-1">
                                <Droplets size={12} />
                                45% {t('race.detail.weather.humidity')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Countdown Timer */}
                <div className="bg-gray-900 rounded-2xl p-5 text-white flex flex-col justify-between relative overflow-hidden">
                     <div className="absolute -bottom-4 -right-4 p-4 opacity-10">
                        <Clock size={100} />
                    </div>
                    <h3 className="font-bold mb-4">{t('race.detail.countdown.title')}</h3>
                    <div className="flex justify-between text-center z-10">
                        <div>
                            <div className="text-3xl font-mono font-bold text-primary">142</div>
                            <div className="text-[10px] uppercase tracking-wider opacity-60">{t('race.detail.countdown.days')}</div>
                        </div>
                         <div className="text-2xl font-mono text-gray-600">:</div>
                         <div>
                            <div className="text-3xl font-mono font-bold">12</div>
                            <div className="text-[10px] uppercase tracking-wider opacity-60">{t('race.detail.countdown.hours')}</div>
                        </div>
                        <div className="text-2xl font-mono text-gray-600">:</div>
                         <div>
                            <div className="text-3xl font-mono font-bold">45</div>
                            <div className="text-[10px] uppercase tracking-wider opacity-60">{t('race.detail.countdown.mins')}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Elevation Profile & Map Toggle */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        {activeView === 'profile' ? <Mountain size={20} /> : <MapPin size={20} />}
                        {activeView === 'profile' ? t('race.detail.profile') : t('race.detail.map')}
                    </h3>
                    
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveView('profile')}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeView === 'profile' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {t('race.detail.toggle.profile')}
                        </button>
                         <button
                            onClick={() => setActiveView('map')}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeView === 'map' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {t('race.detail.toggle.map')}
                        </button>
                    </div>
                </div>

                {/* Course Selector (If multiple courses) - Only show if in Profile view for now, or both? Keep it global for this section */
                 race.courses && race.courses.length > 0 && (
                        <div className="flex gap-2 mb-4">
                            {race.courses.map((course) => (
                                <button
                                    key={course.name}
                                    onClick={() => setSelectedCourse(course)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                        selectedCourse?.name === course.name
                                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {course.name}
                                </button>
                            ))}
                        </div>
                 )}
                
                {activeView === 'profile' ? (
                    <>
                        <div className="h-64 w-full bg-gray-50 rounded-2xl p-6 border border-gray-100 relative overflow-hidden flex items-end gap-1 group/graph">
                            {/* Checkpoints Layer */}
                            <div className="absolute inset-0 pointer-events-none z-10">
                                {/* Simulated Checkpoints based on distance */}
                                {[
                                    { km: displayRace.distVal * 0.2, type: 'water', icon: Droplets, color: 'text-blue-500 bg-blue-50', label: 'Aid 1' },
                                    { km: displayRace.distVal * 0.5, type: 'food', icon: Zap, color: 'text-orange-500 bg-orange-50', label: 'Aid 2 (Food)' },
                                    { km: displayRace.distVal * 0.8, type: 'water', icon: Droplets, color: 'text-blue-500 bg-blue-50', label: 'Aid 3' }
                                ].map((cp, i) => (
                                    <div 
                                        key={i}
                                        className="absolute bottom-12 -translate-x-1/2 flex flex-col items-center group/point pointer-events-auto cursor-help"
                                        style={{ left: `${(cp.km / displayRace.distVal) * 100}%` }}
                                    >
                                        <div className={`w-6 h-6 rounded-full shadow-sm border border-white flex items-center justify-center transform transition-transform group-hover/point:scale-125 ${cp.color}`}>
                                            <cp.icon size={12} />
                                        </div>
                                        <div className="absolute bottom-full mb-2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover/point:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                            <span className="font-bold block">{cp.label}</span>
                                            {Math.round(cp.km)}km
                                        </div>
                                        {/* Dotted Line */}
                                        <div className="w-px h-12 border-l border-dashed border-gray-300/50 mt-1"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Simulated Graph Bars */}
                            {[20, 35, 45, 30, 60, 80, 55, 40, 65, 90, 70, 45, 55, 30, 20].map((h, i) => (
                                <div 
                                    key={i} 
                                    className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-sm relative group"
                                    style={{ height: `${h}%` }}
                                >
                                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-900 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {Math.round((i * (displayRace.distVal / 15)))}km
                                    </div>
                                </div>
                            ))}
                             {/* Decorative Line */}
                             <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10"></div>
                        </div>
                        {/* Legend */}
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-400 px-1">
                            <span>0km</span>
                            <span className="font-medium text-gray-500">{t('race.detail.profileLegend')}</span>
                            <span>{displayRace.distance}</span>
                        </div>
                    </>
                ) : (
                    <div className="h-64 w-full bg-gray-100 rounded-2xl border border-gray-200 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center" />
                        <div className="z-10 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-sm text-center">
                            <MapPin size={32} className="mx-auto text-primary mb-2" />
                            <p className="font-bold text-gray-900">{t('race.detail.map')}</p>
                            <p className="text-xs text-gray-500">{t('race.detail.mapPlaceholder.subtitle')}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Mandatory Gear */}
            {/* Mandatory Gear (Interactive Checklist) */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Shield size={20} />
                        {t('race.detail.mandatoryGear')}
                    </h3>
                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {completedGearCount}/{MANDATORY_GEAR.length}
                    </span>
                </div>
                
                {/* Progress Bar */}
                <div className="h-2 w-full bg-gray-100 rounded-full mb-4 overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 rounded-full ${gearProgress === 100 ? 'bg-green-500' : 'bg-primary'}`} 
                        style={{ width: `${gearProgress}%` }} 
                    />
                </div>

                <ul className="space-y-3">
                    {MANDATORY_GEAR.map((item) => {
                        const isChecked = gearState[item.id] || false;
                        return (
                            <li 
                                key={item.id} 
                                onClick={() => toggleGearItem(item.id)}
                                className={`flex items-center gap-3 p-3 border rounded-xl shadow-sm cursor-pointer transition-all active:scale-[0.99] select-none ${
                                    isChecked 
                                        ? 'bg-green-50 border-green-200' 
                                        : 'bg-white border-gray-100 hover:border-primary/30'
                                }`}
                            >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isChecked ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-300'
                                }`}>
                                    <CheckCircle size={14} className={isChecked ? 'opacity-100' : 'opacity-0'} />
                                </div>
                                <span className={`font-medium transition-colors ${isChecked ? 'text-green-800 line-through opacity-70' : 'text-gray-700'}`}>
                                    {t(item.key)}
                                </span>
                            </li>
                        );
                    })}
                </ul>
                
                {gearProgress === 100 && (
                    <div className="mt-4 p-3 bg-green-100/50 text-green-700 text-sm font-bold text-center rounded-xl animate-bounce-subtle">
                        {t('race.detail.gear.allPacked')}
                    </div>
                )}
            </div>
            
            {/* Similar Races */}
            <div>
                 <h3 className="text-xl font-bold text-gray-900 mb-4">{t('race.detail.similar')}</h3>
                 <div className="flex gap-4 overflow-x-auto pb-4 snap-x ml-[-1.5rem] px-6 w-[calc(100%+3rem)] md:w-full md:ml-0 md:px-0">
                    {similarRaces.slice(0, 3).map(r => (
                        <div key={r.id} className="min-w-[280px] snap-center">
                             <GlassCard className="p-0 overflow-hidden bg-white border-gray-100 hover:border-primary/30 transition-colors">
                                <div className="h-32 relative">
                                    <img src={r.image} className="w-full h-full object-cover" alt={r.name} />
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute bottom-3 left-3 text-white font-bold">{r.name}</div>
                                </div>
                                <div className="p-3 flex justify-between items-center">
                                    <div className="text-xs text-gray-500">
                                        <div className="flex items-center gap-1"><Calendar size={12}/> {r.date}</div>
                                        <div className="flex items-center gap-1 mt-1"><Mountain size={12}/> {r.elevation}</div>
                                    </div>
                                    <button className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-colors">
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                             </GlassCard>
                        </div>
                    ))}
                 </div>
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
           </>
        ) : (
            <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 text-blue-900">
                    <div className="bg-blue-100 p-2 rounded-lg h-fit">
                        <Calculator size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold mb-1 flex items-center gap-2">
                            {t('race.strategy.recommends')}
                            {strategy?.isPersonalized && (
                                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                    {t('race.strategy.personalized')}
                                </span>
                            )}
                        </h4>
                        <p className="text-sm opacity-80">{t('race.strategy.explanation')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Water */}
                    <GlassCard className="bg-white border-blue-100 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                            <Droplets size={24} />
                        </div>
                        <span className="text-3xl font-bold text-gray-900">{strategy?.water}L</span>
                        <span className="text-sm font-bold text-gray-500 uppercase mt-1">{t('race.strategy.water')}</span>
                    </GlassCard>

                    {/* Carbs */}
                    <GlassCard className="bg-white border-yellow-100 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-3">
                            <Zap size={24} />
                        </div>
                        <span className="text-3xl font-bold text-gray-900">{strategy?.carbs}g</span>
                        <span className="text-sm font-bold text-gray-500 uppercase mt-1">{t('race.strategy.carbs')}</span>
                    </GlassCard>

                    {/* Time */}
                    <GlassCard className="bg-white border-green-100 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-3">
                            <Clock size={24} />
                        </div>
                        <span className="text-3xl font-bold text-gray-900">{strategy?.time}</span>
                        <span className="text-sm font-bold text-gray-500 uppercase mt-1">{t('race.strategy.time')}</span>
                    </GlassCard>
                </div>
            </div>
        )}

      </div>


      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-[110] flex gap-3 items-center md:pl-72">
        <div className="hidden md:block flex-1">
            <p className="text-sm text-gray-500">{t('race.detail.closesIn')} 12 days</p>
            <p className="font-bold text-lg text-primary">€120.00</p>
        </div>
        <Button variant="outline" className="flex-1 md:flex-none border-gray-300" onClick={downloadIcsFile}>
            <Calendar size={18} className="mr-2" />
            {t('race.detail.addToCalendar')}
        </Button>
        <Button className="flex-[2] md:flex-none md:w-48 shadow-xl shadow-primary/20">
            {t('race.detail.registration')}
        </Button>
      </div>
    </div>
  );
};

export default RaceDetail;
