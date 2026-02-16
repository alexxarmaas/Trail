import React, { createContext, useState, useContext } from 'react';
import { TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Default to Spanish

  const t = (key) => {
    // 1. Try direct lookup (for flat keys)
    if (TRANSLATIONS[language][key]) return TRANSLATIONS[language][key];
    
    // 2. Try nested lookup (for structured objects)
    return key.split('.').reduce((acc, part) => acc && acc[part], TRANSLATIONS[language]) || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
