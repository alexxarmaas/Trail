import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert, FileText, Database } from 'lucide-react';
import SEO from '../components/SEO';

const DataSources = () => {
  return (
    <>
      <SEO
        title="Fuentes de datos · Trail Canarias"
        description="Conoce nuestra política de calidad de datos, qué significan nuestras insignias y cómo mantenemos la información actualizada."
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Database size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Calidad y fuentes de datos
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Transparencia sobre cómo recopilamos, verificamos y mantenemos actualizada la información en Trail Canarias.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nuestro compromiso</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Trail Canarias nació con el objetivo de reunir toda la información del trail running en el archipiélago en un solo lugar. Sin embargo, sabemos que la información desactualizada puede arruinar la planificación de una carrera. Por eso hemos implementado un sistema transparente de insignias que te dice exactamente de dónde proviene el dato y qué grado de confianza tiene.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sistema de insignias</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              En cada ficha (carrera, tienda, club o ruta) verás una de estas tres insignias:
            </p>

            <div className="flex gap-4 items-start">
              <div className="shrink-0 mt-1">
                <span className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs font-bold px-3 py-1 rounded-full">
                  <ShieldCheck size={14} /> Verificado
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Información Verificada</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Los datos de esta ficha han sido proporcionados o confirmados directamente por el organizador de la carrera, el dueño de la tienda o el responsable del club. Es el nivel máximo de confianza. En caso de discrepancia, siempre puedes comprobar el enlace a la "Fuente oficial".
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="shrink-0 mt-1">
                <span className="flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
                  <AlertTriangle size={14} /> Demo
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Datos de demostración</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Esta ficha contiene datos de ejemplo (o datos reales obtenidos pero aún no revisados rigurosamente) que sirven para mostrar el funcionamiento del directorio. No debes tomar decisiones (como comprar billetes o reservar hoteles) basándote exclusivamente en esta información.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="shrink-0 mt-1">
                <span className="flex items-center gap-1 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
                  <ShieldAlert size={14} /> Pendiente
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Pendiente de revisión</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  La información ha sido recopilada por nuestro equipo desde fuentes públicas en internet (redes sociales, webs antiguas, ayuntamientos). Creemos que es precisa, pero no hemos logrado contactar con el organizador oficial para que la certifique. Puede contener cambios de última hora que no hemos registrado.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <FileText size={24} className="text-primary" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Colaboración ciudadana</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Trail Canarias es una plataforma viva. Si detectas que una fecha está mal, que una tienda ha cerrado, o que una ruta ha sido modificada por desprendimientos, puedes avisarnos usando el botón <strong>"Solicitar corrección"</strong> presente al final de cada ficha.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Nuestro equipo revisará tu sugerencia cruzándola con fuentes oficiales antes de aprobarla. Si eres el propietario de una entidad listada como "Pendiente" o "Demo", puedes usar el botón <strong>"Reclamar ficha"</strong> para tomar el control de la información que publicamos sobre ti.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default DataSources;
