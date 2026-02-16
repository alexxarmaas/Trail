import React, { useState } from 'react';
import Layout from './layout/Layout';
import Onboarding from './pages/Onboarding';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';

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
            {showOnboarding ? (
              <Onboarding onStart={() => setShowOnboarding(false)} />
            ) : (
              <Layout />
            )}
          </FavoritesProvider>
        </ThemeProvider>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
