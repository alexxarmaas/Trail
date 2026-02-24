import React, { useState } from 'react';
import { Settings, Share2, Award, Activity, Calendar, Mountain, Clock, Link as LinkIcon, Smartphone, Zap, Trash2, Globe, AlertTriangle, Crown, Sun, Moon, Users, Store, User, Plus, Box, Heart, ArrowUpRight, ArrowDownRight, Tag, Shield, MoreVertical } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useRaces } from '../context/RacesContext';

const UPCOMING_RACES = [
  { name: 'Ultra Pirineu', date: 'Oct 2, 2026', distance: '100km', location: 'Bagà, Spain' },
  { name: 'Sierre-Zinal Training Run', date: 'Aug 1, 2026', distance: '31km', location: 'Valais, Switzerland' },
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
    const { theme, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('upcoming');
    const [adminTab, setAdminTab] = useState('members');
    const [shopTab, setShopTab] = useState('promos');
    const [gear, setGear] = useState(INITIAL_GEAR);
    const [badges, setBadges] = useState([
        { id: 1, key: 'badge.earlyRiser', icon: Clock, unlocked: true, color: 'text-orange-500' },
        { id: 2, key: 'badge.verticalBeast', icon: Mountain, unlocked: true, color: 'text-purple-500' },
        { id: 3, key: 'badge.marathoner', icon: Activity, unlocked: true, color: 'text-blue-500' },
        { id: 4, key: 'badge.dataNerd', icon: Zap, unlocked: false, color: 'text-yellow-500' },
    ]);

    // Shop Mock State - Promos
    const [promos, setPromos] = useState([
        { id: 1, name: 'Summer Gear 20% Off', days: 5, usage: 142, iconType: 'Tag', color: 'orange' },
        { id: 2, name: 'Free Gaiters with running shoes', days: 12, usage: 89, iconType: 'Award', color: 'blue' }
    ]);
    const [newPromoName, setNewPromoName] = useState('');
    const [newPromoDiscount, setNewPromoDiscount] = useState('');
    const [newPromoDays, setNewPromoDays] = useState('');

    const handleCreatePromo = () => {
        if (!newPromoName.trim() || !newPromoDays) return;
        const newPromo = {
            id: Date.now(),
            name: newPromoName,
            days: parseInt(newPromoDays, 10),
            usage: 0,
            iconType: 'Zap',
            color: 'green'
        };
        setPromos([...promos, newPromo]);
        setNewPromoName('');
        setNewPromoDiscount('');
        setNewPromoDays('');
    };

    const handleDeletePromo = (id) => {
        setPromos(promos.filter(promo => promo.id !== id));
    };

    // Shop Mock State - Inventory
    const [inventory, setInventory] = useState([
        { id: 1, name: t('shop.inventory.shoes') || 'Shoes', count: 124, status: 'inStock', iconType: 'Activity', trend: 'up' },
        { id: 2, name: t('shop.inventory.jackets') || 'Jackets', count: 18, status: 'lowStock', iconType: 'Mountain', trend: 'down' },
        { id: 3, name: t('shop.inventory.nutrition') || 'Nutrition', count: 0, status: 'outOfStock', iconType: 'Heart', trend: 'stable' },
        { id: 4, name: t('shop.inventory.hydration') || 'Hydration', count: 45, status: 'inStock', iconType: 'Box', trend: 'up' }
    ]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryStock, setNewCategoryStock] = useState('');

    const handleUpdateStock = (id, change) => {
        setInventory(inventory.map(item => {
            if (item.id === id) {
                const newCount = Math.max(0, item.count + change);
                let newStatus = 'inStock';
                if (newCount === 0) newStatus = 'outOfStock';
                else if (newCount < 20) newStatus = 'lowStock';
                return { ...item, count: newCount, status: newStatus };
            }
            return item;
        }));
    };

    const handleAddCategory = () => {
        if (!newCategoryName.trim() || newCategoryStock === '') return;
        const count = parseInt(newCategoryStock, 10);
        let status = 'inStock';
        if (count === 0) status = 'outOfStock';
        else if (count < 20) status = 'lowStock';

        const newItem = {
            id: Date.now(),
            name: newCategoryName,
            count: count,
            status: status,
            iconType: 'Box',
            trend: 'stable'
        };
        setInventory([...inventory, newItem]);
        setNewCategoryName('');
        setNewCategoryStock('');
    };

    // Interactive Club State
    const [activeEvents, setActiveEvents] = useState(UPCOMING_RACES);
    const [newEvent, setNewEvent] = useState({ 
        name: '', date: '', distance: '', elevation: '', location: '', image: '', type: 'ultra'
    });
    const { publishRace } = useRaces();

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
            src="https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?cs=srgb&dl=cold-snow-dawn-618833.jpg&fm=jpg" 
            alt="Cover" 
            className="w-full h-full object-cover object-center"
        />
        <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button 
                onClick={toggleTheme}
                className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors flex items-center gap-1 font-bold"
                aria-label="Toggle Theme"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
                onClick={toggleLanguage}
                className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors flex items-center gap-1 font-bold"
                aria-label={`Switch to ${language === 'es' ? 'English' : 'Spanish'}`}
            >
                <Globe size={20} />
                <span className="text-sm uppercase">{language}</span>
            </button>
            <div className="relative group flex items-center">
                <select
                    value={userProfile.role || 'runner'}
                    onChange={(e) => updateProfile({ role: e.target.value })}
                    className="appearance-none py-2 pl-8 pr-4 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors font-bold text-sm outline-none cursor-pointer border-none"
                    title={t('profile.switcher.title')}
                >
                    <option value="runner" className="text-gray-900">{t('profile.role.runner')}</option>
                    <option value="club_admin" className="text-gray-900">{t('profile.role.club_admin')}</option>
                    <option value="shop_owner" className="text-gray-900">{t('profile.role.shop_owner')}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                    <User size={14} />
                </div>
            </div>
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
        {(!userProfile.role || userProfile.role === 'runner') && (
        <>
        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 mb-8 mt-12 lg:mt-0 text-center lg:text-left">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-200 relative shrink-0 -mt-20 lg:-mt-0">
                <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" 
                    alt="User" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 text-gray-900 dark:text-white lg:mb-2 lg:pt-20 w-full">
                <div className="mb-2 lg:mb-0 flex flex-col items-center lg:items-start w-full">
                     <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-1 w-full">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Alex Mountain</h1>
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
                            <Crown size={10} fill="currentColor" />
                            {t('pro.badge')}
                        </span>
                     </div>
                     <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
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
                <button className="flex-1 md:flex-none px-6 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    {t('profile.message')}
                </button>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                    <GlassCard key={idx} className="p-4 flex flex-col items-center justify-center text-center bg-white/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800">
                        <div className={`p-2 rounded-full mb-2 ${stat.bg} ${stat.color} dark:bg-opacity-20`}>
                            <Icon size={20} />
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.label}</span>
                    </GlassCard>
                );
            })}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-6">
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Activity size={20} /> {t('profile.metrics')}
                    </h3>
                    <GlassCard className="p-4 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{t('profile.weight')} (kg)</label>
                            <div className="flex items-baseline gap-1">
                                <input 
                                    type="number" 
                                    value={userProfile.weight} 
                                    onChange={(e) => updateProfile({ weight: parseInt(e.target.value) || 0 })}
                                    className="w-full text-2xl font-bold bg-transparent border-b border-transparent hover:border-gray-200 focus:border-primary outline-none transition-colors text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                        <div>
                             <label className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{t('profile.height')} (cm)</label>
                             <div className="flex items-baseline gap-1">
                                <input 
                                    type="number" 
                                    value={userProfile.height} 
                                    onChange={(e) => updateProfile({ height: parseInt(e.target.value) || 0 })}
                                    className="w-full text-2xl font-bold bg-transparent border-b border-transparent hover:border-gray-200 focus:border-primary outline-none transition-colors text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Connected Apps */}
                <div className="space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <LinkIcon size={20} /> {t('profile.connectedApps')}
                </h3>
                <GlassCard className="p-4 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <div className="bg-[#FC4C02] p-2 rounded-lg text-white">
                            <Smartphone size={20} />
                         </div>
                         <div>
                             <p className="font-bold text-gray-900 dark:text-white">Strava</p>
                             <p className="text-xs text-gray-500 dark:text-gray-400">{isConnected ? t('profile.connected') : t('profile.connect')}</p>
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
            <div className="lg:col-span-2 space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Award size={20} /> {t('profile.trophyCase')}
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {badges.map((badge) => {
                        const Icon = badge.icon;
                        return (
                            <GlassCard key={badge.id} className={`min-w-[100px] p-4 flex flex-col items-center justify-center gap-2 transition-all ${badge.unlocked ? 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800' : 'bg-gray-100/50 dark:bg-gray-800/50 border-transparent opacity-60 grayscale'}`}>
                                <div className={`p-2 rounded-full ${badge.unlocked ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                    <Icon size={24} className={badge.unlocked ? badge.color : 'text-gray-400'} />
                                </div>
                                <span className="text-xs font-medium text-center leading-tight text-gray-600 dark:text-gray-300">{t(badge.key)}</span>
                            </GlassCard>
                        )
                    })}
                </div>
            </div>
        </div>

        {/* Gear Locker */}
        <div className="mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <Settings size={20} /> {t('profile.gear')}
            </h3>
            <div className="flex gap-4 overflow-x-auto snap-x pb-4 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                {gear.map((item) => {
                    const percentage = Math.min((item.current / item.max) * 100, 100);
                    const isRetired = percentage >= 100;
                    
                    return (
                        <GlassCard key={item.id} className="min-w-[280px] snap-center p-0 overflow-hidden bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 group">
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
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.model}</h4>
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                                    <span>{item.current} km</span>
                                    <span>{item.max} km</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
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
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
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
                        <GlassCard key={idx} className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{race.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{race.date}</p>
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
                        <GlassCard key={idx} className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{res.name} <span className="text-gray-400 font-normal">'{res.year.slice(2)}</span></h3>
                                    <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <span className="flex items-center gap-1"><Mountain size={10} /> {res.elevation}</span>
                                        <span className="flex items-center gap-1"><Activity size={10} /> {res.distance}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="font-mono text-sm font-bold text-gray-900 dark:text-white block">{res.time}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Pos: {res.pos}</span>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}

            {activeTab === 'photos' && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
        </>
        )}

        {userProfile.role === 'club_admin' && (
            <div className="space-y-8 pb-12">
                <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 mb-8 text-center lg:text-left">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-200 relative shrink-0 -mt-16 lg:mt-0">
                        <img 
                            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=200" 
                            alt="Club" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 text-gray-900 dark:text-white md:mb-2 md:pt-20 w-full">
                        <div className="mb-2 md:mb-0 flex flex-col items-center md:items-start w-full">
                             <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-1 w-full">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('admin.clubName')}</h1>
                                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
                                    <Users size={10} fill="currentColor" />
                                    {t('profile.role.club_admin')}
                                </span>
                             </div>
                             <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <span>{t('admin.manageClub')}</span>
                             </p>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                        <button 
                            onClick={() => setAdminTab('members')}
                            className="flex-1 md:flex-none px-6 py-2 bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/30 hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <Users size={18} /> <span className="hidden md:inline">{t('admin.manageMembers')}</span>
                        </button>
                        <button 
                            onClick={() => setAdminTab('events')}
                            className="flex-1 md:flex-none px-6 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Calendar size={18} /> <span className="hidden md:inline">{t('admin.createEvent')}</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: t('admin.members'), value: '245', icon: Users, color: 'text-blue-500', bg: 'bg-blue-100' },
                      { label: t('admin.events'), value: '12', icon: Calendar, color: 'text-green-600', bg: 'bg-green-100' },
                      { label: 'Avg Dist.', value: '18 km', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-100' },
                      { label: 'Avg Elev.', value: '+850m', icon: Mountain, color: 'text-purple-600', bg: 'bg-purple-100' },
                    ].map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <GlassCard key={idx} className="p-4 flex flex-col items-center justify-center text-center bg-white/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800">
                                <div className={`p-2 rounded-full mb-2 ${stat.bg} ${stat.color} dark:bg-opacity-20`}>
                                    <Icon size={20} />
                                </div>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.label}</span>
                            </GlassCard>
                        );
                    })}
                </div>

                {/* Club Admin Content Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-800 mb-6 mt-8">
                    <div className="flex gap-8">
                        {['members', 'events'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setAdminTab(tab)}
                                className={`pb-4 text-sm font-medium capitalize transition-colors relative ${
                                    adminTab === tab 
                                        ? 'text-primary' 
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                                }`}
                            >
                                {tab === 'members' ? t('admin.tabs.members') : t('admin.tabs.events')}
                                {adminTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {adminTab === 'members' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Users size={20} /> {t('admin.membersList.title')}
                            </h3>
                            <div className="relative w-full max-w-xs hidden sm:block">
                                <input type="text" placeholder="Search members..." className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-primary transition-colors" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {[
                                { name: 'Sarah Jenkins', role: 'admin.membersList.roleAdmin', icon: Shield, color: 'text-purple-500', bg: 'bg-purple-100', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
                                { name: 'David Chen', role: 'admin.membersList.roleCoach', icon: Award, color: 'text-blue-500', bg: 'bg-blue-100', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
                                { name: 'Elena Rodriguez', role: 'admin.membersList.roleRunner', icon: Activity, color: 'text-green-500', bg: 'bg-green-100', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100' },
                                { name: 'Marcus Johnson', role: 'admin.membersList.roleRunner', icon: Activity, color: 'text-green-500', bg: 'bg-green-100', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
                            ].map((member, idx) => {
                                const RoleIcon = member.icon;
                                return (
                                    <GlassCard key={idx} className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-4">
                                            <img src={member.img} alt={member.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 dark:border-gray-800" />
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{member.name}</h4>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <RoleIcon size={12} className={member.color} />
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">{t(member.role)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                                                <Settings size={16} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </GlassCard>
                                )
                            })}
                        </div>
                    </div>
                )}

                {adminTab === 'events' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                             <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Calendar size={20} /> {t('admin.upcomingEvents')}
                            </h3>
                            {activeEvents.map((race, idx) => (
                                <GlassCard key={idx} className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 group transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500">
                                            <Calendar size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">{race.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{race.date} • {race.location || 'Local Trail'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Badge variant="neutral">{race.distance || '20km'}</Badge>
                                        <Badge variant="success">Organized</Badge>
                                        <button 
                                          onClick={() => setActiveEvents(activeEvents.filter((_, i) => i !== idx))}
                                          className="p-1.5 ml-2 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 opacity-0 group-hover:opacity-100 transition-opacity" title="Cancel/Archive Event"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                    </div>
                                </GlassCard>
                            ))}
                            {activeEvents.length === 0 && (
                                <div className="text-center py-8 text-gray-400 dark:text-gray-600 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                                    <Calendar className="mx-auto mb-2 opacity-50" size={32} />
                                    <p>No active organized events.</p>
                                </div>
                            )}
                        </div>
                        
                        {/* Race Publishing Form */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Plus size={20} /> Publish a Race
                            </h3>
                            <GlassCard className="p-4 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 space-y-3">
                                <div>
                                    <label className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 block">Race Name *</label>
                                    <input type="text" value={newEvent.name} onChange={(e) => setNewEvent({...newEvent, name: e.target.value})} placeholder="My Community Race..." className="w-full bg-gray-50 dark:bg-gray-800 border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 rounded-lg px-3 py-2 text-sm outline-none transition-all text-gray-900 dark:text-white" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 block">Date *</label>
                                        <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-800 border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 rounded-lg px-3 py-2 text-sm outline-none transition-all text-gray-900 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 block">Type</label>
                                        <select value={newEvent.type} onChange={(e) => setNewEvent({...newEvent, type: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-800 border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 rounded-lg px-3 py-2 text-sm outline-none transition-all text-gray-900 dark:text-white">
                                            <option value="ultra">Ultra</option>
                                            <option value="marathon">Marathon</option>
                                            <option value="short">Short</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 block">Distance (km)</label>
                                        <input type="text" value={newEvent.distance} onChange={(e) => setNewEvent({...newEvent, distance: e.target.value})} placeholder="42" className="w-full bg-gray-50 dark:bg-gray-800 border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 rounded-lg px-3 py-2 text-sm outline-none transition-all text-gray-900 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 block">Elevation (m)</label>
                                        <input type="text" value={newEvent.elevation} onChange={(e) => setNewEvent({...newEvent, elevation: e.target.value})} placeholder="1800" className="w-full bg-gray-50 dark:bg-gray-800 border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 rounded-lg px-3 py-2 text-sm outline-none transition-all text-gray-900 dark:text-white" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 block">Location</label>
                                    <input type="text" value={newEvent.location} onChange={(e) => setNewEvent({...newEvent, location: e.target.value})} placeholder="Chamonix, France" className="w-full bg-gray-50 dark:bg-gray-800 border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 rounded-lg px-3 py-2 text-sm outline-none transition-all text-gray-900 dark:text-white" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 block">Cover Image URL <span className="font-normal opacity-60">(paste Unsplash link)</span></label>
                                    <input type="text" value={newEvent.image} onChange={(e) => setNewEvent({...newEvent, image: e.target.value})} placeholder="https://images.unsplash.com/..." className="w-full bg-gray-50 dark:bg-gray-800 border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 rounded-lg px-3 py-2 text-sm outline-none transition-all text-gray-900 dark:text-white" />
                                    {newEvent.image && (
                                        <div className="mt-2 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                            <img src={newEvent.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                                        </div>
                                    )}
                                </div>
                                <button 
                                  onClick={() => {
                                      if (newEvent.name && newEvent.date) {
                                          const published = publishRace({ ...newEvent, organizer: t('admin.clubName') });
                                          setActiveEvents([{ name: published.name, date: published.date, distance: published.distance, location: published.location, isNew: true }, ...activeEvents]);
                                          setNewEvent({ name: '', date: '', distance: '', elevation: '', location: '', image: '', type: 'ultra' });
                                      }
                                  }}
                                  disabled={!newEvent.name || !newEvent.date}
                                  className={`w-full py-2.5 text-white rounded-lg font-semibold text-sm transition-all mt-1 flex items-center justify-center gap-2 ${!newEvent.name || !newEvent.date ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-primary hover:bg-green-800 shadow-lg shadow-primary/30'}`}
                                >
                                    <Calendar size={15} />
                                    Publish to Race Calendar
                                </button>
                            </GlassCard>
                        </div>
                    </div>
                )}
            </div>
        )}

        {userProfile.role === 'shop_owner' && (
            <div className="space-y-8 pb-12">
                <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 mb-8 mt-12 lg:mt-0 text-center lg:text-left">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-200 relative shrink-0 -mt-20 lg:-mt-0">
                        <img 
                            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=200" 
                            alt="Shop" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 text-gray-900 dark:text-white md:mb-2 md:pt-20 w-full">
                        <div className="mb-2 md:mb-0 flex flex-col items-center md:items-start w-full">
                             <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-1 w-full">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('shop.name')}</h1>
                                <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
                                    <Store size={10} fill="currentColor" />
                                    {t('profile.role.shop_owner')}
                                </span>
                             </div>
                             <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <span>{t('shop.businessHub')}</span>
                             </p>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                        <button 
                            onClick={() => setShopTab('inventory')}
                            className="flex-1 md:flex-none px-6 py-2 bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/30 hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <Store size={18} /> <span className="hidden md:inline">{t('shop.manageInventory')}</span>
                        </button>
                        <button 
                            onClick={() => setShopTab('promos')}
                            className="flex-1 md:flex-none px-6 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Zap size={18} /> <span className="hidden md:inline">{t('shop.createPromo')}</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: t('shop.sales'), value: '1,240€', icon: Award, color: 'text-green-500', bg: 'bg-green-100' },
                      { label: t('shop.visits'), value: '342', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-100' },
                      { label: t('shop.promos'), value: '3', icon: Zap, color: 'text-orange-600', bg: 'bg-orange-100' },
                      { label: 'Rating', value: '4.8', icon: Crown, color: 'text-yellow-600', bg: 'bg-yellow-100' },
                    ].map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <GlassCard key={idx} className="p-4 flex flex-col items-center justify-center text-center bg-white/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800">
                                <div className={`p-2 rounded-full mb-2 ${stat.bg} ${stat.color} dark:bg-opacity-20`}>
                                    <Icon size={20} />
                                </div>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.label}</span>
                            </GlassCard>
                        );
                    })}
                </div>

                {/* Shop Owner Content Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-800 mb-6 mt-8">
                    <div className="flex gap-8">
                        {['promos', 'inventory'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setShopTab(tab)}
                                className={`pb-4 text-sm font-medium capitalize transition-colors relative ${
                                    shopTab === tab 
                                        ? 'text-primary' 
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                                }`}
                            >
                                {tab === 'promos' ? t('shop.promo.title') : t('shop.inventory.title')}
                                {shopTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {shopTab === 'promos' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Zap size={20} /> {t('shop.promo.active')}
                            </h3>
                            {promos.length === 0 ? (
                                <GlassCard className="p-8 text-center bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
                                    <p className="text-gray-500 dark:text-gray-400">No active promotions.</p>
                                </GlassCard>
                            ) : (
                                promos.map(promo => {
                                    const PromoIcon = promo.iconType === 'Tag' ? Tag : promo.iconType === 'Award' ? Award : Zap;
                                    const colorMap = {
                                        orange: 'text-orange-500 bg-orange-100 dark:bg-orange-900/20',
                                        blue: 'text-blue-500 bg-blue-100 dark:bg-blue-900/20',
                                        green: 'text-green-500 bg-green-100 dark:bg-green-900/20'
                                    };
                                    const iconClasses = colorMap[promo.color] || colorMap['green'];

                                    return (
                                        <GlassCard key={promo.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 gap-4 group">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 min-w-[3rem] rounded-lg flex items-center justify-center ${iconClasses}`}>
                                                    <PromoIcon size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white">{promo.name}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <Clock size={12} /> <span>{t('shop.promo.endsIn')} {promo.days} {t('shop.promo.days')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center sm:flex-col sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-0 border-gray-100 dark:border-gray-800 gap-2">
                                                <div className="text-sm font-bold text-gray-900 dark:text-white">{promo.usage} <span className="text-xs font-normal text-gray-500">{t('shop.promo.usage')}</span></div>
                                                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                                                    <Badge variant="warning">{t('shop.promo.active')}</Badge>
                                                    <button 
                                                        onClick={() => handleDeletePromo(promo.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                                                        title="Archive Promotion"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    );
                                })
                            )}
                        </div>
                        
                        {/* Create Promo Form Mock */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-4 lg:mt-0 lg:pt-0">
                                <Plus size={20} /> {t('shop.promo.create.title')}
                            </h3>
                            <GlassCard className="p-4 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 space-y-4">
                                <div>
                                    <label className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 block">{t('shop.promo.create.name')}</label>
                                    <input 
                                        type="text" 
                                        value={newPromoName}
                                        onChange={(e) => setNewPromoName(e.target.value)}
                                        placeholder="Winter Clearance..." 
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 rounded-lg px-3 py-2 text-sm outline-none transition-all text-gray-900 dark:text-white" 
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 block">{t('shop.promo.create.discount')}</label>
                                        <input 
                                            type="number" 
                                            value={newPromoDiscount}
                                            onChange={(e) => setNewPromoDiscount(e.target.value)}
                                            placeholder="15" 
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 rounded-lg px-3 py-2 text-sm outline-none transition-all text-gray-900 dark:text-white" 
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 block">{t('shop.promo.create.duration')}</label>
                                        <input 
                                            type="number" 
                                            value={newPromoDays}
                                            onChange={(e) => setNewPromoDays(e.target.value)}
                                            placeholder="7" 
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 rounded-lg px-3 py-2 text-sm outline-none transition-all text-gray-900 dark:text-white" 
                                        />
                                    </div>
                                </div>
                                <button 
                                    onClick={handleCreatePromo}
                                    disabled={!newPromoName.trim() || !newPromoDays}
                                    className="w-full py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Zap size={16} /> {t('shop.promo.create.btn')}
                                </button>
                            </GlassCard>
                        </div>
                    </div>
                )}

                {shopTab === 'inventory' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Box size={20} /> {t('shop.inventory.title')}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {inventory.map((item) => {
                                    const IconMap = { Activity, Mountain, Heart, Box };
                                    const Icon = IconMap[item.iconType] || Box;
                                    
                                    const getStatusColor = (status) => {
                                        if (status === 'inStock') return 'border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20';
                                        if (status === 'lowStock') return 'border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
                                        return 'border-red-500 text-red-600 bg-red-50 dark:bg-red-900/20';
                                    };
                                    const getStatusLabel = (status) => {
                                        if (status === 'inStock') return t('shop.inventory.inStock') || 'In Stock';
                                        if (status === 'lowStock') return t('shop.inventory.lowStock') || 'Low Stock';
                                        return t('shop.inventory.outOfStock') || 'Out of Stock';
                                    };
                                    
                                    return (
                                        <GlassCard key={item.id} className="p-4 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 relative overflow-hidden group">
                                            <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(item.status).split(' ')[0]}`} />
                                            <div className="pl-2">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400">
                                                        <Icon size={20} />
                                                    </div>
                                                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                                                        {getStatusLabel(item.status)}
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{item.name}</h4>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-end justify-between">
                                                        <span className="text-2xl font-black text-gray-900 dark:text-white">{item.count}</span>
                                                        {item.trend === 'up' && <ArrowUpRight size={16} className="text-green-500 mb-1" />}
                                                        {item.trend === 'down' && <ArrowDownRight size={16} className="text-red-500 mb-1" />}
                                                        {item.trend === 'stable' && <span className="text-gray-400 mb-1 text-xs font-bold">-</span>}
                                                    </div>
                                                    <div className="flex w-full items-center justify-between bg-gray-50 dark:bg-gray-800/50 rounded-lg p-1 mt-2">
                                                        <button 
                                                            onClick={() => handleUpdateStock(item.id, -1)}
                                                            className="px-3 py-1 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors"
                                                        >-</button>
                                                        <span className="text-xs font-medium text-gray-500">Edit Stock</span>
                                                        <button 
                                                            onClick={() => handleUpdateStock(item.id, 1)}
                                                            className="px-3 py-1 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors"
                                                        >+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Add Category Form Mock */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-4 md:mt-0 pt-0">
                                <Plus size={20} /> Add Category
                            </h3>
                            <GlassCard className="p-4 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 space-y-4">
                                <div>
                                    <label className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 block">Category Name</label>
                                    <input 
                                        type="text" 
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder="Headlamps..." 
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 rounded-lg px-3 py-2 text-sm outline-none transition-all text-gray-900 dark:text-white" 
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 block">Initial Stock</label>
                                    <input 
                                        type="number" 
                                        value={newCategoryStock}
                                        onChange={(e) => setNewCategoryStock(e.target.value)}
                                        placeholder="12" 
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 rounded-lg px-3 py-2 text-sm outline-none transition-all text-gray-900 dark:text-white" 
                                    />
                                </div>
                                <button 
                                    onClick={handleAddCategory}
                                    disabled={!newCategoryName.trim() || newCategoryStock === ''}
                                    className="w-full py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Box size={16} /> Add to System
                                </button>
                            </GlassCard>
                        </div>
                    </div>
                )}
            </div>
        )}

      </div>
    </div>
  );
};

export default UserProfile;
