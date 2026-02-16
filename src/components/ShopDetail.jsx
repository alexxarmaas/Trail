import React from 'react';
import { X, Navigation, Clock, Check, Phone, MapPin } from 'lucide-react';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

const ShopDetail = ({ shop, onClose }) => {
  const { t } = useLanguage();
  if (!shop) return null;

  return (
    <>
    {/* Backdrop */}
    <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" 
        onClick={onClose}
    />
    
    {/* Sheet/Drawer */}
    <div className={`
        fixed z-[100] bg-white flex flex-col
        
        // Mobile: Bottom Sheet
        bottom-0 left-0 right-0 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)]
        h-[85vh] transform transition-transform duration-300 ease-out
        
        // Desktop: Side Drawer
        md:top-0 md:right-0 md:bottom-0 md:left-auto md:w-96 md:h-full md:rounded-none md:shadow-2xl md:border-l md:border-gray-100
        
        animate-in slide-in-from-bottom w-full
    `}>
      {/* Handle for mobile */}
      <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-2 md:hidden shrink-0" />

      {/* Header Image */}
      <div className="h-48 w-full relative shrink-0">
        <img 
            src={shop.image} 
            alt={shop.name} 
            className="w-full h-full object-cover"
        />
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-colors"
        >
            <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 overflow-y-auto flex-1 pb-12">
        {/* Title & Status */}
        <div>
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{shop.name}</h2>
                <div className="flex flex-col items-end">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        {t('shops.open')}
                    </span>
                </div>
            </div>
            <p className="text-gray-500 flex items-center gap-1 text-sm">
                <MapPin size={14} />
                {shop.address}
            </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
            <Button variant="primary" className="flex-1 flex items-center justify-center gap-2">
                <Navigation size={18} />
                {t('shops.directions')}
            </Button>
             <Button variant="secondary" className="flex-none text-gray-500">
                <Phone size={18} />
            </Button>
        </div>

        {/* Brands */}
        <div>
            <h3 className="font-bold text-gray-900 mb-3">{t('shops.brands')}</h3>
            <div className="flex flex-wrap gap-2">
                {['Salomon', 'Hoka', 'Garmin', 'Coros', 'The North Face', 'Black Diamond'].map(brand => (
                    <span key={brand} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg">
                        {brand}
                    </span>
                ))}
            </div>
        </div>

        {/* Info */}
         <div className="space-y-4">
             <h3 className="font-bold text-gray-900">{t('shops.storeInfo')}</h3>
            <div className="flex items-center gap-3 text-gray-600">
                <Clock size={18} className="text-gray-400" />
                <span className="text-sm">09:00 AM - 08:00 PM</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
                <Check size={18} className="text-gray-400" />
                <span className="text-sm">Expert Gait Analysis Available</span>
            </div>
         </div>

      </div>
    </div>
    </>
  );
};

export default ShopDetail;
