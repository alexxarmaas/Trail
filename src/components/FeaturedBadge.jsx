import React from 'react';
import { Star } from 'lucide-react';

/**
 * FeaturedBadge — shown when a race/club/shop has featured === true.
 */
const FeaturedBadge = ({ className = '' }) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-amber-900 ${className}`}
  >
    <Star size={10} fill="currentColor" />
    Destacada
  </span>
);

export default FeaturedBadge;
