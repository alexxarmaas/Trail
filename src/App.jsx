import React, { useState } from 'react';
import Layout from './layout/Layout';
import Onboarding from './pages/Onboarding';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { RacesProvider } from './context/RacesContext';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    const completed = localStorage.getItem('trail-companion-onboarding');
    return !completed; // Show if not completed or skipped
  });

  return (
    <LanguageProvider>
      <UserProvider>
        <ThemeProvider>
          <FavoritesProvider>
            <RacesProvider>
              {showOnboarding ? (
                <Onboarding onStart={() => setShowOnboarding(false)} />
              ) : (
                <Layout />
              )}
            </RacesProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
