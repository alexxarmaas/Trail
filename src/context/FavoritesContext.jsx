import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('trail-companion-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('trail-companion-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (raceId) => {
    setFavorites(prev => {
      if (prev.includes(raceId)) return prev;
      return [...prev, raceId];
    });
  };

  const removeFavorite = (raceId) => {
    setFavorites(prev => prev.filter(id => id !== raceId));
  };

  const toggleFavorite = (raceId) => {
    if (favorites.includes(raceId)) {
      removeFavorite(raceId);
    } else {
      addFavorite(raceId);
    }
  };

  const isFavorite = (raceId) => {
    return favorites.includes(raceId);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
