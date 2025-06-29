import React, { useState } from "react";
import Entry from "../Entry";
import { Container, Buttons } from "./styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useMediaQueries } from '../../styles/mediaQuery';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useAuth } from '../../context/AuthContext';

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
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id.toLowerCase()]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.senha);
      
      if (result.success) {
        navigate('/user');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container datatestid="login-container">
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
      
      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField 
          id="Email" 
          label="Email" 
          variant="filled" 
          required
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={textFieldSx}
        />
        <TextField 
          id="Senha" 
          label="Senha" 
          variant="filled" 
          type="password" 
          required
          value={formData.senha}
          onChange={handleChange}
          sx={textFieldSx}
        />
        <Buttons>
          <Button 
            type="submit"
            variant="contained" 
            color="green"
            disabled={loading}
            sx={{
              width: '100%',
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
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
      </Box>
    </Container>
  );
};

export const Login = () => {
  return (
    <Entry content={<Content />} />
  )
}