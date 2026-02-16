import React, { useState } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import RaceCalendar from '../pages/RaceCalendar';
import ClubsDirectory from '../pages/ClubsDirectory';
import Shops from '../pages/Shops';
import UserProfile from '../pages/UserProfile';

const Layout = () => {
  const [activeTab, setActiveTab] = useState('calendar');

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return <RaceCalendar />;
      case 'clubs':
        return <ClubsDirectory />;
      case 'shops':
        return <Shops />;
      case 'profile':
        return <UserProfile />;
      default:
        return <RaceCalendar />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100 flex font-sans transition-colors duration-300">
      {/* Sidebar - Desktop Only */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 relative min-h-screen pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto w-full h-full">
           {renderContent()}
        </div>
      </main>

      {/* Bottom Nav - Mobile Only */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Layout;
