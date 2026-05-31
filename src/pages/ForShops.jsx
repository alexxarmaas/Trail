import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Store, MapPin, MousePointerClick, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { trackEvent } from '../utils/trackEvent';
import { SITE_CONFIG } from '../config/site';

const ForShops = () => {
  const navigate = useNavigate();

  const handleAction = (cta) => {
    trackEvent('shops_landing_cta_click', { cta });
    if (cta === 'anade-tu-ficha') {
      navigate('/anade-tu-ficha');
    } else {
      window.location.href = `mailto:${SITE_CONFIG.email}?subject=Información para tiendas`;
    }
  };

  return (
    <>
      <SEO
        title="Para tiendas · Trail Canarias"
        description="Conecta tu tienda con corredores de trail en Canarias. Aumenta tu visibilidad."
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Conecta tu tienda con corredores de trail en Canarias
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Aumenta la visibilidad de tu negocio especializado. Aparece en las búsquedas locales y destaca tu material de trail running.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => handleAction('anade-tu-ficha')}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
              >
                Añadir tienda gratis <ChevronRight size={20} />
              </button>
              <button
                onClick={() => handleAction('solicitar-info')}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                Solicitar patrocinio
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Ventajas del directorio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Store size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Ficha de tienda</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Página dedicada con tus datos de contacto, enlaces a tu web y redes sociales.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Presencia por isla</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Cuando los corredores busquen material en tu isla, tu tienda aparecerá en los primeros resultados.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <MousePointerClick size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Tráfico cualificado</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Atrae a clientes que ya están buscando material técnico y calzado para sus próximas carreras.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-gray-900 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-800 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-2">Tienda Destacada</h3>
                <p className="text-gray-400 mb-6">Posiciónate por encima de la competencia en el directorio.</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">19 €</span>
                  <span className="text-gray-400">/mes</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['Insignia de destacada', 'Prioridad en búsquedas', 'Enlace directo a tienda online', 'Sin anuncios de competidores'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 size={20} className="text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleAction('anade-tu-ficha')}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Contratar
                </button>
              </div>
              <div className="p-8 md:p-12 bg-gray-800 dark:bg-gray-900">
                <h3 className="text-2xl font-bold text-white mb-2">Patrocinio de Isla</h3>
                <p className="text-gray-400 mb-6">Dominio absoluto y visibilidad en fichas de carrera.</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">99 €</span>
                  <span className="text-gray-400">/mes</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['Banner exclusivo por isla', 'Aparición en recomendaciones de material de carreras', 'Publicación mensual en RRSS', 'Soporte prioritario'].map((feature, i) => (
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

export default ForShops;
