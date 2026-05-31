import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

const QualityBadge = ({ item, className = '' }) => {
  if (!item) return null;

  if (item.verified) {
    return (
      <span className={`flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-[10px] font-bold px-2 py-0.5 rounded-full ${className}`}>
        <ShieldCheck size={10} /> Verificado
      </span>
    );
  }

  if (item.demo) {
    return (
      <span className={`flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full ${className}`}>
        <AlertTriangle size={10} /> Demo
      </span>
    );
  }

  if (item.status === 'pending' || item.verified === false) {
    return (
      <span className={`flex items-center gap-1 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 text-[10px] font-bold px-2 py-0.5 rounded-full ${className}`}>
        <ShieldAlert size={10} /> Pendiente
      </span>
    );
  }

  return null;
};

export default QualityBadge;
