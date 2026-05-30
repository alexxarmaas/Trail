import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Users, Globe, Instagram, ExternalLink } from 'lucide-react';
import { CLUBS_DATA } from '../data/clubs';
import SEO from '../components/SEO';
import DemoDataNotice from '../components/DemoDataNotice';
import BusinessCTA from '../components/BusinessCTA';
import FeaturedBadge from '../components/FeaturedBadge';
import { getImageFallback, getImageAlt } from '../utils/getImageFallback';

const ClubDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const club = CLUBS_DATA.find((c) => c.slug === slug);

  if (!club) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
        <p className="text-6xl mb-4">👥</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Club no encontrado</h1>
        <p className="text-gray-500 mb-6">No hemos encontrado ningún club con este identificador.</p>
        <button
          onClick={() => navigate('/clubes')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
        >
          <ChevronLeft size={18} />
          Volver a clubes
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${club.name} · Club de Trail en ${club.municipality}`}
        description={club.description}
        canonical={`https://trailcanarias.vercel.app/clubes/${club.slug}`}
        ogImage={club.image}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Hero */}
        <div className="h-64 md:h-80 relative overflow-hidden">
          <img 
            src={getImageFallback(club, 'club')} 
            alt={getImageAlt(club, 'club')} 
            className="w-full h-full object-cover" 
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/placeholders/club.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
          <div className="absolute top-4 left-4 z-20">
            <button
              onClick={() => navigate('/clubes')}
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute bottom-6 left-6 z-20 text-white">
            {club.featured && <FeaturedBadge className="mb-2" />}
            <h1 className="text-3xl font-bold">{club.name}</h1>
            <div className="flex items-center gap-1 mt-1 text-sm opacity-90">
              <MapPin size={14} />
              <span>{club.municipality}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          {club.demo && (
            <DemoDataNotice message="Datos demo. Esta ficha está pendiente de verificación con información oficial del club." />
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
              <Users size={24} className="mx-auto text-primary mb-1" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{club.members}</p>
              <p className="text-xs text-gray-500 uppercase font-semibold">Miembros</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
              <MapPin size={24} className="mx-auto text-primary mb-1" />
              <p className="text-lg font-bold text-gray-900 dark:text-white">{club.municipality}</p>
              <p className="text-xs text-gray-500 uppercase font-semibold">Ubicación</p>
            </div>
          </div>

          {/* Description */}
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white mb-2">Sobre el club</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{club.description}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            {club.website && (
              <a
                href={club.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
              >
                <Globe size={18} />
                Web oficial
                <ExternalLink size={14} className="ml-auto" />
              </a>
            )}
            {club.instagram && (
              <a
                href={`https://instagram.com/${club.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Instagram size={18} />
                @{club.instagram}
                <ExternalLink size={14} className="ml-auto" />
              </a>
            )}
          </div>

          {/* CTA */}
          <BusinessCTA type="club" name={club.name} />
        </div>
      </div>
    </>
  );
};

export default ClubDetailPage;
