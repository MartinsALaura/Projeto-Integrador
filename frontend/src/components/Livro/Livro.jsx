import React, { useState } from "react";
import { Container, Content } from './styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMediaQueries } from '../../styles/mediaQuery';
import LivroModal from './Modal/Modal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Livro = ({ livro, onDelete, showDelete, onEdit })  => {  
  const { isTablet } = useMediaQueries();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent opening the modal when clicking delete
    onDelete(livro.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent opening the modal when clicking edit
    onEdit(livro);
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            height: '100%',
          }}
        >
          <Box
            onClick={handleOpen}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              cursor: 'pointer',
              flex: 1,
              height: '100%',
            }}
          >
            <Box
              sx={{
                width: 150,
                minWidth: 150,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
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
                    overflow: 'hidden'
                  }}
                >
                  {livro.descricao}
                </Typography>
              )}
            </Content>
          </Box>
          {showDelete && (
            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
              <IconButton 
                onClick={handleEdit}
                sx={{ 
                  color: 'primary.main',
                  mr: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(121, 85, 72, 0.04)',
                  }
                }}
                size="small"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={handleDelete}
                sx={{ 
                  color: 'error.main',
                  '&:hover': {
                    backgroundColor: 'rgba(211, 47, 47, 0.04)',
                    color: 'error.dark',
                  }
                }}
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Container>
      <LivroModal open={open} handleClose={handleClose} livro={livro} />
    </>
  );
};

export default Livro;