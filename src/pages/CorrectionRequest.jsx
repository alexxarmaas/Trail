import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { trackEvent } from '../utils/trackEvent';
import SEO from '../components/SEO';

const CorrectionRequest = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const typeParam = searchParams.get('type') || '';
  const slugParam = searchParams.get('slug') || '';
  const nameParam = searchParams.get('name') || '';

  const [formData, setFormData] = useState({
    reporterName: '',
    email: '',
    type: typeParam,
    slug: slugParam,
    itemName: nameParam,
    issue: '',
    correction: '',
    sourceUrl: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.email.includes('@')) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }
    if (!formData.itemName.trim()) {
      setError('El nombre de la ficha es obligatorio.');
      return;
    }
    if (!formData.issue.trim()) {
      setError('Por favor, describe qué dato es incorrecto.');
      return;
    }

    const newRequest = {
      id: `corr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('trailcanarias_correction_requests') || '[]');
      localStorage.setItem('trailcanarias_correction_requests', JSON.stringify([...existing, newRequest]));
      
      trackEvent('correction_request_submit', { type: formData.type, slug: formData.slug });
      setSubmitted(true);
    } catch (err) {
      console.error('Error saving correction request:', err);
      setError('Ha ocurrido un error. Por favor, inténtalo más tarde.');
    }
  };

  return (
    <>
      <SEO
        title="Corregir ficha · Trail Canarias"
        description="Ayúdanos a mantener la información de Trail Canarias actualizada."
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors"
          >
            <ChevronLeft size={20} />
            Volver
          </button>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="mb-8 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Solicitar corrección</h1>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Ayúdanos a mantener el directorio actualizado. Si detectas un error en la información, envíanos el dato correcto y lo revisaremos lo antes posible.
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 flex flex-col items-center text-center">
                <CheckCircle2 size={48} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Solicitud enviada</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Revisaremos la corrección antes de actualizar la ficha. ¡Gracias por tu colaboración!
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Volver al inicio
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-start gap-3 text-sm">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Ficha a corregir *
                    </label>
                    <input
                      type="text"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleChange}
                      placeholder="Ej. The North Face Transgrancanaria"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Tipo de ficha
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                    >
                      <option value="">Selecciona...</option>
                      <option value="carrera">Carrera</option>
                      <option value="tienda">Tienda</option>
                      <option value="club">Club</option>
                      <option value="ruta">Ruta</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      ¿Qué dato es incorrecto? *
                    </label>
                    <textarea
                      name="issue"
                      value={formData.issue}
                      onChange={handleChange}
                      placeholder="Ej. La distancia no es 45km, el teléfono ha cambiado..."
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white min-h-[100px] resize-y"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Información correcta
                    </label>
                    <textarea
                      name="correction"
                      value={formData.correction}
                      onChange={handleChange}
                      placeholder="Indica aquí el dato correcto si lo conoces."
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white min-h-[100px] resize-y"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Enlace de referencia (Opcional)
                    </label>
                    <input
                      type="url"
                      name="sourceUrl"
                      value={formData.sourceUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                    />
                  </div>
                </div>

                <hr className="border-gray-100 dark:border-gray-800" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Tu nombre
                    </label>
                    <input
                      type="text"
                      name="reporterName"
                      value={formData.reporterName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Tu email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Solo te contactaremos si necesitamos verificar el dato.</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 bg-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                  >
                    <Send size={18} />
                    Enviar corrección
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CorrectionRequest;
