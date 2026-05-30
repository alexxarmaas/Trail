import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Users, MapPin, User } from 'lucide-react';

const BottomNav = () => {
  const menuItems = [
    { to: '/carreras', label: 'Carreras', icon: Calendar },
    { to: '/clubes', label: 'Clubes', icon: Users },
    { to: '/tiendas', label: 'Tiendas', icon: MapPin },
    { to: '/perfil', label: 'Perfil', icon: User },
  ];

  return (
    <div className="nav:hidden fixed bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-xl rounded-2xl z-50 h-16 flex items-center justify-around px-2 transition-colors duration-300">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
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
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomNav;
