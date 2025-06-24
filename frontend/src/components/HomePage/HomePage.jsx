import React from 'react';
import { Container } from './styles';
import { Navbar } from '../Navbar';
import Footer from '../Footer/Footer';

const HomePage = () => {

  return (
    <>
      <Navbar />
      <Container>
        <h1>Welcome to the Homepage</h1>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;