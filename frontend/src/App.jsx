import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import { theme } from './styles/theme';
import Reset from './styles/reset';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import UserPage from './components/UserPage';
import ProtectedRoute from './components/ProtectedRoute';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <ThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <Router>
              <AppWrapper>
                <Reset />
                <Main>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route 
                      path="/user" 
                      element={
                        <ProtectedRoute>
                          <UserPage />
                        </ProtectedRoute>
                      } 
                    />
                  </Routes>
                </Main>
              </AppWrapper>
            </Router>
          </StyledThemeProvider>
        </ThemeProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
