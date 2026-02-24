import { Calendar, Users, MapPin, User, Mountain, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const menuItems = [
    { id: 'calendar', label: t('nav.calendar'), icon: Calendar },
    { id: 'clubs', label: t('nav.clubs'), icon: Users },
    { id: 'shops', label: t('nav.shopsAndMaps'), icon: MapPin },
    { id: 'profile', label: t('nav.profile'), icon: User },
  ];

  return (
    <div className="hidden nav:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-colors duration-300">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Mountain size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Summit</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-white' : 'text-gray-500 dark:text-gray-500 group-hover:text-primary'} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-4 pb-2">
         <button 
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
         >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
         </button>
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <div className="bg-gradient-to-br from-primary to-green-800 rounded-xl p-4 text-white shadow-lg">
          <p className="text-sm font-medium opacity-90">{t('nav.nextRace')}</p>
          <p className="font-bold text-lg mt-1">Ultra Pirineu</p>
          <p className="text-sm opacity-75 mt-1">Oct 2, 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
