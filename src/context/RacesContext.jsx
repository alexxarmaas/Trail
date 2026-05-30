/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { BASE_RACES } from '../data/races';

const RacesContext = createContext();

export const useRaces = () => {
  const context = useContext(RacesContext);
  if (!context) {
    throw new Error('useRaces must be used within a RacesProvider');
  }
  return context;
};

export const RacesProvider = ({ children }) => {
  const [races, setRaces] = useState(() => {
    // Merge base races with any user-submitted races from localStorage
    try {
      const saved = JSON.parse(localStorage.getItem('trailcanarias_submitted_races') || '[]');
      return [...BASE_RACES, ...saved];
    } catch {
      return BASE_RACES;
    }
  });

  const publishRace = (newRace) => {
    const distVal = parseFloat(newRace.distance) || 0;
    const elevVal = parseFloat((newRace.elevation || '0').replace(/[^0-9.]/g, '')) || 0;
    const distStr = newRace.distance ? `${newRace.distance} km` : 'TBD';
    const elevStr = newRace.elevation ? `+${newRace.elevation} m` : 'TBD';

    const slug = newRace.name
      ? newRace.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      : `carrera-${Date.now()}`;

    const raceEntry = {
      id: Date.now(),
      slug,
      name: newRace.name,
      island: newRace.island || '',
      municipality: newRace.municipality || '',
      date: newRace.date,
      dateLabel: newRace.date,
      distances: newRace.distance ? [distStr] : [],
      distanceLabel: distStr,
      elevationLabel: elevStr,
      distVal,
      elevVal,
      location: newRace.municipality
        ? `${newRace.municipality}, Canarias`
        : 'Canarias',
      image:
        'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800',
      type: newRace.type || 'ultra',
      organizer: newRace.organizer || null,
      registrationUrl: newRace.registrationUrl || '',
      officialWebsite: newRace.officialWebsite || '',
      priceFrom: null,
      status: 'pending',
      featured: false,
      featuredUntil: null,
      sponsorName: null,
      sponsorUrl: null,
      gpxUrl: null,
      description: 'Carrera enviada por organizador. Pendiente de verificación.',
      demo: true,
      isPublished: true,
    };

    setRaces((prev) => [raceEntry, ...prev]);

    // Persist submitted races to localStorage
    try {
      const saved = JSON.parse(localStorage.getItem('trailcanarias_submitted_races') || '[]');
      localStorage.setItem(
        'trailcanarias_submitted_races',
        JSON.stringify([raceEntry, ...saved])
      );
    } catch (_) {}

    return raceEntry;
  };

  const removeRace = (id) => {
    setRaces((prev) => prev.filter((r) => r.id !== id));
  };

  const getRaceBySlug = (slug) => races.find((r) => r.slug === slug);

  return (
    <RacesContext.Provider value={{ races, publishRace, removeRace, getRaceBySlug }}>
      {children}
    </RacesContext.Provider>
  );
};

export default RacesContext;
