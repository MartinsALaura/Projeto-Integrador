import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.div`
  position: relative;
  height: 400px;
  color: ${({ theme }) => theme.colors.background.default};
  margin-bottom: 2rem;
  background-image: url(https://source.unsplash.com/random?library);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const HeroContent = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin: 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
`;

const BookCard = styled.div`
  background: ${({ theme }) => theme.colors.background.default};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const BookContent = styled.div`
  padding: 1rem;
`;

const BookTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Home = () => {
  const featuredBooks = [
    { id: 1, title: 'Harry Potter', image: '/images/harry_potter.jpg' },
    { id: 2, title: '1984', image: '/images/1984.jpg' },
    { id: 3, title: 'O Pequeno Príncipe', image: '/images/O-pequeno-príncipe.jpg' },
    { id: 4, title: 'Narnia', image: '/images/narnia.webp' },
  ];

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Bem-vindo à Biblioteca Virtual</HeroTitle>
          <HeroSubtitle>Descubra novos mundos através da leitura</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <Container>
        <SectionTitle>Livros em Destaque</SectionTitle>
        <BookGrid>
          {featuredBooks.map((book) => (
            <BookCard key={book.id}>
              <BookImage src={book.image} alt={book.title} />
              <BookContent>
                <BookTitle>{book.title}</BookTitle>
              </BookContent>
            </BookCard>
          ))}
        </BookGrid>
      </Container>
    </>
  );
};

export default Home;