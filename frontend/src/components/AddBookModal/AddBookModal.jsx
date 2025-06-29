import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext'; // <-- Import the AuthContext

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: 500,
    borderRadius: '8px',
  },
  '& .MuiDialogTitle-root': {
    // Remove backgroundColor for transparent background
    color: theme.colors.brown,
    padding: '16px 24px',
    backgroundColor: 'transparent',
  },
  '& .MuiDialogContent-root': {
    paddingRight: '32px',
    paddingBottom: '32px',
    paddingLeft: '32px',
    paddingTop: 0,
  },
  '& .MuiDialogActions-root': {
    padding: '16px 24px',
  },
}));

const InputField = styled(TextField)(({ theme }) => ({
  marginBottom: '16px',
  '& .MuiFilledInput-root': {
    '&.Mui-focused': {
      backgroundColor: 'rgba(121, 85, 72, 0.05)',
    },
    '&:hover': {
      backgroundColor: 'rgba(121, 85, 72, 0.07)',
    },
    backgroundColor: 'rgba(121, 85, 72, 0.04)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.colors.brown,
  },
}));

const AddBookModal = ({ open, handleClose, onSuccess }) => {
  const { user } = useAuth(); // <-- Get the user from AuthContext
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    descricao: '',
    endereco: '',
    contato: '',
    imagem: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          imagem: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.titulo || !formData.autor) {
      alert('Título e autor são obrigatórios');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      // Add usuario_id to the form data
      const dataToSend = { ...formData, usuario_id: user?.id };
      const response = await fetch('http://localhost:3000/api/livros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error('Erro ao criar livro');
      }

      const data = await response.json();
      setLoading(false);
      handleClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Erro ao criar livro:', error);
      setLoading(false);
      alert('Erro ao criar livro. Por favor, tente novamente.');
    }
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <Typography variant="h4" component="div" sx={{ opacity: 0.9, flex: 1, textAlign: 'center' }}>
          Adicionar Novo Livro
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 16, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <InputField
            fullWidth
            required
            variant="filled"
            label="Título"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
          />
          <InputField
            fullWidth
            required
            variant="filled"
            label="Autor"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
          />
          <InputField
            fullWidth
            variant="filled"
            label="Descrição"
            name="descricao"
            multiline
            rows={3}
            value={formData.descricao}
            onChange={handleChange}
          />
          <InputField
            fullWidth
            variant="filled"
            label="Endereço (cidade - estado)"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
          />
          <InputField
            fullWidth
            variant="filled"
            label="Contato (telefone - rede social)"
            name="contato"
            value={formData.contato}
            onChange={handleChange}
          />
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>Imagem do Livro</Typography>
            <input
              accept="image/*"
              type="file"
              id="image-upload"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                sx={{
                  borderColor: (theme) => theme.colors.brown,
                  color: (theme) => theme.colors.brown,
                  '&:hover': {
                    borderColor: (theme) => theme.colors.brown,
                    backgroundColor: 'rgba(121, 85, 72, 0.04)'
                  }
                }}
              >
                Selecionar Imagem
              </Button>
            </label>
            {imagePreview && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClose} 
          variant="contained"
        >
          Voltar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          color='green'
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Cadastrar Livro'}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default AddBookModal;
