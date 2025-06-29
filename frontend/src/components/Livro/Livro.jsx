import React, { useState } from "react";
import { Container, Content } from './styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMediaQueries } from '../../styles/mediaQuery';
import LivroModal from './Modal/Modal';

const Livro = ({ livro })  => {  
  const { isTablet } = useMediaQueries();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Container onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        <Box
          sx={{
            width: 150,
            height: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            marginBottom: 2,
            marginRight: 2,
          }}
        >
          <img
            src={livro.imagem}
            alt={livro.titulo}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Content>
          <Typography variant="h6" color="primary" gutterBottom>
            {livro.titulo} - {livro.autor}
          </Typography>
          {!isTablet && (
            <Typography 
              variant="subtitle2" 
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 610,
              }}
            >
              {livro.descricao}
            </Typography>
          )}
          <Typography variant="subtitle2" color="text.secondary">
            {livro.contato}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {livro.endereco}
          </Typography>
        </Content>
      </Container>
      <LivroModal open={open} handleClose={handleClose} livro={livro} />
    </>
  );
};

export default Livro;