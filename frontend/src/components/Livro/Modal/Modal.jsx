import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 400, md: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
};

const LivroModal = ({ open, handleClose, livro }) => {
  if (!livro) return null;
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box sx={{ width: '100%', position: 'relative', mb: 2 }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.light.main,
              zIndex: 2,
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={livro.imagem}
            alt={livro.titulo}
            style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: '4px 4px 0 0' }}
          />
        </Box>
        <Box sx={{ p: 2, position: 'relative' }}>
          <Typography variant="h5" color="primary" gutterBottom sx={{ pr: 4 }}>
            {livro.titulo}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {livro.autor}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, mt: 2 }}>
            {livro.descricao}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Contato: {livro.contato}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Endereço: {livro.endereco}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button 
              variant="contained" 
              color="green" 
              onClick={handleClose}
              sx={{ minWidth: 120 }}
            >
              Voltar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default LivroModal;
