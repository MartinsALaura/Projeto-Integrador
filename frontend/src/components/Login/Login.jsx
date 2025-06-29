import React from "react";
import Entry from "../Entry";
import { Container, Buttons } from "./styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useMediaQueries } from '../../styles/mediaQuery';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";

const textFieldSx = {
  backgroundColor: (theme) => theme.colors.light,
  '& .MuiInputBase-input': {
    color: (theme) => theme.colors.brown,
  },
  '& .MuiInputLabel-root': {
    color: (theme) => theme.colors.brown,
  }
};

const Content = () => {
  const { isMobile } = useMediaQueries();
  const navigate = useNavigate();

  return (
    <Container datatestid="signup-container">
      <Box
        component="img"
        sx={{
          height: 94,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        alt="Logo Livro"
        src="/images/livro-logo-preto.png"
        onClick={() => navigate('/')}
      />
      <Typography 
        variant={isMobile ? "h4" : "h3"} 
        sx={{ 
          color: (theme) => theme.colors.brown,
          textAlign: 'center'
        }}
      >
        Login
      </Typography>
      <TextField 
        id="Email" 
        label="Email" 
        variant="filled" 
        required
        sx={textFieldSx}
      />
      <TextField 
        id="Senha" 
        label="Senha" 
        variant="filled" 
        type="password" 
        required
        sx={textFieldSx}
      />
      <Buttons>
        <Button 
          variant="contained" 
          color="green"
          sx={{
            width: '100%',
          }}
          //onClick={() => navigate('/signup')}
        >
          Entrar
        </Button>
        <>
          <Button 
            color="grey" 
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: (theme) => theme.colors.grey,
              '&:hover': {
                backgroundColor: (theme) => theme.colors.grey,
              }
            }}
          >
            Voltar
          </Button>
           <Typography variant="subtitle2" sx={{ textAlign: 'center', color: (theme) => theme.colors.brown }}>
            Não tem uma conta? <a href="/signup">Cadastre-se</a>
           </Typography>
        </>
      </Buttons>
    </Container>
  );
};

export const Login = () => {
  return (
    <Entry content={<Content />} />
  )
}