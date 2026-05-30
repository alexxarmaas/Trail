import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Users, MapPin, User, Mountain, Sun, Moon, Megaphone, PlusCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { to: '/carreras', label: 'Carreras', icon: Calendar },
    { to: '/clubes', label: 'Clubes', icon: Users },
    { to: '/tiendas', label: 'Tiendas', icon: MapPin },
    { to: '/perfil', label: t('nav.profile'), icon: User },
  ];

  const extraItems = [
    { to: '/publica-tu-carrera', label: 'Publicar carrera', icon: PlusCircle },
    { to: '/anunciate', label: 'Anúnciate', icon: Megaphone },
  ];

  const linkClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      isActive
        ? 'bg-primary text-white shadow-lg shadow-primary/30'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary'
    }`;

  return (
    <div className="hidden nav:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-colors duration-300">
      {/* Brand */}
      <div className="p-6 flex items-center justify-between">
        <NavLink to="/carreras" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Mountain size={24} />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            Trail Canarias
          </span>
        </NavLink>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {({ isActive }) => (
                <>
                  <Icon size={20} className={isActive ? 'text-white' : 'text-gray-500 dark:text-gray-500 group-hover:text-primary'} />
                  <span className="font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-1">
          {extraItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {({ isActive }) => (
                  <>
                    <Icon size={20} className={isActive ? 'text-white' : 'text-gray-500 dark:text-gray-500 group-hover:text-primary'} />
                    <span className="font-medium">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Theme toggle */}
      <div className="px-4 pb-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <span className="font-medium">{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
        </button>
      </div>

      {/* Next race card */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <NavLink to="/carreras/transvulcania">
          <div className="bg-gradient-to-br from-primary to-green-800 rounded-xl p-4 text-white shadow-lg hover:opacity-90 transition-opacity cursor-pointer">
            <p className="text-sm font-medium opacity-90">🏔️ Próxima gran carrera</p>
            <p className="font-bold text-lg mt-1">Transvulcania</p>
            <p className="text-sm opacity-75 mt-1">9 mayo 2026 · La Palma</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
