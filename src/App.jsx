import React, { useState } from 'react';
import Layout from './layout/Layout';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import Onboarding from './pages/Onboarding';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <UserProvider>
      <LanguageProvider>
        <ThemeProvider>
            {showOnboarding ? (
            <Onboarding onStart={() => setShowOnboarding(false)} />
            ) : (
            <Layout />
            )}
        </ThemeProvider>
      </LanguageProvider>
    </UserProvider>
  );
}

export default App;
