import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import RaceCalendar from '../pages/RaceCalendar';
import ClubsDirectory from '../pages/ClubsDirectory';
import Shops from '../pages/Shops';
import UserProfile from '../pages/UserProfile';
import RaceDetailPage from '../pages/RaceDetailPage';
import ClubDetailPage from '../pages/ClubDetailPage';
import ShopDetailPage from '../pages/ShopDetailPage';
import IslandPage from '../pages/IslandPage';
import Anunciate from '../pages/Anunciate';
import PublicaCarrera from '../pages/PublicaCarrera';
import RoutesPage from '../pages/RoutesPage';
import DataNotice from '../pages/DataNotice';
import Dashboard from '../pages/Dashboard';
import AddListing from '../pages/AddListing';
import Pricing from '../pages/Pricing';
import FavoritesPage from '../pages/FavoritesPage';
import RouteDetailPage from '../pages/RouteDetailPage';
import CorrectionRequest from '../pages/CorrectionRequest';
import ForOrganizers from '../pages/ForOrganizers';
import ForShops from '../pages/ForShops';
import ForClubs from '../pages/ForClubs';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100 flex font-sans transition-colors duration-300">
      {/* Sidebar - Desktop Only */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 nav:ml-64 relative min-h-screen pb-20 nav:pb-0 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto w-full h-full">
          <Routes>
            <Route path="/" element={<RaceCalendar />} />
            <Route path="/carreras" element={<RaceCalendar />} />
            <Route path="/carreras/:slug" element={<RaceDetailPage />} />
            <Route path="/clubes" element={<ClubsDirectory />} />
            <Route path="/clubes/:slug" element={<ClubDetailPage />} />
            <Route path="/tiendas" element={<Shops />} />
            <Route path="/tiendas/:slug" element={<ShopDetailPage />} />
            <Route path="/islas/:island" element={<IslandPage />} />
            <Route path="/anunciate" element={<Anunciate />} />
            <Route path="/anade-tu-ficha" element={<AddListing />} />
            <Route path="/precios" element={<Pricing />} />
            <Route path="/favoritos" element={<FavoritesPage />} />
            <Route path="/publica-tu-carrera" element={<PublicaCarrera />} />
            <Route path="/perfil" element={<UserProfile />} />
            <Route path="/rutas" element={<RoutesPage />} />
            <Route path="/rutas/:slug" element={<RouteDetailPage />} />
            <Route path="/legal/aviso-datos" element={<DataNotice />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/corregir-ficha" element={<CorrectionRequest />} />
            <Route path="/para-organizadores" element={<ForOrganizers />} />
            <Route path="/para-tiendas" element={<ForShops />} />
            <Route path="/para-clubes" element={<ForClubs />} />
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {/* Bottom Nav - Mobile Only */}
      <BottomNav />
    </div>
  );
};

export default Layout;
