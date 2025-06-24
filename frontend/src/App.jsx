import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import { theme } from './styles/theme';
import Reset from './styles/reset';
import HomePage from './components/HomePage';

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
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <Router>
          <AppWrapper>
            <Reset />
            <Main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* Add other routes here */}
                <Route path="*" element={<div>Page Not Found</div>} />
              </Routes>
            </Main>
          </AppWrapper>
        </Router>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default App;
