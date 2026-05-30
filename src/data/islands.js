/**
 * Trail Canarias — Islands Data
 */

export const ISLANDS_DATA = [
  {
    slug: 'tenerife',
    name: 'Tenerife',
    description: 'La isla más grande de Canarias, con el Teide, el Macizo de Anaga y una variedad de terrenos única para el trail running.',
    seoText: 'Trail running en Tenerife: carreras, clubes y tiendas especializadas. Descubre rutas por el Teide, Anaga y el norte de la isla.',
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800',
    capital: 'Santa Cruz de Tenerife',
  },
  {
    slug: 'gran-canaria',
    name: 'Gran Canaria',
    description: 'Un continente en miniatura: dunas en el sur, bosques de pinar en el interior y barrancos espectaculares. Sede de la Transgrancanaria.',
    seoText: 'Trail running en Gran Canaria: carreras, clubes y tiendas especializadas. Home de la Transgrancanaria y el Pilancones Tunte Trail.',
    image: 'https://images.unsplash.com/photo-1502126324834-38f8e02d7160?auto=format&fit=crop&q=80&w=800',
    capital: 'Las Palmas de Gran Canaria',
  },
  {
    slug: 'la-palma',
    name: 'La Palma',
    description: 'La Isla Bonita. Hogar de la Transvulcania, considerada una de las carreras de trail más espectaculares del mundo.',
    seoText: 'Trail running en La Palma: carreras, clubes y tiendas especializadas. Sede de la Transvulcania y la Ruta de los Volcanes.',
    image: 'https://images.unsplash.com/photo-1541280910158-c4e14f9c94a3?auto=format&fit=crop&q=80&w=800',
    capital: 'Santa Cruz de La Palma',
  },
  {
    slug: 'lanzarote',
    name: 'Lanzarote',
    description: 'Paisajes volcánicos únicos, campos de lava y el Parque Nacional de Timanfaya. Una experiencia de trail radicalmente distinta.',
    seoText: 'Trail running en Lanzarote: carreras, clubes y tiendas especializadas. Rutas por Timanfaya y los campos de lava de la isla.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
    capital: 'Arrecife',
  },
  {
    slug: 'fuerteventura',
    name: 'Fuerteventura',
    description: 'La isla del viento y las dunas. Terreno árido, corralejo y el macizo de Jandía para los amantes del trail en condiciones extremas.',
    seoText: 'Trail running en Fuerteventura: carreras, clubes y tiendas especializadas. Rutas por las dunas de Corralejo y el macizo de Jandía.',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800',
    capital: 'Puerto del Rosario',
  },
  {
    slug: 'la-gomera',
    name: 'La Gomera',
    description: 'Hogar del Parque Nacional de Garajonay y su espectacular bosque de laurisilva. Perfecta para trail técnico y de media montaña.',
    seoText: 'Trail running en La Gomera: carreras, clubes y tiendas especializadas. Rutas por Garajonay y la laurisilva gomera.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
    capital: 'San Sebastián de La Gomera',
  },
  {
    slug: 'el-hierro',
    name: 'El Hierro',
    description: 'La más occidental de las Canarias. Reserva de la Biosfera con paisajes únicos para el trail running lejos de las multitudes.',
    seoText: 'Trail running en El Hierro: carreras, clubes y tiendas especializadas. Rutas en la Reserva de la Biosfera más pequeña de las Canarias.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    capital: 'Valverde',
  },
];

export const getIslandBySlug = (slug) => ISLANDS_DATA.find(i => i.slug === slug);
export const getIslandName = (slug) => ISLANDS_DATA.find(i => i.slug === slug)?.name || slug;
