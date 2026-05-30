import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Mail, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { SITE_CONFIG } from '../config/site';

const DataNotice = () => {
  const mailtoHref = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Corrección de datos en Trail Canarias')}`;

  return (
    <>
      <SEO
        title="Aviso sobre datos en Trail Canarias"
        description="Información sobre los datos de carreras, clubes y tiendas en Trail Canarias. Qué significa 'demo', cómo reclamar una ficha y cómo contactar."
      />

      <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8 min-h-screen">
        <div>
          <Link
            to="/carreras"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1 mb-4"
          >
            ← Volver al inicio
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={28} className="text-amber-500 shrink-0" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Aviso sobre datos
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Qué significa cuando ves una ficha marcada como "demo" o "pendiente" en Trail Canarias.
          </p>
        </div>

        <div className="space-y-6">
          {/* What is demo */}
          <section className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">⚠️</span> ¿Qué significa "Datos demo"?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Las fichas marcadas como <strong>demo</strong> contienen información provisional que <strong>aún no ha sido verificada</strong> con los organizadores, federaciones o fuentes oficiales de cada carrera, club o tienda.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Los datos de distancia, desnivel, fecha, precio e inscripción pueden estar incompletos, aproximados o desactualizados. Consulta siempre la web oficial del organizador antes de tomar cualquier decisión.
            </p>
          </section>

          {/* What is confirmed */}
          <section className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <CheckCircle size={22} className="text-green-600" /> ¿Qué significa "Confirmada"?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Las fichas marcadas como <strong>Confirmada</strong> han sido revisadas contra fuentes oficiales públicas o han sido aportadas directamente por los organizadores. Seguimos siendo un directorio, no el organizador: verifica siempre en la web oficial del evento.
            </p>
          </section>

          {/* How to claim */}
          <section className="rounded-2xl border border-primary/20 dark:border-primary/30 bg-primary/5 dark:bg-primary/10 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              🏁 Eres el organizador/propietario y quieres corregir datos
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Si gestionas una carrera, club o tienda que aparece con datos incorrectos o incompletos, puedes reclamar la ficha. Te facilitamos un espacio gratuito de información básica y opciones de mejora de visibilidad.
            </p>
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
            >
              <Mail size={16} />
              Escríbenos para reclamar tu ficha
            </a>
          </section>

          {/* Who we are */}
          <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              ℹ️ Sobre Trail Canarias
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Trail Canarias es un directorio independiente de trail running en las Islas Canarias. No somos organizadores de ninguna carrera ni tenemos relación oficial con las entidades mencionadas, salvo que se indique expresamente. Toda la información es recopilada de fuentes públicas o facilitada voluntariamente por los interesados.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              Para cualquier consulta, corrección o eliminación de datos:{' '}
              <a
                href={mailtoHref}
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                {SITE_CONFIG.email}
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default DataNotice;
