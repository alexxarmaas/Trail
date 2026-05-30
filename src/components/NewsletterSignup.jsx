import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { trackEvent } from '../utils/trackEvent';

/**
 * NewsletterSignup — email capture form.
 * Saves email to localStorage. Tracks newsletter_signup event.
 */
const NewsletterSignup = ({ compact = false }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Introduce un email válido.');
      return;
    }
    setError('');

    try {
      const existing = JSON.parse(localStorage.getItem('trailcanarias_newsletter') || '[]');
      if (!existing.includes(trimmed)) {
        localStorage.setItem('trailcanarias_newsletter', JSON.stringify([...existing, trimmed]));
      }
    } catch (_) {}

    trackEvent('newsletter_signup', { email: trimmed });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 ${compact ? 'text-sm' : ''}`}>
        <CheckCircle size={20} className="shrink-0" />
        <span className="font-medium">¡Apuntado! Te avisaremos de novedades en Trail Canarias.</span>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label className="sr-only" htmlFor="newsletter-email-compact">Email</label>
        <input
          id="newsletter-email-compact"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Suscribirme
        </button>
        {error && <p className="text-red-500 text-xs mt-1 absolute">{error}</p>}
      </form>
    );
  }

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-green-50 to-orange-50 dark:from-green-900/10 dark:to-orange-900/10 p-6">
      <div className="flex items-center gap-2 mb-2">
        <Mail size={20} className="text-primary" />
        <h3 className="font-bold text-gray-900 dark:text-white">Newsletter Trail Canarias</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Recibe nuevas carreras, aperturas de inscripciones y rutas destacadas en Canarias.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <label className="sr-only" htmlFor="newsletter-email">Email</label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="px-6 py-2 font-semibold bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          Suscribirme gratis
        </button>
      </form>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      <p className="text-[10px] text-gray-400 mt-3">Sin spam. Puedes darte de baja cuando quieras.</p>
    </div>
  );
};

export default NewsletterSignup;
