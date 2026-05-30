import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { RacesProvider } from './context/RacesContext';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <UserProvider>
          <ThemeProvider>
            <FavoritesProvider>
              <RacesProvider>
                <Layout />
              </RacesProvider>
            </FavoritesProvider>
          </ThemeProvider>
        </UserProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
