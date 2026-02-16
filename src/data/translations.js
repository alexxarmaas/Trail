export const TRANSLATIONS = {
  es: {
    // Onboarding
    onboard: {
      title: 'Domina la Montaña',
      subtitle: 'Tu compañero definitivo para trail running.',
      start: 'Empezar Aventura',
      skip: 'Omitir',
      back: 'Atrás',
      next: 'Siguiente',
      complete: 'Completar',
      fitness: {
        title: '¿Cuál es tu nivel?',
        subtitle: 'Esto nos ayuda a personalizar tu experiencia',
        beginner: 'Principiante',
        beginnerDesc: 'Nuevo en trail running',
        intermediate: 'Intermedio',
        intermediateDesc: 'Experiencia regular',
        advanced: 'Avanzado',
        advancedDesc: 'Corredor experimentado',
      },
      raceTypes: {
        title: '¿Qué distancias prefieres?',
        subtitle: 'Selecciona todas las que te interesen',
        short: 'Cortas',
        marathon: 'Maratón',
        ultra: 'Ultra',
      },
    },
    
    // Navigation (Flat)
    'nav.home': 'Inicio',
    'nav.calendar': 'Calendario',
    'nav.races': 'Carreras',
    'nav.clubs': 'Clubes',
    'nav.shops': 'Tiendas',
    'nav.shopsAndMaps': 'Tiendas',
    'nav.profile': 'Perfil',
    'nav.nextRace': 'Próxima Carrera',
      
    // Dashboard
    dashboard: {
      welcome: 'Bienvenido',
      subtitle: 'Tu resumen personalizado de trail running',
      favorites: 'Favoritas',
      upcoming: 'Próximas',
      available: 'Disponibles',
      level: 'Nivel',
      upcomingRaces: 'Tus Próximas Carreras',
      recommended: 'Recomendadas Para Ti',
      recommendedSubtitle: 'Basado en tus preferencias',
      viewAll: 'Ver Todas',
      noFavorites: 'No tienes favoritas aún',
      noFavoritesSubtitle: 'Empieza a guardar carreras que te interesen',
      browseRaces: 'Explorar Carreras',
    },
      
    // Race (Nested)
    race: {
        title: 'Calendario de Carreras',
        subtitle: 'Encuentra tu próximo desafío en las montañas.',
        filter: {
            all: 'Todas',
            favorites: 'Favoritas',
            short: 'Cortas',
            ultra: 'Ultra',
        },
        register: 'Ver Detalles',
        elevation: 'Desnivel',
        distance: 'Distancia',
        strategy: {
            title: 'Estrategia',
            recommends: 'Recomendado',
            water: 'Agua Est.',
            carbs: 'Carbohidratos',
            time: 'Tiempo Est.',
            explanation: 'Basado en la dificultad del recorrido (Distancia + Desnivel).',
            personalized: 'Personalizado',
        },
        detail: {
            elevation: 'Desnivel',
            distance: 'Distancia',
            startTime: 'Hora de Inicio',
            checkpoints: 'Puntos de Control',
            profile: 'Perfil de Elevación',
            map: 'Mapa Interactivo',
            profileLegend: 'Altitud (m) vs Distancia (km)',
            mandatoryGear: 'Material Obligatorio',
            about: 'Sobre el Recorrido',
            registration: 'Inscribirse Ahora',
            downloadGpx: 'Descargar GPX',
            infoTab: 'Info',
            closesIn: 'Cierre de inscripciones en',
            weather: {
                title: 'El Tiempo en Carrera',
                temp: 'Temp',
                wind: 'Viento',
                conditions: 'Condiciones',
                humidity: 'Humedad',
            },
            countdown: {
                title: 'La carrera empieza en',
                days: 'Días',
                hours: 'Horas',
                mins: 'Mins',
            },
            similar: 'También te podría gustar',
            toggle: {
                profile: 'Perfil',
                map: 'Mapa',
            },
            mapPlaceholder: {
                subtitle: 'Próximamente',
            },
            gear: {
                allPacked: '¡Todo listo! ¡A correr!',
                items: {
                    water: 'Recipiente de agua (1L min)',
                    blanket: 'Manta térmica',
                    whistle: 'Silbato',
                    jacket: 'Chaqueta impermeable con capucha',
                    lamp: 'Frontal + Pilas de repuesto',
                }
            },
            addToCalendar: 'Añadir al Calendario',
            shareCopied: '¡Enlace copiado al portapapeles!',
            weather: {
                historical: 'Media Histórica',
                title: 'El Tiempo en Carrera',
                temp: 'Temp',
                wind: 'Viento',
                conditions: 'Condiciones',
                humidity: 'Humedad',
            },
        }
    },

    // Shops Section
    'shops.title': 'Tiendas Locales',
    'shops.subtitle': 'Encontradas 4 tiendas especializadas cerca.',
    'shops.open': 'Abierto Ahora',
    'shops.directions': 'Cómo llegar',
    'shops.brands': 'Marcas Destacadas',
    'shops.storeInfo': 'Información',
    
    // Clubs
    clubs: {
        directory: {
            title: 'Clubes de Running',
            subtitle: 'Conecta con comunidades locales y entrena en grupo.',
            searchPlaceholder: 'Buscar clubes por nombre o ubicación...',
        },
        card: {
            members: 'miembros',
            viewDetails: 'Ver Detalles',
        },
        detail: {
            verified: 'Club Verificado',
            members: 'Miembros',
            avgDist: 'Dist. Media',
            avgElev: 'Desnivel Medio',
            meetups: 'Salidas Semanales',
            about: 'Sobre Nosotros',
            upcomingRuns: 'Próximas Salidas',
            viewAll: 'Ver Todas',
            runners: 'corredores',
            join: 'Unirse al Club',
        }
    },

    // Profile
    'profile.follow': 'Seguir',
    'profile.message': 'Mensaje',
    'profile.stats.itra': 'Puntuación ITRA',
    'profile.stats.distance': 'Distancia Anual',
    'profile.stats.elevation': 'Desnivel +',
    'profile.stats.hours': 'Horas Activas',
    'profile.tab.upcoming': 'Próximas',
    'profile.tab.results': 'Resultados',
    'profile.tab.photos': 'Fotos',
    'profile.connectedApps': 'Apps Conectadas',
    'profile.trophyCase': 'Trofeos',
    'profile.gear': 'Mi Material',
    'profile.retire': 'Retirar',
    'profile.connect': 'Conectar',
    'profile.connected': 'Conectado',
    'profile.syncing': 'Sincronizando...',
    'profile.metrics': 'Métricas Físicas',
    'profile.weight': 'Peso',
    'profile.height': 'Altura',
    
    // Badges
    'badge.earlyRiser': 'Madrugador',
    'badge.verticalBeast': 'Bestia Vertical',
    'badge.marathoner': 'Maratoniano',
    'badge.dataNerd': 'Nerd de Datos',
    
    // Safety
    safety: {
        sos: 'SOS',
        sending: 'ENVIANDO...',
    },
    pro: {
        badge: 'Summit PRO',
    }

  },
  en: {
    // Onboarding
    onboard: {
      title: 'Conquer the Mountains',
      subtitle: 'Your ultimate trail running companion.',
      start: 'Start Adventure',
      skip: 'Skip',
      back: 'Back',
      next: 'Next',
      complete: 'Complete',
      fitness: {
        title: 'What\'s your level?',
        subtitle: 'This helps us personalize your experience',
        beginner: 'Beginner',
        beginnerDesc: 'New to trail running',
        intermediate: 'Intermediate',
        intermediateDesc: 'Regular experience',
        advanced: 'Advanced',
        advancedDesc: 'Experienced runner',
      },
      raceTypes: {
        title: 'What distances do you prefer?',
        subtitle: 'Select all that interest you',
        short: 'Short',
        marathon: 'Marathon',
        ultra: 'Ultra',
      },
    },
    
    // Navigation
    'nav.calendar': 'Calendar',
    'nav.races': 'Races',
    'nav.clubs': 'Clubs',
    'nav.shops': 'Shops',
    'nav.shopsAndMaps': 'Shops',
    'nav.profile': 'Profile',
    'nav.nextRace': 'Next Race',

    // Dashboard
    dashboard: {
      welcome: 'Welcome',
      subtitle: 'Your personalized trail running overview',
      favorites: 'Favorites',
      upcoming: 'Upcoming',
      available: 'Available',
      level: 'Level',
      upcomingRaces: 'Your Upcoming Races',
      recommended: 'Recommended For You',
      recommendedSubtitle: 'Based on your preferences',
      viewAll: 'View All',
      noFavorites: 'No favorites yet',
      noFavoritesSubtitle: 'Start saving races you\'re interested in',
      browseRaces: 'Browse Races',
    },

    // Race (Nested)
    race: {
        title: 'Race Calendar',
        subtitle: 'Find your next challenge in the mountains.',
        filter: {
            all: 'All',
            favorites: 'Favorites',
            short: 'Short',
            ultra: 'Ultra',
        },
        register: 'View Details',
        elevation: 'Elevation',
        distance: 'Distance',
        strategy: {
            title: 'Strategy',
            recommends: 'Recommends',
            water: 'Est. Water',
            carbs: 'Est. Carbs',
            time: 'Est. Time',
            explanation: 'Based on course difficulty (Distance + Elevation Gain).',
            personalized: 'Personalized',
        },
        detail: {
            elevation: 'Elevation',
            distance: 'Distance',
            startTime: 'Start Time',
            checkpoints: 'Checkpoints',
            profile: 'Elevation Profile',
            map: 'Interactive Map',
            profileLegend: 'Elevation (m) vs Distance (km)',
            mandatoryGear: 'Mandatory Gear',
            about: 'About the Course',
            registration: 'Register Now',
            downloadGpx: 'Download GPX',
            infoTab: 'Info',
            closesIn: 'Registration closes in',
            weather: {
                title: 'Race Day Weather',
                temp: 'Temp',
                wind: 'Wind',
                conditions: 'Conditions',
                humidity: 'Humidity',
            },
            countdown: {
                title: 'Race Starts In',
                days: 'Days',
                hours: 'Hours',
                mins: 'Mins',
            },
            similar: 'You might also like',
            toggle: {
                profile: 'Profile',
                map: 'Map',
            },
            mapPlaceholder: {
                subtitle: 'Coming soon',
            },
            gear: {
                allPacked: '🎉 All Packed! Ready to Race!',
                items: {
                    water: 'Water Container (1L min)',
                    blanket: 'Survival Blanket',
                    whistle: 'Whistle',
                    jacket: 'Waterproof Jacket with hood',
                    lamp: 'Headlamp + Spare batteries',
                }
            },
            addToCalendar: 'Add to Calendar',
            shareCopied: 'Link copied to clipboard!',
            weather: {
                historical: 'Historical Avg.',
                title: 'Race Day Weather',
                temp: 'Temp',
                wind: 'Wind',
                conditions: 'Conditions',
                humidity: 'Humidity',
            },
        }
    },
    
    // Shops
    'shops.title': 'Local Shops',
    'shops.subtitle': 'Found 4 specialized running stores nearby.',
    'shops.open': 'Open Now',
    'shops.directions': 'Get Directions',
    'shops.brands': 'Featured Brands',
    'shops.storeInfo': 'Store Info',

    // Clubs
    clubs: {
        directory: {
            title: 'Running Clubs',
            subtitle: 'Connect with local communities and train together.',
            searchPlaceholder: 'Search clubs by name or location...',
        },
        card: {
            members: 'members',
            viewDetails: 'View Details',
        },
        detail: {
            verified: 'Verified Club',
            members: 'Members',
            avgDist: 'Avg Dist',
            avgElev: 'Avg Elev',
            meetups: 'Weekly Meetups',
            about: 'About Us',
            upcomingRuns: 'Upcoming Runs',
            viewAll: 'View All',
            runners: 'runners',
            join: 'Join Club',
        }
    },

    // Profile
    'profile.follow': 'Follow',
    'profile.message': 'Message',
    'profile.stats.itra': 'ITRA Score',
    'profile.stats.distance': 'Annual Distance',
    'profile.stats.elevation': 'Elevation Gain',
    'profile.stats.hours': 'Hours Active',
    'profile.tab.upcoming': 'Upcoming',
    'profile.tab.results': 'Results',
    'profile.tab.photos': 'Photos',
    'profile.connectedApps': 'Connected Apps',
    'profile.trophyCase': 'Trophy Case',
    'profile.gear': 'My Gear',
    'profile.retire': 'Retire',
    'profile.connect': 'Connect',
    'profile.connected': 'Connected',
    'profile.syncing': 'Syncing...',
    'profile.metrics': 'Physical Metrics',
    'profile.weight': 'Weight',
    'profile.height': 'Height',

    // Badges
    'badge.earlyRiser': 'Early Riser',
    'badge.verticalBeast': 'Vertical Beast',
    'badge.marathoner': 'Marathoner',
    'badge.dataNerd': 'Data Nerd',

    // Safety
    safety: {
        sos: 'SOS',
        sending: 'SENDING...',
    },
    pro: {
        badge: 'Summit PRO',
    }
  }
};
