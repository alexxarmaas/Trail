import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('summit-path-theme');
    return savedTheme || 'light';
  });

  const [autoSwitch, setAutoSwitch] = useState(() => {
    const saved = localStorage.getItem('summit-path-auto-switch');
    return saved ? JSON.parse(saved) : false;
  });

  // Check time and auto-switch if enabled
  useEffect(() => {
    if (!autoSwitch) return;

    const checkTime = () => {
      const hour = new Date().getHours();
      // Dark mode from 8 PM (20:00) to 6 AM (6:00)
      const shouldBeDark = hour >= 20 || hour < 6;
      setTheme(shouldBeDark ? 'dark' : 'light');
    };

    checkTime(); // Check immediately
    const interval = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [autoSwitch]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    if (!autoSwitch) {
      localStorage.setItem('summit-path-theme', theme);
    }
  }, [theme, autoSwitch]);

  useEffect(() => {
    localStorage.setItem('summit-path-auto-switch', JSON.stringify(autoSwitch));
  }, [autoSwitch]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleAutoSwitch = () => {
    setAutoSwitch(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, autoSwitch, toggleAutoSwitch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
