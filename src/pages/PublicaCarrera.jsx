import React, { useState } from 'react';
import { CheckCircle, PlusCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { useRaces } from '../context/RacesContext';
import { trackEvent } from '../utils/trackEvent';
import { ISLANDS_DATA } from '../data/islands';

const INITIAL_FORM = {
  name: '',
  island: '',
  municipality: '',
  date: '',
  distance: '',
  elevation: '',
  type: 'ultra',
  organizer: '',
  officialWebsite: '',
  registrationUrl: '',
  email: '',
};

const PublicaCarrera = () => {
  const { publishRace } = useRaces();
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'El nombre es obligatorio.';
    if (!form.island) errs.island = 'Selecciona una isla.';
    if (!form.date) errs.date = 'La fecha es obligatoria.';
    if (!form.email.includes('@')) errs.email = 'Introduce un email válido.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    publishRace(form);
    trackEvent('submit_publish_race', { name: form.name, island: form.island });

    // Save submission to localStorage for reference
    try {
      const submissions = JSON.parse(localStorage.getItem('trailcanarias_form_submissions') || '[]');
      localStorage.setItem(
        'trailcanarias_form_submissions',
        JSON.stringify([{ ...form, submittedAt: new Date().toISOString() }, ...submissions])
      );
    } catch (_) {}

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <SEO title="Carrera enviada · Trail Canarias" />
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
          <CheckCircle size={64} className="text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Carrera enviada!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Tu carrera ha sido recibida y queda pendiente de revisión por el equipo de Trail Canarias.
            Te contactaremos en el email que has indicado.
          </p>
          <button
            onClick={() => {
              setForm(INITIAL_FORM);
              setSubmitted(false);
            }}
            className="mt-6 px-6 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            Enviar otra carrera
          </button>
        </div>
      </>
    );
  }

  const Field = ({ label, name, type = 'text', required, children, hint }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children || (
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            errors[name]
              ? 'border-red-400 focus:ring-red-400'
              : 'border-gray-200 dark:border-gray-700'
          }`}
        />
      )}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <SEO
        title="Publica tu Carrera Trail en Canarias"
        description="¿Organizas una carrera de trail en Canarias? Añádela al directorio de Trail Canarias gratis. Rellena el formulario y llegamos a miles de corredores."
        canonical="https://trailcanarias.com/publica-tu-carrera"
      />

      <div className="p-6 md:p-8 min-h-screen">
        {/* Background */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-green-50 to-blue-50/30 dark:from-gray-950 dark:to-gray-900 pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PlusCircle size={24} className="text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Para organizadores
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Publica tu carrera en Trail Canarias
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Añade tu carrera al calendario gratuito. La revisaremos y la publicaremos cuanto antes.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-5"
          >
            <Field label="Nombre de la carrera" name="name" required />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Isla" name="island" required>
                <select
                  name="island"
                  value={form.island}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.island ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <option value="">Seleccionar isla…</option>
                  {ISLANDS_DATA.map((island) => (
                    <option key={island.slug} value={island.slug}>
                      {island.name}
                    </option>
                  ))}
                </select>
                {errors.island && <p className="text-xs text-red-500 mt-1">{errors.island}</p>}
              </Field>

              <Field label="Municipio" name="municipality" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Fecha" name="date" type="date" required />
              <Field label="Tipo" name="type">
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="ultra">Ultra (&gt;42 km)</option>
                  <option value="marathon">Maratón (21–42 km)</option>
                  <option value="short">Corta (&lt;21 km)</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Distancia principal (km)"
                name="distance"
                hint="Ej: 42"
              />
              <Field
                label="Desnivel positivo (m)"
                name="elevation"
                hint="Ej: 2400"
              />
            </div>

            <Field label="Organizador / organización" name="organizer" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Web oficial"
                name="officialWebsite"
                type="url"
                hint="https://..."
              />
              <Field
                label="Enlace inscripción"
                name="registrationUrl"
                type="url"
                hint="https://..."
              />
            </div>

            <Field
              label="Email de contacto"
              name="email"
              type="email"
              required
              hint="No se publicará. Solo para contactarte."
            />

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Enviar carrera para revisión
              </button>
              <p className="text-xs text-gray-400 text-center mt-2">
                La publicación es gratuita. Revisamos todas las fichas antes de publicarlas.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PublicaCarrera;
