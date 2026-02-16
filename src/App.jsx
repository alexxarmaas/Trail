import React, { useState } from 'react';
import Layout from './layout/Layout';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import Onboarding from './pages/Onboarding';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <UserProvider>
      <LanguageProvider>
        {showOnboarding ? (
          <Onboarding onStart={() => setShowOnboarding(false)} />
        ) : (
          <Layout />
        )}
      </LanguageProvider>
    </UserProvider>
  );
}

export default App;
