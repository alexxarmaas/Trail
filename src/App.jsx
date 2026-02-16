import React, { useState } from 'react';
import Layout from './layout/Layout';
import { LanguageProvider } from './context/LanguageContext';
import Onboarding from './pages/Onboarding';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <LanguageProvider>
      {showOnboarding ? (
        <Onboarding onStart={() => setShowOnboarding(false)} />
      ) : (
        <Layout />
      )}
    </LanguageProvider>
  );
}

export default App;
