import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Phone, Globe, Tag, ExternalLink } from 'lucide-react';
import { SHOPS_DATA } from '../data/shops';
import SEO from '../components/SEO';
import DemoDataNotice from '../components/DemoDataNotice';
import BusinessCTA from '../components/BusinessCTA';
import FeaturedBadge from '../components/FeaturedBadge';

const ShopDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const shop = SHOPS_DATA.find((s) => s.slug === slug);

  if (!shop) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
        <p className="text-6xl mb-4">🏪</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tienda no encontrada</h1>
        <p className="text-gray-500 mb-6">No hemos encontrado ninguna tienda con este identificador.</p>
        <button
          onClick={() => navigate('/tiendas')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
        >
          <ChevronLeft size={18} />
          Volver a tiendas
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${shop.name} · Tienda Trail en ${shop.municipality}`}
        description={`Tienda especializada en trail running en ${shop.municipality}. ${shop.tags.join(', ')}.`}
        canonical={`https://trailcanarias.vercel.app/tiendas/${shop.slug}`}
        ogImage={shop.image}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Hero */}
        <div className="relative h-64">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
          <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 z-20">
            <button
              onClick={() => navigate('/tiendas')}
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute bottom-6 left-6 z-20 text-white">
            {shop.featured && <FeaturedBadge className="mb-2" />}
            <h1 className="text-3xl font-bold">{shop.name}</h1>
            <div className="flex items-center gap-1 mt-1 text-sm opacity-90">
              <MapPin size={14} />
              <span>{shop.address || shop.municipality}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          {shop.demo && (
            <DemoDataNotice message="Datos demo. Esta ficha está pendiente de verificación con información oficial de la tienda." />
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {shop.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>

          {/* Address block */}
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-3">
            <h2 className="font-bold text-gray-900 dark:text-white">Información</h2>
            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
              <span>{shop.address || 'Dirección pendiente de verificar'}</span>
            </div>
            {shop.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone size={16} className="text-primary shrink-0" />
                <a href={`tel:${shop.phone}`} className="hover:text-primary transition-colors">
                  {shop.phone}
                </a>
              </div>
            )}
          </div>

          {/* CTA Links */}
          <div className="flex flex-col gap-2">
            {shop.website && (
              <a
                href={shop.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
              >
                <Globe size={18} />
                Web oficial
                <ExternalLink size={14} className="ml-auto" />
              </a>
            )}
            {shop.phone && (
              <a
                href={`tel:${shop.phone}`}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Phone size={18} />
                Llamar
              </a>
            )}
          </div>

          {/* Business CTA */}
          <BusinessCTA type="shop" name={shop.name} />
        </div>
      </div>
    </>
  );
};

export default ShopDetailPage;
