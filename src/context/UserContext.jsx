/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize from local storage or defaults
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('trail-companion-user-profile');
    return saved ? JSON.parse(saved) : {
      weight: 70, // kg
      height: 175, // cm
      age: 30,
      gender: 'male', // 'male' | 'female'
      role: 'runner' // 'runner' | 'club_admin' | 'shop_owner'
    };
  });

  // Persist to local storage whenever profile changes
  useEffect(() => {
    localStorage.setItem('trail-companion-user-profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const updateProfile = (newMetrics) => {
    setUserProfile(prev => ({ ...prev, ...newMetrics }));
  };

  return (
    <UserContext.Provider value={{ userProfile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
