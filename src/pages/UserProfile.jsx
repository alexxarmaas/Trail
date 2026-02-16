import React, { useState } from 'react';
import { Settings, Share2, Award, Activity, Calendar, Mountain, Clock, Link as LinkIcon, Smartphone, Zap, Trash2, Globe, AlertTriangle, Crown } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

const UPCOMING_RACES = [
  { name: 'Ultra Pirineu', date: 'Oct 2, 2026', distance: '100km' },
  { name: 'Training Camp', date: 'Nov 15, 2026', distance: '3 days' },
];

const PAST_RESULTS = [
  { name: 'UTMB', year: '2025', time: '26:45:12', pos: '142', distance: '171km', distVal: 171, elevation: '+10000m', elevVal: 10000 },
  { name: 'Zegama', year: '2025', time: '04:12:30', pos: '89', distance: '42km', distVal: 42, elevation: '+2736m', elevVal: 2736 },
  { name: 'Lavaredo', year: '2024', time: '14:20:00', pos: '45', distance: '120km', distVal: 120, elevation: '+5800m', elevVal: 5800 },
];

const INITIAL_GEAR = [
    { id: 1, model: 'Hoka Speedgoat 5', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200', current: 450, max: 600 },
    { id: 2, model: 'Salomon S/Lab Genesis', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=200', current: 120, max: 500 },
    { id: 3, model: 'Norda 001', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=200', current: 750, max: 700 },
];

const UserProfile = () => {
    const { t, language, toggleLanguage } = useLanguage();
    const { userProfile, updateProfile } = useUser();
    const [activeTab, setActiveTab] = useState('upcoming');
    const [gear, setGear] = useState(INITIAL_GEAR);
    const [badges, setBadges] = useState([
        { id: 1, key: 'badge.earlyRiser', icon: Clock, unlocked: true, color: 'text-orange-500' },
        { id: 2, key: 'badge.verticalBeast', icon: Mountain, unlocked: true, color: 'text-purple-500' },
        { id: 3, key: 'badge.marathoner', icon: Activity, unlocked: true, color: 'text-blue-500' },
        { id: 4, key: 'badge.dataNerd', icon: Zap, unlocked: false, color: 'text-yellow-500' },
    ]);
    const [isConnected, setIsConnected] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    
    // Safety
    const [isSOSCalls, setIsSOSCalls] = useState(false);

    // Calculate Totals based on PAST_RESULTS (and potentially simulated extra history)
    // Base values + existing results
    const baseDistance = 2117; 
    const baseElevation = 66000;
    
    const totalDistVal = Math.round(baseDistance + PAST_RESULTS.reduce((acc, curr) => acc + curr.distVal, 0));
    const totalElevVal = Math.round(baseElevation + PAST_RESULTS.reduce((acc, curr) => acc + curr.elevVal, 0));

    const STATS = [
      { label: t('profile.stats.itra'), value: '742', icon: Award, color: 'text-yellow-500', bg: 'bg-yellow-100' },
      { label: t('profile.stats.distance'), value: `${totalDistVal.toLocaleString()} km`, icon: Activity, color: 'text-green-600', bg: 'bg-green-100' },
      { label: t('profile.stats.elevation'), value: `+${totalElevVal.toLocaleString()}m`, icon: Mountain, color: 'text-orange-600', bg: 'bg-orange-100' },
      { label: t('profile.stats.hours'), value: '320h', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' },
    ];

    const handleConnect = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsConnected(true);
            setIsSyncing(false);
            // Unlock Data Nerd badge
            setBadges(prev => prev.map(b => b.key === 'badge.dataNerd' ? { ...b, unlocked: true } : b));
        }, 2000);
    };

    const handleRetire = (id) => {
        setGear(prev => prev.filter(g => g.id !== id));
    };

    const getBarColor = (current, max) => {
        const percentage = (current / max) * 100;
        if (percentage > 80) return 'bg-red-500';
        if (percentage > 50) return 'bg-yellow-500';
        return 'bg-green-500';
    };

  return (
    <div className="min-h-screen pb-32 relative">
        {/* SOS Button (Sticky) */}
        <button
            onClick={() => setIsSOSCalls(!isSOSCalls)}
            className={`fixed bottom-24 right-4 z-50 md:bottom-8 md:right-8 transition-all duration-300 shadow-2xl ${
                isSOSCalls 
                    ? 'bg-red-600 border-4 border-red-200 w-auto px-6 animate-pulse' 
                    : 'bg-red-500 hover:bg-red-600 w-14 hover:scale-110'
            } h-14 rounded-full flex items-center justify-center text-white font-bold tracking-wider`}
        >
            {isSOSCalls ? (
                <span className="flex items-center gap-2">
                    <AlertTriangle size={20} className="animate-bounce" />
                    {t('safety.sending')}
                </span>
            ) : (
                <span className="text-sm">{t('safety.sos')}</span>
            )}
        </button>

      {/* Hero / Parallax Header */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10" />
        <img 
            src="https://images.unsplash.com/photo-1552674605-5d28c4e1902c?auto=format&fit=crop&q=80&w=1200" 
            alt="Cover" 
            className="w-full h-full object-cover object-center"
        />
        <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button 
                onClick={toggleLanguage}
                className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors flex items-center gap-1 font-bold"
                aria-label={`Switch to ${language === 'es' ? 'English' : 'Spanish'}`}
            >
                <Globe size={20} />
                <span className="text-sm uppercase">{language}</span>
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                <Share2 size={20} />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                <Settings size={20} />
            </button>
        </div>
      </div>

      {/* Profile Info Overlay */}
      <div className="px-6 md:px-8 -mt-20 relative z-20 mx-auto max-w-sm md:max-w-4xl">
        <div className="flex flex-col md:flex-row items-end md:items-end gap-6 mb-8">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-200 relative">
                <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" 
                    alt="User" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 text-black md:text-gray-900 md:mb-2 md:pt-20">
                <div className="md:text-white mb-2 md:mb-0">
                     <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-bold text-black">Alex Mountain</h1>
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
                            <Crown size={10} fill="currentColor" />
                            {t('pro.badge')}
                        </span>
                     </div>
                     <p className="opacity-90 flex items-center gap-2">
                        <span>Elite Trail Runner</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <span>Chamonix, France</span>
                     </p>
                </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                <button className="flex-1 md:flex-none px-6 py-2 bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/30 hover:bg-green-800 transition-colors">
                    {t('profile.follow')}
                </button>
                <button className="flex-1 md:flex-none px-6 py-2 bg-white text-gray-900 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                    {t('profile.message')}
                </button>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {STATS.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                    <GlassCard key={idx} className="p-4 flex flex-col items-center justify-center text-center bg-white/80 border-gray-100">
                        <div className={`p-2 rounded-full mb-2 ${stat.bg} ${stat.color}`}>
                            <Icon size={20} />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</span>
                    </GlassCard>
                );
            })}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-6">
                {/* Physical Metrics */}
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Activity size={20} /> {t('profile.metrics')}
                    </h3>
                    <GlassCard className="p-4 bg-white border-gray-100 grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{t('profile.weight')} (kg)</label>
                            <div className="flex items-baseline gap-1">
                                <input 
                                    type="number" 
                                    value={userProfile.weight} 
                                    onChange={(e) => updateProfile({ weight: parseInt(e.target.value) || 0 })}
                                    className="w-full text-2xl font-bold bg-transparent border-b border-transparent hover:border-gray-200 focus:border-primary outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                             <label className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{t('profile.height')} (cm)</label>
                             <div className="flex items-baseline gap-1">
                                <input 
                                    type="number" 
                                    value={userProfile.height} 
                                    onChange={(e) => updateProfile({ height: parseInt(e.target.value) || 0 })}
                                    className="w-full text-2xl font-bold bg-transparent border-b border-transparent hover:border-gray-200 focus:border-primary outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Connected Apps */}
                <div className="space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <LinkIcon size={20} /> {t('profile.connectedApps')}
                </h3>
                <GlassCard className="p-4 bg-white border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <div className="bg-[#FC4C02] p-2 rounded-lg text-white">
                            <Smartphone size={20} />
                         </div>
                         <div>
                             <p className="font-bold text-gray-900">Strava</p>
                             <p className="text-xs text-gray-500">{isConnected ? t('profile.connected') : t('profile.connect')}</p>
                         </div>
                    </div>
                    {isConnected ? (
                        <span className="text-green-600 font-medium text-sm">Active</span>
                    ) : (
                        <button 
                            onClick={handleConnect}
                            disabled={isSyncing}
                            className="px-4 py-2 bg-[#FC4C02] text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                        >
                            {isSyncing ? t('profile.syncing') : t('profile.connect')}
                        </button>
                    )}
                </GlassCard>
            </div>
        </div>

            {/* Trophy Case */}
            <div className="md:col-span-2 space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Award size={20} /> {t('profile.trophyCase')}
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {badges.map((badge) => {
                        const Icon = badge.icon;
                        return (
                            <GlassCard key={badge.id} className={`min-w-[100px] p-4 flex flex-col items-center justify-center gap-2 transition-all ${badge.unlocked ? 'bg-white border-gray-100' : 'bg-gray-100/50 border-transparent opacity-60 grayscale'}`}>
                                <div className={`p-2 rounded-full ${badge.unlocked ? 'bg-gray-50' : 'bg-gray-200'}`}>
                                    <Icon size={24} className={badge.unlocked ? badge.color : 'text-gray-400'} />
                                </div>
                                <span className="text-xs font-medium text-center leading-tight">{t(badge.key)}</span>
                            </GlassCard>
                        )
                    })}
                </div>
            </div>
        </div>

        {/* Gear Locker */}
        <div className="mb-8">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                <Settings size={20} /> {t('profile.gear')}
            </h3>
            <div className="flex gap-4 overflow-x-auto snap-x pb-4 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                {gear.map((item) => {
                    const percentage = Math.min((item.current / item.max) * 100, 100);
                    const isRetired = percentage >= 100;
                    
                    return (
                        <GlassCard key={item.id} className="min-w-[280px] snap-center p-0 overflow-hidden bg-white border-gray-100 group">
                            <div className="h-32 relative">
                                <img src={item.image} alt={item.model} className="w-full h-full object-cover" />
                                {isRetired && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <button 
                                            onClick={() => handleRetire(item.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium flex items-center gap-2 hover:bg-red-600 transition-colors"
                                        >
                                            <Trash2 size={16} /> {t('profile.retire')}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-gray-900 mb-1">{item.model}</h4>
                                <div className="flex justify-between text-xs text-gray-500 mb-2">
                                    <span>{item.current} km</span>
                                    <span>{item.max} km</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-500 ${getBarColor(item.current, item.max)}`} 
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>
        </div>

        {/* Content Tabs */}
        <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-8">
                {['upcoming', 'results', 'photos'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-sm font-medium capitalize transition-colors relative ${
                            activeTab === tab 
                                ? 'text-primary' 
                                : 'text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        {t(`profile.tab.${tab}`)}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
            {activeTab === 'upcoming' && (
                <div className="space-y-4">
                     {UPCOMING_RACES.map((race, idx) => (
                        <GlassCard key={idx} className="flex items-center justify-between p-4 bg-white border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{race.name}</h3>
                                    <p className="text-sm text-gray-500">{race.date}</p>
                                </div>
                            </div>
                            <Badge variant="neutral">{race.distance}</Badge>
                        </GlassCard>
                    ))}
                </div>
            )}

            {activeTab === 'results' && (
                 <div className="space-y-4">
                    {PAST_RESULTS.map((res, idx) => (
                        <GlassCard key={idx} className="flex items-center justify-between p-4 bg-white border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{res.name} <span className="text-gray-400 font-normal">'{res.year.slice(2)}</span></h3>
                                    <div className="flex gap-2 text-xs text-gray-500 mt-1">
                                        <span className="flex items-center gap-1"><Mountain size={10} /> {res.elevation}</span>
                                        <span className="flex items-center gap-1"><Activity size={10} /> {res.distance}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="font-mono text-sm font-bold text-gray-900 block">{res.time}</span>
                                <span className="text-xs text-gray-500">Pos: {res.pos}</span>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}

            {activeTab === 'photos' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1,2,3,4].map((i) => (
                        <div key={i} className="aspect-square rounded-xl bg-gray-200 overflow-hidden">
                            <img 
                                src={`https://source.unsplash.com/random/400x400?running,trail,${i}`} 
                                alt="Gallery" 
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
