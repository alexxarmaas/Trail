import React from 'react';
import { Mountain, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';

const Onboarding = ({ onStart }) => {
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200"
                alt="Mountain Cover"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </div>

        {/* Language Toggle */}
        <div className="absolute top-6 right-6 z-20">
             <button 
                onClick={toggleLanguage}
                className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors flex items-center gap-2 font-bold border border-white/20 px-4"
                aria-label={`Switch to ${language === 'es' ? 'English' : 'Spanish'}`}
            >
                <Globe size={18} />
                <span className="text-sm uppercase tracking-wider">{language}</span>
            </button>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center p-8 max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="w-20 h-20 bg-primary/90 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 mb-8 border border-white/10">
                <Mountain size={40} className="text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
                {t('onboard.title')}
            </h1>
            
            <p className="text-lg text-gray-200 mb-10 leading-relaxed opacity-90">
                {t('onboard.subtitle')}
            </p>

            <button 
                onClick={onStart}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-primary/40"
            >
                {t('onboard.start')}
            </button>
        </div>
    </div>
  );
};

export default Onboarding;
