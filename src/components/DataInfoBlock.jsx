import React from 'react';
import { ShieldCheck, ShieldAlert, FileText, AlertTriangle, ExternalLink, Calendar, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../utils/trackEvent';
import { SITE_CONFIG } from '../config/site';

const DataInfoBlock = ({ item, type }) => {
  if (!item) return null;

  const correctionUrl = `/corregir-ficha?type=${encodeURIComponent(type)}&slug=${encodeURIComponent(item.slug)}&name=${encodeURIComponent(item.name)}`;

  const handleCorrectionClick = () => {
    trackEvent('correction_request_click', { type, slug: item.slug, name: item.name });
  };

  const getEmailTemplate = () => {
    const subject = encodeURIComponent(`Trail Canarias - Ficha de ${item.name}`);
    const body = encodeURIComponent(
      `Hola,\n\nOs contactamos desde Trail Canarias (https://trailcanarias.vercel.app).\n\nNos gustaría mejorar vuestra ficha "${item.name}" en nuestro directorio.\n\n¿Podríais confirmarnos los datos oficiales para actualizarla o verificarla? Podéis hacerlo respondiendo a este email o a través de la web.\n\nUn saludo.`
    );
    return `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="mt-8 p-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 text-sm">
      <div className="flex items-center gap-2 mb-4">
        <Info size={16} className="text-gray-400" />
        <h4 className="font-bold text-gray-900 dark:text-white">Información de la ficha</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <span className="text-gray-500 w-24 shrink-0 font-medium">Estado:</span>
            {item.verified ? (
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
                <ShieldCheck size={14} /> Verificado
              </span>
            ) : item.demo ? (
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                <AlertTriangle size={14} /> Demo
              </span>
            ) : (
              <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-semibold">
                <ShieldAlert size={14} /> Pendiente de revisión
              </span>
            )}
          </div>

          {(item.sourceName || item.sourceUrl) && (
            <div className="flex items-start gap-2">
              <span className="text-gray-500 w-24 shrink-0 font-medium">Fuente:</span>
              {item.sourceUrl ? (
                <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                  {item.sourceName || 'Enlace externo'} <ExternalLink size={12} />
                </a>
              ) : (
                <span className="text-gray-700 dark:text-gray-300">{item.sourceName}</span>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          {item.lastChecked && (
            <div className="flex items-start gap-2">
              <span className="text-gray-500 w-24 shrink-0 font-medium flex items-center gap-1"><Calendar size={14}/> Revisión:</span>
              <span className="text-gray-700 dark:text-gray-300">{item.lastChecked}</span>
            </div>
          )}

          {item.sourceNotes && (
            <div className="flex items-start gap-2">
              <span className="text-gray-500 w-24 shrink-0 font-medium flex items-center gap-1"><FileText size={14}/> Notas:</span>
              <span className="text-gray-700 dark:text-gray-300">{item.sourceNotes}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-gray-500 text-xs">¿Ves algún dato incorrecto o desactualizado?</span>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {!item.verified && (
            <a
              href={getEmailTemplate()}
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              Contactar responsable
            </a>
          )}
          <Link
            to={correctionUrl}
            onClick={handleCorrectionClick}
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Solicitar corrección
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DataInfoBlock;
