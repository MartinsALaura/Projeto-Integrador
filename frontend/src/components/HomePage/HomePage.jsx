import React from 'react';
import { Container, Content } from './styles';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useMediaQueries } from '../../styles/mediaQuery';

const HomePage = () => {
  const { isTablet } = useMediaQueries();

  return (
    <Container>
      <Navbar />
      <Content isTablet={isTablet}>
        a
      </Content>
      <Footer />
    </Container>
  );
};

export default HomePage;