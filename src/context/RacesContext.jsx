/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const BASE_RACES = [
  {
    id: 1,
    name: 'Ultra Pirineu',
    date: 'Oct 2, 2026',
    distance: '100km',
    distVal: 100,
    elevation: '+6600m',
    elevVal: 6600,
    location: 'Bagà, Spain',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800',
    type: 'ultra',
    courses: [
      { name: '100K', distance: '100km', distVal: 100, elevation: '+6600m', elevVal: 6600 },
      { name: '42K', distance: '42km', distVal: 42, elevation: '+2800m', elevVal: 2800 },
      { name: '21K', distance: '21km', distVal: 21, elevation: '+1500m', elevVal: 1500 },
      { name: 'vertical', distance: '5km', distVal: 5, elevation: '+1000m', elevVal: 1000 },
    ]
  },
  {
    id: 2,
    name: 'Zegama-Aizkorri',
    date: 'May 24, 2026',
    distance: '42km',
    distVal: 42,
    elevation: '+2736m',
    elevVal: 2736,
    location: 'Zegama, Spain',
    image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=800',
    type: 'marathon',
  },
  {
    id: 3,
    name: 'Transvulcania',
    date: 'May 9, 2026',
    distance: '72km',
    distVal: 72,
    elevation: '+4735m',
    elevVal: 4735,
    location: 'La Palma, Spain',
    image: 'https://images.unsplash.com/photo-1541280910158-c4e14f9c94a3?auto=format&fit=crop&q=80&w=800',
    type: 'ultra',
  },
  {
    id: 4,
    name: 'Dolomyths Run',
    date: 'Jul 18, 2026',
    distance: '22km',
    distVal: 22,
    elevation: '+1750m',
    elevVal: 1750,
    location: 'Canazei, Italy',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    type: 'short',
  },
  {
    id: 5,
    name: 'UTMB',
    date: 'Aug 28, 2026',
    distance: '171km',
    distVal: 171,
    elevation: '+10000m',
    elevVal: 10000,
    location: 'Chamonix, France',
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800',
    type: 'ultra',
  },
  {
    id: 6,
    name: 'Sierre-Zinal',
    date: 'Aug 8, 2026',
    distance: '31km',
    distVal: 31,
    elevation: '+2200m',
    elevVal: 2200,
    location: 'Valais, Switzerland',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800',
    type: 'short',
  },
  {
    id: 7,
    name: 'Pilancones Tunte Trail',
    date: 'Jan 17, 2026',
    distance: '34km',
    distVal: 34,
    elevation: '+1900m',
    elevVal: 1900,
    location: 'San Bartolomé de Tirajana, Spain',
    image: 'https://images.unsplash.com/photo-1502126324834-38f8e02d7160?auto=format&fit=crop&q=80&w=800',
    type: 'marathon',
  },
];

const RacesContext = createContext();

export const useRaces = () => {
  const context = useContext(RacesContext);
  if (!context) {
    throw new Error('useRaces must be used within a RacesProvider');
  }
  return context;
};

export const RacesProvider = ({ children }) => {
  const [races, setRaces] = useState(BASE_RACES);

  const publishRace = (newRace) => {
    const distVal = parseFloat(newRace.distance) || 0;
    const elevVal = parseFloat((newRace.elevation || '0').replace(/[^0-9.]/g, '')) || 0;
    const distStr = newRace.distance ? `${newRace.distance}km` : 'TBD';
    const elevStr = newRace.elevation ? `+${newRace.elevation}m` : 'TBD';

    const raceEntry = {
      id: Date.now(),
      name: newRace.name,
      date: newRace.date,
      distance: distStr,
      distVal,
      elevation: elevStr,
      elevVal,
      location: newRace.location || 'TBD',
      image: newRace.image || 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800',
      type: newRace.type || 'ultra',
      organizer: newRace.organizer || null,
      isPublished: true,
    };
    setRaces(prev => [raceEntry, ...prev]);
    return raceEntry;
  };

  const removeRace = (id) => {
    setRaces(prev => prev.filter(r => r.id !== id));
  };

  return (
    <RacesContext.Provider value={{ races, publishRace, removeRace }}>
      {children}
    </RacesContext.Provider>
  );
};

export default RacesContext;
