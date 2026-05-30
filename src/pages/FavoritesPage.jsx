import React from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Calendar, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import { useFavorites } from '../context/FavoritesContext';
import { useRaces } from '../context/RacesContext';

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { races } = useRaces();

  const favoriteRaces = races.filter(r => favorites.includes(r.id));

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <SEO 
        title="Tus carreras favoritas | Trail Canarias"
        description="Listado de tus carreras de trail running guardadas."
      />
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-xl flex items-center justify-center">
          <Heart size={24} className="fill-current" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Tus carreras favoritas
        </h1>
      </div>

      {favoriteRaces.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-xl">
          <Heart size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Aún no has guardado carreras.</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Explora el calendario y guarda las carreras que te interesen para tenerlas a mano.
          </p>
          <NavLink 
            to="/carreras"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors"
          >
            <Calendar size={20} />
            Ver calendario
          </NavLink>
        </div>
      ) : (
        <div className="grid gap-4">
          {favoriteRaces.map(race => (
            <div key={race.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {race.dateStr}
                  </span>
                  <span className="text-xs text-gray-500 truncate">{race.islandStr}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white truncate">
                  {race.name}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(race.id);
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                  aria-label="Quitar de favoritos"
                >
                  <Heart size={20} className="fill-current" />
                </button>
                <NavLink 
                  to={`/carreras/${race.slug}`}
                  className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white rounded-xl transition-colors"
                >
                  <ChevronRight size={20} />
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
