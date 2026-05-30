import React, { useState } from 'react';
import { CheckCircle, Building } from 'lucide-react';
import SEO from '../components/SEO';
import { trackEvent } from '../utils/trackEvent';

const INITIAL_FORM = {
  type: 'carrera',
  name: '',
  island: '',
  municipality: '',
  website: '',
  instagram: '',
  email: '',
  description: '',
  wantsFeatured: false
};

const AddListing = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'El nombre es obligatorio.';
    if (!form.type) errs.type = 'El tipo es obligatorio.';
    if (!form.island) errs.island = 'La isla es obligatoria.';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = 'Email válido obligatorio.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Save to localStorage
    const stored = JSON.parse(localStorage.getItem('trailcanarias_listing_requests') || '[]');
    stored.push({ ...form, timestamp: new Date().toISOString() });
    localStorage.setItem('trailcanarias_listing_requests', JSON.stringify(stored));
    
    // Track event
    trackEvent('listing_request_submit', { type: form.type, island: form.island, wantsFeatured: form.wantsFeatured });
    
    setSubmitted(true);
    setForm(INITIAL_FORM);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <SEO 
        title="Añade tu ficha a Trail Canarias"
        description="Publica o reclama una carrera, tienda o club de trail running en Canarias. Opciones gratuitas y destacadas."
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-xl">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            Añade tu ficha a Trail Canarias
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Publica o reclama una carrera, tienda o club de trail running en Canarias.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
            Revisamos todas las solicitudes antes de publicarlas. Las fichas básicas son gratuitas y puedes solicitar opciones destacadas.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12 px-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-900/50">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">¡Solicitud recibida!</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Solicitud enviada. Revisaremos la información y te contactaremos si necesitamos más datos.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 px-6 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Enviar otra solicitud
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Tipo de ficha *
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                >
                  <option value="carrera">Carrera</option>
                  <option value="tienda">Tienda</option>
                  <option value="club">Club</option>
                  <option value="ruta">Ruta</option>
                </select>
                {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                  placeholder="Ej: Trail Club Tenerife"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Isla *
                </label>
                <select
                  value={form.island}
                  onChange={(e) => setForm({ ...form, island: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                >
                  <option value="">Selecciona una isla</option>
                  <option value="tenerife">Tenerife</option>
                  <option value="gran-canaria">Gran Canaria</option>
                  <option value="la-palma">La Palma</option>
                  <option value="lanzarote">Lanzarote</option>
                  <option value="fuerteventura">Fuerteventura</option>
                  <option value="la-gomera">La Gomera</option>
                  <option value="el-hierro">El Hierro</option>
                  <option value="todas">Varias/Todas</option>
                </select>
                {errors.island && <p className="text-sm text-red-500">{errors.island}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Municipio
                </label>
                <input
                  type="text"
                  value={form.municipality}
                  onChange={(e) => setForm({ ...form, municipality: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                  placeholder="Opcional"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Web oficial
                </label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                  placeholder="https://"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Instagram
                </label>
                <input
                  type="text"
                  value={form.instagram}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                  placeholder="@usuario"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Email de contacto *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                placeholder="Para comunicarnos contigo"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Descripción
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all min-h-[100px] dark:text-white"
                placeholder="Cuéntanos un poco sobre la ficha..."
              />
            </div>

            <div className="flex items-center gap-3 bg-primary/5 p-4 rounded-xl border border-primary/20">
              <input
                type="checkbox"
                id="wantsFeatured"
                checked={form.wantsFeatured}
                onChange={(e) => setForm({ ...form, wantsFeatured: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="wantsFeatured" className="text-sm font-medium text-gray-900 dark:text-white select-none cursor-pointer">
                ¿Quieres información sobre opciones destacadas para mayor visibilidad?
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-lg shadow-primary/25 transition-all"
            >
              Enviar solicitud
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddListing;
