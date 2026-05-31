import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, Users, TrendingUp, Mail, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { trackEvent } from '../utils/trackEvent';
import { SITE_CONFIG } from '../config/site';

const ForOrganizers = () => {
  const navigate = useNavigate();

  const handleAction = (cta) => {
    trackEvent('organizers_landing_cta_click', { cta });
    if (cta === 'publica-tu-carrera') {
      navigate('/publica-tu-carrera');
    } else {
      window.location.href = `mailto:${SITE_CONFIG.email}?subject=Información para organizadores`;
    }
  };

  return (
    <>
      <SEO
        title="Para organizadores · Trail Canarias"
        description="Haz visible tu carrera trail en Canarias. Llega a corredores locales y visitantes antes de abrir inscripciones."
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Haz visible tu carrera trail en Canarias
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Llega a corredores locales y visitantes antes de abrir inscripciones. Posiciona tu evento en el directorio de referencia.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => handleAction('publica-tu-carrera')}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
              >
                Publica tu carrera <ChevronRight size={20} />
              </button>
              <button
                onClick={() => handleAction('solicitar-info')}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                Solicitar información
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            ¿Por qué publicar en Trail Canarias?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Anticipación</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Los corredores planifican su calendario con meses de antelación. Aparece en las búsquedas antes que nadie.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Audiencia cualificada</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Conecta directamente con la comunidad de trail runners locales y turistas deportivos en Canarias.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Más inscripciones</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Facilitamos el acceso directo a tu web oficial o plataforma de inscripciones, reduciendo la fricción.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-gray-900 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-800 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-2">Carrera Destacada</h3>
                <p className="text-gray-400 mb-6">Gana visibilidad en el calendario y en la página de inicio.</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">desde 49 €</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['Ficha verificada y destacada', 'Enlace directo de inscripción', 'Presencia destacada por isla', 'Mención en newsletter'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 size={20} className="text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleAction('publica-tu-carrera')}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Empezar ahora
                </button>
              </div>
              <div className="p-8 md:p-12 bg-gray-800 dark:bg-gray-900">
                <h3 className="text-2xl font-bold text-white mb-2">Patrocinio de Newsletter</h3>
                <p className="text-gray-400 mb-6">Llega directamente al correo de cientos de corredores.</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">desde 99 €</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['Todo lo del plan destacado', 'Banner exclusivo en email', 'Mención especial en redes', 'Soporte prioritario'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 size={20} className="text-green-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleAction('solicitar-info-premium')}
                  className="w-full py-4 bg-transparent border-2 border-gray-600 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
                >
                  Contactar ventas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForOrganizers;
