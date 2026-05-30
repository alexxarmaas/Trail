import React, { useState, useMemo } from 'react';
import { ChevronLeft, Calendar, Mountain, Clock, MapPin, Shield, CheckCircle, Heart, Share2, Calculator, Droplets, Zap, Download, CloudSun, Wind, Thermometer, ArrowRight, Loader2, ExternalLink, Globe } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';
import GlassCard from './GlassCard';
import RouteMap from './RouteMap';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useFavorites } from '../context/FavoritesContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useGpxData } from '../hooks/useGpxData';
import AffiliateGearBlock from './AffiliateGearBlock';
import BusinessCTA from './BusinessCTA';
import DemoDataNotice from './DemoDataNotice';
import { trackEvent } from '../utils/trackEvent';
import { Link } from 'react-router-dom';

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
  const { toggleFavorite, isFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState('info'); // info, strategy
  const [activeView, setActiveView] = useState('profile'); // profile, map

  // Fetch GPX Data for elevation profile
  const centerFallback = [28.2916, -16.6291]; // Default Tenerife
  const distNum = parseFloat(race?.distVal) || parseFloat(race?.distance) || 34;
  const { elevationData, metadata, loading: gpxLoading } = useGpxData(centerFallback, distNum);

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
      name: race.name,
      courseName: selectedCourse.name
    };
  }, [race, selectedCourse]);

  // Derived safe field helpers — never show undefined
  const raceDistance = displayRace.distanceLabel || displayRace.distance || 'Distancia pendiente';
  const raceElevation = displayRace.elevationLabel || displayRace.elevation || 'Desnivel pendiente';
  const raceDate = displayRace.dateLabel || displayRace.date || 'Fecha pendiente';
  const raceLocation = displayRace.location || displayRace.municipality || 'Canarias';
  const raceStartTime = displayRace.startTime || null;
  const raceCheckpoints = displayRace.checkpoints ?? null;

  // Real countdown from race.date
  const countdownDays = useMemo(() => {
    if (!race.date) return null;
    const diff = Math.ceil((new Date(race.date) - new Date()) / (1000 * 60 * 60 * 24));
    return diff;
  }, [race.date]);

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

    const raceDate = new Date(displayRace.date);
    const startHour = raceStartTime ? parseInt(raceStartTime.split(':')[0]) : 6;
    const startMin = raceStartTime ? parseInt(raceStartTime.split(':')[1]) : 0;
    raceDate.setHours(startHour, startMin, 0);

    const formatDate = (date) => date.toISOString().replace(/-|:|\.\d+/g, '');
    const start = formatDate(raceDate);
    const endDate = new Date(raceDate);
    endDate.setHours(raceDate.getHours() + 12, 0, 0);
    const end = formatDate(endDate);

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${displayRace.name} - ${raceDistance}`,
      `DESCRIPTION:${displayRace.name}. ${raceDistance} | ${raceElevation}`,
      `LOCATION:${raceLocation}`,
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
    trackEvent('add_to_calendar', { raceId: race.id, raceName: race.name });
  };

  if (!race) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-gray-950 overflow-y-auto animate-in fade-in slide-in-from-bottom-10 duration-300">
      {race.demo && (
        <DemoDataNotice
          message="Datos demo. Esta ficha está pendiente de verificación con fuentes y organizadores oficiales."
          className="m-4 mb-0"
        />
      )}
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
               onClick={() => toggleFavorite(race.id)}
               aria-label={isFavorite(race.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
               className={`p-2 backdrop-blur-md rounded-full transition-colors ${isFavorite(race.id) ? 'bg-red-500/80 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
              >
                <Heart size={24} fill={isFavorite(race.id) ? "currentColor" : "none"} />
            </button>
            <button 
              aria-label="Compartir carrera"
              onClick={() => {
                const shareUrl = `${window.location.origin}/carreras/${race.slug}`;
                trackEvent('share_race', { raceSlug: race.slug });
                if (navigator.share) {
                  navigator.share({ title: race.name, url: shareUrl }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(shareUrl);
                  alert('¡Enlace copiado al portapapeles!');
                }
              }}
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <Share2 size={24} />
            </button>
          </div>
        </div>

        {/* Title Block */}
        <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
          <Badge variant="accent" className="mb-2 uppercase tracking-wider text-[10px]">
            {displayRace.type === 'ultra' ? 'Ultra Trail' : displayRace.type === 'marathon' ? 'Trail Maratón' : 'Trail'}
          </Badge>
          <h1 className="text-4xl font-bold leading-tight mb-2">{displayRace.name}</h1>
          <div className="flex items-center gap-4 text-sm opacity-90">
             <span className="flex items-center gap-1">
                <Calendar size={16} />
                {raceDate}
             </span>
             <span className="flex items-center gap-1">
                <MapPin size={16} />
                {raceLocation}
             </span>
          </div>
        </div>
      </div>

      {/* CTA bar below hero */}
      <div className="flex flex-wrap gap-2 px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        {race.registrationUrl && (
          <a
            href={race.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('registration_click', { raceId: race.id, raceName: race.name })}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <ExternalLink size={14} />
            Inscribirse
          </a>
        )}
        {race.officialWebsite && (
          <a
            href={race.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('official_website_click', { raceId: race.id, raceName: race.name })}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Globe size={14} />
            Web oficial
          </a>
        )}
        {race.priceFrom && !race.demo && (
          <span className="flex items-center px-3 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-sm font-semibold border border-green-200 dark:border-green-800">
            Desde {race.priceFrom} €
          </span>
        )}
        {race.status && (
          <span className={`flex items-center px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wide border ${
            race.status === 'confirmed'
              ? 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
              : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800'
          }`}>
            {race.status === 'confirmed' ? '✓ Confirmada' : '⏳ Pendiente'}
          </span>
        )}
        {race.demo && (
          <span className="flex items-center px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wide bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800">
            ⚠ Datos demo
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 px-6 pt-4 gap-6 sticky top-0 bg-white dark:bg-gray-950 z-40 transition-colors duration-300">
        <button 
            onClick={() => setActiveTab('info')}
            className={`pb-3 font-medium text-sm transition-colors relative ${activeTab === 'info' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
        >
            {t('race.detail.infoTab')}
            {activeTab === 'info' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
        </button>
        <button 
            onClick={() => setActiveTab('strategy')}
            className={`pb-3 font-medium text-sm transition-colors relative ${activeTab === 'strategy' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
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
                 <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800 flex flex-col items-center text-center">
                    <Mountain className="text-green-600 dark:text-green-400 mb-2" size={24} />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{raceElevation}</span>
                    <span className="text-xs text-green-700 dark:text-green-400 font-medium uppercase">{t('race.detail.elevation')}</span>
                 </div>
                 <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-800 flex flex-col items-center text-center">
                    <MapPin className="text-orange-600 dark:text-orange-400 mb-2" size={24} />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{raceDistance}</span>
                    <span className="text-xs text-orange-700 dark:text-orange-400 font-medium uppercase">{t('race.detail.distance')}</span>
                 </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 flex flex-col items-center text-center">
                    <Clock className="text-blue-600 dark:text-blue-400 mb-2" size={24} />
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{raceStartTime || '—'}</span>
                    <span className="text-xs text-blue-700 dark:text-blue-400 font-medium uppercase">{t('race.detail.startTime')}</span>
                    {!raceStartTime && <span className="text-[10px] text-gray-400 mt-0.5">Pendiente</span>}
                 </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-800 flex flex-col items-center text-center">
                    <CheckCircle className="text-purple-600 dark:text-purple-400 mb-2" size={24} />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {raceCheckpoints !== null ? raceCheckpoints : '—'}
                    </span>
                    <span className="text-xs text-purple-700 dark:text-purple-400 font-medium uppercase">{t('race.detail.checkpoints')}</span>
                    {raceCheckpoints === null && <span className="text-[10px] text-gray-400 mt-0.5">Pendiente</span>}
                 </div>
            </div>

            {/* Weather & Countdown Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Weather Widget */}
                <div className="bg-sky-50 dark:bg-sky-900/10 rounded-2xl p-5 border border-sky-100 dark:border-sky-800 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <CloudSun size={100} className="text-sky-900 dark:text-sky-100" />
                    </div>
                    <div className="flex justify-between items-start mb-4 z-10">
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{t('race.detail.weather.title')}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('race.detail.weather.historical')}</p>
                        </div>
                    </div>
                    <div className="z-10">
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                          Clima pendiente de confirmar
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Añadiremos previsión cercana a la fecha de carrera.
                        </p>
                    </div>
                </div>

                {/* Countdown Timer */}
                <div className="bg-gray-900 rounded-2xl p-5 text-white flex flex-col justify-between relative overflow-hidden">
                     <div className="absolute -bottom-4 -right-4 p-4 opacity-10">
                        <Clock size={100} />
                    </div>
                    <h3 className="font-bold mb-4">{t('race.detail.countdown.title')}</h3>
                    {countdownDays === null ? (
                      <p className="text-gray-400 text-sm">Fecha pendiente</p>
                    ) : countdownDays < 0 ? (
                      <p className="text-amber-400 text-sm font-semibold">Fecha pasada o pendiente de actualizar</p>
                    ) : (
                      <div className="flex justify-between text-center z-10">
                          <div>
                              <div className="text-3xl font-mono font-bold text-primary">{countdownDays}</div>
                              <div className="text-[10px] uppercase tracking-wider opacity-60">{t('race.detail.countdown.days')}</div>
                          </div>
                          <div className="text-2xl font-mono text-gray-600">días</div>
                          <div>
                              <div className="text-3xl font-mono font-bold">{Math.floor((new Date(race.date) - new Date()) / (1000 * 60 * 60) % 24)}</div>
                              <div className="text-[10px] uppercase tracking-wider opacity-60">{t('race.detail.countdown.hours')}</div>
                          </div>
                          <div className="text-2xl font-mono text-gray-600">:</div>
                          <div>
                              <div className="text-3xl font-mono font-bold">{Math.floor((new Date(race.date) - new Date()) / (1000 * 60) % 60)}</div>
                              <div className="text-[10px] uppercase tracking-wider opacity-60">{t('race.detail.countdown.mins')}</div>
                          </div>
                      </div>
                    )}
                </div>
            </div>

            {/* Elevation Profile & Map Toggle */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {activeView === 'profile' ? <Mountain size={20} /> : <MapPin size={20} />}
                        {activeView === 'profile' ? t('race.detail.profile') : t('race.detail.map')}
                    </h3>
                    
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg transition-colors">
                        <button
                            onClick={() => setActiveView('profile')}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeView === 'profile' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        >
                            {t('race.detail.toggle.profile')}
                        </button>
                         <button
                            onClick={() => setActiveView('map')}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeView === 'map' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
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
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {course.name}
                                </button>
                            ))}
                        </div>
                 )}
                
                {activeView === 'profile' ? (
                    <>
                        <div className="h-64 w-full bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden flex items-end gap-1 group/graph px-2 pt-6">
                            
                            {gpxLoading ? (
                                <div className="absolute inset-0 flex items-center justify-center flex-col z-20">
                                    <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                                    <span className="text-sm font-medium text-gray-500">Loading Elevation Profile...</span>
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={elevationData}
                                        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="colorElevation" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>

                                        <XAxis 
                                            dataKey="distance" 
                                            hide={true} // Hide internal axis line because we add our own below
                                        />
                                        <YAxis 
                                            domain={['dataMin - 100', 'dataMax + 100']} 
                                            hide={true} 
                                        />
                                        
                                        <Tooltip 
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const point = payload[0].payload;
                                                    return (
                                                        <div className="bg-gray-900 dark:bg-black text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-gray-700">
                                                            <p className="font-bold flex items-center gap-1">
                                                                <Mountain size={12} className="text-primary"/> 
                                                                {point.elevation}m
                                                            </p>
                                                            <p className="text-gray-400">Dist: {point.distance}km</p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                            position={{ y: 0 }}
                                            cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '5 5' }}
                                        />
                                        
                                        <Area 
                                            type="monotone" 
                                            dataKey="elevation" 
                                            stroke="#f97316" 
                                            strokeWidth={3}
                                            fillOpacity={1} 
                                            fill="url(#colorElevation)" 
                                            isAnimationActive={true}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}

                            {/* Checkpoints Layer (Simulated on top of graph) */}
                            {!gpxLoading && elevationData.length > 0 && (
                                <div className="absolute inset-0 pointer-events-none z-10">
                                    {[
                                        { offsetRatio: 0.3, type: 'water', icon: Droplets, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/50', label: 'Aid 1' },
                                        { offsetRatio: 0.7, type: 'food', icon: Zap, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/50', label: 'Aid 2 (Food)' },
                                    ].map((cp, i) => {
                                        // 1. Find the nearest point in our elevation array that matches this distance ratio
                                        const targetDist = distNum * cp.offsetRatio;
                                        // Array is sorted by distance, find closest
                                        let closestPt = elevationData[0];
                                        let minDiff = Infinity;
                                        for(let pt of elevationData) {
                                            const diff = Math.abs(pt.distance - targetDist);
                                            if (diff < minDiff) {
                                                minDiff = diff;
                                                closestPt = pt;
                                            }
                                        }
                                        
                                        // 2. The AreaChart fills the parent container. `scaledElevation` is 0-100.
                                        // We map the scale 0-100 to CSS `bottom: X%`.
                                        // However, AreaChart scales domain=['dataMin - 100', 'dataMax + 100'].
                                        // For a slick visual approximation, we map `scaledElevation` (0 to 100) to roughly 10% to 90%
                                        // height so it visually hovers right above the line.
                                        const heightPercent = 10 + (closestPt.scaledElevation * 0.80);

                                        return (
                                            <div 
                                                key={i}
                                                className="absolute flex flex-col items-center group/point pointer-events-auto cursor-help"
                                                style={{ 
                                                    left: `${cp.offsetRatio * 100}%`, 
                                                    bottom: `${heightPercent}%`,
                                                    transform: 'translateX(-50%) translate-y-1/2' // Center the dot, push half up over line
                                                }}
                                            >
                                                <div className={`relative z-10 w-6 h-6 rounded-full shadow-sm border border-white dark:border-gray-700 flex items-center justify-center transform transition-transform group-hover/point:scale-125 ${cp.color}`}>
                                                    <cp.icon size={12} />
                                                </div>
                                                <div className="absolute bottom-full mb-1 bg-gray-900 dark:bg-black text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover/point:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                                    <span className="font-bold block">{cp.label}</span>
                                                    {Math.round(targetDist)}km ({closestPt.elevation}m)
                                                </div>
                                                {/* Drop line from marker straight down to axis */}
                                                <div className="absolute top-6 left-1/2 -ml-[0.5px] w-[1px] h-[1000px] border-l border-dashed border-gray-400 dark:border-gray-600 opacity-50 pointer-events-none"></div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                             {/* Decorative Line */}
                             <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10 z-0"></div>
                        </div>
                        {/* Legend */}
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-400 dark:text-gray-500 px-1">
                            <span>0km</span>
                            <span className="font-medium text-gray-500 dark:text-gray-400">
                                {gpxLoading ? 'Cargando...' : (race.gpxUrl ? (metadata?.name || t('race.detail.profileLegend')) : 'Simulación de recorrido')}
                            </span>
                            <span>{displayRace.distanceLabel || displayRace.distance}</span>
                        </div>
                        {!race.gpxUrl && (
                          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 text-center">
                            ⚠ Recorrido demo. GPX oficial pendiente de añadir.
                          </p>
                        )}
                    </>
                ) : (
                    <RouteMap location={displayRace.location} distance={displayRace.distance} />
                )}
            </div>

            {/* Mandatory Gear */}
            {/* Mandatory Gear (Interactive Checklist) */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Shield size={20} />
                        {t('race.detail.mandatoryGear')}
                    </h3>
                    <span className="text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                        {completedGearCount}/{MANDATORY_GEAR.length}
                    </span>
                </div>
                
                {/* Progress Bar */}
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full mb-4 overflow-hidden">
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
                                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                                        : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30'
                                }`}
                            >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isChecked ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600'
                                }`}>
                                    <CheckCircle size={14} className={isChecked ? 'opacity-100' : 'opacity-0'} />
                                </div>
                                <span className={`font-medium transition-colors ${isChecked ? 'text-green-800 dark:text-green-400 line-through opacity-70' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {t(item.key)}
                                </span>
                            </li>
                        );
                    })}
                </ul>
                
                {gearProgress === 100 && (
                    <div className="mt-4 p-3 bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold text-center rounded-xl animate-bounce-subtle">
                        {t('race.detail.gear.allPacked')}
                    </div>
                )}
            </div>
            
            {/* Similar Races */}
            <div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('race.detail.similar')}</h3>
                 <div className="flex gap-4 overflow-x-auto pb-4 snap-x ml-[-1.5rem] px-6 w-[calc(100%+3rem)] md:w-full md:ml-0 md:px-0">
                    {similarRaces.slice(0, 3).map(r => (
                        <Link key={r.id} to={`/carreras/${r.slug}`} className="min-w-[280px] snap-center block">
                             <GlassCard className="p-0 overflow-hidden bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 transition-colors h-full">
                                <div className="h-32 relative">
                                    <img src={r.image} className="w-full h-full object-cover" alt={r.name} />
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute bottom-3 left-3 text-white font-bold">{r.name}</div>
                                </div>
                                <div className="p-3 flex justify-between items-center">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1"><Calendar size={12}/> {r.dateLabel || r.date}</div>
                                        <div className="flex items-center gap-1 mt-1"><Mountain size={12}/> {r.elevationLabel || r.elevation || 'N/D'}</div>
                                    </div>
                                    <ArrowRight size={16} className="text-primary" />
                                </div>
                             </GlassCard>
                        </Link>
                    ))}
                 </div>
            </div>
            
            {/* Description */}
            <div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('race.detail.about')}</h3>
                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {race.description || 'Información pendiente de completar.'}
                 </p>
            </div>

            {/* Gear Block */}
            <AffiliateGearBlock />

            {/* Organizer CTA */}
            <BusinessCTA type="race" name={race.name} />
           </>
        ) : (
            <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl flex gap-3 text-blue-900 dark:text-blue-100">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg h-fit">
                        <Calculator size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-bold mb-1 flex items-center gap-2">
                            {t('race.strategy.recommends')}
                            {strategy?.isPersonalized && (
                                <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                    {t('race.strategy.personalized')}
                                </span>
                            )}
                        </h4>
                        <p className="text-sm opacity-80">{t('race.strategy.explanation')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Water */}
                    <GlassCard className="bg-white dark:bg-gray-900 border-blue-100 dark:border-blue-900/30 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                            <Droplets size={24} />
                        </div>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{strategy?.water}L</span>
                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mt-1">{t('race.strategy.water')}</span>
                    </GlassCard>

                    {/* Carbs */}
                    <GlassCard className="bg-white dark:bg-gray-900 border-yellow-100 dark:border-yellow-900/30 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-3">
                            <Zap size={24} />
                        </div>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{strategy?.carbs}g</span>
                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mt-1">{t('race.strategy.carbs')}</span>
                    </GlassCard>

                    {/* Time */}
                    <GlassCard className="bg-white dark:bg-gray-900 border-green-100 dark:border-green-900/30 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-3">
                            <Clock size={24} />
                        </div>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{strategy?.time}</span>
                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mt-1">{t('race.strategy.time')}</span>
                    </GlassCard>
                </div>
            </div>
        )}

      </div>


      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 z-[110] flex gap-3 items-center md:pl-72 transition-colors duration-300">
        <div className="hidden md:block flex-1">
            {race.priceFrom && !race.demo && (
              <p className="font-bold text-lg text-primary">Desde {race.priceFrom} €</p>
            )}
            {race.demo && (
              <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">⚠ Datos demo</p>
            )}
        </div>
        <Button variant="outline" className="flex-1 md:flex-none border-gray-300 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800" onClick={downloadIcsFile}>
            <Calendar size={18} className="mr-2" />
            {t('race.detail.addToCalendar')}
        </Button>
        {race.registrationUrl ? (
          <a
            href={race.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('click_inscribirse', { raceId: race.id, raceName: race.name })}
            className="flex-[2] md:flex-none md:w-48 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-white font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-colors"
          >
            <ExternalLink size={16} />
            Inscribirse
          </a>
        ) : (
          <Button className="flex-[2] md:flex-none md:w-48 shadow-xl shadow-primary/20" disabled={race.demo}>
            {race.demo ? 'Inscripción pendiente' : t('race.detail.registration')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RaceDetail;
