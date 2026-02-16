import React from 'react';
import Layout from './layout/Layout';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <ThemeProvider>
          <FavoritesProvider>
            <Layout />
          </FavoritesProvider>
        </ThemeProvider>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
