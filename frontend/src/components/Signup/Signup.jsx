import React, { useState } from "react";
import Entry from "../Entry";
import { Container, Buttons } from "./styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useMediaQueries } from '../../styles/mediaQuery';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../../context/AuthContext';

const textFieldSx = {
  backgroundColor: (theme) => theme.colors.light,
  '& .MuiInputBase-input': {
    color: (theme) => theme.colors.brown,
  },
  '& .MuiInputLabel-root': {
    color: (theme) => theme.colors.brown,
    '&.Mui-focused': {
      color: (theme) => theme.colors.brown,
    },
    '&.MuiInputLabel-shrink': {
      color: (theme) => theme.colors.brown,
    },
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: (theme) => theme.colors.brown,
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: (theme) => theme.colors.brown,
    },
  },
};

const Content = () => {
  const { isMobile } = useMediaQueries();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.toLowerCase()]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async () => {
    // Validate form
    if (!formData.nome || !formData.email || !formData.senha) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email inválido');
      return;
    }

    // Validate password length
    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // First check if email exists
      const checkEmailResponse = await fetch(`http://localhost:3000/api/usuarios/verificar-email?email=${encodeURIComponent(formData.email)}`);
      const checkEmailData = await checkEmailResponse.json();

      if (checkEmailResponse.ok && checkEmailData.existe) {
        setError('Este email já está cadastrado');
        setLoading(false);
        return;
      }

      // If email doesn't exist, proceed with signup
      const response = await fetch('http://localhost:3000/api/usuarios/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar conta');
      }

      // If signup successful, login automatically
      await login(formData.email, formData.senha);
      navigate('/user');
    } catch (error) {
      console.error('Erro:', error);
      setError(error.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

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
        Criar Conta
      </Typography>
      {error && (
        <Typography 
          variant="subtitle2" 
          sx={{ 
            color: 'error.main',
            textAlign: 'center',
            mb: 2
          }}
        >
          {error}
        </Typography>
      )}
      <TextField 
        id="nome" 
        label="Nome" 
        variant="filled" 
        required
        value={formData.nome}
        onChange={handleChange}
        error={!!error && !formData.nome}
        sx={textFieldSx}
      />
      <TextField 
        id="email" 
        label="Email" 
        variant="filled" 
        required
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!error && !formData.email}
        sx={textFieldSx}
      />
      <TextField 
        id="senha" 
        label="Senha" 
        variant="filled" 
        type="password" 
        required
        value={formData.senha}
        onChange={handleChange}
        error={!!error && !formData.senha}
        helperText="Mínimo de 6 caracteres"
        sx={textFieldSx}
      />
      <Buttons>
        <Button 
          variant="contained" 
          color="green"
          sx={{
            width: '100%',
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Criar Conta'}
        </Button>
        <>
          <Button 
            color="grey" 
            variant="contained"
            onClick={() => navigate('/')}
            disabled={loading}
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
            Já tem uma conta? <a href="/login">Faça login</a>
           </Typography>
        </>
      </Buttons>
    </Container>
  );
};

export const Signup = () => {
  return (
    <Entry content={<Content />} />
  );
};