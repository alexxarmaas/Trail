import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * DemoDataNotice — shown when a race/club/shop has demo === true.
 * Informs visitors that the data is pending official verification.
 */
const DemoDataNotice = ({ message, className = '' }) => (
  <div
    className={`flex items-start gap-2 px-4 py-3 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm ${className}`}
  >
    <AlertCircle size={16} className="mt-0.5 shrink-0" />
    <span>{message || 'Datos demo. Esta ficha está pendiente de verificación con fuentes oficiales.'}</span>
  </div>
);

export default DemoDataNotice;
