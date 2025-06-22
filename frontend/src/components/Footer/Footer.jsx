import React from "react";
import { FooterContainer, Content } from "./styles";
import Typography from '@mui/material/Typography';
import { useMediaQueries } from '../../styles/mediaQuery';

export default function Footer() {
  const { isTablet } = useMediaQueries();

  return (
    <FooterContainer isTablet={isTablet}>
      <Content isTablet={isTablet}>
        <Typography 
          variant={isTablet ? "subtitle1" : "h6"} 
          sx={{ color: 'white' }}
        >
          Desenvolvido por Laura Alves Martins para a disciplina Projeto Integrador do curso Sistemas para Internet - Unisinos - 2025
        </Typography>
      </Content>
    </FooterContainer>
  );
}