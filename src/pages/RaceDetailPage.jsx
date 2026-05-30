import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useRaces } from '../context/RacesContext';
import RaceDetail from '../components/RaceDetail';
import SEO from '../components/SEO';
import JsonLd, { buildSportsEventLd } from '../components/JsonLd';
import { SITE_CONFIG } from '../config/site';

const RaceDetailPage = () => {
  const { slug } = useParams();
  const { races, getRaceBySlug } = useRaces();
  const navigate = useNavigate();

  const race = getRaceBySlug(slug);

  if (!race) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
        <p className="text-6xl mb-4">🏔️</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Carrera no encontrada
        </h1>
        <p className="text-gray-500 mb-6">
          No hemos encontrado ninguna carrera con este identificador.
        </p>
        <button
          onClick={() => navigate('/carreras')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
        >
          <ChevronLeft size={18} />
          Volver al calendario
        </button>
      </div>
    );
  }

  const similarRaces = races.filter((r) => r.id !== race.id && r.island === race.island);
  const jsonLd = buildSportsEventLd(race);

  return (
    <>
      <SEO
        title={`${race.name} ${race.dateLabel ? '· ' + race.dateLabel : ''}`}
        description={
          race.demo
            ? `Información sobre ${race.name} en ${race.location}. Datos pendientes de verificación oficial.`
            : race.description
        }
        canonical={`${SITE_CONFIG.url}/carreras/${race.slug}`}
        ogImage={race.image}
      />
      <JsonLd data={jsonLd} />
      <RaceDetail
        race={race}
        similarRaces={similarRaces}
        onClose={() => navigate('/carreras')}
      />
    </>
  );
};

export default RaceDetailPage;
