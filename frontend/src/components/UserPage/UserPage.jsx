import React, { useEffect, useState } from 'react';
import { Container, Content } from './styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useMediaQueries } from '../../styles/mediaQuery';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Livro from '../Livro';
import Pagination from '@mui/material/Pagination';
import { useSearch } from '../../context/SearchContext';
import BookFormModal from '../BookFormModal/BookFormModal';

const livrosPerPage = 5;

const UserPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isMobile } = useMediaQueries();
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { search } = useSearch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const fetchLivros = async () => {
    if (!user) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${user.id}/livros`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Erro ao buscar livros');
      const data = await response.json();
      setLivros(data);
    } catch (err) {
      setLivros([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, [user]);

  // Filter livros by search
  const filteredLivros = livros.filter(livro => {
    const termo = search.toLowerCase();
    return (
      livro.titulo?.toLowerCase().includes(termo) ||
      livro.autor?.toLowerCase().includes(termo) ||
      livro.descricao?.toLowerCase().includes(termo) ||
      livro.endereco?.toLowerCase().includes(termo)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredLivros.length / livrosPerPage);
  const paginatedLivros = filteredLivros.slice((page - 1) * livrosPerPage, page * livrosPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleOpenModal = () => {
    setEditingBook(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingBook(null);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setModalOpen(true);
  };

  const handleBookSaved = () => {
    fetchLivros();
  };

  const handleDeleteBook = async (livroId) => {
    if (!window.confirm('Tem certeza que deseja excluir este livro?')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/api/livros/${livroId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir livro');
      }

      fetchLivros();
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      alert('Erro ao excluir livro. Por favor, tente novamente.');
    }
  };

  return (
    <Container>
      <Navbar title={'Meus Livros'} />
      <Content isTablet={isMobile}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            width: '100%', 
            mb: 2 
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
            sx={{
              backgroundColor: (theme) => theme.colors.brown,
              '&:hover': {
                backgroundColor: (theme) => theme.colors.darkBrown,
              },
            }}
          >
            Adicionar Livro
          </Button>
        </Box>

        {loading ? (
          <p>Loading books...</p>
        ) : filteredLivros.length > 0 ? (
          <>
            {paginatedLivros.map((livro, index) => (
              <Livro 
                key={livro.id} 
                livro={livro} 
                onDelete={handleDeleteBook} 
                onEdit={handleEdit}
                showDelete={true} 
              />
            ))}
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              sx={{
                mt: 4,
                display: 'flex',
                justifyContent: 'center',
                '& .MuiPaginationItem-root': {
                  color: (theme) => theme.colors.brown,
                  borderColor: (theme) => theme.colors.brown,
                },
                '& .Mui-selected': {
                  backgroundColor: (theme) => theme.colors.brown + ' !important',
                  color: (theme) => theme.colors.light + ' !important',
                },
              }}
            />
          </>
        ) : (
          <p>Livros não encontrados.</p>
        )}
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpenModal}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: (theme) => theme.colors.brown,
            '&:hover': {
              backgroundColor: (theme) => theme.colors.darkBrown,
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Content>
      <Footer />
      <BookFormModal 
        open={modalOpen} 
        handleClose={handleCloseModal} 
        onSuccess={handleBookSaved}
        editingBook={editingBook}
      />
    </Container>
  );
};

export default UserPage;