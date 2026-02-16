import React, { useState, useRef } from 'react';
import { MapPin, Navigation, Phone, Star } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import ShopDetail from '../components/ShopDetail';
import { useLanguage } from '../context/LanguageContext';

const SHOPS = [
  {
    id: 1,
    name: 'Summit Gear Co.',
    rating: 4.8,
    reviews: 124,
    address: '123 Trailhead Blvd, Boulder, CO',
    distance: '0.8 km',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=400',
    tags: ['Shoes', 'Apparel', 'Nutrition']
  },
  {
    id: 2,
    name: 'Alpine Outfitters',
    rating: 4.9,
    reviews: 89,
    address: '456 Mountain View Rd, Denver, CO',
    distance: '2.4 km',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400',
    tags: ['Climbing', 'Camping', 'Rentals']
  },
  {
    id: 3,
    name: 'The Running Hub',
    rating: 4.7,
    reviews: 215,
    address: '789 Runner Way, Golden, CO',
    distance: '5.1 km',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400',
    tags: ['Shoes', 'Coaching', 'Events']
  },
   {
    id: 4,
    name: 'Peak Performance',
    rating: 4.6,
    reviews: 67,
    address: '101 Summit St, Frisco, CO',
    distance: '12 km',
    image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&q=80&w=400',
    tags: ['Recovery', 'Gear', 'Service']
  },
];

const Shops = () => {
  const { t } = useLanguage();
  const [selectedShop, setSelectedShop] = useState(null);
  const listRef = useRef(null);
  const itemRefs = useRef({});

  const scrollToShop = (id) => {
    const element = itemRefs.current[id];
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Optional: Highlight effect could be added here
        setSelectedShop(SHOPS.find(s => s.id === id));
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen md:h-[calc(100vh-2rem)] overflow-hidden relative">
      
      {/* List Section */}
      <div ref={listRef} className="w-full md:w-3/5 h-full md:h-full overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6 bg-gray-50/50 dark:bg-gray-950/50">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{t('shops.title')}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{t('shops.subtitle')}</p>
        </div>

        <div className="space-y-4">
            {SHOPS.map((shop) => (
                <div 
                    key={shop.id} 
                    ref={el => itemRefs.current[shop.id] = el}
                    onClick={() => setSelectedShop(shop)}
                    className={`transition-all duration-300 cursor-pointer rounded-2xl border ${
                        selectedShop?.id === shop.id 
                            ? 'ring-2 ring-primary border-transparent transform scale-[1.02]' 
                            : 'border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                >
                <GlassCard className="bg-white dark:bg-gray-900 p-4 flex gap-4 shadow-sm hover:shadow-md h-full border-gray-100 dark:border-gray-800">
                    <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-xl overflow-hidden">
                        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{shop.name}</h3>
                                <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-0.5 rounded-full">{shop.distance}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                <span className="font-medium text-gray-900 dark:text-white">{shop.rating}</span>
                                <span>({shop.reviews})</span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{shop.address}</p>
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {shop.tags.map(tag => (
                                    <span key={tag} className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 uppercase font-semibold tracking-wider">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center ml-2 border-l border-gray-100 dark:border-gray-800 pl-4">
                        <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                            <Navigation size={20} />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <Phone size={20} />
                        </button>
                    </div>
                </GlassCard>
                </div>
            ))}
        </div>
      </div>

      {/* Map Section - Hidden on mobile */}
      <div className="hidden md:block w-full md:w-2/5 h-full bg-gray-200 relative">
        <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
            alt="Map" 
            className="w-full h-full object-cover filter grayscale opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent md:hidden" />
        
        {/* Interactive Pins */}
        <button 
            onClick={() => scrollToShop(1)}
            className="absolute top-1/4 left-1/3 p-2 bg-primary text-white rounded-full shadow-xl shadow-primary/40 hover:scale-110 transition-transform animate-bounce"
        >
            <MapPin size={24} fill="currentColor" />
        </button>
        
        <button 
            onClick={() => scrollToShop(2)}
            className="absolute top-1/2 right-1/4 p-2 bg-white text-gray-500 rounded-full shadow-lg border border-gray-200 hover:text-primary hover:scale-110 transition-all"
        >
            <MapPin size={24} fill={selectedShop?.id === 2 ? "currentColor" : "none"} />
        </button>

        <button 
            onClick={() => scrollToShop(3)}
            className="absolute bottom-1/3 left-1/4 p-2 bg-white text-gray-500 rounded-full shadow-lg border border-gray-200 hover:text-primary hover:scale-110 transition-all"
        >
            <MapPin size={24} fill={selectedShop?.id === 3 ? "currentColor" : "none"} />
        </button>

        <Button className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden shadow-xl z-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
            View Expanded Map
        </Button>
      </div>

      <ShopDetail shop={selectedShop} onClose={() => setSelectedShop(null)} />
    </div>
  );
};

export default Shops;
