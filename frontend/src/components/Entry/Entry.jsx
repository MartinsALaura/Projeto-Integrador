import React from "react";
import { Container, Right, Left, BooksImg } from "./styles";
import { useMediaQueries } from "../../styles/mediaQuery";

export const Entry = () => {
  const { isTablet } = useMediaQueries();

  return (
    <Container data-testid="container">
      {!isTablet && (
        <Left data-testid="left">
          <BooksImg src="/images/livros.svg" alt="Livros" />
        </Left>
      )}
      <Right data-testid="right" $isTablet={isTablet}>a</Right>
    </Container>
  );
}