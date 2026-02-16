import React from 'react';
import { Calendar, Users, MapPin, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  
  const menuItems = [
    { id: 'calendar', label: t('nav.races'), icon: Calendar },
    { id: 'clubs', label: t('nav.clubs'), icon: Users },
    { id: 'shops', label: t('nav.shops'), icon: MapPin },
    { id: 'profile', label: t('nav.profile'), icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl z-50 h-16 flex items-center justify-around px-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative ${
              isActive ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <div
              className={`absolute top-0 w-8 h-1 bg-primary rounded-b-lg transition-all duration-300 ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}
            />
            <Icon
              size={24}
              className={`mb-1 transition-transform duration-300 ${isActive ? '-translate-y-1' : ''}`}
            />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
